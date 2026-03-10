import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { Permissions, Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';
import { PERMISSIONS } from '@/constants';
import { CreateRouteDto, QueryRouteDto, UpdateRouteDto } from './dtos';
import { RouteService } from './route.service';

const { ROUTE } = PERMISSIONS;

@Controller('routes')
export class RouteController {
  constructor(private readonly service: RouteService) {}

  @Get()
  findAll(@Query() query: QueryRouteDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(ROUTE.CREATE)
  @Post()
  create(@Body() body: CreateRouteDto) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(ROUTE.UPDATE)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRouteDto,
  ) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(ROUTE.DELETE)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
