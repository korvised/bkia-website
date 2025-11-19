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
import { Roles } from '@/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { UserRole } from '@/types/enum';
import { FlightService } from './flight.service';
import {
  BulkCreateFlightDto,
  CreateFlightDto,
  QueryFlightDto,
  UpdateFlightDto,
} from './dtos';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Post()
  async create(@Body() dto: CreateFlightDto) {
    return await this.service.create(dto);
  }

  /**
   * POST /flights/bulk
   * Create muti flights.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Post('bulk')
  bulkCreate(@Body() dto: BulkCreateFlightDto) {
    return this.service.bulkCreate(dto);
  }

  /**
   * PATCH /flights/:id
   * Update existing flight.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
