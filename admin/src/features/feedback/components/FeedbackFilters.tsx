import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { FeedbackCategory, FeedbackStatus } from "@/types/enum.type";
import type { IFeedbackFilter } from "@/features/feedback/types";

interface Props {
  filters: IFeedbackFilter;
  onFilterChange: (key: keyof IFeedbackFilter, value: unknown) => void;
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: FeedbackStatus.NEW, label: "New" },
  { value: FeedbackStatus.IN_PROGRESS, label: "In Progress" },
  { value: FeedbackStatus.RESOLVED, label: "Resolved" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: FeedbackCategory.CLEANLINESS, label: "Cleanliness" },
  { value: FeedbackCategory.SECURITY, label: "Security" },
  { value: FeedbackCategory.WIFI, label: "Wi-Fi" },
  { value: FeedbackCategory.FOOD_BEVERAGE, label: "Food & Beverage" },
  { value: FeedbackCategory.STAFF_SERVICE, label: "Staff Service" },
  { value: FeedbackCategory.FACILITIES, label: "Facilities" },
  { value: FeedbackCategory.OTHER, label: "Other" },
];

export function FeedbackFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search feedback..."
            value={filters.search ?? ""}
            onChange={(e) => onFilterChange("search", e.target.value)}
            leftIcon={<LuSearch className="h-4 w-4" />}
          />
        </div>

        <div className="w-40 shrink-0">
          <Select
            placeholder="All Statuses"
            value={filters.status ?? ""}
            onChange={(value) => onFilterChange("status", value)}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="w-48 shrink-0">
          <Select
            placeholder="All Categories"
            value={filters.category ?? ""}
            onChange={(value) => onFilterChange("category", value)}
            options={CATEGORY_OPTIONS}
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          <LuRotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
