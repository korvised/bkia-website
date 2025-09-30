"use client";

import { Search, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Lang } from "@/types/language";

interface NoticeSearchProps {
  lang: Lang;
  resultsCount?: number;
}

export function NoticeSearch({ lang, resultsCount }: NoticeSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);

  // Sync with URL params
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete("query");
    } else {
      params.set("query", value);
    }
    router.push(`/${lang}/notices/important?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleClear = () => {
    handleSearch("");
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search notices..."
          className="focus:border-bokeo-teal-500 focus:ring-bokeo-teal-500 w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 text-sm focus:ring-2 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchQuery && resultsCount !== undefined && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{resultsCount}</span> result
            {resultsCount !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
          <button
            onClick={handleClear}
            className="text-bokeo-teal-600 hover:text-bokeo-teal-700 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
