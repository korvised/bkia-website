import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@/common/config';
import { FILE_SIZES, FILE_TYPE_GROUPS } from '@/constants';
import { S3UploadOptions, S3UploadResult } from '@/types/file';
import { formatFileSize, getFileCategory, validateFile } from '@/utils';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('aws.bucket');
    this.region = this.configService.get('aws.region');

    const accessKeyId = this.configService.get('aws.accessKeyId');
    const secretAccessKey = this.configService.get('aws.secretAccessKey');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  /**
   * Upload file to S3 with comprehensive validation
   */
  async uploadFile(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult> {
    try {
      const key = this.generateFileKey(file, options);
      const fileCategory = getFileCategory(file.mimetype);

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Uncomment if you need public access
        ContentLength: file.size, // Explicitly defining size prevents some SDK errors
        Metadata: {
          'original-name': encodeURIComponent(file.originalname), // Metadata keys should be simple
          'file-category': fileCategory,
        },
      });

      const response = await this.s3Client.send(command);

      this.logger.log(
        `File uploaded successfully: ${key} (${formatFileSize(file.size)})`,
      );

      return {
        key,
        bucket: this.bucketName,
        location: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`,
        etag: response.ETag || '',
        originalName: file.originalname,
        uploadedAt: new Date(),
      };
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error?.message}`);
      console.log(error);

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to upload file to S3');
    }
  }

  /**
   * Upload file with specific file type validation
   */
  async uploadFileWithTypeValidation(
    file: Express.Multer.File,
    options: S3UploadOptions & {
      allowedTypes?: readonly string[];
      maxSize?: number;
      category?: 'image' | 'document' | 'other';
    },
  ): Promise<S3UploadResult> {
    try {
      // Use custom validation if provided
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

      // Remove validation options from S3 options
      const { allowedTypes, maxSize, category, ...s3Options } = options;

      return await this.uploadFile(file, s3Options);
    } catch (error) {
      this.logger.error(
        `Failed to upload file with type validation: ${error?.message}`,
      );
      throw error;
    }
  }

  /**
   * Upload document file with document-specific validation
   */
  async uploadDocument(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): Promise<S3UploadResult> {
    return await this.uploadFileWithTypeValidation(file, {
      ...options,
      allowedTypes: FILE_TYPE_GROUPS.DOCUMENTS,
      maxSize: FILE_SIZES.LARGE_DOCUMENT,
      category: 'document',
    });
  }

  /**
   * Delete file from S3
   */
  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully: ${key}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete file ${key}: ${error?.message}`);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
      return true;
    } catch (error) {
      if (error?.name === 'NotFound') {
        return false;
      }
      this.logger.error(
        `Error checking file existence for ${key}: ${error?.message}`,
      );
      throw error;
    }
  }

  /**
   * Get file metadata without downloading
   */
  async getFileMetadata(key: string): Promise<{
    size: number;
    contentType: string;
    lastModified: Date;
    metadata: Record<string, string>;
  }> {
    try {
      const response = await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );

      return {
        size: response.ContentLength || 0,
        contentType: response.ContentType || 'application/octet-stream',
        lastModified: response.LastModified || new Date(),
        metadata: response.Metadata || {},
      };
    } catch (error) {
      this.logger.error(
        `Failed to get file metadata for ${key}: ${error?.message}`,
      );
      throw new InternalServerErrorException('Failed to get file metadata');
    }
  }

  /**
   * Generate file key based on options
   */
  private generateFileKey(
    file: Express.Multer.File,
    options: S3UploadOptions,
  ): string {
    const folder = options.folder.replace(/\/$/, ''); // Remove trailing slash
    let fileName: string;

    if (options.fileName) {
      fileName = options.fileName;
    } else if (options.preserveOriginalName) {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
      fileName = `${uuidv4()}-${sanitizedBaseName}${ext}`;
    } else {
      const ext = path.extname(file.originalname);
      fileName = `${uuidv4()}${ext}`;
    }

    return `${folder}/${fileName}`;
  }
}
