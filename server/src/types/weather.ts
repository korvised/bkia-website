export interface OpenWeatherCoord {
  lon: number;
  lat: number;
}

export interface OpenWeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface OpenWeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface OpenWeatherClouds {
  all: number;
}

export interface OpenWeatherSys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherResponse {
  coord: OpenWeatherCoord;
  weather: OpenWeatherWeather[];
  base: string;
  main: OpenWeatherMain;
  visibility: number;
  wind: OpenWeatherWind;
  clouds?: OpenWeatherClouds;
  dt: number;
  sys: OpenWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
