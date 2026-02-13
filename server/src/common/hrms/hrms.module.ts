import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@/common/redis';
import { HrmsService } from './hrms.service';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [HrmsService],
  exports: [HrmsService],
})
export class HrmsModule {}
