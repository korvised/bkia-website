import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Counter, Flight } from '@/database';
import { AirlineService } from '@/modules/airline';
import { CounterService } from '@/modules/counter';
import { RouteService } from '@/modules/route';
import { FlightDirection, FlightStatus } from '@/types/enum';
import {
  BatchCreateFlightsDto,
  BulkCreateFlightDto,
  CreateFlightDto,
  QueryFlightDto,
  UpdateFlightDto,
} from './dtos';

@Injectable()
export class FlightService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    private readonly airlineService: AirlineService,
    private readonly counterService: CounterService,
    private readonly routeService: RouteService,
  ) {}

  /**
   * Find a single flight by id (with relations).
   */
  async findOne(id: string) {
    const flight = await this.flightRepo.findOne({
      where: { id },
      relations: {
        route: { origin: true, destination: true },
        airline: { logoFile: true },
        checkInCounters: true,
      },
    });

    if (!flight) throw new NotFoundException('Flight not found');
    return flight;
  }

  /**
   * Find flights by IDs (with relations).
   */
  async findByIds(ids: string[]): Promise<Flight[]> {
    return this.flightRepo.find({
      where: ids.map((id) => ({ id })),
      relations: {
        route: { origin: true, destination: true },
        airline: { logoFile: true },
        checkInCounters: true,
      },
      order: { operationDate: 'ASC', scheduledDepTime: 'ASC' },
    });
  }

  /**
   * List flights with filters + pagination.
   * Supports: search, status, type, direction (departure|arrival), airlineId, counterId,
   * terminal, gate, orderBy, order; plus PaginationDto (page, limit).
   * Loads the same relations as findOne.
   */
  async findAll(dto: QueryFlightDto) {
    const {
      search,
      operationDate,
      type,
      terminal,
      gate,
      direction,
      status,
      airlineId,
      counterId,
      sortBy = 'operationDate',
      order = 'ASC',
    } = dto;

    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.flightRepo
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.route', 'route')
      .leftJoinAndSelect('route.origin', 'origin')
      .leftJoinAndSelect('route.destination', 'destination')
      .leftJoinAndSelect('f.airline', 'airline')
      .leftJoinAndSelect('airline.logoFile', 'airlineLogoFile')
      .leftJoinAndSelect('f.checkInCounters', 'counter');

    // Search
    if (search?.trim()) {
      const s = `%${search.trim()}%`;

      qb.andWhere(
        `
      (
        -- Flight No
        f.flightNo ILIKE :s

        -- Airline: code, name, names (all langs)
        OR airline.code ILIKE :s
        OR airline.name ILIKE :s
        OR EXISTS (
          SELECT 1
          FROM jsonb_each_text(COALESCE(airline.names, '{}'::jsonb)) AS aj(k, v)
          WHERE v ILIKE :s
        )

        -- Origin: code, name, names (all langs)
        OR origin.code ILIKE :s
        OR origin.name ILIKE :s
        OR EXISTS (
          SELECT 1
          FROM jsonb_each_text(COALESCE(origin.names, '{}'::jsonb)) AS oj(k, v)
          WHERE v ILIKE :s
        )

        -- Destination: code, name, names (all langs)
        OR destination.code ILIKE :s
        OR destination.name ILIKE :s
        OR EXISTS (
          SELECT 1
          FROM jsonb_each_text(COALESCE(destination.names, '{}'::jsonb)) AS dj(k, v)
          WHERE v ILIKE :s
        )
      )`,
        { s },
      );
    }

    // Filter by operationDate (exact match)
    if (operationDate) {
      qb.andWhere('f.operationDate = :operationDate', { operationDate });
    }

    // Filter by flight type (Scheduled, Charter, Cargo, etc.)
    if (type) {
      qb.andWhere('f.type = :type', { type });
    }

    // Filter by terminal (A, B)
    if (terminal) {
      qb.andWhere('f.terminal = :terminal', { terminal });
    }

    // Filter by gate (1, 2, 3, etc.)
    if (gate) {
      qb.andWhere('f.gate = :gate', { gate });
    }

    // Filter by flight status
    if (status) {
      qb.andWhere('f.status = :status', { status });
    }

    // Direction: 'departure' or 'arrival'
    // For airport website: departure = flights leaving from this airport (origin = BOR)
    // arrival = flights coming to this airport (destination = BOR)
    if (direction === FlightDirection.DEPARTURE) {
      qb.andWhere('origin.code = :airportCode', { airportCode: 'BOR' });
    } else if (direction === FlightDirection.ARRIVAL) {
      qb.andWhere('destination.code = :airportCode', { airportCode: 'BOR' });
    }

    if (airlineId) {
      qb.andWhere('airline.id = :airlineId', { airlineId });
    }

    if (counterId) {
      qb.andWhere('counter.id = :counterId', { counterId });
    }

    // Base map for standard fields
    const orderMap: Record<string, string> = {
      flightNo: 'f.flightNo',
      operationDate: 'f.operationDate',
      scheduledDepTime: 'f.scheduledDepTime',
      scheduledArrTime: 'f.scheduledArrTime',
      createdAt: 'f.createdAt',
      status: 'f.status',
      type: 'f.type',
    };

    // Primary sort field based on direction or explicit sortBy
    let primaryOrderField: string;

    if (direction === FlightDirection.DEPARTURE) {
      primaryOrderField = 'f.scheduledDepTime';
    } else if (direction === FlightDirection.ARRIVAL) {
      primaryOrderField = 'f.scheduledArrTime';
    } else {
      primaryOrderField = orderMap[sortBy] ?? 'f.operationDate';
    }

    const orderDirection = order === 'DESC' ? 'DESC' : 'ASC';

    // Apply primary sort
    qb.orderBy(primaryOrderField, orderDirection);

    // Add secondary sort for better ordering
    // When sorting by operationDate, add scheduledDepTime as secondary
    if (primaryOrderField === 'f.operationDate') {
      qb.addOrderBy('f.scheduledDepTime', orderDirection);
    }
    // When sorting by time, add operationDate as secondary for flights on different days
    else if (
      primaryOrderField === 'f.scheduledDepTime' ||
      primaryOrderField === 'f.scheduledArrTime'
    ) {
      qb.addOrderBy('f.operationDate', orderDirection);
    }

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      lastUpdated: new Date().toISOString(),
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create a single flight.
   */
  async create(dto: CreateFlightDto): Promise<Flight> {
    const route = await this.routeService.findOne(dto.routeId);
    if (!route) throw new BadRequestException('Invalid routeId');

    const airline = await this.airlineService.findOne(dto.airlineId);
    if (!airline) throw new BadRequestException('Invalid airlineId');

    let counters: Counter[] = [];
    if (dto.checkInCounterIds?.length) {
      counters = await this.counterService.findByCounterIds(
        dto.checkInCounterIds,
      );
      if (counters.length !== dto.checkInCounterIds.length) {
        throw new BadRequestException(
          'One or more counterId values are invalid',
        );
      }
    }

    const flight = this.flightRepo.create({
      flightNo: dto.flightNo,
      type: dto.type,
      terminal: dto.terminal,
      gate: dto.gate?.trim() ?? null,
      operationDate: dto.operationDate,
      scheduledDepTime: dto.scheduledDepTime,
      scheduledArrTime: dto.scheduledArrTime,
      actualDepTime: dto.actualDepTime ?? null,
      actualArrTime: dto.actualArrTime ?? null,
      checkInStartTime: dto.checkInStartTime ?? null,
      checkInEndTime: dto.checkInEndTime ?? null,
      status: dto.status ?? FlightStatus.SCHEDULED,
      remarks: dto.remarks ?? null,
      route,
      airline,
      checkInCounters: counters,
    });

    const saved = await this.flightRepo.save(flight);
    return this.findOne(saved.id);
  }

  /**
   * Bulk create flights - same flight data with multiple dates.
   * Useful for scheduling recurring flights.
   */
  async bulkCreate(dto: BulkCreateFlightDto): Promise<Flight[]> {
    const route = await this.routeService.findOne(dto.routeId);
    if (!route) throw new BadRequestException('Invalid routeId');

    const airline = await this.airlineService.findOne(dto.airlineId);
    if (!airline) throw new BadRequestException('Invalid airlineId');

    let counters: Counter[] = [];
    if (dto.checkInCounterIds?.length) {
      counters = await this.counterService.findByCounterIds(
        dto.checkInCounterIds,
      );
      if (counters.length !== dto.checkInCounterIds.length) {
        throw new BadRequestException(
          'One or more counterId values are invalid',
        );
      }
    }

    // Use transaction for bulk insert
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const flights: Flight[] = [];

      for (const operationDate of dto.operationDates) {
        const flight = this.flightRepo.create({
          flightNo: dto.flightNo,
          type: dto.type,
          terminal: dto.terminal,
          gate: dto.gate?.trim() ?? null,
          operationDate,
          scheduledDepTime: dto.scheduledDepTime,
          scheduledArrTime: dto.scheduledArrTime,
          actualDepTime: dto.actualDepTime ?? null,
          actualArrTime: dto.actualArrTime ?? null,
          checkInStartTime: dto.checkInStartTime ?? null,
          checkInEndTime: dto.checkInEndTime ?? null,
          status: dto.status ?? FlightStatus.SCHEDULED,
          remarks: dto.remarks ?? null,
          route,
          airline,
          checkInCounters: counters,
        });

        const saved = await queryRunner.manager.save(flight);
        flights.push(saved);
      }

      await queryRunner.commitTransaction();

      // Return flights with full relations
      const flightIds = flights.map((f) => f.id);
      return this.findByIds(flightIds);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Batch create multiple different flights.
   * Useful for importing or creating various flights at once.
   */
  async batchCreate(dto: BatchCreateFlightsDto): Promise<Flight[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const flights: Flight[] = [];

      for (const flightDto of dto.flights) {
        const route = await this.routeService.findOne(flightDto.routeId);
        if (!route) {
          throw new BadRequestException(
            `Invalid routeId: ${flightDto.routeId}`,
          );
        }

        const airline = await this.airlineService.findOne(flightDto.airlineId);
        if (!airline) {
          throw new BadRequestException(
            `Invalid airlineId: ${flightDto.airlineId}`,
          );
        }

        let counters: Counter[] = [];
        if (flightDto.checkInCounterIds?.length) {
          counters = await this.counterService.findByCounterIds(
            flightDto.checkInCounterIds,
          );
          if (counters.length !== flightDto.checkInCounterIds.length) {
            throw new BadRequestException(
              `One or more counterId values are invalid for flight ${flightDto.flightNo}`,
            );
          }
        }

        const flight = this.flightRepo.create({
          flightNo: flightDto.flightNo,
          type: flightDto.type,
          terminal: flightDto.terminal,
          gate: flightDto.gate?.trim() ?? null,
          operationDate: flightDto.operationDate,
          scheduledDepTime: flightDto.scheduledDepTime,
          scheduledArrTime: flightDto.scheduledArrTime,
          actualDepTime: flightDto.actualDepTime ?? null,
          actualArrTime: flightDto.actualArrTime ?? null,
          checkInStartTime: flightDto.checkInStartTime ?? null,
          checkInEndTime: flightDto.checkInEndTime ?? null,
          status: flightDto.status ?? FlightStatus.SCHEDULED,
          remarks: flightDto.remarks ?? null,
          route,
          airline,
          checkInCounters: counters,
        });

        const saved = await queryRunner.manager.save(flight);
        flights.push(saved);
      }

      await queryRunner.commitTransaction();

      // Return flights with full relations
      const flightIds = flights.map((f) => f.id);
      return this.findByIds(flightIds);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Update an existing flight.
   */
  async update(id: string, dto: UpdateFlightDto) {
    const flight = await this.findOne(id);
    if (!flight) throw new NotFoundException(`Flight ${id} not found`);

    if (dto.flightNo !== undefined) flight.flightNo = dto.flightNo;
    if (dto.type !== undefined) flight.type = dto.type;
    if (dto.terminal !== undefined) flight.terminal = dto.terminal;
    if (dto.gate !== undefined) flight.gate = dto.gate?.trim() ?? null;
    if (dto.operationDate !== undefined)
      flight.operationDate = dto.operationDate;
    if (dto.scheduledDepTime !== undefined)
      flight.scheduledDepTime = dto.scheduledDepTime;
    if (dto.scheduledArrTime !== undefined)
      flight.scheduledArrTime = dto.scheduledArrTime;
    if (dto.actualDepTime !== undefined)
      flight.actualDepTime = dto.actualDepTime ?? null;
    if (dto.actualArrTime !== undefined)
      flight.actualArrTime = dto.actualArrTime ?? null;
    if (dto.checkInStartTime !== undefined)
      flight.checkInStartTime = dto.checkInStartTime ?? null;
    if (dto.checkInEndTime !== undefined)
      flight.checkInEndTime = dto.checkInEndTime ?? null;
    if (dto.status !== undefined) flight.status = dto.status;
    if (dto.remarks !== undefined) flight.remarks = dto.remarks ?? null;

    if (dto.routeId) {
      const route = await this.routeService.findOne(dto.routeId);
      if (!route) throw new BadRequestException('Invalid routeId');
      flight.route = route;
    }

    if (dto.airlineId) {
      const airline = await this.airlineService.findOne(dto.airlineId);
      if (!airline) throw new BadRequestException('Invalid airlineId');
      flight.airline = airline;
    }

    if (dto.checkInCounterIds) {
      const counters = await this.counterService.findByCounterIds(
        dto.checkInCounterIds,
      );
      if (counters.length !== dto.checkInCounterIds.length) {
        throw new BadRequestException(
          'One or more counterId values are invalid',
        );
      }
      flight.checkInCounters = counters;
    }

    return await this.flightRepo.save(flight);
  }
}
