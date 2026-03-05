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
import { FlightService } from './flight.service';
import {
  BulkCreateFlightDto,
  CreateFlightDto,
  QueryFlightDto,
  UpdateFlightDto,
} from './dtos';
import { PERMISSIONS } from '@/constants';

const { FLIGHT } = PERMISSIONS;

@Controller('flights')
export class FlightController {
  constructor(private readonly service: FlightService) {}

  /**
   * GET /flights
   * List all flights with filters and pagination.
   */
  @Get()
  async findAll(@Query() query: QueryFlightDto) {
    return await this.service.findAll(query);
  }

  /**
   * GET /flights/:id
   * Retrieve a single flight by ID with full relations.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  /**
   * POST /flights
   * Create a new flight.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FLIGHT.CREATE)
  @Post()
  async create(@Body() dto: CreateFlightDto) {
    return await this.service.create(dto);
  }

  /**
   * POST /flights/bulk
   * Create muti flights.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FLIGHT.CREATE)
  @Post('bulk')
  bulkCreate(@Body() dto: BulkCreateFlightDto) {
    return this.service.bulkCreate(dto);
  }

  /**
   * PATCH /flights/:id
   * Update existing flight.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FLIGHT.UPDATE)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFlightDto,
  ) {
    return await this.service.update(id, dto);
  }

  /**
   * DELETE /flights/:id
   * Delete existing flight.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FLIGHT.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
