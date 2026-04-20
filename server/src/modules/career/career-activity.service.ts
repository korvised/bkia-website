import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerActivity } from '@/database';
import { FileService } from '@/common/file';
import { CreateCareerActivityDto, UpdateCareerActivityDto } from './dtos';

@Injectable()
export class CareerActivityService {
  constructor(
    @InjectRepository(CareerActivity)
    private readonly activityRepo: Repository<CareerActivity>,
    private readonly fileService: FileService,
  ) {}

  /**
   * Find a single activity by ID.
   */
  async findOne(id: string): Promise<CareerActivity> {
    const activity = await this.activityRepo.findOne({
      where: { id },
      relations: { image: true },
    });
    if (!activity) throw new NotFoundException('Career activity not found');
    return activity;
  }

  /**
   * Admin: list all activities (active and inactive), ordered by sortOrder ASC.
   */
  async findAll(): Promise<CareerActivity[]> {
    return this.activityRepo.find({
      relations: { image: true },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Public: only active activities, ordered by sortOrder ASC.
   */
  async findActive(): Promise<CareerActivity[]> {
    return this.activityRepo.find({
      where: { isActive: true },
      relations: { image: true },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Upload a new activity image and create the record.
   */
  async create(
    dto: CreateCareerActivityDto,
    imageFile: Express.Multer.File,
  ): Promise<CareerActivity> {
    const uploaded = await this.fileService.uploadFile(
      imageFile,
      'career/activities',
    );

    const activity = this.activityRepo.create({
      image: uploaded,
      caption: dto.caption ?? null,
      sortOrder: dto.sortOrder ?? 0,
      isActive: true,
    });

    return this.activityRepo.save(activity);
  }

  /**
   * Update caption, sortOrder, or isActive for an activity.
   */
  async update(
    id: string,
    dto: UpdateCareerActivityDto,
  ): Promise<CareerActivity> {
    const activity = await this.findOne(id);

    if (dto.caption !== undefined) activity.caption = dto.caption ?? null;
    if (dto.sortOrder !== undefined) activity.sortOrder = dto.sortOrder;
    if (dto.isActive !== undefined) activity.isActive = dto.isActive;

    return this.activityRepo.save(activity);
  }

  /**
   * Bulk reorder activities by updating sortOrder to match the given ID array.
   * Each ID's position in the array becomes its new sortOrder value.
   */
  async reorderActivities(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map((id, index) =>
        this.activityRepo.update({ id }, { sortOrder: index }),
      ),
    );
  }

  /**
   * Delete an activity by ID.
   */
  async delete(id: string): Promise<CareerActivity> {
    const activity = await this.findOne(id);
    return this.activityRepo.remove(activity);
  }
}
