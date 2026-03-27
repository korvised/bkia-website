"use client";

import { useEffect, useMemo, useState } from "react";
import { WiCloudy } from "react-icons/wi";
import { Clock } from "lucide-react";
import { cn, fmtTime } from "@/lib";
import { useWeather } from "@/hooks/use-weather";
import {
  getWeatherIconColor,
  getWeatherIconElement,
} from "@/services/homepage";
import type { Lang } from "@/types/language";
import { createCommonI18n } from "@/data/i18n/common";
import { getWeatherDescription } from "@/data/weather-description";

interface WeatherWidgetProps {
  lang: Lang;
  className?: string;
  /** Use on dark/teal backgrounds — flips all colours to white */
  inverted?: boolean;
}

export default function WeatherWidget({
  lang,
  className,
  inverted = false,
}: WeatherWidgetProps) {
  const { weather, loading, error } = useWeather();
  const [currentTime, setCurrentTime] = useState<string>("");
  const { homepage: t } = createCommonI18n(lang);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(fmtTime(now, lang, "HH:mm"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const { iconEl, temperature, feelsLike, localizedDescription } =
    useMemo(() => {
      const weatherIcon = weather?.weather?.[0]?.icon || "01d";
      const iconColorClass = inverted
        ? "text-white"
        : getWeatherIconColor(weatherIcon);
      const iconEl = getWeatherIconElement(
        weatherIcon,
        cn("h-10 w-10", iconColorClass),
      );
      return {
        iconEl,
        temperature: Math.round(weather?.main?.temp ?? 0),
        feelsLike: Math.round(weather?.main?.feels_like ?? 0),
        localizedDescription: getWeatherDescription(weatherIcon, lang),
      };
    }, [weather, lang, inverted]);

  const containerCls = cn(
    "flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5",
    inverted
      ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-sm"
      : "bg-primary-50/50 ring-1 ring-primary-200/50 shadow-lg backdrop-blur-sm",
    className,
  );

  if (loading) {
    return (
      <div className={containerCls}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-12 w-12 animate-pulse rounded-full",
              inverted ? "bg-white/20" : "bg-primary-200/50",
            )}
          />
          <div className="flex flex-col gap-1.5">
            <div
              className={cn(
                "h-6 w-16 animate-pulse rounded",
                inverted ? "bg-white/20" : "bg-primary-200/50",
              )}
            />
            <div
              className={cn(
                "h-3 w-24 animate-pulse rounded",
                inverted ? "bg-white/20" : "bg-primary-200/50",
              )}
            />
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex flex-col gap-1.5">
            <div
              className={cn(
                "h-4 w-20 animate-pulse rounded",
                inverted ? "bg-white/20" : "bg-primary-200/50",
              )}
            />
            <div
              className={cn(
                "h-3 w-24 animate-pulse rounded",
                inverted ? "bg-white/20" : "bg-primary-200/50",
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={containerCls}>
        <div className="flex items-center gap-3">
          <WiCloudy
            className={cn("h-12 w-12", inverted ? "text-white/60" : "text-gray-400")}
          />
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xl font-bold",
                inverted ? "text-white" : "text-primary-900",
              )}
            >
              --°C
            </span>
            <span
              className={cn(
                "text-xs",
                inverted ? "text-white/60" : "text-primary-700",
              )}
            >
              {currentTime}
            </span>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <span
            className={cn(
              "text-sm font-medium",
              inverted ? "text-white/70" : "text-primary-800",
            )}
          >
            {t.loading}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerCls}>
      {/* Icon + Temperature + Time */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
            inverted ? "bg-white/20" : "bg-white/80",
          )}
        >
          {iconEl}
        </div>
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "text-xl font-bold",
              inverted ? "text-white" : "text-primary-900",
            )}
          >
            {temperature}°C
          </span>
          <div className="flex items-center gap-1">
            <Clock
              className={cn(
                "-mt-0.5 h-3.5 w-3.5",
                inverted ? "text-white/50" : "text-primary-600",
              )}
            />
            <span
              className={cn(
                "text-xs",
                inverted ? "text-white/70" : "text-primary-700",
              )}
            >
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Description + Feels Like */}
      <div className="hidden text-right sm:block">
        <p
          className={cn(
            "mt-1 text-sm font-semibold",
            inverted ? "text-white" : "text-primary-900",
          )}
        >
          {localizedDescription}
        </p>
        <p
          className={cn(
            "mt-1 text-xs",
            inverted ? "text-white/60" : "text-primary-700",
          )}
        >
          {t.feelsLike} {feelsLike}°C
        </p>
      </div>
    </div>
  );
}
