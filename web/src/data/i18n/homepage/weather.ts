export const weather = {
  feelsLike: {
    en: "Feels like",
    lo: "ຮູ້ສຶກຄື",
    zh: "体感温度",
  },
  loading: {
    en: "Loading...",
    lo: "ກຳລັງໂຫຼດ...",
    zh: "加载中...",
  },
} as const;

export type WeatherKey = keyof typeof weather;
