import type { IRole, UserStatus } from "@/types";
import type { IPermission } from "@/features/permission/types";

export interface IUser {
  id: string;
  empId: string | null;
  name: string;
  email: string;
  phoneNumber: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  roles: IRole[];
  permissions: IPermission[];
}

export interface ICreateUserPayload {
  empId?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  roles?: string[]; // role IDs
}

export interface IUpdateUserPayload {
  empId?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  status?: UserStatus;
  roles?: string[]; // role IDs
}

export interface IUserRolesPayload {
  role: string; // role ID
}

export interface IUserPermissionsPayload {
  permission: string; // permission ID
}
