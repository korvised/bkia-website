import Link from "next/link";
import {
  Clock,
  LucideIcon,
  Package,
  ShieldCheck,
  TicketCheck,
  UserCheck,
} from "lucide-react";
import { Lang } from "@/types/language";
import { DepartureTab } from "@/types/guide";

type T = (k: keyof (typeof dict)["en"]["tabs"]) => string;

const dict = {
  en: {
    tabs: {
      checkin: "Check-in",
      security: "Security Check",
      customs: "Customs Inspection",
      border: "Border Inspection",
      boarding: "Boarding",
    },
  },
  lo: {
    tabs: {
      checkin: "ແຈ້ງປີ້",
      security: "ກວດຄວາມປອດໄພ",
      customs: "ກວດສັນພາສີ",
      border: "ກວດຄົນເຂົ້າອອກ",
      boarding: "ເຂົ້າເຮືອບິນ",
    },
  },
  zh: {
    tabs: {
      checkin: "办理登机",
      security: "安检",
      customs: "海关检查",
      border: "边检",
      boarding: "登机",
    },
  },
} as const;

function createT(lang: Lang): T {
  const l = (["en", "lo", "zh"] as const).includes(lang as never) ? lang : "en";
  return (k) => dict[l].tabs[k];
}

interface Tab {
  id: DepartureTab;
  labelKey: keyof (typeof dict)["en"]["tabs"];
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { id: "checkin", labelKey: "checkin", icon: TicketCheck },
  { id: "security", labelKey: "security", icon: ShieldCheck },
  { id: "customs", labelKey: "customs", icon: Package },
  { id: "border", labelKey: "border", icon: UserCheck },
  { id: "boarding", labelKey: "boarding", icon: Clock },
];

interface DepartureTabNavigationProps {
  lang: Lang;
  activeTab: DepartureTab;
}

function getTabStatus(
  tab: Tab,
  activeTab: DepartureTab,
): "complete" | "current" | "upcoming" {
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const tabIndex = tabs.findIndex((t) => t.id === tab.id);
  if (tabIndex < activeIndex) return "complete";
  if (tabIndex === activeIndex) return "current";
  return "upcoming";
}

export function DepartureTabNavigation({
  lang,
  activeTab,
}: DepartureTabNavigationProps) {
  const t = createT(lang);

  return (
    <nav aria-label="Departure guide progress" className="mb-4 sm:mb-6">
      <ol
        role="list"
        className="divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300 bg-white md:flex md:divide-y-0"
      >
        {tabs.map((tab, tabIdx) => {
          const Icon = tab.icon;
          const status = getTabStatus(tab, activeTab);
          const isLast = tabIdx === tabs.length - 1;

          return (
            <li key={tab.id} className="relative md:flex md:flex-1">
              {status === "complete" ? (
                <Link
                  href={`/${lang}/guides/departures?tab=${tab.id}`}
                  className="group flex w-full items-center"
                >
                  <span className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                    <span className="bg-primary-600 group-hover:bg-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </span>
                    <span className="ml-2 text-xs font-medium text-gray-900 group-hover:text-gray-700 sm:ml-3 sm:text-sm">
                      {t(tab.labelKey)}
                    </span>
                  </span>
                </Link>
              ) : status === "current" ? (
                <Link
                  href={`/${lang}/guides/departures?tab=${tab.id}`}
                  aria-current="step"
                  className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4"
                >
                  <span className="border-primary-600 bg-primary-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10">
                    <Icon className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-primary-600 ml-2 text-xs font-medium sm:ml-3 sm:text-sm">
                    {t(tab.labelKey)}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/${lang}/guides/departures?tab=${tab.id}`}
                  className="group flex items-center"
                >
                  <span className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-gray-400 sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-gray-700 sm:h-5 sm:w-5" />
                    </span>
                    <span className="ml-2 text-xs font-medium text-gray-500 group-hover:text-gray-900 sm:ml-3 sm:text-sm">
                      {t(tab.labelKey)}
                    </span>
                  </span>
                </Link>
              )}

              {!isLast && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="h-full w-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentColor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
