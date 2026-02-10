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
import { Roles } from '@/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES } from '@/constants';
import { UserRole } from '@/types/enum';
import { NewsService } from './news.service';
import { CreateNewsDto, QueryNewsDto, UpdateNewsDto } from './dtos';

@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  /**
   * GET /news
   * List all news (admin only - includes drafts).
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(@Query() query: QueryNewsDto) {
    return await this.service.findAll(query);
  }

  /**
   * GET /news/public
   * List published news for public website.
   */
  @Get('public')
  async findPublic(@Query() query: QueryNewsDto) {
    return await this.service.findPublic(query);
  }

  /**
   * GET /news/featured
   * Get featured news for homepage.
   */
  @Get('featured')
  async findFeatured(@Query('limit') limit?: string) {
    const limitNum = limit ? Math.min(Number(limit), 10) : 3;
    return await this.service.findFeatured(limitNum);
  }

  /**
   * GET /news/slug/:slug
   * Get news by slug (for SEO-friendly URLs).
   */
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const news = await this.service.findBySlug(slug);
    // Increment view count
    await this.service.incrementViewCount(news.id);
    return news;
  }

  /**
   * GET /news/:id
   * Retrieve a single news by ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  /**
   * POST /news
   * Create a new news article with cover image upload.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('coverImage', {
      limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() dto: CreateNewsDto,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    if (!coverImage) {
      throw new BadRequestException('Cover image is required');
    }

    return await this.service.create(dto, coverImage);
  }

  /**
   * PATCH /news/:id
   * Update existing news article (optionally update cover image).
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('coverImage', {
      limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNewsDto,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    return await this.service.update(id, dto, coverImage);
  }

  /**
   * DELETE /news/:id
   * Delete existing news article.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }
}
