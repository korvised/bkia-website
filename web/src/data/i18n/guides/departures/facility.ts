import type { Lang } from "@/types/language";

export const facilities = {
  eyebrow: {
    en: "BKIA — Services",
    lo: "BKIA — ການບໍລິການ",
    zh: "BKIA — 机场服务",
  },
  title: {
    en: "Airport Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "机场设施",
  },
  subtitle: {
    en: "A guide to the facilities available at the airport to ensure your comfort and convenience.",
    lo: "ລວມສິ່ງອຳນວຍຄວາມສະດວກຕ່າງໆ ພາຍໃນສະໜາມບິນ ເພື່ອຄວາມສະດວກສະບາຍຂອງທ່ານ.",
    zh: "为您提供机场各项设施指引，确保您的旅程舒适便捷。",
  },
  facilitiesCount: {
    en: "facilities available",
    lo: "ລາຍການທັງໝົດ",
    zh: "项设施",
  },
} as const;

export type FacilitiesKey = keyof typeof facilities;

export const tFacilities = (k: FacilitiesKey, lang: Lang) =>
  facilities[k][lang] ?? facilities[k].en;
