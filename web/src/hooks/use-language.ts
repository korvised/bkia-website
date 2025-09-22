"use client";

import { useLanguage as useLanguageContext } from "@/context/language-context";
import { getTranslation } from "@/lib/i18n";

export function useLanguage() {
  const context = useLanguageContext();

  return {
    ...context,
    t: (key: string) => getTranslation(context.lang, key),
  };
}
