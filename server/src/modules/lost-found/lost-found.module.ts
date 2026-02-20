import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostFound, LostFoundClaim } from '@/database';
import { FileModule } from '@/common/file';
import { LostFoundService } from './lost-found.service';
import { LostFoundController } from './lost-found.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LostFound, LostFoundClaim]), FileModule],
  controllers: [LostFoundController],
  providers: [LostFoundService],
  exports: [LostFoundService],
})
export class LostFoundModule {}
