import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '@/database';
import { AirportService } from '@/modules/airport';
import { CreateRouteDto, QueryRouteDto, UpdateRouteDto } from './dtos';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepo: Repository<Route>,
    private readonly airportService: AirportService,
  ) {}

  private async getAirport(id: string) {
    return this.airportService.findOne(id);
  }

  async findOne(id: string) {
    const route = await this.routeRepo.findOne({
      where: { id },
      relations: { origin: true, destination: true },
    });
    if (!route) {
      throw new Error('Route not found');
    }
    return route;
  }

  async findAll(query: QueryRouteDto) {
    const { routeType, isActive } = query;

    const qb = this.routeRepo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.origin', 'o')
      .leftJoinAndSelect('r.destination', 'd');

    if (routeType) qb.andWhere('r.routeType = :routeType', { routeType });
    if (isActive === 'true') qb.andWhere('r.isActive = true');
    if (isActive === 'false') qb.andWhere('r.isActive = false');

    qb.orderBy('o.code', 'ASC');

    return qb.getMany();
  }

  async create(dto: CreateRouteDto) {
    const origin = await this.getAirport(dto.originId);
    const destination = await this.getAirport(dto.destinationId);
    const route = this.routeRepo.create({ ...dto, origin, destination });
    return this.routeRepo.save(route);
  }

  async update(id: string, dto: UpdateRouteDto) {
    const route = await this.findOne(id);
    if (dto.routeType) route.routeType = dto.routeType;
    if (dto.originId) {
      const origin = await this.getAirport(dto.originId);
      route.origin = origin;
    }
    if (dto.destinationId) {
      const destination = await this.getAirport(dto.destinationId);
      route.destination = destination;
    }
    if (dto.durationMin) route.durationMin = dto.durationMin;
    return this.routeRepo.save(route);
  }

  async delete(id: string) {
    const route = await this.findOne(id);
    route.isActive = false;
    return this.routeRepo.save(route);
  }
}
