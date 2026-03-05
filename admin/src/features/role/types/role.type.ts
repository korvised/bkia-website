import type { UserRole } from "@/types";

export interface IRole {
  id: string;
  role: UserRole;
  description?: string | null;
  isActive: boolean;
}

export interface ICreateRolePayload {
  role: UserRole;
  description?: string;
  status: boolean;
}

export interface IUpdateRolePayload {
  description?: string;
  status?: boolean;
}

export interface IQueryRoleParams {
  isActive?: boolean;
}
