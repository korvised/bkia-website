import Image from "next/image";
import { Clock, MapPin, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { asset, cn, formatTime } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";
import { IFlight } from "@/types/flight";
import { Lang } from "@/types/language";
import { FlightDirection } from "@/types/enum";
import { getBorderColor, getStatusStyle } from "@/services/flight";
import { FlightTypeBadge } from "./flight-type-badge";

interface FlightCardProps {
  flight: IFlight;
  direction: FlightDirection;
  lang: Lang;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  direction,
  lang,
}) => {
  const { table: t } = createFlightI18n(lang);
  const statusStyle = getStatusStyle(flight.status);
  const borderColor = getBorderColor(flight.status);
  const AIRPORT_CODE = "BOR";

  // Get the relevant airport based on direction
  const airport =
    direction === "departure" ? flight.route.destination : flight.route.origin;

  // Check if the relevant airport is BOR
  const isBOR = airport.code === AIRPORT_CODE;

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

      {/* Time and Destination Section */}
      <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
        {/* Time */}
        <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
          {direction === "departure" ? (
            <PlaneTakeoff className="text-primary-600 h-5 w-5 flex-shrink-0" />
          ) : (
            <PlaneLanding className="text-primary-600 h-5 w-5 flex-shrink-0" />
          )}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatTime(
                direction === "departure"
                  ? flight.actualDepTime || flight.scheduledDepTime
                  : flight.actualArrTime || flight.scheduledArrTime,
              )}
            </span>
            {((direction === "departure" && flight.actualDepTime) ||
              (direction === "arrival" && flight.actualArrTime)) && (
              <span className="text-xs font-medium text-gray-400 line-through">
                {formatTime(
                  direction === "departure"
                    ? flight.scheduledDepTime
                    : flight.scheduledArrTime,
                )}
              </span>
            )}
          </div>
        </div>

        {/* Destination/Origin */}
        <div className="flex flex-1 items-center gap-2">
          <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <div className="flex flex-col">
            <span className="font-lo text-sm font-medium text-gray-900">
              {airport.names[lang] ?? airport.name}
            </span>
            <span
              className={cn(
                "font-mono text-xs font-semibold",
                isBOR ? "text-primary-600" : "text-gray-500",
              )}
            >
              {airport.code}
            </span>
          </div>
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

        {/* Check-in Counter (Departure only) */}
        {direction === "departure" && (
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
        )}
      </div>

      {/* Check-in Time (Departure only) - If exists */}
      {direction === "departure" &&
        flight.checkInStartTime &&
        flight.checkInEndTime && (
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
