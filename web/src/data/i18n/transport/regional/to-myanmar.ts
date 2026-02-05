import type { Lang } from "@/types/language";

export const toMyanmar = {
  title: {
    en: "To Myanmar",
    lo: "ໄປປະເທດມຽນມາ",
    zh: "前往缅甸",
  },
  intro: {
    en: "Cross to Myanmar (Tachileik) via the Golden Triangle International Boat Pier.",
    lo: "ຂ້າມໄປມຽນມາ (ທາຊີແລັກ) ຜ່ານທ່າເຮືອສາກົນສາມຫຼ່ຽມຄຳ.",
    zh: "通过金三角国际码头前往缅甸（大其力）。",
  },

  warningTitle: {
    en: "⚠️ Important",
    lo: "⚠️ ສຳຄັນ",
    zh: "⚠️ 重要",
  },
  warning: {
    en: "Regulations for foreign tourists change frequently. Check current status with authorities.",
    lo: "ລະບຽບການສຳລັບນັກທ່ອງທ່ຽວປ່ຽນແປງເລື້ອຍໆ. ກະລຸນາກວດສອບສະຖານະປັດຈຸບັນ.",
    zh: "外国游客过境规则经常变动。请向官方确认当前状态。",
  },

  distanceTitle: {
    en: "Distance from Airport",
    lo: "ໄລຍະຫ່າງຈາກສະໜາມບິນ",
    zh: "距机场距离",
  },
  distance: {
    en: "~10km to International Boat Pier (20 min)",
    lo: "~10 ກິໂລແມັດ ໄປທ່າເຮືອສາກົນ (20 ນາທີ)",
    zh: "距国际码头约10公里 (20分钟)",
  },

  transportTitle: {
    en: "Transport Options",
    lo: "ທາງເລືອກການຂົນສົ່ງ",
    zh: "交通选择",
  },
  transport: {
    en: "Private taxi or SEZ Shuttle: 100,000-200,000 LAK",
    lo: "ແທັກຊີ່ ຫຼື ລົດຮັບສົ່ງເຂດ: 100,000-200,000 ກີບ",
    zh: "私家车或特区接驳车：100,000-200,000基普",
  },

  crossingTitle: {
    en: "Border Crossing",
    lo: "ການຂ້າມແດນ",
    zh: "过境",
  },
  crossing: {
    en: "International boat crossing to Tachileik/Wan Pong pier.",
    lo: "ຂ້າມເຮືອສາກົນໄປທ່າເຮືອທາຊີແລັກ/ວັນປົ່ງ.",
    zh: "乘船过境前往大其力/万崩码头。",
  },

  hoursTitle: {
    en: "Border Hours",
    lo: "ເວລາເປີດ-ປິດດ່ານ",
    zh: "口岸时间",
  },
  hours: {
    en: "Typically 8:30 AM - 4:30 PM. Verify locally.",
    lo: "ໂດຍທົ່ວໄປ 08:30 - 16:30. ກວດສອບຢູ່ດ່ານຕື່ມ.",
    zh: "通常 08:30 - 16:30。请在当地核实。",
  },

  visaTitle: {
    en: "Visa",
    lo: "ວີຊ່າ",
    zh: "签证",
  },
  visa: {
    en: "Myanmar E-visa or Border Pass required. Apply at evisa.moip.gov.mm",
    lo: "ຕ້ອງການວີຊ່າ ຫຼື ບັດຜ່ານແດນ. ຂໍຢູ່ evisa.moip.gov.mm",
    zh: "需持有缅甸电子签证或边防证。在evisa.moip.gov.mm申请",
  },

  alternativeTitle: {
    en: "Other Options",
    lo: "ທາງເລືອກອື່ນ",
    zh: "其他选择",
  },
  alt1: {
    en: "Mae Sai-Tachilek (via Thailand)",
    lo: "ແມ່ສາຍ-ທາຊີແລັກ (ຜ່ານປະເທດໄທ)",
    zh: "美赛-大其力 (经由泰国)",
  },
  alt2: {
    en: "Fly to Yangon from Vientiane",
    lo: "ບິນໄປຢ່າງກຸ້ງຈາກວຽງຈັນ",
    zh: "从万象飞往仰光",
  },
} as const;

export type ToMyanmarKey = keyof typeof toMyanmar;

export const tToMyanmar = (k: ToMyanmarKey, lang: Lang) =>
  toMyanmar[k][lang] ?? toMyanmar[k].en;
