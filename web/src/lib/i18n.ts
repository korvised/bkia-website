// src/lib/i18n.ts
import { Lang } from "@/types/language";

// Import translation files
import enTranslations from "@/data/translations/en.json";
import loTranslations from "@/data/translations/lo.json";
import zhTranslations from "@/data/translations/zh.json";

type TranslationKey = string;

export const translations = {
  en: enTranslations,
  lo: loTranslations,
  zh: zhTranslations,
} as const;

export function getTranslation(lang: Lang, key: TranslationKey): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  // Fallback to English if translation not found
  if (!value && lang !== "en") {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
    }
  }

  return value || key;
}

export function useTranslations(lang: Lang) {
  return {
    t: (key: TranslationKey) => getTranslation(lang, key),
    lang,
  };
}
