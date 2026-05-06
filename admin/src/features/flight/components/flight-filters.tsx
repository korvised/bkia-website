import { useMemo, useState } from "react";
import { isValid } from "date-fns";
import { DatePicker, Input, Select } from "@/components/ui";
import {
  LuArrowRight,
  LuCalendarDays,
  LuChevronDown,
  LuRotateCcw,
  LuSearch,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { FlightDirection, FlightStatus, FlightType, Terminal } from "@/types";
import type { IFlightFilter } from "@/features/flight/types";
import type { IAirline } from "@/features/airline/types";
import {
  FLIGHT_DIRECTION_FILTER_OPTIONS,
  FLIGHT_STATUS_FILTER_OPTIONS,
  FLIGHT_TYPE_FILTER_OPTIONS,
  TERMINAL_FILTER_OPTIONS,
} from "@/features/flight/constants";
import { cn, formatDate } from "@/lib";

interface FlightFiltersProps {
  filters: IFlightFilter;
  onFilterChange: (filters: Partial<IFlightFilter>) => void;
  onReset: () => void;
  airlines: IAirline[];
  isLoadingAirlines?: boolean;
}

// Wraps a filter control; adds a soft teal ring when the filter has a value.
function FilterCell({
  active,
  wide,
  children,
}: {
  active: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg transition-shadow",
        wide && "sm:col-span-2",
        active && "ring-2 ring-primary/25",
      )}
    >
      {children}
    </div>
  );
}

export function FlightFilters({
  filters,
  onFilterChange,
  onReset,
  airlines,
  isLoadingAirlines = false,
}: FlightFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const airlineOptions = useMemo(() => {
    const options = [{ value: "", label: "All Airlines" }];
    airlines.forEach((a) =>
      options.push({ value: a.id, label: `${a.code} — ${a.name}` }),
    );
    return options;
  }, [airlines]);

  const parseDate = (s?: string): Date | null => {
    if (!s) return null;
    const d = new Date(s + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  };

  const handleFrom = (date: Date | null) =>
    onFilterChange({
      dateFrom: date && isValid(date) ? formatDate(date, "yyyy-MM-dd") : "",
    });

  const handleTo = (date: Date | null) =>
    onFilterChange({
      dateTo: date && isValid(date) ? formatDate(date, "yyyy-MM-dd") : "",
    });

  // "Advanced" filters — everything except search + status
  const advancedActiveCount = [
    filters.direction,
    filters.airlineId,
    filters.type,
    filters.terminal,
    filters.gate,
  ].filter(Boolean).length;

  // All non-date active filters (for chips)
  const activeCount = advancedActiveCount + [filters.search, filters.status].filter(Boolean).length;

  const dateRangeActive = !!(filters.dateFrom || filters.dateTo);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* ── Always-visible bar ──────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2.5 p-3">
        {/* Search — grows to fill available space */}
        <div className="min-w-[180px] flex-1">
          <Input
            placeholder="Search by flight no., airline, or route…"
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            leftIcon={<LuSearch className="h-4 w-4" />}
          />
        </div>

        {/* Status — always visible as the most-used dropdown */}
        <div className="w-36 shrink-0">
          <Select
            placeholder="All statuses"
            value={filters.status || ""}
            onChange={(v) =>
              onFilterChange({ status: v as FlightStatus | "" })
            }
            options={FLIGHT_STATUS_FILTER_OPTIONS}
          />
        </div>

        {/* More filters toggle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
            expanded
              ? "border-primary/30 bg-primary/5 text-primary"
              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50",
            advancedActiveCount > 0 && !expanded &&
              "border-primary/30 bg-primary/5 text-primary",
          )}
        >
          <LuSlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {advancedActiveCount > 0 && (
            <span
              className={cn(
                "min-w-[18px] rounded-full px-1 py-0.5 text-center text-[10px] font-bold tabular-nums leading-none",
                expanded
                  ? "bg-primary/20 text-primary"
                  : "bg-primary text-white",
              )}
            >
              {advancedActiveCount}
            </span>
          )}
          <LuChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>

        {/* Reset — only show when something is active */}
        {(activeCount > 0 || dateRangeActive) && (
          <button
            type="button"
            onClick={onReset}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700 active:scale-95"
          >
            <LuRotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* ── Expandable section ─────────────────────────────── */}
      {/* grid-template-rows trick: 0fr ↔ 1fr — no height/max-height needed */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-gray-100 px-3 py-3">
            {/* Date Range */}
            <div
              className={cn(
                "rounded-lg border p-3 transition-colors duration-150",
                dateRangeActive
                  ? "border-primary/30 bg-primary/5"
                  : "border-gray-200 bg-gray-50",
              )}
            >
              <div className="mb-2.5 flex items-center gap-1.5">
                <LuCalendarDays
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    dateRangeActive ? "text-primary" : "text-gray-400",
                  )}
                />
                <span
                  className={cn(
                    "text-[11px] font-semibold tracking-wider uppercase transition-colors",
                    dateRangeActive ? "text-primary" : "text-gray-400",
                  )}
                >
                  Operation Date Range
                </span>
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <DatePicker
                    label="From"
                    value={parseDate(filters.dateFrom)}
                    onChange={handleFrom}
                    placeholder="Start date"
                    isClearable
                    maxDate={parseDate(filters.dateTo) ?? undefined}
                  />
                </div>
                <div className="mb-1 flex h-9 shrink-0 items-center justify-center">
                  <LuArrowRight className="h-4 w-4 text-gray-300" />
                </div>
                <div className="flex-1">
                  <DatePicker
                    label="To"
                    value={parseDate(filters.dateTo)}
                    onChange={handleTo}
                    placeholder="End date"
                    isClearable
                    minDate={parseDate(filters.dateFrom) ?? undefined}
                  />
                </div>
              </div>
            </div>

            {/* Remaining filter grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <FilterCell active={!!filters.direction}>
                <Select
                  label="Direction"
                  placeholder="All"
                  value={filters.direction || ""}
                  onChange={(v) =>
                    onFilterChange({ direction: v as FlightDirection | "" })
                  }
                  options={FLIGHT_DIRECTION_FILTER_OPTIONS}
                />
              </FilterCell>

              <FilterCell active={!!filters.airlineId} wide>
                <Select
                  label="Airline"
                  placeholder="All airlines"
                  value={filters.airlineId || ""}
                  onChange={(v) => onFilterChange({ airlineId: v })}
                  options={airlineOptions}
                  disabled={isLoadingAirlines}
                />
              </FilterCell>

              <FilterCell active={!!filters.type}>
                <Select
                  label="Type"
                  placeholder="All"
                  value={filters.type || ""}
                  onChange={(v) =>
                    onFilterChange({ type: v as FlightType | "" })
                  }
                  options={FLIGHT_TYPE_FILTER_OPTIONS}
                />
              </FilterCell>

              <FilterCell active={!!filters.terminal}>
                <Select
                  label="Terminal"
                  placeholder="All"
                  value={filters.terminal || ""}
                  onChange={(v) =>
                    onFilterChange({ terminal: v as Terminal | "" })
                  }
                  options={TERMINAL_FILTER_OPTIONS}
                />
              </FilterCell>

              <FilterCell active={!!filters.gate}>
                <Input
                  label="Gate"
                  placeholder="e.g. 3"
                  value={filters.gate || ""}
                  onChange={(e) => onFilterChange({ gate: e.target.value })}
                />
              </FilterCell>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active chips ──────────────────────────────────── */}
      {activeCount > 0 && (
        <div className="border-t border-gray-100 px-3 py-2">
          <ActiveChips
            filters={filters}
            airlines={airlines}
            onFilterChange={onFilterChange}
          />
        </div>
      )}
    </div>
  );
}

