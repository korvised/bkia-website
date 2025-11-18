import { type IRoute } from "@/types";
import { FLIGHT_ACCESS_ROLES } from "@/constants";
import {
  FlightCreatePage,
  FlightDetailPage,
  FlightEditPage,
  FlightPage,
} from "@/features/flight/pages";

export const flightRoutes: IRoute[] = [
  {
    path: "/flights",
    element: FlightPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
  },
  {
    path: "/flights/create",
    element: FlightCreatePage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
  },
  {
    path: "/flights/:id",
    element: FlightDetailPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
  },
  {
    path: "/flights/:id/edit",
    element: FlightEditPage,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
  },
];
