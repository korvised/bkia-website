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
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /** ADMIN and above can list roles (needed for user management UI) */
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get()
  async findAll(@Query() query: QueryRoleDto) {
    return this.roleService.findAll(query);
  }

  /** ADMIN and above can view a single role */
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get(':role')
  async findOne(role: string) {
    const existingRole = await this.roleService.findOne(role);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    return existingRole;
  }

  /** SUPER_ADMIN only — create role */
  @Roles(UserRole.SUPER_ADMIN)
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

  /** SUPER_ADMIN only — update role */
  @Roles(UserRole.SUPER_ADMIN)
  @Put(':role')
  async update(@Param('role') role: string, @Body() body: UpdateRoleDto) {
    return this.roleService.update(role.toUpperCase(), body);
  }

  /** SUPER_ADMIN only — delete role */
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':role')
  async delete(@Param('role') role: string) {
    const existingRole = await this.roleService.findOne(role.toUpperCase());
    if (!existingRole) {
      throw new BadRequestException('Role not found');
    }

    return this.roleService.delete(role.toUpperCase());
  }
}
