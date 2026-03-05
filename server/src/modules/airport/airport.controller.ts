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
import { Permissions, Roles } from '@/common/decorators';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { UserRole } from '@/types/enum';
import { CreateAirportDto, QueryAirportDto, UpdateAirportDto } from './dtos';
import { AirportService } from './airport.service';
import { PERMISSIONS } from '@/constants';

const { AIRPORT } = PERMISSIONS;

@Controller('airports')
export class AirportController {
  constructor(private readonly service: AirportService) {}

  @Get()
  findAll(@Query() query: QueryAirportDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRPORT.CREATE)
  @Post()
  create(@Body() body: CreateAirportDto) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRPORT.UPDATE)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAirportDto,
  ) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRPORT.DELETE)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
