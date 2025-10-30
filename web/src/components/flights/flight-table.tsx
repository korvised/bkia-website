import Link from "next/link";
import { cn } from "@/lib";
import { Lang } from "@/types/language";
import { Flight, translations } from "@/data/flight-board";

interface FlightTableProps {
  flights: Flight[];
  type: "departure" | "arrival";
  lang: Lang;
}

export function FlightTable({ flights, type, lang }: FlightTableProps) {
  const t = (text: Record<Lang, string>) => text[lang];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-yellow-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-900">
              {type === "departure"
                ? t(translations.departureTime)
                : t(translations.arrivalTime)}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-900">
              {type === "departure" ? t(translations.to) : t(translations.from)}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-900">
              {t(translations.airlineFlightNo)}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-900">
              {t(translations.terminal)}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-900">
              {t(translations.checkInCounter)}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-900">
              {t(translations.gate)}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-900">
              {type === "departure"
                ? t(translations.departureConditions)
                : t(translations.arrivalConditions)}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <tr
                key={flight.id}
                className="border-l-primary-500 border-l-4 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {flight.time}
                    </span>
                    {flight.originalTime && (
                      <span className="text-sm text-blue-500 line-through">
                        {flight.originalTime}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {flight.destination}
                  </div>
                  <div className="text-xs text-gray-500">
                    ({flight.destinationCode})
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/${lang}/flights/detail/${flight.flightNumber}`}
                    className="group flex items-center gap-3"
                  >
                    <span className="text-2xl">{flight.airlineLogo}</span>
                    <div>
                      <div className="group-hover:text-primary-600 text-sm font-medium text-gray-900 transition-colors">
                        {flight.flightNumber}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.airline}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-medium text-gray-900">
                    {flight.terminal}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-medium text-gray-900">
                    {flight.checkInCounter}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-primary-600 text-lg font-bold">
                    {flight.gate}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={cn(
                      "inline-block rounded px-3 py-1 text-sm font-medium text-white",
                      flight.statusColor === "blue" && "bg-primary-500",
                      flight.statusColor === "green" && "bg-green-500",
                      flight.statusColor === "yellow" && "bg-yellow-500",
                      flight.statusColor === "red" && "bg-red-500",
                      flight.statusColor === "gray" && "bg-gray-500",
                    )}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                {t(translations.noFlights)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
