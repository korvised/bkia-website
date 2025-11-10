import { Fragment } from "react";
import Image from "next/image";
import { Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { cn } from "@/utils/cn";
import { createFlightI18n } from "@/data/i18n/flights";
import { asset } from "@/utils/asset";
import { formatTime } from "@/utils/date";
import { getBorderColor, getStatusStyle } from "@/utils/flight";
import type { Lang } from "@/types/language";
import { FlightDirection } from "@/types/enum";
import type { IFlight } from "@/types/flight";
import { FlightTypeBadge } from "./flight-type-badge";
import { FlightCard } from "./flight-card";

interface FlightTableProps {
  lang: Lang;
  direction: FlightDirection;
  flights: IFlight[];
}

export function FlightTable({ lang, direction, flights }: FlightTableProps) {
  const { table: t } = createFlightI18n(lang);
  const AIRPORT_CODE = "BOR";

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
                {direction === "departure" ? t.destination : t.origin}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.airlineFlightNo}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.terminal}
              </th>
              {direction === "departure" && (
                <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                  {t.checkInCounter}
                </th>
              )}
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.gate}
              </th>
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

                // Get the relevant airport based on direction
                const airport =
                  direction === "departure"
                    ? flight.route.destination
                    : flight.route.origin;

                // Check if the relevant airport is BOR
                const isBOR = airport.code === AIRPORT_CODE;

                return (
                  <tr key={flight.id} className={cn("border-l-4", borderColor)}>
                    {/* Time */}
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

                    {/* Origin/Destination */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="font-lo text-sm font-medium text-gray-900">
                          {airport.names[lang] ?? airport.name}
                        </div>
                        <div
                          className={cn(
                            "font-mono text-xs font-semibold",
                            isBOR ? "text-primary-600" : "text-gray-500",
                          )}
                        >
                          {airport.code}
                        </div>
                      </div>
                    </td>

                    {/* Airline & Flight No */}
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
                            {flight.airline.names[lang] ?? flight.airline.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Terminal */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {flight.terminal}
                      </span>
                    </td>

                    {/* Check-in Counter (Departure only) */}
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

                    {/* Gate */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {flight.gate ?? "-"}
                      </span>
                    </td>

                    {/* Status */}
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
                  colSpan={direction === "departure" ? 7 : 6}
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
