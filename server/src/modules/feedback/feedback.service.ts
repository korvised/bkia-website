import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '@/database';
import { FileService } from '@/common/file';
import { CreateFeedbackDto, QueryFeedbackDto, UpdateStatusDto } from './dtos';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
    private readonly fileService: FileService,
  ) {}

  /** Submit feedback (public). Uploads files if provided. */
  async create(
    dto: CreateFeedbackDto,
    files?: Express.Multer.File[],
  ): Promise<{ message: string }> {
    const feedback = this.feedbackRepo.create({
      rating: dto.rating ?? null,
      category: dto.category,
      comment: dto.comment ?? null,
      terminal: dto.terminal ?? null,
      specificArea: dto.specificArea ?? null,
      followUp: dto.followUp ?? false,
      email: dto.email ?? null,
      phone: dto.phone ?? null,
    });

    const saved = await this.feedbackRepo.save(feedback);

    if (files && files.length > 0) {
      const uploadedFiles = await Promise.all(
        files.map((f) => this.fileService.uploadFile(f, 'feedback')),
      );
      saved.files = uploadedFiles;
      await this.feedbackRepo.save(saved);
    }

    return { message: 'Feedback submitted successfully' };
  }

  /** Paginated list for admin. */
  async findAll(dto: QueryFeedbackDto) {
    const page = Math.max(Number(dto.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(dto.limit ?? 20), 1), 100);
    const skip = (page - 1) * limit;

    const qb = this.feedbackRepo
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.files', 'files');

    if (dto.status) {
      qb.andWhere('feedback.status = :status', { status: dto.status });
    }
    if (dto.category) {
      qb.andWhere('feedback.category = :category', { category: dto.category });
    }
    if (dto.search) {
      const term = `%${dto.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(feedback.comment) LIKE :term OR LOWER(feedback.specificArea) LIKE :term OR LOWER(feedback.email) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('feedback.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  /** Get single feedback by id with files. */
  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepo.findOne({
      where: { id },
      relations: { files: true },
    });
    if (!feedback) throw new NotFoundException('Feedback not found');
    return feedback;
  }

  /** Update feedback status. */
  async updateStatus(id: string, dto: UpdateStatusDto): Promise<Feedback> {
    const feedback = await this.findOne(id);
    feedback.status = dto.status;
    return this.feedbackRepo.save(feedback);
  }

  /** Delete feedback and its files from S3 + DB. */
  async delete(id: string): Promise<void> {
    const feedback = await this.findOne(id);
    const fileIds = feedback.files.map((f) => f.id);
    await this.feedbackRepo.remove(feedback);
    for (const fileId of fileIds) {
      await this.fileService.deleteFile(fileId);
    }
  }
}
