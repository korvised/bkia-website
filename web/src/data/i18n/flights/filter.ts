import type { Lang } from "@/types/language";

export const filter = {
  searchPlaceholder: {
    en: "Flight no., city or airline",
    lo: "ເລກຖ້ຽວບິນ, ເມືອງ ຫຼື ສາຍການບິນ",
    zh: "航班号、城市或航空公司",
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
