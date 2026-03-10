import { type IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import {
  FlightCreatePage,
  FlightDetailPage,
  FlightEditPage,
  FlightPage,
} from "@/features/flight/pages";

const FLIGHT_PERMISSIONS = [
  PermissionSlug.FLIGHT_READ,
  PermissionSlug.FLIGHT_CREATE,
  PermissionSlug.FLIGHT_UPDATE,
  PermissionSlug.FLIGHT_DELETE,
];

export const flightRoutes: IRoute[] = [
  {
    path: "/flights",
    element: FlightPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
    allowPermissions: FLIGHT_PERMISSIONS,
  },
  {
    path: "/flights/create",
    element: FlightCreatePage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
    allowPermissions: FLIGHT_PERMISSIONS,
  },
  {
    path: "/flights/:id",
    element: FlightDetailPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
    allowPermissions: FLIGHT_PERMISSIONS,
  },
  {
    path: "/flights/:id/edit",
    element: FlightEditPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
    allowPermissions: FLIGHT_PERMISSIONS,
  },
];
