import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '@/database';
import { FileService } from '@/common/file';
import { CreateNewsDto, QueryNewsDto, UpdateNewsDto } from './dtos';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
    private readonly fileService: FileService,
  ) {}

  /**
   * Find a single news by id (with relations).
   */
  async findOne(id: string) {
    const news = await this.newsRepo.findOne({
      where: { id },
      relations: { coverImage: true },
    });

    if (!news) throw new NotFoundException('News not found');
    return news;
  }

  /**
   * Find a single news by slug (with relations).
   */
  async findBySlug(slug: string) {
    const news = await this.newsRepo.findOne({
      where: { slug },
      relations: { coverImage: true },
    });

    if (!news) throw new NotFoundException('News not found');
    return news;
  }

  /**
   * List news with filters + pagination.
   */
  async findAll(dto: QueryNewsDto) {
    const {
      search,
      category,
      publishDate,
      isPublished,
      isFeatured,
      sortBy = 'publishDate',
      order = 'DESC',
    } = dto;

    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.newsRepo
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.coverImage', 'coverImage');

    // Search across all multilingual fields
    if (search?.trim()) {
      const s = `%${search.trim()}%`;

      qb.andWhere(
        `(
          EXISTS (
            SELECT 1 
            FROM jsonb_each_text(news.title) AS t(key, value)
            WHERE value ILIKE :s
          )
          OR EXISTS (
            SELECT 1 
            FROM jsonb_each_text(news.excerpt) AS e(key, value)
            WHERE value ILIKE :s
          )
          OR EXISTS (
            SELECT 1 
            FROM jsonb_each_text(news.content) AS c(key, value)
            WHERE value ILIKE :s
          )
        )`,
        { s },
      );
    }

    // Filter by category
    if (category) {
      qb.andWhere('news.category = :category', { category });
    }

    // Filter by publish date
    if (publishDate) {
      qb.andWhere('news.publishDate = :publishDate', { publishDate });
    }

    // Filter by published status
    if (isPublished !== undefined) {
      qb.andWhere('news.isPublished = :isPublished', {
        isPublished: isPublished === 'true',
      });
    }

    // Filter by featured status
    if (isFeatured !== undefined) {
      qb.andWhere('news.isFeatured = :isFeatured', {
        isFeatured: isFeatured === 'true',
      });
    }

    // Sorting
    const orderMap: Record<string, string> = {
      publishDate: 'news.publishDate',
      viewCount: 'news.viewCount',
      createdAt: 'news.createdAt',
    };

    const orderField = orderMap[sortBy] ?? 'news.publishDate';
    const orderDirection = order === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(orderField, orderDirection);

    // Add secondary sort for consistency
    if (sortBy !== 'createdAt') {
      qb.addOrderBy('news.createdAt', 'DESC');
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
   * List published news for public website.
   */
  async findPublic(dto: QueryNewsDto) {
    const { search, category, sortBy = 'publishDate', order = 'DESC' } = dto;

    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.newsRepo
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.coverImage', 'coverImage');

    // Only published news
    qb.andWhere('news.isPublished = :isPublished', { isPublished: true });

    // Only news published today or earlier
    const today = new Date().toISOString().split('T')[0];
    qb.andWhere('news.publishDate <= :today', { today });

    // Search
    if (search?.trim()) {
      const s = `%${search.trim()}%`;
      qb.andWhere(
        `(
          EXISTS (
            SELECT 1 
            FROM jsonb_each_text(news.title) AS t(key, value)
            WHERE value ILIKE :s
          )
          OR EXISTS (
            SELECT 1 
            FROM jsonb_each_text(news.excerpt) AS e(key, value)
            WHERE value ILIKE :s
          )
        )`,
        { s },
      );
    }

    // Filter by category
    if (category) {
      qb.andWhere('news.category = :category', { category });
    }

    // Sorting - featured news first
    qb.orderBy('news.isFeatured', 'DESC');

    const orderMap: Record<string, string> = {
      publishDate: 'news.publishDate',
      viewCount: 'news.viewCount',
      createdAt: 'news.createdAt',
    };

    const orderField = orderMap[sortBy] ?? 'news.publishDate';
    const orderDirection = order === 'ASC' ? 'ASC' : 'DESC';

    qb.addOrderBy(orderField, orderDirection);

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
   * Get featured news for homepage.
   */
  async findFeatured(limit: number = 3) {
    const today = new Date().toISOString().split('T')[0];

    const news = await this.newsRepo.find({
      where: {
        isPublished: true,
        isFeatured: true,
      },
      relations: { coverImage: true },
      order: { publishDate: 'DESC' },
      take: limit,
    });

    return news.filter((n) => n.publishDate <= today);
  }

  /**
   * Increment view count for a news article.
   */
  async incrementViewCount(id: string) {
    await this.newsRepo.increment({ id }, 'viewCount', 1);
  }

  /**
   * Create a new news article.
   */
  async create(
    dto: CreateNewsDto,
    coverImage: Express.Multer.File,
  ): Promise<News> {
    // Check if slug already exists
    const existing = await this.newsRepo.findOne({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new BadRequestException('Slug already exists');
    }

    // Upload cover image
    const uploaded = await this.fileService.uploadFile(
      coverImage,
      `news/${dto.slug}`,
    );

    // Create news entity
    const news = this.newsRepo.create({
      slug: dto.slug,
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      category: dto.category,
      author: dto.author ?? null,
      publishDate: dto.publishDate,
      isFeatured: dto.isFeatured ?? false,
      isPublished: dto.isPublished ?? false,
      tags: dto.tags ?? [],
      metaDescription: dto.metaDescription ?? null,
      coverImage: uploaded,
    });

    // Save to get ID for file upload path
    const saved = await this.newsRepo.save(news);

    return this.findOne(saved.id);
  }

  /**
   * Update an existing news article.
   */
  async update(
    id: string,
    dto: UpdateNewsDto,
    coverImage?: Express.Multer.File,
  ) {
    const news = await this.findOne(id);

    // Check slug uniqueness if changing
    if (dto.slug && dto.slug !== news.slug) {
      const existing = await this.newsRepo.findOne({
        where: { slug: dto.slug },
      });
      if (existing) {
        throw new BadRequestException('Slug already exists');
      }
      news.slug = dto.slug;
    }

    // Update cover image if provided
    if (coverImage) {
      const uploaded = await this.fileService.uploadFile(
        coverImage,
        `news/${news.slug}`,
      );
      news.coverImage = uploaded;
    }

    if (dto.title !== undefined) news.title = dto.title;
    if (dto.excerpt !== undefined) news.excerpt = dto.excerpt;
    if (dto.content !== undefined) news.content = dto.content;
    if (dto.category !== undefined) news.category = dto.category;
    if (dto.author !== undefined) news.author = dto.author ?? null;
    if (dto.publishDate !== undefined) news.publishDate = dto.publishDate;
    if (dto.isFeatured !== undefined) news.isFeatured = dto.isFeatured;
    if (dto.isPublished !== undefined) news.isPublished = dto.isPublished;
    if (dto.tags !== undefined) news.tags = dto.tags ?? [];
    if (dto.metaDescription !== undefined)
      news.metaDescription = dto.metaDescription ?? null;

    return await this.newsRepo.save(news);
  }

  /**
   * Delete a news article.
   */
  async delete(id: string) {
    const news = await this.findOne(id);
    return await this.newsRepo.remove(news);
  }
}
