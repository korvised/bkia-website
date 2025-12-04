import type { Lang } from "@/types/language";

export const immigration = {
  // Page title
  title: {
    en: "Immigration",
    lo: "ກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检",
  },

  // Introduction
  intro: {
    en: "All passengers departing on international flights must pass through immigration control. Please have your travel documents ready for inspection by immigration officers.",
    lo: "ຜູ້ໂດຍສານທັງໝົດທີ່ອອກເດີນທາງດ້ວຍຖ້ຽວບິນສາກົນຕ້ອງຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງ. ກະລຸນາກະກຽມເອກະສານເດີນທາງໃຫ້ພ້ອມສຳລັບການກວດໂດຍເຈົ້າໜ້າທີ່ ຕມ.",
    zh: "所有乘坐国际航班出发的旅客必须通过边检。请准备好旅行证件以供边检人员检查。",
  },

  // Travel Documents Section
  documentsTitle: {
    en: "Travel Documents",
    lo: "ເອກະສານເດີນທາງ",
    zh: "旅行证件",
  },
  documentsDesc: {
    en: "Please ensure you have the following documents ready before approaching the immigration counter:",
    lo: "ກະລຸນາກວດສອບວ່າທ່ານມີເອກະສານຕໍ່ໄປນີ້ພ້ອມກ່ອນເຂົ້າໄປຫາເຄົາເຕີ້ກວດຄົນເຂົ້າ-ອອກເມືອງ:",
    zh: "请在前往边检柜台前确保准备好以下证件：",
  },

  // Lao Nationals
  laoNationalsTitle: {
    en: "For Lao Nationals",
    lo: "ສຳລັບຄົນລາວ",
    zh: "老挝公民",
  },
  laoPassport: {
    en: "Valid passport",
    lo: "ໜັງສືຜ່ານແດນທີ່ຍັງໃຊ້ໄດ້",
    zh: "有效护照",
  },
  laoIdCard: {
    en: "National ID card",
    lo: "ບັດປະຈຳຕົວ",
    zh: "身份证",
  },
  laoHouseholdReg: {
    en: "Household registration book",
    lo: "ປຶ້ມສຳມະໂນຄົວ",
    zh: "户口簿",
  },
  laoBirthCert: {
    en: "Birth certificate",
    lo: "ໃບຢັ້ງຢືນການເກີດ",
    zh: "出生证明",
  },
  laoResidence: {
    en: "Proof of residence (not older than 3 months)",
    lo: "ໃບຢັ້ງຢືນທີ່ຢູ່ອາໄສ (ບໍ່ເກີນ 3 ເດືອນ)",
    zh: "居住证明（不超过3个月）",
  },

  // Foreigners
  foreignersTitle: {
    en: "For Foreigners",
    lo: "ສຳລັບຄົນຕ່າງປະເທດ",
    zh: "外国公民",
  },
  foreignPassport: {
    en: "Valid passport with appropriate visa",
    lo: "ໜັງສືຜ່ານແດນທີ່ຍັງໃຊ້ໄດ້ພ້ອມວີຊ່າທີ່ເໝາະສົມ",
    zh: "有效护照及相应签证",
  },
  foreignDeparture: {
    en: "Departure card (if applicable)",
    lo: "ບັດຂາອອກ (ຖ້າມີ)",
    zh: "离境卡（如适用）",
  },
  foreignLossReport: {
    en: "Travel document loss report (if applicable)",
    lo: "ໃບແຈ້ງເສຍເອກະສານເດີນທາງ (ຖ້າມີ)",
    zh: "旅行证件遗失报告（如适用）",
  },

  // Immigration Process
  processTitle: {
    en: "Immigration Process",
    lo: "ຂັ້ນຕອນການກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检流程",
  },
  processStep1: {
    en: "Queue at the appropriate counter (Lao nationals / Foreigners)",
    lo: "ລຽນແຖວຢູ່ເຄົາເຕີ້ທີ່ເໝາະສົມ (ຄົນລາວ / ຄົນຕ່າງປະເທດ)",
    zh: "在相应柜台排队（本国公民/外国公民）",
  },
  processStep2: {
    en: "Present your passport and boarding pass to the officer",
    lo: "ສະແດງໜັງສືຜ່ານແດນ ແລະ ບັດຂຶ້ນເຮືອບິນໃຫ້ເຈົ້າໜ້າທີ່",
    zh: "向边检人员出示护照和登机牌",
  },
  processStep3: {
    en: "Answer any questions clearly and honestly",
    lo: "ຕອບຄຳຖາມຢ່າງຊັດເຈນ ແລະ ຊື່ສັດ",
    zh: "清楚如实地回答问题",
  },
  processStep4: {
    en: "Wait for your passport to be stamped",
    lo: "ລໍຖ້າປະທັບຕາໜັງສືຜ່ານແດນ",
    zh: "等待护照盖章",
  },
  processStep5: {
    en: "Proceed to the departure gate area",
    lo: "ເດີນທາງໄປເຂດປະຕູຂຶ້ນເຮືອບິນ",
    zh: "前往登机口区域",
  },

  // Important Notes
  notesTitle: {
    en: "Important Notes",
    lo: "ໝາຍເຫດສຳຄັນ",
    zh: "重要提示",
  },
  notePassportValidity: {
    en: "Ensure your passport is valid for at least 6 months from your travel date",
    lo: "ກວດສອບວ່າໜັງສືຜ່ານແດນຍັງໃຊ້ໄດ້ຢ່າງໜ້ອຍ 6 ເດືອນນັບຈາກວັນເດີນທາງ",
    zh: "确保护照有效期从出行日起至少6个月",
  },
  noteVisa: {
    en: "Check visa requirements for your destination country before traveling",
    lo: "ກວດສອບຂໍ້ກຳນົດວີຊ່າຂອງປະເທດປາຍທາງກ່ອນເດີນທາງ",
    zh: "出行前请查询目的地国家的签证要求",
  },
  noteQuestions: {
    en: "Immigration officers may ask about your travel purpose and destination",
    lo: "ເຈົ້າໜ້າທີ່ຕມ ອາດຖາມກ່ຽວກັບຈຸດປະສົງ ແລະ ຈຸດໝາຍປາຍທາງຂອງການເດີນທາງ",
    zh: "边检人员可能会询问您的旅行目的和目的地",
  },
  noteProhibited: {
    en: "Overstaying your visa or working without proper permits is illegal",
    lo: "ການຢູ່ເກີນກຳນົດວີຊ່າ ຫຼື ເຮັດວຽກໂດຍບໍ່ມີໃບອະນຸຍາດແມ່ນຜິດກົດໝາຍ",
    zh: "签证过期滞留或无证工作属违法行为",
  },

  // Counter Information
  counterTitle: {
    en: "Immigration Counters",
    lo: "ເຄົາເຕີ້ກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检柜台",
  },
  counterLao: {
    en: "Lao Nationals",
    lo: "ຄົນລາວ",
    zh: "本国公民",
  },
  counterForeign: {
    en: "Foreign Nationals",
    lo: "ຄົນຕ່າງປະເທດ",
    zh: "外国公民",
  },
  counterDiplomatic: {
    en: "Diplomatic / Crew",
    lo: "ນັກການທູດ / ລູກເຮືອ",
    zh: "外交人员/机组人员",
  },
} as const;

export type ImmigrationKey = keyof typeof immigration;

export const tImmigration = (k: ImmigrationKey, lang: Lang) =>
  immigration[k][lang] ?? immigration[k].en;
