import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from '@/database';
import { AirportModule } from '@/modules/airport';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), AirportModule],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
