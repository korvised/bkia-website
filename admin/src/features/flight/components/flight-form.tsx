import { useMemo } from "react";
import type { FormikProps } from "formik";
import {
  LuCalendar,
  LuClock,
  LuInfo,
  LuPlane,
  LuRoute,
  LuUsers,
} from "react-icons/lu";
import {
  DatePicker,
  Input,
  MultiDatePicker,
  MultiSelect,
  Select,
  Textarea,
  TimePicker,
} from "@/components/ui";
import { cn } from "@/lib";
import { FlightStatus, FlightType, RouteType, Terminal } from "@/types";
import type { IAirline } from "@/features/airline/types";
import type { IRoute } from "@/features/route/types";
import type { ICounter } from "@/features/counter/types";
import {
  AIRPORT_CODE,
  FLIGHT_DIRECTION_FILTER_OPTIONS,
  FLIGHT_STATUS_OPTIONS,
  FLIGHT_TYPE_OPTIONS,
  ROUTE_TYPE_FILTER_OPTIONS,
  TERMINAL_OPTIONS,
} from "../constants";
import type { FlightDirection, ICreateFlightForm } from "../types";

interface FlightFormProps {
  formik: FormikProps<ICreateFlightForm>;
  airlines: IAirline[];
  routes: IRoute[];
  counters: ICounter[];
  isLoadingAirlines?: boolean;
  isLoadingRoutes?: boolean;
  isLoadingCounters?: boolean;
  isEdit?: boolean;
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

function SectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}

