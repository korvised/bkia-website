import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Permissions, Roles } from '@/common/decorators';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { PERMISSIONS } from '@/constants';
import { UserRole } from '@/types/enum';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, QueryFeedbackDto, UpdateStatusDto } from './dtos';

const { FEEDBACK } = PERMISSIONS;

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  /**
   * POST /feedback
   * Submit feedback (public). Accepts up to 5 files of any type.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files', 5))
  async create(
    @Body() dto: CreateFeedbackDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.service.create(dto, files);
  }

  /**
   * GET /feedback
   * Paginated list for admin (filter by status / category).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FEEDBACK.READ)
  @Get()
  async findAll(@Query() query: QueryFeedbackDto) {
    return this.service.findAll(query);
  }

  /**
   * GET /feedback/:id
   * Single feedback detail with files.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FEEDBACK.READ)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  /**
   * PATCH /feedback/:id/status
   * Update feedback status (admin).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FEEDBACK.UPDATE)
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  /**
   * DELETE /feedback/:id
   * Delete feedback and its files from S3 + DB.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(FEEDBACK.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return { message: 'Feedback deleted' };
  }
}
