import { fetchJSON, withQuery } from "@/lib";
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
    sortBy: "operationDate",
    order: "ASC",
  };
}

export function listFlights(query: QueryFlight) {
  const url = withQuery("flights", {
    search: query.search,
    direction: query.direction,
    operationDate: query.date,
    airline: query.airline,
    sortBy: "scheduledDepTime",
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<IFlightResponse>(url);
}

export function listAirlines() {
  const url = withQuery("airlines", {
    isActive: true,
    orderBy: "createdAt",
    order: "ASC",
    page: 1,
    limit: 50,
  });
  return fetchJSON<IPagination<IAirline>>(url);
}
