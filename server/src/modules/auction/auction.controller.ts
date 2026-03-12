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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Permissions, Roles } from '@/common/decorators';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { documentFileFilter } from '@/common/filters';
import { FILE_SIZES } from '@/constants';
import { PERMISSIONS } from '@/constants';
import { UserRole } from '@/types/enum';
import { AuctionService } from './auction.service';
import { CreateAuctionDto, QueryAuctionDto, UpdateAuctionDto } from './dtos';

const { AUCTION } = PERMISSIONS;

@Controller('auctions')
export class AuctionController {
  constructor(private readonly service: AuctionService) {}

  /**
   * GET /auctions
   * Paginated admin list (all statuses).
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AUCTION.READ)
  @Get()
  async findAll(@Query() query: QueryAuctionDto) {
    return this.service.findAll(query);
  }

  /**
   * GET /auctions/public
   * Paginated public list for the website.
   */
  @Get('public')
  async findPublic(@Query() query: QueryAuctionDto) {
    return this.service.findPublic(query);
  }

  /**
   * GET /auctions/:id
   * Single auction detail (public).
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  /**
   * POST /auctions
   * Create auction with optional document uploads.
   * Field name: documents[] (multiple PDF files)
   * Body field: documentNames (JSON string array, parallel to files)
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AUCTION.CREATE)
  @Post()
  @UseInterceptors(
    FilesInterceptor('documents', 20, {
      limits: { fileSize: FILE_SIZES.LARGE_DOCUMENT },
      fileFilter: documentFileFilter,
    }),
  )
  async create(
    @Body() dto: CreateAuctionDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.service.create(dto, files);
  }

  /**
   * PATCH /auctions/:id
   * Update auction. Optionally adds new documents or removes existing ones.
   * Field name: newDocuments[] (new PDF files)
   * Body fields: newDocumentNames (JSON), removeDocumentIds (JSON)
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AUCTION.UPDATE)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('newDocuments', 20, {
      limits: { fileSize: FILE_SIZES.LARGE_DOCUMENT },
      fileFilter: documentFileFilter,
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAuctionDto,
    @UploadedFiles() newFiles?: Express.Multer.File[],
  ) {
    return this.service.update(id, dto, newFiles);
  }

  /**
   * DELETE /auctions/:auctionId/documents/:docId
   * Remove a single document from an auction.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AUCTION.UPDATE)
  @Delete(':auctionId/documents/:docId')
  async deleteDocument(
    @Param('auctionId', ParseUUIDPipe) auctionId: string,
    @Param('docId', ParseUUIDPipe) docId: string,
  ) {
    await this.service.deleteDocument(auctionId, docId);
    return { message: 'Document deleted' };
  }

  /**
   * DELETE /auctions/:id
   * Delete auction and all associated documents + files.
   */
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AUCTION.DELETE)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return { message: 'Auction deleted' };
  }
}
