import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostFound, LostFoundClaim, User } from '@/database';
import { FileService } from '@/common/file';
import {
  ClaimStatus,
  LostFoundStatus,
} from '@/types/enum';
import {
  CreateClaimDto,
  CreateLostFoundDto,
  QueryLostFoundAdminDto,
  QueryLostFoundDto,
  ReviewClaimDto,
  UpdateDisplayDto,
} from './dtos';

function getDisplay(
  map: Record<string, string>,
  locale: string,
  fallback: string,
): string {
  return map[locale] || map['en'] || fallback;
}

function generateReferenceCode(): string {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LF-${d}-${rand}`;
}

@Injectable()
export class LostFoundService {
  constructor(
    @InjectRepository(LostFound)
    private readonly repo: Repository<LostFound>,
    @InjectRepository(LostFoundClaim)
    private readonly claimRepo: Repository<LostFoundClaim>,
    private readonly fileService: FileService,
  ) {}

  // ─── PUBLIC ────────────────────────────────────────────────

  async create(dto: CreateLostFoundDto, files: Express.Multer.File[], user: User) {
    const referenceCode = generateReferenceCode();

    const record = this.repo.create({
      ...dto,
      incidentDate: new Date(dto.incidentDate),
      referenceCode,
      images: [],
      createdBy: user,
    });

    const saved = await this.repo.save(record);

    if (files?.length) {
      const uploaded = await Promise.all(
        files.map((f) =>
          this.fileService.uploadFile(f, `lost-found/${saved.id}`),
        ),
      );
      saved.images = uploaded;
      await this.repo.save(saved);
    }

    return { referenceCode: saved.referenceCode };
  }

  // Public stats — aggregated counts (no PII)
  async getStats() {
    const [total, open, matched, returned] = await Promise.all([
      this.repo.count(),
      this.repo.count({ where: { status: LostFoundStatus.OPEN } }),
      this.repo.count({ where: { status: LostFoundStatus.MATCHED } }),
      this.repo.count({ where: { status: LostFoundStatus.RETURNED } }),
    ]);
    return { total, open, matched, returned };
  }

  // Public list — only VISIBLE, select necessary fields + display fields by locale
  async findAll(query: QueryLostFoundDto) {
    const {
      type,
      category,
      search,
      locale = 'en',
      page = 1,
      limit = 20,
    } = query;

    const qb = this.repo
      .createQueryBuilder('lf')
      .select([
        'lf.id',
        'lf.type',
        'lf.status',
        'lf.category',
        'lf.displayNames',
        'lf.displayDescriptions',
        'lf.displayLocations',
        'lf.incidentDate',
        'lf.flightNumber',
        'lf.createdAt',
        'cover.id',
        'cover.path',
      ])
      .leftJoin('lf.coverImage', 'cover')
      .orderBy('lf.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) qb.andWhere('lf.type = :type', { type });
    if (category) qb.andWhere('lf.category = :category', { category });
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(lf.itemName ILIKE :s OR EXISTS (
          SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayNames", '{}'::jsonb)) j(k,v) WHERE v ILIKE :s
        ))`,
        { s },
      );
    }

    const [data, total] = await qb.getManyAndCount();

    // map display fields by locale
    const items = data.map((lf) => ({
      id: lf.id,
      type: lf.type,
      status: lf.status,
      category: lf.category,
      itemName: getDisplay(lf.displayNames, locale, ''),
      description: getDisplay(lf.displayDescriptions, locale, ''),
      location: getDisplay(lf.displayLocations, locale, ''),
      incidentDate: lf.incidentDate,
      flightNumber: lf.flightNumber,
      coverImage: lf.coverImage ?? null,
      createdAt: lf.createdAt,
    }));

    return {
      data: items,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  // Public detail — single item by id
  async findOne(id: string, locale = 'en') {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { coverImage: true, images: true },
      select: {
        id: true,
        type: true,
        status: true,
        category: true,
        displayNames: true,
        displayDescriptions: true,
        displayLocations: true,
        incidentDate: true,
        flightNumber: true,
        referenceCode: true,
        createdAt: true,
        coverImage: { id: true, path: true },
        images: { id: true, path: true },
      },
    });

    if (!lf) throw new NotFoundException('Item not found');

    return {
      id: lf.id,
      type: lf.type,
      status: lf.status,
      category: lf.category,
      itemName: getDisplay(lf.displayNames, locale, ''),
      description: getDisplay(lf.displayDescriptions, locale, ''),
      location: getDisplay(lf.displayLocations, locale, ''),
      incidentDate: lf.incidentDate,
      flightNumber: lf.flightNumber,
      referenceCode: lf.referenceCode,
      coverImage: lf.coverImage ?? null,
      images: lf.images,
      createdAt: lf.createdAt,
    };
  }

  // ─── STAFF ─────────────────────────────────────────────────

  async findAllAdmin(query: QueryLostFoundAdminDto) {
    const {
      type,
      category,
      status,
      search,
      page = 1,
      limit = 20,
    } = query;

    const qb = this.repo
      .createQueryBuilder('lf')
      .leftJoinAndSelect('lf.createdBy', 'creator')
      .loadRelationCountAndMap(
        'lf.pendingClaimsCount',
        'lf.claims',
        'claim',
        (cb) => cb.where('claim.status = :cs', { cs: ClaimStatus.PENDING }),
      )
      .orderBy('lf.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) qb.andWhere('lf.type = :type', { type });
    if (category) qb.andWhere('lf.category = :category', { category });
    if (status) qb.andWhere('lf.status = :status', { status });
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(lf.itemName ILIKE :s OR EXISTS (
          SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayNames", '{}'::jsonb)) j(k,v) WHERE v ILIKE :s
        ))`,
        { s },
      );
    }

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findOneAdmin(id: string) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: {
        images: true,
        handledBy: true,
        createdBy: true,
      },
    });
    if (!lf) throw new NotFoundException('Item not found');
    return lf;
  }

  async updateDisplay(id: string, dto: UpdateDisplayDto) {
    const lf = await this.findOneAdmin(id);
    if (dto.displayNames) lf.displayNames = dto.displayNames;
    if (dto.displayDescriptions)
      lf.displayDescriptions = dto.displayDescriptions;
    if (dto.displayLocations) lf.displayLocations = dto.displayLocations;
    return this.repo.save(lf);
  }

  async uploadImages(id: string, files: Express.Multer.File[]) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!lf) throw new NotFoundException('Item not found');

    const uploaded = await Promise.all(
      files.map((f) => this.fileService.uploadFile(f, `lost-found/${id}`)),
    );
    lf.images = [...lf.images, ...uploaded];
    return this.repo.save(lf);
  }

  async removeImage(id: string, fileId: string) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { images: true, coverImage: true },
    });
    if (!lf) throw new NotFoundException('Item not found');

    const exists = lf.images.some((f) => f.id === fileId);
    if (!exists)
      throw new BadRequestException('Image not found on this record');

    // if removing cover, clear it
    if (lf.coverImage?.id === fileId) lf.coverImage = null;

    lf.images = lf.images.filter((f) => f.id !== fileId);
    await this.repo.save(lf);
    await this.fileService.deleteFile(fileId);
    return { success: true };
  }

  // ─── CLAIMS ────────────────────────────────────────────────

  async createClaim(
    id: string,
    dto: CreateClaimDto,
    files: Express.Multer.File[],
  ) {
    const lf = await this.repo.findOne({ where: { id } });
    if (!lf) throw new NotFoundException('Item not found');

    if (lf.type !== 'FOUND')
      throw new BadRequestException('Can only claim FOUND items');
    if (lf.status === LostFoundStatus.RETURNED)
      throw new BadRequestException('Item already returned');

    const claim = this.claimRepo.create({
      lostFound: lf,
      claimantName: dto.claimantName,
      claimantEmail: dto.claimantEmail,
      claimantPhone: dto.claimantPhone ?? null,
      flightNumber: dto.flightNumber ?? null,
      seatNumber: dto.seatNumber ?? null,
      ownershipProof: dto.ownershipProof,
      proofFiles: [],
    });

    const saved = await this.claimRepo.save(claim);

    if (files?.length) {
      const uploaded = await Promise.all(
        files.map((f) =>
          this.fileService.uploadFile(f, `lost-found/${id}/claims/${saved.id}`),
        ),
      );
      saved.proofFiles = uploaded;
      await this.claimRepo.save(saved);
    }

    // set parent to MATCHED
    lf.status = LostFoundStatus.MATCHED;
    await this.repo.save(lf);

    return { claimId: saved.id, message: 'Claim submitted successfully' };
  }

  async reviewClaim(claimId: string, dto: ReviewClaimDto, staff: User) {
    const claim = await this.claimRepo.findOne({
      where: { id: claimId },
      relations: { lostFound: true },
    });
    if (!claim) throw new NotFoundException('Claim not found');

    claim.status = dto.status;
    claim.staffNote = dto.staffNote ?? null;
    claim.reviewedBy = staff;
    claim.reviewedAt = new Date();

    if (dto.status === ClaimStatus.COMPLETED) {
      claim.lostFound.status = LostFoundStatus.RETURNED;
      claim.lostFound.resolvedAt = new Date();
      claim.lostFound.handledBy = staff;
      await this.repo.save(claim.lostFound);
    }

    return this.claimRepo.save(claim);
  }

  async findClaims(lostFoundId: string) {
    return this.claimRepo.find({
      where: { lostFound: { id: lostFoundId } },
      relations: { proofFiles: true, reviewedBy: true },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!lf) throw new NotFoundException('Item not found');

    // Delete all uploaded image files from storage
    if (lf.images?.length) {
      await Promise.allSettled(
        lf.images.map((f) => this.fileService.deleteFile(f.id)),
      );
    }

    await this.repo.remove(lf);
    return { success: true };
  }
}
