import type { UserStatus } from "./enum.type.ts";
import type { IRole } from "./user-role.type.ts";
import type { IEmployee } from "./employee.type.ts";

export interface IPermission {
  id: string;
  name: string;
  slug: string;
  description: string;
}

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
  permissions: IPermission[];
}

export interface ICurrentUser {
  user: IUser;
  employee: IEmployee | null;
}
