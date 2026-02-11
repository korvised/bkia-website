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
  schedules: {
    en: "Flight Schedules",
    lo: "ຕາຕະລາງຖ້ຽວບິນ",
    zh: "航班时刻表",
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

  servicesSupport: {
    en: "Services & Support",
    lo: "ບໍລິການ ແລະ ຊ່ວຍເຫຼືອ",
    zh: "服务与支持",
  },
  parking: {
    en: "Parking",
    lo: "ບ່ອນຈອດລົດ",
    zh: "停车场",
  },
  notices: {
    en: "Notices",
    lo: "ແຈ້ງການ",
    zh: "机场公告",
  },
  faq: {
    en: "FAQs",
    lo: "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    zh: "常见问题",
  },
  feedback: {
    en: "Feedback",
    lo: "ຄຳຄິດເຫັນ",
    zh: "意见反馈",
  },
  aboutUs: {
    en: "About Airport",
    lo: "ກ່ຽວກັບສະໜາມບິນ",
    zh: "关于机场",
  },
  airportProfile: {
    en: "Airport Profile",
    lo: "ຂໍ້ມູນສະໜາມບິນ",
    zh: "机场简介",
  },
  newsroom: {
    en: "News",
    lo: "ຂ່າວສານ",
    zh: "新闻中心",
  },
  careers: {
    en: "Careers",
    lo: "ຮ່ວມງານກັບພວກເຮົາ",
    zh: "招聘",
  },
  lostFound: {
    en: "Lost & Found",
    lo: "ເຄື່ອງເສຍ & ພົບເຫັນ",
    zh: "失物招领",
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
