"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type WeatherData = {
  temperature: number; // °C
  humidity: number; // %
  weather_code: number; // WMO code
  updatedAt: number;
};

type WeatherResult = {
  data: WeatherData | null;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  refetch: () => void;
};

export function useWeather(updateInterval = 10 * 60 * 1000): WeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | undefined>(undefined);
  const timer = useRef<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("/api/weather", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as WeatherData;
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Weather fetch failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) await load();
    })();

    timer.current = window.setInterval(load, updateInterval);

    return () => {
      mounted = false;
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [load, updateInterval]);

  return {
    data,
    isLoading,
    isError: Boolean(isError),
    error: isError,
    refetch: load,
  };
}
