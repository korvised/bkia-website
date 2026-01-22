import type { Lang } from "@/types/language";

export const baggage = {
  // Page title
  title: {
    en: "Baggage",
    lo: "ກະເປົາເດີນທາງ",
    zh: "行李",
  },

  // Introduction
  intro: {
    en: "Learn about baggage allowances, restrictions, and how to prepare your luggage for a smooth journey.",
    lo: "ຮຽນຮູ້ກ່ຽວກັບນ້ຳໜັກກະເປົາທີ່ອະນຸຍາດ, ຂໍ້ຫ້າມ, ແລະ ວິທີກະກຽມກະເປົາເພື່ອການເດີນທາງທີ່ລາບລື່ນ.",
    zh: "了解行李限额、限制规定以及如何准备行李以确保旅途顺利。",
  },

  // Checked Baggage Section
  checkedBaggageTitle: {
    en: "Checked Baggage",
    lo: "ກວດສອບກະເປົາ",
    zh: "托运行李",
  },
  checkedBaggageDesc: {
    en: "Checked baggage is stored in the aircraft cargo hold during the flight. Weight and size limits vary by airline and ticket class.",
    lo: "ກະເປົາທີ່ໂຫຼດຂື້ນເຮືອບິນຈະຖືກເກັບໄວ້ໃນຫ້ອງສິນຄ້າຂອງເຮືອບິນລະຫວ່າງການບິນ. ນ້ຳໜັກ ແລະ ຂະໜາດແຕກຕ່າງກັນຕາມສາຍການບິນ ແລະ ຊັ້ນບິນ.",
    zh: "托运行李在飞行期间存放在飞机货舱内。重量和尺寸限制因航空公司和票务舱位而异。",
  },
  weightAllowance: {
    en: "Weight Allowance",
    lo: "ນ້ຳໜັກທີ່ອະນຸຍາດ",
    zh: "重量限额",
  },
  weightAllowanceVal: {
    en: "20-30 kg (varies by airline & class)",
    lo: "20-30 ກິໂລ (ຂຶ້ນກັບສາຍການບິນ ແລະ ຊັ້ນບິນ)",
    zh: "20-30公斤（因航空公司和舱位而异）",
  },
  maxDimensions: {
    en: "Maximum Dimensions",
    lo: "ຂະໜາດສູງສຸດ",
    zh: "最大尺寸",
  },
  maxDimensionsVal: {
    en: "158 cm total (Length + Width + Height)",
    lo: "158 ຊມ ລວມ (ຍາວ + ກວ້າງ + ສູງ)",
    zh: "总计158厘米（长+宽+高）",
  },

  // Cabin Baggage Section
  cabinBaggageTitle: {
    en: "Cabin Baggage",
    lo: "ກະເປົາຖືຂຶ້ນເຮືອບິນ",
    zh: "随身行李",
  },
  cabinBaggageDesc: {
    en: "Cabin baggage is carried with you into the aircraft cabin. It must fit in the overhead compartment or under the seat in front of you.",
    lo: "ກະເປົາຖືຂຶ້ນເຮືອແມ່ນນຳຕິດໂຕເຂົ້າໄປໃນຫ້ອງໂດຍສານ. ຕ້ອງໃສ່ໄດ້ໃນຊ່ອງເກັບຂອງດ້ານເທິງ ຫຼື ໃຕ້ບ່ອນນັ່ງຂ້າງໜ້າຂອງທ່ານ.",
    zh: "随身行李随您进入客舱。必须能放入头顶行李舱或前排座位下方。",
  },
  cabinWeightVal: {
    en: "7 kg maximum",
    lo: "ສູງສຸດ 7 ກິໂລ",
    zh: "最多7公斤",
  },
  cabinDimensionsVal: {
    en: "56 x 36 x 23 cm",
    lo: "56 x 36 x 23 ຊມ",
    zh: "56 x 36 x 23厘米",
  },
  personalItem: {
    en: "Personal Item",
    lo: "ຂອງໃຊ້ສ່ວນຕົວ",
    zh: "个人物品",
  },
  personalItemDesc: {
    en: "1 small bag (handbag, laptop bag, or small backpack)",
    lo: "ກະເປົານ້ອຍ 1 ໃບ (ກະເປົາຖື, ກະເປົາຄອມພິວເຕີ, ຫຼື ກະເປົາເປ້ນ້ອຍ)",
    zh: "1个小包（手提包、电脑包或小背包）",
  },

  // Prohibited Items Section
  prohibitedTitle: {
    en: "Prohibited Items",
    lo: "ສິ່ງຂອງຕ້ອງຫ້າມ",
    zh: "禁止物品",
  },
  prohibitedDesc: {
    en: "The following items are not allowed in checked or cabin baggage:",
    lo: "ສິ່ງຂອງຕໍ່ໄປນີ້ບໍ່ອະນຸຍາດໃຫ້ນຳໃສ່ກະເປົາໂຫຼດ ຫຼື ກະເປົາຖືຂຶ້ນເຮືອ:",
    zh: "以下物品不允许放入托运或随身行李：",
  },
  prohibitedExplosives: {
    en: "Explosives and flammable materials",
    lo: "ວັດຖຸລະເບີດ ແລະ ວັດຖຸໄວໄຟ",
    zh: "爆炸物和易燃材料",
  },
  prohibitedWeapons: {
    en: "Weapons and sharp objects",
    lo: "ອາວຸດ ແລະ ຂອງມີຄົມ",
    zh: "武器和尖锐物品",
  },
  prohibitedChemicals: {
    en: "Chemicals and toxic substances",
    lo: "ສານເຄມີ ແລະ ສານພິດ",
    zh: "化学品和有毒物质",
  },
  prohibitedBatteries: {
    en: "Spare lithium batteries (checked baggage only)",
    lo: "ແບັດເຕີຣີລິທຽມສຳຮອງ (ສະເພາະກະເປົາໂຫຼດ)",
    zh: "备用锂电池（仅限托运行李）",
  },

  // Cabin Restricted Items
  cabinRestrictedTitle: {
    en: "Cabin Baggage Restrictions",
    lo: "ຂໍ້ຈຳກັດກະເປົາຖືຂຶ້ນເຮືອບິນ",
    zh: "随身行李限制",
  },
  cabinRestrictedLiquids: {
    en: "Liquids over 100ml (must be in checked baggage)",
    lo: "ຂອງແຫຼວເກີນ 100ml (ຕ້ອງໃສ່ກະເປົາໂຫຼດ)",
    zh: "超过100毫升的液体（必须托运）",
  },
  cabinRestrictedSharp: {
    en: "Sharp objects (scissors, knives, razors)",
    lo: "ຂອງມີຄົມ (ມີດຕັດ, ມີດ, ມີດໂກນ)",
    zh: "尖锐物品（剪刀、刀具、剃刀）",
  },
  cabinRestrictedSports: {
    en: "Sports equipment (bats, golf clubs)",
    lo: "ອຸປະກອນກິລາ (ໄມ້ຕີ, ໄມ້ກອຟ)",
    zh: "运动器材（球棒、高尔夫球杆）",
  },

  // Valuables Section
  valuablesTitle: {
    en: "Valuables & Fragile Items",
    lo: "ຂອງມີຄ່າ ແລະ ຂອງແຕກຫັກງ່າຍ",
    zh: "贵重物品和易碎品",
  },
  valuablesDesc: {
    en: "We recommend carrying the following items in your cabin baggage:",
    lo: "ພວກເຮົາແນະນຳໃຫ້ນຳສິ່ງຂອງຕໍ່ໄປນີ້ໃນກະເປົາຖືຂຶ້ນເຮືອ:",
    zh: "我们建议将以下物品放入随身行李：",
  },
  valuableElectronics: {
    en: "Electronics (laptops, cameras, phones)",
    lo: "ອຸປະກອນອີເລັກໂທຣນິກ (ຄອມພິວເຕີ, ກ້ອງຖ່າຍຮູບ, ໂທລະສັບ)",
    zh: "电子产品（笔记本电脑、相机、手机）",
  },
  valuableJewelry: {
    en: "Jewelry, cash, and important documents",
    lo: "ເຄື່ອງປະດັບ, ເງິນສົດ ແລະ ເອກະສານສຳຄັນ",
    zh: "珠宝、现金和重要文件",
  },
  valuableMedication: {
    en: "Medications and medical devices",
    lo: "ຢາ ແລະ ອຸປະກອນການແພດ",
    zh: "药品和医疗器械",
  },
  valuableKeys: {
    en: "Keys and travel documents",
    lo: "ກະແຈ ແລະ ເອກະສານເດີນທາງ",
    zh: "钥匙和旅行证件",
  },

  // Excess Baggage
  excessTitle: {
    en: "Excess Baggage",
    lo: "ກະເປົານ້ຳໜັກເກີນ",
    zh: "超重行李",
  },
  excessDesc: {
    en: "If your baggage exceeds the free allowance, additional fees will apply. Rates vary by airline and destination.",
    lo: "ຖ້າກະເປົາຂອງທ່ານເກີນນ້ຳໜັກທີ່ອະນຸຍາດ, ຈະມີຄ່າທຳນຽມເພີ່ມ. ອັດຕາແຕກຕ່າງກັນຕາມສາຍການບິນ ແລະ ຈຸດໝາຍປາຍທາງ.",
    zh: "如果您的行李超过免费限额，将收取额外费用。费率因航空公司和目的地而异。",
  },
  excessContact: {
    en: "Contact your airline for excess baggage rates",
    lo: "ຕິດຕໍ່ສາຍການບິນສຳລັບອັດຕາກະເປົານ້ຳໜັກເກີນ",
    zh: "请联系航空公司了解超重行李费率",
  },

  // Liability
  liabilityNote: {
    en: "Bokeo International Airport and airlines are not responsible for damage to improperly packed items or valuables in checked baggage.",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ ແລະ ສາຍການບິນຈະບໍ່ຮັບຜິດຊອບຕໍ່ຄວາມເສຍຫາຍຂອງສິ່ງຂອງທີ່ຫໍ່ບໍ່ຖືກຕ້ອງ ຫຼື ຂອງມີຄ່າໃນກະເປົາໂຫຼດ.",
    zh: "波乔国际机场和航空公司不对托运行李中包装不当的物品或贵重物品的损坏承担责任。",
  },
} as const;

export type BaggageKey = keyof typeof baggage;

export const tBaggage = (k: BaggageKey, lang: Lang) =>
  baggage[k][lang] ?? baggage[k].en;
