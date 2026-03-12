import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { AuctionCategory, AuctionStatus } from "@/types/enum.type";
import type { IAuctionFilter } from "@/features/auction/types";

interface Props {
  filters: IAuctionFilter;
  onFilterChange: (key: keyof IAuctionFilter, value: unknown) => void;
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: AuctionStatus.UPCOMING, label: "Upcoming" },
  { value: AuctionStatus.OPEN, label: "Open" },
  { value: AuctionStatus.CLOSED, label: "Closed" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: AuctionCategory.EQUIPMENT, label: "Equipment" },
  { value: AuctionCategory.CONSTRUCTION, label: "Construction" },
  { value: AuctionCategory.SERVICE, label: "Service" },
  { value: AuctionCategory.IT, label: "IT" },
  { value: AuctionCategory.CONSULTING, label: "Consulting" },
  { value: AuctionCategory.MAINTENANCE, label: "Maintenance" },
  { value: AuctionCategory.OTHER, label: "Other" },
];

export function AuctionFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search auctions..."
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

        <div className="w-44 shrink-0">
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
