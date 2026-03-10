import { type ComponentType } from 'react';
import { PermissionSlug, UserRole } from './enum.type.ts';

export interface IRoute {
  path: string;
  element: ComponentType;
  allowRoles?: UserRole[];
  allowPermissions?: PermissionSlug[];
}
