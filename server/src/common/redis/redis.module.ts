import { Module, Global } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@/common/config';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS',
      inject: [NestConfigService],
      useFactory: (config: ConfigService) => {
        const url = 'redis://localhost:6379';
        const client = new Redis(url, {
          enableReadyCheck: true,
          lazyConnect: false,
          // optional hardening
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => Math.min(times * 50, 1000),
        });
        return client;
      },
    },
    RedisService,
  ],
  exports: ['REDIS', RedisService],
})
export class RedisModule {}
