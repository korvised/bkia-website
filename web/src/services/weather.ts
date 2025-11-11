import { API_BASE_URL, fetchJSON } from "@/services/http";
import type { OpenWeatherResponse } from "@/types/weather";

export function fetchWeather() {
  return fetchJSON<OpenWeatherResponse>(`${API_BASE_URL}/weather`);
}
