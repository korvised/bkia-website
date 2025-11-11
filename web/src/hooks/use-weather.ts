"use client";

import { useState, useEffect, useCallback } from "react";
import type { OpenWeatherResponse } from "@/types/weather";
import type { Lang } from "@/types/language";
import { fetchWeather } from "@/services/weather";

interface UseWeatherResult {
  weather: OpenWeatherResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWeather(lang: Lang): UseWeatherResult {
  const [weather, setWeather] = useState<OpenWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetch();

    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weather, loading, error, refetch: fetch };
}
