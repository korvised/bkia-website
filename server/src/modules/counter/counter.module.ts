import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from '@/database';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  providers: [CounterService],
  controllers: [CounterController],
  exports: [CounterService],
})
export class CounterModule {}
