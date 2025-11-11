import type { Lang } from "@/types/language";

export const footer = {
  flightInfo: {
    en: "Flight Information",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ",
    zh: "航班信息",
  },
  arrivals: {
    en: "Arrivals",
    lo: "ຖ້ຽວບິນຂາເຂົ້າ",
    zh: "到达航班",
  },
  departures: {
    en: "Departures",
    lo: "ຖ້ຽວບິນອອກ",
    zh: "出发航班",
  },
  airlines: {
    en: "Airlines",
    lo: "ສາຍການບິນ",
    zh: "航空公司",
  },
  passengerGuide: {
    en: "Passenger Guide",
    lo: "ຄູ່ມືຜູ້ໂດຍສານ",
    zh: "旅客指南",
  },
  arrivalGuide: {
    en: "Arrival Guide",
    lo: "ຄູ່ມືຂາເຂົ້າ",
    zh: "到达指南",
  },
  departureGuide: {
    en: "Departure Guide",
    lo: "ຄູ່ມືຂາອອກ",
    zh: "出发指南",
  },
  security: {
    en: "Security Check",
    lo: "ການກວດຄວາມປອດໄພ",
    zh: "安检须知",
  },
  facilities: {
    en: "Airport Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "机场设施",
  },
  services: {
    en: "Airport Services",
    lo: "ບໍລິການສະໜາມບິນ",
    zh: "机场服务",
  },
  dining: {
    en: "Dining & Shopping",
    lo: "ຮ້ານອາຫານ ແລະ ຮ້ານຄ້າ",
    zh: "餐饮购物",
  },
  lounges: {
    en: "Lounges",
    lo: "ຫ້ອງຮັບຮອງ",
    zh: "贵宾室",
  },
  transportation: {
    en: "Transportation",
    lo: "ການຂົນສົ່ງ",
    zh: "交通",
  },
  parking: {
    en: "Parking",
    lo: "ບ່ອນຈອດລົດ",
    zh: "停车场",
  },
  aboutUs: {
    en: "About Airport",
    lo: "ກ່ຽວກັບສະໜາມບິນ",
    zh: "关于机场",
  },
  overview: {
    en: "Overview",
    lo: "ພາບລວມ",
    zh: "概况",
  },
  visionMission: {
    en: "Vision & Mission",
    lo: "ວິໄສທັດ ແລະ ພາລະກິດ",
    zh: "愿景使命",
  },
  careers: {
    en: "Careers",
    lo: "ຮ່ວມງານກັບພວກເຮົາ",
    zh: "招聘",
  },
  newsroom: {
    en: "Newsroom",
    lo: "ຂ່າວສານ",
    zh: "新闻中心",
  },
  contactUs: {
    en: "Contact Us",
    lo: "ຕິດຕໍ່ພວກເຮົາ",
    zh: "联系我们",
  },
  address: {
    en: "Tônpheung District, Bokeo Province, Lao PDR",
    lo: "ບ້ານໃຫຍ່ສີເມືອງງາມ, ເມື່ອງຕົ້ນເຜີ້ງ, ແຂວງບໍ່ແກ້ວ, ສປປ ລາວ",
    zh: "老挝博乔省会晒村",
  },
  email: {
    en: "info@bokeointernationalairport.com",
    lo: "info@bokeointernationalairport.com",
    zh: "info@bokeointernationalairport.com",
  },
  operatingHours: {
    en: "24/7 Operations",
    lo: "ເປີດບໍລິການ 24/7",
    zh: "24小时运营",
  },
  followUs: {
    en: "Follow Us",
    lo: "ຕິດຕາມພວກເຮົາ",
    zh: "关注我们",
  },
  quickLinks: {
    en: "Quick Links",
    lo: "ລິ້ງດ່ວນ",
    zh: "快速链接",
  },
  legal: {
    en: "Legal",
    lo: "ກົດໝາຍ",
    zh: "法律",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    lo: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    zh: "隐私政策",
  },
  termsOfUse: {
    en: "Terms of Use",
    lo: "ເງື່ອນໄຂການໃຊ້ງານ",
    zh: "使用条款",
  },
  accessibility: {
    en: "Accessibility",
    lo: "ການເຂົ້າເຖິງ",
    zh: "无障碍",
  },
  allRightsReserved: {
    en: "All Rights Reserved",
    lo: "ສະຫງວນລິຂະສິດ",
    zh: "版权所有",
  },
} as const;

export type FooterKey = keyof typeof footer;

export const tFooter = (k: FooterKey, lang: Lang) =>
  footer[k][lang] ?? footer[k].en;
