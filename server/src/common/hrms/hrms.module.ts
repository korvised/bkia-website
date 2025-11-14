import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@/common/config';
import { RedisModule } from '@/common/redis';
import { HrmsService } from './hrms.service';

@Module({
  imports: [HttpModule, ConfigModule, RedisModule],
  providers: [HrmsService],
  exports: [HrmsService],
})
export class HrmsModule {}
