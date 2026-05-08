import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { LostFound, LostFoundClaim, User } from '@/database';
import { FileService } from '@/common/file';
import {
  ClaimStatus,
  LostFoundStatus,
} from '@/types/enum';
import {
  CreateClaimDto,
  CreateLostFoundDto,
  CreateStandaloneClaimDto,
  LinkClaimDto,
  QueryClaimsDto,
  QueryLostFoundAdminDto,
  QueryLostFoundDto,
  ReviewClaimDto,
  UpdateDisplayDto,
  UpdateStatusDto,
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

function generateClaimReferenceCode(): string {
  return Math.random().toString(36).slice(2, 7).toUpperCase();
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
      // Force noon UTC so timezone offsets never shift the calendar date
      incidentDate: new Date(`${dto.incidentDate}T12:00:00.000Z`),
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
  // "total" = open + matched (items currently in care, not all-time records)
  async getStats() {
    const [open, matched, returned] = await Promise.all([
      this.repo.count({ where: { status: LostFoundStatus.OPEN } }),
      this.repo.count({ where: { status: LostFoundStatus.MATCHED } }),
      this.repo.count({ where: { status: LostFoundStatus.RETURNED } }),
    ]);
    return { total: open + matched, open, matched, returned };
  }

  // Public list — only VISIBLE, select necessary fields + display fields by locale
  async findAll(query: QueryLostFoundDto) {
    const {
      category,
      search,
      locale = 'en',
      page = 1,
      limit = 20,
    } = query;

    // Closed statuses — never exposed on the public list
    const hiddenStatuses = [
      LostFoundStatus.RETURNED,
      LostFoundStatus.DONATED,
      LostFoundStatus.DISPOSED,
    ];

    const qb = this.repo
      .createQueryBuilder('lf')
      .select([
        'lf.id',
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
      .where('lf.status NOT IN (:...hiddenStatuses)', { hiddenStatuses })
      .orderBy('lf.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (category) qb.andWhere('lf.category = :category', { category });
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(
          EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayNames",        '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
          OR EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayDescriptions", '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
          OR EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayLocations",    '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
        )`,
        { s },
      );
    }

    const [data, total] = await qb.getManyAndCount();

    // map display fields by locale
    const items = data.map((lf) => ({
      id: lf.id,
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

    if (category) qb.andWhere('lf.category = :category', { category });
    if (status) qb.andWhere('lf.status = :status', { status });
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(
          EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayNames",        '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
          OR EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayDescriptions", '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
          OR EXISTS (SELECT 1 FROM jsonb_each_text(COALESCE(lf."displayLocations",    '{}'::jsonb)) j(k,v) WHERE v ILIKE :s)
        )`,
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
        coverImage: true,
        handledBy: true,
        createdBy: true,
      },
    });
    if (!lf) throw new NotFoundException('Item not found');
    return lf;
  }

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const lf = await this.repo.findOne({ where: { id } });
    if (!lf) throw new NotFoundException('Item not found');

    lf.status = dto.status;

    // auto-stamp resolvedAt when staff manually marks as returned/donated/disposed
    if (
      [LostFoundStatus.RETURNED, LostFoundStatus.DONATED, LostFoundStatus.DISPOSED].includes(
        dto.status,
      ) &&
      !lf.resolvedAt
    ) {
      lf.resolvedAt = new Date();
    }

    // clear resolvedAt if reverting to an active status
    if ([LostFoundStatus.OPEN, LostFoundStatus.MATCHED].includes(dto.status)) {
      lf.resolvedAt = null;
    }

    return this.repo.save(lf);
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

    const closedStatuses = [
      LostFoundStatus.RETURNED,
      LostFoundStatus.DONATED,
      LostFoundStatus.DISPOSED,
    ];
    if (closedStatuses.includes(lf.status))
      throw new BadRequestException('Item is already closed and cannot be claimed');

    const referenceCode = generateClaimReferenceCode();
    const claim = this.claimRepo.create({
      lostFound: lf,
      referenceCode,
      claimantName: dto.claimantName,
      claimantEmail: dto.claimantEmail ?? null,
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

    return { claimId: saved.id, referenceCode, message: 'Claim submitted successfully' };
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

    // Only update the linked item's status when a linked item exists
    if (claim.lostFound) {
      if (dto.status === ClaimStatus.APPROVED) {
        // Approve → set item to MATCHED
        if (claim.lostFound.status === LostFoundStatus.OPEN) {
          claim.lostFound.status = LostFoundStatus.MATCHED;
          await this.repo.save(claim.lostFound);
        }
      } else if (dto.status === ClaimStatus.COMPLETED) {
        claim.lostFound.status = LostFoundStatus.RETURNED;
        claim.lostFound.resolvedAt = new Date();
        claim.lostFound.handledBy = staff;
        await this.repo.save(claim.lostFound);
      } else if (dto.status === ClaimStatus.REJECTED) {
        // Reject → revert to OPEN if no other approved claims remain
        const approvedCount = await this.claimRepo.count({
          where: {
            id: Not(claimId),
            lostFound: { id: claim.lostFound.id },
            status: ClaimStatus.APPROVED,
          },
        });
        if (approvedCount === 0 && claim.lostFound.status === LostFoundStatus.MATCHED) {
          claim.lostFound.status = LostFoundStatus.OPEN;
          await this.repo.save(claim.lostFound);
        }
      } else if (dto.status === ClaimStatus.PENDING) {
        // Undo → clear resolvedAt, revert MATCHED → OPEN if no other approved claims
        if (claim.lostFound.resolvedAt) {
          claim.lostFound.resolvedAt = null;
        }
        const approvedCount = await this.claimRepo.count({
          where: {
            id: Not(claimId),
            lostFound: { id: claim.lostFound.id },
            status: ClaimStatus.APPROVED,
          },
        });
        if (approvedCount === 0 && claim.lostFound.status === LostFoundStatus.MATCHED) {
          claim.lostFound.status = LostFoundStatus.OPEN;
        }
        claim.reviewedAt = null;
        await this.repo.save(claim.lostFound);
      }
    } else if (dto.status === ClaimStatus.PENDING) {
      // Standalone claim: still clear reviewedAt on undo
      claim.reviewedAt = null;
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

  // ─── STANDALONE CLAIMS ─────────────────────────────────────

  async createStandaloneClaim(
    dto: CreateStandaloneClaimDto,
    files: Express.Multer.File[],
  ) {
    const referenceCode = generateClaimReferenceCode();

    const claim = this.claimRepo.create({
      lostFound: null,
      referenceCode,
      category: dto.category,
      itemDescription: dto.itemDescription,
      lostLocation: dto.lostLocation ?? null,
      lostDate: dto.lostDate ? new Date(`${dto.lostDate}T12:00:00.000Z`) : null,
      claimantName: dto.claimantName,
      claimantEmail: dto.claimantEmail ?? null,
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
          this.fileService.uploadFile(f, `lost-found/claims/${saved.id}`),
        ),
      );
      saved.proofFiles = uploaded;
      await this.claimRepo.save(saved);
    }

    return { claimId: saved.id, referenceCode, message: 'Report submitted successfully' };
  }

  async findAllClaims(query: QueryClaimsDto) {
    const {
      status,
      category,
      linked,
      search,
      page = 1,
      limit = 20,
    } = query;

    const qb = this.claimRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.lostFound', 'lf')
      .leftJoinAndSelect('c.proofFiles', 'pf')
      .leftJoinAndSelect('c.reviewedBy', 'reviewer')
      .orderBy('c.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status) qb.andWhere('c.status = :status', { status });
    if (category) qb.andWhere('c.category = :category', { category });

    if (linked === 'true') {
      qb.andWhere('c."lostFoundId" IS NOT NULL');
    } else if (linked === 'false') {
      qb.andWhere('c."lostFoundId" IS NULL');
    }

    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(c."claimantName" ILIKE :s OR c."itemDescription" ILIKE :s OR c."referenceCode" ILIKE :s)`,
        { s },
      );
    }

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findOneClaim(claimId: string) {
    const claim = await this.claimRepo.findOne({
      where: { id: claimId },
      relations: { lostFound: true, proofFiles: true, reviewedBy: true },
    });
    if (!claim) throw new NotFoundException('Claim not found');
    return claim;
  }

  // ─── PUBLIC CLAIM TRACKING ─────────────────────────────────

  async trackClaim(referenceCode: string) {
    const claim = await this.claimRepo.findOne({
      where: { referenceCode: referenceCode.toUpperCase().trim() },
      relations: { lostFound: true },
      select: {
        id: true,
        referenceCode: true,
        status: true,
        category: true,
        itemDescription: true,
        lostLocation: true,
        lostDate: true,
        claimantName: true,
        staffNote: true,
        reviewedAt: true,
        createdAt: true,
        updatedAt: true,
        lostFound: {
          id: true,
          referenceCode: true,
          status: true,
          category: true,
          displayNames: true,
        },
      },
    });

    if (!claim) throw new NotFoundException('Claim not found');

    // Return a safe public subset — no PII beyond the claimant's own name
    return {
      referenceCode: claim.referenceCode,
      status: claim.status,
      category: claim.category ?? claim.lostFound?.category ?? null,
      itemDescription: claim.itemDescription ?? null,
      lostLocation: claim.lostLocation ?? null,
      lostDate: claim.lostDate,
      claimantName: claim.claimantName,
      staffNote: claim.staffNote,
      reviewedAt: claim.reviewedAt,
      createdAt: claim.createdAt,
      updatedAt: claim.updatedAt,
      linkedItem: claim.lostFound
        ? {
            referenceCode: claim.lostFound.referenceCode,
            status: claim.lostFound.status,
            category: claim.lostFound.category,
            displayNames: claim.lostFound.displayNames,
          }
        : null,
    };
  }

  async linkClaim(claimId: string, dto: LinkClaimDto) {
    const claim = await this.claimRepo.findOne({
      where: { id: claimId },
      relations: { lostFound: true },
    });
    if (!claim) throw new NotFoundException('Claim not found');
    if (claim.lostFound) {
      throw new BadRequestException('Claim is already linked to an item');
    }

    const item = await this.repo.findOne({ where: { id: dto.lostFoundId } });
    if (!item) throw new NotFoundException('Lost & Found item not found');

    const closedStatuses = [
      LostFoundStatus.RETURNED,
      LostFoundStatus.DONATED,
      LostFoundStatus.DISPOSED,
    ];
    if (closedStatuses.includes(item.status)) {
      throw new BadRequestException('Item is closed and cannot accept claims');
    }

    claim.lostFound = item;
    await this.claimRepo.save(claim);

    // If the claim is already approved, update item to MATCHED
    if (
      claim.status === ClaimStatus.APPROVED &&
      item.status === LostFoundStatus.OPEN
    ) {
      item.status = LostFoundStatus.MATCHED;
      await this.repo.save(item);
    }

    return this.findOneClaim(claimId);
  }

  async unlinkClaim(claimId: string) {
    const claim = await this.claimRepo.findOne({
      where: { id: claimId },
      relations: { lostFound: true },
    });
    if (!claim) throw new NotFoundException('Claim not found');
    if (!claim.lostFound) {
      throw new BadRequestException('Claim is not linked to any item');
    }

    const oldItem = claim.lostFound;
    claim.lostFound = null;
    await this.claimRepo.save(claim);

    // Revert item to OPEN if no other active claims remain
    const activeCount = await this.claimRepo.count({
      where: {
        lostFound: { id: oldItem.id },
        status: In([ClaimStatus.PENDING, ClaimStatus.APPROVED]),
      },
    });
    if (activeCount === 0 && oldItem.status === LostFoundStatus.MATCHED) {
      oldItem.status = LostFoundStatus.OPEN;
      await this.repo.save(oldItem);
    }

    return this.findOneClaim(claimId);
  }

  async remove(id: string) {
    const lf = await this.repo.findOne({
      where: { id },
      relations: { coverImage: true, images: true, claims: { proofFiles: true } },
    });
    if (!lf) throw new NotFoundException('Item not found');

    // Collect all file IDs before removal
    const coverImageId = lf.coverImage?.id;
    const itemImages = lf.images ?? [];
    const proofFiles = (lf.claims ?? []).flatMap((c) => c.proofFiles ?? []);

    // Remove entity FIRST — clears coverFileId FK (onDelete: SET NULL handles it)
    // and removes lost_found_images join table rows so File records can be deleted
    // without FK constraint violations.
    await this.repo.remove(lf);

    // Now safe to delete all associated files from DB and S3
    const fileIds = [
      ...(coverImageId ? [coverImageId] : []),
      ...itemImages.map((f) => f.id),
      ...proofFiles.map((f) => f.id),
    ];
    await Promise.allSettled(
      fileIds.map((fileId) => this.fileService.deleteFile(fileId)),
    );

    return { success: true };
  }
}
