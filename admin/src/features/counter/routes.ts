import { type IRoute } from "@/types";
import { CounterPage } from "@/features/counter/pages";
import { FLIGHT_ACCESS_ROLES } from "@/constants";

export const counterRoutes: IRoute[] = [
  {
    path: "/flights/counters",
    element: CounterPage,
    allowRoles: FLIGHT_ACCESS_ROLES.COUNTER_MANAGEMENT,
  },
];
