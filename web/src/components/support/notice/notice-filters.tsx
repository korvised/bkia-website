"use client";

import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Info,
  Search,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { ImportantPriority } from "@/types/enum";
import { createSupportI18n } from "@/data/i18n/support";

interface NoticeFiltersProps {
  lang: Lang;
  query?: string;
  selectedPriority?: ImportantPriority | "all";
}

export function NoticeFilters({
  lang,
  query = "",
  selectedPriority,
}: NoticeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = createSupportI18n(lang).notices;

  const [searchQuery, setSearchQuery] = useState(query);

  const categories = [
    { id: "all", label: t.categoryAll, icon: Bell },
    {
      id: ImportantPriority.URGENT,
      label: t.categoryUrgent,
      icon: AlertCircle,
    },
    {
      id: ImportantPriority.HIGH,
      label: t.categoryHigh,
      icon: AlertTriangle,
    },
    {
      id: ImportantPriority.NORMAL,
      label: t.categoryNormal,
      icon: Info,
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
      router.push(`/${lang}/support/notices?${params.toString()}`, {
        scroll: false,
      });
    },
    [lang, router, searchParams],
  );

  const handlePriorityChange = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === "all") {
        params.delete("priority");
      } else {
        params.set("priority", id);
      }
      router.push(`/${lang}/support/notices?${params.toString()}`, {
        scroll: false,
      });
    },
    [lang, router, searchParams],
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/${lang}/support/notices?${params.toString()}`, {
      scroll: false,
    });
  }, [lang, router, searchParams]);

  const active = selectedPriority || "all";

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

      {/* Priority Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="horizontal-scroll -mb-px flex gap-1 overflow-x-auto">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handlePriorityChange(c.id)}
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
