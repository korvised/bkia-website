import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/database';
import { PermissionSlug } from '@/types/enum';

interface PermissionSeed {
  name: string;
  slug: PermissionSlug;
  description: string;
}

const DEFAULT_PERMISSIONS: PermissionSeed[] = [
  // Flight
  { name: 'View Flights', slug: PermissionSlug.FLIGHT_READ, description: 'View flight information' },
  { name: 'Create Flight', slug: PermissionSlug.FLIGHT_CREATE, description: 'Create new flights' },
  { name: 'Update Flight', slug: PermissionSlug.FLIGHT_UPDATE, description: 'Update existing flights' },
  { name: 'Delete Flight', slug: PermissionSlug.FLIGHT_DELETE, description: 'Delete flights' },

  // Airline
  { name: 'View Airlines', slug: PermissionSlug.AIRLINE_READ, description: 'View airline information' },
  { name: 'Create Airline', slug: PermissionSlug.AIRLINE_CREATE, description: 'Create new airlines' },
  { name: 'Update Airline', slug: PermissionSlug.AIRLINE_UPDATE, description: 'Update existing airlines' },
  { name: 'Delete Airline', slug: PermissionSlug.AIRLINE_DELETE, description: 'Delete airlines' },

  // Airport
  { name: 'View Airports', slug: PermissionSlug.AIRPORT_READ, description: 'View airport information' },
  { name: 'Create Airport', slug: PermissionSlug.AIRPORT_CREATE, description: 'Create new airports' },
  { name: 'Update Airport', slug: PermissionSlug.AIRPORT_UPDATE, description: 'Update existing airports' },
  { name: 'Delete Airport', slug: PermissionSlug.AIRPORT_DELETE, description: 'Delete airports' },

  // Counter
  { name: 'View Counters', slug: PermissionSlug.COUNTER_READ, description: 'View counter information' },
  { name: 'Create Counter', slug: PermissionSlug.COUNTER_CREATE, description: 'Create new counters' },
  { name: 'Update Counter', slug: PermissionSlug.COUNTER_UPDATE, description: 'Update existing counters' },
  { name: 'Delete Counter', slug: PermissionSlug.COUNTER_DELETE, description: 'Delete counters' },

  // Route
  { name: 'View Routes', slug: PermissionSlug.ROUTE_READ, description: 'View route information' },
  { name: 'Create Route', slug: PermissionSlug.ROUTE_CREATE, description: 'Create new routes' },
  { name: 'Update Route', slug: PermissionSlug.ROUTE_UPDATE, description: 'Update existing routes' },
  { name: 'Delete Route', slug: PermissionSlug.ROUTE_DELETE, description: 'Delete routes' },

  // News
  { name: 'View News', slug: PermissionSlug.NEWS_READ, description: 'View news articles' },
  { name: 'Create News', slug: PermissionSlug.NEWS_CREATE, description: 'Create news articles' },
  { name: 'Update News', slug: PermissionSlug.NEWS_UPDATE, description: 'Update news articles' },
  { name: 'Delete News', slug: PermissionSlug.NEWS_DELETE, description: 'Delete news articles' },

  // Notice
  { name: 'View Notices', slug: PermissionSlug.NOTICE_READ, description: 'View notices' },
  { name: 'Create Notice', slug: PermissionSlug.NOTICE_CREATE, description: 'Create notices' },
  { name: 'Update Notice', slug: PermissionSlug.NOTICE_UPDATE, description: 'Update notices' },
  { name: 'Delete Notice', slug: PermissionSlug.NOTICE_DELETE, description: 'Delete notices' },

  // Lost & Found
  { name: 'View Lost & Found', slug: PermissionSlug.LOST_FOUND_READ, description: 'View lost & found reports' },
  { name: 'Create Lost & Found', slug: PermissionSlug.LOST_FOUND_CREATE, description: 'Create lost & found reports' },
  { name: 'Update Lost & Found', slug: PermissionSlug.LOST_FOUND_UPDATE, description: 'Update lost & found reports' },
  { name: 'Delete Lost & Found', slug: PermissionSlug.LOST_FOUND_DELETE, description: 'Delete lost & found reports' },

  // User
  { name: 'View Users', slug: PermissionSlug.USER_READ, description: 'View user accounts' },
  { name: 'Create User', slug: PermissionSlug.USER_CREATE, description: 'Create user accounts' },
  { name: 'Update User', slug: PermissionSlug.USER_UPDATE, description: 'Update user accounts' },
  { name: 'Delete User', slug: PermissionSlug.USER_DELETE, description: 'Delete user accounts' },

  // Role
  { name: 'View Roles', slug: PermissionSlug.ROLE_READ, description: 'View roles' },
  { name: 'Create Role', slug: PermissionSlug.ROLE_CREATE, description: 'Create roles' },
  { name: 'Update Role', slug: PermissionSlug.ROLE_UPDATE, description: 'Update roles' },
  { name: 'Delete Role', slug: PermissionSlug.ROLE_DELETE, description: 'Delete roles' },

  // Permission
  { name: 'View Permissions', slug: PermissionSlug.PERMISSION_READ, description: 'View permissions' },
  { name: 'Create Permission', slug: PermissionSlug.PERMISSION_CREATE, description: 'Create permissions' },
  { name: 'Update Permission', slug: PermissionSlug.PERMISSION_UPDATE, description: 'Update permissions' },
  { name: 'Delete Permission', slug: PermissionSlug.PERMISSION_DELETE, description: 'Delete permissions' },
];

@Injectable()
export class PermissionSeeder implements OnModuleInit {
  private readonly logger = new Logger(PermissionSeeder.name);

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async onModuleInit() {
    if (process.env.SEED_PERMISSIONS !== 'true') return;
    await this.seedPermissions();
  }

  private async seedPermissions() {
    this.logger.log('Seeding permissions...');
    let created = 0;

    for (const seed of DEFAULT_PERMISSIONS) {
      const exists = await this.permissionRepository.findOneBy({ slug: seed.slug });
      if (!exists) {
        await this.permissionRepository.save(
          this.permissionRepository.create(seed),
        );
        created++;
      }
    }

    if (created > 0) {
      this.logger.log(`Seeded ${created} new permission(s).`);
    } else {
      this.logger.log('All permissions already exist, skipping.');
    }
  }
}
