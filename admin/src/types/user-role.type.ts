import type { UserRole } from './enum.type.ts';

export interface IRole {
  id: string;
  role: UserRole;
  description: string;
  isActive: boolean;
}
