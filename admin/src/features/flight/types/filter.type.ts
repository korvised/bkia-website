import type {
  FlightDirection,
  FlightStatus,
  FlightType,
  Order,
  Terminal,
} from "@/types";

export interface IFlightFilter {
  page?: number;
  limit?: number;
  search?: string;
  operationDate?: string;
  direction?: FlightDirection | "";
  type?: FlightType | "";
  terminal?: Terminal | "";
  gate?: string;
  status?: FlightStatus | "";
  airlineId?: string;
  counterId?: string;
  sortBy?: string;
  order?: Order;
}
