import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { LuMoveRight } from "react-icons/lu";
import { cn } from "@/utils/cn";
import { createFlightI18n } from "@/data/i18n/flights";
import { asset } from "@/utils/asset";
import { formatTime } from "@/utils/date";
import {
  getBorderColor,
  getFlightDisplayStatus,
  getStatusStyle,
} from "@/lib/flights";
import type { Lang } from "@/types/language";
import type { IFlight } from "@/types/flight";
import { FlightTypeBadge } from "./flight-type-badge";
import { FlightScheduleCard } from "./flight-schedule-card";

interface FlightScheduleTableProps {
  lang: Lang;
  flights: IFlight[];
}

export function FlightScheduleTable({
  lang,
  flights,
}: FlightScheduleTableProps) {
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
                {t.time}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.route}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.airlineFlightNo}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.terminal}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.gate}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.checkInCounter}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold tracking-wide whitespace-nowrap text-gray-700 uppercase">
                {t.status}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {flights.length > 0 ? (
              flights.map((flight) => {
                const { code, labels } = getFlightDisplayStatus(flight);
                const statusStyle = getStatusStyle(code);
                const borderColor = getBorderColor(code);

                // Determine if origin or destination is BOR for color coding
                const isDepartureBOR =
                  flight.route.origin.code === AIRPORT_CODE;
                const isArrivalBOR =
                  flight.route.destination.code === AIRPORT_CODE;

                return (
                  <tr key={flight.id} className={cn("border-l-4", borderColor)}>
                    {/* Departure & Arrival Time */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* Departure Time */}
                        <div className="flex items-center gap-2">
                          <PlaneTakeoff
                            className={cn(
                              "h-4 w-4 flex-shrink-0",
                              isDepartureBOR
                                ? "text-primary-600"
                                : "text-gray-400",
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900">
                              {formatTime(
                                flight.actualDepTime || flight.scheduledDepTime,
                              )}
                            </span>
                            {flight.actualDepTime && (
                              <span className="text-xs font-medium text-gray-400 line-through">
                                {formatTime(flight.scheduledDepTime)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow Separator */}
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300" />

                        {/* Arrival Time */}
                        <div className="flex items-center gap-2">
                          <PlaneLanding
                            className={cn(
                              "h-4 w-4 flex-shrink-0",
                              isArrivalBOR
                                ? "text-primary-600"
                                : "text-gray-400",
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900">
                              {formatTime(
                                flight.actualArrTime || flight.scheduledArrTime,
                              )}
                            </span>
                            {flight.actualArrTime && (
                              <span className="text-xs font-medium text-gray-400 line-through">
                                {formatTime(flight.scheduledArrTime)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="min-w-[80px]">
                          <div className="font-lo text-sm font-medium text-gray-900">
                            {flight.route.origin.names[lang] ??
                              flight.route.origin.name}
                          </div>
                          <div
                            className={cn(
                              "font-mono text-xs font-semibold",
                              isDepartureBOR
                                ? "text-primary-600"
                                : "text-gray-500",
                            )}
                          >
                            {flight.route.origin.code}
                          </div>
                        </div>
                        <LuMoveRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="min-w-[80px] text-right">
                          <div className="font-lo text-sm font-medium text-gray-900">
                            {flight.route.destination.names[lang] ??
                              flight.route.destination.name}
                          </div>
                          <div
                            className={cn(
                              "font-mono text-xs font-semibold",
                              isArrivalBOR
                                ? "text-primary-600"
                                : "text-gray-500",
                            )}
                          >
                            {flight.route.destination.code}
                          </div>
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

                    {/* Gate */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {flight.gate ?? "-"}
                      </span>
                    </td>

                    {/* Check-in Counter */}
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

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-semibold tracking-wide",
                            statusStyle.bg,
                            statusStyle.text,
                            statusStyle.border,
                          )}
                          title={labels[lang] ?? labels.en}
                        >
                          {labels[lang] ?? labels.en}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
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
            <FlightScheduleCard key={flight.id} flight={flight} lang={lang} />
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
