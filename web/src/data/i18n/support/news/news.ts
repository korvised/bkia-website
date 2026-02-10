import type { Lang } from "@/types/language";

export const news = {
  // Page
  pageTitle: {
    en: "News & Updates",
    lo: "ຂ່າວສານ ແລະ ອັບເດດ",
    zh: "新闻与更新",
  },
  pageDescription: {
    en: "Stay updated with the latest news, announcements, and developments from Bokeo International Airport",
    lo: "ຕິດຕາມຂ່າວສານ, ປະກາດ ແລະ ການພັດທະນາຫຼ້າສຸດຈາກສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "了解博胶国际机场的最新消息、公告和发展动态",
  },

  // Search
  searchPlaceholder: {
    en: "Search news...",
    lo: "ຄົ້ນຫາຂ່າວ...",
    zh: "搜索新闻...",
  },
  searchResultsFound: {
    en: "Found",
    lo: "ພົບ",
    zh: "找到",
  },
  searchResults: {
    en: "article",
    lo: "ບົດຄວາມ",
    zh: "篇文章",
  },
  searchResultsPlural: {
    en: "articles",
    lo: "ບົດຄວາມ",
    zh: "篇文章",
  },
  searchResultsFor: {
    en: "for",
    lo: "ສຳລັບ",
    zh: "关于",
  },
  clearSearch: {
    en: "Clear search",
    lo: "ລຶບການຄົ້ນຫາ",
    zh: "清除搜索",
  },

  // Categories
  categoryAll: {
    en: "All News",
    lo: "ຂ່າວທັງໝົດ",
    zh: "全部新闻",
  },
  categoryAirportUpdate: {
    en: "Airport Updates",
    lo: "ອັບເດດສະໜາມບິນ",
    zh: "机场更新",
  },
  categoryFlightService: {
    en: "Flight Services",
    lo: "ບໍລິການຖ້ຽວບິນ",
    zh: "航班服务",
  },
  categoryEvent: {
    en: "Events",
    lo: "ງານກິດຈະກຳ",
    zh: "活动",
  },
  categoryAnnouncement: {
    en: "Announcements",
    lo: "ປະກາດ",
    zh: "公告",
  },
  categorySustainability: {
    en: "Sustainability",
    lo: "ຄວາມຍືນຍົງ",
    zh: "可持续发展",
  },
  categoryTechnology: {
    en: "Technology",
    lo: "ເທັກໂນໂລຊີ",
    zh: "技术",
  },
  categoryCommunity: {
    en: "Community",
    lo: "ຊຸມຊົນ",
    zh: "社区",
  },

  // Labels
  readMore: {
    en: "Read more",
    lo: "ອ່ານເພີ່ມເຕີມ",
    zh: "阅读更多",
  },
  featuredNews: {
    en: "Featured News",
    lo: "ຂ່າວເດັ່ນ",
    zh: "精选新闻",
  },
  latestNews: {
    en: "Latest News",
    lo: "ຂ່າວຫຼ້າສຸດ",
    zh: "最新新闻",
  },
  views: {
    en: "views",
    lo: "ການເບິ່ງ",
    zh: "次浏览",
  },

  // Empty state
  noNewsFound: {
    en: "No news found",
    lo: "ບໍ່ພົບຂ່າວ",
    zh: "未找到新闻",
  },
  noNewsMessage: {
    en: "Try adjusting your search or browse all news.",
    lo: "ລອງປັບການຄົ້ນຫາ ຫຼື ເບິ່ງຂ່າວທັງໝົດ.",
    zh: "请尝试调整搜索或浏览所有新闻。",
  },

  // Detail page
  backToNews: {
    en: "Back to news",
    lo: "ກັບໄປຫາຂ່າວ",
    zh: "返回新闻",
  },
  viewAllNews: {
    en: "View all news",
    lo: "ເບິ່ງຂ່າວທັງໝົດ",
    zh: "查看所有新闻",
  },
  category: {
    en: "Category",
    lo: "ໝວດໝູ່",
    zh: "类别",
  },
  published: {
    en: "Published",
    lo: "ເຜີຍແຜ່",
    zh: "发布时间",
  },
  author: {
    en: "Author",
    lo: "ຜູ້ຂຽນ",
    zh: "作者",
  },
  relatedTopics: {
    en: "Related Topics",
    lo: "ຫົວຂໍ້ທີ່ກ່ຽວຂ້ອງ",
    zh: "相关主题",
  },

  // Not found page
  newsNotFoundTitle: {
    en: "News Article Not Found",
    lo: "ບໍ່ພົບບົດຄວາມຂ່າວ",
    zh: "未找到新闻文章",
  },
  newsNotFoundMessage: {
    en: "The news article you're looking for doesn't exist or may have been removed.",
    lo: "ບົດຄວາມຂ່າວທີ່ທ່ານຊອກຫາບໍ່ມີຢູ່ ຫຼື ອາດຈະຖືກລຶບອອກແລ້ວ.",
    zh: "您要查找的新闻文章不存在或可能已被删除。",
  },
  goToHomepage: {
    en: "Go to Homepage",
    lo: "ໄປໜ້າຫຼັກ",
    zh: "前往首页",
  },
} as const;

export type NewsKey = keyof typeof news;

export const tNews = (k: NewsKey, lang: Lang) => news[k][lang] ?? news[k].en;
