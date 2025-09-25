"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/types/language";
import { FlightTab } from "@/types/flight";
import { useLanguage } from "@/context/language-context";
import { flightTranslations } from "@/data/translations/flights";
import { useFlights } from "@/hooks/use-flights";
import { useFlightSearch } from "@/hooks/use-flight-search";
import { FlightTabs } from "@/components/flights/flight-tabs";
import { FlightSearch } from "@/components/flights/flight-search";
import { FlightTable } from "@/components/flights/flight-table";
import { AirlineCard } from "@/components/flights/airline-card";
import { AlertTriangle, Plane, RefreshCw } from "lucide-react";

interface FlightsPageContentProps {
  lang: Lang;
  initialQuery?: string;
  initialType?: "departure" | "arrival";
  initialAirline?: string;
}

export default function FlightsPageContent({
  lang,
  initialQuery = "",
  initialType = "departure",
  initialAirline = "",
}: FlightsPageContentProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const { t } = useLanguage();

  // Local UI state
  const [activeTab, setActiveTab] = useState<FlightTab>(
    initialType === "arrival" ? "arrivals" : "departures",
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedAirline, setSelectedAirline] = useState(initialAirline);

  // Sync local state FROM URL (supports both ?tab=... and legacy ?type=...)
  useEffect(() => {
    const q = sp.get("q") ?? "";
    const airline = sp.get("airline") ?? "";

    const tabParam = sp.get("tab") as FlightTab | null;
    const type = sp.get("type");
    const typeToTab: FlightTab | null =
      type === "arrival"
        ? "arrivals"
        : type === "departure"
          ? "departures"
          : null;

    const nextTab: FlightTab = tabParam ?? typeToTab ?? activeTab;

    if (q !== searchQuery) setSearchQuery(q);
    if (airline !== selectedAirline) setSelectedAirline(airline);
    if (nextTab !== activeTab) setActiveTab(nextTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  // Flights + airlines (API fetching is debounced inside the hook)
  const { flights, airlines, loading, error, refetch } = useFlights({
    tab: activeTab,
    query: searchQuery,
    airline: selectedAirline,
  });

  // Client-side filtering of the fetched list (local, instant)
  const { filteredFlights } = useFlightSearch(flights);

  // Update URL when local state changes (write tab always; keep legacy type for arrivals/departures)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedAirline) params.set("airline", selectedAirline);

    // Always encode the active tab to support schedule/airlines
    params.set("tab", activeTab);

    // Optional: legacy type for deep-links
    if (activeTab === "arrivals") params.set("type", "arrival");
    else if (activeTab === "departures") params.set("type", "departure");

    const next = `/${lang}/flights${params.toString() ? "?" + params : ""}`;
    const current = `/${lang}/flights${sp.toString() ? "?" + sp.toString() : ""}`;

    if (next !== current) router.replace(next, { scroll: false });
  }, [router, lang, sp, searchQuery, selectedAirline, activeTab]);

  const handleTabChange = (tab: FlightTab) => setActiveTab(tab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Plane className="text-bokeo-teal-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t(flightTranslations.title)}
          </h1>
        </div>
      </div>

      {/* Search + Filter */}
      {activeTab !== "airlines" && (
        <FlightSearch
          onSearch={setSearchQuery}
          onAirlineFilter={setSelectedAirline}
          searchQuery={searchQuery}
          selectedAirline={selectedAirline}
          airlines={airlines}
        />
      )}

      {/* Tabs */}
      <FlightTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={refetch}
              className="ml-auto text-red-600 underline hover:text-red-800"
            >
              {t(flightTranslations.messages.retry)}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {loading && !flights.length ? (
        <div className="rounded-lg border border-gray-300 bg-white p-8">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="text-bokeo-teal-600 h-6 w-6 animate-spin" />
            <p className="text-gray-600">
              {t(flightTranslations.messages.loading)}
            </p>
          </div>
        </div>
      ) : activeTab === "airlines" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {airlines.map((airline) => (
            <AirlineCard key={airline.code} airline={airline} />
          ))}
        </div>
      ) : filteredFlights.length === 0 ? (
        <div className="p-8 text-center">
          <Plane className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">
            {searchQuery || selectedAirline
              ? t(flightTranslations.messages.noResults)
              : t(flightTranslations.messages.noFlights)}
          </p>
        </div>
      ) : (
        <FlightTable
          flights={filteredFlights}
          type={activeTab === "arrivals" ? "arrival" : "departure"}
        />
      )}

      {/* Count */}
      {activeTab !== "airlines" && filteredFlights.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Showing {filteredFlights.length} flights
          {searchQuery && ` · Search: "${searchQuery}"`}
          {selectedAirline && ` · Airline: ${selectedAirline}`}
        </div>
      )}
    </div>
  );
}
