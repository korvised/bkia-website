import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Counter } from '@/database';
import {
  CreateCounterDto,
  QueryCounterDto,
  UpdateCounterDto,
} from '@/modules/counter/dtos';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepo: Repository<Counter>,
  ) {}

  async findAll(query: QueryCounterDto) {
    const { terminal, isActive = '' } = query;
    const qb = this.counterRepo.createQueryBuilder('c');

    if (terminal) qb.andWhere('c.terminal = :terminal', { terminal });

    if (isActive === 'true') qb.andWhere('c.isActive = true');
    if (isActive === 'false') qb.andWhere('c.isActive = false');

    qb.orderBy('c.name', 'ASC');

    return qb.getMany();
  }

  async findOne(id: string) {
    const counter = await this.counterRepo.findOneBy({ id });
    if (!counter) {
      throw new Error('Counter not found');
    }
    return counter;
  }

  async findByCounterIds(ids: string[]) {
    return this.counterRepo.find({
      where: { id: In(ids) },
    });
  }

  async create(dto: CreateCounterDto) {
    const counter = this.counterRepo.create(dto);
    return this.counterRepo.save(counter);
  }

  async update(id: string, dto: UpdateCounterDto) {
    const counter = await this.findOne(id);
    Object.assign(counter, dto);
    return this.counterRepo.save(counter);
  }

  async delete(id: string) {
    const counter = await this.findOne(id);
    counter.isActive = false;
    return this.counterRepo.save(counter);
  }
}
