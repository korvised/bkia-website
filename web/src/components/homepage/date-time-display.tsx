"use client";

import { Clock, MapPin } from "lucide-react";
import { useDateTime } from "@/hooks/use-date-time";
import { useWeather } from "@/hooks/use-weather";
import { formatDate, formatTime } from "@/lib";

export default function DateTimeDisplay() {
  const currentTime = useDateTime();
  const { temperature } = useWeather();

  return (
    <div className="absolute top-40 left-8 z-20">
      <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 text-white border border-white/20 shadow-xl">
        {/* Location */}
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2 text-bokeo-teal-300" />
          <span className="text-sm font-medium">Bokeo, Laos</span>
        </div>

        {/* Date */}
        <div className="text-xs text-white/80 mb-1">
          {formatDate(currentTime)}
        </div>

        {/* Time */}
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-bokeo-blue-300" />
          <span className="text-2xl font-bold font-mono">{formatTime(currentTime)}</span>
        </div>

        {/* Weather */}
        <div className="text-right mt-2">
          <span className="text-lg font-semibold">{temperature}°C</span>
          <span className="ml-2 text-xl">🌤️</span>
        </div>
      </div>
    </div>
  );
}
