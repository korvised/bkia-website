import { type IRoute } from "@/types";
import { RoutePage } from "@/features/route/pages";
import { FLIGHT_ACCESS_ROLES } from "@/constants";

export const routeRoutes: IRoute[] = [
  {
    path: "/flights/routes",
    element: RoutePage,
    allowRoles: FLIGHT_ACCESS_ROLES.ROUTE_MANAGEMENT,
  },
];
