import type { IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types";
import { AirportPage } from "@/features/airport/pages";

export const airportRoutes: IRoute[] = [
  {
    path: "/flights/airports",
    element: AirportPage,
    allowRoles: FLIGHT_ACCESS_ROLES.AIRPORT_MANAGEMENT,
    allowPermissions: [
      PermissionSlug.AIRPORT_READ,
      PermissionSlug.AIRPORT_CREATE,
      PermissionSlug.AIRPORT_UPDATE,
      PermissionSlug.AIRPORT_DELETE,
    ],
  },
];
