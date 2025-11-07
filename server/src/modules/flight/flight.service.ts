import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter, Flight } from '@/database';
import { AirlineService } from '@/modules/airline';
import { CounterService } from '@/modules/counter';
import { RouteService } from '@/modules/route';
import { FlightDirection, FlightStatus } from '@/types/enum';
import { CreateFlightDto, QueryFlightDto, UpdateFlightDto } from './dtos';

@Injectable()
export class FlightService {
  constructor(
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
   * List flights with filters + pagination.
   * Supports: search, status, type, direction (departure|arrival), airlineId, counterId,
   * orderBy, order; plus PaginationDto (page, limit).
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
      orderBy = 'operationDate',
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
    if (direction === FlightDirection.DEPARTURE) {
      qb.andWhere('origin.code = :code', { code: 'BOR' });
    } else if (direction === FlightDirection.ARRIVAL) {
      qb.andWhere('destination.code = :code', { code: 'BOR' });
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
      createdAt: 'f.createdAt',
      status: 'f.status',
    };

    // Priority over orderBy when direction is provided, always order by departure/arrival time first
    const orderField =
      direction === FlightDirection.DEPARTURE
        ? 'f.scheduledDepTime'
        : direction === FlightDirection.ARRIVAL
          ? 'f.scheduledArrTime'
          : (orderMap[orderBy] ?? 'f.operationDate');

    qb.orderBy(orderField, order === 'DESC' ? 'DESC' : 'ASC');
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create a new flight.
   */
  async create(dto: CreateFlightDto) {
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

    return await this.flightRepo.save(flight);
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
