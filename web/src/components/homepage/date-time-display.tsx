"use client";

import { Clock, RefreshCw } from "lucide-react";
import { useDateTime } from "@/hooks/use-date-time";
import { useWeather } from "@/hooks/use-weather";
import { describeWeather, fmtDate, fmtTime } from "@/lib";
import type { Lang } from "@/types/language";
import { Fragment } from "react";

export default function DateTimeDisplay({ lang }: { lang: Lang }) {
  const now = useDateTime();
  const { data, isLoading, isError, refetch } = useWeather();

  const weatherIcon = (() => {
    if (isLoading)
      return <div className="h-4 w-4 animate-pulse rounded-full bg-white/30" />;
    if (isError || !data) {
      return (
        <button
          onClick={refetch}
          className="group inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-white/20"
          title="Retry weather"
          aria-label="Retry loading weather"
        >
          <RefreshCw className="h-3 w-3 transition-transform group-hover:rotate-180" />
        </button>
      );
    }
    return (
      <span className="text-base">
        {describeWeather(data.weather_code, lang).icon}
      </span>
    );
  })();

  return (
    <Fragment>
      {/* Mobile - Ultra minimal top bar */}
      <div className="letf-6 absolute top-[6rem] left-0 z-20 md:hidden">
        <div className="flex items-center justify-end gap-4 px-6 py-2 text-white">
          {/* Time */}
          <div className="-m-0.5 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-white/70" />
            <time
              className="pt-0.5 font-mono text-sm font-semibold"
              suppressHydrationWarning
            >
              {fmtTime(now, lang)}
            </time>
          </div>

          {/* Weather */}
          <div className="-mt-1.5 flex items-center gap-1.5">
            {weatherIcon}
            {!isLoading && !isError && data && (
              <span className="pt-1.5 font-mono text-sm font-medium">
                {data.temperature}°C
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop - Elegant minimal card */}
      <div className="absolute top-32 left-8 z-20 hidden md:block xl:left-12">
        <div className="space-y-3 text-white">
          {/* Date */}
          <div className="text-xs font-medium tracking-wider text-white/70 uppercase">
            {fmtDate(now, lang)}
          </div>

          {/* Time - Large and prominent */}
          <div className="font-mono text-4xl leading-none font-bold tracking-tight drop-shadow-lg">
            {fmtTime(now, lang)}
          </div>

          {/* Weather - Compact row */}
          {!isLoading && !isError && data && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">
                {describeWeather(data.weather_code, lang).icon}
              </span>
              <span className="font-semibold">{data.temperature}°C</span>
              <span className="text-white/60">·</span>
              <span className="text-xs text-white/60">{data.humidity}% RH</span>
            </div>
          )}

          {/* Weather loading/error states */}
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-white/20" />
              <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
            </div>
          )}

          {isError && (
            <button
              onClick={refetch}
              className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry weather</span>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
