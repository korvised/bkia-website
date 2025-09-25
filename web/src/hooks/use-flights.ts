"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Flight, Airline, FlightTab } from "@/types/flight";
import { flightApi } from "@/lib/api/flights";
import { useDebounce } from "@/hooks/use-debounce";

type UseFlightsArgs = {
  tab: FlightTab;
  query?: string;
  airline?: string;
};

export function useFlights({ tab, query, airline }: UseFlightsArgs) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce ONLY here to avoid loops
  const debouncedQuery = useDebounce(query ?? "", 400);
  const debouncedAirline = useDebounce(airline ?? "", 400);

  // Prevent out-of-order updates
  const reqIdRef = useRef(0);

  const doFetch = useCallback(
    async (effectiveTab: FlightTab, q?: string, a?: string) => {
      const reqId = ++reqIdRef.current;
      try {
        setLoading(true);
        setError(null);

        let data: Flight[] = [];
        const hasSearch = (q && q.trim() !== "") || (a && a.trim() !== "");

        if (hasSearch) {
          data = await flightApi.searchFlights({
            query: q || undefined,
            airline: a || undefined,
            type:
              effectiveTab === "departures"
                ? "departure"
                : effectiveTab === "arrivals"
                  ? "arrival"
                  : undefined,
          });
        } else {
          switch (effectiveTab) {
            case "departures":
              data = await flightApi.getDepartures();
              break;
            case "arrivals":
              data = await flightApi.getArrivals();
              break;
            case "schedule":
              data = await flightApi.getSchedule();
              break;
            case "airlines":
              data = []; // no flight data; page shows airline cards
              break;
            default:
              data = await flightApi.getSchedule();
          }
        }

        if (reqIdRef.current === reqId) setFlights(data);
      } catch (e) {
        if (reqIdRef.current === reqId) {
          setError(e instanceof Error ? e.message : "Failed to fetch flights");
        }
        console.error("Flight fetch error:", e);
      } finally {
        if (reqIdRef.current === reqId) setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(() => {
    doFetch(tab, debouncedQuery || undefined, debouncedAirline || undefined);
  }, [doFetch, tab, debouncedQuery, debouncedAirline]);

  // Fetch airlines once
  useEffect(() => {
    (async () => {
      try {
        const list = await flightApi.getAirlines();
        setAirlines(list);
      } catch (e) {
        console.error("Failed to fetch airlines:", e);
      }
    })();
  }, []);

  // Drive flight fetching from debounced inputs + tab
  useEffect(() => {
    doFetch(tab, debouncedQuery || undefined, debouncedAirline || undefined);
  }, [tab, debouncedQuery, debouncedAirline, doFetch]);

  return { flights, airlines, loading, error, refetch };
}
