import type { Lang } from "@/types/language";

export const airline = {
  pageTitle: {
    en: "Airlines",
    lo: "ສາຍການບິນ",
    zh: "航空公司",
  },
  contactInfo: {
    en: "Contact airlines directly for bookings, flight changes, and customer service inquiries.",
    lo: "ຕິດຕໍ່ສາຍການບິນໂດຍກົງສໍາລັບການຈອງ, ການປ່ຽນແປງຖ້ຽວບິນ ແລະ ການສອບຖາມບໍລິການລູກຄ້າ.",
    zh: "直接联系航空公司进行预订、航班变更和客户服务咨询。",
  },
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
  noAirlines: {
    en: "No Airlines Found",
    lo: "ບໍ່ພົບສາຍການບິນ",
    zh: "未找到航空公司",
  },
  noAirlinesDescription: {
    en: "There are currently no airlines available. Please check back later.",
    lo: "ປະຈຸບັນບໍ່ມີສາຍການບິນທີ່ສາມາດໃຊ້ໄດ້. ກະລຸນາກວດສອບອີກຄັ້ງໃນພາຍຫຼັງ.",
    zh: "目前没有可用的航空公司。请稍后再查看。",
  },
} as const;

export type AirlineKey = keyof typeof airline;

export const tAirline = (k: AirlineKey, lang: Lang) =>
  airline[k][lang] ?? airline[k].en;
