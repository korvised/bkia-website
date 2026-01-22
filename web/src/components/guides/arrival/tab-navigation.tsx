"use client";

import { Fragment, useCallback, useMemo } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import {
  ChevronDown,
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
import { ArrivalNavKey, createArrivalGuideI18n } from "@/data/i18n/guide";
import {
  DesktopStepItem,
  MobileMenuItem,
  TabStatus,
  TabWithStatus,
} from "@/components/guides/common";

interface Tab {
  id: ArrivalTab;
  labelKey: ArrivalNavKey;
  icon: LucideIcon;
}

const TABS: readonly Tab[] = [
  { id: "airport", labelKey: "airport", icon: PlaneLanding },
  { id: "customs-inspection", labelKey: "customsInspection", icon: Package },
  { id: "border-inspection", labelKey: "borderInspection", icon: UserCheck },
  { id: "baggage-claim", labelKey: "baggageClaim", icon: Luggage },
  { id: "exit-customs", labelKey: "exitCustoms", icon: ClipboardCheck },
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

  const activeTabIndex = useMemo(
    () => TABS.findIndex((tab) => tab.id === activeTab),
    [activeTab],
  );

  const currentTab = useMemo(
    () => TABS[activeTabIndex] || TABS[0],
    [activeTabIndex],
  );

  const stepOfText = useMemo(
    () =>
      t.stepOf
        .replace("{current}", String(activeTabIndex + 1))
        .replace("{total}", String(TABS.length)),
    [t.stepOf, activeTabIndex],
  );

  const getTabStatus = useCallback(
    (tabIndex: number): TabStatus => {
      if (tabIndex < activeTabIndex) return "complete";
      if (tabIndex === activeTabIndex) return "current";
      return "upcoming";
    },
    [activeTabIndex],
  );

  const getTabHref = useCallback(
    (tabId: ArrivalTab) => `/${lang}/guides/arrivals?tab=${tabId}`,
    [lang],
  );

  const tabsWithStatus = useMemo<TabWithStatus[]>(
    () =>
      TABS.map((tab, index) => ({
        ...tab,
        status: getTabStatus(index),
        href: getTabHref(tab.id),
        label: t[tab.labelKey],
        stepNumber: index + 1,
        isLast: index === TABS.length - 1,
      })),
    [getTabStatus, getTabHref, t],
  );

  const CurrentIcon = currentTab.icon;

  return (
    <div className="bg-white pb-4 lg:pb-6">
      <nav aria-label="Arrival guide progress" className="container">
        {/* Mobile: Dropdown (< lg) */}
        <div className="lg:hidden">
          <Menu as="div" className="relative">
            <MenuButton className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm">
              <div className="flex items-center gap-3">
                <span className="border-primary-600 bg-primary-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2">
                  <CurrentIcon className="text-primary-600 h-4 w-4" />
                </span>
                <div>
                  <span className="text-primary-600 block text-sm font-medium">
                    {t[currentTab.labelKey]}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {stepOfText}
                  </span>
                </div>
              </div>
              <ChevronDown className="ui-open:rotate-180 h-5 w-5 text-gray-400 transition-transform" />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute left-0 z-50 mt-2 w-full origin-top-left rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                {tabsWithStatus.map((tab) => (
                  <MobileMenuItem
                    key={tab.id}
                    tab={tab}
                    totalSteps={TABS.length}
                  />
                ))}
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        {/* Desktop: Horizontal steps (>= lg) */}
        <ol
          role="list"
          className="hidden divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300 bg-white lg:flex lg:divide-y-0"
        >
          {tabsWithStatus.map((tab) => (
            <DesktopStepItem key={tab.id} tab={tab} />
          ))}
        </ol>
      </nav>
    </div>
  );
}
