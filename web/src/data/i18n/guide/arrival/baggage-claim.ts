import type { Lang } from "@/types/language";

export const baggageClaim = {
  // Page title
  title: {
    en: "Baggage Claim",
    lo: "ຈຸດຮັບກະເປົາ",
    zh: "行李提取",
  },
  intro: {
    en: "After clearing immigration, proceed to the baggage claim area to collect your checked luggage. Bokeo International Airport has 2 baggage carousels. Flight information screens will display which carousel your flight is assigned to.",
    lo: "ຫຼັງຈາກຜ່ານຂັ້ນຕອນການກວດຄົນເຂົ້າ-ອອກເມືອງແລ້ວ, ກະລຸນາເດີນທາງໄປຫາຈຸດຮັບກະເປົາເພື່ອຮັບສຳພາລະຂອງທ່ານ. ສະໜາມບິນສາກົນບໍ່ແກ້ວ ມີສາຍພານຮັບກະເປົາ 2 ສາຍ. ທ່ານສາມາດກວດເບິ່ງເລກຖ້ຽວບິນ ແລະ ສາຍພານທີ່ກຳນົດໃຫ້ໄດ້ ຢູ່ໜ້າຈໍສະແດງຂໍ້ມູນຖ້ຽວບິນ.",
    zh: "通过边检后，请前往行李提取区领取托运行李。博胶国际机场有2条行李传送带。航班信息显示屏会显示您的航班分配到哪条传送带。",
  },

  // Wait times
  waitTimesTitle: {
    en: "Typical Wait Times:",
    lo: "ໄລຍະເວລາລໍຖ້າໂດຍປະມານ:",
    zh: "典型等待时间：",
  },
  firstBags: {
    en: "First bags appear: 15-25 minutes after landing",
    lo: "ກະເປົາຊຸດທຳອິດ: 15-25 ນາທີ ຫຼັງຈາກຍົນລົງຈອດ",
    zh: "首件行李出现：降落后15-25分钟",
  },
  mostBags: {
    en: "Most bags delivered: Within 30-40 minutes",
    lo: "ກະເປົາສ່ວນໃຫຍ່: ພາຍໃນ 30-40 ນາທີ",
    zh: "大部分行李送达：30-40分钟内",
  },
  priorityBags: {
    en: "Priority bags (business class): Usually first",
    lo: "ກະເປົາບຸລິມະສິດ (ຊັ້ນທຸລະກິດ): ປົກກະຕິຈະອອກມາກ່ອນ",
    zh: "优先行李（商务舱）：通常最先送达",
  },

  // Collecting luggage
  collectingTitle: {
    en: "Collecting Your Luggage",
    lo: "ຂັ້ນຕອນການຮັບກະເປົາ",
    zh: "领取行李",
  },
  collectStep1: {
    en: "Check information screens for your flight number and assigned carousel",
    lo: "ກວດເບິ່ງໜ້າຈໍຂໍ້ມູນສຳລັບເລກຖ້ຽວບິນ ແລະ ສາຍພານທີ່ກຳນົດໃຫ້",
    zh: "查看信息屏幕上的航班号和分配的传送带",
  },
  collectStep2: {
    en: "Position yourself near the carousel exit point for better visibility",
    lo: "ຢືນລໍຖ້າຢູ່ບໍລິເວນຈຸດປ່ອຍກະເປົາ ເພື່ອໃຫ້ສັງເກດເຫັນໄດ້ງ່າຍ",
    zh: "站在传送带出口附近以便更好地观察",
  },
  collectStep3: {
    en: "Verify baggage tag matches your claim tag before taking luggage",
    lo: "ກະລຸນາກວດສອບເບິ່ງບັດຝາກກະເປົາ ໃຫ້ກົງກັບບັດຮັບກະເປົາຂອງທ່ານ ກ່ອນຈະຍົກອອກຈາກສາຍພານ",
    zh: "取行李前请核对行李牌与您的行李票是否一致",
  },
  collectStep4: {
    en: "Inspect luggage for damage immediately - report any damage before leaving baggage hall",
    lo: "ກວດເບິ່ງຄວາມຮຽບຮ້ອຍຂອງກະເປົາທັນທີ - ຫາກພົບຄວາມເສຍຫາຍ ໃຫ້ແຈ້ງເຈົ້າໜ້າທີ່ກ່ອນອອກຈາກຫ້ອງຮັບກະເປົາ",
    zh: "立即检查行李是否损坏 - 离开行李大厅前报告任何损坏",
  },
  collectStep5: {
    en: "Use luggage cart (available free of charge) for heavy or multiple bags",
    lo: "ມີລົດເຂັນກະເປົາໃຫ້ບໍລິການຟຣີ ສຳລັບກະເປົາທີ່ມີນ້ຳໜັກຫຼາຍ ຫຼື ມີຫຼາຍໜ່ວຍ",
    zh: "使用行李推车（免费提供）搬运重行李或多件行李",
  },

  // Important reminders
  remindersTitle: {
    en: "Important Reminders",
    lo: "ຂໍ້ຄວນລະວັງ ແລະ ຄຳເຕືອນສຳຄັນ",
    zh: "重要提醒",
  },
  reminder1: {
    en: "Keep your baggage claim tag (from check-in) until you've collected all luggage",
    lo: "ກະລຸນາເກັບບັດຮັບກະເປົາ (ທີ່ໄດ້ຈາກຕອນແຈ້ງປີ້) ໄວ້ໃຫ້ດີ ຈົນກວ່າຈະໄດ້ຮັບກະເປົາຄົບທຸກໜ່ວຍ",
    zh: "保管好行李票（值机时的）直到取完所有行李",
  },
  reminder2: {
    en: "Watch your belongings - never leave bags unattended",
    lo: "ກະລຸນາເຝົ້າລະວັງຊັບສິນຂອງທ່ານ - ຫ້າມວາງກະເປົາປະໄວ້ໂດຍບໍ່ມີຄົນເບິ່ງແຍງ",
    zh: "看管好您的物品 - 切勿让行李无人看管",
  },
  reminder3: {
    en: "Fragile items may arrive on separate carousel or service counter",
    lo: "ເຄື່ອງຂອງທີ່ແຕກງ່າຍ ອາດຈະຖືກແຍກມາທາງສາຍພານພິເສດ ຫຼື ຢູ່ເຄົາເຕີບໍລິການ",
    zh: "易碎物品可能在单独的传送带或服务柜台送达",
  },
  reminder4: {
    en: "Special items (sports equipment, strollers) delivered at oversized baggage area",
    lo: "ສິ່ງຂອງພິເສດ (ອຸປະກອນກິລາ, ລົດເຂັນເດັກນ້ອຍ) ສາມາດຮັບໄດ້ຢູ່ບໍລິເວນກະເປົາຂະໜາດໃຫຍ່ (Oversized Baggage)",
    zh: "特殊物品（运动器材、婴儿车）在超大行李区领取",
  },

  // Lost/damaged baggage
  lostDamagedTitle: {
    en: "Lost, Delayed, or Damaged Baggage",
    lo: "ກໍລະນີກະເປົາເສຍ, ຊັກຊ້າ ຫຼື ເສຍຫາຍ",
    zh: "遗失、延误或损坏行李",
  },
  missingBaggageTitle: {
    en: "Missing Baggage",
    lo: "ກະເປົາບໍ່ມາຮອດ ຫຼື ສູນຫາຍ",
    zh: "行李遗失",
  },
  missingBaggageDesc: {
    en: "If your luggage doesn't arrive:",
    lo: "ຫາກກະເປົາຂອງທ່ານບໍ່ມາຮອດຕາມກຳນົດ:",
    zh: "如果您的行李未送达：",
  },
  missingStep1: {
    en: "Wait until carousel stops completely",
    lo: "ລໍຖ້າຈົນກວ່າສາຍພານຈະຢຸດໝຸນສະນິດ",
    zh: "等待传送带完全停止",
  },
  missingStep2: {
    en: "Go to Baggage Services counter immediately",
    lo: "ຟ້າວໄປຕິດຕໍ່ທີ່ເຄົາເຕີບໍລິການກະເປົາ (Baggage Services) ທັນທີ",
    zh: "立即前往行李服务柜台",
  },
  missingStep3: {
    en: "Present baggage claim tag and boarding pass",
    lo: "ຍື່ນບັດຮັບກະເປົາ ແລະ ບັດຂຶ້ນເຮືອບິນ (Boarding Pass)",
    zh: "出示行李票和登机牌",
  },
  missingStep4: {
    en: "File Property Irregularity Report (PIR)",
    lo: "ຂຽນໃບລາຍງານຄວາມຜິດປົກກະຕິຂອງຊັບສິນ (PIR)",
    zh: "填写财产不正常报告（PIR）",
  },
  missingStep5: {
    en: "Provide local contact information",
    lo: "ໃຫ້ຂໍ້ມູນ ແລະ ເບີໂທລະສັບຕິດຕໍ່ໃນທ້ອງຖິ່ນ",
    zh: "提供当地联系信息",
  },
  missingStep6: {
    en: "Keep PIR reference number",
    lo: "ເກັບເລກອ້າງອີງ PIR ໄວ້ເພື່ອຕິດຕາມຜົນ",
    zh: "保留PIR参考编号",
  },

  damagedBaggageTitle: {
    en: "Damaged Baggage",
    lo: "ກະເປົາເສຍຫາຍ",
    zh: "行李损坏",
  },
  damagedBaggageDesc: {
    en: "If you notice damage:",
    lo: "ຫາກທ່ານພົບວ່າກະເປົາເສຍຫາຍ:",
    zh: "如果您发现损坏：",
  },
  damagedStep1: {
    en: "Report immediately at Baggage Services",
    lo: "ແຈ້ງເຈົ້າໜ້າທີ່ຢູ່ຈຸດບໍລິການກະເປົາທັນທີ",
    zh: "立即在行李服务处报告",
  },
  damagedStep2: {
    en: "Do NOT leave baggage claim area first",
    lo: "ຫ້າມອອກຈາກບໍລິເວນຈຸດຮັບກະເປົາ ຈົນກວ່າຈະແຈ້ງຄວາມເສຍຫາຍສຳເລັດ",
    zh: "请勿先离开行李提取区",
  },
  damagedStep3: {
    en: "Take photos of damage",
    lo: "ຖ່າຍຮູບຄວາມເສຍຫາຍໄວ້ເປັນຫຼັກຖານ",
    zh: "拍摄损坏照片",
  },
  damagedStep4: {
    en: "Complete damage report form",
    lo: "ຕື່ມແບບຟອມລາຍງານຄວາມເສຍຫາຍໃຫ້ຄົບຖ້ວນ",
    zh: "填写损坏报告表",
  },
  damagedStep5: {
    en: "Claims must be filed within 7 days",
    lo: "ຕ້ອງຍື່ນຄຳຮ້ອງຂໍຊົດເຊີຍພາຍໃນ 7 ວັນ",
    zh: "必须在7天内提出索赔",
  },
  damagedStep6: {
    en: "Contact airline for compensation",
    lo: "ຕິດຕໍ່ສາຍການບິນເພື່ອດຳເນີນການຊົດເຊີຍ",
    zh: "联系航空公司索赔",
  },

  // Baggage services
  servicesOfficeTitle: {
    en: "Baggage Services Office",
    lo: "ຫ້ອງການບໍລິການກະເປົາ",
    zh: "行李服务处",
  },
  servicesLocation: {
    en: "Location: Baggage claim hall, near carousel 2",
    lo: "ສະຖານທີ່: ຫ້ອງໂຖງຮັບກະເປົາ, ໃກ້ກັບສາຍພານສາຍທີ 2",
    zh: "位置：行李提取大厅，2号传送带附近",
  },
  servicesHours: {
    en: "Operating Hours: Available for all arriving flights",
    lo: "ເວລາໃຫ້ບໍລິການ: ເປີດໃຫ້ບໍລິການທຸກຖ້ຽວບິນທີ່ຂາເຂົ້າ",
    zh: "营业时间：所有到达航班时段",
  },
  servicesProvided: {
    en: "Services Provided:",
    lo: "ການບໍລິການທີ່ມີໃຫ້:",
    zh: "提供的服务：",
  },
  serviceLostTracking: {
    en: "Lost baggage tracking and reports",
    lo: "ຕິດຕາມ ແລະ ອອກໃບລາຍງານກະເປົາສູນຫາຍ",
    zh: "遗失行李追踪和报告",
  },
  serviceDamageClaims: {
    en: "Damage claims processing",
    lo: "ດຳເນີນການຮ້ອງຂໍຄ່າເສຍຫາຍ",
    zh: "损坏索赔处理",
  },
  serviceDelayedDelivery: {
    en: "Delayed baggage delivery arrangements",
    lo: "ຈັດການເລື່ອງການສົ່ງກະເປົາທີ່ມາຮອດຊັກຊ້າ",
    zh: "延误行李送达安排",
  },
  serviceOversized: {
    en: "Oversized/special items assistance",
    lo: "ຊ່ວຍເຫຼືອດ້ານສຳພາລະຂະໜາດໃຫຍ່ ຫຼື ສິ່ງຂອງພິເສດ",
    zh: "超大/特殊物品协助",
  },

  // Pro tip
  proTip: {
    en: "Pro Tip: Most delayed bags arrive on the next available flight (usually within 24-48 hours). The airline will deliver to your accommodation free of charge. Keep your PIR number and check status online using airline baggage tracking systems.",
    lo: "ຄຳແນະນຳ: ກະເປົາທີ່ຊັກຊ້າສ່ວນໃຫຍ່ ຈະມາຮອດນຳຖ້ຽວບິນຖັດໄປ (ພາຍໃນ 24-48 ຊົ່ວໂມງ). ສາຍການບິນຈະຈັດສົ່ງໃຫ້ຮອດທີ່ພັກຂອງທ່ານໂດຍບໍ່ເສຍຄ່າ. ກະລຸນາເກັບເລກ PIR ໄວ້ ແລະ ສາມາດກວດສອບສະຖານະທາງອອນໄລນ໌ໄດ້.",
    zh: "小贴士：大多数延误行李会在下一班可用航班送达（通常在24-48小时内）。航空公司会免费送到您的住宿地。请保留PIR编号并使用航空公司行李追踪系统在线查询状态。",
  },

  // Contact
  contactTitle: {
    en: "Baggage Services Contact:",
    lo: "ຂໍ້ມູນຕິດຕໍ່ບໍລິການກະເປົາ:",
    zh: "行李服务联系方式：",
  },
  contactPhone: {
    en: "Phone: +856 84 260 179",
    lo: "ໂທລະສັບ: +856 84 260 179",
    zh: "电话：+856 84 260 179",
  },
  contactEmail: {
    en: "Email: baggage@bokeoairport.la",
    lo: "ອີເມວ: baggage@bokeoairport.la",
    zh: "邮箱：baggage@bokeoairport.la",
  },
  contactAirline: {
    en: "For airline-specific issues, contact your airline's customer service directly",
    lo: "ສຳລັບບັນຫາສະເພາະຂອງແຕ່ລະສາຍການບິນ, ກະລຸນາຕິດຕໍ່ຝ່າຍບໍລິການລູກຄ້າຂອງສາຍການບິນນັ້ນໂດຍກົງ",
    zh: "如有航空公司特定问题，请直接联系您航空公司的客户服务",
  },
} as const;

export type BaggageClaimKey = keyof typeof baggageClaim;

export const tBaggageClaim = (k: BaggageClaimKey, lang: Lang) =>
  baggageClaim[k][lang] ?? baggageClaim[k].en;
