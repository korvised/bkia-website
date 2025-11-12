import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiDayShowers,
  WiNightAltShowers,
  WiDayRain,
  WiNightAltRain,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDaySnow,
  WiNightAltSnow,
  WiDayFog,
  WiNightFog,
} from "react-icons/wi";
import { IconType } from "react-icons";

/**
 * Icon color mapping for natural, colorful weather icons
 */
export const weatherIconColors: Record<string, string> = {
  // Clear/Sunny - Golden yellow
  "01d": "text-yellow-400",
  "01n": "text-blue-300",

  // Few clouds - Light blue/gray
  "02d": "text-blue-400",
  "02n": "text-blue-400",

  // Scattered/Broken clouds - Gray
  "03d": "text-gray-400",
  "03n": "text-gray-400",
  "04d": "text-gray-500",
  "04n": "text-gray-500",

  // Rain/Showers - Blue
  "09d": "text-blue-500",
  "09n": "text-blue-500",
  "10d": "text-blue-600",
  "10n": "text-blue-600",

  // Thunderstorm - Dark blue/purple
  "11d": "text-purple-600",
  "11n": "text-purple-600",

  // Snow - Light blue/white
  "13d": "text-blue-200",
  "13n": "text-blue-200",

  // Fog/Mist - Light gray
  "50d": "text-gray-300",
  "50n": "text-gray-300",
};

/**
 * Maps OpenWeatherMap icon codes to react-icons weather icons
 * @param iconCode - OpenWeatherMap icon code (e.g., '01d', '10n')
 * @returns React icon component
 */
export const getWeatherIcon = (iconCode: string): IconType => {
  const iconMap: Record<string, IconType> = {
    // Clear sky
    "01d": WiDaySunny,
    "01n": WiNightClear,

    // Few clouds
    "02d": WiDayCloudy,
    "02n": WiNightAltCloudy,

    // Scattered clouds
    "03d": WiCloudy,
    "03n": WiCloudy,

    // Broken clouds
    "04d": WiCloudy,
    "04n": WiCloudy,

    // Shower rain
    "09d": WiDayShowers,
    "09n": WiNightAltShowers,

    // Rain
    "10d": WiDayRain,
    "10n": WiNightAltRain,

    // Thunderstorm
    "11d": WiDayThunderstorm,
    "11n": WiNightAltThunderstorm,

    // Snow
    "13d": WiDaySnow,
    "13n": WiNightAltSnow,

    // Mist/Fog
    "50d": WiDayFog,
    "50n": WiNightFog,
  };

  return iconMap[iconCode] || WiCloudy;
};

/**
 * Get weather icon color class for the given icon code
 * @param iconCode - OpenWeatherMap icon code
 * @returns Tailwind color class
 */
export const getWeatherIconColor = (iconCode: string): string => {
  return weatherIconColors[iconCode] || "text-gray-400";
};

export function getWeatherIconElement(code: string, className?: string) {
  const Icon = getWeatherIcon(code);
  return <Icon className={className} />;
}
