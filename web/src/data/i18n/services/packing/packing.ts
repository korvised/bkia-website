import type { Lang } from "@/types/language";

// ── Flat string translations ──────────────────────────────────────────────────
export const packing = {
  eyebrow: {
    en: "BKIA — Services",
    lo: "BKIA — ການບໍລິການ",
    zh: "BKIA — 机场服务",
  },
  title: {
    en: "Luggage Wrapping Service",
    lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ",
    zh: "行李塑封包装服务",
  },
  subtitle: {
    en: "Professional wrapping to keep your belongings safe and compliant throughout your journey.",
    lo: "ບໍລິການຫຸ້ມຫໍ່ແບບມືອາຊີບ ເພື່ອຮັກສາຊັບສິນຂອງທ່ານໃຫ້ປອດໄພ ແລະ ຖືກຕ້ອງຕາມລະບຽບຕະຫຼອດການເດີນທາງ.",
    zh: "专业的塑封包装，确保您的财物在旅途中安全并符合航空合规要求。",
  },
  pricingLabel: {
    en: "Pricing",
    lo: "ລາຄາ",
    zh: "价格表",
  },
  pricingTitle: {
    en: "Service Rates",
    lo: "ອັດຕາຄ່າບໍລິການ",
    zh: "服务资费",
  },
  pricingNote: {
    en: "Final rates depend on item size. Please consult our staff on-site for a precise quote.",
    lo: "ລາຄາແມ່ນຂຶ້ນກັບຂະໜາດສິ່ງຂອງ, ກະລຸນາສອບຖາມລາຄາຕົວຈິງນຳພະນັກງານ.",
    zh: "最终价格取决于物品尺寸，具体请咨询现场工作人员。",
  },
  startingFrom: {
    en: "Starting from",
    lo: "ເລີ່ມຕົ້ນທີ່",
    zh: "价格起步于",
  },
  lakUnit: { en: "LAK", lo: "ກີບ", zh: "基普" },
  thbUnit: { en: "THB", lo: "ບາດ", zh: "泰铢" },
  cnyUnit: { en: "CNY", lo: "ຫຍວນ", zh: "元" },
  prohibitedLabel: {
    en: "Prohibited Items",
    lo: "ສິ່ງຂອງຕ້ອງຫ້າມ",
    zh: "禁止物品",
  },
  prohibitedTitle: {
    en: "Items We Cannot Wrap",
    lo: "ສິ່ງຂອງທີ່ບໍ່ສາມາດຫຸ້ມຫໍ່ໄດ້",
    zh: "不可包装物品清单",
  },
  prohibitedNote: {
    en: "The following items may not be wrapped or carried as checked baggage. Please check full airline and customs regulations before packing.",
    lo: "ລາຍການຕໍ່ໄປນີ້ບໍ່ສາມາດຫຸ້ມຫໍ່ ຫຼື ຝາກເປັນກະເປົາໃຕ້ທ້ອງເຄື່ອງໄດ້. ກະລຸນາກວດສອບລະບຽບການຂອງສາຍການບິນ ແລະ ພາສີຢ່າງລະອຽດ.",
    zh: "以下物品严禁包装或作为托运行李运输。请在打包前查阅航空公司及海关规定。",
  },
  readMoreLabel: {
    en: "Full Baggage Regulations",
    lo: "ລະບຽບການກ່ຽວກັບກະເປົາທັງໝົດ",
    zh: "完整行李规定详情",
  },
  locationLabel: {
    en: "Find Us",
    lo: "ຊອກຫາພວກເຮົາ",
    zh: "服务网点",
  },
  locationTitle: {
    en: "Service Location",
    lo: "ສະຖານທີ່ບໍລິການ",
    zh: "服务位置",
  },
  locationBuilding: {
    en: "Domestic Terminal",
    lo: "ອາຄານຜູ້ໂດຍສານພາຍໃນປະເທດ",
    zh: "国内航站楼",
  },
  locationDesc: {
    en: "Left of Departure Gate 04 — or directly in front of the Domestic Arrivals entrance.",
    lo: "ເບື້ອງຊ້າຍຂອງປະຕູທາງອອກ 04 — ຫຼື ຢູ່ທາງໜ້າປະຕູທາງເຂົ້າຂາເຂົ້າພາຍໃນປະເທດ.",
    zh: "位于 04 号离港门左侧 —— 或国内到达入口正前方。",
  },
  locationNote: {
    en: "Our staff are available during all operating hours.",
    lo: "ພະນັກງານຂອງພວກເຮົາພ້ອມໃຫ້ບໍລິການຕະຫຼອດເວລາທຳການ.",
    zh: "我们的工作人员在机场运营期间全程提供服务。",
  },
  metaTitle: {
    en: "Luggage Wrapping Service | Bokeo International Airport",
    lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "行李打包裹膜服务 | 博胶国际机场",
  },
  metaDescription: {
    en: "Professional luggage wrapping at Bokeo International Airport. Protect your bags, comply with airline regulations.",
    lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ ດ້ວຍມືອາຊີບ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    zh: "博胶国际机场专业行李裹膜服务，保护行李安全，符合航空法规。",
  },
} as const;

