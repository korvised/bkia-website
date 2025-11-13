import type { UserRole } from './enum.ts';

export interface IRole {
  id: string;
  role: UserRole;
  description: string;
  isActive: boolean;
}
