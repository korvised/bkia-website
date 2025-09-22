"use client";

import { Clock, MapPin } from "lucide-react";
import { useDateTime } from "@/hooks/use-date-time";
import { useWeather } from "@/hooks/use-weather";
import { formatDate, formatTime } from "@/lib";
import { Lang } from "@/types/language";

interface DateTimeDisplayProps {
  lang: Lang;
}

export default function DateTimeDisplay({ lang }: DateTimeDisplayProps) {
  const currentTime = useDateTime();
  const { temperature } = useWeather();

  return (
    <div className="absolute top-40 left-8 z-20">
      <div className="rounded-xl border border-white/20 bg-black/20 p-4 text-white shadow-xl backdrop-blur-md">
        {/* Location */}
        <div className="mb-2 flex items-center">
          <MapPin className="text-bokeo-teal-300 mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Bokeo, Laos</span>
        </div>

        {/* Date */}
        <div className="mb-1 text-xs text-white/80">
          {formatDate(currentTime, lang)}
        </div>

        {/* Time */}
        <div className="flex items-center">
          <Clock className="text-bokeo-blue-300 mr-2 h-5 w-5" />
          <span className="font-mono text-2xl font-bold">
            {formatTime(currentTime, lang)}
          </span>
        </div>

        {/* Weather */}
        <div className="mt-2 text-right">
          <span className="text-lg font-semibold">{temperature}°C</span>
          <span className="ml-2 text-xl">🌤️</span>
        </div>
      </div>
    </div>
  );
}
