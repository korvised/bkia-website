import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Permissions, Roles } from '@/common/decorators';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES, PERMISSIONS } from '@/constants';
import { UserRole } from '@/types/enum';

const { CAREER } = PERMISSIONS;
import { JobPostService } from './job-post.service';
import { CreateJobPostDto, UpdateJobPostDto } from './dtos';

const coverInterceptor = FileFieldsInterceptor(
  [{ name: 'coverImage', maxCount: 1 }],
  {
    limits: { fileSize: FILE_SIZES.LARGE_IMAGE },
    fileFilter: imageFileFilter,
  },
);

@Controller('career/jobs')
export class JobPostController {
  constructor(private readonly service: JobPostService) {}

  /**
   * GET /career/jobs/public
   * List all published job posts — no authentication required.
   */
  @Get('public')
  async findPublic() {
    return this.service.findPublic();
  }

  /**
   * GET /career/jobs/public/featured
   * List featured published job posts for the home page — no authentication required.
   * NOTE: must be defined before public/:id to avoid route shadowing.
   */
  @Get('public/featured')
  async findFeatured() {
    return this.service.findFeatured();
  }

  /**
   * GET /career/jobs/public/:id
   * Get a single published job post by ID — no authentication required.
   */
  @Get('public/:id')
  async findOnePublic(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOnePublic(id);
  }

  /**
   * GET /career/jobs
   * Admin: list all job posts including drafts.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(CAREER.READ)
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  /**
   * GET /career/jobs/:id
   * Get a single job post by ID.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(CAREER.READ)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  /**
   * POST /career/jobs
   * Create a new job post (optional cover image).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.CREATE)
  @Post()
  @UseInterceptors(coverInterceptor)
  async create(
    @Body() dto: CreateJobPostDto,
    @UploadedFiles() files?: { coverImage?: Express.Multer.File[] },
  ) {
    return this.service.create(dto, files?.coverImage?.[0]);
  }

  /**
   * PATCH /career/jobs/:id
   * Update a job post (optional new cover image).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.UPDATE)
  @Patch(':id')
  @UseInterceptors(coverInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateJobPostDto,
    @UploadedFiles() files?: { coverImage?: Express.Multer.File[] },
  ) {
    return this.service.update(id, dto, files?.coverImage?.[0]);
  }

  /**
   * DELETE /career/jobs/:id
   * Delete a job post.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @Permissions(CAREER.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
