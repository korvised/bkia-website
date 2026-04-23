import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { LostFoundCategory, LostFoundStatus, LostFoundType } from "@/types";
import type { ILostFoundFilter } from "@/features/lost-found/types";

const TYPE_OPTIONS = [
  { value: LostFoundType.LOST, label: "Lost" },
  { value: LostFoundType.FOUND, label: "Found" },
];

const STATUS_OPTIONS = [
  { value: LostFoundStatus.OPEN, label: "Open" },
  { value: LostFoundStatus.MATCHED, label: "Matched" },
  { value: LostFoundStatus.RETURNED, label: "Returned" },
  { value: LostFoundStatus.DONATED, label: "Donated" },
  { value: LostFoundStatus.DISPOSED, label: "Disposed" },
];

const CATEGORY_OPTIONS = [
  { value: LostFoundCategory.ELECTRONICS, label: "Electronics" },
  { value: LostFoundCategory.BAGGAGE, label: "Baggage" },
  { value: LostFoundCategory.CLOTHING, label: "Clothing" },
  { value: LostFoundCategory.DOCUMENTS, label: "Documents" },
  { value: LostFoundCategory.JEWELRY, label: "Jewelry" },
  { value: LostFoundCategory.KEYS, label: "Keys" },
  { value: LostFoundCategory.CASH, label: "Cash" },
  { value: LostFoundCategory.TOYS, label: "Toys" },
  { value: LostFoundCategory.OTHER, label: "Other" },
];

interface Props {
  filters: ILostFoundFilter;
  onFilterChange: (key: keyof ILostFoundFilter, value: unknown) => void;
  onReset: () => void;
}

export function LostFoundFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search by item name..."
            value={filters.search ?? ""}
            onChange={(e) => onFilterChange("search", e.target.value)}
            leftIcon={<LuSearch className="h-4 w-4" />}
          />
        </div>

        <div className="w-36 shrink-0">
          <Select
            placeholder="All Types"
            value={filters.type ?? ""}
            onChange={(value) => onFilterChange("type", value)}
            options={TYPE_OPTIONS}
          />
        </div>

        <div className="w-40 shrink-0">
          <Select
            placeholder="All Categories"
            value={filters.category ?? ""}
            onChange={(value) => onFilterChange("category", value)}
            options={CATEGORY_OPTIONS}
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
