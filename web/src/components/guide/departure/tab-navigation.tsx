// ========================================
// DepartureTabNavigation Component
// ========================================
import Link from "next/link";
import {
  Clock,
  LucideIcon,
  Package,
  Plane,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { Lang } from "@/types/language";
import { DepartureTab } from "@/types/guide";

interface Tab {
  id: DepartureTab;
  label: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { id: "purchase", label: "Purchase", icon: Plane },
  { id: "checkin", label: "Check-in Procedures", icon: Users },
  { id: "customs", label: "Customs Inspection", icon: Package },
  { id: "border", label: "Border Inspection", icon: UserCheck },
  { id: "security", label: "Security Check", icon: ShieldCheck },
  { id: "boarding", label: "Boarding & Flight", icon: Clock },
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
                  href={`/${lang}/guides/departure?tab=${tab.id}`}
                  className="group flex w-full items-center"
                >
                  <span className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                    <span className="bg-primary-600 group-hover:bg-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors sm:h-10 sm:w-10">
                      <Icon
                        className="h-4 w-4 text-white sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-2 text-xs font-medium text-gray-900 group-hover:text-gray-700 sm:ml-3 sm:text-sm">
                      {tab.label}
                    </span>
                  </span>
                </Link>
              ) : status === "current" ? (
                <Link
                  href={`/${lang}/guides/departure?tab=${tab.id}`}
                  aria-current="step"
                  className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4"
                >
                  <span className="border-primary-600 bg-primary-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10">
                    <Icon
                      className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-primary-600 ml-2 text-xs font-medium sm:ml-3 sm:text-sm">
                    {tab.label}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/${lang}/guides/departure?tab=${tab.id}`}
                  className="group flex items-center"
                >
                  <span className="flex items-center px-3 py-3 text-sm font-medium sm:px-4 sm:py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-gray-400 sm:h-10 sm:w-10">
                      <Icon
                        className="h-4 w-4 text-gray-500 group-hover:text-gray-700 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-2 text-xs font-medium text-gray-500 group-hover:text-gray-900 sm:ml-3 sm:text-sm">
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
