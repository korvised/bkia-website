import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ConfigModule } from '@/common/config';
import { S3Module } from '@/common/s3';
import { AirlineModule } from '@/modules/airline';
import { AirportModule } from '@/modules/airport';
import { AuthModule } from '@/modules/auth';
import { CounterModule } from '@/modules/counter';
import { FlightModule } from '@/modules/flight';
import { LostFoundModule } from '@/modules/lost-found';
import { NewsModule } from '@/modules/news';
import { NoticeModule } from '@/modules/notice';
import { RoleModule } from '@/modules/role';
import { RouteModule } from '@/modules/route';
import { UserModule } from '@/modules/user';
import { WeatherModule } from '@/modules/weather';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Utility Module,
    DatabaseModule,
    ConfigModule,
    S3Module,

    // Main Module,
    AirlineModule,
    AirportModule,
    AuthModule,
    CounterModule,
    FlightModule,
    LostFoundModule,
    NewsModule,
    NoticeModule,
    RoleModule,
    RouteModule,
    UserModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
