import type { IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types";
import { AirlinePage } from "@/features/airline/pages";

export const airlineRoutes: IRoute[] = [
  {
    path: "/flights/airlines",
    element: AirlinePage,
    allowRoles: FLIGHT_ACCESS_ROLES.AIRLINE_MANAGEMENT,
    allowPermissions: [
      PermissionSlug.AIRLINE_READ,
      PermissionSlug.AIRLINE_CREATE,
      PermissionSlug.AIRLINE_UPDATE,
      PermissionSlug.AIRLINE_DELETE,
    ],
  },
];
