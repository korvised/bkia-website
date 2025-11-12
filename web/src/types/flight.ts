import {
  FlightDirection,
  FlightStatus,
  FlightType,
  RouteType,
  Terminal,
} from "@/types/enum";
import { IFile } from "@/types/file";
import { type IPagination, Order } from "@/types/pagination";
import { Lang } from "@/types/language";

export type DisplayStatusCode =
  | "CHECK_IN_OPEN"
  | "CHECK_IN_CLOSED"
  | "BOARDING"
  | "FINAL_CALL"
  | "GATE_CLOSED"
  | "ON_TIME"
  | "DELAYED"
  | "DEPARTED"
  | "ARRIVED"
  | "EN_ROUTE"
  | "CANCELED"
  | "DIVERTED"
  | "SCHEDULED";

export interface FlightPageProps {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{
    date?: string;
    destination?: FlightDirection;
    airline?: string;
    q?: string;
    page?: string;
    limit?: string;
  }>;
}

export type OrderBy =
  | "flightNo"
  | "operationDate"
  | "scheduledDepTime"
  | "scheduledArrTime"
  | "createdAt"
  | "status";

export interface QueryFlight {
  // pagination
  page?: number;
  limit?: number;

  // filters
  search?: string;
  direction?: FlightDirection;
  date?: string;
  destination?: string;
  airline?: string;

  // optional extras if you support them
  status?: FlightStatus;
  orderBy?: OrderBy;
  order?: Order;
}

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

export interface IAirport {
  id: string;
  code: string;
  name: string;
  names: Record<Lang, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface IAirline {
  id: string;
  code: string;
  logoFile?: IFile | null;
  name: string;
  names: Record<Lang, string>;
  hotline?: string | null;
  phone?: string | null;
  website?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICounter {
  id: string;
  terminal: Terminal;
  name: string;
  isActive: boolean;
}

export interface IFlightResponse extends IPagination<IFlight> {
  lastUpdated: string;
}
