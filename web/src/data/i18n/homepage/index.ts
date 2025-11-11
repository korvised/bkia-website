import { createTranslator } from "@/utils/i18n";
import { Lang } from "@/types/language";
import { hero, type HeroKey } from "./hero";
import { weather, type WeatherKey } from "./weather";

export function createHomepageI18n(lang: Lang) {
  const tWeather = createTranslator<typeof weather, WeatherKey>(weather, lang);
  const tHero = createTranslator<typeof hero, HeroKey>(hero, lang);

  return {
    weather: tWeather,
    hero: tHero,
  };
}

export type { HeroKey, WeatherKey };
