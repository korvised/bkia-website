import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '@/database';
import { CreateNoticeDto, QueryNoticeDto, UpdateNoticeDto } from './dtos';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepo: Repository<Notice>,
  ) {}

  /**
   * Find a single notice by id.
   */
  async findOne(id: string) {
    const notice = await this.noticeRepo.findOne({
      where: { id },
    });

    if (!notice) throw new NotFoundException('Notice not found');
    return notice;
  }

  /**
   * List notices with filters + pagination.
   */
  async findAll(dto: QueryNoticeDto) {
    const {
      search,
      priority,
      publishDate,
      effectiveFrom,
      effectiveTo,
      isActive,
      sortBy = 'publishDate',
      order = 'DESC',
    } = dto;

    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.noticeRepo.createQueryBuilder('notice');

    // Search across all multilingual fields
    if (search?.trim()) {
      const s = `%${search.trim()}%`;

      qb.andWhere(
        `(
          EXISTS (
            SELECT 1 
            FROM jsonb_each_text(notice.title) AS t(key, value)
            WHERE value ILIKE :s
          )
          OR EXISTS (
            SELECT 1 
            FROM jsonb_each_text(notice.description) AS d(key, value)
            WHERE value ILIKE :s
          )
          OR EXISTS (
            SELECT 1 
            FROM jsonb_each_text(notice.content) AS c(key, value)
            WHERE value ILIKE :s
          )
        )`,
        { s },
      );
    }

    // Filter by priority
    if (priority) {
      qb.andWhere('notice.priority = :priority', { priority });
    }

    // Filter by publish date
    if (publishDate) {
      qb.andWhere('notice.publishDate = :publishDate', { publishDate });
    }

    // Filter by effective date range
    if (effectiveFrom) {
      qb.andWhere(
        '(notice.effectiveDate IS NULL OR notice.effectiveDate >= :effectiveFrom)',
        { effectiveFrom },
      );
    }

    if (effectiveTo) {
      qb.andWhere(
        '(notice.effectiveDate IS NULL OR notice.effectiveDate <= :effectiveTo)',
        { effectiveTo },
      );
    }

    // Filter by active status
    if (isActive !== undefined) {
      qb.andWhere('notice.isActive = :isActive', {
        isActive: isActive === 'true',
      });
    }

    // Sorting
    const orderMap: Record<string, string> = {
      publishDate: 'notice.publishDate',
      effectiveDate: 'notice.effectiveDate',
      priority: 'notice.priority',
      createdAt: 'notice.createdAt',
    };

    const orderField = orderMap[sortBy] ?? 'notice.publishDate';
    const orderDirection = order === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(orderField, orderDirection);

    // Add secondary sort by createdAt for consistency
    if (sortBy !== 'createdAt') {
      qb.addOrderBy('notice.createdAt', 'DESC');
    }

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

  /**
   * Create a new notice.
   */
  async create(dto: CreateNoticeDto): Promise<Notice> {
    const notice = this.noticeRepo.create({
      title: dto.title,
      description: dto.description,
      content: dto.content,
      priority: dto.priority,
      publishDate: dto.publishDate,
      effectiveDate: dto.effectiveDate ?? null,
      expiryDate: dto.expiryDate ?? null,
      tags: dto.tags ?? [],
      isActive: dto.isActive ?? true,
    });

    const saved = await this.noticeRepo.save(notice);
    return this.findOne(saved.id);
  }

  /**
   * Update an existing notice.
   */
  async update(id: string, dto: UpdateNoticeDto) {
    const notice = await this.findOne(id);

    if (dto.title !== undefined) notice.title = dto.title;
    if (dto.description !== undefined) notice.description = dto.description;
    if (dto.content !== undefined) notice.content = dto.content;
    if (dto.priority !== undefined) notice.priority = dto.priority;
    if (dto.publishDate !== undefined) notice.publishDate = dto.publishDate;
    if (dto.effectiveDate !== undefined)
      notice.effectiveDate = dto.effectiveDate ?? null;
    if (dto.expiryDate !== undefined)
      notice.expiryDate = dto.expiryDate ?? null;
    if (dto.tags !== undefined) notice.tags = dto.tags ?? [];
    if (dto.isActive !== undefined) notice.isActive = dto.isActive;

    return await this.noticeRepo.save(notice);
  }

  /**
   * Delete a notice.
   */
  async delete(id: string) {
    const notice = await this.findOne(id);
    return await this.noticeRepo.remove(notice);
  }
}
