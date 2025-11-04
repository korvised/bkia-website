import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Not, Repository } from 'typeorm';
import { Role } from '@/database';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dtos';
import { UserRole } from '@/types/enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async findAll(query: QueryRoleDto): Promise<Role[]> {
    const { isActive = '' } = query;

    const options: FindManyOptions<Role> = {
      where: {
        role: Not(In([UserRole.ADMIN])),
      },
    };

    if (isActive === 'true')
      options.where = { ...options.where, isActive: true };
    if (isActive === 'false')
      options.where = { ...options.where, isActive: false };

    options.order = {
      createdAt: 'ASC',
    };

    return this.repository.find(options);
  }

  async findOne(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneByRole(role: UserRole): Promise<Role | null> {
    return this.repository.findOneBy({ role });
  }

  async create(createRole: CreateRoleDto): Promise<Role> {
    return this.repository.save(createRole);
  }

  async update(role: string, updateRole: UpdateRoleDto): Promise<Role | null> {
    const existingRole = await this.findOne(role);
    if (!existingRole) {
      throw new BadRequestException('Role not found');
    }

    Object.assign(existingRole, updateRole);

    await this.repository.update(role, updateRole);

    return this.findOne(role);
  }

  async delete(role: string): Promise<void> {
    const existingRole = await this.findOne(role);
    if (!existingRole) {
      throw new BadRequestException('Role not found');
    }

    await this.repository.delete(role);
  }
}
