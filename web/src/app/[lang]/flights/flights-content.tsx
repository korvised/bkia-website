"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/types/language";
import { Plane } from "lucide-react";
import { Airline, Flight, FlightTab } from "@/types/flight";
import { useLanguage } from "@/context/language-context";
import { flightTranslations } from "@/data/translations/flights";
import { useFlightFilter } from "@/hooks/use-flight-filter";
import {
  AirlineCard,
  FlightSearch,
  FlightTable,
  FlightTabs,
} from "@/components/flights";

interface FlightsPageContentProps {
  lang: Lang;
  initialQuery?: string;
  initialType?: "departure" | "arrival";
  initialAirline?: string;
  flights: Flight[];
  airlines: Airline[];
}

export default function FlightsPageContent({
  lang,
  initialQuery = "",
  initialType = "departure",
  initialAirline = "",
  flights,
  airlines,
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

  // Client-side filtering with debouncing
  const { filteredFlights } = useFlightFilter({
    flights,
    tab: activeTab,
    query: searchQuery,
    airline: selectedAirline,
  });

  // Update URL when local state changes
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

      {/* Content */}
      {activeTab === "airlines" ? (
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
          {`${t(flightTranslations.table.showing)} ${filteredFlights.length} ${t(flightTranslations.table.flights)}`}
          {searchQuery && ` · Search: "${searchQuery}"`}
          {selectedAirline && ` · Airline: ${selectedAirline}`}
        </div>
      )}
    </div>
  );
}
