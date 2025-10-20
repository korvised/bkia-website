"use client";

import { FlightTab } from "@/types/flight";
import { useLanguage } from "@/context";
import { flightTranslations } from "@/data/translations/flights";

interface FlightTabsProps {
  activeTab: FlightTab;
  onTabChange: (tab: FlightTab) => void;
}

export function FlightTabs({ activeTab, onTabChange }: FlightTabsProps) {
  const { t } = useLanguage();

  const tabs: { key: FlightTab; label: string }[] = [
    { key: "departures", label: t(flightTranslations.tabs.departures) },
    { key: "arrivals", label: t(flightTranslations.tabs.arrivals) },
    { key: "schedule", label: t(flightTranslations.tabs.schedule) },
    { key: "airlines", label: t(flightTranslations.tabs.airlines) },
  ];

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
