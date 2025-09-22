import { Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
}

interface WeatherSectionProps {
  weather: WeatherData;
}

const WEATHER_ICONS: Record<string, string> = {
  cloud: "⛅",
  rain: "🌧️",
  sun: "☀️",
  default: "🌤️"
};

export default function WeatherSection({ weather }: WeatherSectionProps) {
  const getWeatherIcon = (condition: string): string => {
    if (condition.toLowerCase().includes("cloud")) return WEATHER_ICONS.cloud;
    if (condition.toLowerCase().includes("rain")) return WEATHER_ICONS.rain;
    if (condition.toLowerCase().includes("sun")) return WEATHER_ICONS.sun;
    return WEATHER_ICONS.default;
  };

  return (
    <div className="border-t border-white/20 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-orange-300" />
          <span className="text-2xl font-bold">{weather.temperature}°C</span>
        </div>
        <div className="text-right">
          <div className="text-sm">{weather.condition}</div>
          <div className="text-xs opacity-75">Humidity: {weather.humidity}%</div>
        </div>
      </div>

      {/* Weather Icon */}
      <div className="text-center mt-3">
        <div className="text-3xl">{getWeatherIcon(weather.condition)}</div>
      </div>
    </div>
  );
}
