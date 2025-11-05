import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from '@/database';
import { AirlineModule } from '@/modules/airline';
import { CounterModule } from '@/modules/counter';
import { RouteModule } from '@/modules/route';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight]),
    AirlineModule,
    CounterModule,
    RouteModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
