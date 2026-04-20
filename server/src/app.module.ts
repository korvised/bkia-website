import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ConfigModule } from '@/common/config';
import { S3Module } from '@/common/s3';
import { AirlineModule } from '@/modules/airline';
import { AuctionModule } from '@/modules/auction';
import { BannerModule } from '@/modules/banner';
import { AirportModule } from '@/modules/airport';
import { AuthModule } from '@/modules/auth';
import { CounterModule } from '@/modules/counter';
import { FeedbackModule } from '@/modules/feedback';
import { FlightModule } from '@/modules/flight';
import { LostFoundModule } from '@/modules/lost-found';
import { CareerModule } from '@/modules/career';
import { NewsModule } from '@/modules/news';
import { NoticeModule } from '@/modules/notice';
import { PermissionModule } from '@/modules/permission';
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
    AuctionModule,
    BannerModule,
    CareerModule,
    AuthModule,
    CounterModule,
    FeedbackModule,
    FlightModule,
    LostFoundModule,
    NewsModule,
    NoticeModule,
    PermissionModule,
    RoleModule,
    RouteModule,
    UserModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
