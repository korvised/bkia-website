import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/database';
import { FileService } from './file.service';

// StorageService is provided globally by S3Module (app.module.ts) — no import needed here.
@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
