"use client";

import { useState, useEffect, useCallback } from "react";
import type { OpenWeatherResponse } from "@/types/weather";
import type { Lang } from "@/types/language";

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

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8080/weather?lang=${lang}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OpenWeatherResponse = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchWeather();

    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
}
