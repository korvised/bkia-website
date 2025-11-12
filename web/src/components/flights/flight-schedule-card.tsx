import Image from "next/image";
import { ArrowRight, Clock, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { createFlightI18n } from "@/data/i18n/flights";
import { cn } from "@/utils/cn";
import { IFlight } from "@/types/flight";
import { Lang } from "@/types/language";
import { formatTime } from "@/utils/date";
import { getBorderColor, getStatusStyle } from "@/lib/flights";
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
        "grid gap-y-3 rounded-sm border-l-4 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
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

      {/* Combined Time and Route Section - Single Row */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
        {/* Departure Time & Location */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <PlaneTakeoff
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isDepartureBOR ? "text-primary-600" : "text-gray-400",
              )}
            />
            <div className="flex flex-col">
              <span className="text-lg leading-tight font-bold text-gray-900">
                {formatTime(flight.actualDepTime || flight.scheduledDepTime)}
              </span>
              {flight.actualDepTime && (
                <span className="text-xs font-medium text-gray-400 line-through">
                  {formatTime(flight.scheduledDepTime)}
                </span>
              )}
            </div>
          </div>
          <div className="ml-6">
            <div className="font-lo text-xs font-medium text-gray-700">
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
        </div>

        {/* Arrow Separator */}
        <div className="flex flex-col items-center">
          <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>

        {/* Arrival Time & Location */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-end gap-2">
            <div className="flex flex-col items-end">
              <span className="text-lg leading-tight font-bold text-gray-900">
                {formatTime(flight.actualArrTime || flight.scheduledArrTime)}
              </span>
              {flight.actualArrTime && (
                <span className="text-xs font-medium text-gray-400 line-through">
                  {formatTime(flight.scheduledArrTime)}
                </span>
              )}
            </div>
            <PlaneLanding
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isArrivalBOR ? "text-primary-600" : "text-gray-400",
              )}
            />
          </div>
          <div className="mr-6 text-right">
            <div className="font-lo text-xs font-medium text-gray-700">
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
      </div>

      {/* Terminal, Gate, and Check-in Counter Row */}
      <div className="flex items-stretch gap-3">
        {/* Terminal */}
        <div className="flex gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <div className="flex flex-col gap-y-1.5">
            <span className="text-xs font-medium text-gray-500">
              {t.terminal}
            </span>
            <span className="text-center text-sm font-bold text-gray-900">
              {flight.terminal}
            </span>
          </div>
        </div>

        {/* Gate */}
        <div className="flex gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <div className="flex flex-col gap-y-1.5">
            <span className="text-xs font-medium text-gray-500">{t.gate}</span>
            <span className="text-center text-sm font-bold text-gray-900">
              {flight.gate ?? "-"}
            </span>
          </div>
        </div>

        {/* Check-in Counter */}
        {flight.checkInCounters.length > 0 && (
          <div className="flex flex-1 rounded-md border border-gray-200 bg-white px-3 py-2">
            <div className="flex w-full flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-500">
                {t.checkInCounter}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {flight.checkInCounters.map((counter) => (
                  <span
                    key={counter.id}
                    className="bg-primary-100 text-primary-800 rounded-md px-2 py-0.5 text-xs font-semibold"
                  >
                    {counter.name}
                  </span>
                ))}
              </div>
              {/* Check-in Time - clean design like the image */}
              {flight.checkInStartTime && flight.checkInEndTime && (
                <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatTime(flight.checkInStartTime)} -{" "}
                    {formatTime(flight.checkInEndTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
