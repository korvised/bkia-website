"use client";

import { useEffect, useState } from "react";
import { WiCloudy } from "react-icons/wi";
import { Clock } from "lucide-react";
import { cn, fmtTime } from "@/lib";
import { useWeather } from "@/hooks/use-weather";
import { getWeatherIcon, getWeatherIconColor } from "@/lib/get-weather-icon";
import type { Lang } from "@/types/language";
import type { MultilingualText } from "@/types/language";
import { getWeatherDescription } from "@/data/weather-description";

interface WeatherWidgetProps {
  lang: Lang;
  className?: string;
}

// Translations
const translations: Record<string, MultilingualText> = {
  feelsLike: {
    en: "Feels like",
    lo: "ຮູ້ສຶກຄື",
    zh: "体感温度",
  },
  loading: {
    en: "Loading...",
    lo: "ກຳລັງໂຫຼດ...",
    zh: "加载中...",
  },
};

export default function WeatherWidget({ lang, className }: WeatherWidgetProps) {
  const { weather, loading, error } = useWeather(lang);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = fmtTime(now, lang, "HH:mm");
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [lang]);

  // Skeleton loading state
  if (loading) {
    return (
      <div
        className={cn(
          "bg-primary-50/50 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 shadow-lg backdrop-blur-sm",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-200/50 h-12 w-12 animate-pulse rounded-full" />
          <div className="flex flex-col gap-1.5">
            <div className="bg-primary-200/50 h-6 w-16 animate-pulse rounded" />
            <div className="bg-primary-200/50 h-3 w-24 animate-pulse rounded" />
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex flex-col gap-1.5">
            <div className="bg-primary-200/50 h-4 w-20 animate-pulse rounded" />
            <div className="bg-primary-200/50 h-3 w-24 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error state - show fallback with cloud icon
  if (error || !weather) {
    return (
      <div
        className={cn(
          "bg-primary-50/50 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 shadow-lg backdrop-blur-sm",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <WiCloudy className="h-12 w-12 text-gray-400" />
          <div className="flex flex-col">
            <span className="text-primary-900 text-xl font-bold">--°C</span>
            <span className="text-primary-700 text-xs">{currentTime}</span>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <span className="text-primary-800 text-sm font-medium">
            {translations.loading[lang]}
          </span>
        </div>
      </div>
    );
  }

  // Get weather data
  const weatherIcon = weather.weather[0]?.icon || "01d";
  const WeatherIconComponent = getWeatherIcon(weatherIcon);
  const iconColorClass = getWeatherIconColor(weatherIcon);
  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);

  // Use our own localized description
  const localizedDescription = getWeatherDescription(weatherIcon, lang);

  return (
    <div
      className={cn(
        "bg-primary-50/50 ring-primary-200/50 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 shadow-lg ring-1 backdrop-blur-sm",
        className,
      )}
    >
      {/* Left side: Icon + Temperature + Time */}
      <div className="flex items-center gap-3">
        {/* Weather Icon - Colorful and bigger */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/80">
          <WeatherIconComponent className={cn("h-10 w-10", iconColorClass)} />
        </div>

        {/* Temperature and Time */}
        <div className="flex flex-col leading-tight">
          <span className="text-primary-900 text-xl font-bold">
            {temperature}°C
          </span>
          <div className="flex items-center gap-1">
            <Clock className="text-primary-600 -mt-0.5 h-3.5 w-3.5" />
            <span className="text-primary-700 text-xs">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Right side: Description + Feels Like (hidden on mobile) */}
      <div className="hidden text-right sm:block">
        <p className="text-primary-900 mt-1 text-sm font-semibold">
          {localizedDescription}
        </p>
        <p className="text-primary-700 mt-1 text-xs">
          {translations.feelsLike[lang]} {feelsLike}°C
        </p>
      </div>
    </div>
  );
}
