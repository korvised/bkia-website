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

const { AIRLINE } = PERMISSIONS;

@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Permissions(AIRLINE.UPDATE)
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

  @Post()
  create(@Body() body: CreateAirportDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAirportDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
