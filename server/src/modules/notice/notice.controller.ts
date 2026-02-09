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
import { NoticeService } from './notice.service';
import { CreateNoticeDto, QueryNoticeDto, UpdateNoticeDto } from './dtos';

@Controller('notices')
export class NoticeController {
  constructor(private readonly service: NoticeService) {}

  /**
   * GET /notices
   * List all notices with filters and pagination.
   */
  @Get()
  async findAll(@Query() query: QueryNoticeDto) {
    return await this.service.findAll(query);
  }

  /**
   * GET /notices/:id
   * Retrieve a single notice by ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  /**
   * POST /notices
   * Create a new notice.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: CreateNoticeDto) {
    return await this.service.create(dto);
  }

  /**
   * PATCH /notices/:id
   * Update existing notice.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNoticeDto,
  ) {
    return await this.service.update(id, dto);
  }

  /**
   * DELETE /notices/:id
   * Delete existing notice.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
