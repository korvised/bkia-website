import type { Lang } from "@/types/language";

export const relatedServices = {
  title: {
    en: "Related Airport Services",
    lo: "ບໍລິການສະໜາມບິນທີ່ກ່ຽວຂ້ອງ",
    zh: "相关机场服务",
  },
  subtitle: {
    en: "Services available at Bokeo International Airport",
    lo: "ບໍລິການທີ່ມີຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "波乔国际机场提供的服务",
  },
  needHelp: {
    en: "Need Help?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອ?",
    zh: "需要帮助？",
  },
  helpText: {
    en: "Please visit the Information Desk near the entrance Door 03 or call",
    lo: "ກະລຸນາໄປທີ່ເຄົາເຕີປະຊາສຳພັນໃກ້ທາງເຂົ້າປະຕູ 03 ຫຼື ໂທ",
    zh: "请前往入口03号门附近的问询台或致电",
  },
  forAssistance: {
    en: "for assistance.",
    lo: "ເພື່ອຂໍຄວາມຊ່ວຍເຫຼືອ.",
    zh: "寻求帮助。",
  },
  viewDetails: {
    en: "View Details",
    lo: "ເບິ່ງລາຍລະອຽດ",
    zh: "查看详情",
  },
} as const;

export type RelatedServicesKey = keyof typeof relatedServices;

export const tRelatedServices = (k: RelatedServicesKey, lang: Lang) =>
  relatedServices[k][lang] ?? relatedServices[k].en;
