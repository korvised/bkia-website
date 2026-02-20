import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { notices, type NoticesKey, tNotices } from "./notices";
import { lostFound, type LostFoundKey, tLostFound } from "./lost-found";

export function createSupportI18n(lang: Lang) {
  const noticesT = createTranslator<typeof notices, NoticesKey>(notices, lang);
  const lostFoundT = createTranslator<typeof lostFound, LostFoundKey>(
    lostFound,
    lang,
  );

  return {
    notices: noticesT,
    lostFound: lostFoundT,
  };
}

export { notices, tNotices, lostFound, tLostFound };
export type { NoticesKey, LostFoundKey };
