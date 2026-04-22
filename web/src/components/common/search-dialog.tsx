"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bell,
  Building2,
  Car,
  ChevronRight,
  Clock,
  Luggage,
  Plane,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@/lib";
import { useSearchDialog } from "@/hooks/use-serach-dialog";

// ── Quick-access tiles (shown when input is empty) ────────────────────────────

const QUICK_LINKS = [
  {
    id: "flights",
    icon: Plane,
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    url: "/flights/departures",
    tile: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
  },
  {
    id: "guides",
    icon: Luggage,
    label: { en: "Guide", lo: "ຄູ່ມືໂດຍສານ", zh: "乘客指南" },
    url: "/guides/departures",
    tile: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  },
  {
    id: "services",
    icon: Car,
    label: { en: "Services", lo: "ການບໍລິການ", zh: "服务" },
    url: "/services/taxi",
    tile: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
  },
  {
    id: "notices",
    icon: Bell,
    label: { en: "Announcements", lo: "ແຈ້ງການ", zh: "公告" },
    url: "/notices/airport",
    tile: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  },
  {
    id: "about",
    icon: Building2,
    label: { en: "About", lo: "ກ່ຽວກັບ", zh: "关于我们" },
    url: "/about/profile",
    tile: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  },
] as const;

// ── Per-category accent colors for result groups ──────────────────────────────

const CATEGORY_HEADER: Record<string, string> = {
  flights: "text-sky-600",
  guides: "text-amber-600",
  transports: "text-violet-600",
  support: "text-rose-600",
  about: "text-emerald-600",
};

const CATEGORY_ICON: Record<string, string> = {
  flights: "bg-sky-50 text-sky-600",
  guides: "bg-amber-50 text-amber-600",
  transports: "bg-violet-50 text-violet-600",
  support: "bg-rose-50 text-rose-600",
  about: "bg-emerald-50 text-emerald-600",
};

const CATEGORY_ORDER = ["flights", "guides", "transports", "support", "about"];

