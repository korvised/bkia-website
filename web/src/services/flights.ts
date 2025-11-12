import { API_BASE_URL, fetchJSON } from "./http";
import { withQuery } from "@/utils/url";
import type { IPagination } from "@/types/pagination";
import type {
  FlightPageProps,
  IAirline,
  IFlightResponse,
  QueryFlight,
} from "@/types/flight";
import { FlightDirection } from "@/types/enum";
import { currentDateISO } from "@/constants";

export function toQuery(
  filters: Awaited<FlightPageProps["searchParams"]>,
  direction?: FlightDirection,
): QueryFlight {
  return {
    direction: direction ?? filters.destination,
    date: filters.date ?? currentDateISO,
    destination: filters.destination,
    airline: filters.airline,
    search: filters.q,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 25,
    orderBy: "operationDate",
    order: "ASC",
  };
}

export function listFlights(query: QueryFlight) {
  const url = withQuery(`${API_BASE_URL}/flights`, {
    search: query.search,
    direction: query.direction,
    operationDate: query.date,
    airline: query.airline,
    orderBy: "scheduledDepTime",
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<IFlightResponse>(url);
}

export function listAirlines() {
  const url = withQuery(`${API_BASE_URL}/airlines`, {
    isActive: true,
    orderBy: "createdAt",
    order: "ASC",
    page: 1,
    limit: 50,
  });
  return fetchJSON<IPagination<IAirline>>(url);
}
