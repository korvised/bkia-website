import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuBuilding2,
  LuCalendar,
  LuClock,
  LuExternalLink,
  LuGlobe,
  LuInfo,
  LuMapPin,
  LuPencil,
  LuPhone,
  LuPlane,
  LuPlaneLanding,
  LuPlaneTakeoff,
  LuRailSymbol,
  LuRoute,
  LuUsers,
} from "react-icons/lu";
import { asset, cn } from "@/lib";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { useGetFlightById } from "../hooks";
import { FlightStatusBadge } from "../components";

export function FlightDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { flight, isLoading, isError, handleBack, handleEdit } =
    useGetFlightById(id!);

  // Calculate duration from actual times if available, otherwise use scheduled times
  const flightDuration = useMemo(() => {
    if (!flight) return { minutes: 0, formatted: "0m" };

    const depTime = flight.actualDepTime || flight.scheduledDepTime;
    const arrTime = flight.actualArrTime || flight.scheduledArrTime;

    if (!depTime || !arrTime) {
      const mins = flight.route.durationMin;
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;

      return {
        minutes: mins,
        formatted:
          mins >= 60
            ? remainingMins > 0
              ? `${hours}h ${remainingMins}m`
              : `${hours}h`
            : `${mins}m`,
      };
    }

    const [depHours, depMinutes] = depTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrTime.split(":").map(Number);

    const depTotalMinutes = depHours * 60 + depMinutes;
    let arrTotalMinutes = arrHours * 60 + arrMinutes;

    // Handle overnight flights
    if (arrTotalMinutes < depTotalMinutes) {
      arrTotalMinutes += 24 * 60;
    }

    const mins = arrTotalMinutes - depTotalMinutes;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    return {
      minutes: mins,
      formatted:
        mins >= 60
          ? remainingMins > 0
            ? `${hours}h ${remainingMins}m`
            : `${hours}h`
          : `${mins}m`,
    };
  }, [flight]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-3 border-t-transparent" />
          <span className="text-gray-500">Loading flight details...</span>
        </div>
      </div>
    );
  }

  if (isError || !flight) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <LuInfo className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-red-900">
            Flight Not Found
          </h3>
          <p className="mb-4 text-red-700">
            The flight you're looking for doesn't exist or an error occurred.
          </p>
          <button
            onClick={handleBack}
            className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back to flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={handleBack}
            className="mt-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <LuArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-lg">
              <LuRailSymbol className="text-primary h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {flight.flightNo}
                </h1>
                <FlightStatusBadge status={flight.status} />
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <span>{flight.airline.name}</span>
                <span>•</span>
                <span>{formatDate(flight.operationDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleEdit}
          className={cn(
            "bg-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white",
            "hover:bg-primary-600 transition-colors",
            "focus:ring-primary/20 focus:ring-2 focus:outline-none",
          )}
        >
          <LuPencil className="h-4 w-4" />
          Edit Flight
        </button>
      </div>

      {/* Route Visual Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Origin */}
          <div className="flex-1 text-center sm:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              <LuPlaneTakeoff className="h-3 w-3" />
              Origin
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {flight.route.origin.code}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {flight.route.origin.name}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatTime(flight.scheduledDepTime)}
            </p>
            {flight.actualDepTime && (
              <p className="text-primary text-sm">
                Actual: {formatTime(flight.actualDepTime)}
              </p>
            )}
          </div>

          {/* Flight Path Visual - Extended */}
          <div className="flex w-full flex-[2] items-center justify-center px-6 sm:w-auto">
            <div className="relative flex w-full items-center">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-200" />
              <div className="bg-primary mx-4 flex-shrink-0 rounded-full p-2.5 shadow-lg">
                <LuPlane className="h-5 w-5 rotate-45 text-white" />
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300" />
            </div>
          </div>

          {/* Destination */}
          <div className="flex-1 text-center sm:text-right">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              <LuPlaneLanding className="h-3 w-3" />
              Destination
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {flight.route.destination.code}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {flight.route.destination.name}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatTime(flight.scheduledArrTime)}
            </p>
            {flight.actualArrTime && (
              <p className="text-primary text-sm">
                Actual: {formatTime(flight.actualArrTime)}
              </p>
            )}
          </div>
        </div>

        {/* Flight Info Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LuClock className="h-4 w-4 text-gray-400" />
            <span>{flightDuration.formatted}</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LuRoute className="h-4 w-4 text-gray-400" />
            <span>
              {flight.route.routeType === "INT" ? "International" : "Domestic"}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LuBuilding2 className="h-4 w-4 text-gray-400" />
            <span>Terminal {flight.terminal}</span>
          </div>
          {flight.gate && (
            <>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LuMapPin className="h-4 w-4 text-gray-400" />
                <span>Gate {flight.gate}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Check-in Information */}
          {(flight.checkInStartTime ||
            flight.checkInEndTime ||
            (flight.checkInCounters && flight.checkInCounters.length > 0)) && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <div className="bg-primary/10 rounded-lg p-1.5">
                  <LuUsers className="text-primary h-4 w-4" />
                </div>
                Check-in Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Check-in Window */}
                {(flight.checkInStartTime || flight.checkInEndTime) && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-gray-500">
                      Check-in Window
                    </h3>
                    <div className="flex items-center gap-4">
                      {flight.checkInStartTime && (
                        <div className="rounded-lg bg-green-50 px-4 py-3 text-center">
                          <p className="text-xs text-green-600">Opens</p>
                          <p className="text-lg font-semibold text-green-700">
                            {formatTime(flight.checkInStartTime)}
                          </p>
                        </div>
                      )}
                      {flight.checkInStartTime && flight.checkInEndTime && (
                        <div className="text-gray-300">→</div>
                      )}
                      {flight.checkInEndTime && (
                        <div className="rounded-lg bg-red-50 px-4 py-3 text-center">
                          <p className="text-xs text-red-600">Closes</p>
                          <p className="text-lg font-semibold text-red-700">
                            {formatTime(flight.checkInEndTime)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Counters */}
                {flight.checkInCounters &&
                  flight.checkInCounters.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-gray-500">
                        Assigned Counters
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {flight.checkInCounters.map((counter) => (
                          <span
                            key={counter.id}
                            className="bg-primary/10 text-primary inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                          >
                            {counter.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Remarks */}
          {flight.remarks && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <div className="bg-primary/10 rounded-lg p-1.5">
                  <LuInfo className="text-primary h-4 w-4" />
                </div>
                Remarks
              </h2>
              <p className="leading-relaxed text-gray-600">{flight.remarks}</p>
            </div>
          )}

          {/* Flight Type Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="bg-primary/10 rounded-lg p-1.5">
                <LuPlane className="text-primary h-4 w-4" />
              </div>
              Flight Details
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Type</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 capitalize">
                  {flight.type.toLowerCase()}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Terminal</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {flight.terminal}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Gate</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {flight.gate || "—"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {flightDuration.formatted}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Airline & Record Info Combined Card */}
          <div className="rounded-xl border border-gray-200 bg-white">
            {/* Airline Section */}
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <div className="bg-primary/10 rounded-lg p-1.5">
                  <LuPlaneTakeoff className="text-primary h-4 w-4" />
                </div>
                Airline
              </h2>

              <div className="flex items-center gap-4">
                {flight.airline.logoFile ? (
                  <img
                    src={asset(flight.airline.logoFile.path)}
                    alt={flight.airline.name}
                    className="h-16 w-16 rounded-lg border border-gray-100 object-contain p-2"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                    <LuPlane className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {flight.airline.name}
                  </p>
                  <p className="text-primary mt-0.5 text-sm font-medium">
                    {flight.airline.code}
                  </p>
                </div>
              </div>

              {(flight.airline.hotline ||
                flight.airline.phone ||
                flight.airline.website) && (
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  {flight.airline.hotline && (
                    <a
                      href={`tel:${flight.airline.hotline}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <LuPhone className="h-4 w-4 text-gray-400" />
                      <span>Hotline: {flight.airline.hotline}</span>
                    </a>
                  )}
                  {flight.airline.phone && (
                    <a
                      href={`tel:${flight.airline.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <LuPhone className="h-4 w-4 text-gray-400" />
                      <span>{flight.airline.phone}</span>
                    </a>
                  )}
                  {flight.airline.website && (
                    <a
                      href={flight.airline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <LuGlobe className="h-4 w-4 text-gray-400" />
                      <span>Website</span>
                      <LuExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Record Info Section */}
            <div className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <div className="bg-primary/10 rounded-lg p-1.5">
                  <LuCalendar className="text-primary h-4 w-4" />
                </div>
                Record Info
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {formatDateTime(flight.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {formatDateTime(flight.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
