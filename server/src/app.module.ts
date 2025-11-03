import { Module } from '@nestjs/common';
import { ConfigModule } from '@/modules/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from '@/modules/weather';

@Module({
  imports: [WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