// ── Active Chips ─────────────────────────────────────────────────────────────

const DIRECTION_LABEL: Record<string, string> = {
  [FlightDirection.DEPARTURE]: "Departure",
  [FlightDirection.ARRIVAL]: "Arrival",
};

const STATUS_LABEL: Record<string, string> = {
  [FlightStatus.SCHEDULED]: "Scheduled",
  [FlightStatus.DELAYED]: "Delayed",
  [FlightStatus.BOARDING]: "Boarding",
  [FlightStatus.DEPARTED]: "Departed",
  [FlightStatus.ARRIVED]: "Arrived",
  [FlightStatus.CANCELED]: "Canceled",
  [FlightStatus.DIVERTED]: "Diverted",
};

const TYPE_LABEL: Record<string, string> = {
  [FlightType.COMMERCIAL]: "Commercial",
  [FlightType.CHARTER]: "Charter",
  [FlightType.CARGO]: "Cargo",
  [FlightType.PRIVATE]: "Private",
  [FlightType.VIP]: "VIP",
};

const TERMINAL_LABEL: Record<string, string> = {
  [Terminal.INT]: "Terminal A",
  [Terminal.DOM]: "Terminal B",
};

interface ActiveChipsProps {
  filters: IFlightFilter;
  airlines: IAirline[];
  onFilterChange: (f: Partial<IFlightFilter>) => void;
}

function ActiveChips({ filters, airlines, onFilterChange }: ActiveChipsProps) {
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `"${filters.search}"`,
      clear: () => onFilterChange({ search: "" }),
    });
  }
  if (filters.status) {
    chips.push({
      key: "status",
      label: STATUS_LABEL[filters.status] ?? filters.status,
      clear: () => onFilterChange({ status: "" }),
    });
  }
  if (filters.direction) {
    chips.push({
      key: "direction",
      label: DIRECTION_LABEL[filters.direction] ?? filters.direction,
      clear: () => onFilterChange({ direction: "" }),
    });
  }
  if (filters.airlineId) {
    const airline = airlines.find((a) => a.id === filters.airlineId);
    chips.push({
      key: "airline",
      label: airline ? `${airline.code} — ${airline.name}` : "Airline",
      clear: () => onFilterChange({ airlineId: "" }),
    });
  }
  if (filters.type) {
    chips.push({
      key: "type",
      label: TYPE_LABEL[filters.type] ?? filters.type,
      clear: () => onFilterChange({ type: "" }),
    });
  }
  if (filters.terminal) {
    chips.push({
      key: "terminal",
      label: TERMINAL_LABEL[filters.terminal] ?? filters.terminal,
      clear: () => onFilterChange({ terminal: "" }),
    });
  }
  if (filters.gate) {
    chips.push({
      key: "gate",
      label: `Gate ${filters.gate}`,
      clear: () => onFilterChange({ gate: "" }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.clear}
          className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
        >
          {chip.label}
          <span className="ml-0.5 opacity-60">×</span>
        </button>
      ))}
    </div>
  );
}
