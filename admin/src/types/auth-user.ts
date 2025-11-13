import type { UserStatus } from './enum.ts';
import type { IRole } from './user-role.ts';

export interface IUser {
  id: string;
  empId: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  roles: IRole[];
}
