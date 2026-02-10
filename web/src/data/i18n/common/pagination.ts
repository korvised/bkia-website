// /data/i18n/common/pagination.ts
import type { Lang } from "@/types/language";

export const pagination = {
  showing: {
    en: "Showing",
    lo: "ສະແດງ",
    zh: "显示",
  },
  of: {
    en: "of",
    lo: "ຈາກ",
    zh: "共",
  },
  previous: {
    en: "Previous",
    lo: "ກ່ອນໜ້າ",
    zh: "上一页",
  },
  next: {
    en: "Next",
    lo: "ຕໍ່ໄປ",
    zh: "下一页",
  },
  page: {
    en: "Page",
    lo: "ໜ້າ",
    zh: "页",
  },
  results: {
    en: "results",
    lo: "ຜົນລັບ",
    zh: "结果",
  },
} as const;

export type PaginationKey = keyof typeof pagination;

export const tPagination = (k: PaginationKey, lang: Lang) =>
  pagination[k][lang] ?? pagination[k].en;
