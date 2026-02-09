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
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-9 text-sm focus:border-[#5CBEC6] focus:ring-1 focus:ring-[#5CBEC6] focus:outline-none"
          />
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && resultsCount !== undefined && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{resultsCount}</span> result
            {resultsCount !== 1 ? "s" : ""} for &#34;{searchQuery}&#34;
          </p>
          <button
            onClick={handleClear}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
