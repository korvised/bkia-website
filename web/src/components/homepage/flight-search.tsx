"use client";

import { useState } from "react";
import { Search, Plane, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "departure" | "arrival";

export default function FlightSearch() {
  const [activeTab, setActiveTab] = useState<TabType>("departure");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter flight number or destination");
      return;
    }

    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const searchParams = new URLSearchParams({
        q: query,
        type: activeTab
      });
      window.location.href = `/flights/search?${searchParams.toString()}`;
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed, please try again");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      {/* Full width with minimal background - let image show through */}
      <div className="bg-gradient-to-r from-black/50 to-black/40 backdrop-blur-sm px-6 py-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white">
              <Plane className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-bold">Flight Search</h2>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Real-time Updates</span>
            </div>
          </div>

          {/* Tabs and Search Form - Single Row with glass background */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-4">

              {/* Tab Buttons - Inline */}
              <div className="flex rounded-lg overflow-hidden bg-black/30 border border-white/20">
                <button
                  onClick={() => setActiveTab("departure")}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 transition-all text-sm font-medium",
                    activeTab === "departure"
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <PlaneTakeoff className="w-4 h-4" />
                  <span>Departures</span>
                </button>
                <button
                  onClick={() => setActiveTab("arrival")}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 transition-all text-sm font-medium",
                    activeTab === "arrival"
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <PlaneLanding className="w-4 h-4" />
                  <span>Arrivals</span>
                </button>
              </div>

              {/* Search Input - Expanded */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Flight number or destination..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className={cn(
                    "w-full px-4 py-2 pr-12 rounded-lg transition-all duration-300",
                    "bg-white/20 backdrop-blur-sm border border-white/30",
                    "text-white placeholder-white/70",
                    "focus:bg-white/30 focus:border-white/50 focus:outline-none"
                  )}
                  disabled={isSearching}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              </div>

              {/* Search Button - Compact */}
              <button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                className={cn(
                  "bg-primary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  "hover:bg-primary/90",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  "flex items-center space-x-2",
                  isSearching && "animate-pulse"
                )}
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search Flights</span>
                  </>
                )}
              </button>
            </div>

            {/* Info Text - Compact */}
            <div className="mt-3 text-center text-xs text-white/80">
              Real-time flight information • Click search to view all schedules
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
