import { Lang, MultilingualText } from "@/types/language";

export const weatherDescriptions: Record<string, MultilingualText> = {
  // Clear sky
  "01d": {
    en: "Clear sky",
    lo: "ທ້ອງຟ້າແຈ້ງ",
    zh: "晴空",
  },
  "01n": {
    en: "Clear night",
    lo: "ກາງຄືນແຈ້ງ",
    zh: "晴夜",
  },
  // Few clouds
  "02d": {
    en: "Partly cloudy",
    lo: "ມີເມກບາງສ່ວນ",
    zh: "少云",
  },
  "02n": {
    en: "Partly cloudy",
    lo: "ມີເມກບາງສ່ວນ",
    zh: "少云",
  },
  // Scattered clouds
  "03d": {
    en: "Scattered clouds",
    lo: "ເມກກະຈັດກະຈາຍ",
    zh: "多云",
  },
  "03n": {
    en: "Scattered clouds",
    lo: "ເມກກະຈັດກະຈາຍ",
    zh: "多云",
  },
  // Broken clouds
  "04d": {
    en: "Cloudy",
    lo: "ມີເມກຫຼາຍ",
    zh: "阴天",
  },
  "04n": {
    en: "Cloudy",
    lo: "ມີເມກຫຼາຍ",
    zh: "阴天",
  },
  // Shower rain
  "09d": {
    en: "Light rain",
    lo: "ຝົນປອຍໆ",
    zh: "阵雨",
  },
  "09n": {
    en: "Light rain",
    lo: "ຝົນປອຍໆ",
    zh: "阵雨",
  },
  // Rain
  "10d": {
    en: "Rainy",
    lo: "ຝົນຕົກ",
    zh: "雨天",
  },
  "10n": {
    en: "Rainy",
    lo: "ຝົນຕົກ",
    zh: "雨天",
  },
  // Thunderstorm
  "11d": {
    en: "Thunderstorm",
    lo: "ຝົນຟ້າຮ້ອງ",
    zh: "雷阵雨",
  },
  "11n": {
    en: "Thunderstorm",
    lo: "ຝົນຟ້າຮ້ອງ",
    zh: "雷阵雨",
  },
  // Snow
  "13d": {
    en: "Snowy",
    lo: "ຫິມະຕົກ",
    zh: "下雪",
  },
  "13n": {
    en: "Snowy",
    lo: "ຫິມະຕົກ",
    zh: "下雪",
  },
  // Mist/Fog
  "50d": {
    en: "Foggy",
    lo: "ມີໝອກ",
    zh: "有雾",
  },
  "50n": {
    en: "Foggy",
    lo: "ມີໝອກ",
    zh: "有雾",
  },
};

/**
 * Get localized weather description
 */
export const getWeatherDescription = (iconCode: string, lang: Lang): string => {
  return (
    weatherDescriptions[iconCode]?.[lang] || weatherDescriptions["01d"][lang]
  );
};
