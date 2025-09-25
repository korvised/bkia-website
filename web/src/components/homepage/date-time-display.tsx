"use client";

import { Clock, MapPin, RefreshCw } from "lucide-react";
import { useDateTime } from "@/hooks/use-date-time";
import { useWeather } from "@/hooks/use-weather";
import { describeWeather, fmtDate, fmtTime } from "@/lib";
import type { Lang } from "@/types/language";

function tError(lang: Lang) {
  return lang === "lo"
    ? "ບໍ່ສາມາດໂຫລດອາກາດ"
    : lang === "zh"
      ? "无法加载天气"
      : "Can't load weather";
}
function placeLabel(lang: Lang) {
  return lang === "lo"
    ? "ຕົ້ນເຜິ້ງ, ບໍ່ແກ້ວ, ລາວ"
    : lang === "zh"
      ? "Ton Pheung, Bokeo, Laos"
      : "Ton Pheung, Bokeo, Laos";
}

export default function DateTimeDisplay({ lang }: { lang: Lang }) {
  const now = useDateTime();
  const { data, isLoading, isError, refetch } = useWeather();

  const weatherContent = (() => {
    if (isLoading) {
      return (
        <div className="mt-2 flex items-center justify-center gap-2 md:justify-end">
          <div className="h-4 w-16 animate-pulse rounded bg-white/20 md:h-5 md:w-20" />
          <div className="h-4 w-8 animate-pulse rounded bg-white/20 md:h-5 md:w-10" />
        </div>
      );
    }
    if (isError || !data) {
      return (
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-red-200 md:justify-end">
          <span className="text-center">{tError(lang)}</span>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-1 rounded border border-white/20 px-2 py-1 transition-colors hover:bg-white/10"
            title="Retry"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      );
    }
    const { icon, text } = describeWeather(data.weather_code, lang);
    return (
      <div className="mt-2 flex items-center justify-center gap-2 md:justify-end">
        <span className="text-lg md:text-xl">{icon}</span>
        <span className="text-xs md:text-sm">{text}</span>
        <span className="text-base font-semibold md:text-lg">
          {data.temperature}°C
        </span>
        <span className="text-xs text-white/70">• {data.humidity}% RH</span>
      </div>
    );
  })();

  return (
    <>
      {/* Mobile version - top center */}
      <div className="absolute top-[4.5rem] left-1/2 z-20 -translate-x-1/2 md:hidden">
        <div className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-white shadow-xl backdrop-blur-md">
          {/* Compact mobile layout */}
          <div className="flex items-center justify-center gap-2 text-center">
            <Clock className="text-bokeo-blue-300 h-4 w-4" />
            <div>
              <div className="text-xs leading-tight text-white/80">
                {fmtDate(now, lang)}
              </div>
              <div className="font-mono text-lg leading-tight font-bold">
                {fmtTime(now, lang)}
              </div>
            </div>
          </div>

          {/* Simplified weather for mobile */}
          {!isLoading && !isError && data && (
            <div className="mt-1 flex items-center justify-center gap-1 text-xs">
              <span className="text-sm">
                {describeWeather(data.weather_code, lang).icon}
              </span>
              <span className="font-medium">{data.temperature}°C</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop version - top left */}
      <div className="absolute top-40 left-8 z-20 hidden md:block">
        <div className="rounded-xl border border-white/20 bg-black/20 p-4 text-white shadow-xl backdrop-blur-md">
          {/* Location */}
          <div className="mb-2 flex items-center">
            <MapPin className="text-bokeo-teal-300 mr-2 h-4 w-4" />
            <span className="text-sm font-medium">{placeLabel(lang)}</span>
          </div>

          {/* Date */}
          <div className="mb-1 text-center text-xs text-white/80">
            {fmtDate(now, lang)}
          </div>

          {/* Time */}
          <div className="flex items-center">
            <Clock className="text-bokeo-blue-300 mr-2 h-5 w-5" />
            <span className="font-mono text-2xl font-bold">
              {fmtTime(now, lang)}
            </span>
          </div>

          {/* Weather */}
          {weatherContent}
        </div>
      </div>
    </>
  );
}
