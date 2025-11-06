import { Fragment } from "react";
import Image from "next/image";
import { Clock, Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { LuMoveRight } from "react-icons/lu";
import { cn } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";
import { asset } from "@/utils/asset";
import { formatDate, formatTime } from "@/utils/date";
import { getBorderColor, getStatusStyle, getTypeStyle } from "@/utils/flight";
import type { Lang } from "@/types/language";
import { FlightDirection, FlightType } from "@/types/enum";
import type { IFlight } from "@/types/flight";

interface FlightTableProps {
  lang: Lang;
  direction?: FlightDirection;
  flights: IFlight[];
}

// Flight type badge
const FlightTypeBadge = ({ type }: { type: FlightType }) => {
  const style = getTypeStyle(type);
  const Icon = style.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
      )}
    >
      <Icon className="h-3 w-3" />
      {style.label}
    </span>
  );
};

// Mobile Card Component
const FlightCard = ({
  flight,
  direction,
  lang,
}: {
  flight: IFlight;
  direction: FlightDirection;
  lang: Lang;
}) => {
  const { table: t } = createFlightI18n(lang);
  const statusStyle = getStatusStyle(flight.status);
  const borderColor = getBorderColor(flight.status);

  return (
    <div
      className={cn(
        "grid gap-y-4 rounded-lg border-l-4 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
        borderColor,
      )}
    >
      {/* Header: Airline Info */}
      <div className="flex items-center justify-between gap-3">
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
            <span className="text-xs text-gray-500">{flight.airline.name}</span>
          </div>{" "}
        </div>

        {/* Status */}
        <div className="flex justify-end">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase",
              statusStyle.bg,
              statusStyle.text,
              statusStyle.border,
            )}
          >
            {flight.status}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-x-6">
        {/* Time Section */}
        <div className="flex items-center gap-2">
          {direction === "departure" ? (
            <PlaneTakeoff className="text-primary-600 h-5 w-5" />
          ) : (
            <PlaneLanding className="text-primary-600 h-5 w-5" />
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
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

        {/* Route Section */}
        <div className="flex w-52 items-center gap-2 rounded-lg bg-gray-50 p-3 sm:w-72">
          <div className="flex-1">
            <div className="font-lo text-sm font-medium text-gray-900">
              {flight.route.origin.name}
            </div>
            <div className="font-mono text-xs text-gray-500">
              {flight.route.origin.code}
            </div>
          </div>
          <LuMoveRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
          <div className="flex-1 text-right">
            <div className="font-lo text-sm font-medium text-gray-900">
              {flight.route.destination.name}
            </div>
            <div className="font-mono text-xs text-gray-500">
              {flight.route.destination.code}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex",
          direction === "departure" && flight.checkInCounters.length
            ? "justify-between"
            : "justify-end",
        )}
      >
        {/* Check-in Counters (Departure only) */}
        {direction === "departure" && (
          <div>
            <div className="mb-1 text-xs font-medium text-gray-500">
              {t.checkInCounter}
            </div>
            {flight.checkInCounters.length > 0 ? (
              <div className="flex flex-wrap items-center gap-x-4">
                <div className="flex flex-wrap gap-1">
                  {flight.checkInCounters.map((counter) => (
                    <span
                      key={counter.id}
                      className="bg-primary-100 text-primary-800 inline-flex h-5 w-5 items-center justify-center rounded-md text-xs font-semibold"
                    >
                      {counter.name}
                    </span>
                  ))}
                </div>
                {flight.checkInStartTime && flight.checkInEndTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {formatTime(flight.checkInStartTime)} -{" "}
                      {formatTime(flight.checkInEndTime)}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400">-</span>
            )}
          </div>
        )}

        {/* Operation Date */}
        <div>
          <div className="mb-1 text-xs font-medium text-gray-500">
            {t.operationDate}
          </div>
          <p className="text-right text-xs font-semibold text-gray-700">
            {formatDate(flight.operationDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export function FlightTable({ lang, direction, flights }: FlightTableProps) {
  const { table: t } = createFlightI18n(lang);

  return (
    <Fragment>
      {/* Desktop Table - Hidden on mobile */}
      <div className="horizontal-scroll hidden overflow-x-auto rounded-lg border border-gray-200 shadow-sm lg:block">
        <table className="w-full">
          <thead className="from-primary-50 to-secondary-50 bg-gradient-to-r">
            <tr className="border-l-primary-50 border-l-4">
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {direction === "departure" ? t.departureTime : t.arrivalTime}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.route}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.airlineFlightNo}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.operationDate}
              </th>
              {direction === "departure" && (
                <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                  {t.checkInCounter}
                </th>
              )}
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.status}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {flights.length > 0 ? (
              flights.map((flight) => {
                const statusStyle = getStatusStyle(flight.status);
                const borderColor = getBorderColor(flight.status);

                return (
                  <tr key={flight.id} className={cn("border-l-4", borderColor)}>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {direction === "departure" ? (
                            <PlaneTakeoff className="text-primary-600 h-4 w-4" />
                          ) : (
                            <PlaneLanding className="text-primary-600 h-4 w-4" />
                          )}
                          <span className="text-lg font-bold text-gray-900">
                            {formatTime(
                              direction === "departure"
                                ? flight.actualDepTime ||
                                    flight.scheduledDepTime
                                : flight.actualArrTime ||
                                    flight.scheduledArrTime,
                            )}
                          </span>
                        </div>
                        {((direction === "departure" && flight.actualDepTime) ||
                          (direction === "arrival" &&
                            flight.actualArrTime)) && (
                          <span className="ml-6 text-xs font-medium text-gray-400 line-through">
                            {formatTime(
                              direction === "departure"
                                ? flight.scheduledDepTime
                                : flight.scheduledArrTime,
                            )}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-lo text-sm font-medium text-gray-900">
                            {flight.route.origin.name}
                          </div>
                          <div className="font-mono text-xs text-gray-500">
                            {flight.route.origin.code}
                          </div>
                        </div>
                        <LuMoveRight className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-lo text-sm font-medium text-gray-900">
                            {flight.route.destination.name}
                          </div>
                          <div className="font-mono text-xs text-gray-500">
                            {flight.route.destination.code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
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
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              {flight.flightNo}
                            </span>
                            <FlightTypeBadge type={flight.type} />
                          </div>
                          <span className="text-xs text-gray-500">
                            {flight.airline.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {formatDate(flight.operationDate)}
                      </span>
                    </td>
                    {direction === "departure" && (
                      <td className="px-4 py-3">
                        <div className="flex flex-col items-center gap-1.5">
                          {flight.checkInCounters.length > 0 ? (
                            <>
                              <div className="flex flex-wrap justify-center gap-1">
                                {flight.checkInCounters.map((counter) => (
                                  <span
                                    key={counter.id}
                                    className="bg-primary-100 text-primary-800 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold"
                                  >
                                    {counter.name}
                                  </span>
                                ))}
                              </div>
                              {flight.checkInStartTime &&
                                flight.checkInEndTime && (
                                  <span className="text-xs text-gray-500">
                                    {formatTime(flight.checkInStartTime)} -{" "}
                                    {formatTime(flight.checkInEndTime)}
                                  </span>
                                )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase",
                            statusStyle.bg,
                            statusStyle.text,
                            statusStyle.border,
                          )}
                        >
                          {flight.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={direction === "departure" ? 6 : 5}
                  className="px-4 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Plane className="h-12 w-12 text-gray-300" />
                    <span className="text-sm font-medium text-gray-500">
                      {t.noFlights}
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="space-y-4 lg:hidden">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              direction={direction}
              lang={lang}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white py-12">
            <Plane className="h-12 w-12 text-gray-300" />
            <span className="text-sm font-medium text-gray-500">
              {t.noFlights}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
}
