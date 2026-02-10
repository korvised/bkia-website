import type { Lang } from "@/types/language";

export const homepage = {
  // Hero Session
  announcements: {
    en: "Announcements",
    zh: "公告",
    lo: "ແຈ້ງການ",
  },

  // Weather Session
  feelsLike: {
    en: "Feels like",
    lo: "ຮູ້ສຶກຄື",
    zh: "体感温度",
  },
  loading: {
    en: "Loading...",
    lo: "ກຳລັງໂຫຼດ...",
    zh: "加载中...",
  },

  // Useful Services Section
  usefulServicesTitle: {
    en: "Useful services and information",
    lo: "ບໍລິການ ແລະ ຂໍ້ມູນທີ່ເປັນປະໂຫຍດ",
    zh: "有用的服务和信息",
  },

  // News Section
  latestNewsTitle: {
    en: "Latest News & Updates",
    lo: "ຂ່າວສານ ແລະ ອັບເດດຫຼ້າສຸດ",
    zh: "最新资讯",
  },
  viewAllNews: {
    en: "View all news",
    lo: "ເບິ່ງຂ່າວທັງໝົດ",
    zh: "查看全部新闻",
  },
  readMore: {
    en: "Read more",
    lo: "ອ່ານເພີ່ມເຕີມ",
    zh: "阅读更多",
  },
  featured: {
    en: "Featured",
    lo: "ຂ່າວເດັ່ນ",
    zh: "精选",
  },
} as const;

export type HomepageKey = keyof typeof homepage;

export const tHomepage = (k: HomepageKey, lang: Lang) =>
  homepage[k][lang] ?? homepage[k].en;
