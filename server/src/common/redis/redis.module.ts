import { Module, Global } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
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
        const host = config.get('rds.host');
        const port = config.get('rds.port');
        const options: RedisOptions = {
          // optional settings
          enableReadyCheck: true,
          lazyConnect: false,
          // optional hardening
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => Math.min(times * 50, 1000),
        };

        const client = new Redis(port, host, options);
        return client;
      },
    },
    RedisService,
  ],
  exports: ['REDIS', RedisService],
})
export class RedisModule {}
