import * as Bcrypt from 'bcryptjs';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from '@/database';
import { UserRole, UserStatus } from '@/types/enum';

@Injectable()
export class UserSeeder implements OnModuleInit {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    if (process.env.SEED_ROOT_USER !== 'true') return;
    await this.seedRootUser();
  }

  private async seedRootUser() {
    const email = process.env.ROOT_USER_EMAIL;
    const password = process.env.ROOT_USER_PASSWORD;
    const name = process.env.ROOT_USER_NAME ?? 'Root Administrator';
    const empId = process.env.ROOT_USER_EMP_ID ?? null;
    const phoneNumber = process.env.ROOT_USER_PHONE ?? '00000000000';

    if (!email || !password) {
      this.logger.warn(
        'SEED_ROOT_USER=true but ROOT_USER_EMAIL / ROOT_USER_PASSWORD are not set. Skipping.',
      );
      return;
    }

    // Idempotent: skip if root user already exists
    const existing = await this.userRepository.findOneBy({ email });
    if (existing) {
      this.logger.log(`Root user already exists (${email}). Skipping seed.`);
      return;
    }

    // Look up the SUPER_ADMIN role (seeded by RoleSeeder)
    const superAdminRole = await this.roleRepository.findOneBy({
      role: UserRole.SUPER_ADMIN,
    });

    if (!superAdminRole) {
      this.logger.error(
        'SUPER_ADMIN role not found. Make sure SEED_ROLES=true runs before SEED_ROOT_USER=true.',
      );
      return;
    }

    const hashedPassword = await Bcrypt.hash(password, 10);

    const rootUser = this.userRepository.create({
      empId,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      status: UserStatus.ACTIVE, // bypass PENDING — root user is immediately active
      roles: [superAdminRole],
    });

    await this.userRepository.save(rootUser);
    this.logger.log(`Root user seeded: ${email}`);
  }
}
