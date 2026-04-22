import type { Lang } from "@/types/language";

export const parking = {
  title: {
    en: "Airport Parking Services",
    lo: "ບໍລິການລານຈອດລົດສະໜາມບິນ",
    zh: "机场停车服务",
  },
  intro: {
    en: "Bokeo International Airport provides convenient parking facilities for passengers, greeters, and visitors. Our parking areas accommodate various vehicle types with clear signage and organized layouts.",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວໃຫ້ບໍລິການລານຈອດລົດທີ່ສະດວກສະບາຍແກ່ຜູ້ໂດຍສານ, ຜູ້ມາຮັບ-ສົ່ງ ແລະ ຜູ້ມາຢ້ຽມຢາມ. ລານຈອດຂອງພວກເຮົາຮອງຮັບລົດຫຼາຍປະເພດ ມີປ້າຍຊີ້ບອກທາງຊັດເຈນ ແລະ ຈັດວາງເປັນລະບຽບ.",
    zh: "博胶国际机场为乘客、接送人员和访客提供便捷的停车设施。我们的停车区域可容纳各种类型的车辆，配有清晰的标识和有序的布局。",
  },

  // Features section
  featuresTitle: {
    en: "Parking Features",
    lo: "ຄຸນລັກສະນະການຈອດລົດ",
    zh: "停车特色",
  },
  feature1: {
    en: "Spacious parking areas for motorcycles, sedans, vans, and buses",
    lo: "ພື້ນທີ່ກວ້າງຂວາງສຳລັບລົດຈັກ, ລົດເກັງ, ລົດຕູ້ ແລະ ລົດເມ",
    zh: "宽敞的停车区域，可停放摩托车、轿车、面包车和巴士",
  },
  feature2: {
    en: "Separate parking zones for Domestic and International terminals",
    lo: "ແຍກເຂດຈອດລົດສຳລັບອາຄານພາຍໃນ ແລະ ຕ່າງປະເທດ",
    zh: "国内和国际航站楼设有独立停车区",
  },
  feature3: {
    en: "Well-organized layout for easy navigation and accident prevention",
    lo: "ຈັດວາງເປັນລະບຽບເພື່ອການຊອກຫາງ່າຍ ແລະ ປ້ອງກັນອຸປະຕິເຫດ",
    zh: "布局井然有序，便于导航和防止事故",
  },
  feature4: {
    en: "Clearly marked rates and payment options",
    lo: "ມີອັດຕາຄ່າບໍລິການ ແລະ ວິທີຈ່າຍເງິນທີ່ຊັດເຈນ",
    zh: "费率和支付方式标示清楚",
  },

  // Parking zones
  zonesTitle: {
    en: "Parking Zones",
    lo: "ເຂດຈອດລົດ",
    zh: "停车区域",
  },
  domesticTitle: {
    en: "Domestic Terminal Parking",
    lo: "ລານຈອດອາຄານພາຍໃນປະເທດ",
    zh: "国内航站楼停车场",
  },
  internationalTitle: {
    en: "International Terminal Parking",
    lo: "ລານຈອດອາຄານຕ່າງປະເທດ",
    zh: "国际航站楼停车场",
  },

  // Zone details
  zone1Domestic: {
    en: "Zone 1: Bus and Taxi parking",
    lo: "ໂຊນທີ 1: ບ່ອນຈອດລົດເມ ແລະ ແທັກຊີ່",
    zh: "1区：巴士和出租车停车区",
  },
  zone23Domestic: {
    en: "Zone 2-3: General passenger vehicles and motorcycles",
    lo: "ໂຊນທີ 2-3: ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ",
    zh: "2-3区：普通乘客车辆和摩托车",
  },
  zone4Domestic: {
    en: "Zone 4: Staff parking and VIP parking",
    lo: "ໂຊນທີ 4: ລົດພະນັກງານ ແລະ VIP",
    zh: "4区：员工停车和贵宾停车",
  },
  zone1International: {
    en: "Zone 1: VIP and staff parking",
    lo: "ໂຊນທີ 1: ລົດ VIP ແລະ ພະນັກງານ",
    zh: "1区：贵宾和员工停车",
  },
  zone23International: {
    en: "Zone 2-3: General passenger vehicles and motorcycles",
    lo: "ໂຊນທີ 2-3: ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ",
    zh: "2-3区：普通乘客车辆和摩托车",
  },
  zone4International: {
    en: "Zone 4: General passenger vehicles",
    lo: "ໂຊນທີ 4: ລົດຜູ້ໂດຍສານທົ່ວໄປ",
    zh: "4区：普通乘客车辆",
  },

  // Rates section
  ratesTitle: {
    en: "Parking Rates",
    lo: "ອັດຕາຄ່າຈອດລົດ",
    zh: "停车费率",
  },
  ratesNote: {
    en: "Rates are charged per hour",
    lo: "ຄິດຄ່າບໍລິການຕາມຊົ່ວໂມງ",
    zh: "按小时收费",
  },
  vehicleType: {
    en: "Vehicle Type",
    lo: "ປະເພດລົດ",
    zh: "车辆类型",
  },
  ratePerHour: {
    en: "Rate per Hour",
    lo: "ອັດຕາຕໍ່ຊົ່ວໂມງ",
    zh: "每小时费率",
  },
  largeVehicles: {
    en: "Cars, Sedans, Pickups, Vans",
    lo: "ລົດໃຫຍ່ (ລົດເກັງ, ລົດຕູ້)",
    zh: "轿车、皮卡、面包车",
  },
  smallVehicles: {
    en: "Motorcycles, Tuk-tuks",
    lo: "ລົດຈັກ, ລົດສາມລໍ້",
    zh: "摩托车、三轮车",
  },

  // Payment section
  paymentTitle: {
    en: "Payment Methods",
    lo: "ວິທີການຊຳລະເງິນ",
    zh: "支付方式",
  },
  cashPayment: {
    en: "Cash: Lao Kip (LAK), Thai Baht (THB), Chinese Yuan (CNY)",
    lo: "ເງິນສົດ: ກີບລາວ (LAK), ບາດໄທ (THB), ຢວນຈີນ (CNY)",
    zh: "现金：老挝基普（LAK）、泰铢（THB）、人民币（CNY）",
  },
  qrPayment: {
    en: "Bank Transfer: Lao QR (all Lao bank apps)",
    lo: "ໂອນເງິນທະນາຄານ: ລາວ QR (ທຸກແອັບທະນາຄານລາວ)",
    zh: "银行转账：老挝二维码（所有老挝银行应用）",
  },

  // Important information
  importantTitle: {
    en: "Important Information",
    lo: "ຂໍ້ມູນສຳຄັນ",
    zh: "重要信息",
  },
  parkingTip1: {
    en: "Keep your parking ticket safe - you'll need it to exit",
    lo: "ເກັບປີ້ຈອດລົດໄວ້ໃຫ້ດີ - ທ່ານຈະຕ້ອງໃຊ້ປີ້ເພື່ອແຈ້ງອອກ",
    zh: "请妥善保管停车票 - 出场时需要",
  },
  parkingTip2: {
    en: "Payment must be made before exiting the parking area",
    lo: "ຕ້ອງຊຳລະເງິນກ່ອນອອກຈາກລານຈອດ",
    zh: "离开停车区前必须付款",
  },
  parkingTip3: {
    en: "Follow directional signs to your designated parking zone",
    lo: "ປະຕິບັດຕາມປ້າຍທິດທາງໄປຫາເຂດຈອດທີ່ກຳນົດ",
    zh: "请按照指示牌前往指定停车区",
  },
  lostTicketFee: {
    en: "Lost parking ticket fee: 80,000 LAK",
    lo: "ຄ່າທຳນຽມປີ້ເສຍ: 80,000 ກີບ",
    zh: "遗失停车票费用：80,000基普",
  },

  // Map reference
  mapTitle: {
    en: "Parking Layout Map",
    lo: "ແຜນຜັງລານຈອດລົດ",
    zh: "停车场布局图",
  },
  viewMap: {
    en: "View detailed parking layout",
    lo: "ເບິ່ງແຜນຜັງລານຈອດລາຍລະອຽດ",
    zh: "查看详细停车布局",
  },
} as const;

export type ParkingKey = keyof typeof parking;

export const tParking = (k: ParkingKey, lang: Lang) =>
  parking[k][lang] ?? parking[k].en;
