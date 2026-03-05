import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSeeder } from './role.seeder';
import { Role } from '@/database';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, RoleSeeder],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
