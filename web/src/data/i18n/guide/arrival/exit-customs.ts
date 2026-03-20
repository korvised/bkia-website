import type { Lang } from "@/types/language";

export const exitCustoms = {
  title: {
    en: "Final Customs Inspection",
    lo: "ການກວດກາພາສີຂັ້ນສຸດທ້າຍ",
    zh: "最终海关检查",
  },
  intro: {
    en: "Before exiting the arrivals hall, all passengers must pass through final customs inspection. Customs officers may conduct spot checks and x-ray screening of luggage. This is your last checkpoint before entering Lao PDR.",
    lo: "ກ່ອນຈະອອກໄປຫາຫ້ອງໂຖງຜູ້ໂດຍສານຂາເຂົ້າ, ຜູ້ໂດຍສານທັງໝົດຕ້ອງໄດ້ຜ່ານການກວດກາພາສີຂັ້ນສຸດທ້າຍ. ເຈົ້າໜ້າທີ່ພາສີອາດຈະມີການສຸ່ມກວດ ຫຼື ນຳສຳພາລະເຂົ້າເຄື່ອງເອັກສເລ (X-ray). ນີ້ແມ່ນຈຸດກວດກາສຸດທ້າຍກ່ອນທີ່ທ່ານຈະເຂົ້າສູ່ ສປປ ລາວ ຢ່າງເປັນທາງການ.",
    zh: "离开到达大厅前，所有旅客必须通过最终海关检查。海关人员可能进行抽查和行李X光检查。这是进入老挝人民民主共和国前的最后一个检查站。",
  },

  channelsTitle: {
    en: "Two Exit Channels",
    lo: "ຊ່ອງທາງອອກ 2 ຮູບແບບ",
    zh: "两个出口通道",
  },
  greenChannelTitle: {
    en: "Green Channel - Nothing to Declare",
    lo: "ຊ່ອງທາງສີຂຽວ (Green Channel) - ບໍ່ມີສິ່ງຂອງຕ້ອງແຈ້ງ",
    zh: "绿色通道 - 无需申报",
  },
  greenChannelDesc: {
    en: "Use this channel if you have:",
    lo: "ກະລຸນາໃຊ້ຊ່ອງທາງນີ້ ຫາກທ່ານ:",
    zh: "如果您有以下情况请使用此通道：",
  },
  greenItem1: {
    en: "No goods exceeding duty-free allowances",
    lo: "ບໍ່ມີສິນຄ້າເກີນປະລິມານທີ່ຍົກເວັ້ນພາສີ",
    zh: "没有超过免税限额的物品",
  },
  greenItem2: {
    en: "No restricted or prohibited items",
    lo: "ບໍ່ມີເຄື່ອງຂອງຕ້ອງຫ້າມ ຫຼື ເຄື່ອງຂອງທີ່ຖືກຈຳກັດ",
    zh: "没有限制或禁止物品",
  },
  greenItem3: {
    en: "No currency over USD 10,000",
    lo: "ບໍ່ມີເງິນຕາຕ່າງປະເທດເກີນ 10,000 ໂດລາ",
    zh: "没有超过10,000美元的货币",
  },
  greenItem4: {
    en: "Only personal belongings",
    lo: "ມີພຽງແຕ່ເຄື່ອງໃຊ້ສ່ວນຕົວເທົ່ານັ້ນ",
    zh: "仅有个人物品",
  },
  greenNote: {
    en: "✓ Most tourists use this channel",
    lo: "✓ ນັກທ່ອງທ່ຽວສ່ວນໃຫຍ່ແມ່ນໃຊ້ຊ່ອງທາງນີ້",
    zh: "✓ 大多数游客使用此通道",
  },

  redChannelTitle: {
    en: "Red Channel - Goods to Declare",
    lo: "ຊ່ອງທາງສີແດງ (Red Channel) - ມີສິ່ງຂອງຕ້ອງແຈ້ງ",
    zh: "红色通道 - 需申报物品",
  },
  redChannelDesc: {
    en: "Use this channel if you have:",
    lo: "ກະລຸນາໃຊ້ຊ່ອງທາງນີ້ ຫາກທ່ານ:",
    zh: "如果您有以下情况请使用此通道：",
  },
  redItem1: {
    en: "Currency over USD 10,000",
    lo: "ຖືເງິນຕາຕ່າງປະເທດເກີນ 10,000 ໂດລາ",
    zh: "超过10,000美元的货币",
  },
  redItem2: {
    en: "Commercial/business goods",
    lo: "ມີສິນຄ້າເພື່ອການຄ້າ ຫຼື ທຸລະກິດ",
    zh: "商业/商务物品",
  },
  redItem3: {
    en: "Items exceeding duty-free limits",
    lo: "ມີສິ່ງຂອງເກີນກຳນົດຍົກເວັ້ນພາສີ",
    zh: "超过免税限额的物品",
  },
  redItem4: {
    en: "Restricted items requiring permits",
    lo: "ມີເຄື່ອງຂອງຈຳກັດທີ່ຕ້ອງມີໃບອະນຸຍາດນຳເຂົ້າ",
    zh: "需要许可的限制物品",
  },
  redNote: {
    en: "Declare to avoid penalties",
    lo: "ກະລຸນາແຈ້ງຕາມຄວາມຈິງເພື່ອຫຼີກເວັ້ນຄ່າປັບໃໝ",
    zh: "申报以避免处罚",
  },

  randomInspectionTitle: {
    en: "Random Inspections",
    lo: "ການສຸ່ມກວດກາ",
    zh: "随机检查",
  },
  randomInspectionDesc: {
    en: "Even in the Green Channel, customs officers may conduct random checks:",
    lo: "ເຖິງແມ່ນວ່າຈະເຂົ້າຊ່ອງທາງສີຂຽວ, ເຈົ້າໜ້າທີ່ພາສີອາດຈະມີການສຸ່ມກວດເປັນບາງກໍລະນີ:",
    zh: "即使在绿色通道，海关人员也可能进行随机检查：",
  },
  randomItem1: {
    en: "X-ray screening of luggage",
    lo: "ການນຳສຳພາລະເຂົ້າເຄື່ອງເອັກສະເລ",
    zh: "行李X光检查",
  },
  randomItem2: {
    en: "Physical bag inspection",
    lo: "ການກວດຄົ້ນພາຍໃນກະເປົາ",
    zh: "人工行李检查",
  },
  randomItem3: {
    en: "Questions about trip purpose and items brought",
    lo: "ການສອບຖາມກ່ຽວກັບຈຸດປະສົງການເດີນທາງ ແລະ ສິ່ງຂອງທີ່ຖືມານຳ",
    zh: "询问旅行目的和携带物品",
  },
  randomItem4: {
    en: "This is normal procedure - cooperate fully",
    lo: "ນີ້ແມ່ນຂັ້ນຕອນປົກກະຕິ - ກະລຸນາໃຫ້ຄວາມຮ່ວມມືກັບເຈົ້າໜ້າທີ່",
    zh: "这是正常程序 - 请充分配合",
  },

  officersLookTitle: {
    en: "What Customs Officers Look For",
    lo: "ສິ່ງທີ່ເຈົ້າໜ້າທີ່ພາສີເພັ່ງເລັງເປັນພິເສດ",
    zh: "海关人员检查重点",
  },
  lookNarcotics: {
    en: "Narcotics: Drug detection is priority #1. K9 units patrol the area.",
    lo: "ຢາເສບຕິດ: ການກວດຫາຢາເສບຕິດແມ່ນບູລິມະສິດສູງສຸດ. ມີໜ່ວຍງານໝາກວດການ (K9) ລາດຕີເວນໃນພື້ນທີ່.",
    zh: "毒品：缉毒是首要任务。警犬巡逻该区域。",
  },
  lookCurrency: {
    en: "Undeclared currency: Large amounts of cash trigger immediate investigation",
    lo: "ເງິນຕາທີ່ບໍ່ໄດ້ແຈ້ງ: ການຖືເງິນສົດຈຳນວນຫຼາຍໂດຍບໍ່ແຈ້ງ ຈະຖືກກວດສອບທັນທີ",
    zh: "未申报货币：大量现金会立即触发调查",
  },
  lookTobaccoAlcohol: {
    en: "Excessive tobacco/alcohol: Over duty-free limits result in taxes",
    lo: "ຢາສູບ ຫຼື ເຫຼົ້າທີ່ເກີນກຳນົດ: ຫາກເກີນປະລິມານຍົກເວັ້ນພາສີ ຈະຕ້ອງໄດ້ເສຍພາສີຕາມລະບຽບ",
    zh: "超量烟酒：超过免税限额需缴税",
  },
  lookCommercial: {
    en: "Commercial goods: Items for resale require proper documentation",
    lo: "ສິນຄ້າເພື່ອການຄ້າ: ສິ່ງຂອງທີ່ຈະນຳມາຂາຍຕໍ່ ຕ້ອງມີເອກະສານຢັ້ງຢືນທີ່ຖືກຕ້ອງ",
    zh: "商业货物：转售物品需要适当文件",
  },
  lookProhibited: {
    en: "Prohibited items: Weapons, counterfeit goods, restricted materials",
    lo: "ສິ່ງຂອງຕ້ອງຫ້າມ: ອາວຸດ, ສິນຄ້າລະເມີດລິຂະສິດ, ວັດຖຸອັນຕະລາຍຕ່າງໆ",
    zh: "禁止物品：武器、假冒商品、限制材料",
  },

  penaltiesTitle: {
    en: "Penalties for False Declaration",
    lo: "ບົດລົງໂທດໃນກໍລະນີແຈ້ງຂໍ້ມູນເທັດ",
    zh: "虚假申报的处罚",
  },
  penaltyFines: {
    en: "Fines: Starting at USD 100 for minor violations",
    lo: "ຄ່າປັບໃໝ: ເລີ່ມຕົ້ນ 100 ໂດລາ ສຳລັບການລະເມີດເລັກນ້ອຍ",
    zh: "罚款：轻微违规从100美元起",
  },
  penaltyConfiscation: {
    en: "Confiscation: Undeclared goods seized",
    lo: "ການຢຶດຊັບ: ສິນຄ້າທີ່ບໍ່ໄດ້ແຈ້ງຈະຖືກຢຶດເປັນຂອງລັດ",
    zh: "没收：未申报物品被扣押",
  },
  penaltyCriminal: {
    en: "Criminal charges: For serious violations (drugs, weapons)",
    lo: "ການດຳເນີນຄະດີອາຍາ: ສຳລັບການລະເມີດທີ່ຮ້າຍແຮງ (ຢາເສບຕິດ, ອາວຸດ)",
    zh: "刑事指控：严重违规（毒品、武器）",
  },
  penaltyDeportation: {
    en: "Deportation: Possible for major infractions",
    lo: "ການເນລະເທດ: ອາດຖືກເນລະເທດອອກນອກປະເທດ ໃນກໍລະນີລະເມີດກົດໝາຍຮ້າຍແຮງ",
    zh: "驱逐出境：重大违规可能被驱逐",
  },
  penaltyBan: {
    en: "Travel ban: Entry refusal for future visits",
    lo: "ການສັ່ງຫ້າມເຂົ້າປະເທດ: ອາດຖືກປະຕິເສດການຂໍວີຊ່າ ຫຼື ເຂົ້າປະເທດໃນອະນາຄົດ",
    zh: "旅行禁令：未来访问可能被拒绝入境",
  },
  penaltyNote: {
    en: "When in doubt, use the Red Channel and declare. It's always better to declare and pay duty than face penalties.",
    lo: "ຫາກທ່ານບໍ່ໝັ້ນໃຈ, ແນະນຳໃຫ້ເຂົ້າຊ່ອງທາງສີແດງເພື່ອແຈ້ງເຈົ້າໜ້າທີ່. ການແຈ້ງ ແລະ ເສຍພາສີໃຫ້ຖືກຕ້ອງ ແມ່ນດີກວ່າການຖືກປັບໃໝ ຫຼື ດຳເນີນຄະດີ.",
    zh: "如有疑问，请使用红色通道并申报。申报并缴税总比面临处罚好。",
  },

  afterClearanceTitle: {
    en: "After Customs Clearance",
    lo: "ຫຼັງຈາກຜ່ານດ່ານພາສີ",
    zh: "通过海关后",
  },
  afterClearanceDesc: {
    en: "Once you clear customs, you've officially entered Lao PDR! You'll exit into the arrivals hall where you can:",
    lo: "ເມື່ອທ່ານຜ່ານຂັ້ນຕອນພາສີແລ້ວ, ຖືວ່າທ່ານໄດ້ເຂົ້າສູ່ ສປປ ລາວ ຢ່າງເປັນທາງການ! ທ່ານຈະອອກໄປສູ່ຫ້ອງໂຖງຂາເຂົ້າ ຊຶ່ງທ່ານສາມາດ:",
    zh: "通过海关后，您已正式进入老挝人民民主共和国！您将进入到达大厅，在那里您可以：",
  },
  afterItem1: {
    en: "Meet greeters and hotel representatives",
    lo: "ພົບປະກັບຜູ້ທີ່ມາຮັບ ຫຼື ຕົວແທນຈາກໂຮງແຮມ",
    zh: "会见接机人员和酒店代表",
  },
  afterItem2: {
    en: "Purchase SIM cards",
    lo: "ຊື້ຊິມໂທລະສັບ",
    zh: "购买SIM卡",
  },
  afterItem3: {
    en: "Arrange transportation (taxi, ride-share)",
    lo: "ຕິດຕໍ່ລົດຮັບສົ່ງ (ແທັກຊີ່ ຫຼື ລົດບໍລິການຕ່າງໆ)",
    zh: "安排交通（出租车、网约车）",
  },
  afterItem4: {
    en: "Exchange currency (if not done earlier)",
    lo: "ແລກປ່ຽນເງິນຕາ (ຫາກທ່ານຍັງບໍ່ທັນໄດ້ແລກ)",
    zh: "兑换货币（如果之前未兑换）",
  },
  afterItem5: {
    en: "Get tourist information",
    lo: "ສອບຖາມຂໍ້ມູນການທ່ອງທ່ຽວ",
    zh: "获取旅游信息",
  },

  proTip: {
    en: "Pro Tip: Keep all receipts from duty-free purchases and customs declaration forms. You may need them when departing Laos or for insurance claims.",
    lo: "ຄຳແນະນຳ: ກະລຸນາເກັບໃບຮັບເງິນຈາກການຊື້ເຄື່ອງປອດພາສີ ແລະ ສຳເນົາໃບແຈ້ງພາສີໄວ້ໃຫ້ດີ. ທ່ານອາດຈະຕ້ອງໄດ້ໃຊ້ໃນເວລາກັບອອກຈາກລາວ ຫຼື ໃຊ້ເພື່ອຢັ້ງຢືນການປະກັນໄພ.",
    zh: "小贴士：请保留所有免税购物收据和海关申报表。离开老挝或保险理赔时可能需要。",
  },

  assistanceTitle: {
    en: "Customs Assistance:",
    lo: "ການຊ່ວຍເຫຼືອຈາກເຈົ້າໜ້າທີ່ພາສີ:",
    zh: "海关协助：",
  },
  assistanceOffice: {
    en: "Customs Office: Located in baggage claim/exit area",
    lo: "ຫ້ອງການພາສີ: ຕັ້ງຢູ່ບໍລິເວນຈຸດຮັບກະເປົາ / ທາງອອກ",
    zh: "海关办公室：位于行李提取/出口区域",
  },
  assistancePhone: {
    en: "Phone: +856 84 260 179",
    lo: "ໂທລະສັບ: +856 84 260 179",
    zh: "电话：+856 84 260 179",
  },
  assistanceAvailability: {
    en: "Available during all flight operations",
    lo: "ເປີດໃຫ້ບໍລິການຕະຫຼອດໄລຍະທີ່ມີຖ້ຽວບິນ",
    zh: "所有航班运营时间内可用",
  },
} as const;

export type ExitCustomsKey = keyof typeof exitCustoms;

export const tExitCustoms = (k: ExitCustomsKey, lang: Lang) =>
  exitCustoms[k][lang] ?? exitCustoms[k].en;
