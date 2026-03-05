import type { IRoute } from "@/types";
import { SETTINGS_ACCESS_ROLES } from "@/constants";
import { UserPage } from "@/features/user/pages";

export const userRoutes: IRoute[] = [
  {
    path: "/settings/users",
    element: UserPage,
    allowRoles: SETTINGS_ACCESS_ROLES.USER_MANAGEMENT,
  },
];
