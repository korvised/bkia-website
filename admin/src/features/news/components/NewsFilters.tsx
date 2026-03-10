import { LuSearch, LuRotateCcw } from "react-icons/lu";
import { Input, Select } from "@/components/ui";
import { NewsCategory } from "@/types";
import type { INewsFilter } from "@/features/news/types";

const CATEGORY_OPTIONS = [
  { value: NewsCategory.AIRPORT_UPDATE, label: "Airport Update" },
  { value: NewsCategory.FLIGHT_SERVICE, label: "Flight Service" },
  { value: NewsCategory.EVENT, label: "Event" },
  { value: NewsCategory.ANNOUNCEMENT, label: "Announcement" },
  { value: NewsCategory.SUSTAINABILITY, label: "Sustainability" },
  { value: NewsCategory.TECHNOLOGY, label: "Technology" },
  { value: NewsCategory.COMMUNITY, label: "Community" },
];

const PUBLISHED_OPTIONS = [
  { value: "true", label: "Published" },
  { value: "false", label: "Draft" },
];

const FEATURED_OPTIONS = [
  { value: "true", label: "Featured" },
  { value: "false", label: "Not Featured" },
];

interface Props {
  filters: INewsFilter;
  onFilterChange: (key: keyof INewsFilter, value: unknown) => void;
  onReset: () => void;
}

export function NewsFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search by title, excerpt..."
            value={filters.search ?? ""}
            onChange={(e) => onFilterChange("search", e.target.value)}
            leftIcon={<LuSearch className="h-4 w-4" />}
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

        <div className="w-36 shrink-0">
          <Select
            placeholder="All Statuses"
            value={filters.isPublished ?? ""}
            onChange={(value) => onFilterChange("isPublished", value)}
            options={PUBLISHED_OPTIONS}
          />
        </div>

        <div className="w-40 shrink-0">
          <Select
            placeholder="All Featured"
            value={filters.isFeatured ?? ""}
            onChange={(value) => onFilterChange("isFeatured", value)}
            options={FEATURED_OPTIONS}
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
