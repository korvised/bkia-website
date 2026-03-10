import { type IRoute } from "@/types";
import { RoutePage } from "@/features/route/pages";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";

export const routeRoutes: IRoute[] = [
  {
    path: "/flights/routes",
    element: RoutePage,
    allowRoles: FLIGHT_ACCESS_ROLES.ROUTE_MANAGEMENT,
    allowPermissions: [
      PermissionSlug.ROUTE_READ,
      PermissionSlug.ROUTE_CREATE,
      PermissionSlug.ROUTE_UPDATE,
      PermissionSlug.ROUTE_DELETE,
    ],
  },
];
