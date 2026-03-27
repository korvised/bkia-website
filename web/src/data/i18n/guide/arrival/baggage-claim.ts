import type { Lang } from "@/types/language";

export const baggageClaim = {
  title: {
    en: "Baggage Claim",
    lo: "ຈຸດຮັບກະເປົາ",
    zh: "行李提取",
  },
  intro: {
    en: "After clearing immigration, proceed to the baggage claim area to collect your checked luggage. Bokeo International Airport has 2 baggage carousels. Flight information screens will display which carousel your flight is assigned to.",
    lo: "ຫຼັງຈາກຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງ, ເດີນໄປຫາຈຸດຮັບກະເປົາ. ສະໜາມບິນສາກົນບໍ່ແກ້ວ ມີສາຍພານ 2 ສາຍ. ໜ້າຈໍຂໍ້ມູນຖ້ຽວບິນຈະສະແດງສາຍພານທີ່ກຳນົດໃຫ້.",
    zh: "通过边检后，前往行李提取区领取托运行李。博胶国际机场有2条传送带。航班信息屏将显示您的航班所分配的传送带编号。",
  },

  // ── Wait Times ───────────────────────────────────────────────────────────

  waitTimesTitle: {
    en: "Typical Wait Times",
    lo: "ໄລຍະເວລາລໍຖ້າໂດຍປະມານ",
    zh: "预计等待时间",
  },

  firstBagsLabel: { en: "First bags", lo: "ກະເປົາຊຸດທຳອິດ", zh: "首件行李" },
  firstBagsValue: {
    en: "15–25 min after landing",
    lo: "15–25 ນາທີ ຫຼັງລົງຈອດ",
    zh: "降落后 15–25 分钟",
  },

  mostBagsLabel: { en: "Most bags", lo: "ກະເປົາສ່ວນໃຫຍ່", zh: "大部分行李" },
  mostBagsValue: {
    en: "Within 30–40 min",
    lo: "ພາຍໃນ 30–40 ນາທີ",
    zh: "30–40 分钟内",
  },

  priorityBagsLabel: {
    en: "Priority (Business)",
    lo: "ບຸລິມະສິດ (ທຸລະກິດ)",
    zh: "优先（商务舱）",
  },
  priorityBagsValue: {
    en: "Usually first off",
    lo: "ປົກກະຕິອອກກ່ອນ",
    zh: "通常最先送达",
  },

  // ── Collecting Luggage ───────────────────────────────────────────────────

  collectingTitle: {
    en: "Collecting Your Luggage",
    lo: "ຂັ້ນຕອນການຮັບກະເປົາ",
    zh: "领取行李步骤",
  },
  collectStep1: {
    en: "Check information screens for your flight number and assigned carousel",
    lo: "ກວດເບິ່ງໜ້າຈໍຂໍ້ມູນ ຫາເລກຖ້ຽວບິນ ແລະ ສາຍພານທີ່ກຳນົດໃຫ້",
    zh: "查看信息屏幕上的航班号及分配传送带",
  },
  collectStep2: {
    en: "Stand near the carousel exit point for the best view",
    lo: "ຢືນລໍຖ້າໃກ້ຈຸດປ່ອຍກະເປົາ ເພື່ອສັງເກດເຫັນໄດ້ງ່າຍ",
    zh: "站在传送带出口处以便观察",
  },
  collectStep3: {
    en: "Verify the baggage tag matches your claim tag before taking luggage",
    lo: "ກວດສອບໃຫ້ແຕ່ລ່ະໃບ match ກ່ອນຍົກກະເປົາ",
    zh: "取行李前核对行李牌与您的行李票",
  },
  collectStep4: {
    en: "Inspect for damage immediately — report before leaving the baggage hall",
    lo: "ກວດເບິ່ງຄວາມເສຍຫາຍທັນທີ — ແຈ້ງກ່ອນອອກຈາກຫ້ອງຮັບກະເປົາ",
    zh: "立即检查是否有损坏 — 离开前报告",
  },
  collectStep5: {
    en: "Use a luggage cart (free of charge) for heavy or multiple bags",
    lo: "ໃຊ້ລົດເຂັນ (ຟຣີ) ສຳລັບກະເປົາໜັກ ຫຼື ຫຼາຍໜ່ວຍ",
    zh: "使用行李推车（免费）搬运重行李或多件行李",
  },

  // ── Reminders ────────────────────────────────────────────────────────────

  remindersTitle: {
    en: "Important Reminders",
    lo: "ຂໍ້ຄວນລະວັງ",
    zh: "重要提醒",
  },

  reminder1Label: {
    en: "Keep Your Tags",
    lo: "ເກັບໃບຮັບກະເປົາ",
    zh: "保管行李票",
  },
  reminder1Desc: {
    en: "Hold onto your baggage claim tag until you have collected every piece of luggage",
    lo: "ຖືໃບຮັບກະເປົາໄວ້ ຈົນກວ່າຈະໄດ້ຮັບກະເປົາຄົບທຸກໜ່ວຍ",
    zh: "保管好行李票，直到取完所有行李",
  },

  reminder2Label: { en: "Stay Alert", lo: "ລະວັງຊັບສິນ", zh: "看管财物" },
  reminder2Desc: {
    en: "Never leave bags unattended — keep your belongings in sight at all times",
    lo: "ຫ້າມວາງກະເປົາປະໄວ້ໂດຍບໍ່ມີຄົນເບິ່ງ — ສັງເກດຊັບສິນຕະຫຼອດ",
    zh: "切勿让行李无人看管，随时注意随身物品",
  },

  reminder3Label: { en: "Fragile Items", lo: "ເຄື່ອງແຕກງ່າຍ", zh: "易碎物品" },
  reminder3Desc: {
    en: "Fragile items may arrive on a separate carousel or at the service counter",
    lo: "ເຄື່ອງຂອງທີ່ແຕກງ່າຍ ອາດໃຊ້ສາຍພານພິເສດ ຫຼື ເຄົາເຕີບໍລິການ",
    zh: "易碎物品可能通过单独传送带或服务柜台送达",
  },

  reminder4Label: {
    en: "Oversized Items",
    lo: "ສິ່ງຂອງຂະໜາດໃຫຍ່",
    zh: "超大物品",
  },
  reminder4Desc: {
    en: "Sports equipment, strollers, and oversized items are delivered at the oversized baggage area",
    lo: "ອຸປະກອນກິລາ, ລົດເຂັນເດັກ ແລະ ສິ່ງຂອງຂະໜາດໃຫຍ່ ຮັບທີ່ຈຸດ Oversized Baggage",
    zh: "运动器材、婴儿车及超大物品在超大行李区领取",
  },

  // ── Lost / Damaged ───────────────────────────────────────────────────────

  lostDamagedTitle: {
    en: "Lost, Delayed or Damaged Baggage",
    lo: "ກໍລະນີກະເປົາສູນຫາຍ, ຊັກຊ້າ ຫຼື ເສຍຫາຍ",
    zh: "行李遗失、延误或损坏",
  },

  missingBaggageTitle: {
    en: "Missing Baggage",
    lo: "ກະເປົາບໍ່ມາຮອດ",
    zh: "行李未到",
  },
  missingBaggageDesc: {
    en: "If your luggage doesn't arrive, act quickly:",
    lo: "ຫາກກະເປົາຍັງບໍ່ມາ, ດຳເນີນການດ່ວນ:",
    zh: "如行李未送达，请迅速采取行动：",
  },
  missingStep1: {
    en: "Wait until the carousel stops completely",
    lo: "ລໍຖ້າຈົນສາຍພານຢຸດໝຸນສະນິດ",
    zh: "等待传送带完全停止",
  },
  missingStep2: {
    en: "Go directly to the Baggage Services counter",
    lo: "ໄປທີ່ເຄົາເຕີ Baggage Services ທັນທີ",
    zh: "直接前往行李服务柜台",
  },
  missingStep3: {
    en: "Present your baggage claim tag and boarding pass",
    lo: "ຍື່ນໃບຮັບກະເປົາ ແລະ Boarding Pass",
    zh: "出示行李票和登机牌",
  },
  missingStep4: {
    en: "File a Property Irregularity Report (PIR)",
    lo: "ຂຽນໃບລາຍງານ PIR (Property Irregularity Report)",
    zh: "填写财产不正常报告（PIR）",
  },
  missingStep5: {
    en: "Provide your local contact details",
    lo: "ໃຫ້ຂໍ້ມູນຕິດຕໍ່ໃນທ້ອງຖິ່ນ",
    zh: "提供本地联系信息",
  },
  missingStep6: {
    en: "Keep your PIR reference number for follow-up",
    lo: "ເກັບເລກ PIR ໄວ້ ເພື່ອຕິດຕາມຜົນ",
    zh: "保存PIR编号以便跟进",
  },

  damagedBaggageTitle: {
    en: "Damaged Baggage",
    lo: "ກະເປົາເສຍຫາຍ",
    zh: "行李损坏",
  },
  damagedBaggageDesc: {
    en: "If you notice damage, act before leaving the area:",
    lo: "ຫາກພົບຄວາມເສຍຫາຍ, ດຳເນີນການກ່ອນອອກ:",
    zh: "发现损坏时，请在离开前采取行动：",
  },
  damagedStep1: {
    en: "Report immediately at Baggage Services — do not leave the area first",
    lo: "ແຈ້ງທັນທີ ຢູ່ຈຸດ Baggage Services — ຢ່າອອກໄປກ່ອນ",
    zh: "立即在行李服务处报告 — 不要先离开",
  },
  damagedStep2: {
    en: "Take photos of the damage as evidence",
    lo: "ຖ່າຍຮູບຄວາມເສຍຫາຍໄວ້ເປັນຫຼັກຖານ",
    zh: "拍摄损坏照片留作证据",
  },
  damagedStep3: {
    en: "Complete the damage report form provided by staff",
    lo: "ຕື່ມແບບຟອມລາຍງານຄວາມເສຍຫາຍທີ່ເຈົ້າໜ້າທີ່ສະໜອງໃຫ້",
    zh: "填写工作人员提供的损坏报告表",
  },
  damagedStep4: {
    en: "Claims must be filed within 7 days of arrival",
    lo: "ຕ້ອງຍື່ນຄຳຮ້ອງພາຍໃນ 7 ວັນ ຫຼັງຈາກມາຮອດ",
    zh: "须在抵达后7天内提出索赔",
  },
  damagedStep5: {
    en: "Contact your airline directly for compensation",
    lo: "ຕິດຕໍ່ສາຍການບິນໂດຍກົງ ສຳລັບການຊົດເຊີຍ",
    zh: "直接联系航空公司申请赔偿",
  },
} as const;

export type BaggageClaimKey = keyof typeof baggageClaim;

export const tBaggageClaim = (k: BaggageClaimKey, lang: Lang) =>
  baggageClaim[k][lang] ?? baggageClaim[k].en;
