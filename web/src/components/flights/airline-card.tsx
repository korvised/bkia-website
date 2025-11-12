import Image from "next/image";
import { Globe, Phone } from "lucide-react";
import { IAirline } from "@/types/flight";
import { Lang } from "@/types/language";
import { asset } from "@/utils/asset";
import { createFlightI18n } from "@/data/i18n/flights";

interface AirlineCardProps {
  airline: IAirline;
  lang: Lang;
}

export function AirlineCard({ airline, lang }: AirlineCardProps) {
  const { airline: t } = createFlightI18n(lang);
  const airlineName = airline.names?.[lang] ?? airline.name;

  return (
    <div className="group hover:border-primary-300 relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
        {airline.logoFile ? (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
            <Image
              src={asset(airline.logoFile.path)}
              alt={airline.name}
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        ) : (
          <div className="from-primary-100 to-primary-50 text-primary-700 ring-primary-200 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-2xl font-bold shadow-sm ring-1">
            {airline.code}
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <h3 className="truncate text-lg font-bold text-gray-900">
            {airlineName}
          </h3>
          <span className="bg-primary-100 text-primary-700 mt-1 inline-flex items-center rounded-md px-2.5 py-0.5 font-mono text-sm font-semibold">
            {airline.code}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-1 flex-col gap-2 p-6">
        {/* Website */}
        {airline.website && (
          <a
            href={airline.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div className="group-hover/link:bg-primary-100 group-hover/link:text-primary-600 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-colors">
              <Globe className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {t.website}
              </p>
              <p className="group-hover/link:text-primary-600 mt-0.5 truncate text-sm font-medium text-gray-900">
                {airline.website.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </a>
        )}

        {/* Hotline */}
        {airline.hotline && (
          <a
            href={`tel:${airline.hotline}`}
            className="group/link flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div className="group-hover/link:bg-primary-100 group-hover/link:text-primary-600 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-colors">
              <Phone className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {t.hotline}
              </p>
              <p className="group-hover/link:text-primary-600 mt-0.5 font-mono text-sm font-medium text-gray-900">
                {airline.hotline}
              </p>
            </div>
          </a>
        )}

        {/* Phone/Contact */}
        {airline.phone && (
          <a
            href={`tel:${airline.phone}`}
            className="group/link flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div className="group-hover/link:bg-primary-100 group-hover/link:text-primary-600 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-colors">
              <Phone className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {t.contact}
              </p>
              <p className="group-hover/link:text-primary-600 mt-0.5 font-mono text-sm font-medium text-gray-900">
                {airline.phone}
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
