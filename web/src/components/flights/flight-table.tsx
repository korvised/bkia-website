"use client";

import { Flight } from "@/types/flight";
import { useLanguage } from "@/context";
import { flightTranslations } from "@/data/translations/flights";
import { FlightStatusBadge } from "./flight-status-badge";

interface FlightTableProps {
  flights: Flight[];
  type: "departure" | "arrival";
}

export function FlightTable({ flights, type }: FlightTableProps) {
  const { t } = useLanguage();

  const isDeparture = type === "departure";

  return (
    <div className="horizontal-scroll overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.flightNumber)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.aircraft)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.airline)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {isDeparture
                ? t(flightTranslations.table.destination)
                : t(flightTranslations.table.origin)}
            </th>
            {flights.some((f) => f.stopover1) && (
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                {t(flightTranslations.table.stopover1)}
              </th>
            )}
            {flights.some((f) => f.stopover2) && (
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                {t(flightTranslations.table.stopover2)}
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.scheduled)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.estimated)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.actual)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.gate)}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              {t(flightTranslations.table.status)}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {flights.map((flight) => (
            <tr key={flight.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {flight.flightNumber}
                </div>
                {flight.airlineCode && (
                  <div className="text-sm text-gray-500">
                    {flight.airlineCode}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.aircraft}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.airline}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {isDeparture ? flight.destination : flight.origin}
              </td>
              {flights.some((f) => f.stopover1) && (
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  {flight.stopover1 || ""}
                </td>
              )}
              {flights.some((f) => f.stopover2) && (
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  {flight.stopover2 || ""}
                </td>
              )}
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.scheduledTime}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.estimatedTime || "-"}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.actualTime || "-"}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {flight.gate || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <FlightStatusBadge status={flight.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
