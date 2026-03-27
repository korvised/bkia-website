"use client";

import Link from "next/link";
import {
  PlaneLanding,
  Package,
  UserCheck,
  Luggage,
  DoorOpen,
} from "lucide-react";
import { Lang } from "@/types/language";
import { ArrivalTab } from "@/types/guide";
import { ArrivalNavKey, createArrivalGuideI18n } from "@/data/i18n/guide";
import { cn } from "@/lib";

interface Tab {
  id: ArrivalTab;
  labelKey: ArrivalNavKey;
  icon: React.ElementType;
}

const TABS: readonly Tab[] = [
  { id: "airport", labelKey: "airport", icon: PlaneLanding },
  { id: "border-inspection", labelKey: "borderInspection", icon: UserCheck },
  { id: "baggage-claim", labelKey: "baggageClaim", icon: Luggage },
  { id: "customs-inspection", labelKey: "customsInspection", icon: Package },
  { id: "leaving", labelKey: "leaving", icon: DoorOpen },
] as const;

interface ArrivalTabNavigationProps {
  lang: Lang;
  activeTab: ArrivalTab;
}

export function ArrivalTabNavigation({
  lang,
  activeTab,
}: ArrivalTabNavigationProps) {
  const { arrivalNav: t } = createArrivalGuideI18n(lang);

  return (
    <div className="sticky top-0 z-20 bg-white">
      <div className="container">
        <nav
          aria-label="Arrival guide sections"
          className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab, i) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={`/${lang}/guides/arrivals?tab=${tab.id}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-2.5 text-sm transition-colors md:px-5",
                  isActive
                    ? "bg-[#00AAAC] font-semibold text-white"
                    : "bg-gray-100 font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-white text-gray-500",
                  )}
                >
                  {i + 1}
                </span>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden whitespace-nowrap md:inline">
                  {t[tab.labelKey]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
