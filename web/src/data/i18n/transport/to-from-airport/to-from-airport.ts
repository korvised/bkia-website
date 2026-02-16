import type { Lang } from "@/types/language";

export const toFromAirport = {
  title: {
    en: "To / From Airport",
    lo: "ຮັບ-ສົ່ງ ສະໜາມບິນ",
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
    zh: "服务台：位于 04 号出口处",
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
    zh: "车型选择",
  },
  taxiName: {
    en: "Taxi (Sedan)",
    lo: "ລົດເກັງ (Taxi)",
    zh: "出租车 (轿车)",
  },
  taxiDesc: {
    en: "Ideal for 1–4 passengers",
    lo: "ເໝາະສຳລັບຜູ້ໂດຍສານ 1–4 ທ່ານ",
    zh: "适合 1–4 名乘客",
  },
  vanName: {
    en: "Van",
    lo: "ລົດຕູ້ (Van)",
    zh: "商务面包车 (Van)",
  },
  vanDesc: {
    en: "For families or groups needing extra comfort and luggage space",
    lo: "ສຳລັບຄອບຄົວ ຫຼື ກຸ່ມຄະນະທີ່ຕ້ອງການຄວາມສະດວກສະບາຍ ແລະ ພື້ນທີ່ໃສ່ເຄື່ອງຂອງ",
    zh: "适合家庭或团体，提供更宽敞的空间与行李位",
  },

  // Rates
  ratesTitle: {
    en: "Fares & Destinations",
    lo: "ອັດຕາຄ່າໂດຍສານ ແລະ ຈຸດໝາຍປາຍທາງ",
    zh: "票价与目的地",
  },
  ratesNote: {
    en: "Fares are fixed by destination. Please inquire at the service counter before departure.",
    lo: "ລາຄາກຳນົດຕາມສະຖານທີ່ປາຍທາງ: ກະລຸນາສອບຖາມລາຄາໂດຍກົງຢູ່ເຄົາເຕີບໍລິການ ກ່ອນການເດີນທາງ.",
    zh: "票价按目的地固定。请在出发前咨询服务台。",
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
    zh: "酒店 / 旅馆",
  },
  destOther: {
    en: "Other destinations",
    lo: "ສະຖານທີ່ອື່ນໆ",
    zh: "其他目的地",
  },
  inquire: {
    en: "Inquire at Counter",
    lo: "ສອບຖາມທີ່ເຄົາເຕີ",
    zh: "柜台查询",
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
    zh: "现金支付：老挝基普 (LAK)、人民币 (CNY)",
  },
  transferPayment: {
    en: "Bank Transfer via mobile banking",
    lo: "ໂອນເງິນຜ່ານແອັບທະນາຄານ",
    zh: "银行转账：支持各大银行手机应用",
  },

  // Advance booking
  bookingTitle: {
    en: "Advance Booking",
    lo: "ການຈອງລວງໜ້າ",
    zh: "提前预约",
  },
  bookingDesc: {
    en: "Book in advance via phone or WhatsApp for scheduled pick-up or drop-off.",
    lo: "ທ່ານສາມາດໂທຈອງລົດລວງໜ້າ ຫຼື ຕິດຕໍ່ທາງ WhatsApp ເພື່ອນັດໝາຍເວລາຮັບ-ສົ່ງ.",
    zh: "可通过电话或 WhatsApp 提前预约，安排特定时间的接送服务。",
  },
  phone: {
    en: "Call Us",
    lo: "ເບີໂທລະສັບ",
    zh: "致电我们",
  },
  whatsapp: {
    en: "WhatsApp",
    lo: "WhatsApp",
    zh: "WhatsApp",
  },

  // Service Highlights
  featuresTitle: {
    en: "Why Choose Our Service",
    lo: "ເປັນຫຍັງຈຶ່ງເລືອກໃຊ້ບໍລິການຂອງພວກເຮົາ",
    zh: "服务亮点",
  },
  feature1: {
    en: "Licensed and safety-certified drivers",
    lo: "ຄົນຂັບທີ່ໄດ້ຮັບໃບອະນຸຍາດ ແລະ ຜ່ານການກວດສອບຄວາມປອດໄພ",
    zh: "持证上岗，安全认证司机",
  },
  feature2: {
    en: "Direct door-to-door service",
    lo: "ບໍລິການຮັບ-ສົ່ງ ເຖິງຈຸດໝາຍປາຍທາງໂດຍກົງ",
    zh: "提供门到门直达服务",
  },
  feature3: {
    en: "Flexible vehicle sizes for all groups",
    lo: "ມີລົດຫຼາກຫຼາຍຂະໜາດ ເໝາະສົມສຳລັບທຸກກຸ່ມເດີນທາງ",
    zh: "车型丰富，满足不同人数需求",
  },
  feature4: {
    en: "Available for advance reservation",
    lo: "ເປີດໃຫ້ຈອງລ່ວງໜ້າໄດ້ຕະຫຼອດເວລາ",
    zh: "支持随时提前预约",
  },
} as const;

export type ToFromAirportKey = keyof typeof toFromAirport;

export const tToFromAirport = (k: ToFromAirportKey, lang: Lang) =>
  toFromAirport[k][lang] ?? toFromAirport[k].en;
