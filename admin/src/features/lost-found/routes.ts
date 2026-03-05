import type { IRoute } from "@/types";
import { SUPPORT_ACCESS_ROLES } from "@/constants";
import {
  LostFoundPage,
  LostFoundCreatePage,
  LostFoundDetailPage,
} from "@/features/lost-found/pages";

export const lostFoundRoutes: IRoute[] = [
  {
    path: "/support/lost-found",
    element: LostFoundPage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
  },
  {
    path: "/support/lost-found/create",
    element: LostFoundCreatePage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
  },
  {
    path: "/support/lost-found/:id",
    element: LostFoundDetailPage,
    allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
  },
];
