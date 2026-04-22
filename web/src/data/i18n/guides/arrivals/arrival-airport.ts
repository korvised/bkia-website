import type { Lang } from "@/types/language";

export const arrivalAirport = {
  // ── Page Title & Intro ────────────────────────────────────────────────────

  title: {
    en: "Arriving at Bokeo International Airport",
    lo: "ມາຮອດສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "抵达博胶国际机场",
  },
  intro: {
    en: "Welcome to Bokeo International Airport! If you're arriving on a flight with a stopover or transfer, please follow the passage directly to international arrivals. If your flight is non-stop to Bokeo, follow signs to the arrivals hall.",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ! ຖ້າທ່ານມາຮອດດ້ວຍຖ້ຽວບິນທີ່ມີການແວະ ຫຼື ຕໍ່ຖ້ຽວບິນ, ກະລຸນາຕິດຕາມທາງໄປຍັງຈຸດມາຮອດສາກົນໂດຍກົງ. ຖ້າຖ້ຽວບິນຂອງທ່ານບິນກົງມາບໍ່ແກ້ວ, ຕິດຕາມປ້າຍໄປຫ້ອງໂຖງຜູ້ໂດຍສານຂາເຂົ້າ.",
    zh: "欢迎来到博胶国际机场！如果您乘坐的是经停或转机航班，请直接前往国际到达通道。如果您的航班直飞博胶，请按照指示牌前往国际到达大厅。",
  },

  // ── Important Notice ──────────────────────────────────────────────────────

  importantTitle: {
    en: "Before You Disembark",
    lo: "ກ່ອນລົງຈາກເຮືອບິນ",
    zh: "下机前注意事项",
  },
  importantDesc: {
    en: "Remain seated with your seatbelt fastened until the aircraft comes to a complete stop and the seatbelt sign turns off. Check that you have all your belongings before leaving.",
    lo: "ກະລຸນານັ່ງຢູ່ບ່ອນ ແລະ ຮັດສາຍແອວໄວ້ຈົນກວ່າເຮືອບິນຈະຢຸດສະໜິດ ແລະ ປ້າຍສັນຍານດັບລົງ. ກວດເບິ່ງວ່າທ່ານມີສິ່ງຂອງຄົບຖ້ວນກ່ອນລົງ.",
    zh: "请保持就座并系好安全带，直到飞机完全停稳且安全带指示灯熄灭。离机前请检查随身物品是否齐全。",
  },

  // ── Disembarkation ────────────────────────────────────────────────────────

  disembarkationTitle: {
    en: "Disembarkation Process",
    lo: "ຂັ້ນຕອນການລົງຈາກເຮືອບິນ",
    zh: "下机流程",
  },
  disembarkStep1: {
    en: "Follow cabin crew instructions for orderly disembarkation",
    lo: "ປະຕິບັດຕາມຄຳແນະນຳຂອງຈຸບິນ ສຳລັບການລົງຈາກເຮືອບິນຢ່າງເປັນລະບຽບ",
    zh: "听从机组人员的指示有序下机",
  },
  disembarkStep2: {
    en: "Collect all cabin baggage from overhead bins",
    lo: "ເກັບກະເປົ໋າຖືຂຶ້ນເຮືອບິນທັງໝົດຈາກຊ່ອງເກັບເຄື່ອງດ້ານເທິງ",
    zh: "从头顶行李舱取出所有随身行李",
  },
  disembarkStep3: {
    en: "Check your seat area for any personal items before leaving",
    lo: "ກວດຄືນເບິ່ງບໍລິເວນບ່ອນນັ່ງ ວ່າມີສິ່ງຂອງສ່ວນຕົວຫຼົງເຫຼືອບໍ່ ກ່ອນລົງ",
    zh: "下机前检查座位区域，确保没有遗留个人物品",
  },
  disembarkStep4: {
    en: "Proceed through the jet bridge or aircraft stairs to the terminal",
    lo: "ຜ່ານທາງຂົວທ້ຽບເຮືອບິນ ຫຼື ລົງຂັ້ນໄດໄປຫາອາຄານຜູ້ໂດຍສານ",
    zh: "通过登机桥或飞机舷梯前往航站楼",
  },

  // ── First Steps ───────────────────────────────────────────────────────────

  firstStepsTitle: {
    en: "First Steps After Landing",
    lo: "ຂັ້ນຕອນທຳອິດຫຼັງຈາກລົງຈອດ",
    zh: "降落后的首要步骤",
  },
  firstStepsDesc: {
    en: "Once inside the terminal, follow directional signs to each checkpoint in order",
    lo: "ເມື່ອເຂົ້າມາໃນອາຄານຜູ້ໂດຍສານ, ຕິດຕາມປ້າຍທິດທາງໄປຍັງຈຸດກວດໃຫ້ຄົບຕາມລຳດັບ",
    zh: "进入航站楼后，请依次按照指示牌前往各检查站",
  },
  healthScreening: {
    en: "Health Screening (if required during health emergencies)",
    lo: "ການກວດສຸຂະພາບ (ຖ້າຕ້ອງການ ໃນກໍລະນີສຸກເສີນດ້ານສຸຂະພາບ)",
    zh: "健康筛查（如需要，在健康紧急情况期间）",
  },
  immigrationControl: {
    en: "Immigration / Passport Control — first checkpoint for all international arrivals",
    lo: "ການກວດຄົນເຂົ້າ-ອອກເມືອງ / ກວດໜັງສືຜ່ານແດນ — ຈຸດກວດທຳອິດສຳລັບຜູ້ມາຮອດສາກົນທັງໝົດ",
    zh: "边检/护照检查 — 所有国际到达旅客的第一个检查站",
  },
  baggageClaim: {
    en: "Baggage Claim — after immigration clearance",
    lo: "ຮັບກະເປົາ — ຫຼັງຈາກຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "行李提取 — 通过边检后",
  },
  customsCheckpoint: {
    en: "Customs — final checkpoint before entering Laos",
    lo: "ພາສີ — ຈຸດກວດສຸດທ້າຍກ່ອນເຂົ້າປະເທດລາວ",
    zh: "海关 — 进入老挝前的最后检查站",
  },

  // ── Processing Time ───────────────────────────────────────────────────────

  processingTimeTitle: {
    en: "Processing Time",
    lo: "ໄລຍະເວລາດຳເນີນການ",
    zh: "处理时间",
  },
  processingTimeDesc: {
    en: "Allow 15–30 minutes for the complete arrival process during normal hours, longer during peak times when multiple flights arrive together. Be patient and follow staff directions.",
    lo: "ໃຊ້ເວລາ 15–30 ນາທີ ສຳລັບຂະບວນການມາຮອດທັງໝົດໃນຊ່ວງເວລາປົກກະຕິ ແລະ ດົນກວ່ານັ້ນໃນຊ່ວງທີ່ມີຖ້ຽວບິນເຂົ້າພ້ອມກັນຫຼາຍ. ກະລຸນາອົດທົນ ແລະ ປະຕິບັດຕາມຄຳແນະນຳຂອງພະນັກງານ.",
    zh: "正常时段完成整个到达流程需要15–30分钟，多个航班同时到达的高峰时段所需时间较长。请耐心等待并听从工作人员指引。",
  },

  // ── Facilities ────────────────────────────────────────────────────────────

  facilitiesTitle: {
    en: "Airport Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກຂອງສະໜາມບິນ",
    zh: "机场设施",
  },
  availableServices: {
    en: "Available Services",
    lo: "ບໍລິການທີ່ມີ",
    zh: "可用服务",
  },
  currencyExchange: {
    en: "Currency exchange booths",
    lo: "ຈຸດແລກປ່ຽນເງິນ",
    zh: "货币兑换处",
  },
  atmMachines: {
    en: "ATM machines (LAK and USD withdrawal)",
    lo: "ຕູ້ ATM (ຖອນເງິນ LAK ແລະ USD)",
    zh: "ATM机（可提取老挝基普和美元）",
  },
  freeWifi: {
    en: "Free WiFi throughout the terminal",
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
    en: "Assistance Available",
    lo: "ການຊ່ວຍເຫຼືອທີ່ມີ",
    zh: "可用协助服务",
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

  // ── Emergency Contact ─────────────────────────────────────────────────────

  emergencyContact: {
    en: "Emergency Contact",
    lo: "ຕິດຕໍ່ສຸກເສີນ",
    zh: "紧急联系方式",
  },

  airportInfoLabel: {
    en: "Airport Information",
    lo: "ຂໍ້ມູນສະໜາມບິນ",
    zh: "机场信息",
  },
  airportInfoValue: {
    en: "+856 84 260 179",
    lo: "+856 84 260 179",
    zh: "+856 84 260 179",
  },
  airportInfoHours: {
    en: "Available during operating hours",
    lo: "ເປີດໃນເວລາດຳເນີນການ",
    zh: "运营时间内可用",
  },

  emergencyPoliceLabel: {
    en: "Police",
    lo: "ຕຳຫຼວດ",
    zh: "警察",
  },
  emergencyPoliceValue: {
    en: "1191",
    lo: "1191",
    zh: "1191",
  },

  emergencyMedicalLabel: {
    en: "Medical Emergency",
    lo: "ສຸກເສີນທາງການແພດ",
    zh: "医疗急救",
  },
  emergencyMedicalValue: {
    en: "1195",
    lo: "1195",
    zh: "1195",
  },
} as const;

export type ArrivalAirportKey = keyof typeof arrivalAirport;

export const tArrivalAirport = (k: ArrivalAirportKey, lang: Lang) =>
  arrivalAirport[k][lang] ?? arrivalAirport[k].en;
