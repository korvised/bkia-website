"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ArrowRight, Clock, Search, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { useSearchDialog } from "@/hooks/use-serach-dialog";

export function SearchDialog() {
  const {
    lang,
    isSearchOpen,
    searchQuery,
    searchResults,
    recentSearches,
    selectedIndex,
    setSearchQuery,
    handleSearch,
    saveToRecentSearches,
    clearRecentSearches,
    handleClose,
    currentPopularSearches,
    t,
  } = useSearchDialog();

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
                placeholder={t.searchPlaceholder}
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
                        {t.searchResults}
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
                      <p className="mt-4 text-gray-600">{t.noResults}</p>
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
                          {t.recentSearches}
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          {t.clear}
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
                      {t.popularSearches}
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
            <div className="hidden border-t border-gray-200 bg-gray-50 px-6 py-3 sm:block">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ↑
                    </kbd>
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ↓
                    </kbd>
                    <span>{t.toNavigate}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                      ENTER
                    </kbd>
                    <span>{t.toSelect}</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <kbd className="rounded bg-white px-2 py-1 font-mono shadow-sm">
                    ESC
                  </kbd>
                  <span>{t.closeHint}</span>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
