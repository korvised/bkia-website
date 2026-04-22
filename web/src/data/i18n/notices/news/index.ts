import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { news, type NewsKey, tNews } from "./news";

export function createNewsI18n(lang: Lang) {
  const newsT = createTranslator<typeof news, NewsKey>(news, lang);

  return {
    news: newsT,
  };
}

export { news, tNews };
export type { NewsKey };
