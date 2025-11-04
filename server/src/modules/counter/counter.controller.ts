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
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';
import { CreateCounterDto, QueryCounterDto, UpdateCounterDto } from './dtos';
import { CounterService } from './counter.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PASSENGER)
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

  @Post()
  create(@Body() body: CreateCounterDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCounterDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
