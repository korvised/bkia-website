import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
import { BannerService } from './banner.service';
import { CreateBannerDto, QueryBannerDto, UpdateBannerDto } from './dtos';

const { BANNER } = PERMISSIONS;

@Controller('banners')
export class BannerController {
  constructor(private readonly service: BannerService) {}

  /**
   * GET /banners
   * List all banners (admin/staff only, with pagination).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(BANNER.READ)
  @Get()
  async findAll(@Query() query: QueryBannerDto) {
    return await this.service.findAll(query);
  }

  /**
   * GET /banners/public
   * List active banners for the public homepage hero slider.
   */
  @Get('public')
  async findPublic() {
    return await this.service.findPublic();
  }

  /**
   * GET /banners/:id
   * Retrieve a single banner by ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  /**
   * POST /banners
   * Create a new banner slide with image upload.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(BANNER.CREATE)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() dto: CreateBannerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Image is required');
    }
    return await this.service.create(dto, image);
  }

  /**
   * PATCH /banners/:id
   * Update existing banner slide (optionally replace image).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(BANNER.UPDATE)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBannerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.service.update(id, dto, image);
  }

  /**
   * DELETE /banners/:id
   * Delete a banner slide.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(BANNER.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
