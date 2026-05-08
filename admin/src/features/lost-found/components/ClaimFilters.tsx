import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { ClaimStatus, LostFoundCategory } from "@/types";
import type { IClaimFilters } from "@/features/lost-found/types";

const STATUS_OPTIONS = [
  { value: ClaimStatus.PENDING, label: "Pending" },
  { value: ClaimStatus.APPROVED, label: "Approved" },
  { value: ClaimStatus.REJECTED, label: "Rejected" },
  { value: ClaimStatus.COMPLETED, label: "Completed" },
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

const LINKED_OPTIONS = [
  { value: "true", label: "Linked" },
  { value: "false", label: "Unlinked" },
];

interface Props {
  filters: IClaimFilters;
  onFilterChange: (key: keyof IClaimFilters, value: unknown) => void;
  onReset: () => void;
}

export function ClaimFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search by name, description, ref code..."
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

        <div className="w-40 shrink-0">
          <Select
            placeholder="All Categories"
            value={filters.category ?? ""}
            onChange={(value) => onFilterChange("category", value)}
            options={CATEGORY_OPTIONS}
          />
        </div>

        <div className="w-36 shrink-0">
          <Select
            placeholder="All Claims"
            value={filters.linked ?? ""}
            onChange={(value) => onFilterChange("linked", value)}
            options={LINKED_OPTIONS}
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
