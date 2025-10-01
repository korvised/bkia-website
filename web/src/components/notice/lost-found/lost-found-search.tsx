"use client";

import { Search, X, Filter } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Lang } from "@/types/language";
import { lostFoundCategories, lostFoundStatuses, lostFoundTypes } from "@/data/notice/lost-found";

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
                                  selectedType
                                }: LostFoundSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [category, setCategory] = useState(selectedCategory || "all");
  const [status, setStatus] = useState(selectedStatus || "all");
  const [type, setType] = useState(selectedType || "all");

  useEffect(() => {
    setSearchQuery(queryParam);
    setCategory(selectedCategory || "all");
    setStatus(selectedStatus || "all");
    setType(selectedType || "all");
  }, [queryParam, selectedCategory, selectedStatus, selectedType]);

  const updateURL = (params: { query: string; category: string; status: string; type: string }) => {
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
      scroll: false
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    updateURL({ query: value, category, status, type });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateURL({ query: searchQuery, category: value, status, type });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    updateURL({ query: searchQuery, category, status: value, type });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    updateURL({ query: searchQuery, category, status, type: value });
  };

  const handleClear = () => {
    setSearchQuery("");
    setCategory("all");
    setStatus("all");
    setType("all");
    router.push(`/${lang}/notices/lost-found`, { scroll: false });
  };

  const hasActiveFilters = searchQuery || category !== "all" || status !== "all" || type !== "all";

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by item name, description, location, or reference number..."
          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm focus:border-bokeo-teal-500 focus:outline-none focus:ring-2 focus:ring-bokeo-teal-500"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-bokeo-teal-500 focus:outline-none focus:ring-2 focus:ring-bokeo-teal-500"
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
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-bokeo-teal-500 focus:outline-none focus:ring-2 focus:ring-bokeo-teal-500"
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
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-bokeo-teal-500 focus:outline-none focus:ring-2 focus:ring-bokeo-teal-500"
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
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
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
            className="text-sm font-medium text-bokeo-teal-600 hover:text-bokeo-teal-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
