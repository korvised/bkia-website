"use client";

import { useState, useMemo } from "react";
import { Flight } from "@/types/flight";
import { useDebounce } from "@/hooks/use-debounce";

export function useFlightSearch(flights: Flight[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirline, setSelectedAirline] = useState("");

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 400);

  const filteredFlights = useMemo(() => {
    let filtered = [...flights];

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (flight) =>
          flight.flightNumber.toLowerCase().includes(query) ||
          flight.airline.toLowerCase().includes(query) ||
          flight.origin.toLowerCase().includes(query) ||
          flight.destination.toLowerCase().includes(query) ||
          (flight.stopover1 &&
            flight.stopover1.toLowerCase().includes(query)) ||
          (flight.stopover2 && flight.stopover2.toLowerCase().includes(query)),
      );
    }

    // Filter by airline
    if (selectedAirline) {
      filtered = filtered.filter(
        (flight) => flight.airlineCode === selectedAirline,
      );
    }

    return filtered;
  }, [flights, debouncedSearch, selectedAirline]);

  return {
    searchQuery,
    selectedAirline,
    filteredFlights,
    setSearchQuery,
    setSelectedAirline,
  };
}
