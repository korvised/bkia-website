import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@/types/enum';
import { User } from '@/database';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get required permissions from the @Permissions() decorator
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) throw new ForbiddenException('User not found');

    // 2. Bypass check for SUPER_ADMIN
    const isSuperAdmin = user.roles?.some(
      (r) => r.role === UserRole.SUPER_ADMIN,
    );
    if (isSuperAdmin) return true;

    // 3. Extract permission slugs from the user entity
    const userPermissionSlugs = user.permissions?.map((p) => p.slug) || [];

    // 4. Check if user has all required permissions
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissionSlugs.includes(perm),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient feature permissions');
    }

    return true;
  }
}
