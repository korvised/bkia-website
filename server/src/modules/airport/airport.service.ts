import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from '@/database';
import { CreateAirportDto, QueryAirportDto, UpdateAirportDto } from './dtos';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airlineRepo: Repository<Airport>,
  ) {}

  async findOne(id: string) {
    const airport = await this.airlineRepo.findOneBy({ id });
    if (!airport) {
      throw new Error('Airport not found');
    }
    return airport;
  }

  async findAll(query: QueryAirportDto) {
    const { search, isActive } = query;

    const qb = this.airlineRepo.createQueryBuilder('a');

    if (search) {
      qb.andWhere('(a.code ILIKE :s OR a.name ILIKE :s)', {
        s: `%${search.trim()}%`,
      });
    }

    if (isActive === 'true') qb.andWhere('a.isActive = true');
    if (isActive === 'false') qb.andWhere('a.isActive = false');

    qb.orderBy('a.createdAt', 'ASC');

    return qb.getMany();
  }

  async create(dto: CreateAirportDto) {
    const airport = this.airlineRepo.create(dto);
    return this.airlineRepo.save(airport);
  }

  async update(id: string, dto: UpdateAirportDto) {
    const airport = await this.findOne(id);
    Object.assign(airport, dto);
    return this.airlineRepo.save(airport);
  }

  async delete(id: string) {
    const airport = await this.findOne(id);
    return this.airlineRepo.remove(airport);
  }
}
