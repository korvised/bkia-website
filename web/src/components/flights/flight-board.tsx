import { createFlightI18n } from "@/data/i18n/flights";
import { FlightDirection } from "@/types/enum";
import type { IFlight, QueryFlight } from "@/types/flight";
import { Lang } from "@/types/language";
import type { IPagination } from "@/types/pagination";
import { FilterForm } from "./filter-form";
import { FlightTable } from "./flight-table";

interface FlightBoardProps {
  lang: Lang;
  filters: QueryFlight;
  data: IPagination<IFlight>;
}

export function FlightBoard({ lang, filters, data }: FlightBoardProps) {
  const { board: t } = createFlightI18n(lang);
  const { data: flights } = data;

  const tips = [t.confirmDetails, t.scheduleMayChange, t.lastUpdatedInfo];

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {filters.direction === FlightDirection.DEPARTURE
            ? t.departureTitle
            : t.arrivalTitle}
        </h1>
      </div>

      {/* Information Tip Box */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <ul className="space-y-2 text-sm text-gray-700">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-700" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <FilterForm lang={lang} filters={filters} />

      <FlightTable
        lang={lang}
        direction={filters.direction}
        flights={flights}
      />
    </div>
  );
}
