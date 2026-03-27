import type { Lang } from "@/types/language";

export const header = {
  viewAll: {
    en: "View all",
    lo: "ເບິ່ງທັງໝົດ",
    zh: "查看全部",
  },
  explore: {
    en: "Explore",
    lo: "ສຳຫຼວດ",
    zh: "探索",
  },
} as const;

export type HeaderKey = keyof typeof header;

export const tHeader = (k: HeaderKey, lang: Lang): string =>
  header[k][lang] ?? header[k].en;
