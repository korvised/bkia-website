import type { Lang } from "@/types/language";

export const leavingAirport = {
  title: {
    en: "Leaving the Airport",
    lo: "ການເດີນທາງອອກຈາກສະໜາມບິນ",
    zh: "离开机场",
  },
  intro: {
    en: "Welcome to Laos! After completing all arrival procedures, you'll exit into the main arrivals hall where transportation options and services are ready to help you reach your destination.",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ ສປປ ລາວ! ຫຼັງຈາກສຳເລັດຂັ້ນຕອນທັງໝົດແລ້ວ, ທ່ານຈະອອກມາສູ່ຫ້ອງໂຖງຂາເຂົ້າ ຊຶ່ງມີທາງເລືອກຂົນສົ່ງ ແລະ ການບໍລິການພ້ອມຊ່ວຍໃຫ້ທ່ານໄປເຖິງຈຸດໝາຍ.",
    zh: "欢迎来到老挝！完成所有入境手续后，您将进入到达大厅，多种交通方式和服务已就绪，助您顺利前往目的地。",
  },

  locationNote: {
    en: "You are now in Ton Pheung District, Bokeo Province — conveniently located near the Golden Triangle Special Economic Zone (GTSEZ), bordering Thailand and Myanmar. The town centre and SEZ are approximately 5–7 km from the airport.",
    lo: "ປະຈຸບັນທ່ານຢູ່ທີ່ ເມືອງຕົ້ນເຜີ້ງ, ແຂວງບໍ່ແກ້ວ — ຕັ້ງຢູ່ໃກ້ກັບເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ, ຊາຍແດນຕິດ ໄທ ແລະ ມຽນມາ. ຕົວເມືອງ ແລະ ເຂດ SEZ ຫ່າງຈາກສະໜາມບິນ 5–7 ກິໂລແມັດ.",
    zh: "您现在位于博胶省东鹏县 — 邻近金三角经济特区 (GTSEZ)，与泰国和缅甸接壤。市中心及特区距机场约 5–7 公里。",
  },

  // ── Transportation ───────────────────────────────────────────────────────

  transportationTitle: {
    en: "Transportation Options",
    lo: "ທາງເລືອກໃນການເດີນທາງ",
    zh: "交通选择",
  },

  taxiTitle: {
    en: "Official Airport Taxi",
    lo: "ລົດແທັກຊີ່ສະໜາມບິນ",
    zh: "官方机场出租车",
  },

  taxiLocationLabel: {
    en: "Location",
    lo: "ສະຖານທີ່",
    zh: "位置",
  },
  taxiLocationValue: {
    en: "Outside arrivals hall, ground floor",
    lo: "ດ້ານນອກຫ້ອງໂຖງຂາເຂົ້າ, ຊັ້ນລຸ່ມ",
    zh: "到达大厅外，一楼",
  },

  // ── Safety Tips ──────────────────────────────────────────────────────────

  safetyTipsTitle: {
    en: "Important Safety Tips",
    lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ",
    zh: "重要安全提示",
  },
  safetyTip1: {
    en: "Only use official airport taxis or pre-arranged transport",
    lo: "ໃຊ້ບໍລິການແທັກຊີ່ສະໜາມບິນ ຫຼື ລົດທີ່ນັດໝາຍໄວ້ລ່ວງໜ້າເທົ່ານັ້ນ",
    zh: "仅使用官方机场出租车或预约好的交通工具",
  },
  safetyTip2: {
    en: "Avoid unlicensed touts offering rides inside the terminal",
    lo: "ຫຼີກເວັ້ນຜູ້ທີ່ສະເໜີລົດຮັບສົ່ງ ທີ່ບໍ່ມີໃບອະນຸຍາດ ພາຍໃນອາຄານ",
    zh: "避开航站楼内非法拉客人员",
  },
  safetyTip3: {
    en: "Keep valuables secure and luggage in sight at all times",
    lo: "ເກັບຮັກສາຂອງມີຄ່າໃຫ້ດີ ແລະ ສັງເກດສຳພາລະຕະຫຼອດ",
    zh: "妥善保管贵重物品，行李始终在视线内",
  },
  safetyTip4: {
    en: "Keep small LAK bills handy for easier payments",
    lo: "ສຳຮອງເງິນສົດໃບຍ່ອຍ (ກີບ) ໄວ້ ເພື່ອຊ່ວຍໃຫ້ຈ່າຍໄດ້ສະດວກ",
    zh: "随身备好小额基普纸币方便找零",
  },

  // ── Services in Arrivals Hall ────────────────────────────────────────────

  servicesTitle: {
    en: "Services in Arrivals Hall",
    lo: "ການບໍລິການໃນຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "到达大厅服务",
  },

  touristInfoTitle: {
    en: "Tourist Information",
    lo: "ຂໍ້ມູນການທ່ອງທ່ຽວ",
    zh: "旅游资讯",
  },
  touristInfo1: {
    en: "Information desk in arrivals",
    lo: "ເຄົາເຕີປະຊາສຳພັນ ພາຍໃນຫ້ອງຂາເຂົ້າ",
    zh: "问讯处",
  },
  touristInfo2: {
    en: "Free maps and brochures",
    lo: "ແຜນທີ່ ແລະ ແຜ່ນພັບທ່ອງທ່ຽວຟຣີ",
    zh: "免费地图及旅游手册",
  },
  touristInfo3: {
    en: "Hotel booking assistance",
    lo: "ຊ່ວຍຈອງໂຮງແຮມ",
    zh: "酒店预订协助",
  },
  touristInfo4: {
    en: "Tour operator contacts",
    lo: "ຂໍ້ມູນຕິດຕໍ່ບໍລິສັດນຳທ່ຽວ",
    zh: "旅游运营商联系方式",
  },

  otherServicesTitle: {
    en: "Other Services",
    lo: "ການບໍລິການອື່ນໆ",
    zh: "其他服务",
  },
  otherService1: {
    en: "Free WiFi throughout terminal",
    lo: "WiFi ຟຣີ ທົ່ວອາຄານ",
    zh: "全航站楼免费 WiFi",
  },
  otherService2: {
    en: "Restrooms",
    lo: "ຫ້ອງນ້ຳ",
    zh: "洗手间",
  },
  otherService3: {
    en: "Café & snack shop",
    lo: "ຮ້ານກາເຟ ແລະ ຮ້ານຂາຍເຄື່ອງຍ່ອຍ",
    zh: "咖啡厅 / 便利店",
  },
  otherService4: {
    en: "Porter services",
    lo: "ບໍລິການຊ່ວຍຍົກສຳພາລະ",
    zh: "行李搬运服务",
  },

  // ── Orientation ──────────────────────────────────────────────────────────

  orientationTitle: {
    en: "Quick Orientation",
    lo: "ຂໍ້ມູນເບື້ອງຕົ້ນ",
    zh: "快速入门",
  },
  orientationWelcome: {
    en: "Welcome to Bokeo Province!",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ ແຂວງບໍ່ແກ້ວ!",
    zh: "欢迎来到博胶省！",
  },

  orientationTimezoneLabel: {
    en: "Time Zone",
    lo: "ເຂດເວລາ",
    zh: "时区",
  },
  orientationTimezoneValue: {
    en: "ICT (UTC+7) — same as Bangkok & Vietnam",
    lo: "UTC+7 — ດຽວກັນກັບ ບາງກອກ ແລະ ຫວຽດນາມ",
    zh: "ICT (UTC+7) — 与曼谷、越南相同",
  },

  orientationCurrencyLabel: {
    en: "Currency",
    lo: "ສະກຸນເງິນ",
    zh: "货币",
  },
  orientationCurrencyValue: {
    en: "Lao Kip (LAK) — USD & Thai Baht widely accepted",
    lo: "ກີບ (LAK) — ດອນລາ ແລະ ບາດ ຍອມຮັບທົ່ວໄປ",
    zh: "老挝基普 (LAK) — 美元及泰铢广泛通用",
  },

  orientationLanguageLabel: {
    en: "Language",
    lo: "ພາສາ",
    zh: "语言",
  },
  orientationLanguageValue: {
    en: "Lao — Thai understood, English in tourist areas",
    lo: "ລາວ — ໄທໄດ້, ອັງກິດໃຊ້ໃນເຂດທ່ອງທ່ຽວ",
    zh: "老挝语 — 泰语通用，旅游区可用英语",
  },

  orientationWeatherLabel: {
    en: "Weather",
    lo: "ສະພາບອາກາດ",
    zh: "天气",
  },
  orientationWeatherValue: {
    en: "Tropical — Hot (Mar–May) · Rainy (Jun–Oct) · Cool (Nov–Feb)",
    lo: "ຮ້ອນຊຸ່ມ — ຮ້ອນ (ມີ–ພຶ) · ຝົນ (ມິ–ຕຸ) · ໜາວ (ພ–ກ)",
    zh: "热带气候 — 热季(3-5月)·雨季(6-10月)·凉季(11-2月)",
  },

  // ── Emergency Numbers ────────────────────────────────────────────────────

  emergencyLabel: {
    en: "Emergency Numbers",
    lo: "ເບີໂທສຸກເສີນ",
    zh: "紧急电话",
  },
  emergencyPoliceLabel: {
    en: "Police",
    lo: "ຕຳຫຼວດ",
    zh: "报警",
  },
  emergencyMedicalLabel: {
    en: "Medical",
    lo: "ການແພດ",
    zh: "急救",
  },
  emergencyFireLabel: {
    en: "Fire",
    lo: "ດັບເພີງ",
    zh: "火警",
  },

  // ── Cultural Tips ────────────────────────────────────────────────────────

  helpfulTipsTitle: {
    en: "Cultural Tips for Your Visit",
    lo: "ຂໍ້ແນະນຳດ້ານວັດທະນະທຳ",
    zh: "文化礼仪贴士",
  },
  tip1: {
    en: "Dress modestly at temples — cover shoulders and knees",
    lo: "ແຕ່ງກາຍສຸພາບຢູ່ວັດ — ປິດບ່າ ແລະ ຫົວເຂົ່າ",
    zh: "参观寺庙请着装得体 — 遮盖肩膀和膝盖",
  },
  tip2: {
    en: "Remove shoes before entering homes and temples",
    lo: "ຖອດເກີບກ່ອນເຂົ້າເຮືອນ ຫຼື ວັດ",
    zh: "进入民宅或寺庙前请脱鞋",
  },
  tip3: {
    en: "Bargaining is common at markets, not in shops",
    lo: "ຕໍ່ລອງລາຄາໃນຕະຫຼາດໄດ້, ບໍ່ນິຍົມໃນຮ້ານຄ້າ",
    zh: "市场可以砍价，正规商店通常不适用",
  },
  tip4: {
    en: "Tipping is not mandatory but is appreciated",
    lo: "ທິບບໍ່ໄດ້ບັງຄັບ ແຕ່ຍິນດີຮັບ",
    zh: "不强制给小费，但感谢之意会被接受",
  },
  tip5: {
    en: "Tap water is not safe to drink — buy bottled water",
    lo: "ນ້ຳປະປາດື່ມບໍ່ໄດ້ — ຊື້ນ້ຳດື່ມບັນຈຸຂວດ",
    zh: "自来水不可饮用 — 请购买瓶装水",
  },
  tip6: {
    en: "Respect Buddhist monks — women should not touch monks",
    lo: "ເຄົາລົບພະສົງ — ແມ່ຍິງຫ້າມແຕະໂຕພະສົງ",
    zh: "尊重僧侣 — 女性请勿触碰僧侣",
  },

  // ── Welcome ──────────────────────────────────────────────────────────────

  enjoyStay: {
    en: "Enjoy your stay in Bokeo Province and Lao PDR!",
    lo: "ຂໍໃຫ້ທ່ານສຸກສັນໃນການພັກຜ່ອນທີ່ ແຂວງບໍ່ແກ້ວ ແລະ ສປປ ລາວ!",
    zh: "祝您在博胶省和老挝度过愉快的时光！",
  },
  welcome: {
    en: "ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) — Welcome!",
    lo: "ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) — Welcome!",
    zh: "ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) — 欢迎！",
  },
} as const;

export type LeavingAirportKey = keyof typeof leavingAirport;

export const tLeavingAirport = (k: LeavingAirportKey, lang: Lang) =>
  leavingAirport[k][lang] ?? leavingAirport[k].en;
