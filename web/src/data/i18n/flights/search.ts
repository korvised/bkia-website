import type { Lang } from "@/types/language";

export const search = {
  title: {
    en: "Search for",
    lo: "ຄົ້ນຫາ",
    zh: "搜索",
  },
  subtitle: {
    en: "Departures and Arrivals",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ",
    zh: "出发和到达航班",
  },
  pickDate: {
    en: "Pick Date",
    lo: "ເລືອກວັນທີ",
    zh: "选择日期",
  },
  searchInputTitle: {
    en: "Search Flights",
    lo: "ຄົ້ນຫາຖ້ຽວບິນ",
    zh: "航班搜索",
  },
  searchPlaceholder: {
    en: "Enter flight number, airline or city",
    lo: "ໃສ່ເລກຖ້ຽວບິນ, ສາຍການບິນ ຫຼື ເມືອງ",
    zh: "输入航班号、航空公司或城市",
  },
};

export type SearchKey = keyof typeof search;
export const tSearch = (k: SearchKey, lang: Lang) =>
  search[k][lang] ?? search[k].en;
