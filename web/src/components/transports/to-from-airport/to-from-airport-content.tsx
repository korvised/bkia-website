"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context";
import { cn } from "@/lib";
import { OverviewTab, TaxiTab, VanTab } from "@/components/transports";

// Tab configuration
const tabs = [
  { id: "overview", label: { en: "Overview", lo: "ພາບລວມ", zh: "概览" } },
  { id: "taxi", label: { en: "Taxis", lo: "ແທັກຊີ", zh: "出租车" } },
  {
    id: "van",
    label: { en: "Van Service", lo: "ບໍລິການລົດຕູ້", zh: "面包车服务" },
  },
];

export function ToFromAirportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, t } = useApp();

  // Get active tab from URL, default to 'overview'
  const activeTab = searchParams.get("t") || "overview";

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("t", tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "taxi":
        return <TaxiTab lang={lang} />;
      case "van":
        return <VanTab lang={lang} />;
      case "overview":
      default:
        return <OverviewTab lang={lang} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <nav
        className="horizontal-scroll bg-primary-50/30 flex items-center gap-x-0.5 overflow-x-auto"
        aria-label="Transport options"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "group relative flex-shrink-0 cursor-pointer px-8 py-4 text-sm font-medium transition-colors duration-200 md:text-base",
                "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-primary text-gray-700 hover:text-white",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative z-10">{t(tab.label)}</span>
            </button>
          );
        })}
      </nav>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {renderTabContent()}
      </div>
    </div>
  );
}
