import Image from "next/image";
import { Globe, Phone } from "lucide-react";
import { IAirline } from "@/types/flight";
import { Lang } from "@/types/language";
import { asset } from "@/lib";
import { createFlightI18n } from "@/data/i18n/flights";

interface AirlineCardProps {
  airline: IAirline;
  lang: Lang;
}

export function AirlineCard({ airline, lang }: AirlineCardProps) {
  const { airline: t } = createFlightI18n(lang);
  const airlineName = airline.names?.[lang] ?? airline.name;

  return (
    <div className="group flex flex-col rounded-xl bg-white p-5 transition-colors hover:bg-[#f0fbfc]">
      {/* Header: logo + name + code */}
      <div className="flex items-center gap-3">
        {airline.logoFile ? (
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={asset(airline.logoFile.path)}
              alt={airline.name}
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#f0fbfc] font-mono text-base font-bold text-[#00AAAC]">
            {airline.code}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-gray-900">{airlineName}</h3>
          <span className="mt-0.5 inline-flex rounded-full bg-[#f0fbfc] px-2 py-0.5 font-mono text-xs font-semibold text-[#00AAAC]">
            {airline.code}
          </span>
        </div>
      </div>

      {/* Divider */}
      {(airline.website || airline.hotline || airline.phone) && (
        <div className="my-4 border-t border-gray-100" />
      )}

      {/* Contact links */}
      <div className="space-y-2.5">
        {airline.website && (
          <a
            href={airline.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2.5"
          >
            <Globe className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover/link:text-[#00AAAC]" />
            <span className="truncate text-sm text-gray-600 group-hover/link:text-[#00AAAC]">
              {airline.website.replace(/^https?:\/\//, "")}
            </span>
          </a>
        )}

        {airline.hotline && (
          <a
            href={`tel:${airline.hotline}`}
            className="group/link flex items-center gap-2.5"
          >
            <Phone className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover/link:text-[#00AAAC]" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">{t.hotline}</span>
              <span className="font-mono text-sm font-medium text-gray-700 group-hover/link:text-[#00AAAC]">
                {airline.hotline}
              </span>
            </div>
          </a>
        )}

        {airline.phone && (
          <a
            href={`tel:${airline.phone}`}
            className="group/link flex items-center gap-2.5"
          >
            <Phone className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover/link:text-[#00AAAC]" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">{t.contact}</span>
              <span className="font-mono text-sm font-medium text-gray-700 group-hover/link:text-[#00AAAC]">
                {airline.phone}
              </span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
