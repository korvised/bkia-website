import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { ImportantPriority } from "@/types";
import type { INoticeFilter } from "@/features/notice/types";

const PRIORITY_OPTIONS = [
  { value: ImportantPriority.URGENT, label: "Urgent" },
  { value: ImportantPriority.HIGH, label: "High" },
  { value: ImportantPriority.NORMAL, label: "Normal" },
];

const STATUS_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

interface Props {
  filters: INoticeFilter;
  onFilterChange: (key: keyof INoticeFilter, value: unknown) => void;
  onReset: () => void;
}

export function NoticeFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search by title..."
            value={filters.search ?? ""}
            onChange={(e) => onFilterChange("search", e.target.value)}
            leftIcon={<LuSearch className="h-4 w-4" />}
          />
        </div>

        <div className="w-36 shrink-0">
          <Select
            placeholder="All Priorities"
            value={filters.priority ?? ""}
            onChange={(value) => onFilterChange("priority", value)}
            options={PRIORITY_OPTIONS}
          />
        </div>

        <div className="w-36 shrink-0">
          <Select
            placeholder="All Statuses"
            value={filters.isActive ?? ""}
            onChange={(value) => onFilterChange("isActive", value)}
            options={STATUS_OPTIONS}
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
