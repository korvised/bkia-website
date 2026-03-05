export interface IPermission {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ICreatePermissionPayload {
  name: string;
  slug: string;
  description?: string;
}

export interface IUpdatePermissionPayload {
  name?: string;
  description?: string;
}

export interface IUserPermissionsPayload {
  permission: string; // permission ID
}
