import type { Lang } from "@/types/language";

export const contacts = {
  // ── Metadata ──────────────────────────────────────────────────────────────
  pageTitle: {
    en: "Contact Us — Bokeo International Airport",
    lo: "ຕິດຕໍ່ພວກເຮົາ — ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "联系我们 — 博胶国际机场",
  },
  pageDescription: {
    en: "Get in touch with Bokeo International Airport. Call, email, or visit our on-site service desks.",
    lo: "ຕິດຕໍ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ໂທ, ສົ່ງອີເມວ ຫຼື ມາຢ້ຽມຢາມຈຸດບໍລິການ.",
    zh: "联系博胶国际机场。欢迎致电、发邮件或前往各服务台。",
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  heroLabel: { en: "Support", lo: "ຊ່ວຍເຫຼືອ", zh: "服务支持" },
  heroTitle: {
    en: "Contact Us",
    lo: "ຕິດຕໍ່ພວກເຮົາ",
    zh: "联系我们",
  },
  heroSubtitle: {
    en: "Our team is here to help — by phone, email, or in person at the airport.",
    lo: "ທີມງານຂອງພວກເຮົາພ້ອມໃຫ້ການຊ່ວຍເຫຼືອ — ທາງໂທລະສັບ, ອີເມວ ຫຼື ທີ່ສະໜາມບິນ.",
    zh: "我们的团队随时为您提供支持——可通过电话、电子邮件或亲临机场联系我们。",
  },

  // ── Quick contact cards ────────────────────────────────────────────────────
  phoneCardTitle:    { en: "Call Us",        lo: "ໂທຫາພວກເຮົາ",   zh: "致电我们"    },
  phoneCardSub:      { en: "Available daily 06:00 – 22:00", lo: "ບໍລິການ 06:00 – 22:00 ທຸກມື້", zh: "每日 06:00–22:00" },
  emailCardTitle:    { en: "Email Us",       lo: "ສົ່ງອີເມວ",      zh: "发送邮件"    },
  emailCardSub:      { en: "We reply within 24 hours",      lo: "ຕອບກັບພາຍໃນ 24 ຊົ່ວໂມງ",     zh: "24小时内回复"    },
  locationCardTitle: { en: "Visit Us",       lo: "ມາຢ້ຽມຢາມ",      zh: "到访机场"    },
  locationCardSub:   {
    en: "Tônpheung District, Bokeo Province, Lao PDR",
    lo: "ບ້ານໃຫຍ່ສີເມືອງງາມ, ເມື່ອງຕົ້ນເຜີ້ງ, ແຂວງບໍ່ແກ້ວ, ສປປ ລາວ",
    zh: "老挝博乔省会晒村",
  },

  // ── Service desks ─────────────────────────────────────────────────────────
  servicesTitle: {
    en: "On-Site Service Desks",
    lo: "ຈຸດໃຫ້ບໍລິການໃນສະໜາມບິນ",
    zh: "机场现场服务台",
  },
  servicesSubtitle: {
    en: "Find the right desk for your needs inside the terminal.",
    lo: "ຊອກຫາຈຸດໃຫ້ບໍລິການທີ່ເໝາະສົມສຳລັບທ່ານພາຍໃນອາຄານ.",
    zh: "在候机楼内找到适合您需求的服务台。",
  },

  /* ─── Information Desk ───────────────────────────────────────────────── */
  infoTitle: { en: "Information Desk", lo: "ຈຸດໃຫ້ຂໍ້ມູນ", zh: "信息台" },
  infoDesc: {
    en: "Flight schedules, terminal directions, and general airport assistance.",
    lo: "ຕາຕະລາງການບິນ, ທິດທາງໃນອາຄານ ແລະ ການຊ່ວຍເຫຼືອທົ່ວໄປ.",
    zh: "航班时刻查询、航站楼指引及一般机场协助。",
  },
  infoLocation: {
    en: "Arrivals Hall, Terminal 1",
    lo: "ຫ້ອງໂຖງຮັບຜູ້ໂດຍສານ, ອາຄານ 1",
    zh: "1号航站楼到达大厅",
  },
  infoHours: { en: "Daily 06:00 – 22:00", lo: "ທຸກມື້ 06:00 – 22:00", zh: "每日 06:00–22:00" },

  /* ─── Taxi Counter ───────────────────────────────────────────────────── */
  taxiTitle: { en: "Taxi Counter", lo: "ເຄົາເຕີລົດໂດຍສານ", zh: "出租车服务台" },
  taxiDesc: {
    en: "Fixed-rate taxis and private vans to the city center, hotels, and border crossings.",
    lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ລາຄາຄົງທີ່ ໄປຕົວເມືອງ, ໂຮງແຮມ ແລະ ດ່ານຊາຍແດນ.",
    zh: "提供固定价格出租车及商务车接送，直达市区、酒店及边境口岸。",
  },
  taxiLocation: {
    en: "Exit 04, Domestic Terminal",
    lo: "ທາງອອກ 04, ອາຄານໂດຍສານພາຍໃນ",
    zh: "国内航站楼04号出口",
  },
  taxiHours: { en: "Daily 06:00 – 22:00", lo: "ທຸກມື້ 06:00 – 22:00", zh: "每日 06:00–22:00" },

  /* ─── VIP Lounge ─────────────────────────────────────────────────────── */
  vipTitle: { en: "VIP Lounge", lo: "ຫ້ອງ VIP", zh: "贵宾室" },
  vipDesc: {
    en: "Access premium lounges featuring comfortable seating, refreshments, and high-speed Wi-Fi.",
    lo: "ບໍລິການຫ້ອງຮັບຮອງລະດັບພຣີມຽມ ພ້ອມບ່ອນນັ່ງທີ່ສະດວກສະບາຍ, ອາຫານຫວ່າງ ແລະ Wi-Fi.",
    zh: "尊享贵宾休息室，配备舒适座椅、精美茶点及无线网络。",
  },
  vipLocation: { en: "Departures, Level 2", lo: "ຂາອອກ, ຊັ້ນ 2", zh: "出发层2楼" },
  vipHours: {
    en: "Flight operations hours",
    lo: "ຕາມເວລາການບິນ",
    zh: "随航班运营时间开放",
  },

  /* ─── Special Services ───────────────────────────────────────────────── */
  specialTitle: { en: "Special Services", lo: "ບໍລິການພິເສດ", zh: "特殊服务" },
  specialDesc: {
    en: "Dedicated assistance for wheelchairs, unaccompanied minors, and passengers requiring special care.",
    lo: "ບໍລິການລົດເຂັນຊ່ວຍເຫຼືອ, ເດັກນ້ອຍທີ່ເດີນທາງລຳພັງ ແລະ ຜູ້ໂດຍສານທີ່ຕ້ອງການການເບິ່ງແຍງ.",
    zh: "提供轮椅协助、无成人陪伴儿童及特殊旅客关怀服务。",
  },
  specialLocation: {
    en: "Check-in Area, Terminal 1",
    lo: "ບໍລິເວນເຊັກອິນ, ອາຄານ 1",
    zh: "1号航站楼值机区",
  },
  specialHours: {
    en: "Available on all flight days",
    lo: "ມີໃຫ້ທຸກວັນທີ່ມີຖ້ຽວບິນ",
    zh: "所有航班日均可提供",
  },

  // ── Shared UI ─────────────────────────────────────────────────────────────
  callLabel:      { en: "Call",      lo: "ໂທ",       zh: "拨打电话" },
  whatsappLabel:  { en: "WhatsApp",  lo: "WhatsApp",  zh: "WhatsApp" },
} as const;

export type ContactsKey = keyof typeof contacts;

export const tContacts = (k: ContactsKey, lang: Lang) =>
  contacts[k][lang] ?? contacts[k].en;
