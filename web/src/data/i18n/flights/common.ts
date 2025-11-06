import type { Lang } from "@/types/language";

export const common = {
  departure: { en: "Departure", lo: "ຂາອອກ", zh: "出发" },
  arrival: { en: "Arrival", lo: "ຂາເຂົ້າ", zh: "到达" },
} as const;

export type CommonKey = keyof typeof common;
export const tCommon = (k: CommonKey, lang: Lang) =>
  common[k][lang] ?? common[k].en;
