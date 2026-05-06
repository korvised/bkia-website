import { randomUUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, Not, Repository } from 'typeorm';
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
      relations: { coverImage: true, images: true },
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
      relations: { coverImage: true, images: true },
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
      .leftJoinAndSelect('news.coverImage', 'coverImage')
      .leftJoinAndSelect('news.images', 'images');

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
          OR (news.excerpt IS NOT NULL AND EXISTS (
            SELECT 1
            FROM jsonb_each_text(news.excerpt) AS e(key, value)
            WHERE value ILIKE :s
          ))
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
      .leftJoinAndSelect('news.coverImage', 'coverImage')
      .leftJoinAndSelect('news.images', 'images');

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
          OR (news.excerpt IS NOT NULL AND EXISTS (
            SELECT 1
            FROM jsonb_each_text(news.excerpt) AS e(key, value)
            WHERE value ILIKE :s
          ))
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
   * Date filter is applied in the DB query (not in JS after take).
   * Sorted by: featuredIndex ASC (nulls last), then publishDate DESC.
   */
  async findFeatured(limit: number = 3) {
    const today = new Date().toISOString().split('T')[0];

    // Items with a featuredIndex set (ordered by index), then the rest by publishDate
    const [withIndex, withoutIndex] = await Promise.all([
      this.newsRepo.find({
        where: {
          isPublished: true,
          isFeatured: true,
          publishDate: LessThanOrEqual(today),
          featuredIndex: Not(IsNull()),
        },
        relations: { coverImage: true, images: true },
        order: { featuredIndex: 'ASC' },
        take: limit,
      }),
      this.newsRepo.find({
        where: {
          isPublished: true,
          isFeatured: true,
          publishDate: LessThanOrEqual(today),
          featuredIndex: IsNull(),
        },
        relations: { coverImage: true, images: true },
        order: { publishDate: 'DESC' },
        take: limit,
      }),
    ]);

    return [...withIndex, ...withoutIndex].slice(0, limit);
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
    imageFiles: Express.Multer.File[] = [],
  ): Promise<News> {
    // Check if slug already exists
    const existing = await this.newsRepo.findOne({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new BadRequestException('Slug already exists');
    }

    // Pre-generate the UUID so we can use it as the storage folder path
    // before the entity is saved — this lets us upload cover + gallery to
    // news/{id}/cover and news/{id}/gallery without a second DB round-trip.
    const id = randomUUID();

    // Upload cover image under news/{id}/cover
    const uploadedCover = await this.fileService.uploadFile(
      coverImage,
      `news/${id}/cover`,
    );

    // Upload gallery images under news/{id}/gallery
    const uploadedImages =
      imageFiles.length > 0
        ? await Promise.all(
            imageFiles.map((f) =>
              this.fileService.uploadFile(f, `news/${id}/gallery`),
            ),
          )
        : [];

    // Create and save the entity in one shot
    const news = this.newsRepo.create({
      id,
      slug: dto.slug,
      title: dto.title,
      excerpt: dto.excerpt ?? null,
      content: dto.content,
      category: dto.category,
      author: dto.author ?? null,
      publishDate: dto.publishDate,
      isFeatured: dto.isFeatured ?? false,
      featuredIndex: dto.featuredIndex ?? null,
      isPublished: dto.isPublished ?? false,
      tags: dto.tags ?? [],
      metaDescription: dto.metaDescription ?? null,
      coverImage: uploadedCover,
      images: uploadedImages,
    });

    await this.newsRepo.save(news);
    return this.findOne(id);
  }

  /**
   * Update an existing news article.
   */
  async update(
    id: string,
    dto: UpdateNewsDto,
    coverImage?: Express.Multer.File,
    imageFiles: Express.Multer.File[] = [],
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

    // Track old cover image ID — must delete AFTER save because the entity
    // has onDelete: 'RESTRICT', so the File cannot be deleted while news.coverImageId
    // still points to it. Saving updates the FK first, making deletion safe.
    let oldCoverImageId: string | undefined;
    if (coverImage) {
      oldCoverImageId = news.coverImage?.id;
      const uploaded = await this.fileService.uploadFile(
        coverImage,
        `news/${news.id}/cover`,
      );
      news.coverImage = uploaded;
    }

    if (dto.title !== undefined) news.title = dto.title;
    if (dto.excerpt !== undefined) news.excerpt = dto.excerpt;
    if (dto.content !== undefined) news.content = dto.content;
    if (dto.category !== undefined) news.category = dto.category;
    if (dto.author !== undefined) news.author = dto.author?.trim() || null;
    if (dto.publishDate !== undefined) news.publishDate = dto.publishDate;
    if (dto.isFeatured !== undefined) news.isFeatured = dto.isFeatured;
    if (dto.featuredIndex !== undefined) news.featuredIndex = dto.featuredIndex ?? null;
    if (dto.isPublished !== undefined) news.isPublished = dto.isPublished;
    if (dto.tags !== undefined) news.tags = dto.tags ?? [];
    if (dto.metaDescription !== undefined)
      news.metaDescription = dto.metaDescription ?? null;

    // Gallery update — track removed images; delete them AFTER save so the
    // join table rows are cleared first (prevents FK constraint violations).
    let removedGalleryIds: string[] = [];
    if (dto.keepImageIds !== undefined) {
      // keepImageIds present → rebuild gallery: keep specified IDs + add new uploads
      const keepIds: string[] = JSON.parse(dto.keepImageIds);
      // Preserve the ORDER of keepIds (admin may have reordered the gallery)
      const keptImages = keepIds
        .map((imgId) => (news.images ?? []).find((img) => img.id === imgId))
        .filter((img): img is NonNullable<typeof img> => !!img);

      // Collect IDs of images being dropped from the gallery
      removedGalleryIds = (news.images ?? [])
        .filter((img) => !keepIds.includes(img.id))
        .map((img) => img.id);

      const newImages =
        imageFiles.length > 0
          ? await Promise.all(
              imageFiles.map((f) =>
                this.fileService.uploadFile(f, `news/${news.id}/gallery`),
              ),
            )
          : [];
      news.images = [...keptImages, ...newImages];
    } else if (imageFiles.length > 0) {
      // No keepImageIds but new files present → append to existing gallery
      const newImages = await Promise.all(
        imageFiles.map((f) =>
          this.fileService.uploadFile(f, `news/${news.id}/gallery`),
        ),
      );
      news.images = [...(news.images ?? []), ...newImages];
    }

    // Save first — updates coverImageId FK and rebuilds news_images join table
    await this.newsRepo.save(news);

    // Now safe to delete old files: FK refs have been updated/removed by the save
    if (oldCoverImageId) {
      await this.fileService.deleteFile(oldCoverImageId);
    }
    if (removedGalleryIds.length > 0) {
      await Promise.allSettled(
        removedGalleryIds.map((fileId) => this.fileService.deleteFile(fileId)),
      );
    }

    return this.findOne(news.id);
  }

  /**
   * Delete a news article and clean up all associated files from DB and S3.
   */
  async delete(id: string) {
    const news = await this.findOne(id); // findOne loads coverImage + images relations

    // Collect file IDs before removal
    const coverImageId = news.coverImage?.id;
    const galleryImageIds = (news.images ?? []).map((img) => img.id);

    // Remove entity first — clears the coverImageId FK (satisfying RESTRICT constraint)
    // and removes all news_images join table rows (so files can then be deleted)
    await this.newsRepo.remove(news);

    // Now safe to delete files from DB and S3
    if (coverImageId) {
      await this.fileService.deleteFile(coverImageId);
    }
    if (galleryImageIds.length > 0) {
      await Promise.allSettled(
        galleryImageIds.map((fileId) => this.fileService.deleteFile(fileId)),
      );
    }
  }
}
