import { RouteType } from "@/types";
import type { IAirport } from "@/features/airport/types";

export interface IRoute {
  id: string;
  routeType: RouteType;
  durationMin: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  origin: IAirport;
  destination: IAirport;
}
