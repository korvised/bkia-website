import Link from "next/link";
import {
  ClipboardCheck,
  DoorOpen,
  LucideIcon,
  Luggage,
  Package,
  PlaneLanding,
  UserCheck,
} from "lucide-react";
import { Lang } from "@/types/language";
import { ArrivalTab } from "@/types/guide";

interface Tab {
  id: ArrivalTab;
  label: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { id: "airport", label: "Arrival Airport", icon: PlaneLanding },
  { id: "customs-inspection", label: "Customs Inspection", icon: Package },
  { id: "border-inspection", label: "Border Inspection", icon: UserCheck },
  { id: "baggage-claim", label: "Baggage Claim", icon: Luggage },
  { id: "exit-customs", label: "Exit Customs", icon: ClipboardCheck },
  { id: "leaving", label: "Leaving Airport", icon: DoorOpen },
];

interface ArrivalTabNavigationProps {
  lang: Lang;
  activeTab: ArrivalTab;
}

function getTabStatus(
  tab: Tab,
  activeTab: ArrivalTab,
): "complete" | "current" | "upcoming" {
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const tabIndex = tabs.findIndex((t) => t.id === tab.id);

  if (tabIndex < activeIndex) return "complete";
  if (tabIndex === activeIndex) return "current";
  return "upcoming";
}

export function ArrivalTabNavigation({
  lang,
  activeTab,
}: ArrivalTabNavigationProps) {
  return (
    <nav aria-label="Arrival guide progress" className="mb-6">
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
                  href={`/${lang}/guides/arrival?tab=${tab.id}`}
                  className="group flex w-full items-center"
                >
                  <span className="flex items-center px-4 py-4 text-sm font-medium">
                    <span className="bg-primary-600 group-hover:bg-primary-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {tab.label}
                    </span>
                  </span>
                </Link>
              ) : status === "current" ? (
                <Link
                  href={`/${lang}/guides/arrival?tab=${tab.id}`}
                  aria-current="step"
                  className="flex items-center px-4 py-4 text-sm font-medium"
                >
                  <span className="border-primary-600 bg-primary-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2">
                    <Icon
                      className="text-primary-600 h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-primary-600 ml-3 text-sm font-medium">
                    {tab.label}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/${lang}/guides/arrival?tab=${tab.id}`}
                  className="group flex items-center"
                >
                  <span className="flex items-center px-4 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-gray-400">
                      <Icon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-700"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {tab.label}
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
