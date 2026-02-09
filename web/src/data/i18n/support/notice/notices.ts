import type { Lang } from "@/types/language";

export const notices = {
  // Page metadata
  pageTitle: {
    en: "Important Notices",
    lo: "ແຈ້ງການສຳຄັນ",
    zh: "重要通知",
  },
  pageDescription: {
    en: "Stay informed with important updates and announcements from Bokeo International Airport",
    lo: "ຕິດຕາມຂໍ້ມູນອັບເດດ ແລະ ປະກາດສຳຄັນຈາກສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "及时了解博胶国际机场的重要更新和公告",
  },

  // Search
  searchPlaceholder: {
    en: "Search notices...",
    lo: "ຄົ້ນຫາແຈ້ງການ...",
    zh: "搜索通知...",
  },
  searchResultsFound: {
    en: "Found",
    lo: "ພົບ",
    zh: "找到",
  },
  searchResults: {
    en: "result",
    lo: "ຜົນການຄົ້ນຫາ",
    zh: "个结果",
  },
  searchResultsPlural: {
    en: "results",
    lo: "ຜົນການຄົ້ນຫາ",
    zh: "个结果",
  },
  searchResultsFor: {
    en: "for",
    lo: "สຳລັບ",
    zh: "关于",
  },
  clearSearch: {
    en: "Clear search",
    lo: "ລຶບການຄົ້ນຫາ",
    zh: "清除搜索",
  },

  // Categories
  categoryAll: {
    en: "All Notices",
    lo: "ແຈ້ງການທັງໝົດ",
    zh: "全部通知",
  },
  categoryUrgent: {
    en: "Urgent Notices",
    lo: "ແຈ້ງການດ່ວນ",
    zh: "紧急通知",
  },
  categoryHigh: {
    en: "Important Notices",
    lo: "ແຈ້ງການສຳຄັນ",
    zh: "重要通知",
  },
  categoryNormal: {
    en: "General Notices",
    lo: "ແຈ້ງການທົ່ວໄປ",
    zh: "一般通知",
  },

  // Empty states
  noResultsFound: {
    en: "No results found",
    lo: "ບໍ່ພົບຜົນການຄົ້ນຫາ",
    zh: "未找到结果",
  },
  noResultsMessage: {
    en: "Try adjusting your search terms or browse all notices.",
    lo: "ລອງປັບຄຳຄົ້ນຫາຂອງທ່ານ ຫຼື ເບິ່ງແຈ້ງການທັງໝົດ.",
    zh: "请尝试调整搜索词或浏览所有通知。",
  },
  noNoticesAvailable: {
    en: "No notices available",
    lo: "ບໍ່ມີແຈ້ງການ",
    zh: "暂无通知",
  },
  noNoticesMessage: {
    en: "Check back later for updates",
    lo: "ກະລຸນາກວດເບິ່ງອີກຄັ້ງໃນພາຍຫຼັງ",
    zh: "请稍后查看更新",
  },

  // Labels
  publishedOn: {
    en: "Published on",
    lo: "ເຜີຍແຜ່ວັນທີ",
    zh: "发布于",
  },
  effectiveFrom: {
    en: "Effective from",
    lo: "ມີຜົນຕັ້ງແຕ່",
    zh: "生效日期",
  },
  readMore: {
    en: "Read more",
    lo: "ອ່ານເພີ່ມເຕີມ",
    zh: "阅读更多",
  },
} as const;

export type NoticesKey = keyof typeof notices;

export const tNotices = (k: NoticesKey, lang: Lang) =>
  notices[k][lang] ?? notices[k].en;
