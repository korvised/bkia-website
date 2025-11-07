"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building,
  HandHeart,
  Heart,
  LucideIcon,
  PlaneIcon,
  PlaneLanding,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/context";
import { guideTranslations } from "@/data/translations/guide";

export type GuideTab =
  | "departure"
  | "arrival"
  | "transfer"
  | "services"
  | "cares"
  | "hotel";

export function GuideTabs() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  const tabs: { id: GuideTab; label: string; icon: LucideIcon }[] = [
    {
      id: "departure",
      label: t(guideTranslations.tabs.departure),
      icon: PlaneIcon,
    },
    {
      id: "arrival",
      label: t(guideTranslations.tabs.arrival),
      icon: PlaneLanding,
    },
    {
      id: "transfer",
      label: t(guideTranslations.tabs.transfer),
      icon: RefreshCcw,
    },
    {
      id: "services",
      label: t(guideTranslations.tabs.airportFacilities),
      icon: HandHeart,
    },
    {
      id: "cares",
      label: t(guideTranslations.tabs.specialServices),
      icon: Heart,
    },
    {
      id: "hotel",
      label: t(guideTranslations.tabs.hotelServices),
      icon: Building,
    },
  ];

  const getIsActive = (tabId: string) => {
    return pathname.includes(`/guides/${tabId}`);
  };

  return (
    <div className="mb-4 border-b border-gray-200 sm:mb-6">
      <nav
        className="horizontal-scroll -mb-px flex gap-4 overflow-x-auto sm:gap-6 md:gap-8"
        aria-label="Guide tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getIsActive(tab.id);

          return (
            <Link
              key={tab.id}
              href={`/${lang}/guides/${tab.id}`}
              className={cn(
                "flex shrink-0 items-center gap-1.5 border-b-2 px-1 py-3 text-xs font-medium transition-colors sm:gap-2 sm:py-4 sm:text-sm",
                isActive
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
