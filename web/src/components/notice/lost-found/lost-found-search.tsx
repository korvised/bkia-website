"use client";

import { Search, X, Filter } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lang } from "@/types/language";
import {
  lostFoundCategories,
  lostFoundStatuses,
  lostFoundTypes,
} from "@/data/notice/lost-found";
import { useMemo } from "react";
import { cn } from "@/utils/cn";

interface LostFoundSearchProps {
  lang: Lang;
  resultsCount?: number;
  selectedCategory?: string;
  selectedStatus?: string;
  selectedType?: string;
}

export function LostFoundSearch({
  lang,
  resultsCount,
  selectedCategory,
  selectedStatus,
  selectedType,
}: LostFoundSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive current filters from URL (with prop fallbacks) — no local mirroring
  const { query, category, status, type } = useMemo(() => {
    const qp = searchParams.get("query") ?? "";
    const cat = searchParams.get("category") ?? selectedCategory ?? "all";
    const st = searchParams.get("status") ?? selectedStatus ?? "all";
    const tp = searchParams.get("type") ?? selectedType ?? "all";
    return { query: qp, category: cat, status: st, type: tp };
  }, [searchParams, selectedCategory, selectedStatus, selectedType]);

  const updateURL = (params: {
    query: string;
    category: string;
    status: string;
    type: string;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    if (params.query.trim() === "") {
      urlParams.delete("query");
    } else {
      urlParams.set("query", params.query);
    }

    if (params.category === "all") {
      urlParams.delete("category");
    } else {
      urlParams.set("category", params.category);
    }

    if (params.status === "all") {
      urlParams.delete("status");
    } else {
      urlParams.set("status", params.status);
    }

    if (params.type === "all") {
      urlParams.delete("type");
    } else {
      urlParams.set("type", params.type);
    }

    router.push(`/${lang}/notices/lost-found?${urlParams.toString()}`, {
      scroll: false,
    });
  };

  // Handlers push updates to URL only (no setState)
  const handleSearch = (value: string) =>
    updateURL({ query: value, category, status, type });

  const handleCategoryChange = (value: string) =>
    updateURL({ query, category: value, status, type });

  const handleStatusChange = (value: string) =>
    updateURL({ query, category, status: value, type });

  const handleTypeChange = (value: string) =>
    updateURL({ query, category, status, type: value });

  const handleClear = () => {
    router.push(`/${lang}/notices/lost-found`, { scroll: false });
  };

  const hasActiveFilters =
    query !== "" || category !== "all" || status !== "all" || type !== "all";

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by item name, description, location, or reference number..."
          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 text-sm focus:ring-2 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
        >
          {lostFoundTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
        >
          {lostFoundCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
        >
          {lostFoundStatuses.map((stat) => (
            <option key={stat.id} value={stat.id}>
              {stat.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Clear All
          </button>
        )}
      </div>

      {hasActiveFilters && resultsCount !== undefined && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{resultsCount}</span> item
            {resultsCount !== 1 ? "s" : ""}
          </p>
          <button
            onClick={handleClear}
            className={cn(
              "text-primary-600 hover:text-primary-700 text-sm font-medium",
            )}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
