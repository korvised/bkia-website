import type { Lang } from "@/types/language";

export const filter = {
  searchPlaceholder: {
    en: "Flight number, airline or city",
    lo: "ເລກຖ້ຽວບິນ, ສາຍການບິນ ຫຼື ເມືອງ",
    zh: "航班号、航空公司或城市",
  },
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
} as const;

export type FilterKey = keyof typeof filter;
export const tFilter = (k: FilterKey, lang: Lang) =>
  filter[k][lang] ?? filter[k].en;
