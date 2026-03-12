import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction, AuctionDocument } from '@/database';
import { FileService } from '@/common/file';
import { CreateAuctionDto, QueryAuctionDto, UpdateAuctionDto } from './dtos';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepo: Repository<Auction>,
    @InjectRepository(AuctionDocument)
    private readonly docRepo: Repository<AuctionDocument>,
    private readonly fileService: FileService,
  ) {}

  /** Find single auction with documents and files. */
  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctionRepo.findOne({
      where: { id },
      relations: { documents: { file: true } },
      order: { documents: { order: 'ASC', createdAt: 'ASC' } },
    });
    if (!auction) throw new NotFoundException('Auction not found');
    return auction;
  }

  /** Paginated list for admin (all statuses). */
  async findAll(dto: QueryAuctionDto) {
    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.auctionRepo
      .createQueryBuilder('auction')
      .leftJoinAndSelect('auction.documents', 'documents')
      .leftJoinAndSelect('documents.file', 'file');

    if (dto.status) {
      qb.andWhere('auction.status = :status', { status: dto.status });
    }
    if (dto.category) {
      qb.andWhere('auction.category = :category', { category: dto.category });
    }
    if (dto.search) {
      qb.andWhere(
        "(auction.title->>'en' ILIKE :search OR auction.title->>'lo' ILIKE :search OR auction.title->>'zh' ILIKE :search)",
        { search: `%${dto.search}%` },
      );
    }

    qb.orderBy('auction.startDate', 'DESC').addOrderBy('auction.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /** Paginated public list (all statuses visible to web). */
  async findPublic(dto: QueryAuctionDto) {
    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.auctionRepo
      .createQueryBuilder('auction')
      .leftJoinAndSelect('auction.documents', 'documents')
      .leftJoinAndSelect('documents.file', 'file');

    if (dto.status) {
      qb.andWhere('auction.status = :status', { status: dto.status });
    }
    if (dto.category) {
      qb.andWhere('auction.category = :category', { category: dto.category });
    }

    qb.orderBy('auction.startDate', 'DESC').addOrderBy('auction.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /** Create auction with optional document uploads. */
  async create(
    dto: CreateAuctionDto,
    files?: Express.Multer.File[],
  ): Promise<Auction> {
    const auction = this.auctionRepo.create({
      title: dto.title,
      description: dto.description,
      category: dto.category,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      status: dto.status,
    });

    const saved = await this.auctionRepo.save(auction);

    // Upload documents if provided
    if (files && files.length > 0) {
      const names = dto.documentNames ?? [];
      for (let i = 0; i < files.length; i++) {
        const uploaded = await this.fileService.uploadFile(files[i], 'auctions');
        const doc = this.docRepo.create({
          auction: saved,
          file: uploaded,
          fileName: names[i] ?? { en: files[i].originalname },
          order: i,
        });
        await this.docRepo.save(doc);
      }
    }

    return this.findOne(saved.id);
  }

  /** Update auction fields + optionally add/remove documents. */
  async update(
    id: string,
    dto: UpdateAuctionDto,
    newFiles?: Express.Multer.File[],
  ): Promise<Auction> {
    const auction = await this.findOne(id);

    if (dto.title !== undefined) auction.title = dto.title;
    if (dto.description !== undefined) auction.description = dto.description;
    if (dto.category !== undefined) auction.category = dto.category;
    if (dto.startDate !== undefined) auction.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) auction.endDate = new Date(dto.endDate);
    if (dto.status !== undefined) auction.status = dto.status;

    await this.auctionRepo.save(auction);

    // Remove specified documents
    if (dto.removeDocumentIds && dto.removeDocumentIds.length > 0) {
      for (const docId of dto.removeDocumentIds) {
        await this.deleteDocument(id, docId);
      }
    }

    // Add new documents
    if (newFiles && newFiles.length > 0) {
      const existingCount = await this.docRepo.count({
        where: { auction: { id } },
      });
      const names = dto.newDocumentNames ?? [];
      for (let i = 0; i < newFiles.length; i++) {
        const uploaded = await this.fileService.uploadFile(newFiles[i], 'auctions');
        const doc = this.docRepo.create({
          auction: { id },
          file: uploaded,
          fileName: names[i] ?? { en: newFiles[i].originalname },
          order: existingCount + i,
        });
        await this.docRepo.save(doc);
      }
    }

    return this.findOne(id);
  }

  /** Delete a single document from an auction (removes file from S3 + DB). */
  async deleteDocument(auctionId: string, docId: string): Promise<void> {
    const doc = await this.docRepo.findOne({
      where: { id: docId, auction: { id: auctionId } },
      relations: { file: true },
    });
    if (!doc) throw new NotFoundException('Document not found');

    const fileId = doc.file.id;
    await this.docRepo.remove(doc);
    await this.fileService.deleteFile(fileId);
  }

  /** Delete auction and all its documents + files. */
  async delete(id: string): Promise<void> {
    const auction = await this.findOne(id);

    // Collect file IDs before removal
    const fileIds = auction.documents.map((d) => d.file.id);

    await this.auctionRepo.remove(auction); // cascades to documents

    // Delete files from S3 + DB
    for (const fileId of fileIds) {
      await this.fileService.deleteFile(fileId);
    }
  }
}
