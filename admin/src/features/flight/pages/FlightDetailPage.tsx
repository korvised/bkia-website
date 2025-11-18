import { useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCalendar,
  LuClock,
  LuInfo,
  LuNetwork,
  LuPencil,
  LuPlane,
  LuPlaneTakeoff,
  LuRailSymbol,
  LuRoute,
} from "react-icons/lu";
import { asset, cn } from "@/lib";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { useGetFlightById } from "../hooks";
import { FlightStatusBadge } from "../components";

export function FlightDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { flight, isLoading, isError, handleBack, handleEdit } =
    useGetFlightById(id!);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          <span className="text-gray-500">Loading flight details...</span>
        </div>
      </div>
    );
  }

  if (isError || !flight) {
    return (
      <div className="p-6">
        <div className="border-danger-200 bg-danger-50 rounded-lg border p-6 text-center">
          <p className="text-danger-700">
            Flight not found or an error occurred.
          </p>
          <button
            onClick={handleBack}
            className="text-primary mt-4 text-sm hover:underline"
          >
            Back to flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <LuArrowLeft className="h-5 w-5" />
          </button>
          <div className="bg-primary-100 rounded-lg p-2">
            <LuRailSymbol className="text-primary h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {flight.flightNo}
              </h1>
              <FlightStatusBadge status={flight.status} />
            </div>
            <p className="text-sm text-gray-500">
              {flight.route.origin.code} → {flight.route.destination.code}
            </p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className={cn(
            "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
            "hover:bg-primary-600 transition-colors",
            "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <LuPencil className="h-4 w-4" />
          Edit Flight
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Flight Route Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <LuRoute className="text-primary h-5 w-5" />
              Route
            </h2>
            <div className="flex items-center justify-between">
              {/* Origin */}
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {flight.route.origin.code}
                </p>
                <p className="text-sm text-gray-500">
                  {flight.route.origin.name}
                </p>
              </div>

              {/* Flight Path */}
              <div className="flex flex-1 items-center px-4">
                <div className="h-px flex-1 bg-gray-300" />
                <div className="bg-primary-100 mx-2 rounded-full p-2">
                  <LuPlane className="text-primary tranform h-4 w-4 rotate-45" />
                </div>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              {/* Destination */}
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {flight.route.destination.code}
                </p>
                <p className="text-sm text-gray-500">
                  {flight.route.destination.name}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                Duration: {flight.route.durationMin} min
              </span>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <LuCalendar className="text-primary h-5 w-5" />
              Schedule
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Departure */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Departure
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatTime(flight.scheduledDepTime)}
                    </p>
                  </div>
                  {flight.actualDepTime && (
                    <div>
                      <p className="text-sm text-gray-500">Actual</p>
                      <p className="text-primary text-lg font-semibold">
                        {formatTime(flight.actualDepTime)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrival */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Arrival
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatTime(flight.scheduledArrTime)}
                    </p>
                  </div>
                  {flight.actualArrTime && (
                    <div>
                      <p className="text-sm text-gray-500">Actual</p>
                      <p className="text-primary text-lg font-semibold">
                        {formatTime(flight.actualArrTime)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Check-in Times */}
            {(flight.checkInStartTime || flight.checkInEndTime) && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Check-in
                </h3>
                <div className="flex gap-4">
                  {flight.checkInStartTime && (
                    <div>
                      <p className="text-sm text-gray-500">Opens</p>
                      <p className="font-medium text-gray-900">
                        {formatTime(flight.checkInStartTime)}
                      </p>
                    </div>
                  )}
                  {flight.checkInEndTime && (
                    <div>
                      <p className="text-sm text-gray-500">Closes</p>
                      <p className="font-medium text-gray-900">
                        {formatTime(flight.checkInEndTime)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Check-in Counters */}
          {flight.checkInCounters && flight.checkInCounters.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <LuNetwork className="text-primary h-5 w-5" />
                Check-in Counters
              </h2>
              <div className="flex flex-wrap gap-2">
                {flight.checkInCounters.map((counter) => (
                  <span
                    key={counter.id}
                    className="bg-secondary-100 text-secondary-700 inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium"
                  >
                    {counter.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Remarks */}
          {flight.remarks && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <LuInfo className="text-primary h-5 w-5" />
                Remarks
              </h2>
              <p className="text-gray-600">{flight.remarks}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Airline Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <LuPlaneTakeoff className="text-primary h-5 w-5" />
              Airline
            </h2>
            <div className="flex items-center gap-3">
              {flight.airline.logoFile && (
                <img
                  src={asset(flight.airline.logoFile.path)}
                  alt={flight.airline.name}
                  className="h-12 w-12 object-contain"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {flight.airline.name}
                </p>
                <p className="text-sm text-gray-500">{flight.airline.code}</p>
              </div>
            </div>
            {(flight.airline.phone ||
              flight.airline.phone ||
              flight.airline.hotline) && (
              <div className="mt-4 space-y-1 text-sm">
                {flight.airline.hotline && (
                  <p className="text-gray-600">
                    Hotline: {flight.airline.hotline}
                  </p>
                )}
                {flight.airline.phone && (
                  <p className="text-gray-600">Phone: {flight.airline.phone}</p>
                )}
              </div>
            )}
          </div>

          {/* Flight Details Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <LuPlane className="text-primary h-5 w-5" />
              Flight Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Operation Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(flight.operationDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {flight.type.toLowerCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Terminal</span>
                <span className="bg-secondary-100 text-secondary-700 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                  {flight.terminal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Gate</span>
                <span className="text-sm font-medium text-gray-900">
                  {flight.gate || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Route Type</span>
                <span className="text-sm font-medium text-gray-900">
                  {flight.route.routeType === "INT"
                    ? "International"
                    : "Domestic"}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <LuClock className="text-primary h-5 w-5" />
              Timestamps
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(flight.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(flight.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
