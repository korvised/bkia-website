import { API_BASE_URL, fetchJSON } from "./http";
import { withQuery } from "@/utils/url";
import type { IPagination } from "@/types/pagination";
import type { IAirline, IFlight, QueryFlight } from "@/types/flight";

export function listFlights(query: QueryFlight) {
  const url = withQuery(`${API_BASE_URL}/flights`, {
    search: query.search,
    direction: query.direction,
    operationDate: query.date,
    airline: query.airline,
    orderBy: query.orderBy,
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<IPagination<IFlight>>(url);
}

export function listAirlines() {
  const url = withQuery(`${API_BASE_URL}/airlines`, {
    isActive: true,
    page: 1,
    limit: 50,
  });
  return fetchJSON<IPagination<IAirline>>(url);
}
