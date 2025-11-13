import { type ComponentType } from 'react';
import { UserRole } from './enum.ts';

export interface IRoute {
  path: string;
  element: ComponentType;
  allowRoles?: UserRole[];
}
