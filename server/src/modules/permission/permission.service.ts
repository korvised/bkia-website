import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/database';
import { CreatePermissionDto, QueryPermissionDto, UpdatePermissionDto } from './dtos';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async findAll(query: QueryPermissionDto): Promise<Permission[]> {
    const qb = this.repository.createQueryBuilder('permission');

    if (query.search) {
      qb.where(
        'LOWER(permission.name) LIKE :search OR LOWER(permission.slug) LIKE :search',
        { search: `%${query.search.toLowerCase()}%` },
      );
    }

    qb.orderBy('permission.name', 'ASC');

    return qb.getMany();
  }

  async findOne(id: string): Promise<Permission | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneBySlug(slug: string): Promise<Permission | null> {
    return this.repository.findOneBy({ slug });
  }

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const existing = await this.findOneBySlug(dto.slug);
    if (existing) {
      throw new BadRequestException(
        `Permission with slug "${dto.slug}" already exists`,
      );
    }

    return this.repository.save(this.repository.create(dto));
  }

  async update(id: string, dto: UpdatePermissionDto): Promise<Permission> {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new BadRequestException('Permission not found');
    }

    Object.assign(existing, dto);

    return this.repository.save(existing);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new BadRequestException('Permission not found');
    }

    await this.repository.delete(id);
  }
}
