import Image from "next/image";
import { ArrowRight, Clock, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { LuMoveRight } from "react-icons/lu";
import { createFlightI18n } from "@/data/i18n/flights";
import { cn } from "@/utils/cn";
import { IFlight } from "@/types/flight";
import { Lang } from "@/types/language";
import { formatDate, formatTime } from "@/utils/date";
import { getBorderColor, getStatusStyle } from "@/utils/flight";
import { asset } from "@/utils/asset";
import { FlightTypeBadge } from "./flight-type-badge";

interface FlightScheduleCardProps {
  flight: IFlight;
  lang: Lang;
}

export const FlightScheduleCard: React.FC<FlightScheduleCardProps> = ({
  flight,
  lang,
}) => {
  const { table: t } = createFlightI18n(lang);
  const statusStyle = getStatusStyle(flight.status);
  const borderColor = getBorderColor(flight.status);
  const AIRPORT_CODE = "BOR";

  // Determine if origin or destination is BOR for color coding
  const isDepartureBOR = flight.route.origin.code === AIRPORT_CODE;
  const isArrivalBOR = flight.route.destination.code === AIRPORT_CODE;

  return (
    <div
      className={cn(
        "grid gap-y-3 rounded-lg border-l-4 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
        borderColor,
      )}
    >
      {/* Header: Airline Info and Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {flight.airline.logoFile ? (
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={asset(flight.airline.logoFile.path)}
                alt={flight.airline.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-600">
              {flight.airline.code}
            </div>
          )}
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900">
                {flight.flightNo}
              </span>
              <FlightTypeBadge type={flight.type} />
            </div>
            <span className="text-xs text-gray-500">
              {flight.airline.names[lang] ?? flight.airline.name}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-end">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
              statusStyle.bg,
              statusStyle.text,
              statusStyle.border,
            )}
          >
            {flight.status}
          </span>
        </div>
      </div>

      {/* Time Section */}
      <div className="flex items-center justify-center gap-3 rounded-lg bg-gray-50 p-3">
        {/* Departure Time */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <PlaneTakeoff
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isDepartureBOR ? "text-primary-600" : "text-gray-400",
              )}
            />
            <span className="text-lg font-bold text-gray-900">
              {formatTime(flight.actualDepTime || flight.scheduledDepTime)}
            </span>
          </div>
          {flight.actualDepTime && (
            <span className="ml-6 text-xs font-medium text-gray-400 line-through">
              {formatTime(flight.scheduledDepTime)}
            </span>
          )}
        </div>

        {/* Arrow Separator */}
        <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-300" />

        {/* Arrival Time */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <PlaneLanding
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isArrivalBOR ? "text-primary-600" : "text-gray-400",
              )}
            />
            <span className="text-lg font-bold text-gray-900">
              {formatTime(flight.actualArrTime || flight.scheduledArrTime)}
            </span>
          </div>
          {flight.actualArrTime && (
            <span className="ml-6 text-xs font-medium text-gray-400 line-through">
              {formatTime(flight.scheduledArrTime)}
            </span>
          )}
        </div>
      </div>

      {/* Route Section */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
        <div className="flex-1 text-left">
          <div className="font-lo text-sm font-medium text-gray-900">
            {flight.route.origin.names[lang] ?? flight.route.origin.name}
          </div>
          <div
            className={cn(
              "font-mono text-xs font-semibold",
              isDepartureBOR ? "text-primary-600" : "text-gray-500",
            )}
          >
            {flight.route.origin.code}
          </div>
        </div>
        <LuMoveRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <div className="flex-1 text-right">
          <div className="font-lo text-sm font-medium text-gray-900">
            {flight.route.destination.names[lang] ??
              flight.route.destination.name}
          </div>
          <div
            className={cn(
              "font-mono text-xs font-semibold",
              isArrivalBOR ? "text-primary-600" : "text-gray-500",
            )}
          >
            {flight.route.destination.code}
          </div>
        </div>
      </div>

      {/* Operation Date */}
      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            {t.operationDate}
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {formatDate(flight.operationDate)}
          </span>
        </div>
      </div>

      {/* Terminal, Gate, and Check-in Counter Row */}
      <div className="flex items-center gap-3">
        {/* Terminal */}
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-gray-500">
              {t.terminal}
            </span>
            <span className="text-center text-sm font-bold text-gray-900">
              {flight.terminal}
            </span>
          </div>
        </div>

        {/* Gate */}
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-gray-500">{t.gate}</span>
            <span className="text-center text-sm font-bold text-gray-900">
              {flight.gate ?? "-"}
            </span>
          </div>
        </div>

        {/* Check-in Counter */}
        <div className="flex flex-1 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500">
              {t.checkInCounter}
            </span>
            {flight.checkInCounters.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {flight.checkInCounters.map((counter) => (
                  <span
                    key={counter.id}
                    className="bg-primary-100 text-primary-800 rounded-md px-1.5 py-0.5 text-xs font-semibold"
                  >
                    {counter.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm font-bold text-gray-400">-</span>
            )}
          </div>
        </div>
      </div>

      {/* Check-in Time - If exists */}
      {flight.checkInStartTime && flight.checkInEndTime && (
        <div className="flex items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 py-2 text-xs text-gray-600">
          <Clock className="h-3.5 w-3.5 text-gray-500" />
          <span className="font-medium">
            {t.checkInTime}:{" "}
            <span className="font-semibold">
              {formatTime(flight.checkInStartTime)} -{" "}
              {formatTime(flight.checkInEndTime)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};
