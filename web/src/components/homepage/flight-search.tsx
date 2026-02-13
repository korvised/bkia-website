"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { useLanguage } from "@/context";
import { cn } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";
import DatePicker from "./date-picker";
import WeatherWidget from "./weather-widget";

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
    <section className={cn("relative bg-white", className)}>
      <div className="container flex h-full w-full items-center py-4 sm:py-6 lg:py-8">
        <div className="grid w-full gap-4 sm:gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Left: Title + Weather */}
          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-center lg:gap-4">
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl leading-tight font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                {tSearch.title}
              </h2>
              <p className="text-primary-600 mt-0.5 text-base font-bold sm:text-xl lg:text-2xl">
                {tSearch.subtitle}
              </p>
            </div>
            <WeatherWidget lang={lang} />
          </div>

          {/* Right: Search Form */}
          <div className="flex flex-col gap-3 sm:gap-5">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 sm:gap-8">
              <button
                onClick={() => setTab("departures")}
                className={cn(
                  "group relative flex items-center gap-2 pb-3 text-sm font-semibold transition-colors sm:gap-2.5 sm:pb-4 sm:text-base lg:text-lg",
                  tab === "departures"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneTakeoff className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                {tCommon.departure}
                {tab === "departures" && (
                  <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-0.5" />
                )}
              </button>

              <button
                onClick={() => setTab("arrivals")}
                className={cn(
                  "group relative flex items-center gap-2 pb-3 text-sm font-semibold transition-colors sm:gap-2.5 sm:pb-4 sm:text-base lg:text-lg",
                  tab === "arrivals"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneLanding className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                {tCommon.arrival}
                {tab === "arrivals" && (
                  <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-0.5" />
                )}
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
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
                  "group relative flex h-12 w-full cursor-text items-center gap-3 rounded-lg border-2 bg-white px-3 shadow-sm transition-all sm:h-14 lg:h-16 lg:flex-1 xl:px-5",
                  focusSearchInput
                    ? "border-primary-500 ring-primary-100 shadow-md ring-2"
                    : "border-gray-300 hover:border-gray-400 hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors sm:h-9 sm:w-9 lg:h-10 lg:w-10",
                    focusSearchInput ? "bg-primary-100" : "bg-gray-100",
                  )}
                >
                  <PiAirplaneInFlightBold
                    className={cn(
                      "h-4 w-4 transition-colors sm:h-5 sm:w-5",
                      focusSearchInput ? "text-primary-600" : "text-gray-700",
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-0.5">
                  <div
                    className={cn(
                      "text-xs font-semibold tracking-wide uppercase transition-colors",
                      focusSearchInput ? "text-primary-600" : "text-gray-500",
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
                    className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-sm placeholder:font-normal placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary-600/80 hover:bg-primary-600 flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg px-8 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] sm:h-14 sm:w-auto lg:h-16 xl:px-10"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="whitespace-nowrap">
                  {tCommon.searchButton}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
