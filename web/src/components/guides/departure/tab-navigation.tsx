import Link from "next/link";
import {
  MdOutlineAirplaneTicket,
  MdOutlineFlightTakeoff,
  MdOutlineLuggage,
  MdOutlineSecurity,
} from "react-icons/md";
import { FaPassport } from "react-icons/fa";
import { Lang } from "@/types/language";
import { DepartureTab } from "@/types/guide";
import { createDepartureGuideI18n, DepartureNavKey } from "@/data/i18n/guide";
import { cn } from "@/lib";

interface Tab {
  id: DepartureTab;
  labelKey: DepartureNavKey;
  icon: React.ElementType;
}

const TABS: readonly Tab[] = [
  { id: "checkin", labelKey: "checkin", icon: MdOutlineAirplaneTicket },
  { id: "baggage", labelKey: "baggage", icon: MdOutlineLuggage },
  { id: "security", labelKey: "security", icon: MdOutlineSecurity },
  { id: "immigration", labelKey: "immigration", icon: FaPassport },
  { id: "boarding", labelKey: "boarding", icon: MdOutlineFlightTakeoff },
] as const;

interface DepartureTabNavigationProps {
  lang: Lang;
  activeTab: DepartureTab;
}

export function DepartureTabNavigation({
  lang,
  activeTab,
}: DepartureTabNavigationProps) {
  const { departureNav: t } = createDepartureGuideI18n(lang);

  return (
    <div className="sticky top-0 z-20 bg-white">
      <div className="container">
        <nav
          aria-label="Departure guide sections"
          className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab, i) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={`/${lang}/guides/departures?tab=${tab.id}`}
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
