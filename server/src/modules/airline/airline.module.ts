import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from '@/database';
import { FileModule } from '@/common/file';
import { AirlineService } from './airline.service';
import { AirlineController } from './airline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Airline]), FileModule],
  controllers: [AirlineController],
  providers: [AirlineService],
  exports: [AirlineService],
})
export class AirlineModule {}
