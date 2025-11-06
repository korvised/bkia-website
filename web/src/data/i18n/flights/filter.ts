import type { Lang } from "@/types/language";

export const filter = {
  lastUpdated: {
    en: "Last Updated",
    lo: "ອັບເດດລ່າສຸດ",
    zh: "最后更新",
  },
  refresh: {
    en: "Refresh",
    lo: "ໂຫຼດຂໍ້ມູນໃໝ່",
    zh: "刷新",
  },
  enterFlightNo: {
    en: "Enter flight No.",
    lo: "ປ້ອນເລກຖ້ຽວບິນ",
    zh: "输入航班号",
  },
  search: {
    en: "Search",
    lo: "ຄົ້ນຫາ",
    zh: "搜索",
  },
} as const;

export type FilterKey = keyof typeof filter;
export const tFilter = (k: FilterKey, lang: Lang) =>
  filter[k][lang] ?? filter[k].en;
