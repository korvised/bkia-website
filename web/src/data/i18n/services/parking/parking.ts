import type { Lang } from "@/types/language";

// ── Flat string translations ──────────────────────────────────────────────────
export const parking = {
  eyebrow: {
    en: "BKIA — Services",
    lo: "BKIA — ການບໍລິການ",
    zh: "BKIA — 服务",
  },
  title: {
    en: "Airport Parking",
    lo: "ລານຈອດລົດ",
    zh: "机场停车场",
  },
  subtitle: {
    en: "Convenient, well-organised parking for passengers, greeters, and visitors — with clear zones for every vehicle type.",
    lo: "ລານຈອດລົດທີ່ສະດວກສະບາຍ ແລະ ມີລະບຽບ ສຳລັບຜູ້ໂດຍສານ, ຜູ້ມາຮັບ-ສົ່ງ ແລະ ຜູ້ມາຢ້ຽມຢາມ — ມີເຂດສຳລັບທຸກປະເພດຍານພາຫະນະ.",
    zh: "为乘客、接送人员和访客提供便捷、井然有序的停车服务，各车辆类型均有专属停车区。",
  },
  mapLabel: {
    en: "Parking Layout Map",
    lo: "ແຜນຜັງລານຈອດລົດ",
    zh: "停车场布局图",
  },
  ratesLabel: {
    en: "Parking Rates",
    lo: "ອັດຕາຄ່າຈອດລົດ",
    zh: "停车费率",
  },
  ratesTitle: {
    en: "Hourly Rates",
    lo: "ຄ່າບໍລິການຕໍ່ຊົ່ວໂມງ",
    zh: "按小时计费",
  },
  ratesNote: {
    en: "All rates are charged per hour of parking.",
    lo: "ຄ່າຈອດລົດທຸກອັດຕາ ຄິດໄລ່ຕາມຊົ່ວໂມງ.",
    zh: "所有费率均按停车小时数计算。",
  },
  perHour: {
    en: "/ hr",
    lo: "/ 2 ຊ.ມ",
    zh: "/ 小时",
  },
  zonesLabel: {
    en: "Parking Zones",
    lo: "ເຂດຈອດລົດ",
    zh: "停车区域",
  },
  zonesTitle: {
    en: "Zone Guide",
    lo: "ຄູ່ມືເຂດຈອດ",
    zh: "区域指南",
  },
  domestic: {
    en: "Domestic Terminal",
    lo: "ອາຄານສາຍພາຍໃນປະເທດ",
    zh: "国内航站楼",
  },
  international: {
    en: "International Terminal",
    lo: "ອາຄານສາຍຕ່າງປະເທດ",
    zh: "国际航站楼",
  },
  paymentLabel: {
    en: "Payment",
    lo: "ການຊຳລະເງິນ",
    zh: "支付方式",
  },
  paymentTitle: {
    en: "Accepted Payment Methods",
    lo: "ວິທີການຊຳລະເງິນ",
    zh: "接受的支付方式",
  },
  tipsLabel: {
    en: "Important",
    lo: "ຂໍ້ມູນສຳຄັນ",
    zh: "重要提示",
  },
  metaTitle: {
    en: "Airport Parking | Bokeo International Airport",
    lo: "ລານຈອດລົດ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "机场停车场 | 博胶国际机场",
  },
  metaDescription: {
    en: "Convenient parking at Bokeo International Airport. Hourly rates for cars and motorcycles, two terminals, multiple payment methods.",
    lo: "ລານຈອດລົດທີ່ສະດວກສະບາຍ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຄ່າຈອດລົດຕາມຊົ່ວໂມງ ສຳລັບລົດໃຫຍ່ ແລະ ລົດຈັກ.",
    zh: "博胶国际机场便捷停车服务，按小时计费，支持多种支付方式。",
  },
} as const;

export type ParkingKey = keyof typeof parking;

export const tParking = (k: ParkingKey, lang: Lang): string =>
  parking[k][lang] ?? parking[k].en;

// ── Vehicle rates ─────────────────────────────────────────────────────────────
export interface ParkingVehicleBase {
  key: string;
  icon: "car" | "bike";
  lak: string;
  thb: string;
  cny: string;
  accent: "teal" | "amber";
}
export interface ParkingVehicleContent {
  label: string;
}
export type ParkingVehicle = ParkingVehicleBase & ParkingVehicleContent;

export const PARKING_VEHICLE_BASE: ParkingVehicleBase[] = [
  { key: "large", icon: "car",  lak: "30,000", thb: "50", cny: "10", accent: "teal" },
  { key: "small", icon: "bike", lak: "15,000", thb: "25", cny: "5",  accent: "amber" },
];

