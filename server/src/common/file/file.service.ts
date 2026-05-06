import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '@/database';
import { StorageService } from '@/common/storage/storage.abstract';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
    private readonly storageService: StorageService,
  ) {}

  async findById(id: string) {
    return await this.fileRepo.findOneBy({ id });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<File> {
    const result = await this.storageService.uploadFile(file, {
      folder,
      preserveOriginalName: false,
      metadata: {
        uploadedAt: new Date().toISOString(),
      },
    });

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
    if (!file) return;

    // Remove DB record first — clears any FK references pointing to this file.
    // Storage deletion happens after so a storage failure never leaves a dangling FK.
    await this.fileRepo.remove(file);

    try {
      await this.storageService.deleteFile(file.path);
    } catch (err) {
      // DB record is already gone; log the orphan but don't re-throw so the
      // caller's transaction/response isn't poisoned by a storage-layer error.
      console.warn(`[FileService] Storage delete failed for "${file.path}":`, err);
    }
  }
}
