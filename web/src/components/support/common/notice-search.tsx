"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";

interface NoticeSearchProps {
  lang: Lang;
  query?: string;
  resultsCount?: number;
}

export function NoticeSearch({ lang, query, resultsCount }: NoticeSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = createSupportI18n(lang).notices;

  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete("q");
    } else {
      params.set("q", value);
    }
    router.push(`/${lang}/support/notices?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleClear = () => {
    handleSearch("");
  };

  return (
    <div className="space-y-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-9 text-sm focus:border-[#5CBEC6] focus:ring-1 focus:ring-[#5CBEC6] focus:outline-none"
          />
        </div>
      </div>

      {searchQuery && resultsCount !== undefined && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">
            {t.searchResultsFound}
            <span className="font-semibold">{resultsCount}</span>{" "}
            {resultsCount !== 1 ? t.searchResultsPlural : t.searchResults}
            {t.searchResultsFor} &#34;{searchQuery}&#34;
          </p>
          <button
            onClick={handleClear}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            {t.clearSearch}
          </button>
        </div>
      )}
    </div>
  );
}
