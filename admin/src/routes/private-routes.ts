import { type IRoute } from "@/types";
import { flightRoutes } from "@/features/flight/routes.ts";
import { airlineRoutes } from "@/features/airline/routes.ts";
import { airportRoutes } from "@/features/airport/routes.ts";
import { counterRoutes } from "@/features/counter/routes.ts";
import { routeRoutes } from "@/features/route/routes.ts";

export const privateRoutes: IRoute[] = [
  ...new Set([
    ...flightRoutes,
    ...airlineRoutes,
    ...airportRoutes,
    ...counterRoutes,
    ...routeRoutes,
  ]),
];
