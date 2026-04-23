import type { Lang } from "@/types/language";

// ── S3 asset paths ─────────────────────────────────────────────────────────────
export const VIP_IMG = {
  gold: "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/gold.jpg",
  premium:
    "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/premium.jpg",
  silver:
    "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/silver.jpg",
} as const;

export const VIP_ROOM_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room-2.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room-3.jpg",
] as const;

// ── Flat string translations (compatible with createTranslator) ────────────────
export const vipLounge = {
  eyebrow: {
    en: "BKIA — VIP Lounge",
    lo: "BKIA — ຫ້ອງຮັບຮອງ VIP",
    zh: "BKIA — VIP 贵宾休息室",
  },
  title: {
    en: "Premium Lounge Experience",
    lo: "ປະສົບການຫ້ອງຮັບຮອງລະດັບພຣີມຽມ",
    zh: "尊享候机体验",
  },
  subtitle: {
    en: "A private, serene space designed for passengers who value comfort and privacy before their flight.",
    lo: "ພື້ນທີ່ສ່ວນຕົວທີ່ງຽບສະຫງົບ ອອກແບບມາເພື່ອຜູ້ໂດຍສານທີ່ໃຫ້ຄວາມສຳຄັນກັບຄວາມສະດວກສະບາຍ ແລະ ຄວາມເປັນສ່ວນຕົວກ່ອນການເດີນທາງ.",
    zh: "专为注重飞行前舒适度与私密性的旅客打造的宁静私人空间。",
  },
  amenitiesLabel: {
    en: "Lounge Amenities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "休息室设施",
  },
  packagesLabel: {
    en: "Service Packages",
    lo: "ແພັກເກດການບໍລິການ",
    zh: "服务套餐",
  },
  packagesTitle: {
    en: "Choose Your Experience",
    lo: "ເລືອກປະສົບການຂອງທ່ານ",
    zh: "选择您的尊享体验",
  },
  packagesNote: {
    en: "All packages include lounge access, air conditioning, and free WiFi.",
    lo: "ທຸກໆແພັກເກດລວມມີ ການນຳໃຊ້ຫ້ອງຮັບຮອງ, ເຄື່ອງປັບອາກາດ ແລະ WiFi ຟຣີ.",
    zh: "所有套餐均包含休息室使用权、空调及免费 WiFi。",
  },
  currency: {
    en: "CNY",
    lo: "CNY",
    zh: "CNY",
  },
  perPerson: {
    en: "/ person",
    lo: "/ ທ່ານ",
    zh: "/ 人",
  },
  contactLabel: {
    en: "Reserve Your Stay",
    lo: "ຈອງການເຂົ້າໃຊ້ຂອງທ່ານ",
    zh: "预订您的行程",
  },
  contactTitle: {
    en: "Book the VIP Lounge",
    lo: "ຈອງຫ້ອງຮັບຮອງ VIP",
    zh: "预订 VIP 贵宾休息室",
  },
  contactDesc: {
    en: "Contact our team to reserve your lounge experience or to enquire about availability.",
    lo: "ຕິດຕໍ່ທີມງານຂອງພວກເຮົາເພື່ອຈອງປະສົບການຫ້ອງຮັບຮອງ ຫຼື ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ.",
    zh: "请联系我们的团队预订休息室体验或咨询空余位。",
  },
  phoneLabel: {
    en: "Lounge Reservations",
    lo: "ເບີໂທຈອງຫ້ອງຮັບຮອງ",
    zh: "休息室预订热线",
  },
  phone: {
    en: "+856 84 212 030",
    lo: "+856 84 212 030",
    zh: "+856 84 212 030",
  },
  metaTitle: {
    en: "VIP Lounge | Bokeo International Airport",
    lo: "ຫ້ອງ VIP | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "贵宾休息室 | 博胶国际机场",
  },
  metaDescription: {
    en: "Premium private lounge experience at Bokeo International Airport. Three packages available from 159 CNY.",
    lo: "ຫ້ອງຮັບຮອງ VIP ພິເສດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ສາມລະດັບຄ່າບໍລິການ ເລີ່ມຕົ້ນ 159 ຢວນ.",
    zh: "博胶国际机场尊享贵宾休息室，提供三种套餐，起价159元人民币。",
  },
} as const;

export type VipLoungeKey = keyof typeof vipLounge;

export const tVipLounge = (k: VipLoungeKey, lang: Lang): string =>
  vipLounge[k][lang] ?? vipLounge[k].en;

// ── Amenities ──────────────────────────────────────────────────────────────────
export interface VipAmenity {
  label: string;
  desc: string;
}

