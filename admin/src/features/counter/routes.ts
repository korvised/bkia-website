import type { IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types";
import { CounterPage } from "@/features/counter/pages";

export const counterRoutes: IRoute[] = [
  {
    path: "/flights/counters",
    element: CounterPage,
    allowRoles: FLIGHT_ACCESS_ROLES.COUNTER_MANAGEMENT,
    allowPermissions: [
      PermissionSlug.COUNTER_READ,
      PermissionSlug.COUNTER_CREATE,
      PermissionSlug.COUNTER_UPDATE,
      PermissionSlug.COUNTER_DELETE,
    ],
  },
];
