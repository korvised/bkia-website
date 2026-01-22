import type { Lang } from "@/types/language";

export const departureNav = {
  // Tab labels
  checkin: {
    en: "Check-in",
    lo: "ແຈ້ງປີ້",
    zh: "办理登机",
  },
  baggage: {
    en: "Baggage",
    lo: "ກະເປົາເດີນທາງ",
    zh: "行李",
  },
  security: {
    en: "Security Check",
    lo: "ຈຸດກວດຄົ້ນ",
    zh: "安检",
  },
  immigration: {
    en: "Immigration",
    lo: "ກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检",
  },
  boarding: {
    en: "Boarding",
    lo: "ຂຶ້ນເຮືອບິນ",
    zh: "登机",
  },

  // UI text
  stepOf: {
    en: "Step {current} of {total}",
    lo: "ຂັ້ນຕອນ {current} ຈາກ {total}",
    zh: "第 {current} 步，共 {total} 步",
  },
} as const;

export type DepartureNavKey = keyof typeof departureNav;

export const tDepartureNav = (k: DepartureNavKey, lang: Lang) =>
  departureNav[k][lang] ?? departureNav[k].en;
