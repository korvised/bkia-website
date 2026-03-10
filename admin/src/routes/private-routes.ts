import { type IRoute } from "@/types";
import { flightRoutes } from "@/features/flight/routes.ts";
import { airlineRoutes } from "@/features/airline/routes.ts";
import { airportRoutes } from "@/features/airport/routes.ts";
import { counterRoutes } from "@/features/counter/routes.ts";
import { routeRoutes } from "@/features/route/routes.ts";
import { userRoutes } from "@/features/user/routes.ts";
import { roleRoutes } from "@/features/role/routes.ts";
import { permissionRoutes } from "@/features/permission/routes.ts";
import { lostFoundRoutes } from "@/features/lost-found/routes.ts";
import { noticeRoutes } from "@/features/notice/routes.ts";
import { newsRoutes } from "@/features/news/routes.ts";

export const privateRoutes: IRoute[] = [
  ...new Set([
    ...flightRoutes,
    ...airlineRoutes,
    ...airportRoutes,
    ...counterRoutes,
    ...routeRoutes,
    ...userRoutes,
    ...roleRoutes,
    ...permissionRoutes,
    ...lostFoundRoutes,
    ...noticeRoutes,
    ...newsRoutes,
  ]),
];
