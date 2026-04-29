import type { Lang } from "@/types/language";

// ── Slideshow images ──────────────────────────────────────────────────────────
export const TAXI_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/taxi.png",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/taxi/taxi-1.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/taxi/taxi-2.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/taxi/taxi-3.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/taxi/taxi-4.jpg",
] as const;

// ── Destination prices (edit to update fares) ─────────────────────────────────
export const TAXI_PRICES = {
  tonPheung:      { lak: "200,000", cny: "65"  },
  goldenTriangle: { lak: "250,000", cny: "85"  },
  huayXai:        { lak: "750,000", cny: "250" },
} as const;

// ── Flat string translations ──────────────────────────────────────────────────
export const taxi = {
  eyebrow: {
    en: "BKIA — Services",
    lo: "BKIA — ການບໍລິການ",
    zh: "BKIA — 服务",
  },
  title: {
    en: "Airport Taxi",
    lo: "ແທັກຊີສະໜາມບິນ",
    zh: "机场出租车",
  },
  subtitle: {
    en: "Fixed-price taxi and van service connecting the airport to the city and key destinations nearby.",
    lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ ລາຄາກຳນົດ ເຊື່ອມຕໍ່ສະໜາມບິນກັບຕົວເມືອງ ແລະ ຈຸດໝາຍໃກ້ຄຽງ.",
    zh: "固定价格出租车与面包车服务，连接机场与市区及周边主要目的地。",
  },
  faresLabel: {
    en: "Fixed-Price Fares",
    lo: "ລາຄາລີ່ມຕົ້ນ (ລາຄາກຳນົດ)",
    zh: "固定票价",
  },
  faresTitle: {
    en: "Destinations & Rates",
    lo: "ຈຸດໝາຍປາຍທາງ ແລະ ອັດຕາຄ່າໂດຍສານ",
    zh: "目的地与票价",
  },
  faresNote: {
    en: "All fares are fixed by destination. Inquire at the service counter before departure.",
    lo: "ລາຄາກຳນົດຕາມຈຸດໝາຍ. ກະລຸນາສອບຖາມລາຄາໂດຍກົງຢູ່ເຄົາເຕີ ກ່ອນເດີນທາງ.",
    zh: "票价按目的地固定。请出发前在服务台咨询。",
  },
  startingFrom: {
    en: "Starting from",
    lo: "ລາຄາລີ່ມຕົ້ນ",
    zh: "起价",
  },
  vehiclesLabel: {
    en: "Vehicle Options",
    lo: "ປະເພດລົດ",
    zh: "车型选择",
  },
  vehiclesTitle: {
    en: "Choose Your Ride",
    lo: "ເລືອກລົດທີ່ເໝາະສົມ",
    zh: "选择合适的车型",
  },
  paymentLabel: {
    en: "Payment",
    lo: "ຊ່ອງທາງການຊຳລະ",
    zh: "支付方式",
  },
  bookingLabel: {
    en: "Book a Taxi",
    lo: "ຈອງລົດ",
    zh: "预约用车",
  },
  bookingTitle: {
    en: "Reserve in Advance",
    lo: "ຈອງລ່ວງໜ້າ",
    zh: "提前预约",
  },
  bookingDesc: {
    en: "Call or message via WhatsApp to schedule a pick-up or drop-off at a specific time.",
    lo: "ໂທ ຫຼື ສົ່ງຂໍ້ຄວາມທາງ WhatsApp ເພື່ອນັດໝາຍເວລາຮັບ-ສົ່ງ.",
    zh: "可通过电话或 WhatsApp 预约特定时间的接送服务。",
  },
  counterLabel: {
    en: "Service Counter",
    lo: "ຈຸດໃຫ້ບໍລິການ",
    zh: "服务台",
  },
  counterLocation: {
    en: "Exit 04 — Domestic Terminal",
    lo: "ປະຕູທາງອອກ 04 — ອາຄານພາຍໃນ",
    zh: "04 号出口 — 国内航站楼",
  },
  phoneLabel: {
    en: "Call Us",
    lo: "ໂທຫາພວກເຮົາ",
    zh: "致电我们",
  },
  phone: {
    en: "+856 20 9201 4955",
    lo: "+856 20 9201 4955",
    zh: "+856 20 9201 4955",
  },
  metaTitle: {
    en: "Airport Taxi | Bokeo International Airport",
    lo: "ແທັກຊີສະໜາມບິນ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "机场出租车 | 博胶国际机场",
  },
  metaDescription: {
    en: "Fixed-price taxi and van service at Bokeo International Airport. Serving Ton Pheung, Golden Triangle SEZ, and Houay Xai.",
    lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ ລາຄາກຳນົດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ໃຫ້ບໍລິການໄປ ຕົ້ນເຜິ້ງ, ສາມຫຼຽມຄຳ ແລະ ຫ້ວຍຊາຍ.",
    zh: "博胶国际机场固定价格出租车与面包车服务，覆盖顿丰、金三角经济特区及会晒。",
  },
} as const;

export type TaxiKey = keyof typeof taxi;

export const tTaxi = (k: TaxiKey, lang: Lang): string =>
  taxi[k][lang] ?? taxi[k].en;

