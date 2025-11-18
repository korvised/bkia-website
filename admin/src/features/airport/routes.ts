import type { IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import { AirportPage } from "@/features/airport/pages";

export const airportRoutes: IRoute[] = [
  {
    path: "/flights/airports",
    element: AirportPage,
    allowRoles: FLIGHT_ACCESS_ROLES.COUNTER_MANAGEMENT,
  },
];
