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
  LostFoundVisibility,
} from '@/types/enum';
import {
  CreateClaimDto,
  CreateLostFoundDto,
  QueryLostFoundAdminDto,
  QueryLostFoundDto,
  ReviewClaimDto,
  SetCoverDto,
  UpdateDisplayDto,
  UpdateVisibilityDto,
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

  async create(dto: CreateLostFoundDto, files: Express.Multer.File[]) {
    const referenceCode = generateReferenceCode();

    const record = this.repo.create({
      ...dto,
      incidentDate: new Date(dto.incidentDate),
      referenceCode,
      images: [],
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

    // return only referenceCode to public
    return { referenceCode: saved.referenceCode };
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
      .where('lf.visibility = :v', { v: LostFoundVisibility.VISIBLE })
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

  // Public detail — single item by id, only if VISIBLE
  async findOne(id: string, locale = 'en') {
    const lf = await this.repo.findOne({
      where: { id, visibility: LostFoundVisibility.VISIBLE },
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
      visibility,
      search,
      page = 1,
      limit = 20,
    } = query;

    const qb = this.repo
      .createQueryBuilder('lf')
      .leftJoinAndSelect('lf.coverImage', 'cover')
      .leftJoinAndSelect('lf.reviewedBy', 'reviewer')
      .orderBy('lf.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) qb.andWhere('lf.type = :type', { type });
    if (category) qb.andWhere('lf.category = :category', { category });
    if (status) qb.andWhere('lf.status = :status', { status });
    if (visibility) qb.andWhere('lf.visibility = :visibility', { visibility });
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        '(lf.itemName ILIKE :s OR lf.reporterName ILIKE :s OR lf.referenceCode ILIKE :s)',
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
        coverImage: true,
        images: true,
        reviewedBy: true,
        handledBy: true,
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

  async updateVisibility(id: string, dto: UpdateVisibilityDto, staff: User) {
    const lf = await this.findOneAdmin(id);

    if (dto.visibility === LostFoundVisibility.HIDDEN && !dto.hideReason) {
      throw new BadRequestException('hideReason is required when hiding');
    }

    lf.visibility = dto.visibility;
    lf.hideReason = dto.hideReason ?? null;
    lf.reviewedBy = staff;
    lf.reviewedAt = new Date();
    return this.repo.save(lf);
  }

  async setCover(id: string, dto: SetCoverDto) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!lf) throw new NotFoundException('Item not found');

    const isOwned = lf.images.some((f) => f.id === dto.fileId);
    if (!isOwned)
      throw new BadRequestException(
        'Cover must be selected from uploaded images',
      );

    lf.coverImage = { id: dto.fileId } as any;
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
    const lf = await this.repo.findOne({
      where: { id, visibility: LostFoundVisibility.VISIBLE },
    });
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
}
