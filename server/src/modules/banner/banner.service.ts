import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '@/database';
import { FileService } from '@/common/file';
import { CreateBannerDto, QueryBannerDto, UpdateBannerDto } from './dtos';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,
    private readonly fileService: FileService,
  ) {}

  /**
   * Find a single banner by id (with relations).
   */
  async findOne(id: string) {
    const banner = await this.bannerRepo.findOne({
      where: { id },
      relations: { image: true },
    });
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  /**
   * List banners with pagination and optional isActive filter.
   */
  async findAll(dto: QueryBannerDto) {
    const { isActive } = dto;
    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.bannerRepo
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.image', 'image');

    if (isActive !== undefined) {
      qb.andWhere('banner.isActive = :isActive', {
        isActive: isActive === 'true',
      });
    }

    qb.orderBy('banner.order', 'ASC').addOrderBy('banner.createdAt', 'DESC');
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
   * List active banners for the public homepage slider.
   */
  async findPublic() {
    return this.bannerRepo.find({
      where: { isActive: true },
      relations: { image: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Create a new banner slide with required image upload.
   */
  async create(
    dto: CreateBannerDto,
    image: Express.Multer.File,
  ): Promise<Banner> {
    const uploaded = await this.fileService.uploadFile(image, 'banners');

    const banner = this.bannerRepo.create({
      image: uploaded,
      altText: dto.altText,
      title: dto.title ?? null,
      order: dto.order ?? 0,
      isActive: dto.isActive ?? true,
    });

    const saved = await this.bannerRepo.save(banner);
    return this.findOne(saved.id);
  }

  /**
   * Update an existing banner slide (optionally replace image).
   * When a new image is provided, the old image is deleted from S3 and DB.
   */
  async update(
    id: string,
    dto: UpdateBannerDto,
    image?: Express.Multer.File,
  ) {
    const banner = await this.findOne(id);

    if (image) {
      const oldImageId = banner.image.id;
      const uploaded = await this.fileService.uploadFile(image, 'banners');
      banner.image = uploaded;
      await this.bannerRepo.save(banner);
      await this.fileService.deleteFile(oldImageId);
      return this.findOne(id);
    }

    if (dto.altText !== undefined) banner.altText = dto.altText;
    if (dto.title !== undefined) banner.title = dto.title ?? null;
    if (dto.order !== undefined) banner.order = dto.order;
    if (dto.isActive !== undefined) banner.isActive = dto.isActive;

    return await this.bannerRepo.save(banner);
  }

  /**
   * Delete a banner slide and its associated image from S3 and DB.
   */
  async delete(id: string) {
    const banner = await this.findOne(id);
    const imageId = banner.image.id;
    await this.bannerRepo.remove(banner);
    await this.fileService.deleteFile(imageId);
  }
}