export function FlightForm({
  formik,
  airlines,
  routes,
  counters,
  isLoadingAirlines = false,
  isLoadingRoutes = false,
  isLoadingCounters = false,
  isEdit = false,
}: FlightFormProps) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formik;

  const getError = (field: keyof ICreateFlightForm) => {
    return touched[field] && errors[field] ? String(errors[field]) : undefined;
  };

  // Check if selected route is departure (origin is our airport)
  const isDeparture = useMemo(() => {
    const selectedRoute = routes.find((route) => route.id === values.routeId);
    return selectedRoute?.origin.code === AIRPORT_CODE;
  }, [routes, values.routeId]);

  // Filter routes based on direction and route type
  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      if (values.routeType && route.routeType !== values.routeType) {
        return false;
      }
      if (values.direction === "departure") {
        return route.origin.code === AIRPORT_CODE;
      } else if (values.direction === "arrival") {
        return route.destination.code === AIRPORT_CODE;
      }
      return true;
    });
  }, [routes, values.direction, values.routeType]);

  const airlineOptions = useMemo(
    () =>
      airlines.map((airline) => ({
        value: airline.id,
        label: `${airline.code} - ${airline.name}`,
      })),
    [airlines],
  );

  const routeOptions = useMemo(
    () =>
      filteredRoutes.map((route) => ({
        value: route.id,
        label: `${route.origin.code} → ${route.destination.code}`,
      })),
    [filteredRoutes],
  );

  const counterOptions = useMemo(
    () =>
      counters
        .filter(
          (counter) => counter.terminal === values.terminal || !values.terminal,
        )
        .map((counter) => ({
          value: counter.id,
          label: `${counter.name} (Terminal ${counter.terminal})`,
        })),
    [counters, values.terminal],
  );

  const handleDirectionChange = (direction: FlightDirection | "") => {
    setFieldValue("direction", direction);
    setFieldValue("routeId", "");
    if (direction === "arrival") {
      setFieldValue("checkInCounterIds", []);
      setFieldValue("checkInStartTime", "");
      setFieldValue("checkInEndTime", "");
    }
  };

  const handleRouteTypeChange = (routeType: RouteType | "") => {
    setFieldValue("routeType", routeType);
    setFieldValue("routeId", "");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Section 1: Route & Airline */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuRoute className="h-4 w-4" />}
          title="Route & Airline"
          description="Select flight direction, route, and operating airline"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Select
            label="Direction"
            placeholder="All Directions"
            value={values.direction}
            onChange={(value) =>
              handleDirectionChange(value as FlightDirection | "")
            }
            options={FLIGHT_DIRECTION_FILTER_OPTIONS}
          />

          <Select
            label="Route Type"
            placeholder="All Routes"
            value={values.routeType}
            onChange={(value) => handleRouteTypeChange(value as RouteType | "")}
            options={ROUTE_TYPE_FILTER_OPTIONS}
          />

          <Select
            label="Route"
            placeholder={
              filteredRoutes.length === 0
                ? "No routes available"
                : "Select route"
            }
            value={values.routeId}
            onChange={(value) => setFieldValue("routeId", value)}
            options={routeOptions}
            disabled={isLoadingRoutes || filteredRoutes.length === 0}
            error={getError("routeId")}
          />

          <Select
            label="Airline"
            placeholder="Select airline"
            value={values.airlineId}
            onChange={(value) => setFieldValue("airlineId", value)}
            options={airlineOptions}
            disabled={isLoadingAirlines}
            error={getError("airlineId")}
          />
        </div>
      </div>

      {/* Section 2: Flight Information */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuPlane className="h-4 w-4" />}
          title="Flight Information"
          description="Basic flight details and terminal assignment"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Input
            label="Flight Number"
            name="flightNo"
            placeholder="e.g., QV902"
            value={values.flightNo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("flightNo")}
          />

          <Select
            label="Flight Type"
            placeholder="Select type"
            value={values.type}
            onChange={(value) => setFieldValue("type", value as FlightType)}
            options={FLIGHT_TYPE_OPTIONS}
            error={getError("type")}
          />

          <Select
            label="Terminal"
            placeholder="Select terminal"
            value={values.terminal}
            onChange={(value) => {
              setFieldValue("terminal", value as Terminal);
              setFieldValue("checkInCounterIds", []);
            }}
            options={TERMINAL_OPTIONS}
            error={getError("terminal")}
          />

          <Input
            label="Gate"
            name="gate"
            placeholder="e.g., A1, B2"
            value={values.gate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("gate")}
          />
        </div>
      </div>

      {/* Section 3: Schedule & Timing */}
      <div
        className={cn(
          "p-6",
          (isDeparture || !values.routeId) && "border-b border-gray-200",
        )}
      >
        <SectionHeader
          icon={<LuCalendar className="h-4 w-4" />}
          title="Schedule & Timing"
          description="Operation dates and flight times"
        />

        <div className="space-y-6">
          {/* Operation Dates */}
          <div>
            {isEdit ? (
              <DatePicker
                label="Operation Date"
                value={
                  values.operationDates[0]
                    ? new Date(values.operationDates[0])
                    : null
                }
                onChange={(date) =>
                  setFieldValue("operationDates", date ? [date] : [])
                }
                placeholder="Select date"
                error={getError("operationDates")}
              />
            ) : (
              <MultiDatePicker
                label="Operation Dates"
                values={values.operationDates}
                onChange={(dates) => setFieldValue("operationDates", dates)}
                placeholder="Select one or more dates"
                minDate={new Date()}
                error={getError("operationDates")}
              />
            )}
          </div>

          {/* Times Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Scheduled Times */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="mb-4 flex items-center gap-2">
                <LuClock className="text-primary h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">
                  Scheduled Times
                </span>
                <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
                  Required
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TimePicker
                  label="Departure"
                  value={values.scheduledDepTime}
                  onChange={(value) => setFieldValue("scheduledDepTime", value)}
                  error={getError("scheduledDepTime")}
                  placeholder="00:00"
                />
                <TimePicker
                  label="Arrival"
                  value={values.scheduledArrTime}
                  onChange={(value) => setFieldValue("scheduledArrTime", value)}
                  error={getError("scheduledArrTime")}
                  placeholder="00:00"
                />
              </div>
            </div>

            {/* Actual Times */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="mb-4 flex items-center gap-2">
                <LuClock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Actual Times
                </span>
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-500">
                  Optional
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TimePicker
                  label="Departure"
                  value={values.actualDepTime}
                  onChange={(value) => setFieldValue("actualDepTime", value)}
                  error={getError("actualDepTime")}
                  placeholder="00:00"
                />
                <TimePicker
                  label="Arrival"
                  value={values.actualArrTime}
                  onChange={(value) => setFieldValue("actualArrTime", value)}
                  error={getError("actualArrTime")}
                  placeholder="00:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Check-in Configuration (Departure only) */}
      {isDeparture && (
        <div className="border-b border-gray-200 p-6">
          <SectionHeader
            icon={<LuUsers className="h-4 w-4" />}
            title="Check-in Configuration"
            description="Counter assignments and check-in window"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <TimePicker
              label="Check-in Opens"
              value={values.checkInStartTime}
              onChange={(value) => setFieldValue("checkInStartTime", value)}
              error={getError("checkInStartTime")}
              placeholder="00:00"
            />

            <TimePicker
              label="Check-in Closes"
              value={values.checkInEndTime}
              onChange={(value) => setFieldValue("checkInEndTime", value)}
              error={getError("checkInEndTime")}
              placeholder="00:00"
            />

            <div className="sm:col-span-2 xl:col-span-1">
              <MultiSelect
                label="Assigned Counters"
                placeholder={
                  !values.terminal ? "Select terminal first" : "Select counters"
                }
                values={values.checkInCounterIds}
                onChange={(values) =>
                  setFieldValue("checkInCounterIds", values)
                }
                options={counterOptions}
                disabled={isLoadingCounters || !values.terminal}
              />
            </div>
          </div>

          {!values.terminal && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
              <LuInfo className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                Select a terminal in Flight Information to assign counters
              </span>
            </div>
          )}
        </div>
      )}

      {/* Section 5: Status & Remarks */}
      <div className="p-6">
        <SectionHeader
          icon={<LuInfo className="h-4 w-4" />}
          title="Status & Remarks"
          description="Current flight status and additional notes"
        />

        <div className="space-y-4">
          <div className="max-w-xs">
            <Select
              label="Flight Status"
              placeholder="Select status"
              value={values.status}
              onChange={(value) =>
                setFieldValue("status", value as FlightStatus)
              }
              options={FLIGHT_STATUS_OPTIONS}
            />
          </div>

          <Textarea
            label="Remarks (Optional)"
            name="remarks"
            value={values.remarks}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Add any additional notes or special instructions..."
            rows={3}
            error={getError("remarks")}
          />
        </div>
      </div>
    </div>
  );
}
