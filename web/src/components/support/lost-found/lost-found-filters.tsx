"use client";

import {
  Smartphone,
  Briefcase,
  Shirt,
  FileText,
  Gem,
  KeyRound,
  Banknote,
  Puzzle,
  Package,
  LayoutGrid,
  Search,
  X,
} from "lucide-react";
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
    { id: "all", label: t.tabAll, activeBg: "bg-gray-800" },
    { id: "LOST", label: t.tabLost, activeBg: "bg-red-600" },
    { id: "FOUND", label: t.tabFound, activeBg: "bg-emerald-600" },
  ];

  const categories = [
    { id: "all", label: t.categoryAll, icon: LayoutGrid },
    { id: LostFoundCategory.ELECTRONICS, label: t.categoryElectronics, icon: Smartphone },
    { id: LostFoundCategory.BAGGAGE, label: t.categoryBaggage, icon: Briefcase },
    { id: LostFoundCategory.DOCUMENTS, label: t.categoryDocuments, icon: FileText },
    { id: LostFoundCategory.CLOTHING, label: t.categoryClothing, icon: Shirt },
    { id: LostFoundCategory.JEWELRY, label: t.categoryJewelry, icon: Gem },
    { id: LostFoundCategory.KEYS, label: t.categoryKeys, icon: KeyRound },
    { id: LostFoundCategory.CASH, label: t.categoryCash, icon: Banknote },
    { id: LostFoundCategory.TOYS, label: t.categoryToys, icon: Puzzle },
    { id: LostFoundCategory.OTHER, label: t.categoryOther, icon: Package },
  ];

  const activeType = selectedType || "all";
  const activeCategory = selectedCategory || "all";

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full rounded-full border border-gray-200 bg-gray-50 py-3 pr-10 pl-11 text-sm transition-all focus:ring-4 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Type pills */}
      <div className="flex flex-wrap gap-2">
        {types.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleType(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? `${tab.activeBg} text-white`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category chips */}
      <div className="horizontal-scroll flex flex-wrap gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[#00AAAC] text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 hover:text-gray-800",
              )}
            >
              <Icon className="h-3 w-3" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
