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
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES } from '@/constants/file';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { Permissions, Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';
import { LostFoundService } from './lost-found.service';
import {
  CreateLostFoundDto,
  QueryLostFoundDto,
  QueryLostFoundAdminDto,
  UpdateDisplayDto,
  CreateClaimDto,
  ReviewClaimDto,
} from './dtos';
import { PERMISSIONS } from '@/constants';

const { LOST_FOUND } = PERMISSIONS;

const imageUpload = () =>
  UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: { fileSize: FILE_SIZES.MEDIUM_IMAGE },
      fileFilter: imageFileFilter,
    }),
  );

@Controller('lost-found')
export class LostFoundController {
  constructor(private readonly service: LostFoundService) {}

  // ─── STAFF ─────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.CREATE)
  @Post()
  @imageUpload()
  create(
    @Body() dto: CreateLostFoundDto,
    @Request() req: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.service.create(dto, files ?? [], req.user);
  }

  @Get()
  findAll(@Query() query: QueryLostFoundDto) {
    return this.service.findAll(query);
  }

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  // ─── STAFF ─────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.READ)
  @Get('admin/all')
  findAllAdmin(@Query() query: QueryLostFoundAdminDto) {
    return this.service.findAllAdmin(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.READ)
  @Get('admin/:id')
  findOneAdmin(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOneAdmin(id);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('locale') locale?: string,
  ) {
    return this.service.findOne(id, locale);
  }

  @Post(':id/claims')
  @imageUpload()
  createClaim(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateClaimDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.service.createClaim(id, dto, files ?? []);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.UPDATE)
  @Patch(':id/display')
  updateDisplay(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDisplayDto,
  ) {
    return this.service.updateDisplay(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.UPDATE)
  @Post(':id/images')
  @imageUpload()
  uploadImages(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.uploadImages(id, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.UPDATE)
  @Delete(':id/images/:fileId')
  removeImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('fileId', new ParseUUIDPipe()) fileId: string,
  ) {
    return this.service.removeImage(id, fileId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.READ)
  @Get(':id/claims')
  findClaims(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findClaims(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.UPDATE)
  @Patch('claims/:claimId/review')
  reviewClaim(
    @Param('claimId', new ParseUUIDPipe()) claimId: string,
    @Body() dto: ReviewClaimDto,
    @Request() req: any,
  ) {
    return this.service.reviewClaim(claimId, dto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.DELETE)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
