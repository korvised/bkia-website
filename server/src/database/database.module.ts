import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigModule, ConfigService } from '@/common/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [NestConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.pass'),
        database: configService.get('db.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        // synchronize: configService.get('app.env') === Environment.development,
        // logging: configService.get('app.env') === Environment.development,
        connectTimeout: 15000,
      }),
    }),
  ],
})
export class DatabaseModule {}
