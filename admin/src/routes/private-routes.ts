import { type IRoute } from "@/types";
import { flightRoutes } from "@/features/flight/routes.ts";

export const privateRoutes: IRoute[] = [...new Set([...flightRoutes])];
