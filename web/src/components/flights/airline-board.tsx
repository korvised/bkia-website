import { Lang } from "@/types/language";
import { IAirline } from "@/types/flight";
import { AirlineCard } from "./airline-card";
import { Search } from "lucide-react";
import { createFlightI18n } from "@/data/i18n/flights";

interface AirlineBoardProps {
  lang: Lang;
  airlines: IAirline[];
}

export function AirlineBoard({ lang, airlines }: AirlineBoardProps) {
  const { airline: t } = createFlightI18n(lang);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.pageTitle}
        </h1>
      </div>

      {/* Information Box */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-gray-700">{t.contactInfo}</p>
      </div>

      {/* Airlines Grid */}
      {airlines.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {airlines.map((airline) => (
            <AirlineCard key={airline.id} lang={lang} airline={airline} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-12">
          <Search className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">{t.noAirlines}</p>
          <p className="mt-1 text-xs text-gray-400">
            {t.noAirlinesDescription}
          </p>
        </div>
      )}
    </div>
  );
}
