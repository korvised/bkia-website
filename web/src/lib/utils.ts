import { type ClassValue, clsx } from "clsx";
import { Lang, languages } from "@/types/language";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getLanguageDirection(lang: Lang): "ltr" | "rtl" {
  const config = languages.find((l) => l.code === lang);
  return config?.dir || "ltr";
}

export function getLanguageNativeName(lang: Lang): string {
  const config = languages.find((l) => l.code === lang);
  return config?.nativeName || lang;
}

export function formatNumber(number: number, lang: Lang): string {
  const locale = lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US";
  return new Intl.NumberFormat(locale).format(number);
}

export function formatCurrency(
  amount: number,
  currency: string,
  lang: Lang,
): string {
  const locale = lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatTime(date: Date, lang: Lang): string {
  const locale = lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: lang === "en",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
