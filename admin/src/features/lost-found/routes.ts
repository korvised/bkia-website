import type { IRoute } from "@/types";
import { SUPPORT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import {
  LostFoundPage,
  LostFoundCreatePage,
  LostFoundDetailPage,
} from "@/features/lost-found/pages";

const LOST_FOUND_PERMISSIONS = [
  PermissionSlug.LOST_FOUND_READ,
  PermissionSlug.LOST_FOUND_CREATE,
  PermissionSlug.LOST_FOUND_UPDATE,
  PermissionSlug.LOST_FOUND_DELETE,
];

export const lostFoundRoutes: IRoute[] = [
  {
    path: "/support/lost-found",
    element: LostFoundPage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
    allowPermissions: LOST_FOUND_PERMISSIONS,
  },
  {
    path: "/support/lost-found/create",
    element: LostFoundCreatePage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
    allowPermissions: LOST_FOUND_PERMISSIONS,
  },
  {
    path: "/support/lost-found/:id",
    element: LostFoundDetailPage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
    allowPermissions: LOST_FOUND_PERMISSIONS,
  },
];
