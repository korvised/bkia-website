export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  origin: string;
  destination: string;
  gate?: string;
  terminal?: string;
  scheduledTime: string;
  estimatedTime?: string;
  actualTime?: string;
  status: FlightStatus;
  stops?: number;
  stopover1?: string;
  stopover2?: string;
}

export interface Airline {
  code: string;
  name: {
    en: string;
    lo: string;
    zh: string;
  };
  logo?: string;
  website: string;
  phone: string;
  servicePhone?: string;
}

export type FlightStatus =
  | "scheduled"
  | "boarding"
  | "delayed"
  | "departed"
  | "arrived"
  | "on-time"
  | "on-final"
  | "landing"
  | "cancelled";
export type FlightType = "departure" | "arrival";
export type FlightTab = "departures" | "arrivals" | "schedule" | "airlines";
