import type { Lang } from "@/types/language";

export const departureNav = {
  // Page Header
  title: {
    en: "Departing from Bokeo International Airport",
    lo: "ຖ້ຽວບິນຂາອອກສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "离境博胶国际机场",
  },
  subtitle: {
    en: "Please follow our step-by-step navigation guide below to ensure a smooth check-in and boarding process for your departure flight.",
    lo: "ກະລຸນາປະຕິບັດຕາມຂັ້ນຕອນການແນະນຳລຸ່ມນີ້ ເພື່ອຊ່ວຍໃຫ້ທ່ານຜ່ານຂັ້ນຕອນການເຊັກອິນ ແລະ ການຂຶ້ນເຄື່ອງໄດ້ຢ່າງສະດວກ ແລະ ວ່ອງໄວ.",
    zh: "请参考以下分步指引，以确保您的值机与登机流程顺畅高效。",
  },

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
