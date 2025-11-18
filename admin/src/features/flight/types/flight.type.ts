import { FlightStatus, FlightType, type IPagination, Terminal } from "@/types";
import type { IRoute } from "@/features/route/types";
import type { IAirline } from "@/features/airline/types";
import type { ICounter } from "@/features/counter/types";

export interface IFlight {
  id: string;
  flightNo: string;
  type: FlightType;
  terminal: Terminal;
  gate?: string | null;
  operationDate: string;
  scheduledDepTime: string;
  scheduledArrTime: string;
  actualDepTime?: string | null;
  actualArrTime?: string | null;
  checkInStartTime?: string | null;
  checkInEndTime?: string | null;
  status: FlightStatus;
  remarks?: string | null;
  createdAt: string;
  updatedAt: string;
  route: IRoute;
  airline: IAirline;
  checkInCounters: ICounter[];
}

export type IFlightResponse = IPagination<IFlight>;
