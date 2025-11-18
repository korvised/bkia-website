import { useMemo } from "react";
import { isValid } from "date-fns";
import { DatePicker, Input, Select } from "@/components/ui";
import { LuFilter, LuSearch, LuX } from "react-icons/lu";
import { FlightDirection, FlightStatus, FlightType, Terminal } from "@/types";
import type { IFlightFilter } from "@/features/flight/types";
import type { IAirline } from "@/features/airline/types";
import {
  FLIGHT_DIRECTION_FILTER_OPTIONS,
  FLIGHT_STATUS_FILTER_OPTIONS,
  FLIGHT_TYPE_FILTER_OPTIONS,
  TERMINAL_FILTER_OPTIONS,
} from "@/features/flight/constants";
import { formatDate } from "@/lib/utils.ts";

interface FlightFiltersProps {
  filters: IFlightFilter;
  onFilterChange: (filters: Partial<IFlightFilter>) => void;
  onReset: () => void;
  airlines: IAirline[];
  isLoadingAirlines?: boolean;
}

export function FlightFilters({
  filters,
  onFilterChange,
  onReset,
  airlines,
  isLoadingAirlines = false,
}: FlightFiltersProps) {
  const airlineOptions = useMemo(() => {
    const options = [{ value: "", label: "All Airlines" }];

    if (airlines.length > 0) {
      airlines.forEach((airline) => {
        options.push({
          value: airline.id,
          label: `${airline.code} - ${airline.name}`,
        });
      });
    }

    return options;
  }, [airlines]);

  const handleDateChange = (date: Date | null) => {
    if (date && isValid(date)) {
      onFilterChange({ operationDate: formatDate(date, "yyyy-MM-dd") });
    } else {
      onFilterChange({ operationDate: "" });
    }
  };

  const parseDate = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <LuFilter className="text-primary h-5 w-5" />
        <h3 className="font-semibold text-gray-700">Filters</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          placeholder="Search flights..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          leftIcon={<LuSearch className="h-4 w-4" />}
        />

        <Select
          placeholder="Direction"
          value={filters.direction || ""}
          onChange={(value) =>
            onFilterChange({ direction: value as FlightDirection | "" })
          }
          options={FLIGHT_DIRECTION_FILTER_OPTIONS}
        />

        <Select
          placeholder="Airline"
          value={filters.airlineId || ""}
          onChange={(value) => onFilterChange({ airlineId: value })}
          options={airlineOptions}
          disabled={isLoadingAirlines}
        />

        <Select
          placeholder="Flight Type"
          value={filters.type || ""}
          onChange={(value) =>
            onFilterChange({ type: value as FlightType | "" })
          }
          options={FLIGHT_TYPE_FILTER_OPTIONS}
        />

        <Select
          placeholder="Status"
          value={filters.status || ""}
          onChange={(value) =>
            onFilterChange({ status: value as FlightStatus | "" })
          }
          options={FLIGHT_STATUS_FILTER_OPTIONS}
        />

        <DatePicker
          value={parseDate(filters.operationDate)}
          onChange={handleDateChange}
          placeholder="Select operation date"
          isClearable
        />

        <Select
          placeholder="Terminal"
          value={filters.terminal || ""}
          onChange={(value) =>
            onFilterChange({ terminal: value as Terminal | "" })
          }
          options={TERMINAL_FILTER_OPTIONS}
        />

        <Input
          placeholder="Gate"
          value={filters.gate || ""}
          onChange={(e) => onFilterChange({ gate: e.target.value })}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <LuX className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
}
