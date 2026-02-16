import type { Lang } from "@/types/language";

export const customServices = {
  title: {
    en: "Custom Services",
    lo: "ບໍລິການພິເສດ",
    zh: "定制服务",
  },
  subtitle: {
    en: "Dedicated services to ensure every passenger travels comfortably and safely, regardless of their individual needs.",
    lo: "ບໍລິການພິເສດເພື່ອຮັບປະກັນວ່າຜູ້ໂດຍສານທຸກທ່ານ ເດີນທາງຢ່າງສະດວກສະບາຍ ແລະ ປອດໄພ ບໍ່ວ່າຈະມີຄວາມຕ້ອງການສ່ວນຕົວໃດກໍ່ຕາມ.",
    zh: "专属服务确保每位旅客无论个人需求如何，都能舒适、安全地出行。",
  },
  pregnancyTitle: {
    en: "Accompanied by Pregnant Women and Infants or Children",
    lo: "ການບໍລິການສຳລັບແມ່ຍິງຖືພາ, ເດັກອ່ອນ ຫຼື ເດັກນ້ອຍ",
    zh: "孕妇、婴儿或儿童陪同服务",
  },
  pregnancyDesc: {
    en: "An overview of airport services tailored for passengers traveling with pregnant women, infants, and young children.",
    lo: "ລວມຂໍ້ມູນການບໍລິການພາຍໃນສະໜາມບິນ ທີ່ອອກແບບມາເພື່ອອຳນວຍຄວາມສະດວກໃຫ້ແກ່ຜູ້ໂດຍສານທີ່ເດີນທາງກັບແມ່ຍິງຖືພາ ແລະ ເດັກນ້ອຍ.",
    zh: "为您提供专为孕妇、婴儿和幼儿乘客量身定制的机场服务概览。",
  },
  mobilityTitle: {
    en: "Accompanied by Persons with Mobility Challenges (Persons with Disabilities and Elderly)",
    lo: "ການບໍລິການສຳລັບຜູ້ທີ່ມີຄວາມລຳບາກໃນການເຄື່ອນໄຫວ (ຜູ້ພິການ ແລະ ຜູ້ສູງອາຍຸ)",
    zh: "行动不便者（残疾人和老年人）陪同服务",
  },
  mobilityDesc: {
    en: "Information on in-airport services designed to assist persons with disabilities and elderly travelers.",
    lo: "ຂໍ້ມູນກ່ຽວກັບການບໍລິການພາຍໃນສະໜາມບິນ ທີ່ອອກແບບມາເພື່ອຊ່ວຍເຫຼືອຜູ້ພິການ ແລະ ຜູ້ໂດຍສານສູງອາຍຸ.",
    zh: "有关旨在协助残疾人和老年旅客的机场服务信息。",
  },
  petsTitle: {
    en: "Traveling with Pets",
    lo: "ການເດີນທາງກັບສັດລ້ຽງ",
    zh: "携带宠物旅行",
  },
  petsDesc: {
    en: "Guide to the necessary documents and procedures when traveling with pets.",
    lo: "ຄຳແນະນຳກ່ຽວກັບເອກະສານທີ່ຈໍາເປັນ ແລະ ຂັ້ນຕອນຕ່າງໆ ເມື່ອທ່ານຕ້ອງການເດີນທາງກັບສັດລ້ຽງ.",
    zh: "携带宠物旅行时所需文件和程序的指南。",
  },
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
