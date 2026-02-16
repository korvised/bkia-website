import type { Lang } from "@/types/language";

export const toFromAirport = {
  title: {
    en: "To / From Airport",
    lo: "ໄປ-ມາສະໜາມບິນ",
    zh: "往返机场交通",
  },
  intro: {
    en: "Bokeo International Airport provides convenient transport services connecting passengers to and from the city and surrounding areas. Choose from taxis or vans depending on your group size.",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ ໃຫ້ບໍລິການລົດຮັບ-ສົ່ງ ທີ່ສະດວກສະບາຍ ເຊື່ອມຕໍ່ຜູ້ໂດຍສານ ໄປ-ກັບ ຕົວເມືອງ ແລະ ບໍລິເວນໃກ້ຄຽງ. ເລືອກລົດຕາມຄວາມເໝາະສົມຂອງຈຳນວນຜູ້ໂດຍສານ.",
    zh: "博胶国际机场提供便捷的接送服务，连接乘客往返市区及周边地区。可根据人数选择出租车或面包车。",
  },

  // Service counter
  counterTitle: {
    en: "Service Counter",
    lo: "ຈຸດໃຫ້ບໍລິການ",
    zh: "服务柜台",
  },
  counterLocation: {
    en: "Counter: Located at Exit 04",
    lo: "ເຄົາເຕີບໍລິການ: ຕັ້ງຢູ່ບໍລິເວນ ປະຕູທາງອອກ 04",
    zh: "服务台：位于04号出口处",
  },
  counterBuilding: {
    en: "Location: Domestic Terminal",
    lo: "ສະຖານທີ່: ອາຄານຜູ້ໂດຍສານພາຍໃນ",
    zh: "地点：国内航站楼",
  },

  // Vehicle options
  vehiclesTitle: {
    en: "Vehicle Options",
    lo: "ປະເພດລົດໃຫ້ບໍລິການ",
    zh: "车辆选项",
  },
  taxiName: {
    en: "Taxi (Sedan)",
    lo: "ລົດເກັງ (Taxi)",
    zh: "出租车（轿车）",
  },
  taxiDesc: {
    en: "For 1–4 passengers",
    lo: "ສຳລັບຜູ້ໂດຍສານ 1–4 ທ່ານ",
    zh: "适合 1–4 名乘客",
  },
  vanName: {
    en: "Van",
    lo: "ລົດຕູ້ (Van)",
    zh: "面包车",
  },
  vanDesc: {
    en: "For families or groups needing extra comfort and luggage space",
    lo: "ສຳລັບຄອບຄົວ ຫຼື ກຸ່ມຄະນະທີ່ຕ້ອງການຄວາມສະດວກສະບາຍ ແລະ ພື້ນທີ່ໃສ່ເຄື່ອງຂອງ",
    zh: "适合家庭或需要更多舒适空间和行李空间的团体",
  },

  // Rates
  ratesTitle: {
    en: "Rates",
    lo: "ອັດຕາຄ່າໂດຍສານ",
    zh: "收费标准",
  },
  ratesNote: {
    en: "Fares are set by destination — please inquire at the service counter before travel.",
    lo: "ລາຄາກຳນົດຕາມສະຖານທີ່ປາຍທາງ: ກະລຸນາສອບຖາມລາຄາໂດຍກົງຢູ່ເຄົາເຕີບໍລິການ ກ່ອນການເດີນທາງ.",
    zh: "费用按目的地收取，出发前请在服务台咨询。",
  },
  destCityCenter: {
    en: "Houayxay City Center",
    lo: "ໃຈກາງເມືອງຫ້ວຍຊາຍ",
    zh: "会晒市中心",
  },
  destBorder: {
    en: "Chiang Khong Border",
    lo: "ດ່ານຊຽງຂອງ",
    zh: "清孔口岸",
  },
  destHotel: {
    en: "Hotels / Guesthouses",
    lo: "ໂຮງແຮມ / ເຮືອນພັກ",
    zh: "酒店 / 民宿",
  },
  destOther: {
    en: "Other destinations",
    lo: "ສະຖານທີ່ອື່ນໆ",
    zh: "其他目的地",
  },
  inquire: {
    en: "Inquire",
    lo: "ສອບຖາມ",
    zh: "询价",
  },

  // Payment
  paymentTitle: {
    en: "Payment Methods",
    lo: "ຊ່ອງທາງການຊຳລະເງິນ",
    zh: "支付方式",
  },
  cashPayment: {
    en: "Cash: Lao Kip (LAK), Chinese Yuan (CNY)",
    lo: "ເງິນສົດ: ກີບລາວ (LAK), ຢວນ (CNY)",
    zh: "现金：老挝基普（LAK）、人民币（CNY）",
  },
  transferPayment: {
    en: "Bank Transfer via banking apps",
    lo: "ໂອນເງິນຜ່ານແອັບທະນາຄານ",
    zh: "通过银行应用进行银行转账",
  },

  // Advance booking
  bookingTitle: {
    en: "Advance Booking",
    lo: "ການຈອງລວງໜ້າ",
    zh: "预约预订",
  },
  bookingDesc: {
    en: "Book in advance by phone or WhatsApp for scheduled pick-up or drop-off at your requested time.",
    lo: "ທ່ານສາມາດໂທຈອງລົດລວງໜ້າ ຫຼື WhatsApp ເພື່ອໃຫ້ໄປຮັບ ຫຼື ໄປສົ່ງໄດ້ຕາມເວລານັດໝາຍ.",
    zh: "可提前致电或通过 WhatsApp 预约，按约定时间接送。",
  },
  phone: {
    en: "Phone",
    lo: "ເບີໂທລະສັບ",
    zh: "电话",
  },
  whatsapp: {
    en: "WhatsApp",
    lo: "WhatsApp",
    zh: "WhatsApp",
  },

  // Features
  featuresTitle: {
    en: "Service Highlights",
    lo: "ຈຸດເດັ່ນຂອງບໍລິການ",
    zh: "服务亮点",
  },
  feature1: {
    en: "Licensed and safety-certified drivers",
    lo: "ຄົນຂັບທີ່ໄດ້ຮັບໃບອະນຸຍາດ ແລະ ໃບຢັ້ງຢືນຄວາມປອດໄພ",
    zh: "持牌且经安全认证的司机",
  },
  feature2: {
    en: "Door-to-door service to city center, hotels, and border crossings",
    lo: "ບໍລິການຮອດໜ້າປະຕູ ໄປ ໃຈກາງເມືອງ, ໂຮງແຮມ ແລະ ຈຸດຜ່ານດ່ານ",
    zh: "提供到市中心、酒店及口岸的门到门服务",
  },
  feature3: {
    en: "Flexible vehicle sizes for any group",
    lo: "ລົດທີ່ຫຼາກຫຼາຍຂະໜາດ ເໝາະສົມທຸກກຸ່ມ",
    zh: "多种车型，适合各类团体",
  },
  feature4: {
    en: "Advance booking available by phone or WhatsApp",
    lo: "ຈອງລ່ວງໜ້າໄດ້ທາງໂທລະສັບ ຫຼື WhatsApp",
    zh: "可通过电话或 WhatsApp 提前预约",
  },
} as const;

export type ToFromAirportKey = keyof typeof toFromAirport;

export const tToFromAirport = (k: ToFromAirportKey, lang: Lang) =>
  toFromAirport[k][lang] ?? toFromAirport[k].en;
