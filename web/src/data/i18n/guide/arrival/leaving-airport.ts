import type { Lang } from "@/types/language";

export const leavingAirport = {
  title: {
    en: "Leaving the Airport",
    lo: "ການເດີນທາງອອກຈາກສະໜາມບິນ",
    zh: "离开机场",
  },
  intro: {
    en: "Welcome to Laos! After completing all arrival procedures, you'll exit into the main arrivals hall where various transportation options and services are available to help you reach your final destination.",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ ສປປ ລາວ! ຫຼັງຈາກສຳເລັດຂັ້ນຕອນຂາກວດເຂົ້າເມືອງທັງໝົດແລ້ວ, ທ່ານຈະອອກມາສູ່ຫ້ອງໂຖງຜູ້ໂດຍສານຂາເຂົ້າ ຊຶ່ງມີການບໍລິການຂົນສົ່ງ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກຕ່າງໆ ເພື່ອຊ່ວຍໃຫ້ທ່ານເດີນທາງໄປເຖິງຈຸດໝາຍປາຍທາງຢ່າງສະດວກສະບາຍ.",
    zh: "欢迎来到老挝！完成所有入境手续后，您将进入主到达大厅，那里有各种交通选择和服务帮助您到达最终目的地。",
  },

  locationNote: {
    en: "You are now in Ban Houayxay, Bokeo Province: The fourth largest province in northern Laos, bordering Thailand across the Mekong River. The town center is approximately 3km from the airport.",
    lo: "ປະຈຸບັນທ່ານຢູ່ທີ່ ເມືອງຫ້ວຍຊາຍ, ແຂວງບໍ່ແກ້ວ: ເປັນແຂວງທີ່ມີຄວາມສຳຄັນໃນພາກເໜືອຂອງລາວ, ມີຊາຍແດນຕິດກັບປະເທດໄທ ໂດຍມີແມ່ນ້ຳຂອງຂັ້ນກາງ. ຕົວເມືອງແມ່ນຫ່າງຈາກສະໜາມບິນປະມານ 3 ກິໂລແມັດ.",
    zh: "您现在位于博胶省会晒县：老挝北部第四大省，隔湄公河与泰国相望。市中心距离机场约3公里。",
  },

  transportationTitle: {
    en: "Transportation Options",
    lo: "ທາງເລືອກໃນການເດີນທາງ",
    zh: "交通选择",
  },

  // Airport Taxi
  taxiTitle: {
    en: "Official Airport Taxi",
    lo: "ລົດແທັກຊີ່ສະໜາມບິນ",
    zh: "官方机场出租车",
  },
  taxiLocation: {
    en: "Location: Taxi rank outside arrivals",
    lo: "ສະຖານທີ່: ຈຸດຈອດລົດແທັກຊີ່ ດ້ານນອກຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "位置：到达厅外出租车站",
  },
  taxiPayment: {
    en: "Payment: LAK or USD accepted",
    lo: "ການຊຳລະເງິນ: ຮັບທັງເງິນກີບ (LAK) ຫຼື ໂດລາ (USD)",
    zh: "付款：接受老挝基普或美元",
  },
  taxiFaresTitle: {
    en: "Typical Fares:",
    lo: "ອັດຕາຄ່າໂດຍສານໂດຍປະມານ:",
    zh: "典型票价：",
  },
  taxiFare1: {
    en: "To Ban Houayxay center: 30,000-50,000 LAK",
    lo: "ໄປຕົວເມືອງຫ້ວຍຊາຍ: 30,000-50,000 ກີບ",
    zh: "到会晒市中心：30,000-50,000基普",
  },
  taxiFare2: {
    en: "To hotels in town: 40,000-60,000 LAK",
    lo: "ໄປໂຮງແຮມໃນຕົວເມືອງ: 40,000-60,000 ກີບ",
    zh: "到镇上酒店：40,000-60,000基普",
  },
  taxiFare3: {
    en: "To border crossing: 50,000-80,000 LAK",
    lo: "ໄປດ່ານສາກົນ (ຂົວມິດຕະພາບ): 50,000-80,000 ກີບ",
    zh: "到边境口岸：50,000-80,000基普",
  },
  taxiTip: {
    en: "Tip: Agree on fare before departure",
    lo: "ຄຳແນະນຳ: ຄວນຕົກລົງລາຄາກັບຄົນຂັບ ກ່ອນອອກເດີນທາງ",
    zh: "提示：出发前商定票价",
  },

  // Ride-hailing
  rideHailingTitle: {
    en: "Ride-Hailing Apps",
    lo: "ບໍລິການເອີ້ນລົດຜ່ານແອັບ",
    zh: "网约车应用",
  },
  rideAvailable: {
    en: "Available: LOCA (Lao ride-hailing app)",
    lo: "ແອັບທີ່ມີໃຫ້ບໍລິການ: LOCA (ແອັບເອີ້ນລົດຍອດນິຍົມໃນລາວ)",
    zh: "可用：LOCA（老挝网约车应用）",
  },
  rideRequirements: {
    en: "Requirements: Local SIM card needed",
    lo: "ເງື່ອນໄຂ: ຕ້ອງມີເບີໂທລະສັບ ແລະ ຊິມການ໌ດທ້ອງຖິ່ນ",
    zh: "要求：需要本地SIM卡",
  },
  rideBenefits: {
    en: "Benefits: Fixed prices, cashless payment",
    lo: "ຂໍ້ດີ: ລາຄາທີ່ແນ່ນອນ, ສາມາດຊຳລະຜ່ານແອັບໄດ້",
    zh: "优势：固定价格、无现金支付",
  },
  rideNote: {
    en: "Note: Limited availability in Bokeo",
    lo: "ໝາຍເຫດ: ຈຳນວນລົດໃນແຂວງບໍ່ແກ້ວ ອາດຈະຍັງມີຈຳກັດ",
    zh: "注意：在博胶可用性有限",
  },

  // Hotel Shuttle
  hotelShuttleTitle: {
    en: "Hotel Shuttle",
    lo: "ລົດຮັບສົ່ງຂອງໂຮງແຮມ",
    zh: "酒店班车",
  },
  hotelPreArranged: {
    en: "Pre-arranged: Many hotels offer free pickup",
    lo: "ການນັດໝາຍລ່ວງໜ້າ: ໂຮງແຮມຫຼາຍແຫ່ງມີບໍລິການຮັບ-ສົ່ງຟຣີ",
    zh: "预约：许多酒店提供免费接机",
  },
  hotelBooking: {
    en: "Booking: Arrange when making reservation",
    lo: "ການຈອງ: ກະລຸນານັດໝາຍໃນຕອນທີ່ຈອງບ່ອນພັກ",
    zh: "预订：预订时安排",
  },
  hotelMeeting: {
    en: "Meeting Point: Arrivals hall with name sign",
    lo: "ຈຸດນັດພົບ: ຢູ່ຫ້ອງໂຖງຂາເຂົ້າ ໂດຍສັງເກດປ້າຍຊື່ຂອງທ່ານ",
    zh: "会面点：到达大厅举名牌处",
  },
  hotelTip: {
    en: "Tip: Confirm pickup time and terminal with hotel",
    lo: "ຄຳແນະນຳ: ຄວນຢືນຢັນເວລາ ແລະ ຈຸດນັດພົບກັບທາງໂຮງແຮມໃຫ້ແນ່ນອນ",
    zh: "提示：与酒店确认接机时间和航站楼",
  },

  // Car Rental
  carRentalTitle: {
    en: "Private Car Rental",
    lo: "ບໍລິການເຊົ່າລົດສ່ວນຕົວ",
    zh: "租车",
  },
  carCounters: {
    en: "Counters: Located in arrivals hall",
    lo: "ເຄົາເຕີບໍລິການ: ຕັ້ງຢູ່ພາຍໃນຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "柜台：位于到达大厅",
  },
  carRequirements: {
    en: "Requirements: International driving permit + passport",
    lo: "ເງື່ອນໄຂ: ຕ້ອງມີໃບຂັບຂີ່ສາກົນ ແລະ ໜັງສືຜ່ານແດນ",
    zh: "要求：国际驾照+护照",
  },
  carCompanies: {
    en: "Companies: Local and regional providers",
    lo: "ບໍລິສັດ: ມີທັງຜູ້ໃຫ້ບໍລິການທ້ອງຖິ່ນ ແລະ ສາກົນ",
    zh: "公司：本地和区域供应商",
  },
  carNote: {
    en: "Note: Book in advance for better rates",
    lo: "ໝາຍເຫດ: ຈອງລ່ວງໜ້າຈະໄດ້ລາຄາທີ່ຖືກກວ່າ",
    zh: "注意：提前预订价格更优惠",
  },

  safetyTipsTitle: {
    en: "Important Safety Tips",
    lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ",
    zh: "重要安全提示",
  },
  safetyTip1: {
    en: "Only use official airport taxis or pre-arranged transportation",
    lo: "ຄວນໃຊ້ບໍລິການແທັກຊີ່ສະໜາມບິນ ຫຼື ລົດທີ່ນັດໝາຍໄວ້ລ່ວງໜ້າເທົ່ານັ້ນ",
    zh: "仅使用官方机场出租车或预约交通",
  },
  safetyTip2: {
    en: "Avoid unlicensed touts offering rides inside terminal",
    lo: "ຫຼີກເວັ້ນບຸກຄົນທີ່ມາສະເໜີບໍລິການລົດຮັບສົ່ງ ທີ່ບໍ່ມີໃບອະນຸຍາດຖືກຕ້ອງ",
    zh: "避免候机楼内无证拉客人员",
  },
  safetyTip3: {
    en: "Keep valuables secure and luggage in sight at all times",
    lo: "ເກັບຮັກສາຂອງມີຄ່າໃຫ້ດີ ແລະ ໝັ່ນສັງເກດເບິ່ງສຳພາລະຂອງທ່ານຕະຫຼອດເວລາ",
    zh: "随时保管好贵重物品并看管好行李",
  },
  safetyTip4: {
    en: "Verify taxi meter is used or agree on fare before departure",
    lo: "ກວດສອບການໃຊ້ມິເຕີ ຫຼື ຕົກລົງລາຄາໃຫ້ຊັດເຈນ ກ່ອນອອກເດີນທາງ",
    zh: "确认使用计价器或出发前商定价格",
  },
  safetyTip5: {
    en: "Keep small LAK bills for easier payments",
    lo: "ຄວນມີທະນາບັດໃບຍ່ອຍ (ເງິນກີບ) ຕິດໂຕໄວ້ ເພື່ອງ່າຍໃນການຊຳລະຄ່າໂດຍສານ",
    zh: "准备小额基普钞票以便付款",
  },

  servicesTitle: {
    en: "Essential Services in Arrivals Hall",
    lo: "ບໍລິການທີ່ຈຳເປັນໃນຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "到达大厅的基本服务",
  },

  simCardsTitle: {
    en: "SIM Cards & Mobile Services",
    lo: "ບໍລິການຊິມການ໌ດ ແລະ ອິນເຕີເນັດ",
    zh: "SIM卡和移动服务",
  },
  simService1: {
    en: "Lao Telecom booth in arrivals",
    lo: "ເຄົາເຕີບໍລິການ ລາວ ໂທລະຄົມ (Lao Telecom) ພາຍໃນຫ້ອງຂາເຂົ້າ",
    zh: "到达大厅的老挝电信柜台",
  },
  simService2: {
    en: "Tourist SIM packages available",
    lo: "ມີແພັກເກັດຊິມນັກທ່ອງທ່ຽວໃຫ້ເລືອກ",
    zh: "提供游客SIM卡套餐",
  },
  simService3: {
    en: "Data plans from 50,000 LAK",
    lo: "ແພັກເກັດອິນເຕີເນັດ ເລີ່ມຕົ້ນທີ່ 50,000 ກີບ",
    zh: "数据套餐从50,000基普起",
  },
  simService4: {
    en: "Passport required for registration",
    lo: "ຕ້ອງໃຊ້ໜັງສືຜ່ານແດນໃນການລົງທະບຽນຊິມ",
    zh: "注册需要护照",
  },

  currencyTitle: {
    en: "Currency Exchange",
    lo: "ຈຸດແລກປ່ຽນເງິນຕາ",
    zh: "货币兑换",
  },
  currencyService1: {
    en: "Exchange booth in arrivals hall",
    lo: "ເຄົາເຕີແລກປ່ຽນເງິນຕາ ຕັ້ງຢູ່ພາຍໃນຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "到达大厅的兑换处",
  },
  currencyService2: {
    en: "Major currencies accepted (USD, THB, EUR, CNY)",
    lo: "ຮັບແລກເງິນຕາສະກຸນຫຼັກ (USD, THB, EUR, CNY)",
    zh: "接受主要货币（美元、泰铢、欧元、人民币）",
  },
  currencyService3: {
    en: "ATMs available (Visa/Mastercard)",
    lo: "ມີຕູ້ ATM ໃຫ້ບໍລິການ (ຮອງຮັບ Visa/Mastercard)",
    zh: "有ATM机（Visa/Mastercard）",
  },
  currencyService4: {
    en: "Operating hours: During flight arrivals",
    lo: "ເວລາໃຫ້ບໍລິການ: ເປີດບໍລິການໃນຊ່ວງທີ່ມີຖ້ຽວບິນມາຮອດ",
    zh: "营业时间：航班到达时段",
  },

  touristInfoTitle: {
    en: "Tourist Information",
    lo: "ຂໍ້ມູນການທ່ອງທ່ຽວ",
    zh: "旅游信息",
  },
  touristInfo1: {
    en: "Information desk in arrivals",
    lo: "ເຄົາເຕີປະຊາສຳພັນ ພາຍໃນຫ້ອງຂາເຂົ້າ",
    zh: "到达大厅的问询台",
  },
  touristInfo2: {
    en: "Free maps and brochures",
    lo: "ມີແຜນທີ່ ແລະ ແຜ່ນພັບຂໍ້ມູນທ່ອງທ່ຽວຟຣີ",
    zh: "免费地图和手册",
  },
  touristInfo3: {
    en: "Hotel booking assistance",
    lo: "ບໍລິການຊ່ວຍເຫຼືອດ້ານການຈອງໂຮງແຮມ",
    zh: "酒店预订协助",
  },
  touristInfo4: {
    en: "Tour operator contacts",
    lo: "ຂໍ້ມູນຕິດຕໍ່ບໍລິສັດນຳທ່ຽວ",
    zh: "旅游运营商联系方式",
  },

  otherServicesTitle: {
    en: "Other Services",
    lo: "ບໍລິການອື່ນໆ",
    zh: "其他服务",
  },
  otherService1: {
    en: "Free WiFi throughout terminal",
    lo: "ບໍລິການ WiFi ຟຣີ ທົ່ວບໍລິເວນອາຄານຜູ້ໂດຍສານ",
    zh: "航站楼全覆盖免费WiFi",
  },
  otherService2: {
    en: "Restrooms",
    lo: "ຫ້ອງນ້ຳ",
    zh: "洗手间",
  },
  otherService3: {
    en: "Small cafe/snack shop",
    lo: "ຮ້ານກາເຟ ແລະ ຮ້ານຂາຍເຄື່ອງຍ່ອຍ",
    zh: "小咖啡厅/小吃店",
  },
  otherService4: {
    en: "Porter services",
    lo: "ບໍລິການຊ່ວຍຍົກເຄື່ອງ/ສຳພາລະ",
    zh: "搬运服务",
  },

  orientationTitle: {
    en: "Quick Orientation Guide",
    lo: "ຂໍ້ມູນເບື້ອງຕົ້ນທີ່ຄວນຮູ້",
    zh: "快速入门指南",
  },
  orientationWelcome: {
    en: "Welcome to Bokeo Province!",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ ແຂວງບໍ່ແກ້ວ!",
    zh: "欢迎来到博胶省！",
  },
  orientationTimezone: {
    en: "Time Zone: ICT (UTC+7) - same as Bangkok, Vietnam",
    lo: "ເຂດເວລາ: UTC+7 (ເວລາເກຣນິດ +7) - ເວົ້ົາດຽວກັນກັບ ບາງກອກ ແລະ ຫວຽດນາມ",
    zh: "时区：ICT（UTC+7）- 与曼谷、越南相同",
  },
  orientationCurrency: {
    en: "Currency: Lao Kip (LAK). USD and Thai Baht widely accepted",
    lo: "ສະກຸນເງິນ: ກີບ (LAK). ສ່ວນເງິນໂດລາ ແລະ ເງິນບາດ ກໍໄດ້ຮັບການຍອມຮັບຢ່າງກວ້າງຂວາງ",
    zh: "货币：老挝基普（LAK）。美元和泰铢广泛接受",
  },
  orientationLanguage: {
    en: "Language: Lao (primary), Thai understood, English in tourist areas",
    lo: "ພາສາ: ພາສາລາວ (ພາສາທາງການ), ສາມາດສື່ສານພາສາໄທໄດ້, ພາສາອັງກິດໃຊ້ໃນເຂດທ່ອງທ່ຽວ",
    zh: "语言：老挝语（主要）、通泰语、旅游区通英语",
  },
  orientationWeather: {
    en: "Weather: Tropical - hot season (Mar-May), rainy (Jun-Oct), cool (Nov-Feb)",
    lo: "ສະພາບອາກາດ: ຮ້ອນຊຸ່ມ - ລະດູຮ້ອນ (ມີນາ-ພຶດສະພາ), ລະດູຝົນ (ມິຖຸນາ-ຕຸລາ), ລະດູໜາວ (ພະຈິກ-ກຸມພາ)",
    zh: "天气：热带气候 - 热季（3-5月）、雨季（6-10月）、凉季（11-2月）",
  },
  orientationEmergency: {
    en: "Emergency Numbers: Police 1191, Medical 1195, Fire 1190",
    lo: "ເບີໂທສຸກເສີນ: ຕຳຫຼວດ 1191, ໂຮງໝໍ 1195, ດັບເພີງ 1190",
    zh: "紧急电话：警察1191、医疗1195、消防1190",
  },

  helpfulTipsTitle: {
    en: "Helpful Tips for Your Visit",
    lo: "ຂໍ້ແນະນຳທີ່ເປັນປະໂຫຍດໃນການທ່ອງທ່ຽວ",
    zh: "访问小贴士",
  },
  tip1: {
    en: "Dress modestly when visiting temples (cover shoulders and knees)",
    lo: "ຄວນແຕ່ງກາຍສຸພາບເມື່ອໄປຢ້ຽມຢາມວັດວາອາຮາມ (ປິດບ່າ ແລະ ຫົວເຂົ່າ)",
    zh: "参观寺庙时穿着得体（遮盖肩膀和膝盖）",
  },
  tip2: {
    en: "Remove shoes before entering homes and temples",
    lo: "ກະລຸນາຖອດເກີບກ່ອນເຂົ້າເຮືອນ ຫຼື ສິມ (ວັດ)",
    zh: "进入家庭和寺庙前脱鞋",
  },
  tip3: {
    en: "Bargaining is common at markets but not in shops",
    lo: "ການຕໍ່ລອງລາຄາແມ່ນສາມາດເຮັດໄດ້ຕາມຕະຫຼາດທົ່ວໄປ, ແຕ່ບໍ່ນິຍົມໃນຮ້ານຄ້າໃຫຍ່",
    zh: "市场可以讨价还价，但商店不行",
  },
  tip4: {
    en: "Tipping not mandatory but appreciated (10% in restaurants)",
    lo: "ການໃຫ້ທິບແມ່ນບໍ່ໄດ້ບັງຄັບ, ແຕ່ກໍເປັນສິ່ງທີ່ດີ (ປະມານ 10% ໃນຮ້ານອາຫານ)",
    zh: "小费非强制但受欢迎（餐厅10%）",
  },
  tip5: {
    en: "Tap water not safe to drink - buy bottled water",
    lo: "ນ້ຳປະປາບໍ່ສາມາດດື່ມໄດ້ໂດຍກົງ - ແນະນຳໃຫ້ຊື້ນ້ຳດື່ມບັນຈຸຂວດ",
    zh: "自来水不宜饮用 - 请购买瓶装水",
  },
  tip6: {
    en: "Respect Buddhist monks - women should not touch monks",
    lo: "ໃຫ້ຄວາມເຄົາລົບພະສົງ - ແມ່ຍິງແມ່ນບໍ່ يسمﺢໃຫ້ແຕະຕ້ອງໂຕພະສົງ",
    zh: "尊重佛教僧侣 - 女性不应触碰僧侣",
  },

  moreHelpTitle: {
    en: "Need More Help?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອເພີ່ມເຕີມ?",
    zh: "需要更多帮助？",
  },
  helpDesk: {
    en: "Airport Information Desk: Located in arrivals hall",
    lo: "ເຄົາເຕີຂໍ້ມູນສະໜາມບິນ: ຕັ້ງຢູ່ພາຍໃນຫ້ອງໂຖງຂາເຂົ້າ",
    zh: "机场问询台：位于到达大厅",
  },
  helpTourism: {
    en: "Tourism Lao Bokeo Office: +856 84 260 179",
    lo: "ຫ້ອງການທ່ອງທ່ຽວແຂວງບໍ່ແກ້ວ: +856 84 260 179",
    zh: "博胶旅游局：+856 84 260 179",
  },
  helpWebsite: {
    en: "Visit Bokeo Tourism website: www.tourismlaos.org",
    lo: "ຢ້ຽມຊົມເວັບໄຊທ່ອງທ່ຽວ: www.tourismlaos.org",
    zh: "访问博胶旅游网站：www.tourismlaos.org",
  },

  enjoyStay: {
    en: "Enjoy your stay in Bokeo Province and Lao PDR!",
    lo: "ຂໍໃຫ້ທ່ານມີຄວາມສຸກໃນການພັກຜ່ອນທີ່ ແຂວງບໍ່ແກ້ວ ແລະ ສປປ ລາວ!",
    zh: "祝您在博胶省和老挝人民民主共和国愉快！",
  },
  welcome: {
    en: "ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) - Welcome!",
    lo: "ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) - Welcome!",
    zh: "ຍິນດີຕ້ອນຮັບ（Yin dee ton hap）- 欢迎！",
  },
} as const;

export type LeavingAirportKey = keyof typeof leavingAirport;

export const tLeavingAirport = (k: LeavingAirportKey, lang: Lang) =>
  leavingAirport[k][lang] ?? leavingAirport[k].en;
