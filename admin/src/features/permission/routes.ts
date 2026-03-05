import type { IRoute } from "@/types";
import { SETTINGS_ACCESS_ROLES } from "@/constants";
import { PermissionPage } from "@/features/permission/pages";

export const permissionRoutes: IRoute[] = [
  {
    path: "/settings/permissions",
    element: PermissionPage,
    allowRoles: SETTINGS_ACCESS_ROLES.PERMISSION_MANAGEMENT,
  },
];
