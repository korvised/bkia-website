import { Global, Module } from '@nestjs/common';
import { StorageService } from '@/common/storage/storage.abstract';
import { LocalStorageService } from '@/common/storage/local-storage.service';
import { S3Service } from './s3.service';

const isProduction = process.env.APP_ENV === 'production';

/**
 * S3Module (global)
 * - production  → provides S3Service (AWS)
 * - development → provides LocalStorageService (disk at ./uploads/)
 *
 * All consumers inject StorageService (the abstract token).
 */
@Global()
@Module({
  providers: [
    {
      provide: StorageService,
      useClass: isProduction ? S3Service : LocalStorageService,
    },
  ],
  exports: [StorageService],
})
export class S3Module {}
