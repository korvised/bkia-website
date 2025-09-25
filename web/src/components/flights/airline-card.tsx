import { Airline } from "@/types/flight";
import { useLanguage } from "@/context/language-context";
import { flightTranslations } from "@/data/translations/flights";
import { ExternalLink, Phone } from "lucide-react";

interface AirlineCardProps {
  airline: Airline;
}

export function AirlineCard({ airline }: AirlineCardProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {airline.name[lang]}
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            {t(flightTranslations.airline.code)}: {airline.code}
          </p>

          {airline.servicePhone && (
            <div className="mb-2 flex items-center text-sm text-gray-600">
              <Phone className="mr-2 h-4 w-4" />
              <span className="font-medium">
                {t(flightTranslations.airline.serviceHotline)}:
              </span>
              <span className="ml-2">{airline.servicePhone}</span>
            </div>
          )}

          <div className="mb-2 flex items-center text-sm text-gray-600">
            <Phone className="mr-2 h-4 w-4" />
            <span className="font-medium">
              {t(flightTranslations.airline.contact)}:
            </span>
            <span className="ml-2">{airline.phone}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <ExternalLink className="mr-2 h-4 w-4" />
            <span className="font-medium">
              {t(flightTranslations.airline.website)}:
            </span>
            <a
              href={airline.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bokeo-teal-600 hover:text-bokeo-teal-800 ml-2 hover:underline"
            >
              {airline.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
