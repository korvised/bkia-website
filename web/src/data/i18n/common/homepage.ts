import type { Lang } from "@/types/language";

export const homepage = {
  title: {
    en: "Bokeo International Airport - Gateway to Laos",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ - ປະຕູສູ່ ສປປ ລາວ",
    zh: "博胶国际机场 - 通往老挝的门户",
  },
  description: {
    en: "Experience seamless travel and premium facilities at Bokeo International Airport, your modern gateway to Northern Laos.",
    lo: "ສຳຜັດກັບປະສົບການການເດີນທາງທີ່ສະດວກສະບາຍ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກທີ່ທັນສະໄໝ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ, ປະຕູສູ່ພາກເໜືອຂອງລາວ.",
    zh: "在博胶国际机场体验顺畅的旅行和现代化的设施，这里是您进入老挝北部的现代门户。",
  },

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
