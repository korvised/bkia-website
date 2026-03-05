import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/database';
import { UserRole } from '@/types/enum';

const DEFAULT_ROLES: { role: UserRole; description: string }[] = [
  {
    role: UserRole.SUPER_ADMIN,
    description: 'Full system access. Bypasses all permission checks.',
  },
  {
    role: UserRole.ADMIN,
    description: 'Department administrators. Can manage users and content.',
  },
  {
    role: UserRole.STAFF,
    description: 'General airport staff with limited access.',
  },
];

@Injectable()
export class RoleSeeder implements OnModuleInit {
  private readonly logger = new Logger(RoleSeeder.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles() {
    for (const seed of DEFAULT_ROLES) {
      const exists = await this.roleRepository.findOneBy({ role: seed.role });
      if (!exists) {
        await this.roleRepository.save(seed);
        this.logger.log(`Seeded role: ${seed.role}`);
      }
    }
  }
}
