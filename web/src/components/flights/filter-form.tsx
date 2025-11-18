"use client";

import { FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RefreshCw, Search } from "lucide-react";
import { cn, formatDate } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";
import type { QueryFlight } from "@/types/flight";
import { Lang } from "@/types/language";
import { DatePicker } from "./date-picker";

interface FilterFormProps {
  lang: Lang;
  filters: QueryFlight;
  lastUpdated: string;
}

export function FilterForm({ lang, filters, lastUpdated }: FilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const { common: tCommon, filter: tFilter } = createFlightI18n(lang);

  const [date, setDate] = useState(
    filters.date || new Date().toISOString().split("T")[0],
  );
  const [query, setQuery] = useState(filters.search || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Only add non-default values
    if (date) params.set("date", date);
    if (query) params.set("q", query);

    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col-reverse items-end justify-between pb-4 md:flex-row md:items-center"
    >
      <div className="mt-4 mr-4 flex items-center justify-center gap-3 md:mt-0 md:mr-0">
        <div className="text-sm text-gray-600">
          {tFilter.lastUpdated}: {formatDate(lastUpdated, "dd/MM/yyyy, HH:mm")}
        </div>
        <button
          className="text-gray-700 transition-colors hover:text-gray-900"
          aria-label={tFilter.refresh}
        >
          <RefreshCw className={cn("h-4 w-4", { "animate-spin": isPending })} />
        </button>
      </div>

      <div className="flex items-center justify-end gap-3">
        {/* Date Picker */}
        <DatePicker value={date} onChange={setDate} lang={lang} />

        {/* Flight Number Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tFilter.searchPlaceholder}
          className="focus:border-primary-500 focus:ring-primary-500/20 h-11 min-w-[200px] rounded-sm border border-gray-300 bg-white px-4 text-sm focus:ring-2 focus:outline-none"
        />

        {/* Search Button */}
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "group sm:bg-primary-500 flex items-center gap-2 rounded-sm px-2 text-sm font-medium text-gray-600 transition-colors sm:h-11 sm:px-6 sm:text-white",
            "sm:hover:bg-primary-600 sm:hover:text-gray-50",
            "focus:ring-primary-500 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50",
          )}
        >
          <Search className="h-6 w-6 sm:group-hover:text-gray-50 md:h-4 md:w-4" />
          <span className="hidden lg:inline">{tCommon.searchButton}</span>
        </button>
      </div>
    </form>
  );
}
