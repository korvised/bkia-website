import { type IRoute } from "@/types";
import { FlightPage } from "@/features/flight/pages";
import { FLIGHT_ACCESS_ROLES } from "@/constants";

export const flightRoutes: IRoute[] = [
  {
    path: "/flights",
    element: FlightPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
  },
];
