import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { lostFound, type LostFoundKey, tLostFound } from "./lost-found";

export function createLostFoundI18n(lang: Lang) {
  const lostFoundT = createTranslator<typeof lostFound, LostFoundKey>(lostFound, lang);
  return { lostFound: lostFoundT };
}

export { lostFound, tLostFound };
export type { LostFoundKey };
