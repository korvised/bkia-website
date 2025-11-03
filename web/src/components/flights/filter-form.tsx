"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Lang } from "@/types/language";
import {
  airlines,
  destinations,
  FlightFilters,
  translations,
} from "@/data/flight-board";
import { IconSelector } from "./icon-selector";
import { DatePicker } from "./date-picker";

interface FilterFormProps {
  lang: Lang;
  filters: FlightFilters;
}

export function FilterForm({ lang, filters }: FilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const t = (text: Record<Lang, string>) => text[lang];

  const [date, setDate] = useState(
    filters.date || new Date().toISOString().split("T")[0],
  );
  const [destination, setDestination] = useState(filters.destination || "");
  const [airline, setAirline] = useState(filters.airline || "");
  const [query, setQuery] = useState(filters.q || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Only add non-default values
    if (date) params.set("date", date);
    if (destination) params.set("destination", destination);
    if (airline) params.set("airline", airline);
    if (query) params.set("q", query);

    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-wrap items-end justify-end gap-3">
        {/* Date Picker */}
        <DatePicker value={date} onChange={setDate} lang={lang} />

        {/* Destination Selector */}
        <IconSelector
          options={destinations}
          value={destination}
          onChange={setDestination}
          label={(opt) => t(opt.label)}
          placeholder
          className="min-w-[15rem]"
        />

        {/* Airline Selector */}
        <IconSelector
          options={airlines}
          value={airline}
          onChange={setAirline}
          label={(opt) => t(opt.label)}
          placeholder
          className="min-w-[15rem]"
        />

        {/* Flight Number Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(translations.enterFlightNo)}
          className="focus:border-primary-500 focus:ring-primary-500/20 h-11 min-w-[200px] rounded-sm border border-gray-300 bg-white px-4 text-sm focus:ring-2 focus:outline-none"
        />

        {/* Search Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 flex h-11 items-center gap-2 rounded-sm px-6 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          <Search className="h-4 w-4" />
          {t(translations.search)}
        </button>
      </div>
    </form>
  );
}
