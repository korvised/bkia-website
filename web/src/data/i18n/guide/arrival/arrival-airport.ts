import type { Lang } from "@/types/language";

export const arrivalAirport = {
  // Page title and intro
  title: {
    en: "Arriving at Bokeo International Airport",
    lo: "ມາຮອດສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "抵达博胶国际机场",
  },
  intro: {
    en: "Welcome to Bokeo International Airport! If you're arriving on a flight with a stopover or transfer, please follow the passage directly to proceed to international arrivals. If your flight is non-stop to Bokeo, please follow signs to the arrivals hall.",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ! ຖ້າທ່ານມາຮອດດ້ວຍຖ້ຽວບິນທີ່ມີການແວະ ຫຼື ຕໍ່ຖ້ຽວບິນ, ກະລຸນາຕິດຕາມທາງຜ່ານໄປຍັງຈຸດມາຮອດສາກົນໂດຍກົງ. ຖ້າຖ້ຽວບິນຂອງທ່ານບິນກົງມາບໍ່ແກ້ວ, ກະລຸນາຕິດຕາມປ້າຍໄປຫ້ອງໂຖງຜູ້ໂດຍສານຂາເຂົ້າ.",
    zh: "欢迎来到博胶国际机场！如果您乘坐的是经停或转机航班，请直接前往国际到达通道。如果您的航班直飞博胶，请按照指示牌前往国际到达大厅。",
  },

  // Important notice
  importantTitle: {
    en: "Important:",
    lo: "ສຳຄັນ:",
    zh: "重要提示：",
  },
  importantDesc: {
    en: "Upon landing, remain seated with your seatbelt fastened until the aircraft comes to a complete stop and the seatbelt sign is turned off. Please check that you have all your belongings before disembarking.",
    lo: "ເມື່ອລົງຈອດແລ້ວ, ກະລຸນານັ່ງຢູ່ບ່ອນຂອງທ່ານ ແລະ ຮັດສາຍແອວໄວ້ຈົນກວ່າເຮືອບິນຈະຢຸດສະໜິດ ແລະ ປ້າຍສັນຍານຮັດສາຍແອວດັບລົງ. ກະລຸນາກວດເບິ່ງວ່າທ່ານມີສິ່ງຂອງຄົບຖ້ວນກ່ອນລົງຈາກເຮືອບິນ.",
    zh: "降落后，请保持就座并系好安全带，直到飞机完全停稳且安全带指示灯熄灭。下机前请检查随身物品是否齐全。",
  },

  // Disembarkation
  disembarkationTitle: {
    en: "Disembarkation Process",
    lo: "ຂັ້ນຕອນການລົງຈາກເຮືອບິນ",
    zh: "下机流程",
  },
  disembarkStep1: {
    en: "Follow cabin crew instructions for orderly disembarkation",
    lo: "ປະຕິບັດຕາມຄຳແນະນຳຂອງລູກເຮືອສຳລັບການລົງຈາກເຮືອບິນຢ່າງເປັນລະບຽບ",
    zh: "听从机组人员的指示有序下机",
  },
  disembarkStep2: {
    en: "Collect all cabin baggage from overhead bins",
    lo: "ເກັບກະເປົາຖືຂຶ້ນເຮືອບິນທັງໝົດຈາກຊ່ອງເກັບຂອງດ້ານເທິງ",
    zh: "从头顶行李舱取出所有随身行李",
  },
  disembarkStep3: {
    en: "Check your seat area for personal items (phones, glasses, documents)",
    lo: "ກວດເບິ່ງບໍລິເວນບ່ອນນັ່ງຂອງທ່ານວ່າມີສິ່ງຂອງສ່ວນຕົວ (ໂທລະສັບ, ແວ່ນຕາ, ເອກະສານ)",
    zh: "检查座位区域是否遗留个人物品（手机、眼镜、文件）",
  },
  disembarkStep4: {
    en: "Follow signs for \"International Arrivals\" (ມາເຖິງສາກົນ / 国际到达)",
    lo: "ຕິດຕາມປ້າຍ \"ມາເຖິງສາກົນ\" (International Arrivals / 国际到达)",
    zh: "按照\"国际到达\"（International Arrivals / ມາເຖິງສາກົນ）指示牌前行",
  },
  disembarkStep5: {
    en: "Proceed through the jet bridge or down aircraft stairs to terminal",
    lo: "ຍ່າງຜ່ານທາງສະພານເຊື່ອມ ຫຼື ລົງບັນໄດເຮືອບິນໄປຫາອາຄານຜູ້ໂດຍສານ",
    zh: "通过登机桥或飞机舷梯前往航站楼",
  },

  // First steps
  firstStepsTitle: {
    en: "First Steps After Landing",
    lo: "ຂັ້ນຕອນທຳອິດຫຼັງຈາກລົງຈອດ",
    zh: "降落后的首要步骤",
  },
  firstStepsDesc: {
    en: "Once inside the terminal, follow directional signs to:",
    lo: "ເມື່ອເຂົ້າມາໃນອາຄານຜູ້ໂດຍສານແລ້ວ, ຕິດຕາມປ້າຍທິດທາງໄປ:",
    zh: "进入航站楼后，请按照指示牌前往：",
  },
  healthScreening: {
    en: "Health Screening (if required - during health emergencies)",
    lo: "ການກວດສຸຂະພາບ (ຖ້າຕ້ອງການ - ໃນກໍລະນີສຸກເສີນດ້ານສຸຂະພາບ)",
    zh: "健康筛查（如需要 - 在健康紧急情况期间）",
  },
  immigrationControl: {
    en: "Immigration/Passport Control - First checkpoint for all international arrivals",
    lo: "ການກວດຄົນເຂົ້າ-ອອກເມືອງ/ກວດໜັງສືຜ່ານແດນ - ຈຸດກວດທຳອິດສຳລັບຜູ້ມາຮອດສາກົນທັງໝົດ",
    zh: "边检/护照检查 - 所有国际到达旅客的第一个检查站",
  },
  baggageClaim: {
    en: "Baggage Claim - After immigration clearance",
    lo: "ຮັບກະເປົາ - ຫຼັງຈາກຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "行李提取 - 通过边检后",
  },
  customsCheckpoint: {
    en: "Customs - Final checkpoint before entering Laos",
    lo: "ພາສີ - ຈຸດກວດສຸດທ້າຍກ່ອນເຂົ້າປະເທດລາວ",
    zh: "海关 - 进入老挝前的最后检查站",
  },

  // Processing time
  processingTimeTitle: {
    en: "⏱️ Estimated Processing Time:",
    lo: "⏱️ ເວລາປະມວນຜົນໂດຍປະມານ:",
    zh: "⏱️ 预计处理时间：",
  },
  processingTimeDesc: {
    en: "Allow 30-60 minutes for the complete arrival process during normal hours, longer during peak times (multiple flight arrivals). Be patient and follow staff directions.",
    lo: "ໃຊ້ເວລາ 30-60 ນາທີ ສຳລັບຂະບວນການມາຮອດທັງໝົດໃນເວລາປົກກະຕິ, ນານກວ່ານັ້ນໃນເວລາພີກ (ມີຖ້ຽວບິນຫຼາຍຖ້ຽວມາຮອດ). ກະລຸນາອົດທົນ ແລະ ປະຕິບັດຕາມຄຳແນະນຳຂອງພະນັກງານ.",
    zh: "正常时段完成整个到达流程需要30-60分钟，高峰期（多个航班到达）时间更长。请耐心等待并听从工作人员指示。",
  },

  // Facilities
  facilitiesTitle: {
    en: "Airport Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກຂອງສະໜາມບິນ",
    zh: "机场设施",
  },
  availableServices: {
    en: "Available Services:",
    lo: "ບໍລິການທີ່ມີ:",
    zh: "可用服务：",
  },
  currencyExchange: {
    en: "Currency exchange booths",
    lo: "ຈຸດແລກປ່ຽນເງິນ",
    zh: "货币兑换处",
  },
  atmMachines: {
    en: "ATM machines (LAK, USD withdrawal)",
    lo: "ຕູ້ ATM (ຖອນເງິນ LAK, USD)",
    zh: "ATM机（可提取老挝基普和美元）",
  },
  freeWifi: {
    en: "Free WiFi throughout terminal",
    lo: "WiFi ຟຣີທົ່ວອາຄານຜູ້ໂດຍສານ",
    zh: "航站楼全覆盖免费WiFi",
  },
  infoDesks: {
    en: "Information desks",
    lo: "ເຄົາເຕີຂໍ້ມູນ",
    zh: "问询台",
  },
  restrooms: {
    en: "Restrooms",
    lo: "ຫ້ອງນ້ຳ",
    zh: "洗手间",
  },
  waterStations: {
    en: "Drinking water stations",
    lo: "ຈຸດນ້ຳດື່ມ",
    zh: "饮用水站",
  },
  assistanceAvailable: {
    en: "Assistance Available:",
    lo: "ການຊ່ວຍເຫຼືອທີ່ມີ:",
    zh: "可用协助服务：",
  },
  wheelchairService: {
    en: "Wheelchair service (request at desk)",
    lo: "ບໍລິການລົດເຂັນ (ຂໍໄດ້ທີ່ເຄົາເຕີ)",
    zh: "轮椅服务（请在柜台申请）",
  },
  porterServices: {
    en: "Porter services for luggage",
    lo: "ບໍລິການຄົນຫາບກະເປົາ",
    zh: "行李搬运服务",
  },
  medicalFirstAid: {
    en: "Medical first aid station",
    lo: "ສະຖານີປະຖົມພະຍາບານ",
    zh: "医疗急救站",
  },
  lostFound: {
    en: "Lost & found office",
    lo: "ຫ້ອງຂອງເສຍ-ຂອງເຫຼືອ",
    zh: "失物招领处",
  },
  airportPolice: {
    en: "Airport police",
    lo: "ຕຳຫຼວດສະໜາມບິນ",
    zh: "机场警察",
  },

  // Emergency contact
  emergencyContact: {
    en: "Emergency Contact:",
    lo: "ຕິດຕໍ່ສຸກເສີນ:",
    zh: "紧急联系方式：",
  },
  airportInfo: {
    en: "Airport Information: +856-84-211-XXX (Available during operating hours)",
    lo: "ຂໍ້ມູນສະໜາມບິນ: +856-84-211-XXX (ເປີດໃນເວລາດຳເນີນການ)",
    zh: "机场信息：+856-84-211-XXX（运营时间内可用）",
  },
  emergencyServices: {
    en: "Emergency Services: Dial 1191 (Police), 1195 (Medical Emergency)",
    lo: "ບໍລິການສຸກເສີນ: ໂທ 1191 (ຕຳຫຼວດ), 1195 (ສຸກເສີນທາງການແພດ)",
    zh: "紧急服务：拨打1191（警察），1195（医疗急救）",
  },
} as const;

export type ArrivalAirportKey = keyof typeof arrivalAirport;

export const tArrivalAirport = (k: ArrivalAirportKey, lang: Lang) =>
  arrivalAirport[k][lang] ?? arrivalAirport[k].en;
