"use client";

import { useState } from "react";
import { Search, Plane, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { cn } from "@/lib";
import { useLanguage } from "@/context";
import { translations } from "@/data/translations/flight-search";

type TabType = "departure" | "arrival";

export default function FlightSearch() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("departure");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert(t(translations.input.emptyQuery));
      return;
    }

    setIsSearching(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const searchParams = new URLSearchParams({
        q: query,
        type: activeTab,
      });
      window.location.href = `/flights/search?${searchParams.toString()}`;
    } catch (error) {
      console.error("Search failed:", error);
      alert(t(translations.messages.failed));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="absolute right-0 bottom-0 left-0 z-20">
      <div className="bg-gradient-to-r from-black/50 to-black/40 px-6 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center text-white">
              <Plane className="mr-2 h-5 w-5" />
              <h2 className="text-lg font-bold">
                {t(translations.header.title)}
              </h2>
            </div>
            <div className="flex items-center text-white/90">
              <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <span className="text-sm">{t(translations.header.realtime)}</span>
            </div>
          </div>

          {/* Tabs & Search */}
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Tabs */}
              <div className="flex overflow-hidden rounded-lg border border-white/20 bg-black/30">
                <button
                  onClick={() => setActiveTab("departure")}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all",
                    activeTab === "departure"
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10",
                  )}
                >
                  <PlaneTakeoff className="h-4 w-4" />
                  <span>{t(translations.tabs.departures)}</span>
                </button>
                <button
                  onClick={() => setActiveTab("arrival")}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all",
                    activeTab === "arrival"
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10",
                  )}
                >
                  <PlaneLanding className="h-4 w-4" />
                  <span>{t(translations.tabs.arrivals)}</span>
                </button>
              </div>

              {/* Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={t(translations.input.placeholder)}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className={cn(
                    "w-full rounded-lg px-4 py-2 pr-12 transition-all duration-300",
                    "border border-white/30 bg-white/20 backdrop-blur-sm",
                    "text-white placeholder-white/70",
                    "focus:border-white/50 focus:bg-white/30 focus:outline-none",
                  )}
                  disabled={isSearching}
                />
                <Search className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 transform text-white/60" />
              </div>

              {/* Button */}
              <button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                className={cn(
                  "bg-primary rounded-lg px-6 py-2 font-medium whitespace-nowrap text-white transition-all duration-300",
                  "hover:bg-primary/90",
                  "disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50",
                  "flex items-center space-x-2",
                  isSearching && "animate-pulse",
                )}
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>{t(translations.button.searching)}</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>{t(translations.button.search)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Info */}
            <div className="mt-3 text-center text-xs text-white/80">
              {t(translations.messages.info)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
