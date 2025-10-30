"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Lang } from "@/types/language";
import {
  FlightFilters,
  terminals,
  destinations,
  airlines,
  translations,
} from "@/data/flight-board";
import { TerminalSelector } from "./terminal-selector";
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

  const [terminal, setTerminal] = useState(filters.terminal || "all");
  const [date, setDate] = useState(
    filters.date || new Date().toISOString().split("T")[0],
  );
  const [startTime, setStartTime] = useState(filters.startTime || "00:00");
  const [endTime, setEndTime] = useState(filters.endTime || "23:59");
  const [destination, setDestination] = useState(filters.destination || "");
  const [airline, setAirline] = useState(filters.airline || "");
  const [flightNumber, setFlightNumber] = useState(filters.flightNumber || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Only add non-default values
    if (terminal !== "all") params.set("terminal", terminal);
    if (date) params.set("date", date);
    if (startTime !== "00:00") params.set("startTime", startTime);
    if (endTime !== "23:59") params.set("endTime", endTime);
    if (destination) params.set("destination", destination);
    if (airline) params.set("airline", airline);
    if (flightNumber) params.set("flightNumber", flightNumber);

    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-wrap items-end gap-3">
        {/* Terminal Selector */}
        <TerminalSelector
          options={terminals}
          value={terminal}
          onChange={setTerminal}
          label={(opt) => t(opt.label)}
        />

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
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder={t(translations.enterFlightNo)}
          className="focus:border-primary-500 focus:ring-primary-500/20 h-11 min-w-[200px] flex-1 rounded-sm border border-gray-300 bg-white px-4 text-sm focus:ring-2 focus:outline-none"
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
