import { S3UploadOptions, S3UploadResult } from '@/types/file';

/**
 * Abstract storage service — injection token used by FileService.
 * Concrete implementations: S3Service (production) · LocalStorageService (development)
 */
export abstract class StorageService {
  abstract uploadFile(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult>;

  abstract uploadFileWithTypeValidation(
    file: Express.Multer.File,
    options: S3UploadOptions & {
      allowedTypes?: readonly string[];
      maxSize?: number;
      category?: 'image' | 'document' | 'other';
    },
  ): Promise<S3UploadResult>;

  abstract uploadDocument(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult>;

  abstract deleteFile(key: string): Promise<boolean>;

  abstract fileExists(key: string): Promise<boolean>;
}
