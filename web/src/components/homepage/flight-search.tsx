"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  PlaneLanding,
  PlaneTakeoff,
  Search,
} from "lucide-react";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { useLanguage } from "@/context";
import { cn } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";
import DatePicker from "./date-picker";
import WeatherWidget from "./weather-widget";
import { AnimatedGlobe } from "./animated-globe";

type Tab = "departures" | "arrivals";

interface FlightSearchProps {
  className?: string;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({ className }) => {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("departures");
  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState<string>("");
  const [focusSearchInput, setFocusSearchInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { common: tCommon, search: tSearch } = createFlightI18n(lang);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("date", format(date, "yyyy-MM-dd"));
    if (query.trim()) params.set("q", query.trim());
    router.push(`/${lang}/flights/${tab}?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearchBoxClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      className={cn(
        "relative flex flex-col bg-white",
        className,
      )}
    >
      {/* Animated world map */}
      <AnimatedGlobe />

      {/* Subtle dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#00AAAC_1px,transparent_1px)] [background-size:28px_28px]"
        style={{ opacity: 0.04 }}
      />

      {/* ── Weather + Search ──────────────────────────────────────────── */}
      <div className="container relative flex flex-1 flex-col justify-center py-4 sm:py-6">

        {/* Row 1: Weather */}
        <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
          <WeatherWidget lang={lang} />
        </div>

        {/* Row 2: Search form */}
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3">

          {/* Departure / Arrival tabs */}
          <div className="flex shrink-0 gap-1 self-start rounded-xl bg-gray-100 p-1 lg:self-auto">
            <button
              onClick={() => setTab("departures")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
                tab === "departures"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-200 hover:text-gray-700",
              )}
            >
              <PlaneTakeoff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {tCommon.departure}
            </button>
            <button
              onClick={() => setTab("arrivals")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
                tab === "arrivals"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-200 hover:text-gray-700",
              )}
            >
              <PlaneLanding className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {tCommon.arrival}
            </button>
          </div>

          {/* Date Picker */}
          <DatePicker
            date={date}
            onDateChange={setDate}
            lang={lang}
            label={tSearch.pickDate}
          />

          {/* Search Input */}
          <div
            onClick={handleSearchBoxClick}
            className={cn(
              "group relative flex h-12 w-full cursor-text items-center gap-3 rounded-lg border-2 bg-white px-3 transition-all lg:flex-1",
              focusSearchInput
                ? "border-primary ring-2 ring-primary/10"
                : "border-gray-200 hover:border-gray-300",
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                focusSearchInput ? "bg-primary/10" : "bg-gray-100",
              )}
            >
              <PiAirplaneInFlightBold
                className={cn(
                  "h-4 w-4 transition-colors",
                  focusSearchInput ? "text-primary" : "text-gray-500",
                )}
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5">
              <div
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide transition-colors",
                  focusSearchInput ? "text-primary" : "text-gray-500",
                )}
              >
                {tSearch.searchInputTitle}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setFocusSearchInput(true)}
                onBlur={() => setFocusSearchInput(false)}
                placeholder={tSearch.searchPlaceholder}
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
          >
            <Search className="h-4 w-4" />
            <span className="whitespace-nowrap">{tCommon.searchButton}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
