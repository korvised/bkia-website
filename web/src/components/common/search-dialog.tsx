"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";
import {
  allSearchItems,
  popularSearches,
  SearchableItem,
} from "@/data/search-data";
import { Lang } from "@/types/language";

const translations = {
  searchPlaceholder: {
    en: "Search for flights, services, information...",
    lo: "ຄົ້ນຫາຖ້ຽວບິນ, ບໍລິການ, ຂໍ້ມູນ...",
    zh: "搜索航班、服务、信息...",
  },
  recentSearches: {
    en: "Recent Searches",
    lo: "ການຄົ້ນຫາລ່າສຸດ",
    zh: "最近搜索",
  },
  popularSearches: {
    en: "Popular Searches",
    lo: "ການຄົ້ນຫາຍອດນິຍົມ",
    zh: "热门搜索",
  },
  noResults: {
    en: "No results found",
    lo: "ບໍ່ພົບຜົນການຄົ້ນຫາ",
    zh: "未找到结果",
  },
  searchResults: {
    en: "Search Results",
    lo: "ຜົນການຄົ້ນຫາ",
    zh: "搜索结果",
  },
  clear: {
    en: "Clear",
    lo: "ລຶບ",
    zh: "清除",
  },
  toNavigate: {
    en: "to navigate",
    lo: "ເພື່ອເລື່ອນ",
    zh: "导航",
  },
  toSelect: {
    en: "to select",
    lo: "ເພື່ອເລືອກ",
    zh: "选择",
  },
  closeHint: {
    en: "to close",
    lo: "ປິດ",
    zh: "关闭",
  },
} as const;

export default function SearchDialog() {
  const { isSearchOpen, closeSearch, lang, t } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Enhanced search functionality - search across ALL languages
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      const results = allSearchItems.filter((item) => {
        // Search in all language fields for title
        const titleMatchEn = item.title.en.toLowerCase().includes(query);
        const titleMatchLo = item.title.lo.toLowerCase().includes(query);
        const titleMatchZh = item.title.zh.toLowerCase().includes(query);

        // Search in all language fields for description
        const descMatchEn = item.description.en.toLowerCase().includes(query);
        const descMatchLo = item.description.lo.toLowerCase().includes(query);
        const descMatchZh = item.description.zh.toLowerCase().includes(query);

        // Search in all language fields for category
        const catMatchEn = item.category.en.toLowerCase().includes(query);
        const catMatchLo = item.category.lo.toLowerCase().includes(query);
        const catMatchZh = item.category.zh.toLowerCase().includes(query);

        // Search in all language keywords
        const keywordMatchEn = item.keywords.en.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );
        const keywordMatchLo = item.keywords.lo.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );
        const keywordMatchZh = item.keywords.zh.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );

        return (
          titleMatchEn ||
          titleMatchLo ||
          titleMatchZh ||
          descMatchEn ||
          descMatchLo ||
          descMatchZh ||
          catMatchEn ||
          catMatchLo ||
          catMatchZh ||
          keywordMatchEn ||
          keywordMatchLo ||
          keywordMatchZh
        );
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]); // Removed lang dependency to search all languages

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            const selectedItem = searchResults[selectedIndex];
            // Save to recent searches when user selects with Enter
            saveToRecentSearches(searchQuery);
            window.location.href = `/${lang}${selectedItem.url}`;
            handleClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex, lang, searchQuery]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const element = document.getElementById(`search-result-${selectedIndex}`);
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const saveToRecentSearches = (query: string) => {
    if (query.trim()) {
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedIndex(-1);
    closeSearch();
  };

  // Get popular searches for current language
  const currentPopularSearches =
    popularSearches[lang as Lang] || popularSearches.en;

  return (
    <Dialog open={isSearchOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 pt-20">
          <DialogPanel
            transition
            className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* Search Input */}
            <div className="flex items-center gap-x-4 border-b border-gray-200 px-6 py-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t(translations.searchPlaceholder)}
                className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {searchQuery.trim() ? (
                // Search Results
                <div>
                  {searchResults.length > 0 ? (
                    <>
                      <h3 className="mb-4 text-sm font-semibold text-gray-500">
                        {t(translations.searchResults)}
                      </h3>
                      <div className="space-y-2">
                        {searchResults.map((result, index) => {
                          const Icon = result.icon;
                          const isSelected = index === selectedIndex;
                          return (
                            <Link
                              key={result.id}
                              id={`search-result-${index}`}
                              href={`/${lang}${result.url}`}
                              onClick={() => {
                                // Save to recent searches when user clicks a result
                                saveToRecentSearches(searchQuery);
                                handleClose();
                              }}
                              className={cn(
                                "group flex items-center justify-between rounded-lg p-4 transition-colors",
                                isSelected
                                  ? "bg-primary-50 ring-primary-500 ring-2"
                                  : "hover:bg-gray-50",
                              )}
                            >
                              <div className="flex flex-1 items-start gap-x-3">
                                <div
                                  className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                                    isSelected
                                      ? "bg-primary-500 text-white"
                                      : "bg-primary-50 text-primary-600",
                                  )}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-x-2">
                                    <h4
                                      className={cn(
                                        "truncate font-medium",
                                        isSelected
                                          ? "text-primary-900"
                                          : "text-gray-900",
                                      )}
                                    >
                                      {result.title[lang]}
                                    </h4>
                                    <span
                                      className={cn(
                                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                                        isSelected
                                          ? "bg-primary-600 text-white"
                                          : "bg-primary-100 text-primary-700",
                                      )}
                                    >
                                      {result.category[lang]}
                                    </span>
                                  </div>
                                  <p
                                    className={cn(
                                      "mt-1 line-clamp-1 text-sm",
                                      isSelected
                                        ? "text-primary-700"
                                        : "text-gray-600",
                                    )}
                                  >
                                    {result.description[lang]}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight
                                className={cn(
                                  "ml-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1",
                                  isSelected
                                    ? "text-primary-600"
                                    : "text-gray-400",
                                )}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <Search className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-gray-600">
                        {t(translations.noResults)}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Recent and Popular Searches
                <div className="space-y-8">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="flex items-center gap-x-2 text-sm font-semibold text-gray-500">
                          <Clock className="h-4 w-4" />
                          {t(translations.recentSearches)}
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          {t(translations.clear)}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((query, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(query);
                            }}
                            className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-x-2 text-sm font-semibold text-gray-500">
                      <TrendingUp className="h-4 w-4" />
                      {t(translations.popularSearches)}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPopularSearches.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(query);
                            saveToRecentSearches(query);
                          }}
                          className="bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-full px-4 py-2 text-sm transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ↑
                    </kbd>
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ↓
                    </kbd>
                    <span>{t(translations.toNavigate)}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ENTER
                    </kbd>
                    <span>{t(translations.toSelect)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                    ESC
                  </kbd>
                  <span>{t(translations.closeHint)}</span>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
