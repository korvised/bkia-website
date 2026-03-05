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
import { CreateCounterDto, QueryCounterDto, UpdateCounterDto } from './dtos';
import { CounterService } from './counter.service';
import { PERMISSIONS } from '@/constants';

const { COUNTER } = PERMISSIONS;

@Controller('counters')
export class CounterController {
  constructor(private readonly service: CounterService) {}

  @Get()
  findAll(@Query() query: QueryCounterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(COUNTER.CREATE)
  @Post()
  create(@Body() body: CreateCounterDto) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(COUNTER.UPDATE)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCounterDto,
  ) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(COUNTER.DELETE)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
