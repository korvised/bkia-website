import {
  FlightDirection,
  FlightStatus,
  FlightType,
  Terminal,
  RouteType,
} from "@/types";
import type { SelectOption } from "@/components/ui";

// Airport code
export const AIRPORT_CODE = "BOR";

// Base options without "All" option - for create/update forms
export const FLIGHT_DIRECTION_OPTIONS: SelectOption[] = [
  { value: FlightDirection.DEPARTURE, label: "Departure" },
  { value: FlightDirection.ARRIVAL, label: "Arrival" },
];

export const FLIGHT_TYPE_OPTIONS: SelectOption[] = [
  { value: FlightType.COMMERCIAL, label: "Commercial" },
  { value: FlightType.CHARTER, label: "Charter" },
  { value: FlightType.CARGO, label: "Cargo" },
  { value: FlightType.PRIVATE, label: "Private" },
  { value: FlightType.VIP, label: "VIP" },
];

export const FLIGHT_STATUS_OPTIONS: SelectOption[] = [
  { value: FlightStatus.SCHEDULED, label: "Scheduled" },
  { value: FlightStatus.DELAYED, label: "Delayed" },
  { value: FlightStatus.BOARDING, label: "Boarding" },
  { value: FlightStatus.DEPARTED, label: "Departed" },
  { value: FlightStatus.ARRIVED, label: "Arrived" },
  { value: FlightStatus.CANCELED, label: "Canceled" },
  { value: FlightStatus.DIVERTED, label: "Diverted" },
];

export const TERMINAL_OPTIONS: SelectOption[] = [
  { value: Terminal.INT, label: "Terminal A (International)" },
  { value: Terminal.DOM, label: "Terminal B (Domestic)" },
];

export const ROUTE_TYPE_OPTIONS: SelectOption[] = [
  { value: RouteType.INT, label: "International" },
  { value: RouteType.DOM, label: "Domestic" },
];

// Filter options with "All" option - for list filters
export const FLIGHT_DIRECTION_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Directions" },
  ...FLIGHT_DIRECTION_OPTIONS,
];

export const FLIGHT_TYPE_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Types" },
  ...FLIGHT_TYPE_OPTIONS,
];

export const FLIGHT_STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Status" },
  ...FLIGHT_STATUS_OPTIONS,
];

export const TERMINAL_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Terminals" },
  ...TERMINAL_OPTIONS,
];

export const ROUTE_TYPE_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Routes" },
  ...ROUTE_TYPE_OPTIONS,
];
