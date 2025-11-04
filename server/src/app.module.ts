import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ConfigModule } from '@/common/config';
import { WeatherModule } from '@/modules/weather';
import { AirlineModule } from '@/modules/airline';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, ConfigModule, WeatherModule, AirlineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
