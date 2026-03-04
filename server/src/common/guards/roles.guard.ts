import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from '@/database';
import { UserRole } from '@/types/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const user: User = request.user as User;
    if (!user) throw new ForbiddenException('No user found in request');

    const isSuperAdmin = user.roles?.some(
      (r) => r.role === UserRole.SUPER_ADMIN,
    );
    if (isSuperAdmin) return true;

    const hasRole = user.roles.some(r => requiredRoles.includes(r.role));
    if (!hasRole) throw new ForbiddenException('Insufficient role');

    return true;
  }
}
