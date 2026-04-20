import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost, CareerActivity } from '@/database';
import { FileModule } from '@/common/file';
import { JobPostController } from './job-post.controller';
import { CareerActivityController } from './career-activity.controller';
import { JobPostService } from './job-post.service';
import { CareerActivityService } from './career-activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPost, CareerActivity]),
    FileModule,
  ],
  controllers: [JobPostController, CareerActivityController],
  providers: [JobPostService, CareerActivityService],
  exports: [JobPostService, CareerActivityService],
})
export class CareerModule {}
