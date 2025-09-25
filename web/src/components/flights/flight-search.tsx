"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { flightTranslations } from "@/data/translations/flights";

interface FlightSearchProps {
  onSearch: (query: string) => void;
  onAirlineFilter: (airline: string) => void;
  searchQuery: string;
  selectedAirline: string;
  airlines: Array<{
    code: string;
    name: { en: string; lo: string; zh: string };
  }>;
}

export function FlightSearch({ onSearch, searchQuery }: FlightSearchProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t(flightTranslations.searchPlaceholder)}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="focus:ring-bokeo-teal-500 w-full rounded-lg border border-gray-200 bg-white py-3 pr-6 pl-10 focus:border-transparent focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
}
