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
import { NoticeService } from './notice.service';
import { CreateNoticeDto, QueryNoticeDto, UpdateNoticeDto } from './dtos';
import { PERMISSIONS } from '@/constants';

const { NOTICE } = PERMISSIONS;

@Controller('notices')
export class NoticeController {
  constructor(private readonly service: NoticeService) {}

  /**
   * GET /notices
   * List all notices (includes inactive) - admin/staff only.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(NOTICE.READ)
  @Get()
  async findAll(@Query() query: QueryNoticeDto) {
    return await this.service.findAll(query);
  }

  /**
   * GET /notices/public
   * List active notices for public website (non-admin).
   */
  @Get('public')
  async findPublic(@Query() query: QueryNoticeDto) {
    return await this.service.findPublic(query);
  }

  /**
   * GET /notices/highlights
   * Get highlighted notices for homepage slider.
   */
  @Get('highlights')
  async findHighlights(@Query('limit') limit?: string) {
    const limitNum = limit ? Math.min(Number(limit), 10) : 5;
    return await this.service.findHighlights(limitNum);
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
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(NOTICE.CREATE)
  @Post()
  async create(@Body() dto: CreateNoticeDto) {
    return await this.service.create(dto);
  }

  /**
   * PATCH /notices/:id
   * Update existing notice.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(NOTICE.UPDATE)
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
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(NOTICE.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
