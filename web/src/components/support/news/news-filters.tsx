"use client";

import {
  Search,
  Megaphone,
  Plane,
  Calendar,
  Bell,
  Leaf,
  Cpu,
  Users,
  Newspaper,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { NewsCategory } from "@/types/news";
import { createNewsI18n } from "@/data/i18n/support";

interface NewsFiltersProps {
  lang: Lang;
  query?: string;
  selectedCategory?: NewsCategory | "all";
}

export function NewsFilters({
  lang,
  query = "",
  selectedCategory,
}: NewsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = createNewsI18n(lang).news;

  const [searchQuery, setSearchQuery] = useState(query);

  const categories = [
    { id: "all", label: t.categoryAll, icon: Newspaper },
    {
      id: NewsCategory.AIRPORT_UPDATE,
      label: t.categoryAirportUpdate,
      icon: Megaphone,
    },
    {
      id: NewsCategory.FLIGHT_SERVICE,
      label: t.categoryFlightService,
      icon: Plane,
    },
    { id: NewsCategory.EVENT, label: t.categoryEvent, icon: Calendar },
    {
      id: NewsCategory.ANNOUNCEMENT,
      label: t.categoryAnnouncement,
      icon: Bell,
    },
    {
      id: NewsCategory.SUSTAINABILITY,
      label: t.categorySustainability,
      icon: Leaf,
    },
    {
      id: NewsCategory.TECHNOLOGY,
      label: t.categoryTechnology,
      icon: Cpu,
    },
    {
      id: NewsCategory.COMMUNITY,
      label: t.categoryCommunity,
      icon: Users,
    },
  ];

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === "") {
        params.delete("page");
        params.delete("q");
      } else {
        params.set("page", "1");
        params.set("q", value);
      }
      router.push(`/${lang}/support/news?${params.toString()}`, {
        scroll: false,
      });
    },
    [lang, router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === "all") {
        params.set("page", "1");
        params.delete("category");
      } else {
        params.set("page", "1");
        params.set("category", id);
      }
      router.push(`/${lang}/support/news?${params.toString()}`, {
        scroll: false,
      });
    },
    [lang, router, searchParams],
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/${lang}/support/news?${params.toString()}`, {
      scroll: false,
    });
  }, [lang, router, searchParams]);

  const active = selectedCategory || "all";

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-2xl">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-xl border border-gray-300 py-3.5 pr-12 pl-12 text-sm shadow-sm transition-all focus:ring-4 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="horizontal-scroll -mb-px flex gap-1 overflow-x-auto">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all",
                  isActive
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                )}
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
