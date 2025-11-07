import { Lang, LanguageConfig, MultilingualText } from "@/types/language";
import { languages } from "@/constants";

export function isValidLanguage(lang: string): lang is Lang {
  return ["en", "lo", "zh"].includes(lang);
}

export function getLanguageConfig(lang: Lang): LanguageConfig {
  return languages.find((l) => l.code === lang) || languages[0];
}

export function getLocalizedText(text: MultilingualText, lang: Lang): string {
  return text[lang] || text.en;
}

export const defaultLanguage: Lang = "en";
export const supportedLanguages: Lang[] = languages.map((lang) => lang.code);