// ── Features ──────────────────────────────────────────────────────────────────
export const TAXI_FEATURES: Record<Lang, string[]> = {
  en: [
    "Licensed & safety-certified drivers",
    "Door-to-door service",
    "Advance reservation available",
  ],
  lo: [
    "ຄົນຂັບທີ່ໄດ້ຮັບໃບອະນຸຍາດ ແລະ ຜ່ານການຮັບຮອງ",
    "ບໍລິການຮັບ-ສົ່ງ ເຖິງຈຸດໝາຍໂດຍກົງ",
    "ສາມາດຈອງລ່ວງໜ້າໄດ້",
  ],
  zh: [
    "持证上岗，安全认证司机",
    "提供门到门直达服务",
    "支持提前预约",
  ],
};

// ── Destinations ──────────────────────────────────────────────────────────────
export interface TaxiDestBase {
  key: string;
  lak: string;
  cny: string;
}
export interface TaxiDestContent {
  name: string;
  detail: string;
}
export type TaxiDest = TaxiDestBase & TaxiDestContent;

export const TAXI_DEST_BASE: TaxiDestBase[] = [
  { key: "tonPheung",      lak: TAXI_PRICES.tonPheung.lak,      cny: TAXI_PRICES.tonPheung.cny },
  { key: "goldenTriangle", lak: TAXI_PRICES.goldenTriangle.lak, cny: TAXI_PRICES.goldenTriangle.cny },
  { key: "huayXai",        lak: TAXI_PRICES.huayXai.lak,        cny: TAXI_PRICES.huayXai.cny },
];

export const TAXI_DEST_CONTENT: Record<Lang, TaxiDestContent[]> = {
  en: [
    { name: "Ton Pheung City",        detail: "Within the city area" },
    { name: "Golden Triangle SEZ",    detail: "Special Economic Zone" },
    { name: "Houay Xai",              detail: "Provincial capital" },
  ],
  lo: [
    { name: "ພາຍໃນເມືອງຕົ້ນເຜິ້ງ",         detail: "ເຂດໃຈກາງເມືອງ" },
    { name: "ເຂດເສດຖະກິດພິເສດສາມຫຼຽມຄຳ", detail: "ເຂດເສດຖະກິດພິເສດ" },
    { name: "ຫ້ວຍຊາຍ",                      detail: "ສູນກາງແຂວງ" },
  ],
  zh: [
    { name: "顿丰市区",       detail: "市中心区域" },
    { name: "金三角经济特区", detail: "特别经济区" },
    { name: "会晒",           detail: "省会城市" },
  ],
};

// ── Vehicles ──────────────────────────────────────────────────────────────────
export interface TaxiVehicleBase {
  key: string;
  icon: "car" | "van";
}
export interface TaxiVehicleContent {
  name: string;
  desc: string;
  capacity: string;
}
export type TaxiVehicle = TaxiVehicleBase & TaxiVehicleContent;

export const TAXI_VEHICLE_BASE: TaxiVehicleBase[] = [
  { key: "taxi", icon: "car" },
  { key: "van",  icon: "van" },
];

export const TAXI_VEHICLE_CONTENT: Record<Lang, TaxiVehicleContent[]> = {
  en: [
    { name: "Taxi — Sedan", desc: "Ideal for 1–4 passengers with standard luggage.", capacity: "1–4 passengers" },
    { name: "Van",          desc: "For families or groups needing extra comfort and luggage space.", capacity: "5+ passengers" },
  ],
  lo: [
    { name: "ລົດເກັງ (Taxi)", desc: "ເໝາະສຳລັບຜູ້ໂດຍສານ 1–4 ທ່ານ ພ້ອມກະເປົາທົ່ວໄປ.", capacity: "1–4 ທ່ານ" },
    { name: "ລົດຕູ້ (Van)",   desc: "ສຳລັບຄອບຄົວ ຫຼື ກຸ່ມທີ່ຕ້ອງການຄວາມສະດວກ ແລະ ພື້ນທີ່ໃສ່ກະເປົາ.", capacity: "5+ ທ່ານ" },
  ],
  zh: [
    { name: "出租车（轿车）", desc: "适合 1–4 名乘客携带标准行李。", capacity: "1–4 人" },
    { name: "商务面包车",     desc: "适合家庭或团体，提供更宽敞的空间与行李位。", capacity: "5 人以上" },
  ],
};

// ── Payments ──────────────────────────────────────────────────────────────────
export interface TaxiPayment {
  label: string;
  detail: string;
}

export const TAXI_PAYMENTS: Record<Lang, TaxiPayment[]> = {
  en: [
    { label: "Cash",          detail: "Lao Kip (LAK) · Chinese Yuan (CNY)" },
    { label: "Bank Transfer", detail: "Mobile banking — all Lao bank apps" },
  ],
  lo: [
    { label: "ເງິນສົດ", detail: "ກີບລາວ (LAK) · ຢວນຈີນ (CNY)" },
    { label: "ໂອນເງິນ", detail: "ແອັບທະນາຄານ — ທຸກທະນາຄານລາວ" },
  ],
  zh: [
    { label: "现金",   detail: "老挝基普 (LAK) · 人民币 (CNY)" },
    { label: "银行转账", detail: "手机银行 — 支持所有老挝银行应用" },
  ],
};
