import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FILE_SIZES, FILE_TYPE_GROUPS } from '@/constants';
import { S3UploadOptions, S3UploadResult } from '@/types/file';
import { validateFile } from '@/utils';
import { StorageService } from './storage.abstract';

@Injectable()
export class LocalStorageService extends StorageService {
  private readonly logger = new Logger(LocalStorageService.name);
  readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    super();
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    this.logger.log(`Local storage directory: ${this.uploadDir}`);
  }

  async uploadFile(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult> {
    const key = this.generateKey(file, options);
    const filePath = path.join(this.uploadDir, key);

    // Ensure sub-folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, file.buffer);

    this.logger.log(`Saved locally: ${key}`);

    return {
      key,
      bucket: 'local',
      location: `/uploads/${key}`,
      etag: uuidv4(),
      originalName: file.originalname,
      uploadedAt: new Date(),
    };
  }

  async uploadFileWithTypeValidation(
    file: Express.Multer.File,
    options: S3UploadOptions & {
      allowedTypes?: readonly string[];
      maxSize?: number;
      category?: 'image' | 'document' | 'other';
    },
  ): Promise<S3UploadResult> {
    const validation = validateFile(file, {
      allowedTypes: options.allowedTypes,
      maxSize: options.maxSize,
      category: options.category,
    });

    if (!validation.isValid) {
      throw new BadRequestException(
        `File validation failed: ${validation.errors.join(', ')}`,
      );
    }

    const { allowedTypes, maxSize, category, ...uploadOptions } = options;
    return this.uploadFile(file, uploadOptions);
  }

  async uploadDocument(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult> {
    return this.uploadFileWithTypeValidation(file, {
      ...options,
      allowedTypes: FILE_TYPE_GROUPS.DOCUMENTS,
      maxSize: FILE_SIZES.LARGE_DOCUMENT,
      category: 'document',
    });
  }

  async deleteFile(key: string): Promise<boolean> {
    const filePath = path.join(this.uploadDir, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      this.logger.log(`Deleted locally: ${key}`);
    }
    return true;
  }

  async fileExists(key: string): Promise<boolean> {
    return fs.existsSync(path.join(this.uploadDir, key));
  }

  private generateKey(file: Express.Multer.File, options: S3UploadOptions): string {
    const folder = options.folder.replace(/\/$/, '');
    let fileName: string;

    if (options.fileName) {
      fileName = options.fileName;
    } else if (options.preserveOriginalName) {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9.-]/g, '_');
      fileName = `${uuidv4()}-${base}${ext}`;
    } else {
      fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    }

    return `${folder}/${fileName}`;
  }
}
