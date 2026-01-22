import { Check, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib";
import { MenuItem } from "@headlessui/react";
import { IconType } from "react-icons";

export type TabStatus = "complete" | "current" | "upcoming";

export interface TabWithStatus {
  id: string;
  labelKey: string;
  icon: IconType | LucideIcon;
  status: TabStatus;
  href: string;
  label: string;
  stepNumber: number;
  isLast: boolean;
}

interface StepIndicatorProps {
  status: TabStatus;
  icon: IconType | LucideIcon;
}

export function StepIndicator({ status, icon: Icon }: StepIndicatorProps) {
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
export function DesktopStepIndicator({
  status,
  icon: Icon,
}: StepIndicatorProps) {
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
export function StepArrow() {
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
// Mobile Menu Item Component
interface MobileMenuItemProps {
  tab: TabWithStatus;
  totalSteps: number;
}

export function MobileMenuItem({ tab, totalSteps }: MobileMenuItemProps) {
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

export function DesktopStepItem({ tab }: DesktopStepItemProps) {
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
