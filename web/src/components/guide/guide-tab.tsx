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
import { cn } from "@/lib";
import { useLanguage } from "@/context/language-context";
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
    return pathname.includes(`/guide/${tabId}`);
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav
        className="horizontal-scroll flex space-x-8 overflow-x-auto"
        aria-label="Guide tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getIsActive(tab.id);

          return (
            <Link
              key={tab.id}
              href={`/${lang}/guide/${tab.id}`}
              className={cn(
                "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-bokeo-teal-600 text-bokeo-teal-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
