import type { Lang } from "@/types/language";

export const customServices = {
  title: {
    en: "Custom Services",
    lo: "ບໍລິການພິເສດ",
    zh: "定制服务",
  },
  subtitle: {
    en: "Dedicated services to ensure every passenger travels comfortably and safely, regardless of their individual needs.",
    lo: "ບໍລິການທີ່ຕອບໂຈດທຸກຄວາມຕ້ອງການ ເພື່ອໃຫ້ຜູ້ໂດຍສານທຸກທ່ານເດີນທາງຢ່າງສະດວກສະບາຍ ແລະ ປອດໄພ.",
    zh: "专属服务确保每位旅客无论个人需求如何，都能舒适、安全地出行。",
  },

  // Card 1: Pregnancy & Infants
  pregnancyTitle: {
    en: "Pregnant Women and Infants",
    lo: "ແມ່ຍິງຖືພາ ແລະ ແອນ້ອຍ",
    zh: "孕妇及婴儿服务",
  },
  pregnancyDesc: {
    en: "Airport services and facilities designed to assist pregnant women and families traveling with infants.",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ການບໍລິການທີ່ອອກແບບມາເພື່ອຊ່ວຍເຫຼືອແມ່ຍິງຖືພາ ແລະ ຄອບຄົວທີ່ເດີນທາງກັບແອນ້ອຍ.",
    zh: "为您提供专为孕妇及婴儿乘客量身定制的机场服务与设施概览。",
  },

  // Card 2: Mobility Assistance (REFACTORED LAO)
  mobilityTitle: {
    en: "Mobility Assistance",
    lo: "ບໍລິການຊ່ວຍເຫຼືອຜູ້ສູງອາຍຸ ແລະ ຜູ້ພິການ", // ປັບໃຫ້ສັ້ນ ແລະ ເປັນທາງການຂຶ້ນ
    zh: "无障碍特殊助残服务",
  },
  mobilityDesc: {
    en: "Dedicated assistance and facilities for elderly passengers and travelers with physical disabilities.",
    lo: "ການບໍລິການຊ່ວຍເຫຼືອພິເສດ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກ ສຳລັບຜູ້ສູງອາຍຸ ແລະ ຜູ້ພິການ.",
    zh: "为老年旅客和残疾旅客提供的专用协助及设施。",
  },

  // Card 3: Pets
  petsTitle: {
    en: "Traveling with Pets",
    lo: "ການເດີນທາງກັບສັດລ້ຽງ",
    zh: "携带宠物旅行",
  },
  petsDesc: {
    en: "Important guidelines, documentation, and procedures for passengers traveling with pets.",
    lo: "ຄຳແນະນຳກ່ຽວກັບເອກະສານທີ່ຈໍາເປັນ ແລະ ຂັ້ນຕອນຕ່າງໆ ເມື່ອທ່ານຕ້ອງການເດີນທາງກັບສັດລ້ຽງ.",
    zh: "携带宠物旅行时所需文件和程序的指南。",
  },

  // UI Components
  viewDetails: {
    en: "View Details",
    lo: "ເບິ່ງລາຍລະອຽດ",
    zh: "查看详情",
  },
  categoryLabel: {
    en: "Custom Services",
    lo: "ບໍລິການພິເສດ",
    zh: "定制服务",
  },
} as const;

export type CustomServicesKey = keyof typeof customServices;

export const tCustomServices = (k: CustomServicesKey, lang: Lang) =>
  customServices[k][lang] ?? customServices[k].en;
