import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Permissions, Roles } from '@/common/decorators';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES, PERMISSIONS } from '@/constants';
import { UserRole } from '@/types/enum';

const { CAREER } = PERMISSIONS;
import { CareerActivityService } from './career-activity.service';
import {
  CreateCareerActivityDto,
  UpdateCareerActivityDto,
  ReorderCareerActivitiesDto,
} from './dtos';

@Controller('career/activities')
export class CareerActivityController {
  constructor(private readonly service: CareerActivityService) {}

  /**
   * GET /career/activities
   * Public: list all active activity photos ordered by sortOrder.
   */
  @Get()
  async findActive() {
    return this.service.findActive();
  }

  /**
   * GET /career/activities/all
   * Admin: list all activity photos (active + inactive).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(CAREER.READ)
  @Get('all')
  async findAll() {
    return this.service.findAll();
  }

  /**
   * POST /career/activities
   * Upload a new activity photo (admin only).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.CREATE)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() dto: CreateCareerActivityDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.create(dto, image);
  }

  /**
   * PATCH /career/activities/reorder
   * Bulk-update sortOrder to match the supplied ordered array of IDs.
   * Must be declared BEFORE :id route to avoid param collision.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.UPDATE)
  @Patch('reorder')
  async reorder(
    @Body() dto: ReorderCareerActivitiesDto,
  ): Promise<{ success: boolean }> {
    await this.service.reorderActivities(dto.ids);
    return { success: true };
  }

  /**
   * PATCH /career/activities/:id
   * Update caption, sortOrder, or isActive for an activity.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.UPDATE)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCareerActivityDto,
  ) {
    return this.service.update(id, dto);
  }

  /**
   * DELETE /career/activities/:id
   * Delete an activity photo.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
