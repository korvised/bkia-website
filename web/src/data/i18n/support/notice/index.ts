import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { notices, type NoticesKey, tNotices } from "./notices";

export function createSupportI18n(lang: Lang) {
  const noticesT = createTranslator<typeof notices, NoticesKey>(notices, lang);

  return {
    notices: noticesT,
  };
}

export { notices, tNotices };
export type { NoticesKey };
