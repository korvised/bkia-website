import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dtos';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(@Query() query: QueryRoleDto) {
    return this.roleService.findAll(query);
  }

  @Get(':role')
  async findOne(role: string) {
    const existingRole = await this.roleService.findOne(role);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    return existingRole;
  }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    const existingRole = await this.roleService.findOne(
      body.role.toUpperCase(),
    );
    if (existingRole) {
      throw new BadRequestException('Role already exists');
    }

    return this.roleService.create(body);
  }

  @Put(':role')
  async update(@Param('role') role: string, @Body() body: UpdateRoleDto) {
    return this.roleService.update(role.toUpperCase(), body);
  }

  @Delete(':role')
  async delete(@Param('role') role: string) {
    const existingRole = await this.roleService.findOne(role.toUpperCase());
    if (!existingRole) {
      throw new BadRequestException('Role not found');
    }

    return this.roleService.delete(role.toUpperCase());
  }
}
