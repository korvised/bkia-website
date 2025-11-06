import { withQuery } from "../utils/url";
import type { IPagination } from "@/types/api";
import type { IFlight } from "@/types/flight";
import type { QueryFlight } from "@/types/query-flight";
import { WelcomePopupConfig } from "@/types/welcome-popup";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    // for live-ish boards: don't cache; adjust to `revalidate: 30` if you prefer
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json() as Promise<T>;
}

export const apiClient = {
  flights: {
    list(query: QueryFlight) {
      const url = withQuery(`${API_BASE_URL}/flights`, {
        // map frontend filters to backend DTO fields
        page: query.page,
        limit: query.limit,
        search: query.search, // QueryFlightDto.search
        direction: query.direction, // 'departure'
        date: query.date, // operationDate on server
        destination: query.destination, // IATA code (server supports this)
        airline: query.airline, // airline code/prefix
        status: query.status,
        orderBy: query.orderBy,
        order: query.order,
      });
      return fetchJSON<IPagination<IFlight>>(url);
    },
  },
  welcome: {
    // Get welcome popups configuration
    getWelcomePopup(): Promise<WelcomePopupConfig> {
      return fetchJSON<WelcomePopupConfig>(`${API_BASE_URL}/welcome-popup`, {
        cache: 'no-store',
      });
    },

    // Track popup impression (optional analytics)
    async trackImpression(popupId: string): Promise<void> {
      try {
        // keepalive lets this succeed even if the page is unloading
        await fetch(`${API_BASE_URL}/welcome-popup/track`, {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            popupId,
            timestamp: new Date().toISOString(),
            event: 'impression',
          }),
        });
      } catch (err) {
        // Non-fatal: log and continue
        console.error('Error tracking popup impression:', err);
      }
    },

    // Track popup click (optional analytics)
    async trackClick(popupId: string, link: string): Promise<void> {
      try {
        await fetch(`${API_BASE_URL}/welcome-popup/click`, {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            popupId,
            link,
            timestamp: new Date().toISOString(),
            event: 'click',
          }),
        });
      } catch (err) {
        // Non-fatal: log and continue
        console.error('Error tracking popup click:', err);
      }
    },
  },
};
