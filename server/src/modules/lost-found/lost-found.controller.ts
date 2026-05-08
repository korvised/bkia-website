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
import { claimFileFilter, imageFileFilter } from '@/common/filters';
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
  UpdateStatusDto,
  CreateClaimDto,
  CreateStandaloneClaimDto,
  ReviewClaimDto,
  QueryClaimsDto,
  LinkClaimDto,
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

// Claim proof files: images + PDFs, up to 20 MB each, up to 5 files
const claimUpload = () =>
  UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: { fileSize: FILE_SIZES.CLAIM_PROOF },
      fileFilter: claimFileFilter,
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

  // ─── CLAIMS (static routes BEFORE parameterized :id) ──────

  @Post('claims')
  @claimUpload()
  createStandaloneClaim(
    @Body() dto: CreateStandaloneClaimDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.service.createStandaloneClaim(dto, files ?? []);
  }

  @Get('claims/track/:referenceCode')
  trackClaim(@Param('referenceCode') referenceCode: string) {
    return this.service.trackClaim(referenceCode);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.READ)
  @Get('claims/all')
  findAllClaims(@Query() query: QueryClaimsDto) {
    return this.service.findAllClaims(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.READ)
  @Get('claims/:claimId')
  findOneClaim(@Param('claimId', new ParseUUIDPipe()) claimId: string) {
    return this.service.findOneClaim(claimId);
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
  @Permissions(LOST_FOUND.UPDATE)
  @Patch('claims/:claimId/link')
  linkClaim(
    @Param('claimId', new ParseUUIDPipe()) claimId: string,
    @Body() dto: LinkClaimDto,
  ) {
    return this.service.linkClaim(claimId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(LOST_FOUND.UPDATE)
  @Patch('claims/:claimId/unlink')
  unlinkClaim(
    @Param('claimId', new ParseUUIDPipe()) claimId: string,
  ) {
    return this.service.unlinkClaim(claimId);
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
  @claimUpload()
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
  @Patch(':id/status')
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
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
  @Permissions(LOST_FOUND.DELETE)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
