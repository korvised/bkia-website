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
    {
      id: "all",
      label: t.categoryAll,
      icon: Bell,
      activeBg: "bg-gray-800",
    },
    {
      id: ImportantPriority.URGENT,
      label: t.categoryUrgent,
      icon: AlertCircle,
      activeBg: "bg-red-600",
    },
    {
      id: ImportantPriority.HIGH,
      label: t.categoryHigh,
      icon: AlertTriangle,
      activeBg: "bg-orange-500",
    },
    {
      id: ImportantPriority.NORMAL,
      label: t.categoryNormal,
      icon: Info,
      activeBg: "bg-[#00AAAC]",
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
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Priority pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handlePriorityChange(c.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? `${c.activeBg} text-white`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
