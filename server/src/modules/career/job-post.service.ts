import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '@/database';
import { FileService } from '@/common/file';
import { CreateJobPostDto, UpdateJobPostDto } from './dtos';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepo: Repository<JobPost>,
    private readonly fileService: FileService,
  ) {}

  /**
   * Find a single job post by ID (with coverImage relation).
   */
  async findOne(id: string): Promise<JobPost> {
    const post = await this.jobPostRepo.findOne({
      where: { id },
      relations: { coverImage: true },
    });
    if (!post) throw new NotFoundException('Job post not found');
    return post;
  }

  /**
   * Public: find a single published job post by ID.
   */
  async findOnePublic(id: string): Promise<JobPost> {
    const today = new Date().toISOString().split('T')[0];
    const post = await this.jobPostRepo.findOne({
      where: { id, isPublished: true },
      relations: { coverImage: true },
    });
    if (!post || post.publishDate > today)
      throw new NotFoundException('Job post not found');
    return post;
  }

  /**
   * List all job posts (admin view — includes drafts), newest first.
   */
  async findAll(): Promise<JobPost[]> {
    return this.jobPostRepo.find({
      relations: { coverImage: true },
      order: { isFeatured: 'DESC', publishDate: 'DESC', createdAt: 'DESC' },
    });
  }

  /**
   * Public: only published posts whose publishDate ≤ today.
   * Featured posts bubble to the top, then sorted by publishDate DESC.
   */
  async findPublic(): Promise<JobPost[]> {
    const today = new Date().toISOString().split('T')[0];

    return this.jobPostRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.coverImage', 'coverImage')
      .where('post.isPublished = :isPublished', { isPublished: true })
      .andWhere('post.publishDate <= :today', { today })
      .orderBy('post.isFeatured', 'DESC')
      .addOrderBy('post.publishDate', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .getMany();
  }

  /**
   * Public: only featured + published posts — used on the home page.
   */
  async findFeatured(): Promise<JobPost[]> {
    const today = new Date().toISOString().split('T')[0];

    return this.jobPostRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.coverImage', 'coverImage')
      .where('post.isPublished = :isPublished', { isPublished: true })
      .andWhere('post.isFeatured = :isFeatured', { isFeatured: true })
      .andWhere('post.publishDate <= :today', { today })
      .orderBy('post.publishDate', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .getMany();
  }

  /**
   * Create a new job post, optionally uploading a cover image.
   */
  async create(
    dto: CreateJobPostDto,
    coverImageFile?: Express.Multer.File,
  ): Promise<JobPost> {
    const post = this.jobPostRepo.create({
      title: dto.title,
      content: dto.content,
      position: dto.position,
      vacancyCount: dto.vacancyCount,
      isPublished: dto.isPublished,
      isFeatured: dto.isFeatured ?? false,
      publishDate: dto.publishDate,
      deadline: dto.deadline ?? null,
    });

    if (coverImageFile) {
      post.coverImage = await this.fileService.uploadFile(
        coverImageFile,
        'career/jobs',
      );
    }

    const saved = await this.jobPostRepo.save(post);
    return this.findOne(saved.id);
  }

  /**
   * Update an existing job post.
   */
  async update(
    id: string,
    dto: UpdateJobPostDto,
    coverImageFile?: Express.Multer.File,
  ): Promise<JobPost> {
    const post = await this.findOne(id);

    if (dto.title !== undefined) post.title = dto.title;
    if (dto.content !== undefined) post.content = dto.content;
    if (dto.position !== undefined) post.position = dto.position;
    if (dto.vacancyCount !== undefined) post.vacancyCount = dto.vacancyCount;
    if (dto.isPublished !== undefined) post.isPublished = dto.isPublished;
    if (dto.isFeatured !== undefined) post.isFeatured = dto.isFeatured;
    if (dto.publishDate !== undefined) post.publishDate = dto.publishDate;
    if (dto.deadline !== undefined) post.deadline = dto.deadline ?? null;

    if (coverImageFile) {
      post.coverImage = await this.fileService.uploadFile(
        coverImageFile,
        'career/jobs',
      );
    }

    await this.jobPostRepo.save(post);
    return this.findOne(post.id);
  }

  /**
   * Delete a job post by ID.
   */
  async delete(id: string): Promise<JobPost> {
    const post = await this.findOne(id);
    return this.jobPostRepo.remove(post);
  }
}