export const PARKING_VEHICLE_CONTENT: Record<Lang, ParkingVehicleContent[]> = {
  en: [
    { label: "Cars, Sedans, Pickups & Vans" },
    { label: "Motorcycles & Tuk-tuks" },
  ],
  lo: [
    { label: "ລົດໃຫຍ່ (ລົດເກັງ, ລົດຕູ້, ລົດກະບະ)" },
    { label: "ລົດຈັກ ແລະ ລົດສາມລໍ້" },
  ],
  zh: [
    { label: "轿车、皮卡、面包车" },
    { label: "摩托车、三轮车" },
  ],
};

// ── Zones ─────────────────────────────────────────────────────────────────────
export interface ParkingZone {
  zone: string;
  desc: string;
}

export const PARKING_ZONES: Record<Lang, { domestic: ParkingZone[]; international: ParkingZone[] }> = {
  en: {
    domestic: [
      { zone: "1",   desc: "Bus & Taxi parking" },
      { zone: "2–3", desc: "General passenger vehicles & motorcycles" },
      { zone: "4",   desc: "Staff & VIP parking" },
    ],
    international: [
      { zone: "1",   desc: "VIP & staff parking" },
      { zone: "2–3", desc: "General passenger vehicles & motorcycles" },
      { zone: "4",   desc: "General passenger vehicles" },
    ],
  },
  lo: {
    domestic: [
      { zone: "1",   desc: "ບ່ອນຈອດລົດເມ ແລະ ແທັກຊີ" },
      { zone: "2–3", desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ" },
      { zone: "4",   desc: "ລົດພະນັກງານ ແລະ VIP" },
    ],
    international: [
      { zone: "1",   desc: "ລົດ VIP ແລະ ພະນັກງານ" },
      { zone: "2–3", desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ" },
      { zone: "4",   desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ" },
    ],
  },
  zh: {
    domestic: [
      { zone: "1",   desc: "巴士与出租车停车区" },
      { zone: "2–3", desc: "普通乘客车辆与摩托车" },
      { zone: "4",   desc: "员工与贵宾停车区" },
    ],
    international: [
      { zone: "1",   desc: "贵宾与员工停车区" },
      { zone: "2–3", desc: "普通乘客车辆与摩托车" },
      { zone: "4",   desc: "普通乘客车辆" },
    ],
  },
};

// ── Payments ──────────────────────────────────────────────────────────────────
export interface ParkingPayment {
  label: string;
  detail: string;
}

export const PARKING_PAYMENTS: Record<Lang, ParkingPayment[]> = {
  en: [
    { label: "Cash",          detail: "Lao Kip (LAK) · Thai Baht (THB) · Chinese Yuan (CNY)" },
    { label: "Bank Transfer", detail: "Lao QR — all Lao bank apps accepted" },
  ],
  lo: [
    { label: "ເງິນສົດ", detail: "ກີບລາວ (LAK) · ບາດໄທ (THB) · ຢວນຈີນ (CNY)" },
    { label: "ໂອນເງິນ", detail: "ລາວ QR — ທຸກແອັບທະນາຄານລາວ" },
  ],
  zh: [
    { label: "现金",     detail: "老挝基普 (LAK) · 泰铢 (THB) · 人民币 (CNY)" },
    { label: "银行转账", detail: "老挝二维码 — 所有老挝银行应用均支持" },
  ],
};

// ── Tips ──────────────────────────────────────────────────────────────────────
export const PARKING_TIPS: Record<Lang, string[]> = {
  en: [
    "Keep your parking ticket safe — you will need it to exit.",
    "Payment must be settled before leaving the parking area.",
    "Follow directional signs to your designated parking zone.",
    "Overnight parking is not permitted. Violations are subject to fines.",
  ],
  lo: [
    "ເກັບປີ້ຈອດລົດໄວ້ໃຫ້ດີ — ທ່ານຈຳເປັນຕ້ອງໃຊ້ເມື່ອອອກ.",
    "ຕ້ອງຊຳລະເງິນກ່ອນອອກຈາກລານຈອດ.",
    "ປະຕິບັດຕາມປ້າຍທິດທາງໄປຫາເຂດຈອດທີ່ກຳນົດ.",
    "ບໍ່ອະນຸຍາດໃຫ້ຈອດລົດຄ້າງຄືນ ຈະມີການປັບໄໝ.",
  ],
  zh: [
    "请妥善保管停车票 — 离场时需要出示。",
    "离开停车区前必须完成付款。",
    "请按照指示牌前往指定停车区。",
    "禁止过夜停车，违者将被处以罚款。",
  ],
};
