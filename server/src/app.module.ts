import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ConfigModule } from '@/common/config';
import { AirlineModule } from '@/modules/airline';
import { AirportModule } from '@/modules/airport';
import { AuthModule } from '@/modules/auth';
import { CounterModule } from '@/modules/counter';
import { RoleModule } from '@/modules/role';
import { UserModule } from '@/modules/user';
import { WeatherModule } from '@/modules/weather';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Utility Module,
    DatabaseModule,
    ConfigModule,

    // Main Module,
    AirlineModule,
    AirportModule,
    AuthModule,
    CounterModule,
    RoleModule,
    UserModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
