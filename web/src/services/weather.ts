import { config } from "@/config";
import { fetchJSON } from "@/services/http";
import type { OpenWeatherResponse } from "@/types/weather";

export function fetchWeather() {
  return fetchJSON<OpenWeatherResponse>(`${config.apiBaseUrl}/weather`);
}
