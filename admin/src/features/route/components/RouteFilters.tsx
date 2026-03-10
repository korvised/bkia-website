import { LuRotateCcw } from "react-icons/lu";
import { Select } from "@/components/ui";
import { RouteType } from "@/types";
import type { IRouteFilter } from "@/features/route/types";

const ROUTE_TYPE_OPTIONS = [
  { value: RouteType.INT, label: "International" },
  { value: RouteType.DOM, label: "Domestic" },
];

const STATUS_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

interface Props {
  filters: IRouteFilter;
  onFilterChange: (key: keyof IRouteFilter, value: unknown) => void;
  onReset: () => void;
}

export function RouteFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="w-44 shrink-0">
          <Select
            placeholder="All Types"
            value={filters.routeType ?? ""}
            onChange={(value) => onFilterChange("routeType", value)}
            options={ROUTE_TYPE_OPTIONS}
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
