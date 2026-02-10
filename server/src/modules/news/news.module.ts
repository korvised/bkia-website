import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@/database';
import { FileModule } from '@/common/file';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News]), FileModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
