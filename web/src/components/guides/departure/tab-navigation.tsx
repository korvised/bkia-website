// DepartureTabNavigation.tsx
"use client";

import { Fragment, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { IconType } from "react-icons";
import {
  MdOutlineAirplaneTicket,
  MdOutlineLuggage,
  MdOutlineSecurity,
  MdOutlineFlightTakeoff,
} from "react-icons/md";
import { FaPassport } from "react-icons/fa";
import { cn } from "@/lib";
import { Lang } from "@/types/language";
import { DepartureTab } from "@/types/guide";
import { createPassengerGuideI18n, DepartureNavKey } from "@/data/i18n/guide";

type TabStatus = "complete" | "current" | "upcoming";

interface Tab {
  id: DepartureTab;
  labelKey: DepartureNavKey;
  icon: IconType;
}

const TABS: readonly Tab[] = [
  { id: "checkin", labelKey: "checkin", icon: MdOutlineAirplaneTicket },
  { id: "baggage", labelKey: "baggage", icon: MdOutlineLuggage },
  { id: "security", labelKey: "security", icon: MdOutlineSecurity },
  { id: "immigration", labelKey: "immigration", icon: FaPassport },
  { id: "boarding", labelKey: "boarding", icon: MdOutlineFlightTakeoff },
] as const;

interface TabWithStatus {
  id: DepartureTab;
  labelKey: DepartureNavKey;
  icon: IconType;
  status: TabStatus;
  href: string;
  label: string;
  stepNumber: number;
  isLast: boolean;
}

interface DepartureTabNavigationProps {
  lang: Lang;
  activeTab: DepartureTab;
}

export function DepartureTabNavigation({
  lang,
  activeTab,
}: DepartureTabNavigationProps) {
  const { departureNav: t } = createPassengerGuideI18n(lang);

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
    (tabId: DepartureTab) => `/${lang}/guides/departures?tab=${tabId}`,
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
      <nav aria-label="Departure guide progress" className="container">
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

// Mobile Menu Item Component
interface MobileMenuItemProps {
  tab: TabWithStatus;
  totalSteps: number;
}

function MobileMenuItem({ tab, totalSteps }: MobileMenuItemProps) {
  const Icon = tab.icon;

  return (
    <MenuItem>
      {({ focus }) => (
        <Link
          href={tab.href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 text-sm",
            tab.status === "current"
              ? "bg-primary-50"
              : focus
                ? "bg-gray-50"
                : "",
          )}
        >
          <StepIndicator status={tab.status} icon={Icon} />
          <div className="flex flex-1 items-center justify-between">
            <span
              className={cn(
                "font-medium",
                tab.status === "current"
                  ? "text-primary-600"
                  : tab.status === "complete"
                    ? "text-gray-900"
                    : "text-gray-500",
              )}
            >
              {tab.label}
            </span>
            <span className="text-xs text-gray-400">
              {tab.stepNumber}/{totalSteps}
            </span>
          </div>
        </Link>
      )}
    </MenuItem>
  );
}

// Desktop Step Item Component
interface DesktopStepItemProps {
  tab: TabWithStatus;
}

function DesktopStepItem({ tab }: DesktopStepItemProps) {
  const Icon = tab.icon;

  return (
    <li className="relative lg:flex lg:flex-1">
      <Link
        href={tab.href}
        aria-current={tab.status === "current" ? "step" : undefined}
        className="group flex w-full items-center"
      >
        <span className="flex items-center px-4 py-4">
          <DesktopStepIndicator status={tab.status} icon={Icon} />
          <span
            className={cn(
              "ml-3 text-sm font-medium",
              tab.status === "complete" &&
                "text-gray-900 group-hover:text-gray-700",
              tab.status === "current" && "text-primary-600",
              tab.status === "upcoming" &&
                "text-gray-500 group-hover:text-gray-900",
            )}
          >
            {tab.label}
          </span>
        </span>
      </Link>

      {!tab.isLast && <StepArrow />}
    </li>
  );
}

// Step Indicator Component for Mobile
interface StepIndicatorProps {
  status: TabStatus;
  icon: IconType;
}

function StepIndicator({ status, icon: Icon }: StepIndicatorProps) {
  if (status === "complete") {
    return (
      <span className="bg-primary-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        <Check className="h-4 w-4 text-white" />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span className="border-primary-600 bg-primary-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2">
        <Icon className="text-primary-600 h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
      <Icon className="h-4 w-4 text-gray-400" />
    </span>
  );
}

// Step Indicator Component for Desktop
function DesktopStepIndicator({ status, icon: Icon }: StepIndicatorProps) {
  if (status === "complete") {
    return (
      <span className="bg-primary-600 group-hover:bg-primary-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors">
        <Icon className="h-5 w-5 text-white" />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span className="border-primary-600 bg-primary-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2">
        <Icon className="text-primary-600 h-5 w-5" />
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-gray-400">
      <Icon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
    </span>
  );
}

// Arrow Separator Component
function StepArrow() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 hidden h-full w-5 lg:block"
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
  );
}
