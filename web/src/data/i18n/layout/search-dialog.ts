import type { Lang } from "@/types/language";

export const searchDialog = {
  searchPlaceholder: {
    en: "Search for flights, services, information...",
    lo: "ຄົ້ນຫາຖ້ຽວບິນ, ບໍລິການ, ຂໍ້ມູນ...",
    zh: "搜索航班、服务、信息...",
  },
  recentSearches: {
    en: "Recent Searches",
    lo: "ການຄົ້ນຫາລ່າສຸດ",
    zh: "最近搜索",
  },
  popularSearches: {
    en: "Popular Searches",
    lo: "ການຄົ້ນຫາຍອດນິຍົມ",
    zh: "热门搜索",
  },
  noResults: {
    en: "No results found",
    lo: "ບໍ່ພົບຜົນການຄົ້ນຫາ",
    zh: "未找到结果",
  },
  searchResults: {
    en: "Search Results",
    lo: "ຜົນການຄົ້ນຫາ",
    zh: "搜索结果",
  },
  clear: {
    en: "Clear",
    lo: "ລຶບ",
    zh: "清除",
  },
  toNavigate: {
    en: "to navigate",
    lo: "ເພື່ອເລື່ອນ",
    zh: "导航",
  },
  toSelect: {
    en: "to select",
    lo: "ເພື່ອເລືອກ",
    zh: "选择",
  },
  closeHint: {
    en: "to close",
    lo: "ປິດ",
    zh: "关闭",
  },
} as const;

export type SearchDialogKey = keyof typeof searchDialog;

export const tSearchDialog = (k: SearchDialogKey, lang: Lang) =>
  searchDialog[k][lang] ?? searchDialog[k].en;
