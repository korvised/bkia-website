// src/lib/time.ts
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// locale imports
import "dayjs/locale/lo";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import type { Lang } from "@/types/language";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "Asia/Vientiane";

// Map your app's Lang codes to Day.js locale slugs
const LOCALE_MAP: Record<Lang, string> = {
  lo: "lo",
  en: "en-gb",
  zh: "zh-cn",
  // add others here if your Lang union grows
} as const;

function resolveLocale(lang: Lang) {
  return LOCALE_MAP[lang] ?? "en-gb";
}

// Accept number or Date for convenience
export const fmtDate = (ts: number | Date, lang: Lang) =>
  dayjs(ts).tz(TZ).locale(resolveLocale(lang)).format("LL");

export const fmtTime = (ts: number | Date, lang: Lang) =>
  dayjs(ts).tz(TZ).locale(resolveLocale(lang)).format("HH:mm:ss");
