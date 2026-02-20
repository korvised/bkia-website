"use client";

import { Search, X, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { LostFoundCategory } from "@/types/enum";

interface LostFoundFiltersProps {
  lang: Lang;
  query?: string;
  selectedType?: string;
  selectedCategory?: string;
}

export function LostFoundFilters({
  lang,
  query = "",
  selectedType,
  selectedCategory,
}: LostFoundFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = createSupportI18n(lang).lostFound;
  const [searchQuery, setSearchQuery] = useState(query);

  const push = useCallback(
    (params: URLSearchParams) => {
      router.push(`/${lang}/support/lost-found?${params.toString()}`, {
        scroll: false,
      });
    },
    [lang, router],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      const params = new URLSearchParams(searchParams.toString());
      value.trim() ? params.set("q", value) : params.delete("q");
      params.delete("page");
      push(params);
    },
    [searchParams, push],
  );

  const handleType = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      type === "all" ? params.delete("type") : params.set("type", type);
      params.delete("page");
      push(params);
    },
    [searchParams, push],
  );

  const handleCategory = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      category === "all"
        ? params.delete("category")
        : params.set("category", category);
      params.delete("page");
      push(params);
    },
    [searchParams, push],
  );

  const types = [
    { id: "all", label: t.tabAll },
    { id: "LOST", label: t.tabLost },
    { id: "FOUND", label: t.tabFound },
  ];

  const categories = [
    { id: "all", label: t.categoryAll },
    { id: LostFoundCategory.ELECTRONICS, label: t.categoryElectronics },
    { id: LostFoundCategory.BAGGAGE, label: t.categoryBaggage },
    { id: LostFoundCategory.DOCUMENTS, label: t.categoryDocuments },
    { id: LostFoundCategory.CLOTHING, label: t.categoryClothing },
    { id: LostFoundCategory.JEWELRY, label: t.categoryJewelry },
    { id: LostFoundCategory.KEYS, label: t.categoryKeys },
    { id: LostFoundCategory.CASH, label: t.categoryCash },
    { id: LostFoundCategory.TOYS, label: t.categoryToys },
    { id: LostFoundCategory.OTHER, label: t.categoryOther },
  ];

  const activeType = selectedType || "all";
  const activeCategory = selectedCategory || "all";

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-xl border border-gray-300 py-3 pr-12 pl-12 text-sm shadow-sm transition-all focus:ring-4 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Type tabs */}
      <div className="border-b border-gray-200">
        <nav className="horizontal-scroll -mb-px flex gap-1 overflow-x-auto">
          {types.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleType(tab.id)}
              className={cn(
                "border-b-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all",
                activeType === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Category chips */}
      <div className="horizontal-scroll flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-all",
              activeCategory === cat.id
                ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
            )}
          >
            <Package className="h-3.5 w-3.5" />
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
