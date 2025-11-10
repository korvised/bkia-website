import { Lang } from "@/types/language";
import { IAirline } from "@/types/flight";
import { AirlineCard } from "./airline-card";
import { Plane } from "lucide-react";
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{t.contactInfo}</p>
      </div>

      {/* Airlines Grid or Empty State */}
      {airlines.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {airlines.map((airline) => (
            <AirlineCard key={airline.id} lang={lang} airline={airline} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Plane className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.noAirlines}
          </h3>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
            {t.noAirlinesDescription}
          </p>
        </div>
      )}
    </div>
  );
}
