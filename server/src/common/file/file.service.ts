import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '@/database';
import { S3Service } from '@/common/s3';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
    private readonly s3Service: S3Service,
  ) {}

  async findById(id: string) {
    return await this.fileRepo.findOneBy({ id });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<File> {
    // Upload to POC folder to maintain backward compatibility
    const result = await this.s3Service.uploadFile(file, {
      folder: folder,
      preserveOriginalName: false, // Generate UUID like before
      metadata: {
        uploadedAt: new Date().toISOString(),
      },
    });

    // Create and save file record
    const fileEntity = this.fileRepo.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: result.key,
      size: file.size.toString(),
    });

    return await this.fileRepo.save(fileEntity);
  }

  async deleteFile(id: string): Promise<void> {
    const file = await this.findById(id);
    if (file) {
      // Remove from a database
      await this.fileRepo.remove(file);

      // Delete from S3
      await this.s3Service.deleteFile(file.path);
    }
  }
}
