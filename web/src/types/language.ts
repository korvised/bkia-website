import { FlagComponent, GB, LA, CH } from "country-flag-icons/react/1x1";

export type Lang = "en" | "lo" | "zh";

export interface MultilingualText {
  en: string;
  lo: string;
  zh: string;
}

export interface MultilingualContent {
  title: MultilingualText;
  description?: MultilingualText;
  content?: MultilingualText;
}

export interface NavigationItem {
  id: string;
  title: MultilingualText;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface LanguageConfig {
  code: Lang;
  name: string;
  nativeName: string;
  flag: FlagComponent;
  dir: "ltr" | "rtl";
}

export const languages: LanguageConfig[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: GB,
    dir: "ltr",
  },
  {
    code: "lo",
    name: "Lao",
    nativeName: "ລາວ",
    flag: LA,
    dir: "ltr",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: CH,
    dir: "ltr",
  },
];

export const defaultLanguage: Lang = "en";

// Utility functions
export function isValidLanguage(lang: string): lang is Lang {
  return ["en", "lo", "zh"].includes(lang);
}

export function getLanguageConfig(lang: Lang): LanguageConfig {
  return languages.find((l) => l.code === lang) || languages[0];
}

export function getLocalizedText(text: MultilingualText, lang: Lang): string {
  return text[lang] || text.en;
}
