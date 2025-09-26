"use client";

import { useMemo } from "react";
import { Flight, FlightTab } from "@/types/flight";
import { useDebounce } from "@/hooks/use-debounce";

type UseFlightFilterArgs = {
  flights: Flight[];
  tab: FlightTab;
  query?: string;
  airline?: string;
};

export function useFlightFilter({
  flights,
  tab,
  query = "",
  airline = "",
}: UseFlightFilterArgs) {
  // Debounce search inputs
  const debouncedQuery = useDebounce(query, 400);
  const debouncedAirline = useDebounce(airline, 400);

  const filteredFlights = useMemo(() => {
    let filtered = [...flights];

    // Filter by tab type
    if (tab === "departures" || tab === "arrivals") {
      filtered = filtered.filter((flight) =>
        tab === "departures"
          ? flight.origin === "Bokeo International Airport"
          : flight.destination === "Bokeo International Airport",
      );
    }

    // Filter by search query
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (flight) =>
          flight.flightNumber.toLowerCase().includes(q) ||
          flight.airline.toLowerCase().includes(q) ||
          flight.origin.toLowerCase().includes(q) ||
          flight.destination.toLowerCase().includes(q) ||
          (flight.stopover1 && flight.stopover1.toLowerCase().includes(q)) ||
          (flight.stopover2 && flight.stopover2.toLowerCase().includes(q)),
      );
    }

    // Filter by airline
    if (debouncedAirline) {
      filtered = filtered.filter(
        (flight) => flight.airlineCode === debouncedAirline,
      );
    }

    return filtered;
  }, [flights, tab, debouncedQuery, debouncedAirline]);

  return {
    filteredFlights,
  };
}
