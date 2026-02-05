import type { Lang } from "@/types/language";

export const toThailand = {
  title: {
    en: "To Thailand",
    lo: "ໄປປະເທດໄທ",
    zh: "前往泰国",
  },
  intro: {
    en: "Cross to Thailand via the Golden Triangle (Dan Mong Khorn) or the Friendship Bridge in Houayxay.",
    lo: "ຂ້າມໄປປະເທດໄທຜ່ານດ່ານມັງກອນ (ສາມຫຼ່ຽມຄຳ) ຫຼື ຂົວມິດຕະພາບ ທີ່ຫ້ວຍຊາຍ.",
    zh: "通过金三角（龙门码头）或会晒友谊大桥前往泰国。",
  },

  distanceTitle: {
    en: "Distance from Airport",
    lo: "ໄລຍະຫ່າງຈາກສະໜາມບິນ",
    zh: "距机场距离",
  },
  distance: {
    en: "~7km to Dan Mong Khorn (15 min) / ~50km to Houayxay (1 hour)",
    lo: "~7 ກມ ໄປດ່ານມັງກອນ (15 ນາທີ) / ~50 ກມ ໄປຫ້ວຍຊາຍ (1 ຊົ່ວໂມງ)",
    zh: "距龙门码头约7公里 (15分钟) / 距会晒约50公里 (1小时)",
  },

  transportTitle: {
    en: "Transport Options",
    lo: "ທາງເລືອກການຂົນສົ່ງ",
    zh: "交通选择",
  },
  taxi: {
    en: "Airport Taxi: 150,000 LAK (to SEZ) / 500,000+ LAK (to Houayxay bridge)",
    lo: "ແທັກຊີ່ສະໜາມບິນ: 150,000 ກີບ (ໄປເຂດ) / 500,000+ ກີບ (ໄປຂົວຫ້ວຍຊາຍ)",
    zh: "机场出租车：150,000基普 (至特区) / 500,000+基普 (至会晒大桥)",
  },

  crossingTitle: {
    en: "Border Crossing Methods",
    lo: "ວິທີການຂ້າມແດນ",
    zh: "过境方式",
  },
  ferry: {
    en: "Option 1: Dan Mong Khorn (Speedboat to Chiang Saen)",
    lo: "ທາງເລືອກ 1: ດ່ານມັງກອນ (ເຮືອໄວໄປຊຽງແສນ)",
    zh: "方式 1: 龙门码头 (快艇前往清盛)",
  },
  bridge: {
    en: "Option 2: Friendship Bridge IV (Travel to Houayxay city)",
    lo: "ທາງເລືອກ 2: ຂົວມິດຕະພາບ 4 (ເດີນທາງໄປເມືອງຫ້ວຍຊາຍ)",
    zh: "方式 2: 第四友谊大桥 (需前往会晒市)",
  },

  hoursTitle: {
    en: "Border Hours",
    lo: "ເວລາເປີດ-ປິດດ່ານ",
    zh: "口岸时间",
  },
  hours: {
    en: "Typically 8:00 AM - 6:00 PM. Bridge IV: 6:00 AM - 10:00 PM.",
    lo: "ໂດຍທົ່ວໄປ 08:00 - 18:00. ຂົວ 4: 06:00 - 22:00.",
    zh: "通常 08:00 - 18:00。友谊大桥: 06:00 - 22:00。",
  },

  visaTitle: {
    en: "Visa",
    lo: "ວີຊ່າ",
    zh: "签证",
  },
  visa: {
    en: "60-day exemption for many nationalities",
    lo: "ຍົກເວັ້ນ 60 ວັນສຳລັບຫຼາຍສັນຊາດ",
    zh: "多数国籍60天免签",
  },

  tipsTitle: {
    en: "Quick Tips",
    lo: "ຄຳແນະນຳສັ້ນໆ",
    zh: "快速提示",
  },
  tip1: {
    en: "Carry THB cash for boat fees",
    lo: "ກຽມເງິນສົດບາດສຳລັບຄ່າເຮືອ",
    zh: "准备泰铢现金支付船费",
  },
  tip2: {
    en: "Passport needs 6+ months validity",
    lo: "ໜັງສືຜ່ານແດນຕ້ອງມີອາຍຸ 6 ເດືອນຂຶ້ນໄປ",
    zh: "护照需6个月以上有效期",
  },
} as const;

export type ToThailandKey = keyof typeof toThailand;

export const tToThailand = (k: ToThailandKey, lang: Lang) =>
  toThailand[k][lang] ?? toThailand[k].en;
