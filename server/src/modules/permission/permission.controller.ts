import {
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
import { PermissionService } from './permission.service';
import { CreatePermissionDto, QueryPermissionDto, UpdatePermissionDto } from './dtos';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  /** ADMIN and above can list permissions (needed for user management UI) */
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get()
  findAll(@Query() query: QueryPermissionDto) {
    return this.service.findAll(query);
  }

  /** ADMIN and above can view a single permission */
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.service.findOne(id);
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  /** SUPER_ADMIN only — create permission */
  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.service.create(dto);
  }

  /** SUPER_ADMIN only — update permission */
  @Roles(UserRole.SUPER_ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.service.update(id, dto);
  }

  /** SUPER_ADMIN only — delete permission */
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
