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
import { CreateRouteDto, QueryRouteDto, UpdateRouteDto } from './dtos';
import { RouteService } from './route.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PASSENGER)
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

  @Post()
  create(@Body() body: CreateRouteDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRouteDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.delete(id);
  }
}