export type PackingKey = keyof typeof packing;

export const tPacking = (k: PackingKey, lang: Lang): string =>
  packing[k][lang] ?? packing[k].en;

// ── Benefits ──────────────────────────────────────────────────────────────────
export interface PackingBenefit {
  label: string;
  desc: string;
}

export const PACKING_BENEFITS: Record<Lang, PackingBenefit[]> = {
  en: [
    {
      label: "Scratch & Breakage Protection",
      desc: "Multi-layer wrap shields against impacts and abrasion during handling",
    },
    {
      label: "Luggage Security",
      desc: "Tamper-evident wrap deters unauthorized access to your bags",
    },
    {
      label: "Airline Regulation Compliant",
      desc: "Wrapping meets international aviation safety standards",
    },
    {
      label: "Bags, Fragile Items & Documents",
      desc: "Suitable for travel bags, fragile parcels, and document folders",
    },
  ],
  lo: [
    {
      label: "ປ້ອງກັນຮອຍຂີດຂວດ ແລະ ການແຕກຫັກ",
      desc: "ການຫຸ້ມຫໍ່ຫຼາຍຊັ້ນຊ່ວຍປ້ອງກັນການກະທົບ ແລະ ການຂັດສີລະຫວ່າງການຂົນສົ່ງ",
    },
    {
      label: "ຄວາມປອດໄພຂອງກະເປົາ",
      desc: "ການຫຸ້ມຫໍ່ທີ່ປ້ອງກັນການງັດແງະ ຊ່ວຍຢັບຢັ້ງການເຂົ້າເຖິງກະເປົາໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດ",
    },
    {
      label: "ຖືກຕ້ອງຕາມລະບຽບສາຍການບິນ",
      desc: "ການຫຸ້ມຫໍ່ໄດ້ມາດຕະຖານຄວາມປອດໄພການບິນສາກົນ",
    },
    {
      label: "ກະເປົາ, ສິ່ງຂອງແຕກຫັກງ່າຍ ແລະ ເອກະສານ",
      desc: "ເໝາະສຳລັບກະເປົາເດີນທາງ, ພັດສະດຸທີ່ແຕກຫັກງ່າຍ ແລະ ແຟ້ມເອກະສານ",
    },
  ],
  zh: [
    {
      label: "防刮擦与防破损",
      desc: "多层塑封膜可抵御搬运过程中的撞击与磨损",
    },
    {
      label: "行李安全保障",
      desc: "防拆封包装可防止未经授权擅自开启您的行李",
    },
    { label: "符合航空标准", desc: "包装标准符合国际民航安全规范" },
    { label: "行李、易碎品及文件", desc: "适用于旅行箱、易碎包裹以及文件袋" },
  ],
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export interface PackingSize {
  key: string;
  label: string;
  sublabel: string;
  lak: string;
  thb: string;
  cny: string;
}

export const PACKING_SIZES: Record<Lang, PackingSize[]> = {
  en: [
    { key: "small",  label: "Small",  sublabel: "Carry-on / hand luggage",      lak: "15,000",  thb: "25",  cny: "5"  },
    { key: "medium", label: "Medium", sublabel: "Standard checked bag",          lak: "50,000",  thb: "80",  cny: "15" },
    { key: "large",  label: "Large",  sublabel: "Oversized / special items",     lak: "100,000", thb: "160", cny: "35" },
  ],
  lo: [
    { key: "small",  label: "ຂະໜາດນ້ອຍ", sublabel: "ພັດສະດຸຖືຂຶ້ນເຄື່ອງ / ກະເປົາຖື",     lak: "15,000",  thb: "25",  cny: "5"  },
    { key: "medium", label: "ຂະໜາດກາງ",  sublabel: "ພັດສະດຸຝາກໃຕ້ທ້ອງເຄື່ອງມາດຕະຖານ",    lak: "50,000",  thb: "80",  cny: "15" },
    { key: "large",  label: "ຂະໜາດໃຫຍ່", sublabel: "ພັດສະດຸຂະໜາດໃຫຍ່ / ເຄື່ອງໃຊ້ພິເສດ", lak: "100,000", thb: "160", cny: "35" },
  ],
  zh: [
    { key: "small",  label: "小号", sublabel: "登机行李 / 手提行李",   lak: "15,000",  thb: "25",  cny: "5"  },
    { key: "medium", label: "中号", sublabel: "标准托运行李",           lak: "50,000",  thb: "80",  cny: "15" },
    { key: "large",  label: "大号", sublabel: "超大件物品 / 特殊物品", lak: "100,000", thb: "160", cny: "35" },
  ],
};

// ── Prohibited items ──────────────────────────────────────────────────────────
export interface PackingProhibited {
  label: string;
  desc: string;
}

export const PACKING_PROHIBITED: Record<Lang, PackingProhibited[]> = {
  en: [
    {
      label: "Flammable / Chemicals / Gas",
      desc: "Lighters, aerosols, compressed gas, paint, solvents",
    },
    {
      label: "Firearms & Explosives",
      desc: "Weapons, ammunition, fireworks, blasting caps",
    },
    {
      label: "Batteries, Lighters & Phones",
      desc: "Spare lithium batteries and power banks must travel in cabin",
    },
    {
      label: "Sharp Objects & Strong Magnets",
      desc: "Knives, scissors over 6 cm, industrial magnets",
    },
    {
      label: "Strong-Smelling Food",
      desc: "Durian, mangosteen and other pungent foods are restricted",
    },
  ],
  lo: [
    {
      label: "ວັດຖຸໄວໄຟ / ສານເຄມີ / ແກ໊ສ",
      desc: "ໄຟແຊັກ, ສະເປຣ, ແກ໊ສອັດຄວາມດັນ, ສີ, ສານລະລາຍ",
    },
    {
      label: "ອາວຸດ ແລະ ວັດຖຸລະເບີດ",
      desc: "ອາວຸດ, ລູກກະສຸນ, ດອກໄມ້ໄຟ, ເຊື້ອປະທຸ",
    },
    {
      label: "ແບັດເຕີຣີ, ໄຟແຊັກ ແລະ ໂທລະສັບ",
      desc: "ແບັດເຕີຣີລິທຽມສຳຮອງ ແລະ ພາວເວີແບັງ ຕ້ອງຖືຂຶ້ນຫ້ອງໂດຍສານເທົ່ານັ້ນ",
    },
    {
      label: "ຂອງມີຄົມ ແລະ ແມ່ເຫຼັກແຮງສູງ",
      desc: "ມີດ, ກັນໄກທີ່ມີຄວາມຍາວເກີນ 6 ຊມ, ແມ່ເຫຼັກອຸດສາຫະກຳ",
    },
    {
      label: "ອາຫານທີ່ມີກິ່ນແຮງ",
      desc: "ທຸລຽນ, ມັງຄຸດ ແລະ ອາຫານທີ່ມີກິ່ນແຮງອື່ນໆ ແມ່ນຖືກຈຳກັດ",
    },
  ],
  zh: [
    {
      label: "易燃物 / 化学品 / 气体",
      desc: "打火机、喷雾剂、压缩气体、油漆、溶剂",
    },
    { label: "武器及爆炸物", desc: "枪支、弹药、烟花爆竹、雷管" },
    {
      label: "电池、打火机及手机",
      desc: "备用锂电池及充电宝必须随身携带上机",
    },
    { label: "锋利物品及强磁铁", desc: "刀具、超过 6 厘米的剪刀、工业磁铁" },
    {
      label: "有强烈气味的食物",
      desc: "榴莲、山竹及其他有强烈气味的食物受运输限制",
    },
  ],
};