export const VIP_AMENITIES: Record<Lang, VipAmenity[]> = {
  en: [
    { label: "Private Seating", desc: "Exclusive seating away from the main terminal" },
    { label: "Air Conditioned", desc: "Comfortable climate-controlled environment" },
    { label: "Quiet & Private", desc: "Calm atmosphere for rest and focus" },
    { label: "Snacks Available", desc: "Complimentary light refreshments served" },
    { label: "Free WiFi", desc: "High-speed wireless internet throughout" },
  ],
  lo: [
    { label: "ທີ່ນັ່ງສ່ວນຕົວ", desc: "ທີ່ນັ່ງສະເພາະ ແຍກອອກຈາກອາຄານຜູ້ໂດຍສານຫຼັກ" },
    { label: "ຫ້ອງແອເຢັນ", desc: "ສະພາບແວດລ້ອມທີ່ຄວບຄຸມອຸນຫະພູມໃຫ້ເຢັນສະບາຍ" },
    { label: "ເງຽບສະຫງົບ & ສ່ວນຕົວ", desc: "ບັນຍາກາດທີ່ຜ່ອນຄາຍ ເພື່ອການພັກຜ່ອນ ຫຼື ການເຮັດວຽກ" },
    { label: "ມີອາຫານວ່າງບໍລິການ", desc: "ມີອາຫານວ່າງເບົາໆ ໄວ້ຄອຍບໍລິການ" },
    { label: "WiFi ຟຣີ", desc: "ອິນເຕີເນັດໄຮ້ສາຍຄວາມໄວສູງທົ່ວບໍລິເວນ" },
  ],
  zh: [
    { label: "私密座位", desc: "远离主航站楼的专属座位区" },
    { label: "恒温空调", desc: "舒适的控温环境" },
    { label: "安静私密", desc: "适合休息与专注的宁静氛围" },
    { label: "提供小食", desc: "免费供应精选轻食点心" },
    { label: "免费 WiFi", desc: "全覆盖高速无线网络" },
  ],
};

// ── Packages ───────────────────────────────────────────────────────────────────

/** Structural package data — same across all languages */
export interface VipPackageBase {
  key: "silver" | "premium" | "gold";
  price: string;
  image: string;
  accent: "slate" | "teal" | "gold";
  featured?: true;
}

/** Translated package content — differs per language */
export interface VipPackageContent {
  name: string;
  badge?: string;
  features: string[];
}

/** Merged type used in the component */
export type VipPackage = VipPackageBase & VipPackageContent;

export const VIP_PACKAGE_BASE: VipPackageBase[] = [
  { key: "silver", price: "159", image: VIP_IMG.silver, accent: "slate" },
  { key: "premium", price: "169", image: VIP_IMG.premium, accent: "teal" },
  { key: "gold", price: "179", image: VIP_IMG.gold, accent: "gold", featured: true },
];

export const VIP_PACKAGE_CONTENT: Record<Lang, VipPackageContent[]> = {
  en: [
    {
      name: "Silver Package",
      features: ["VIP lounge seating", "Light snacks", "Free WiFi", "Air conditioning"],
    },
    {
      name: "Premium Package",
      features: [
        "Comfortable lounge seating",
        "Food & beverages",
        "Free WiFi",
        "Air conditioning",
      ],
    },
    {
      name: "Gold Package",
      badge: "Best",
      features: [
        "Private seating area",
        "Premium food & beverages",
        "Boarding notification",
        "Free WiFi",
        "Newspapers & magazines",
      ],
    },
  ],
  lo: [
    {
      name: "Silver Package",
      features: [
        "ທີ່ນັ່ງໃນຫ້ອງຮັບຮອງ VIP",
        "ອາຫານວ່າງເບົາໆ",
        "WiFi ຟຣີ",
        "ຫ້ອງແອເຢັນ",
      ],
    },
    {
      name: "Premium Package",
      features: [
        "ທີ່ນັ່ງໃນຫ້ອງຮັບຮອງທີ່ສະດວກສະບາຍ",
        "ອາຫານ ແລະ ເຄື່ອງດື່ມ",
        "WiFi ຟຣີ",
        "ຫ້ອງແອເຢັນ",
      ],
    },
    {
      name: "Gold Package",
      badge: "ດີທີ່ສຸດ",
      features: [
        "ພື້ນທີ່ນັ່ງສ່ວນຕົວ",
        "ອາຫານ ແລະ ເຄື່ອງດື່ມລະດັບພຣີມຽມ",
        "ການແຈ້ງເຕືອນເວລາຂຶ້ນເຮືອບິນ",
        "WiFi ຟຣີ",
        "ໜັງສືພິມ ແລະ ວາລະສານ",
      ],
    },
  ],
  zh: [
    {
      name: "白银套餐 (Silver)",
      features: ["VIP 贵宾室座位", "精选小食", "免费 WiFi", "恒温空调"],
    },
    {
      name: "高级套餐 (Premium)",
      features: ["舒适休息室座位", "餐饮服务", "免费 WiFi", "恒温空调"],
    },
    {
      name: "黄金套餐 (Gold)",
      badge: "推荐",
      features: [
        "专属私人座位区",
        "高端餐饮服务",
        "登机提醒服务",
        "免费 WiFi",
        "报刊杂志",
      ],
    },
  ],
};
