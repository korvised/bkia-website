import type { Lang } from "@/types/language";

export const airline = {
  // Page titles
  pageTitle: {
    en: "Airlines",
    lo: "ສາຍການບິນ",
    zh: "航空公司",
  },
  pageDescription: {
    en: "Find information about airlines operating at our airport",
    lo: "ຊອກຫາຂໍ້ມູນກ່ຽວກັບສາຍການບິນທີ່ບິນມາທີ່ສະໜາມບິນຂອງພວກເຮົາ",
    zh: "查找在我们机场运营的航空公司信息",
  },

  // Information
  contactInfo: {
    en: "Contact airlines directly for bookings, flight changes, and customer service inquiries.",
    lo: "ຕິດຕໍ່ສາຍການບິນໂດຍກົງສໍາລັບການຈອງ, ການປ່ຽນແປງຖ້ຽວບິນ ແລະ ການສອບຖາມບໍລິການລູກຄ້າ.",
    zh: "直接联系航空公司进行预订、航班变更和客户服务咨询。",
  },

  // Stats
  totalAirlines: {
    en: "Total Airlines:",
    lo: "ສາຍການບິນທັງໝົດ:",
    zh: "航空公司总数:",
  },

  // Contact fields
  website: {
    en: "Website",
    lo: "ເວັບໄຊທ໌",
    zh: "网站",
  },
  hotline: {
    en: "Hotline",
    lo: "ສາຍດ່ວນ",
    zh: "热线",
  },
  contact: {
    en: "Contact",
    lo: "ຕິດຕໍ່",
    zh: "联系方式",
  },
  phone: {
    en: "Phone",
    lo: "ໂທລະສັບ",
    zh: "电话",
  },
  email: {
    en: "Email",
    lo: "ອີເມລ",
    zh: "电子邮件",
  },

  // Status
  active: {
    en: "Active",
    lo: "ເຄື່ອນໄຫວ",
    zh: "活跃",
  },
  inactive: {
    en: "Inactive",
    lo: "ບໍ່ເຄື່ອນໄຫວ",
    zh: "不活跃",
  },

  // Empty state
  noAirlines: {
    en: "No airlines found",
    lo: "ບໍ່ພົບສາຍການບິນ",
    zh: "未找到航空公司",
  },
  noAirlinesDescription: {
    en: "There are currently no airlines available.",
    lo: "ປະຈຸບັນບໍ່ມີສາຍການບິນ.",
    zh: "目前没有可用的航空公司。",
  },

  // Actions
  viewWebsite: {
    en: "View Website",
    lo: "ເບິ່ງເວັບໄຊທ໌",
    zh: "查看网站",
  },
  callNow: {
    en: "Call Now",
    lo: "ໂທດຽວນີ້",
    zh: "立即致电",
  },

  // Additional info
  operatingFlights: {
    en: "Operating Flights",
    lo: "ຖ້ຽວບິນທີ່ດໍາເນີນການ",
    zh: "运营航班",
  },
  destinations: {
    en: "Destinations",
    lo: "ຈຸດໝາຍປາຍທາງ",
    zh: "目的地",
  },
} as const;

export type AirlineKey = keyof typeof airline;

export const tAirline = (k: AirlineKey, lang: Lang) =>
  airline[k][lang] ?? airline[k].en;
