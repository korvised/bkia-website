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
        <div className="mt-2 flex items-center justify-end gap-2">
          <div className="h-5 w-20 animate-pulse rounded bg-white/20" />
          <div className="h-5 w-10 animate-pulse rounded bg-white/20" />
        </div>
      );
    }
    if (isError || !data) {
      return (
        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-red-200">
          <span>{tError(lang)}</span>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-1 rounded border border-white/20 px-2 py-1 hover:bg-white/10"
            title="Retry"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      );
    }
    const { icon, text } = describeWeather(data.weather_code, lang);
    return (
      <div className="mt-2 flex items-center justify-end gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm">{text}</span>
        <span className="text-lg font-semibold">{data.temperature}°C</span>
        <span className="text-xs text-white/70">• {data.humidity}% RH</span>
      </div>
    );
  })();

  return (
    <div className="absolute top-40 left-8 z-20">
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
  );
}
