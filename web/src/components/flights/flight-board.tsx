import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Lang } from "@/types/language";
import { FilterForm } from "./filter-form";
import { FlightTable } from "./flight-table";
import { LastUpdated } from "./last-updated";
import { Flight, FlightFilters, translations } from "@/data/flight-board";

interface FlightBoardProps {
  type: "departure" | "arrival";
  lang: Lang;
  filters: FlightFilters;
}

// Mock data
const mockFlights: Flight[] = [
  {
    id: "1",
    time: "00:31",
    originalTime: "00:05",
    destination: "Bole (ADDIS ABABA)",
    destinationCode: "ADD",
    airline: "ETHIOPIAN AIRLINES",
    airlineLogo: "🇪🇹",
    flightNumber: "ET673",
    terminal: "T1",
    checkInCounter: "F09-F17",
    gate: "12",
    status: "Departure",
    statusColor: "blue",
  },
  {
    id: "2",
    time: "23:46",
    destination: "COPENHAGEN",
    destinationCode: "CPH",
    airline: "Scandinavian Airlines",
    airlineLogo: "✈️",
    flightNumber: "SK988",
    terminal: "T2",
    checkInCounter: "K21-K29",
    gate: "277",
    status: "Boarding",
    statusColor: "green",
  },
  {
    id: "3",
    time: "23:44",
    destination: "ABU DHABI",
    destinationCode: "AUH",
    airline: "ETIHAD AIRWAYS",
    airlineLogo: "🇦🇪",
    flightNumber: "EY827",
    terminal: "T1",
    checkInCounter: "J26-J35",
    gate: "30",
    status: "Departure",
    statusColor: "blue",
  },
];

function filterFlights(flights: Flight[], filters: FlightFilters): Flight[] {
  let result = [...flights];

  if (filters.terminal && filters.terminal !== "all") {
    result = result.filter((f) => f.terminal === filters.terminal);
  }

  if (filters.destination) {
    result = result.filter((f) => f.destinationCode === filters.destination);
  }

  if (filters.airline) {
    result = result.filter((f) => f.flightNumber.startsWith(filters.airline!));
  }

  if (filters.q) {
    result = result.filter((f) =>
      f.flightNumber
        .toLowerCase()
        .includes(filters.q!.toLowerCase()),
    );
  }

  if (filters.startTime && filters.endTime) {
    result = result.filter((f) => {
      return f.time >= filters.startTime! && f.time <= filters.endTime!;
    });
  }

  return result;
}

export function FlightBoard({ type, lang, filters }: FlightBoardProps) {
  const t = (text: Record<Lang, string>) => text[lang];

  const filteredFlights = filterFlights(mockFlights, filters);

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {type === "departure"
            ? t(translations.title)
            : t(translations.arrivalTitle)}
        </h1>
      </div>

      {/* Information Box */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-700" />
            <span>{t(translations.clickForDetails)}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-700" />
            <span>{t(translations.confirmDetails)}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-700" />
            <div>
              <div className="font-medium">{t(translations.statusInfo)}</div>
              <div className="text-gray-600">
                {t(translations.departureNote)}
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Filters */}
      <FilterForm lang={lang} filters={filters} />

      {/* Action Bar */}
      <div className="mb-4 flex items-center justify-end gap-3 border-b border-gray-200 pb-4">
        <LastUpdated lang={lang} label={t(translations.lastUpdated)} />
        <Link
          href={`/${lang}/flights/${type === "departure" ? "departures" : "arrivals"}`}
          className="text-gray-700 transition-colors hover:text-gray-900"
          aria-label={t(translations.refresh)}
        >
          <RefreshCw className="h-4 w-4" />
        </Link>
      </div>

      {/* Flight Table */}
      <FlightTable flights={filteredFlights} type={type} lang={lang} />
    </div>
  );
}
