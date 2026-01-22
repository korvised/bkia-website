import type { Lang } from "@/types/language";

export const arrivalNav = {
  // Tab labels
  airport: {
    en: "Arrival Airport",
    lo: "ມາຮອດສະໜາມບິນ",
    zh: "抵达机场",
  },
  customsInspection: {
    en: "Customs Inspection",
    lo: "ກວດພາສີ",
    zh: "海关检查",
  },
  borderInspection: {
    en: "Border Inspection",
    lo: "ກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检",
  },
  baggageClaim: {
    en: "Baggage Claim",
    lo: "ຮັບກະເປົາ",
    zh: "行李提取",
  },
  exitCustoms: {
    en: "Exit Customs",
    lo: "ອອກພາສີ",
    zh: "出关",
  },
  leaving: {
    en: "Leaving Airport",
    lo: "ອອກຈາກສະໜາມບິນ",
    zh: "离开机场",
  },

  // UI text
  stepOf: {
    en: "Step {current} of {total}",
    lo: "ຂັ້ນຕອນ {current} ຈາກ {total}",
    zh: "第 {current} 步，共 {total} 步",
  },
} as const;

export type ArrivalNavKey = keyof typeof arrivalNav;

export const tArrivalNav = (k: ArrivalNavKey, lang: Lang) =>
  arrivalNav[k][lang] ?? arrivalNav[k].en;
