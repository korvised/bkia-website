"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { useLanguage } from "@/context";
import { cn } from "@/lib";
import { WeatherWidget } from "@/components/homepage";
import { createFlightI18n } from "@/data/i18n/flights";
import DatePicker from "./date-picker";

type Tab = "departures" | "arrivals";

interface FlightSearchProps {
  className?: string;
}

export default function FlightSearch({ className }: FlightSearchProps) {
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
    <section className={cn("relative bg-white shadow-sm", className)}>
      <div className="container flex h-full items-center px-4 py-6 sm:py-8 lg:px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left: Title + Weather */}
          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-start lg:gap-5">
            {/* Title */}
            <div className="flex-1 lg:flex-none">
              <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl">
                {tSearch.title}
              </h2>
              <p className="text-primary-600 mt-1 text-xl font-bold sm:text-2xl">
                {tSearch.subtitle}
              </p>
            </div>

            {/* Weather & Time */}
            <WeatherWidget lang={lang} />
          </div>

          {/* Right: Search Form */}
          <div className="flex flex-col gap-6">
            {/* Tabs with Bottom Line - All Primary Color */}
            <div className="flex gap-8 border-b border-gray-200">
              <button
                onClick={() => setTab("departures")}
                className={cn(
                  "group relative flex items-center gap-2.5 pb-4 text-base font-semibold transition-colors sm:text-lg",
                  tab === "departures"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneTakeoff className="h-5 w-5 sm:h-6 sm:w-6" />
                {tCommon.departure}
                {/* Bottom indicator */}
                {tab === "departures" && (
                  <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-0.5" />
                )}
              </button>

              <button
                onClick={() => setTab("arrivals")}
                className={cn(
                  "group relative flex items-center gap-2.5 pb-4 text-base font-semibold transition-colors sm:text-lg",
                  tab === "arrivals"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneLanding className="h-5 w-5 sm:h-6 sm:w-6" />
                {tCommon.arrival}
                {/* Bottom indicator */}
                {tab === "arrivals" && (
                  <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-0.5" />
                )}
              </button>
            </div>

            {/* Form Fields - All Same Height */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              {/* Date Picker Component */}
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
                  "group relative flex h-14 w-full cursor-text items-center gap-4 rounded-lg border-2 bg-white px-3 shadow-sm transition-all md:h-16 lg:flex-1 xl:px-5",
                  focusSearchInput
                    ? "border-primary-500 ring-primary-100 shadow-md ring-2"
                    : "border-gray-300 hover:border-gray-400 hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 items-center justify-center rounded-lg transition-colors md:h-10 md:w-10",
                    focusSearchInput ? "bg-primary-100" : "bg-gray-100",
                  )}
                >
                  <PiAirplaneInFlightBold
                    className={cn(
                      "h-5 w-5 transition-colors",
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
                    className="w-full bg-transparent text-base font-medium text-gray-900 outline-none placeholder:text-sm placeholder:font-normal placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary-600/80 hover:bg-primary-600/90 group relative flex h-12 w-fit cursor-pointer items-center justify-center gap-2.5 rounded-lg px-8 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] md:h-16 xl:px-10"
              >
                <Search className="h-5 w-5" />
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
}
