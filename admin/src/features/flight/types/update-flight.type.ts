import type { FlightStatus, FlightType, Terminal } from "@/types";

export interface IUpdateFlightPayload {
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
  routeId: string;
  airlineId: string;
  checkInCounterIds?: string[];
}