function getCategoryKey(id: string) {
  return id.split("-")[0];
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SearchDialog() {
  const {
    lang,
    isSearchOpen,
    searchQuery,
    searchResults,
    recentSearches,
    selectedIndex,
    handleSearch,
    saveToRecentSearches,
    clearRecentSearches,
    handleClose,
    currentPopularSearches,
    t,
  } = useSearchDialog();

  const hasQuery = searchQuery.trim().length > 0;

  // Group results by category for display
  const groupedResults = useMemo(() => {
    const map = new Map<string, typeof searchResults>();
    searchResults.forEach((r) => {
      const key = getCategoryKey(r.id);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });
    return CATEGORY_ORDER.filter((k) => map.has(k)).map((k) => ({
      key: k,
      items: map.get(k)!,
    }));
  }, [searchResults]);

  const noResultsSuggestions = currentPopularSearches.slice(0, 4);

  return (
    <Dialog open={isSearchOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#0d1b3e]/65 backdrop-blur-md transition duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 pt-[10vh]">
          <DialogPanel
            transition
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/8 transition duration-200 ease-out data-[closed]:scale-[0.98] data-[closed]:opacity-0"
          >
            {/* ── Input row ── */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-[#00AAAC]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[15px] text-[#0d1b3e] outline-none placeholder:text-gray-400"
                autoFocus
              />
              {hasQuery ? (
                <button
                  onClick={() => handleSearch("")}
                  aria-label="Clear"
                  className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="hidden shrink-0 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[11px] text-gray-400 sm:inline">
                  ESC
                </kbd>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* ── Body ── */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!hasQuery ? (
                /* ── Empty state: tiles + recent + popular ── */
                <div className="space-y-5 p-4">
                  {/* Quick-access category tiles */}
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      {lang === "lo"
                        ? "ໝວດໝູ່"
                        : lang === "zh"
                          ? "浏览分类"
                          : "Browse"}
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={`/${lang}${link.url}`}
                          onClick={handleClose}
                          className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-gray-50"
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                              link.tile,
                            )}
                          >
                            <link.icon className="h-5 w-5" />
                          </div>
                          <span className="text-center text-[11px] font-medium leading-tight text-gray-600 group-hover:text-gray-800">
                            {link.label[lang]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          {t.recentSearches}
                        </p>
                        <button
                          onClick={clearRecentSearches}
                          className="text-[11px] text-gray-400 transition-colors hover:text-gray-600"
                        >
                          {t.clear}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((query, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearch(query)}
                            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
                          >
                            <Clock className="h-3 w-3 text-gray-400" />
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular searches */}
                  <div>
                    <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {t.popularSearches}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentPopularSearches.map((query, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            handleSearch(query);
                            saveToRecentSearches(query);
                          }}
                          className="rounded-full bg-[#00AAAC]/8 px-3 py-1.5 text-xs font-medium text-[#00AAAC] transition-colors hover:bg-[#00AAAC]/15"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                /* ── Results grouped by category ── */
                <div className="py-2">
                  {groupedResults.map(({ key, items }) => (
                    <div key={key} className="mb-1 last:mb-0">
                      {/* Category header */}
                      <p
                        className={cn(
                          "px-4 pb-1.5 pt-3 text-[10px] font-bold uppercase tracking-widest",
                          CATEGORY_HEADER[key] ?? "text-gray-400",
                        )}
                      >
                        {items[0].category[lang]}
                      </p>

                      {/* Items */}
                      {items.map((result) => {
                        const Icon = result.icon;
                        const flatIndex = searchResults.indexOf(result);
                        const isSelected = flatIndex === selectedIndex;
                        return (
                          <Link
                            key={result.id}
                            id={`search-result-${flatIndex}`}
                            href={`/${lang}${result.url}`}
                            onClick={() => {
                              saveToRecentSearches(searchQuery);
                              handleClose();
                            }}
                            className={cn(
                              "group flex items-center gap-3 px-4 py-2.5 transition-colors",
                              isSelected
                                ? "bg-[#0d1b3e]"
                                : "hover:bg-gray-50",
                            )}
                          >
                            {/* Icon */}
                            <div
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                                isSelected
                                  ? "bg-white/15 text-white"
                                  : (CATEGORY_ICON[key] ?? "bg-gray-100 text-gray-500"),
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "truncate text-sm font-medium",
                                  isSelected ? "text-white" : "text-[#0d1b3e]",
                                )}
                              >
                                {result.title[lang]}
                              </p>
                              <p
                                className={cn(
                                  "truncate text-xs",
                                  isSelected ? "text-white/55" : "text-gray-500",
                                )}
                              >
                                {result.description[lang]}
                              </p>
                            </div>

                            {/* Chevron */}
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                                isSelected ? "text-white/40" : "text-gray-300",
                              )}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                /* ── No results ── */
                <div className="flex flex-col items-center px-6 py-14 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                    <Search className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {t.noResults}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {lang === "lo"
                      ? "ລອງໃຊ້ຄຳຄົ້ນຫາອື່ນ"
                      : lang === "zh"
                        ? "请尝试其他关键词"
                        : "Try a different search term"}
                  </p>
                  {/* Suggest popular */}
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {noResultsSuggestions.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearch(query)}
                        className="rounded-full bg-[#00AAAC]/8 px-3 py-1.5 text-xs font-medium text-[#00AAAC] transition-colors hover:bg-[#00AAAC]/15"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="hidden border-t border-gray-100 bg-gray-50/80 px-4 py-2.5 sm:block">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] text-gray-400">
                  {hasQuery && searchResults.length > 0 && (
                    <span className="font-semibold text-[#00AAAC]">
                      {searchResults.length}&nbsp;
                      {lang === "lo"
                        ? "ຜົນ"
                        : lang === "zh"
                          ? "条结果"
                          : "results"}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm">
                      ↑
                    </kbd>
                    <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm">
                      ↓
                    </kbd>
                    {t.toNavigate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm">
                      ↵
                    </kbd>
                    {t.toSelect}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm">
                    ESC
                  </kbd>
                  {t.closeHint}
                </span>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
