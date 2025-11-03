"use client";

import { useEffect, useState } from "react";
import { WiCloudy } from "react-icons/wi";
import { cn, fmtTime } from "@/lib";
import { useWeather } from "@/hooks/use-weather";
import { getWeatherIcon, getWeatherIconColor } from "@/lib/get-weather-icon";
import type { Lang } from "@/types/language";
import type { MultilingualText } from "@/types/language";

interface WeatherWidgetProps {
  lang: Lang;
  className?: string;
}

// Translations
const translations: Record<string, MultilingualText> = {
  feelsLike: {
    en: "Feels like",
    lo: "ຮູ້ສຶກເໝືອນ",
    zh: "体感温度",
  },
  loading: {
    en: "Loading...",
    lo: "ກຳລັງໂຫຼດ...",
    zh: "加载中...",
  },
};

// Weather description translations
const weatherDescriptions: Record<string, MultilingualText> = {
  // Clear sky
  "01d": {
    en: "Clear sky",
    lo: "ທ້ອງຟ້າແຈ້ງ",
    zh: "晴空",
  },
  "01n": {
    en: "Clear night",
    lo: "ກາງຄືນແຈ້ງ",
    zh: "晴夜",
  },
  // Few clouds
  "02d": {
    en: "Partly cloudy",
    lo: "ມີເມກບາງສ່ວນ",
    zh: "少云",
  },
  "02n": {
    en: "Partly cloudy",
    lo: "ມີເມກບາງສ່ວນ",
    zh: "少云",
  },
  // Scattered clouds
  "03d": {
    en: "Scattered clouds",
    lo: "ເມກກະຈັດກະຈາຍ",
    zh: "多云",
  },
  "03n": {
    en: "Scattered clouds",
    lo: "ເມກກະຈັດກະຈາຍ",
    zh: "多云",
  },
  // Broken clouds
  "04d": {
    en: "Cloudy",
    lo: "ມີເມກຫຼາຍ",
    zh: "阴天",
  },
  "04n": {
    en: "Cloudy",
    lo: "ມີເມກຫຼາຍ",
    zh: "阴天",
  },
  // Shower rain
  "09d": {
    en: "Light rain",
    lo: "ຝົນປອຍໆ",
    zh: "阵雨",
  },
  "09n": {
    en: "Light rain",
    lo: "ຝົນປອຍໆ",
    zh: "阵雨",
  },
  // Rain
  "10d": {
    en: "Rainy",
    lo: "ຝົນຕົກ",
    zh: "雨天",
  },
  "10n": {
    en: "Rainy",
    lo: "ຝົນຕົກ",
    zh: "雨天",
  },
  // Thunderstorm
  "11d": {
    en: "Thunderstorm",
    lo: "ຝົນຟ້າຮ້ອງ",
    zh: "雷阵雨",
  },
  "11n": {
    en: "Thunderstorm",
    lo: "ຝົນຟ້າຮ້ອງ",
    zh: "雷阵雨",
  },
  // Snow
  "13d": {
    en: "Snowy",
    lo: "ຫິມະຕົກ",
    zh: "下雪",
  },
  "13n": {
    en: "Snowy",
    lo: "ຫິມະຕົກ",
    zh: "下雪",
  },
  // Mist/Fog
  "50d": {
    en: "Foggy",
    lo: "ມີໝອກ",
    zh: "有雾",
  },
  "50n": {
    en: "Foggy",
    lo: "ມີໝອກ",
    zh: "有雾",
  },
};

/**
 * Get localized weather description
 */
const getWeatherDescription = (iconCode: string, lang: Lang): string => {
  return (
    weatherDescriptions[iconCode]?.[lang] || weatherDescriptions["01d"][lang]
  );
};

export default function WeatherWidget({ lang, className }: WeatherWidgetProps) {
  const { weather, loading, error } = useWeather(lang);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = fmtTime(now, lang);
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
          <span className="text-primary-700 text-xs">{currentTime}</span>
        </div>
      </div>

      {/* Right side: Description + Feels Like (hidden on mobile) */}
      <div className="hidden text-right sm:block">
        <p className="text-primary-900 text-sm font-semibold">
          {localizedDescription}
        </p>
        <p className="text-primary-700 text-xs">
          {translations.feelsLike[lang]} {feelsLike}°C
        </p>
      </div>
    </div>
  );
}
