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
@Roles(UserRole.ADMIN)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Get()
  findAll(@Query() query: QueryPermissionDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.service.findOne(id);
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
