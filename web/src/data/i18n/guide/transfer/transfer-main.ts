import type { Lang } from "@/types/language";

export const transferMain = {
  // Page header
  pageTitle: {
    en: "Transferring at Bokeo International Airport",
    lo: "ການໂອນຍ້າຍທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "在博胶国际机场转机",
  },
  pageIntro: {
    en: "Transferring between flights, please follow this guide for a smooth connection. Currently, we operate domestic transfers with our partner airlines.",
    lo: "ການໂອນຍ້າຍລະຫວ່າງຖ້ຽວບິນ, ກະລຸນາປະຕິບັດຕາມຄູ່ມືນີ້ເພື່ອການເຊື່ອມຕໍ່ທີ່ລຽບງ່າຍ. ປະຈຸບັນ, ພວກເຮົາດຳເນີນການໂອນຍ້າຍພາຍໃນປະເທດກັບສາຍການບິນພາກສ່ວນຂອງພວກເຮົາ.",
    zh: "航班之间转机时，请遵循本指南以确保顺利衔接。目前，我们与合作航空公司运营国内转机服务。",
  },

  // Important notice
  importantTitle: {
    en: "Important:",
    lo: "ສຳຄັນ:",
    zh: "重要提示：",
  },
  importantDesc: {
    en: "Upon arrival, proceed immediately to the Transfer Counter in the arrivals hall. Keep your booking confirmation and boarding pass ready for verification.",
    lo: "ເມື່ອມາຮອດ, ໄປທີ່ເຄົາເຕີໂອນຍ້າຍໃນຫ້ອງມາຮອດທັນທີ. ກະກຽມໃບຢືນຢັນການຈອງ ແລະ ບັດຂຶ້ນເຮືອບິນໃຫ້ພ້ອມສຳລັບການກວດສອບ.",
    zh: "到达后，请立即前往到达大厅的转机柜台。请准备好预订确认和登机牌以供核验。",
  },

  // Operating airlines
  airlinesTitle: {
    en: "Airlines Operating Domestic Transfers",
    lo: "ສາຍການບິນທີ່ດຳເນີນການໂອນຍ້າຍພາຍໃນປະເທດ",
    zh: "运营国内转机的航空公司",
  },

  // Transfer process
  processTitle: {
    en: "Transfer Process",
    lo: "ຂະບວນການໂອນຍ້າຍ",
    zh: "转机流程",
  },

  // Step 1
  step1Title: {
    en: "Proceed to Transfer Counter",
    lo: "ໄປທີ່ເຄົາເຕີໂອນຍ້າຍ",
    zh: "前往转机柜台",
  },
  step1Desc: {
    en: "After disembarking, follow signs to the Transfer Counter located in the main arrivals hall. The counter is open during all flight operations and staffed by airline representatives.",
    lo: "ຫຼັງຈາກລົງຈາກເຮືອບິນ, ຕິດຕາມປ້າຍໄປຫາເຄົາເຕີໂອນຍ້າຍທີ່ຕັ້ງຢູ່ໃນຫ້ອງມາຮອດຫຼັກ. ເຄົາເຕີເປີດໃນເວລາດຳເນີນການບິນທັງໝົດ ແລະ ມີພະນັກງານຕາງໜ້າສາຍການບິນປະຈຳການ.",
    zh: "下机后，请按照指示牌前往主到达大厅的转机柜台。柜台在所有航班运营时段开放，并配有航空公司代表。",
  },

  // Step 2
  step2Title: {
    en: "Complete Check-in",
    lo: "ສຳເລັດການແຈ້ງປີ້",
    zh: "完成值机",
  },
  step2Desc: {
    en: "Present your documents to receive your new boarding pass for the connecting flight.",
    lo: "ສະແດງເອກະສານຂອງທ່ານເພື່ອຮັບບັດຂຶ້ນເຮືອບິນໃໝ່ສຳລັບຖ້ຽວບິນເຊື່ອມຕໍ່.",
    zh: "出示您的文件以获取续程航班的新登机牌。",
  },
  documentsNeededTitle: {
    en: "Documents Needed:",
    lo: "ເອກະສານທີ່ຕ້ອງການ:",
    zh: "所需文件：",
  },
  doc1: {
    en: "Valid passport or ID",
    lo: "ໜັງສືຜ່ານແດນ ຫຼື ID ທີ່ຍັງໃຊ້ໄດ້",
    zh: "有效护照或身份证",
  },
  doc2: {
    en: "Boarding pass from arrival flight",
    lo: "ບັດຂຶ້ນເຮືອບິນຈາກຖ້ຽວບິນທີ່ມາຮອດ",
    zh: "到达航班的登机牌",
  },
  doc3: {
    en: "Booking confirmation (PNR)",
    lo: "ໃບຢືນຢັນການຈອງ (PNR)",
    zh: "预订确认（PNR）",
  },
  doc4: {
    en: "Any visa (if required)",
    lo: "ວີຊ່າໃດໆ (ຖ້າຕ້ອງການ)",
    zh: "签证（如需要）",
  },

  // Step 3
  step3Title: {
    en: "Security Screening",
    lo: "ການກວດຄວາມປອດໄພ",
    zh: "安检",
  },
  step3Desc: {
    en: "All transfer passengers must pass through security screening before proceeding to the departure gate.",
    lo: "ຜູ້ໂດຍສານໂອນຍ້າຍທັງໝົດຕ້ອງຜ່ານການກວດຄວາມປອດໄພກ່ອນໄປປະຕູຂາອອກ.",
    zh: "所有转机旅客必须通过安检后才能前往登机口。",
  },
  securityItem1: {
    en: "Remove electronic devices larger than a phone from bags",
    lo: "ເອົາອຸປະກອນເອເລັກໂຕຣນິກທີ່ໃຫຍ່ກວ່າໂທລະສັບອອກຈາກກະເປົາ",
    zh: "从包中取出比手机大的电子设备",
  },
  securityItem2: {
    en: "Place all metal items in tray",
    lo: "ວາງສິ່ງຂອງໂລຫະທັງໝົດໃສ່ຖາດ",
    zh: "将所有金属物品放入托盘",
  },
  securityItem3: {
    en: "Liquids must follow 100ml container rule",
    lo: "ຂອງແຫຼວຕ້ອງປະຕິບັດຕາມກົດ 100ml ຕໍ່ຖັງ",
    zh: "液体必须遵守100毫升容器规则",
  },
  securityItem4: {
    en: "Follow staff instructions carefully",
    lo: "ປະຕິບັດຕາມຄຳແນະນຳຂອງພະນັກງານຢ່າງລະມັດລະວັງ",
    zh: "请仔细遵循工作人员的指示",
  },

  // Step 4
  step4Title: {
    en: "Proceed to Departure Gate",
    lo: "ໄປປະຕູຂາອອກ",
    zh: "前往登机口",
  },
  step4Desc: {
    en: "After security, check departure screens for your gate number and boarding time. Gates may change, so check screens regularly.",
    lo: "ຫຼັງຈາກຜ່ານຄວາມປອດໄພ, ກວດເບິ່ງໜ້າຈໍຂາອອກສຳລັບເລກປະຕູ ແລະ ເວລາຂຶ້ນເຮືອບິນ. ປະຕູອາດປ່ຽນແປງ, ສະນັ້ນກວດເບິ່ງໜ້າຈໍເປັນປະຈຳ.",
    zh: "通过安检后，查看离港显示屏了解登机口号码和登机时间。登机口可能变更，请定期查看显示屏。",
  },
  gateInfo1: {
    en: "Boarding typically begins 30-40 minutes before departure",
    lo: "ປົກກະຕິເລີ່ມຂຶ້ນເຮືອບິນກ່ອນອອກເດີນທາງ 30-40 ນາທີ",
    zh: "通常在起飞前30-40分钟开始登机",
  },
  gateInfo2: {
    en: "Be at gate at least 20 minutes before boarding",
    lo: "ຢູ່ປະຕູຢ່າງໜ້ອຍ 20 ນາທີກ່ອນຂຶ້ນເຮືອບິນ",
    zh: "请至少在登机前20分钟到达登机口",
  },
  gateInfo3: {
    en: "Gates close 10 minutes before departure",
    lo: "ປະຕູປິດກ່ອນອອກເດີນທາງ 10 ນາທີ",
    zh: "登机口在起飞前10分钟关闭",
  },
  gateInfo4: {
    en: "Listen for announcements regarding your flight",
    lo: "ຟັງການປະກາດກ່ຽວກັບຖ້ຽວບິນຂອງທ່ານ",
    zh: "请留意有关您航班的广播通知",
  },

  // Baggage information
  baggageTitle: {
    en: "Baggage Transfer Information",
    lo: "ຂໍ້ມູນການໂອນຍ້າຍກະເປົາ",
    zh: "行李转运信息",
  },
  throughCheckedTitle: {
    en: "Through-Checked Baggage:",
    lo: "ກະເປົາທີ່ກວດຜ່ານ:",
    zh: "直挂行李：",
  },
  throughCheckedDesc: {
    en: "If your baggage is checked through to your final destination, inform the transfer counter staff. They will coordinate the transfer for you – you don't need to collect your bags.",
    lo: "ຖ້າກະເປົາຂອງທ່ານຖືກກວດຜ່ານໄປຈຸດໝາຍປາຍທາງສຸດທ້າຍ, ແຈ້ງພະນັກງານເຄົາເຕີໂອນຍ້າຍ. ເຂົາເຈົ້າຈະປະສານງານການໂອນຍ້າຍໃຫ້ທ່ານ – ທ່ານບໍ່ຕ້ອງເກັບກະເປົາ.",
    zh: "如果您的行李直挂到最终目的地，请告知转机柜台工作人员。他们将为您协调转运 - 您无需提取行李。",
  },
  separateTicketsTitle: {
    en: "Separate Tickets:",
    lo: "ປີ້ແຍກກັນ:",
    zh: "分开购票：",
  },
  separateTicketsDesc: {
    en: "If you purchased separate tickets, you must collect your baggage from the baggage claim area and re-check it at the transfer counter for your connecting flight.",
    lo: "ຖ້າທ່ານຊື້ປີ້ແຍກກັນ, ທ່ານຕ້ອງເກັບກະເປົາຈາກພື້ນທີ່ຮັບກະເປົາ ແລະ ກວດຄືນໃໝ່ທີ່ເຄົາເຕີໂອນຍ້າຍສຳລັບຖ້ຽວບິນເຊື່ອມຕໍ່ຂອງທ່ານ.",
    zh: "如果您分开购买机票，必须从行李提取区领取行李，并在转机柜台重新托运续程航班的行李。",
  },

  // MCT
  mctTitle: {
    en: "Minimum Connection Time (MCT)",
    lo: "ເວລາເຊື່ອມຕໍ່ຕ່ຳສຸດ (MCT)",
    zh: "最短转机时间（MCT）",
  },
  mctEffective: {
    en: "Effective from July 1, 2025",
    lo: "ມີຜົນບັງຄັບໃຊ້ຕັ້ງແຕ່ 1 ກໍລະກົດ 2025",
    zh: "自2025年7月1日起生效",
  },
  mctImportant: {
    en: "Important:",
    lo: "ສຳຄັນ:",
    zh: "重要提示：",
  },
  mctNote: {
    en: "MCT is the minimum required time. We recommend allowing extra time during peak hours for a comfortable transfer experience.",
    lo: "MCT ແມ່ນເວລາຕ່ຳສຸດທີ່ຕ້ອງການ. ພວກເຮົາແນະນຳໃຫ້ອະນຸຍາດເວລາພິເສດໃນຊົ່ວໂມງພີກເພື່ອປະສົບການໂອນຍ້າຍທີ່ສະດວກສະບາຍ.",
    zh: "MCT是所需的最短时间。我们建议在高峰时段预留额外时间，以获得舒适的转机体验。",
  },

  // MCT table headers
  transferType: {
    en: "Transfer Type",
    lo: "ປະເພດການໂອນຍ້າຍ",
    zh: "转机类型",
  },
  sameTerminal: {
    en: "Same Terminal",
    lo: "ເທີມິນັລດຽວກັນ",
    zh: "同航站楼",
  },
  differentTerminal: {
    en: "Different Terminal",
    lo: "ເທີມິນັລຕ່າງກັນ",
    zh: "不同航站楼",
  },

  // MCT table rows
  domesticToDomestic: {
    en: "Domestic to Domestic",
    lo: "ພາຍໃນປະເທດສູ່ພາຍໃນປະເທດ",
    zh: "国内到国内",
  },
  intlToDomestic: {
    en: "International to Domestic",
    lo: "ສາກົນສູ່ພາຍໃນປະເທດ",
    zh: "国际到国内",
  },
  domesticToIntl: {
    en: "Domestic to International",
    lo: "ພາຍໃນປະເທດສູ່ສາກົນ",
    zh: "国内到国际",
  },
  intlToIntl: {
    en: "International to International",
    lo: "ສາກົນສູ່ສາກົນ",
    zh: "国际到国际",
  },

  // MCT times
  minutes60: {
    en: "60 minutes",
    lo: "60 ນາທີ",
    zh: "60分钟",
  },
  minutes90: {
    en: "90 minutes",
    lo: "90 ນາທີ",
    zh: "90分钟",
  },
  minutes120: {
    en: "120 minutes",
    lo: "120 ນາທີ",
    zh: "120分钟",
  },
  minutes150: {
    en: "150 minutes",
    lo: "150 ນາທີ",
    zh: "150分钟",
  },
  notApplicable: {
    en: "—",
    lo: "—",
    zh: "—",
  },

  // Help & Contact
  needAssistance: {
    en: "Need Assistance?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອ?",
    zh: "需要帮助？",
  },
  transferCounterTitle: {
    en: "Transfer Counter",
    lo: "ເຄົາເຕີໂອນຍ້າຍ",
    zh: "转机柜台",
  },
  transferCounterLocation: {
    en: "Main arrivals hall",
    lo: "ຫ້ອງມາຮອດຫຼັກ",
    zh: "主到达大厅",
  },
  transferCounterHours: {
    en: "Open during flight operations",
    lo: "ເປີດໃນເວລາດຳເນີນການບິນ",
    zh: "航班运营时段开放",
  },
  airportInfoTitle: {
    en: "Airport Information",
    lo: "ຂໍ້ມູນສະໜາມບິນ",
    zh: "机场信息",
  },
  airportInfo247: {
    en: "24/7 assistance available",
    lo: "ມີການຊ່ວຍເຫຼືອ 24/7",
    zh: "24/7提供协助",
  },
  multilingualStaff: {
    en: "Multilingual staff",
    lo: "ພະນັກງານຫຼາຍພາສາ",
    zh: "多语言工作人员",
  },
} as const;

export type TransferMainKey = keyof typeof transferMain;

export const tTransferMain = (k: TransferMainKey, lang: Lang) =>
  transferMain[k][lang] ?? transferMain[k].en;
