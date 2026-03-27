import type { Lang } from "@/types/language";

export const exitCustoms = {
  title: {
    en: "Final Customs Inspection",
    lo: "ການກວດກາພາສີຂັ້ນສຸດທ້າຍ",
    zh: "最终海关检查",
  },
  intro: {
    en: "Before exiting the arrivals hall, all passengers must pass through final customs inspection. Officers may conduct spot checks and X-ray screening of luggage. This is your last checkpoint before entering Lao PDR.",
    lo: "ກ່ອນອອກຈາກຫ້ອງໂຖງຂາເຂົ້າ, ຜູ້ໂດຍສານທັງໝົດຕ້ອງຜ່ານການກວດພາສີຂັ້ນສຸດທ້າຍ. ເຈົ້າໜ້າທີ່ອາດສຸ່ມກວດ ຫຼື ນຳສຳພາລະຜ່ານເຄື່ອງ X-ray. ນີ້ແມ່ນຈຸດກວດກາສຸດທ້າຍກ່ອນທ່ານຈະເຂົ້າ ສປປ ລາວ ຢ່າງເປັນທາງການ.",
    zh: "离开到达大厅前，所有旅客须通过最终海关检查。海关人员可能进行抽查和行李X光检查。这是您正式进入老挝前的最后关卡。",
  },

  // ── Exit Channels ────────────────────────────────────────────────────────

  channelsTitle: {
    en: "Two Exit Channels",
    lo: "ຊ່ອງທາງອອກ 2 ຮູບແບບ",
    zh: "两个出口通道",
  },

  greenChannelTitle: {
    en: "Green Channel",
    lo: "ຊ່ອງທາງສີຂຽວ",
    zh: "绿色通道",
  },
  greenChannelBadge: {
    en: "Nothing to Declare",
    lo: "ບໍ່ມີສິ່ງຂອງຕ້ອງແຈ້ງ",
    zh: "无需申报",
  },
  greenChannelDesc: {
    en: "Use this channel if you have:",
    lo: "ໃຊ້ຊ່ອງທາງນີ້ ຫາກທ່ານ:",
    zh: "如符合以下情况请走此通道：",
  },
  greenItem1: {
    en: "No goods exceeding duty-free allowances",
    lo: "ບໍ່ມີສິນຄ້າເກີນສິດຍົກເວັ້ນພາສີ",
    zh: "没有超过免税限额的物品",
  },
  greenItem2: {
    en: "No restricted or prohibited items",
    lo: "ບໍ່ມີສິ່ງຂອງຕ້ອງຫ້າມ ຫຼື ຈຳກັດ",
    zh: "没有限制或禁止物品",
  },
  greenItem3: {
    en: "No currency over USD 10,000",
    lo: "ບໍ່ຖືເງິນຕາຕ່າງປະເທດເກີນ 10,000 ໂດລາ",
    zh: "携带货币未超过10,000美元",
  },
  greenItem4: {
    en: "Personal belongings only",
    lo: "ມີພຽງເຄື່ອງໃຊ້ສ່ວນຕົວ",
    zh: "仅携带个人物品",
  },
  greenNote: {
    en: "Most tourists use this channel",
    lo: "ນັກທ່ອງທ່ຽວສ່ວນໃຫຍ່ໃຊ້ຊ່ອງທາງນີ້",
    zh: "大多数游客走此通道",
  },

  redChannelTitle: {
    en: "Red Channel",
    lo: "ຊ່ອງທາງສີແດງ",
    zh: "红色通道",
  },
  redChannelBadge: {
    en: "Goods to Declare",
    lo: "ມີສິ່ງຂອງຕ້ອງແຈ້ງ",
    zh: "需申报物品",
  },
  redChannelDesc: {
    en: "Use this channel if you have:",
    lo: "ໃຊ້ຊ່ອງທາງນີ້ ຫາກທ່ານ:",
    zh: "如符合以下情况请走此通道：",
  },
  redItem1: {
    en: "Currency over USD 10,000",
    lo: "ຖືເງິນຕາຕ່າງປະເທດເກີນ 10,000 ໂດລາ",
    zh: "携带货币超过10,000美元",
  },
  redItem2: {
    en: "Commercial or business goods",
    lo: "ມີສິນຄ້າເພື່ອການຄ້າ ຫຼື ທຸລະກິດ",
    zh: "携带商业货物",
  },
  redItem3: {
    en: "Items exceeding duty-free limits",
    lo: "ສິ່ງຂອງເກີນກຳນົດຍົກເວັ້ນພາສີ",
    zh: "物品超过免税限额",
  },
  redItem4: {
    en: "Restricted items requiring permits",
    lo: "ເຄື່ອງຂອງຈຳກັດທີ່ຕ້ອງມີໃບອະນຸຍາດ",
    zh: "需要许可的限制物品",
  },
  redNote: {
    en: "Declare honestly to avoid penalties",
    lo: "ແຈ້ງຕາມຄວາມຈິງ ເພື່ອຫຼີກເວັ້ນການຖືກປັບ",
    zh: "如实申报以避免处罚",
  },

  // ── Random Inspections ───────────────────────────────────────────────────

  randomInspectionTitle: {
    en: "Random Inspections",
    lo: "ການສຸ່ມກວດກາ",
    zh: "随机检查",
  },
  randomInspectionDesc: {
    en: "Even in the Green Channel, officers may conduct spot checks:",
    lo: "ເຖິງຢູ່ຊ່ອງທາງສີຂຽວ, ເຈົ້າໜ້າທີ່ອາດສຸ່ມກວດ:",
    zh: "即使走绿色通道，海关人员也可能进行抽查：",
  },
  randomItem1: {
    en: "X-ray screening of luggage",
    lo: "ນຳສຳພາລະຜ່ານເຄື່ອງ X-ray",
    zh: "行李X光检查",
  },
  randomItem2: {
    en: "Physical bag inspection",
    lo: "ກວດຄົ້ນພາຍໃນກະເປົາ",
    zh: "人工行李开箱检查",
  },
  randomItem3: {
    en: "Questions about trip purpose and items carried",
    lo: "ຖາມກ່ຽວກັບຈຸດປະສົງການເດີນທາງ ແລະ ສິ່ງຂອງທີ່ຖືມານຳ",
    zh: "询问旅行目的和携带物品",
  },
  randomItem4: {
    en: "This is normal procedure — cooperate fully",
    lo: "ນີ້ແມ່ນຂັ້ນຕອນປົກກະຕິ — ກະລຸນາໃຫ້ຄວາມຮ່ວມມື",
    zh: "这是正常程序 — 请充分配合",
  },

  // ── What Officers Look For ───────────────────────────────────────────────

  officersLookTitle: {
    en: "What Customs Officers Look For",
    lo: "ສິ່ງທີ່ເຈົ້າໜ້າທີ່ພາສີເພັ່ງເລັງ",
    zh: "海关重点查验项目",
  },

  lookNarcoticsLabel: { en: "Narcotics", lo: "ຢາເສບຕິດ", zh: "毒品" },
  lookNarcoticsDesc: {
    en: "Drug detection is priority #1 — K9 units patrol the area",
    lo: "ການກວດຫາຢາເສບຕິດແມ່ນບູລິມະສິດສູງສຸດ — ມີໜ່ວຍໝາກວດລາດຕີເວນ",
    zh: "缉毒为首要任务 — 警犬在此区域巡逻",
  },

  lookCurrencyLabel: { en: "Undeclared Cash", lo: "ເງິນສົດທີ່ບໍ່ໄດ້ແຈ້ງ", zh: "未申报现金" },
  lookCurrencyDesc: {
    en: "Large undeclared amounts trigger immediate investigation",
    lo: "ເງິນສົດຈຳນວນຫຼາຍທີ່ບໍ່ໄດ້ແຈ້ງ ຈະຖືກກວດສອບທັນທີ",
    zh: "大量未申报现金将立即触发调查",
  },

  lookTobaccoLabel: { en: "Tobacco & Alcohol", lo: "ຢາສູບ ແລະ ເຫຼົ້າ", zh: "烟酒" },
  lookTobaccoDesc: {
    en: "Quantities over duty-free limits are subject to tax",
    lo: "ຫາກເກີນປະລິມານຍົກເວັ້ນພາສີ ຈະຖືກເກັບພາສີ",
    zh: "超过免税限额的数量需缴税",
  },

  lookCommercialLabel: { en: "Commercial Goods", lo: "ສິນຄ້າເພື່ອການຄ້າ", zh: "商业货物" },
  lookCommercialDesc: {
    en: "Items for resale require proper documentation",
    lo: "ສິ່ງຂອງທີ່ຈະຂາຍຕໍ່ ຕ້ອງມີເອກະສານຢັ້ງຢືນຖືກຕ້ອງ",
    zh: "用于转售的物品须提供相应文件",
  },

  lookProhibitedLabel: { en: "Prohibited Items", lo: "ສິ່ງຂອງຕ້ອງຫ້າມ", zh: "违禁物品" },
  lookProhibitedDesc: {
    en: "Weapons, counterfeit goods, and restricted materials",
    lo: "ອາວຸດ, ສິນຄ້າລະເມີດລິຂະສິດ, ວັດຖຸຕ້ອງຫ້າມ",
    zh: "武器、假冒商品及违禁材料",
  },

  // ── Penalties ────────────────────────────────────────────────────────────

  penaltiesTitle: {
    en: "Penalties for False Declaration",
    lo: "ບົດລົງໂທດກໍລະນີແຈ້ງຂໍ້ມູນເທັດ",
    zh: "虚假申报的处罚",
  },

  penaltyFinesLabel: { en: "Fines", lo: "ຄ່າປັບໃໝ", zh: "罚款" },
  penaltyFinesDesc: {
    en: "Starting at USD 100 for minor violations",
    lo: "ເລີ່ມຕົ້ນ 100 ໂດລາ ສຳລັບການລະເມີດເລັກນ້ອຍ",
    zh: "轻微违规从100美元起",
  },

  penaltyConfiscationLabel: { en: "Confiscation", lo: "ການຢຶດຊັບ", zh: "没收" },
  penaltyConfiscationDesc: {
    en: "Undeclared goods will be seized",
    lo: "ສິນຄ້າທີ່ບໍ່ໄດ້ແຈ້ງຈະຖືກຢຶດ",
    zh: "未申报物品将被没收",
  },

  penaltyCriminalLabel: { en: "Criminal Charges", lo: "ຄະດີອາຍາ", zh: "刑事指控" },
  penaltyCriminalDesc: {
    en: "For serious violations involving drugs or weapons",
    lo: "ສຳລັບການລະເມີດຮ້າຍແຮງ ເຊັ່ນ ຢາເສບຕິດ ຫຼື ອາວຸດ",
    zh: "涉及毒品或武器的严重违规",
  },

  penaltyDeportationLabel: { en: "Deportation", lo: "ການເນລະເທດ", zh: "驱逐出境" },
  penaltyDeportationDesc: {
    en: "Possible for major infractions",
    lo: "ອາດຖືກເນລະເທດໃນກໍລະນີລະເມີດຮ້າຍແຮງ",
    zh: "重大违规可能被驱逐出境",
  },

  penaltyBanLabel: { en: "Travel Ban", lo: "ຫ້າມເຂົ້າປະເທດ", zh: "旅行禁令" },
  penaltyBanDesc: {
    en: "Future entry may be refused",
    lo: "ອາດຖືກປະຕິເສດການເຂົ້າປະເທດໃນອະນາຄົດ",
    zh: "未来可能被拒绝入境",
  },

  penaltyNote: {
    en: "When in doubt, use the Red Channel and declare. It's always better to declare and pay duty than face penalties.",
    lo: "ຫາກບໍ່ໝັ້ນໃຈ, ໃຫ້ເຂົ້າຊ່ອງທາງສີແດງເພື່ອແຈ້ງ. ການແຈ້ງ ແລະ ຈ່າຍພາສີ ດີກວ່າການຖືກປັບ.",
    zh: "如有疑问，请走红色通道并申报。申报缴税总比受到处罚划算。",
  },

  // ── After Clearance ──────────────────────────────────────────────────────

  afterClearanceTitle: {
    en: "After Customs Clearance",
    lo: "ຫຼັງຈາກຜ່ານດ່ານພາສີ",
    zh: "通过海关后",
  },
  afterClearanceDesc: {
    en: "You've officially entered Lao PDR! In the arrivals hall you can:",
    lo: "ທ່ານໄດ້ເຂົ້າ ສປປ ລາວ ຢ່າງເປັນທາງການແລ້ວ! ໃນຫ້ອງໂຖງຂາເຂົ້າ ທ່ານສາມາດ:",
    zh: "您已正式进入老挝！在到达大厅可以：",
  },
  afterItem1: {
    en: "Meet greeters and hotel representatives",
    lo: "ພົບກັບຜູ້ມາຮັບ ຫຼື ຕົວແທນໂຮງແຮມ",
    zh: "会见接机人员和酒店代表",
  },
  afterItem2: {
    en: "Purchase a local SIM card",
    lo: "ຊື້ຊິມໂທລະສັບທ້ອງຖິ່ນ",
    zh: "购买本地SIM卡",
  },
  afterItem3: {
    en: "Arrange transportation (taxi or ride-share)",
    lo: "ຕິດຕໍ່ລົດຮັບສົ່ງ (ແທັກຊີ່ ຫຼື ລົດບໍລິການ)",
    zh: "安排交通（出租车或网约车）",
  },
  afterItem4: {
    en: "Exchange currency if not done earlier",
    lo: "ແລກປ່ຽນເງິນຕາ ຫາກຍັງບໍ່ທັນໄດ້ແລກ",
    zh: "兑换货币（如之前未兑换）",
  },
  afterItem5: {
    en: "Collect tourist information",
    lo: "ຮັບຂໍ້ມູນການທ່ອງທ່ຽວ",
    zh: "获取旅游信息",
  },

  proTip: {
    en: "Keep all duty-free receipts and customs declaration forms — you may need them when departing Laos or for insurance claims.",
    lo: "ເກັບໃບຮັບເງິນຊື້ເຄື່ອງປອດພາສີ ແລະ ສຳເນົາໃບແຈ້ງພາສີໄວ້ — ທ່ານອາດຕ້ອງໃຊ້ຕອນກັບອອກ ຫຼື ຮ້ອງຂໍປະກັນໄພ.",
    zh: "请保留所有免税购物收据和海关申报表 — 离境或保险理赔时可能需要。",
  },

  // ── Assistance ───────────────────────────────────────────────────────────

  assistanceTitle: {
    en: "Customs Assistance",
    lo: "ການຊ່ວຍເຫຼືອຈາກເຈົ້າໜ້າທີ່ພາສີ",
    zh: "海关协助",
  },
  assistanceOfficeLabel: {
    en: "Location",
    lo: "ສະຖານທີ່",
    zh: "位置",
  },
  assistanceOfficeValue: {
    en: "Baggage claim / exit area",
    lo: "ບໍລິເວນຈຸດຮັບກະເປົາ / ທາງອອກ",
    zh: "行李提取 / 出口区域",
  },
  assistancePhoneLabel: {
    en: "Phone",
    lo: "ໂທລະສັບ",
    zh: "电话",
  },
  assistancePhoneValue: {
    en: "+856 84 260 179",
    lo: "+856 84 260 179",
    zh: "+856 84 260 179",
  },
  assistanceAvailability: {
    en: "Available during all flight operations",
    lo: "ເປີດໃຫ້ບໍລິການຕະຫຼອດໄລຍະທີ່ມີຖ້ຽວບິນ",
    zh: "所有航班运营时间内提供服务",
  },
} as const;

export type ExitCustomsKey = keyof typeof exitCustoms;

export const tExitCustoms = (k: ExitCustomsKey, lang: Lang) =>
  exitCustoms[k][lang] ?? exitCustoms[k].en;
