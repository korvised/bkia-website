"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
}

export function useWeather(updateInterval: number = 10 * 60 * 1000) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Mock weather data - replace with actual weather API
        const mockWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
          condition: "Partly Cloudy",
          humidity: Math.floor(Math.random() * 20) + 60 // 60-80%
        };
        setWeather(mockWeather);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, updateInterval);

    return () => clearInterval(weatherTimer);
  }, [updateInterval]);

  return weather;
}
