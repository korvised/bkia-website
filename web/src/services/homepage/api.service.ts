import { fetchJSON } from "@/lib/http";
import type { OpenWeatherResponse } from "@/types/weather";

export function fetchWeather() {
  return fetchJSON<OpenWeatherResponse>("weather");
}
