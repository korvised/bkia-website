import type { FlightStatus, FlightType, Terminal, RouteType } from "@/types";

export type FlightDirection = "departure" | "arrival" | "";

export interface ICreateFlightForm {
  flightNo: string;
  type: FlightType | "";
  terminal: Terminal | "";
  gate: string;
  operationDates: Date[];
  scheduledDepTime: string;
  scheduledArrTime: string;
  actualDepTime: string;
  actualArrTime: string;
  checkInStartTime: string;
  checkInEndTime: string;
  status: FlightStatus;
  remarks: string;
  routeId: string;
  airlineId: string;
  checkInCounterIds: string[];
  direction: FlightDirection;
  routeType: RouteType | "";
}

export interface IBulkCreateFlightPayload {
  flightNo: string;
  type: FlightType;
  terminal: Terminal;
  gate?: string | null;
  operationDates: string[];
  scheduledDepTime: string;
  scheduledArrTime: string;
  actualDepTime?: string | null;
  actualArrTime?: string | null;
  checkInStartTime?: string | null;
  checkInEndTime?: string | null;
  status: FlightStatus;
  remarks?: string | null;
  routeId: string;
  airlineId: string;
  checkInCounterIds?: string[];
}
