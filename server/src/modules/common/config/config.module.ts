import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configurations } from '@/config/configuration';
import { validateConfig } from '@/config/config-validation';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
      validate: validateConfig,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
