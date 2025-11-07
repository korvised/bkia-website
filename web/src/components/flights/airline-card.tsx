import Image from "next/image";
import { Globe, Mail, Phone } from "lucide-react";
import { IAirline } from "@/types/flight";
import { Lang } from "@/types/language";
import { asset } from "@/utils/asset";
import { cn } from "@/utils/cn";
import { createFlightI18n } from "@/data/i18n/flights";

interface AirlineCardProps {
  airline: IAirline;
  lang: Lang;
}

export function AirlineCard({ airline, lang }: AirlineCardProps) {
  const { airline: t } = createFlightI18n(lang);
  const airlineName = airline.names?.[lang] ?? airline.name;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Header with Logo */}
      <div className="from-primary-50 to-secondary-50 bg-gradient-to-r p-6">
        <div className="flex items-center gap-4">
          {airline.logoFile ? (
            <div className="relative h-16 w-16 flex-shrink-0 rounded-lg bg-white p-2 shadow-sm">
              <Image
                src={asset(airline.logoFile.path)}
                alt={airline.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white text-2xl font-bold text-gray-600 shadow-sm">
              {airline.code}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{airlineName}</h3>
            <p className="text-primary-600 mt-1 font-mono text-sm font-semibold">
              {airline.code}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Website */}
        {airline.website && (
          <a
            href={airline.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:border-primary-300 hover:bg-primary-50 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors"
          >
            <Globe className="h-5 w-5 flex-shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500">{t.website}</p>
              <p className="truncate text-sm font-semibold text-gray-900">
                {airline.website.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </a>
        )}

        {/* Hotline */}
        {airline.hotline && (
          <a
            href={`tel:${airline.hotline}`}
            className="hover:border-primary-300 hover:bg-primary-50 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors"
          >
            <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500">{t.hotline}</p>
              <p className="font-mono text-sm font-semibold text-gray-900">
                {airline.hotline}
              </p>
            </div>
          </a>
        )}

        {/* Phone */}
        {airline.phone && (
          <a
            href={`tel:${airline.phone}`}
            className="hover:border-primary-300 hover:bg-primary-50 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors"
          >
            <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500">{t.contact}</p>
              <p className="font-mono text-sm font-semibold text-gray-900">
                {airline.phone}
              </p>
            </div>
          </a>
        )}

        {/* Status Badge */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
              airline.isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800",
            )}
          >
            {airline.isActive ? t.active : t.inactive}
          </span>
        </div>
      </div>
    </div>
  );
}
