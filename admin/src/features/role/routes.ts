import type { IRoute } from "@/types";
import { SETTINGS_ACCESS_ROLES } from "@/constants";
import { RolePage } from "@/features/role/pages";

export const roleRoutes: IRoute[] = [
  {
    path: "/settings/roles",
    element: RolePage,
    allowRoles: SETTINGS_ACCESS_ROLES.ROLE_MANAGEMENT,
  },
];
