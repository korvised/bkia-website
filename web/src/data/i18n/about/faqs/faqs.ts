import type { Lang } from "@/types/language";

// ── Page meta strings ──────────────────────────────────────────────────────

export const faqs = {
  pageTitle: {
    en: "Frequently Asked Questions",
    lo: "ຄຳຖາມທີ່ຖາມເລື້ອຍໆ",
    zh: "常见问题解答",
  },
  pageDescription: {
    en: "Find answers to the most common questions about traveling through Bokeo International Airport.",
    lo: "ຊອກຫາຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປກ່ຽວກັບການເດີນທາງຜ່ານ ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    zh: "为您解答有关博胶国际机场出行的各类常见问题。",
  },
  heroTitle: {
    en: "How can we help you?",
    lo: "ພວກເຮົາສາມາດຊ່ວຍທ່ານໄດ້ແນວໃດ?",
    zh: "我们能为您提供什么帮助？",
  },
  heroSubtitle: {
    en: "Browse our most common questions or search for a specific topic below.",
    lo: "ຄົ້ນຫາຄຳຖາມທີ່ພົບເລື້ອຍ ຫຼື ຄົ້ນຫາຫົວຂໍ້ທີ່ທ່ານສົນໃຈຢູ່ດ້ານລຸ່ມ.",
    zh: "您可以浏览下方常见问题，或搜索特定主题。",
  },
  searchPlaceholder: {
    en: "Search questions…",
    lo: "ຄົ້ນຫາຄຳຖາມ…",
    zh: "搜索问题...",
  },
  searchResults: {
    en: "results for",
    lo: "ຜົນການຄົ້ນຫາສຳລັບ",
    zh: "条搜索结果：",
  },
  clearSearch: {
    en: "Clear",
    lo: "ລ້າງອອກ",
    zh: "清除",
  },
  noResults: {
    en: "No results found",
    lo: "ບໍ່ພົບຜົນການຄົ້ນຫາ",
    zh: "未找到相关结果",
  },
  noResultsHint: {
    en: "Try different keywords or browse all categories below.",
    lo: "ລອງໃຊ້ຄຳສັບອື່ນ ຫຼື ເບິ່ງຕາມໝວດໝູ່ທັງໝົດດ້ານລຸ່ມ.",
    zh: "请尝试输入其他关键词，或浏览下方的分类列表。",
  },
  catFlights: {
    en: "Flights",
    lo: "ທ່ຽວບິນ",
    zh: "航班信息",
  },
  catCheckin: {
    en: "Check-in & Baggage",
    lo: "ການແຈ້ງປີ້ ແລະ ກະເປົາ",
    zh: "值机与行李",
  },
  catSecurity: {
    en: "Security & Immigration",
    lo: "ຄວາມປອດໄພ ແລະ ກວດຄົນເຂົ້າເມືອງ",
    zh: "安检与移民局",
  },
  catServices: {
    en: "Services & Facilities",
    lo: "ການບໍລິການ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "机场服务与设施",
  },
  catTransport: {
    en: "Transportation",
    lo: "ການຂົນສົ່ງ",
    zh: "交通接驳",
  },
  stillHaveQuestions: {
    en: "Still have questions?",
    lo: "ຍັງມີຄຳຖາມເພີ່ມເຕີມບໍ?",
    zh: "还有其他疑问？",
  },
  contactSubtitle: {
    en: "Our team is available to help you. Reach us by phone or email.",
    lo: "ທີມງານຂອງພວກເຮົາພ້ອມໃຫ້ຄຳແນະນຳ. ຕິດຕໍ່ພວກເຮົາໄດ້ທາງໂທລະສັບ ຫຼື ອີເມວ.",
    zh: "我们的团队随时为您提供支持。欢迎通过电话或电子邮件联系我们。",
  },
  callUs: {
    en: "Call Us",
    lo: "ໂທຫາພວກເຮົາ",
    zh: "拨打电话",
  },
  emailUs: {
    en: "Email Us",
    lo: "ສົ່ງອີເມວຫາພວກເຮົາ",
    zh: "发送邮件",
  },
} as const;

export type FAQsKey = keyof typeof faqs;

export const tFAQs = (k: FAQsKey, lang: Lang) => faqs[k][lang] ?? faqs[k].en;

// ── FAQ data ───────────────────────────────────────────────────────────────

export type FAQCategory =
  | "flights"
  | "checkin"
  | "security"
  | "services"
  | "transport";

export interface FAQLink {
  label: { en: string; lo: string; zh: string };
  href: string; // path without lang prefix, e.g. "/services/parking"
}

export interface FAQQA {
  id: string;
  cat: FAQCategory;
  q: { en: string; lo: string; zh: string };
  a: { en: string; lo: string; zh: string };
  links?: FAQLink[];
}

export const faqData: FAQQA[] = [
  // ── Flights ─────────────────────────────────────────────────────────────
  {
    id: "f1",
    cat: "flights",
    q: {
      en: "What airlines operate at Bokeo International Airport?",
      lo: "ສາຍການບິນໃດແດ່ທີ່ເປີດໃຫ້ບໍລິການຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ?",
      zh: "哪些航空公司在博胶国际机场运营？",
    },
    a: {
      en: "Bokeo International Airport is currently served by Lao Airlines and Lao Skyway. Domestic routes connect Bokeo to Vientiane (Wattay), while international routes cover destinations in Thailand and China. Each airline operates its own ticketing counters inside the terminal. For hotlines, booking contacts, and the latest schedule, visit our Airlines page.",
      lo: "ປັດຈຸບັນ ສະໜາມບິນສາກົນບໍ່ແກ້ວ ແມ່ນໃຫ້ບໍລິການໂດຍ ສາຍການບິນລາວ (Lao Airlines) ແລະ ລາວສະກາຍເວ (Lao Skyway). ມີເສັ້ນທາງພາຍໃນປະເທດເຊື່ອມຕໍ່ ບໍ່ແກ້ວ - ວຽງຈັນ (ວັດໄຕ), ແລະ ເສັ້ນທາງສາກົນໄປຍັງປະເທດໄທ ແລະ ສປ ຈີນ. ແຕ່ລະສາຍການບິນມີເຄົາເຕີຂາຍປີ້ເປັນຂອງຕົນເອງພາຍໃນອາຄານຜູ້ໂດຍສານ. ທ່ານສາມາດເບິ່ງເບີຕິດຕໍ່ ແລະ ຕາຕະລາງບິນລ່າສຸດໄດ້ທີ່ໜ້າສາຍການບິນ.",
      zh: "博胶国际机场目前由老挝航空 (Lao Airlines) 和老挝天空航空 (Lao Skyway) 提供服务。国内航线连接博胶与万象（瓦岱机场），国际航线覆盖泰国和中国的目的地。各航空公司在候机楼内设有独立售票柜台。如需查询热线、预订联系方式及最新时刻表，请访问“航空公司”页面。",
    },
    links: [
      {
        label: {
          en: "View Airlines",
          lo: "ເບິ່ງສາຍການບິນ",
          zh: "查看航空公司",
        },
        href: "/flights/airlines",
      },
    ],
  },
  {
    id: "f2",
    cat: "flights",
    q: {
      en: "How can I check my flight status?",
      lo: "ຂ້ອຍສາມາດກວດສອບສະຖານະທ່ຽວບິນໄດ້ແນວໃດ?",
      zh: "如何查询我的航班状态？",
    },
    a: {
      en: "Real-time departure and arrival status is updated continuously on our website. On the Departures board you can see estimated take-off times, gate assignments, and delay notices. On the Arrivals board you can see estimated landing times and baggage belt numbers. You can also call the airport information desk at +856 84 260 179 or ask staff at the terminal information counters.",
      lo: "ສະຖານະການບິນຂາເຂົ້າ ແລະ ຂາອອກແບບ Real-time ແມ່ນມີການອັບເດດຢ່າງຕໍ່ເນື່ອງໃນເວັບໄຊຂອງພວກເຮົາ. ທ່ານສາມາດກວດເບິ່ງເວລາອອກເດີນທາງ, ປະຕູທາງອອກ (Gate) ແລະ ແຈ້ງການຊັກຊ້າໄດ້ທີ່ກະດານຂາອອກ. ສຳລັບຂາເຂົ້າ ທ່ານສາມາດເບິ່ງເວລາລົງຈອດ ແລະ ເລກສາຍພານຮັບກະເປົາໄດ້. ນອກນັ້ນ ຍັງສາມາດໂທສອບຖາມໄດ້ທີ່ເບີ +856 84 260 179 ຫຼື ສອບຖາມພະນັກງານຢູ່ເຄົາເຕີປະຊາສຳພັນ.",
      zh: "我们网站上的实时出发和到达状态持续更新。在“出发航班”列表上，您可以查看预计起飞时间、登机口安排和延误通知。在“到达航班”列表上，您可以查看预计降落时间和行李转盘编号。您也可以拨打 +856 84 260 179 联系机场信息台，或向候机楼信息柜台工作人员咨询。",
    },
    links: [
      {
        label: {
          en: "Departures Board",
          lo: "ກະດານທ່ຽວບິນຂາອອກ",
          zh: "出发航班列表",
        },
        href: "/flights/departures",
      },
      {
        label: {
          en: "Arrivals Board",
          lo: "ກະດານທ່ຽວບິນຂາເຂົ້າ",
          zh: "到达航班列表",
        },
        href: "/flights/arrivals",
      },
    ],
  },
  {
    id: "f3",
    cat: "flights",
    q: {
      en: "What should I do if my flight is delayed or cancelled?",
      lo: "ຂ້ອຍຄວນເຮັດແນວໃດ ຫາກທ່ຽວບິນຊັກຊ້າ ຫຼື ຖືກຍົກເລີກ?",
      zh: "如果我的航班延误或取消，我该怎么办？",
    },
    a: {
      en: "Contact your airline directly for rebooking and compensation options. Our information desk can help you locate your airline's service counter inside the terminal.",
      lo: "ກະລຸນາຕິດຕໍ່ສາຍການບິນຂອງທ່ານໂດຍກົງ ເພື່ອຂໍປ່ຽນຖ່ຽວບິນ ຫຼື ສອບຖາມກ່ຽວກັບການຊົດເຊີຍ. ເຄົາເຕີປະຊາສຳພັນຂອງພວກເຮົາ ສາມາດຊ່ວຍແນະນຳຈຸດບໍລິການຂອງສາຍການບິນຕ່າງໆ ພາຍໃນອາຄານຜູ້ໂດຍສານໃຫ້ທ່ານໄດ້.",
      zh: "请直接联系您的航空公司了解改签、退票和赔偿事宜。我们的信息台可以帮助您在候机楼内找到对应航空公司的服务柜台。",
    },
  },
  {
    id: "f4",
    cat: "flights",
    q: {
      en: "How early should I arrive before my flight?",
      lo: "ຂ້ອຍຄວນມາຮອດສະໜາມບິນກ່ອນເວລາຈັກຊົ່ວໂມງ?",
      zh: "我应该提前多久到达机场？",
    },
    a: {
      en: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights. This allows time for parking or drop-off, check-in, baggage drop, security screening, and — for international departures — immigration. During peak travel periods (public holidays, major events) add an extra 30–45 minutes. See our full departure guide for a step-by-step walkthrough of the process.",
      lo: "ພວກເຮົາແນະນຳໃຫ້ມາຮອດສະໜາມບິນຢ່າງໜ້ອຍ 2 ຊົ່ວໂມງ ສຳລັບທ່ຽວບິນພາຍໃນ ແລະ 3 ຊົ່ວໂມງ ສຳລັບທ່ຽວບິນສາກົນ ເພື່ອໃຫ້ມີເວລາພຽງພໍໃນການຈອດລົດ, ແຈ້ງປີ້, ຝາກກະເປົາ, ກວດຄວາມປອດໄພ ແລະ ຂັ້ນຕອນກວດຄົນເຂົ້າເມືອງ (ສຳລັບຂາອອກສາກົນ). ໃນຊ່ວງເທດສະການທີ່ມີຄົນເດີນທາງຫຼາຍ ຄວນເພີ່ມເວລາອີກ 30–45 ນາທີ.",
      zh: "我们建议国内航班至少提前 2 小时、国际航班至少提前 3 小时到达，以便有充足时间进行值机、托运行李、通过安检，以及办理出境手续（国际出发）。节假日或重大活动期间，请额外预留 30-45 分钟。请参阅我们的“出发指南”了解详细步骤。",
    },
    links: [
      {
        label: { en: "Departure Guide", lo: "ຄູ່ມືຂາອອກ", zh: "出发指南" },
        href: "/guides/departures",
      },
    ],
  },

  // ── Check-in & Baggage ───────────────────────────────────────────────────
  {
    id: "c1",
    cat: "checkin",
    q: {
      en: "When does check-in open and close?",
      lo: "ການແຈ້ງປີ້ ເປີດ ແລະ ປິດເວລາໃດ?",
      zh: "值机柜台何时开放和关闭？",
    },
    a: {
      en: "Check-in typically opens 2 hours before departure. It closes 45 minutes before departure for domestic flights and 60 minutes before for international flights. Times may vary by airline, so please confirm with your carrier.",
      lo: "ໂດຍທົ່ວໄປ ການແຈ້ງປີ້ຈະເປີດ 2 ຊົ່ວໂມງກ່ອນເວລາບິນ. ແລະ ຈະປິດກ່ອນເວລາບິນ 45 ນາທີ ສຳລັບທ່ຽວບິນພາຍໃນ ແລະ 60 ນາທີ ສຳລັບທ່ຽວບິນສາກົນ. ທັງນີ້ ເວລາອາດມີການປ່ຽນແປງຕາມແຕ່ລະສາຍການບິນ.",
      zh: "值机通常在起飞前 2 小时开放。国内航班通常在起飞前 45 分钟关闭，国际航班在起飞前 60 分钟关闭。具体时间因航空公司而异，请务必向您的航司确认。",
    },
  },
  {
    id: "c2",
    cat: "checkin",
    q: {
      en: "What is the baggage allowance?",
      lo: "ນ້ຳໜັກກະເປົາທີ່ອະນຸຍາດແມ່ນເທົ່າໃດ?",
      zh: "免费行李额度是多少？",
    },
    a: {
      en: "Allowances vary by airline and cabin class. Economy class generally allows 20–23 kg for checked baggage and 7 kg for carry-on. Please check with your airline for your specific ticket's limits.",
      lo: "ນ້ຳໜັກກະເປົາທີ່ອະນຸຍາດແມ່ນຂຶ້ນກັບສາຍການບິນ ແລະ ຊັ້ນຂອງປີ້ບິນ. ໂດຍທົ່ວໄປ ຊັ້ນປະຢັດ (Economy) ຈະອະນຸຍາດໃຫ້ຝາກກະເປົາໄດ້ 20–23 ກິໂລ ແລະ ຖືຂຶ້ນເຄື່ອງໄດ້ 7 ກິໂລ. ກະລຸນາກວດສອບເງື່ອນໄຂໃນປີ້ບິນຂອງທ່ານຄືນອີກຄັ້ງ.",
      zh: "行李限额因航空公司和舱位等级而异。经济舱通常允许 20–23 公斤托运行李和 7 公斤手提行李。请根据您的机票详情向航空公司确认具体限额。",
    },
  },
  {
    id: "c3",
    cat: "checkin",
    q: {
      en: "What items are prohibited in carry-on baggage?",
      lo: "ສິ່ງຂອງໃດແດ່ທີ່ຫ້າມນຳຂຶ້ນເຄື່ອງ (Carry-on)?",
      zh: "手提行李中禁止携带哪些物品？",
    },
    a: {
      en: "Common prohibited carry-on items include: sharp or pointed objects (knives, scissors over 6 cm), liquids over 100 ml per container, flammable or explosive materials, firearms and ammunition, and oversized sporting equipment. Liquids — including gels, aerosols, creams, and pastes — must each be in containers of 100 ml or less, all placed in a single clear resealable bag of max 1 litre. Items prohibited in checked baggage include lithium batteries over 160 Wh and spare/loose lithium batteries. For a full list and guidance on packing smart, see the links below.",
      lo: "ສິ່ງຂອງຕ້ອງຫ້າມຖືຂຶ້ນເຄື່ອງທີ່ພົບເລື້ອຍລວມມີ: ຂອງມີຄົມ (ມີດ, ກັນໄກທີ່ມີຄວາມຍາວເກີນ 6 ຊມ), ຂອງເຫຼວທີ່ມີຂະໜາດເກີນ 100 ມິນລິລິດ (ml) ຕໍ່ພາຊະນະ, ວັດຖຸໄວໄຟ ຫຼື ລະເບີດ. ສຳລັບຂອງເຫຼວ, ເຈວ, ແລະ ສະເປຣ ຕ້ອງບັນຈຸໃນພາຊະນະບໍ່ເກີນ 100ml ແລະ ລວມກັນໃສ່ໃນຖົງຢາງໃສທີ່ປິດສະໜິດ. ສຳລັບແບັດເຕີຣີລິທຽມສຳຮອງ ແມ່ນຫ້າມຝາກໃຕ້ທ້ອງເຄື່ອງ (ຕ້ອງຖືຂຶ້ນເຄື່ອງເທົ່ານັ້ນ).",
      zh: "常见手提行李禁带物品包括：锋利尖锐物品（刀具、超过 6 厘米的剪刀）、单件容量超过 100 毫升的液体、易燃易爆物质、枪支弹药以及超大运动器材。液体（含凝胶、喷雾、乳霜等）容器必须小于 100 毫升，并统一装入一个容量不超过 1 升的透明密封袋中。备用锂电池及充电宝严禁托运，必须随身携带。完整清单请参阅下方链接。",
    },
    links: [
      {
        label: { en: "Security Guide", lo: "ຄູ່ມືຄວາມປອດໄພ", zh: "安检指南" },
        href: "/guides/security",
      },
      {
        label: {
          en: "Packing Guidelines",
          lo: "ຄຳແນະນຳການຈັດກະເປົາ",
          zh: "行李打包指南",
        },
        href: "/services/packing",
      },
    ],
  },
  {
    id: "c4",
    cat: "checkin",
    q: {
      en: "What should I do if my baggage is lost or damaged?",
      lo: "ຂ້ອຍຄວນເຮັດແນວໃດ ຫາກກະເປົາເສຍ ຫຼື ເສຍຫາຍ?",
      zh: "如果我的行李丢失或损坏该怎么办？",
    },
    a: {
      en: "For lost baggage: do not leave the airport before reporting. Go directly to the Lost & Found desk in the arrivals hall with your boarding pass and baggage claim tag. Staff will file a Property Irregularity Report (PIR) and give you a reference number. Most delayed bags are located within 24–48 hours. For damaged baggage: report at the same desk before exiting the arrivals area — damage reported after leaving may not be accepted. You can also submit and track reports online through our Lost & Found service.",
      lo: "ຫາກກະເປົາເສຍ: ຢ່າຟ້າວອອກຈາກສະໜາມບິນ. ໃຫ້ໄປຕິດຕໍ່ທີ່ເຄົາເຕີ Lost & Found ໃນອາຄານຂາເຂົ້າທັນທີ ພ້ອມບັດຂຶ້ນເຄື່ອງ ແລະ ໃບໝາຍເລກກະເປົາ. ພະນັກງານຈະເຮັດບົດບັນທຶກ (PIR) ແລະ ໃຫ້ເລກອ້າງອີງແກ່ທ່ານ. ສຳລັບກະເປົາເສຍຫາຍ: ຕ້ອງແຈ້ງທີ່ເຄົາເຕີກ່ອນອອກຈາກສະໜາມບິນເທົ່ານັ້ນ, ຫາກແຈ້ງພາຍຫຼັງອອກໄປແລ້ວ ອາດຈະບໍ່ໄດ້ຮັບການພິຈາລະນາ.",
      zh: "行李丢失：请勿在报失前离开机场。请携带登机牌和行李牌前往到达大厅的失物招领台 (Lost & Found)，工作人员将填写财产异常报告 (PIR) 并提供参考编号。行李损坏：请在离开到达区域前向柜台申报，离开机场后的申报可能不被受理。您也可以通过我们的在线服务追踪进度。",
    },
    links: [
      {
        label: {
          en: "Lost & Found Service",
          lo: "ບໍລິການ Lost & Found",
          zh: "失物招领服务",
        },
        href: "/about/lost-found",
      },
    ],
  },

  // ── Security & Immigration ───────────────────────────────────────────────
  {
    id: "s1",
    cat: "security",
    q: {
      en: "What should I prepare for security screening?",
      lo: "ຂ້ອຍຄວນກຽມຕົວແນວໃດສຳລັບການກວດຄວາມປອດໄພ?",
      zh: "安检需要做哪些准备？",
    },
    a: {
      en: "To move through security quickly: (1) Remove laptops and tablets from your bag and place them separately in a tray. (2) Place all liquids, gels, and aerosols (max 100 ml each) in a clear resealable bag and take it out. (3) Remove belts, jackets, and bulky jewellery before the scanner. (4) Empty pockets of coins, keys, and phones. (5) Wear shoes that are easy to remove — officers may ask you to take them off. Passengers with medical devices (pacemakers, implants) should inform staff before screening. Full details are in our Security Guide.",
      lo: "ເພື່ອຄວາມວ່ອງໄວໃນການກວດ: (1) ເອົາຄອມພິວເຕີ Laptop ແລະ Tablet ອອກຈາກກະເປົາວາງໃສ່ຖາດຕ່າງຫາກ. (2) ເອົາຂອງເຫຼວທີ່ບັນຈຸໃນຖົງໃສອອກມາວາງໃຫ້ເຫັນແຈ້ງ. (3) ຖອດສາຍແອວ, ເສື້ອກັນໜາວ ແລະ ເຄື່ອງປະດັບໂລຫະອອກ. (4) ເອົາຫຼຽນ, ກຸນແຈ ແລະ ໂທລະສັບອອກຈາກຖົງເສື້ອ/ຖົງໂສ້ງ. (5) ຜູ້ທີ່ມີອຸປະກອນການແພດໃນຮ່າງກາຍ (ເຊັ່ນ: ເຄື່ອງຊ່ວຍຫົວໃຈ) ຄວນແຈ້ງພະນັກງານກ່ອນການກວດ.",
      zh: "快速过检贴士：(1) 将电脑、平板取出单独放入托盘；(2) 将装有液体的透明袋取出；(3) 摘除皮带、外套及大件金属首饰；(4) 清空口袋内的硬币、钥匙和手机；(5) 穿戴医疗设备（如心脏起搏器）的旅客请在检查前告知安检员。详情请参阅《安检指南》。",
    },
    links: [
      {
        label: { en: "Security Guide", lo: "ຄູ່ມືຄວາມປອດໄພ", zh: "安检指南" },
        href: "/guides/security",
      },
    ],
  },
  {
    id: "s2",
    cat: "security",
    q: {
      en: "What documents do I need for international travel?",
      lo: "ຂ້ອຍຕ້ອງກຽມເອກະສານຫຍັງແດ່ສຳລັບການເດີນທາງສາກົນ?",
      zh: "国际旅行需要哪些证件？",
    },
    a: {
      en: "You need a valid passport with at least 6 months of remaining validity, your return ticket, and a valid visa if required by your destination country. Some destinations may also require health certificates.",
      lo: "ທ່ານຕ້ອງມີ ໜັງສືຜ່ານແດນ (Passport) ທີ່ມີອາຍຸການໃຊ້ງານເຫຼືອຢ່າງໜ້ອຍ 6 ເດືອນ, ປີ້ເຮືອບິນຂາກັບ, ແລະ ວີຊາທີ່ຖືກຕ້ອງ (ຖ້າປະເທດປາຍທາງກຳນົດ). ບາງປະເທດອາດຮຽກຮ້ອງເອກະສານຢັ້ງຢືນສຸຂະພາບເພີ່ມເຕີມ.",
      zh: "您需要持有有效期在 6 个月以上的护照、返程机票以及目的地国家要求的有效签证。部分目的地可能还需要健康证明或疫苗接种证明。",
    },
  },
  {
    id: "s3",
    cat: "security",
    q: {
      en: "How long does immigration and customs take?",
      lo: "ຂັ້ນຕອນກວດຄົນເຂົ້າເມືອງ ແລະ ພາສີ ໃຊ້ເວລານານປານໃດ?",
      zh: "出入境和海关手续需要多长时间？",
    },
    a: {
      en: "Under normal conditions, passport control and customs take about 20–40 minutes in total. During peak periods (public holidays, festival seasons, or when multiple international flights land simultaneously) allow up to 60–75 minutes. Tips to speed things up: have your passport open to the photo page, fill in your arrival card on the plane if provided, and declare any goods over the allowance before joining the queue. A full step-by-step arrival walkthrough is in our Arrivals Guide.",
      lo: "ໃນສະພາບປົກກະຕິ, ຂັ້ນຕອນກວດໜັງສືຜ່ານແດນ ແລະ ພາສີ ຈະໃຊ້ເວລາປະມານ 20–40 ນາທີ. ແຕ່ໃນຊ່ວງເທດສະການ ຫຼື ວັນພັກຍາວ ອາດໃຊ້ເວລາເຖິງ 60–75 ນາທີ. ຄຳແນະນຳ: ຄວນເປີດ Passport ລໍຖ້າໄວ້ທີ່ໜ້າທີ່ມີຮູບຖ່າຍ ແລະ ກຽມແຈ້ງສິ່ງຂອງທີ່ຕ້ອງເສຍພາສີໃຫ້ຮຽບຮ້ອຍກ່ອນເຂົ້າແຖວ.",
      zh: "正常情况下，护照检查和海关手续共需约 20-40 分钟。高峰期（如节假日）请预留 60-75 分钟。加速建议：提前将护照翻开至照片页，在机上填妥入境卡（如有），并提前申报需纳税物品。详见《到达指南》。",
    },
    links: [
      {
        label: { en: "Arrivals Guide", lo: "ຄູ່ມືຂາເຂົ້າ", zh: "到达指南" },
        href: "/guides/arrivals",
      },
    ],
  },
  {
    id: "s4",
    cat: "security",
    q: {
      en: "Are there health screening requirements at the airport?",
      lo: "ສະໜາມບິນມີຂໍ້ກຳນົດກ່ຽວກັບການກວດສຸຂະພາບຫຼືບໍ່?",
      zh: "机场是否有健康检查要求？",
    },
    a: {
      en: "Health screening requirements depend on current public health guidelines and your destination country. Please check the latest travel requirements with your airline and the destination country's embassy before departing.",
      lo: "ຂໍ້ກຳນົດການກວດສຸຂະພາບແມ່ນຂຶ້ນກັບມາດຕະການສາທາລະນະສຸກໃນປັດຈຸບັນ ແລະ ກົດລະບຽບຂອງປະເທດປາຍທາງ. ກະລຸນາກວດສອບຂໍ້ມູນລ່າສຸດກັບສາຍການບິນ ຫຼື ສະຖານທູດກ່ອນການເດີນທາງ.",
      zh: "健康检查要求取决于当前的公共卫生政策和目的地国家的规定。出发前请咨询航空公司或目的地国家驻华使领馆了解最新防疫要求。",
    },
  },

  // ── Services & Facilities ────────────────────────────────────────────────
  {
    id: "sv1",
    cat: "services",
    q: {
      en: "Is there Wi-Fi available at the airport?",
      lo: "ສະໜາມບິນມີ Wi-Fi ໃຫ້ບໍລິການບໍ່?",
      zh: "机场提供免费 Wi-Fi 吗？",
    },
    a: {
      en: "Yes, complimentary Wi-Fi is available throughout the terminal. Connect to the 'BKIA_Free_WiFi' network and complete the simple registration to get online.",
      lo: "ມີ, ພວກເຮົາມີ Wi-Fi ຟຣີໃຫ້ບໍລິການທົ່ວອາຄານຜູ້ໂດຍສານ. ທ່ານສາມາດເຊື່ອມຕໍ່ໄປທີ່ເຄືອຂ່າຍ 'BKIA_Free_WiFi' ແລະ ລົງທະບຽນງ່າຍໆເພື່ອເຂົ້າໃຊ້ງານ.",
      zh: "是的，候机楼全区提供免费 Wi-Fi。请连接“BKIA_Free_WiFi”网络并完成简单注册即可上网。",
    },
  },
  {
    id: "sv2",
    cat: "services",
    q: {
      en: "Are there restaurants and shops at the airport?",
      lo: "ພາຍໃນສະໜາມບິນ ມີຮ້ານອາຫານ ແລະ ຮ້ານຄ້າບໍ່?",
      zh: "机场内有餐厅和商店吗？",
    },
    a: {
      en: "Yes. The terminal has a mix of dining and retail options: local Lao cuisine, international fast food, a duty-free shop (for departing international passengers), a convenience store, a café, and a souvenir shop. Most outlets are airside (after security). The duty-free shop is only accessible to passengers departing on international flights. Operating hours vary — see our Facilities page for the current directory and opening hours.",
      lo: "ມີ, ອາຄານຜູ້ໂດຍສານມີຮ້ານອາຫານລາວ, ອາຫານຈານດ່ວນສາກົນ, ຮ້ານປອດພາສີ (Duty-free), ຮ້ານສະດວກຊື້, ຮ້ານກາເຟ ແລະ ຮ້ານຂາຍຂອງທີ່ລະລຶກ. ສ່ວນຫຼາຍຈະຕັ້ງຢູ່ໃນເຂດຫຼັງກວດຄວາມປອດໄພ (Airside). ທ່ານສາມາດເບິ່ງລາຍຊື່ຮ້ານຄ້າ ແລະ ເວລາເປີດ-ປິດໄດ້ທີ່ໜ້າ 'ສິ່ງອຳນວຍຄວາມສະດວກ'.",
      zh: "是的。候机楼内设有老挝特色餐饮、国际快餐、免税店（仅限国际出发）、便利店、咖啡厅及纪念品店。多数店铺位于安检后的候机区。详情请参阅“机场设施”页面。",
    },
    links: [
      {
        label: {
          en: "Airport Facilities",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "机场设施",
        },
        href: "/services/facilities",
      },
    ],
  },
  {
    id: "sv3",
    cat: "services",
    q: {
      en: "Is there a VIP Lounge available?",
      lo: "ມີຫ້ອງຮັບຮອງ VIP (Lounge) ໃຫ້ບໍລິການບໍ່?",
      zh: "机场是否有贵宾休息室 (VIP Lounge)？",
    },
    a: {
      en: "Yes. The BKIA VIP Lounge is located airside and offers complimentary food and beverages, comfortable seating, high-speed Wi-Fi, printing/scanning facilities, and private shower rooms. Access is included for business class ticket holders on participating airlines, and can also be purchased separately as a day pass. For access enquiries, rates, and opening hours, see our VIP Lounge page.",
      lo: "ມີ, ຫ້ອງຮັບຮອງ VIP ຂອງ BKIA ຕັ້ງຢູ່ໃນເຂດຜູ້ໂດຍສານຂາອອກ ເຊິ່ງມີບໍລິການອາຫານ, ເຄື່ອງດື່ມ, ທີ່ນັ່ງສະດວກສະບາຍ, Wi-Fi ຄວາມໄວສູງ ແລະ ຫ້ອງອາບນ້ຳສ່ວນຕົວ. ຜູ້ໂດຍສານຊັ້ນທຸລະກິດ (Business Class) ສາມາດເຂົ້າໃຊ້ໄດ້ຟຣີ ຫຼື ທ່ານສາມາດຊື້ບັດເຂົ້າໃຊ້ເປັນລາຍຄັ້ງໄດ້.",
      zh: "是的。BKIA 贵宾休息室位于候机区内，提供免费餐饮、舒适座椅、高速 Wi-Fi 及淋浴间。商务舱旅客通常可免费进入，普通旅客亦可购买单次使用券。详情请查看“贵宾休息室”页面。",
    },
    links: [
      {
        label: { en: "VIP Lounge", lo: "ຫ້ອງຮັບຮອງ VIP", zh: "贵宾休息室" },
        href: "/services/vip-lounge",
      },
    ],
  },
  {
    id: "sv4",
    cat: "services",
    q: {
      en: "Where can I find currency exchange?",
      lo: "ຈຸດແລກປ່ຽນເງິນຕາຕັ້ງຢູ່ໃສ?",
      zh: "哪里可以办理货币兑换？",
    },
    a: {
      en: "Currency exchange counters are located in the arrivals hall and near departure gates. We accept USD, EUR, THB, CNY, and other major currencies. ATMs are also available throughout the terminal.",
      lo: "ເຄົາເຕີແລກປ່ຽນເງິນຕາ ຕັ້ງຢູ່ໃນອາຄານຂາເຂົ້າ ແລະ ໃກ້ກັບປະຕູທາງອອກຂາອອກ. ພວກເຮົາຮັບແລກປ່ຽນສະກຸນເງິນຫຼັກເຊັ່ນ: USD, THB, CNY ແລະ EUR. ນອກນັ້ນ ຍັງມີຕູ້ ATM ໃຫ້ບໍລິການທົ່ວອາຄານ.",
      zh: "货币兑换柜台位于到达大厅和出发闸口附近。支持美元、泰铢、人民币、欧元等主要货币。此外，候机大厅遍布多台 ATM 取款机。",
    },
  },

  // ── Transportation ───────────────────────────────────────────────────────
  {
    id: "t1",
    cat: "transport",
    q: {
      en: "How do I get from the airport to the city?",
      lo: "ຂ້ອຍຈະເດີນທາງຈາກສະໜາມບິນເຂົ້າເມືອງໄດ້ແນວໃດ?",
      zh: "如何从机场前往市区？",
    },
    a: {
      en: "The most convenient options are the metered taxis and fixed-price shuttle vans stationed at the arrivals exit. Fixed fares cover three main destinations: Ton Pheung city centre, Golden Triangle Special Economic Zone, and Huay Xai town. Rates are set and posted at the taxi desk — no haggling required. The journey to Ton Pheung centre takes approximately 15–20 minutes under normal traffic. For full fare details and vehicle types, see our Taxi & Shuttle page.",
      lo: "ທ່ານສາມາດໃຊ້ບໍລິການລົດແທັກຊີ ຫຼື ລົດຕູ້ຮັບ-ສົ່ງ ທີ່ຈອດລໍຖ້າຢູ່ທາງອອກອາຄານຂາເຂົ້າ. ມີລາຄາຄົງທີ່ໄປຍັງ 3 ຈຸດຫຼັກ: ຕົວເມືອງຕົ້ນເຜິ້ງ, ເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ ແລະ ເມືອງຫ້ວຍຊາຍ. ລາຄາແມ່ນມີການກຳນົດໄວ້ແລ້ວ ໂດຍບໍ່ຕ້ອງມີການຕໍ່ຮອງ. ການເດີນທາງໄປເມືອງຕົ້ນເຜິ້ງໃຊ້ເວລາປະມານ 15–20 ນາທີ.",
      zh: "最方便的方式是乘坐到达厅出口处的出租车或固定价格接送车。固定票价覆盖：屯丰市中心、金三角特区及会晒。价格透明公示，无需议价。前往屯丰市中心约需 15-20 分钟车程。",
    },
    links: [
      {
        label: {
          en: "Taxi & Shuttle",
          lo: "ລົດແທັກຊີ ແລະ ລົດຮັບ-ສົ່ງ",
          zh: "出租车与接送车",
        },
        href: "/services/taxi",
      },
    ],
  },
  {
    id: "t2",
    cat: "transport",
    q: {
      en: "Is parking available at the airport?",
      lo: "ສະໜາມບິນມີບ່ອນຈອດລົດບໍ່?",
      zh: "机场提供停车位吗？",
    },
    a: {
      en: "Yes. The airport car park is open 24/7, located directly in front of the terminal. It accommodates both private cars and vans/minibuses. Fees are charged per 2-hour block, with a daily cap for longer stays. Payment is accepted in LAK, THB, and CNY. For current rates and a map of the parking zones, see our Parking page.",
      lo: "ມີ, ລານຈອດລົດສະໜາມບິນເປີດໃຫ້ບໍລິການ 24 ຊົ່ວໂມງ ຕັ້ງຢູ່ທາງໜ້າອາຄານຜູ້ໂດຍສານ. ຄິດຄ່າບໍລິການທຸກໆ 2 ຊົ່ວໂມງ ແລະ ມີລາຄາສູງສຸດຕໍ່ວັນສຳລັບການຈອດຂ້າມຄືນ. ທ່ານສາມາດຊຳລະເປັນເງິນກີບ, ເງິນບາດ ຫຼື ເງິນຢວນກໍໄດ້.",
      zh: "是的。机场停车场 24 小时开放，位于候机楼正前方。按 2 小时为单位计费，设有每日封顶价格。接受基普、泰铢和人民币支付。详情见“停车信息”页面。",
    },
    links: [
      {
        label: {
          en: "Parking Info & Map",
          lo: "ຂໍ້ມູນບ່ອນຈອດລົດ",
          zh: "停车信息与地图",
        },
        href: "/services/parking",
      },
    ],
  },
  {
    id: "t3",
    cat: "transport",
    q: {
      en: "Can I pre-book a taxi from the airport?",
      lo: "ຂ້ອຍສາມາດຈອງລົດແທັກຊີລ່ວງໜ້າໄດ້ບໍ່?",
      zh: "我可以提前预订机场出租车吗？",
    },
    a: {
      en: "Yes. You can pre-book a taxi or shuttle van by calling the airport at +856 84 260 179. Provide your flight number and arrival time and a vehicle will be waiting for you at the arrivals exit. Walk-up taxis and vans are also available at the taxi stand outside arrivals without any booking — just approach the desk, choose your destination, and pay the fixed fare. See our Taxi page for vehicle options and all destination fares.",
      lo: "ໄດ້, ທ່ານສາມາດຈອງລົດລ່ວງໜ້າໄດ້ໂດຍການໂທຫາເບີ +856 84 260 179. ພຽງແຕ່ແຈ້ງເລກທ່ຽວບິນ ແລະ ເວລາຮອດ, ລົດຈະໄປລໍຖ້າຮັບທ່ານຢູ່ທາງອອກ. ຫຼື ທ່ານສາມາດຍ່າງໄປຕິດຕໍ່ທີ່ເຄົາເຕີແທັກຊີຢູ່ທາງອອກໄດ້ທັນທີໂດຍບໍ່ຕ້ອງຈອງ.",
      zh: "可以。您可以拨打 +856 84 260 179 预约接机。告知航班号和到达时间，司机将在门口等候。您也可以直接前往出口处的出租车柜台，按公示价格直接付费乘车。",
    },
    links: [
      {
        label: {
          en: "Taxi & Shuttle Fares",
          lo: "ລາຄາລົດຮັບ-ສົ່ງ",
          zh: "出租车资费",
        },
        href: "/services/taxi",
      },
    ],
  },
  {
    id: "t4",
    cat: "transport",
    q: {
      en: "Are there car rental services at the airport?",
      lo: "ມີບໍລິການລົດເຊົ່າຢູ່ສະໜາມບິນບໍ່?",
      zh: "机场有租车服务吗？",
    },
    a: {
      en: "Car rental services are available at the airport. Please enquire at the information desk in the arrivals hall for current providers and rates.",
      lo: "ພວກເຮົາມີບໍລິການລົດເຊົ່າພາຍໃນສະໜາມບິນ. ທ່ານສາມາດສອບຖາມຂໍ້ມູນຜູ້ໃຫ້ບໍລິການ ແລະ ລາຄາໄດ້ທີ່ເຄົາເຕີປະຊາສຳພັນ ໃນອາຄານຂາເຂົ້າ.",
      zh: "机场提供汽车租赁服务。请前往到达大厅的信息咨询台，获取供应商列表及租金报价。",
    },
  },

  // ── Flights (extra) ──────────────────────────────────────────────────────
  {
    id: "f5",
    cat: "flights",
    q: {
      en: "Can I purchase or change flight tickets at the airport?",
      lo: "ຂ້ອຍສາມາດຊື້ ຫຼື ປ່ຽນປີ້ບິນໄດ້ທີ່ສະໜາມບິນບໍ່?",
      zh: "我可以在机场购票或改签航班吗？",
    },
    a: {
      en: "Yes. Each airline at Bokeo Airport has its own ticketing counter inside the terminal, located near the check-in desks. Staff can assist with new bookings, date changes, and route adjustments — subject to availability and the airline's fare conditions. It is generally recommended to book or change tickets in advance online or through the airline's call centre, as same-day changes may incur fees and seat availability may be limited. Visit our Airlines page for each carrier's counter location and hotline.",
      lo: "ໄດ້, ແຕ່ລະສາຍການບິນມີເຄົາເຕີຂາຍປີ້ຢູ່ໃກ້ກັບເຄົາເຕີແຈ້ງປີ້. ພະນັກງານສາມາດຊ່ວຍໃນການຈອງໃໝ່, ປ່ຽນວັນທາງ ຫຼື ປ່ຽນເສັ້ນທາງ ຕາມຄວາມວ່າງ ແລະ ເງື່ອນໄຂຂອງສາຍການບິນ. ໂດຍທົ່ວໄປ ຄວນຈອງ ຫຼື ປ່ຽນປີ້ລ່ວງໜ້າທາງອອນລາຍ ຫຼື ທາງໂທລະສັບ ເພາະອາດມີຄ່າດຳເນີນການ ແລະ ທີ່ນັ່ງຈຳກັດ.",
      zh: "可以。博胶机场每家航空公司均设有独立售票柜台，通常位于值机区附近。工作人员可协助办理新订单、改期及换程手续，但须视座位情况及票价条款而定。建议提前通过官网或热线预订或改签，以避免临场手续费及座位紧张的问题。各航司柜台位置及热线请查阅《航空公司》页面。",
    },
    links: [
      {
        label: {
          en: "View Airlines",
          lo: "ເບິ່ງສາຍການບິນ",
          zh: "查看航空公司",
        },
        href: "/flights/airlines",
      },
    ],
  },
  {
    id: "f6",
    cat: "flights",
    q: {
      en: "What international destinations can I fly to from Bokeo?",
      lo: "ສາມາດບິນໄປຕ່າງປະເທດທີ່ໃດໄດ້ແດ່ຈາກສະໜາມບິນສາກົນບໍ່ແກ້ວ?",
      zh: "从博胶国际机场可以飞往哪些国际目的地？",
    },
    a: {
      en: "Bokeo International Airport operates international routes to destinations in Thailand (including Chiang Rai) and China (including Xishuangbanna / Jinghong). Schedules and available routes may change seasonally, so we recommend checking current timetables on our departures board or confirming directly with Lao Airlines or Lao Skyway. Domestic routes connect Bokeo with Vientiane (Wattay International Airport).",
      lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ ໃຫ້ບໍລິການເສັ້ນທາງສາກົນໄປຍັງ ປະເທດໄທ (ລວມທັງເຊັງລາຍ) ແລະ ສປ ຈີນ (ລວມທັງຊີຊວງກ / ຈິ່ງຮົງ). ຕາຕະລາງການບິນ ອາດມີການປ່ຽນແປງຕາມລະດູການ ດັ່ງນັ້ນ ຂໍແນະນຳໃຫ້ກວດສອບຕາຕະລາງ ຫຼື ຕິດຕໍ່ສາຍການບິນໂດຍກົງ. ສຳລັບເສັ້ນທາງພາຍໃນ ມີທ່ຽວບິນເຊື່ອມຕໍ່ ບໍ່ແກ້ວ — ວຽງຈັນ (ທ່ານຫ້ວຍ / Wattay).",
      zh: "博胶国际机场目前开通至泰国（含清莱）和中国（含西双版纳/景洪）的国际航线。航线及班期可能随季节调整，建议查看我们网站上的最新出发航班时刻表，或直接联系老挝航空或老挝天空航空确认。国内方面，博胶与万象（瓦岱国际机场）之间有直飞航班。",
    },
    links: [
      {
        label: {
          en: "Departures Board",
          lo: "ກະດານທ່ຽວບິນຂາອອກ",
          zh: "出发航班列表",
        },
        href: "/flights/departures",
      },
    ],
  },

  // ── Check-in & Baggage (extra) ───────────────────────────────────────────
  {
    id: "c5",
    cat: "checkin",
    q: {
      en: "Is there a luggage wrapping service at the airport?",
      lo: "ສະໜາມບິນມີບໍລິການຫຸ້ມຫໍ່ກະເປົາບໍ່?",
      zh: "机场是否提供行李裹膜服务？",
    },
    a: {
      en: "Yes. BKIA operates a professional luggage wrapping (stretch-film) service in the Domestic Terminal, located to the left of Departure Gate 04 or directly in front of the Domestic Arrivals entrance. Wrapping protects your bags against scratches, moisture, and tampering. Three sizes are available — small, medium, and large — to suit carry-on bags, standard checked luggage, and oversized items. Pricing starts at 15,000 LAK per item. See the Packing Service page for full rates, prohibited items, and operating hours.",
      lo: "ມີ, BKIA ມີບໍລິການຫຸ້ມຫໍ່ກະເປົາດ້ວຍຟິມ (Stretch Film) ຢູ່ອາຄານຜູ້ໂດຍສານພາຍໃນ ທາງດ້ານຊ້າຍຂອງປະຕູທາງອອກ 04 ຫຼື ທາງໜ້າຂາເຂົ້າພາຍໃນ. ການຫຸ້ມຫໍ່ຊ່ວຍປ້ອງກັນຮອຍຂີດຂ່ວນ, ຄວາມຊຸ່ມ ແລະ ການງັດແງະ. ມີ 3 ຂະໜາດ: ນ້ອຍ, ກາງ ແລະ ໃຫຍ່. ລາຄາເລີ່ມຕົ້ນ 15,000 ກີບ ຕໍ່ຊິ້ນ.",
      zh: "是的。BKIA 在国内航站楼提供专业行李裹膜服务，位于04号出发门左侧或国内到达入口正前方。裹膜可有效防止行李划伤、受潮和被擅自开包。提供小、中、大三种规格，分别适用于登机行李、标准托运箱及超大物品。价格从每件 15,000 基普起。完整收费标准及禁止物品清单请查阅《行李裹膜服务》页面。",
    },
    links: [
      {
        label: {
          en: "Packing Service",
          lo: "ບໍລິການຫຸ້ມຫໍ່ກະເປົາ",
          zh: "行李裹膜服务",
        },
        href: "/services/packing",
      },
    ],
  },
  {
    id: "c6",
    cat: "checkin",
    q: {
      en: "Can I bring food or fresh produce in my baggage?",
      lo: "ຂ້ອຍສາມາດນຳອາຫານ ຫຼື ຜະລິດຕະຜົນທາງກະສິກຳໃສ່ໃນກະເປົາໄດ້ບໍ່?",
      zh: "我可以在行李中携带食品或农产品吗？",
    },
    a: {
      en: "Rules vary by destination. For domestic flights within Laos, most packaged food is generally permitted, but perishables should be well-sealed. For international flights, many countries — including Thailand and China — have strict phytosanitary rules that prohibit or restrict fresh fruits, vegetables, meat, and certain seeds. Durian and other strong-smelling foods may be refused by some airlines regardless of destination. Always check the specific import rules of your destination country and your airline's policy before packing.",
      lo: "ຂໍ້ກຳນົດຂຶ້ນກັບຈຸດໝາຍປາຍທາງ. ສຳລັບທ່ຽວບິນພາຍໃນ ອາຫານທີ່ຫຸ້ມຫໍ່ດີໂດຍທົ່ວໄປຮັບໄດ້ ແຕ່ຂອງທີ່ເສຍໄດ້ງ່າຍຄວນຊຳລາດ. ສຳລັບຂາອອກສາກົນ ຫຼາຍປະເທດ (ລວມທັງໄທ ແລະ ຈີນ) ມີກົດລະບຽບຫ້າມ ຫຼື ຈຳກັດຜັກ, ໝາກໄມ້ສົດ, ຊີ້ນ ແລະ ເມັດພັນ. ທຸລຽນ ແລະ ອາຫານທີ່ມີກິ່ນໜັກ ອາດຖືກຫ້າມໂດຍບາງສາຍການບິນ. ກະລຸນາກວດສອບກົດໝາຍຂອງປະເທດປາຍທາງ ແລະ ນະໂຍບາຍຂອງສາຍການບິນກ່ອນ.",
      zh: "规定因目的地而异。老挝国内航班对密封包装的食品一般无严格限制，但易腐烂物品应妥善密封。国际航班方面，泰国、中国等许多国家对新鲜水果、蔬菜、肉类和种子进口有严格的植物检疫规定。榴莲等气味浓烈的食物在部分航司无论目的地均可能不允许携带或托运。出行前请务必核查目的地国家的进口规定及所乘航空公司政策。",
    },
    links: [
      {
        label: {
          en: "Packing & Prohibited Items",
          lo: "ຂໍ້ຫ້າມການຈັດກະເປົາ",
          zh: "行李打包与禁带物品",
        },
        href: "/services/packing",
      },
    ],
  },
  {
    id: "c7",
    cat: "checkin",
    q: {
      en: "Is there a left-luggage or baggage storage facility at the airport?",
      lo: "ສະໜາມບິນ ມີບໍລິການຝາກກະເປົາຊົ່ວຄາວບໍ່?",
      zh: "机场是否提供临时行李寄存服务？",
    },
    a: {
      en: "Short-term luggage storage is available at the airport. Please enquire at the information desk in the arrivals hall for current availability, rates, and operating hours. We recommend keeping your claim receipt safe and storing any valuables separately. Stored items will not be accessible outside operating hours.",
      lo: "ພວກເຮົາມີບໍລິການຝາກກະເປົາຊົ່ວຄາວ. ທ່ານສາມາດສອບຖາມລາຄາ ແລະ ເວລາໃຫ້ບໍລິການໄດ້ທີ່ເຄົາເຕີປະຊາສຳພັນ ໃນອາຄານຂາເຂົ້າ. ຂໍໃຫ້ຮັກສາໃບຮັບຮອງໄວ້ ແລະ ຈັດແຍກຂອງມີຄ່າໄວ້ຕ່າງຫາກ. ຫຼັງເວລາໃຫ້ບໍລິການ ຈະບໍ່ສາມາດເຂົ້າເອົາກະເປົາໄດ້.",
      zh: "机场提供短期行李临时寄存服务。具体费用和开放时间请前往到达大厅信息台咨询。请妥善保管取件凭证，贵重物品建议另行保管。营业时间结束后，寄存行李无法提取。",
    },
  },

  // ── Security & Immigration (extra) ──────────────────────────────────────
  {
    id: "s5",
    cat: "security",
    q: {
      en: "Do I need a visa to enter Laos?",
      lo: "ຂ້ອຍຕ້ອງການວີຊາໃນການເຂົ້າ ສປປ ລາວ ບໍ?",
      zh: "入境老挝是否需要签证？",
    },
    a: {
      en: "Visa requirements depend on your nationality. Citizens of ASEAN countries and several others can enter Laos visa-free for stays of 14 to 30 days. Most other nationalities can obtain a Visa on Arrival (VOA) at international airports and land border crossings — a passport photo, completed application form, and fee of approximately USD 30–50 are typically required. Some nationalities must apply in advance at a Lao embassy or consulate. Requirements change regularly, so please verify current rules with the Lao Department of Immigration or your nearest Lao embassy before travel.",
      lo: "ຂໍ້ກຳນົດວີຊາຂຶ້ນກັບສັນຊາດຂອງທ່ານ. ພົນລະເມືອງ ອາຊຽນ ແລະ ອີກຫຼາຍສັນຊາດ ສາມາດເຂົ້າໄດ້ໂດຍບໍ່ຕ້ອງຂໍວີຊາ ສຳລັບ 14–30 ວັນ. ສ່ວນໃຫຍ່ຂອງສັນຊາດອື່ນ ສາມາດຂໍວີຊາທີ່ດ່ານ (VOA) ໄດ້ ໂດຍໃຊ້ຮູບຖ່າຍ, ແບບຟອມ ແລະ ຄ່າທຳນຽມ USD 30–50. ຂໍ້ກຳນົດ ອາດມີການປ່ຽນແປງ ກະລຸນາກວດສອບຂໍ້ມູນລ່າສຸດຈາກສະຖານທູດ ຫຼື ກົມກວດຄົນເຂົ້າເມືອງ ກ່ອນການເດີນທາງ.",
      zh: "入境要求因国籍而异。东盟国家公民及部分其他国家公民可免签入境老挝，停留 14 至 30 天。大多数其他国籍旅客可在国际机场或陆路口岸办理落地签（VOA），通常需提供护照照片、填写申请表格并支付约 USD 30–50 签证费。少数国籍须提前向老挝驻外使馆/领馆申请签证。签证政策不定期调整，出行前请向最近的老挝使馆或老挝移民局核实最新要求。",
    },
  },
  {
    id: "s6",
    cat: "security",
    q: {
      en: "How much cash can I bring into or out of Laos?",
      lo: "ຂ້ອຍສາມາດນຳເງິນສົດເຂົ້າ ຫຼື ອອກ ສປປ ລາວ ໄດ້ຫຼາຍເທົ່າໃດ?",
      zh: "进出老挝时可以携带多少现金？",
    },
    a: {
      en: "Travellers entering Laos may bring in any amount of foreign currency, but amounts exceeding USD 10,000 (or equivalent) must be declared at customs. When leaving Laos, you may take out foreign currency up to the amount declared on entry, plus up to USD 2,000 in undeclared funds. Lao Kip (LAK) cannot be exported out of the country. Failure to declare excess amounts may result in confiscation. Currency exchange counters and ATMs are available inside the airport for your convenience.",
      lo: "ຜູ້ເດີນທາງສາມາດນຳເງິນຕ່າງປະເທດເຂົ້າ ສປປ ລາວ ໄດ້ທຸກຈຳນວນ ແຕ່ຈຳນວນທີ່ເກີນ USD 10,000 (ຫຼື ເທົ່າຄ່າ) ຕ້ອງແຈ້ງທີ່ພາສີ. ເມື່ອອອກຈາກ ສປປ ລາວ ທ່ານສາມາດນຳເງິນຕ່າງປະເທດໄດ້ຈຳນວນທີ່ໄດ້ແຈ້ງໄວ້ຕອນເຂົ້າ ບວກໃສ່ USD 2,000 ທີ່ບໍ່ຕ້ອງແຈ້ງ. ເງິນກີບ ຫ້າມນຳອອກຈາກ ສປປ ລາວ. ບໍ່ແຈ້ງຈຳນວນທີ່ເກີນ ອາດຖືກຢຶດ. ສະໜາມບິນມີເຄົາເຕີແລກເງິນ ແລະ ຕູ້ ATM ໃຫ້ບໍລິການ.",
      zh: "旅客入境老挝时可携带任意金额外币，但超过 10,000 美元（或等值）须在海关申报。离境时可携带与入境申报金额相当的外汇，另可额外携带不超过 2,000 美元无需申报。老挝基普不得带出境。未申报超额现金可能被没收。机场内设有货币兑换柜台和 ATM 机，方便您兑换所需货币。",
    },
  },
  {
    id: "s7",
    cat: "security",
    q: {
      en: "Can I bring prescription medication on the plane?",
      lo: "ຂ້ອຍສາມາດນຳຢາທາງການແພດ (ຢາທີ່ຕ້ອງການໃບສັ່ງແພດ) ຂຶ້ນເຄື່ອງໄດ້ບໍ?",
      zh: "我可以随身携带处方药上飞机吗？",
    },
    a: {
      en: "Generally, yes — prescription medication is permitted in both carry-on and checked baggage. To avoid delays during security or customs: (1) Keep medication in its original labelled packaging, (2) Carry a copy of your prescription or a doctor's letter, especially for controlled substances, (3) Liquid medication over 100 ml may be allowed as a medical exception — declare it separately at security and have your documentation ready. Some countries restrict the import of certain controlled substances, so always check your destination country's pharmaceutical regulations before travel.",
      lo: "ໂດຍທົ່ວໄປ ຮອງຮັບ — ຢາທີ່ໄດ້ຮັບໃບສັ່ງແພດ ສາມາດນຳໄດ້ທັງໃນກະເປົາຖືຂຶ້ນ ແລະ ກະເປົາຝາກ. ເພື່ອໃຫ້ຜ່ານການກວດໂດຍວ່ອງໄວ: (1) ເກັບຢາໄວ້ໃນກ່ອງທີ່ຕິດລາຍຊື່ຕົວຢ່າງ, (2) ຖືໃບສັ່ງຢາ ຫຼື ໜັງສືຈາກແພດ (ໂດຍສະເພາະສຳລັບຢາຄຸ້ມຄອງ), (3) ຢາໃນຮູບແຫຼວທີ່ເກີນ 100ml ອາດຍົກເວັ້ນໄດ້ຫາກມີໃບຢັ້ງຢືນ. ກວດສອບຂໍ້ກຳນົດການນຳເຂົ້າຢາຂອງປະເທດປາຍທາງກ່ອນເດີນທາງ.",
      zh: "通常允许——处方药可放在随身行李或托运行李中携带。建议：(1) 将药品保存在原始带标签的包装中；(2) 携带处方复印件或医生证明信（尤其是管制药品）；(3) 超过 100 毫升的液体药品如属医疗必需，可申请豁免，请在安检时单独申报并备好证明文件。部分国家对某些管制药品的进口有严格限制，出行前请核实目的地国家相关法规。",
    },
  },

  // ── Services & Facilities (extra) ────────────────────────────────────────
  {
    id: "sv5",
    cat: "services",
    q: {
      en: "Are there prayer rooms at the airport?",
      lo: "ສະໜາມບິນ ມີຫ້ອງຈະເລີນສາດສະໜາ / ໄຫວ້ພຣະ ບໍ?",
      zh: "机场是否设有祈祷室？",
    },
    a: {
      en: "Yes. The terminal has two prayer facilities: a Buddhist prayer room for passengers who wish to make offerings or meditate before their journey, and a dedicated Muslim prayer room (Musallah) for Islamic worship. Both are clean, quiet spaces open to all passengers during terminal operating hours. See our Facilities page for exact locations.",
      lo: "ມີ, ອາຄານຜູ້ໂດຍສານມີ 2 ຫ້ອງ: ຫ້ອງກາບໄຫວ້ພຣະ (ສຳລັບສາດສະໜາພຸດ) ເຊິ່ງເປີດໃຫ້ຜູ້ໂດຍສານຂໍພອນກ່ອນການເດີນທາງ, ແລະ ຫ້ອງລະມາດ (ສຳລັບສາດສະໜາອິດສະລາມ). ທັງສອງຫ້ອງ ສະອາດ, ສະຫງົບ ແລະ ເປີດຕະຫຼອດເວລາທຳການ.",
      zh: "是的。候机楼内设有两处礼拜场所：一处供佛教旅客礼拜或冥想的祈祷室，以及一处专为穆斯林旅客礼拜使用的礼拜堂（Musallah）。两处均干净整洁、环境安静，在候机楼运营时间内对所有旅客开放。具体位置请参阅《机场设施》页面。",
    },
    links: [
      {
        label: {
          en: "Airport Facilities",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "机场设施",
        },
        href: "/services/facilities",
      },
    ],
  },
  {
    id: "sv6",
    cat: "services",
    q: {
      en: "Are there baby-changing or nursing facilities for families?",
      lo: "ສະໜາມບິນ ມີຫ້ອງລ້ຽງເດັກ / ໃຫ້ນົມລູກ ສຳລັບຄອບຄົວ ບໍ?",
      zh: "机场是否有婴儿护理或哺乳设施？",
    },
    a: {
      en: "Yes. BKIA has a dedicated Mother & Child Room equipped with a comfortable nursing area, baby-changing table, and a private space for mothers to care for infants. It is located on the 2nd floor of the International Departure area. Baby-changing stations are also available in family restroom facilities throughout the terminal. For the full list of family-friendly amenities, see our Facilities page.",
      lo: "ມີ, ສະໜາມບິນ BKIA ມີຫ້ອງລ້ຽງເດັກ (Mother & Child Room) ທີ່ພ້ອມດ້ວຍພື້ນທີ່ໃຫ້ນົມ, ໂຕ່ປ່ຽນຜ້າອ້ອມ ແລະ ພື້ນທີ່ສ່ວນຕົວ ສຳລັບແມ່ ແລະ ລູກນ້ອຍ. ຕັ້ງຢູ່ຊັ້ນ 2 ໃນສ່ວນຂາອອກສາກົນ. ນອກຈາກນັ້ນ ຍັງມີໂຕ່ປ່ຽນຜ້າອ້ອມໃນຫ້ອງນ້ຳຄອບຄົວທົ່ວອາຄານ.",
      zh: "是的。BKIA 设有专用母婴室，配备舒适哺乳区、婴儿换尿布台及私密育儿空间，位于国际出发区 2 楼。候机楼各处的家庭卫生间内也设有婴儿护理台。更多亲子设施信息请参阅《机场设施》页面。",
    },
    links: [
      {
        label: {
          en: "Airport Facilities",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "机场设施",
        },
        href: "/services/facilities",
      },
    ],
  },
  {
    id: "sv7",
    cat: "services",
    q: {
      en: "Is wheelchair or special assistance available at the airport?",
      lo: "ສະໜາມບິນ ມີບໍລິການຊ່ວຍເຫຼືອ ສຳລັບຜູ້ໂດຍສານທີ່ຕ້ອງການຄວາມຊ່ວຍເຫຼືອພິເສດ ບໍ?",
      zh: "机场是否提供轮椅或特殊旅客协助服务？",
    },
    a: {
      en: "Yes. Our Special Services desk provides dedicated assistance for passengers with mobility impairments, including wheelchair provision and escort through check-in, security, and boarding. We also assist unaccompanied minors and passengers requiring special care. To ensure availability, please notify your airline at the time of booking — most carriers require at least 48 hours advance notice for special assistance. Our Special Services desk is in the Check-in Area of Terminal 1. You can also call us at +856 84 260 179 to arrange assistance in advance.",
      lo: "ມີ, ຈຸດບໍລິການພິເສດຂອງພວກເຮົາ ໃຫ້ຄວາມຊ່ວຍເຫຼືອ ສຳລັບຜູ້ໂດຍສານທີ່ມີຄວາມຜິດປົກກະຕິທາງການເຄື່ອນໄຫວ ລວມທັງລົດຂີ້ເຂ່ ແລະ ການຊ່ວຍນຳທາງຕະຫຼອດຂັ້ນຕອນ. ຍັງມີບໍລິການ ສຳລັບເດັກນ້ອຍທີ່ເດີນທາງດ້ວຍຕົນເອງ ແລະ ຜູ້ທີ່ຕ້ອງການດູແລພິເສດ. ກະລຸນາແຈ້ງສາຍການບິນລ່ວງໜ້າ ຢ່າງໜ້ອຍ 48 ຊົ່ວໂມງ ຫຼື ໂທ +856 84 260 179 ເພື່ອນັດໝາຍ.",
      zh: "是的。我们的特殊服务台为行动不便的旅客提供专属协助，包括提供轮椅及全程陪同办理值机、安检和登机。我们同时为无成人陪伴儿童及需要特别照护的旅客提供支持。请在订票时提前告知您的航空公司——大多数航司要求至少提前 48 小时申请特殊协助。特殊服务台位于 1 号航站楼值机区。您也可拨打 +856 84 260 179 提前预约。",
    },
    links: [
      {
        label: { en: "Contact Us", lo: "ຕິດຕໍ່ພວກເຮົາ", zh: "联系我们" },
        href: "/about/contact",
      },
    ],
  },

  // ── Transportation (extra) ───────────────────────────────────────────────
  {
    id: "t5",
    cat: "transport",
    q: {
      en: "How long is the journey from the airport to the Golden Triangle SEZ?",
      lo: "ໃຊ້ເວລາດົນປານໃດ ໃນການເດີນທາງຈາກສະໜາມບິນ ໄປເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ?",
      zh: "从机场到金三角特区需要多长时间？",
    },
    a: {
      en: "The Golden Triangle Special Economic Zone (SEZ) is approximately 8–12 km from the airport, depending on the entrance you are heading to. Under normal road conditions, the journey takes 15–25 minutes by taxi. The fixed taxi fare is 250,000 LAK or 85 CNY. Enquire at the taxi counter (Exit 04, Domestic Terminal) for up-to-date journey information.",
      lo: "ເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ ຕັ້ງຢູ່ຫ່າງຈາກສະໜາມບິນປະມານ 8–12 ກິໂລ ຕາມຈຸດທາງເຂົ້າ, ໃຊ້ເວລາເດີນທາງປະມານ 15–25 ນາທີ ໂດຍລົດ. ລາຄາຄົງທີ່ຈາກສະໜາມບິນ ແມ່ນ 250,000 ກີບ ຫຼື 85 ຫຍວນ. ສອບຖາມຢູ່ເຄົາເຕີລົດແທັກຊີ ປະຕູທາງອອກ 04.",
      zh: "金三角特区距机场约 8-12 公里（视入口而定），正常道路情况下出租车约需 15-25 分钟。从机场至金三角特区的固定票价为 250,000 基普或 85 元人民币。详情可在 04 号出口（国内航站楼）出租车服务台咨询。",
    },
    links: [
      {
        label: {
          en: "Taxi & Shuttle Fares",
          lo: "ລາຄາລົດຮັບ-ສົ່ງ",
          zh: "出租车资费",
        },
        href: "/services/taxi",
      },
    ],
  },
  {
    id: "t6",
    cat: "transport",
    q: {
      en: "How do I travel from the airport to Huay Xai and the Thai border?",
      lo: "ຂ້ອຍຈະເດີນທາງຈາກສະໜາມບິນ ໄປຫ້ວຍຊາຍ ແລະ ດ່ານຊາຍແດນໄທ ໄດ້ແນວໃດ?",
      zh: "如何从机场前往会晒及泰老口岸？",
    },
    a: {
      en: "Huay Xai is the provincial capital of Bokeo and the main crossing point between Laos and Thailand via the 4th Thai-Lao Friendship Bridge (connecting to Chiang Khong, Thailand). From the airport, take a fixed-price taxi directly to Huay Xai — the journey takes approximately 45–60 minutes and the fixed fare is 750,000 LAK or 250 CNY. At the bridge, tuk-tuks and songthaews are available for the short crossing into Chiang Khong. Slow boats down the Mekong to Luang Prabang also depart from the Huay Xai boat landing.",
      lo: "ຫ້ວຍຊາຍ ແມ່ນສູນກາງແຂວງບໍ່ແກ້ວ ແລະ ເປັນຈຸດຂ້າມດ່ານຫຼັກລາວ-ໄທ ຜ່ານສະພານມິດຕະພາບລາວ-ໄທ ສາຍທີ 4 (ເຊຍງຂອງ, ໄທ). ຈາກສະໜາມບິນ ທ່ານສາມາດໃຊ້ລົດແທັກຊີລາຄາຄົງທີ່ ໃຊ້ເວລາປະມານ 45–60 ນາທີ, ລາຄາ 750,000 ກີບ ຫຼື 250 ຫຍວນ. ທີ່ສະພານ ມີລົດຊ່ວຍສຳລັບການຂ້າມດ່ານ. ນອກຈາກນັ້ນ ຍັງມີເຮືອລ່ອງຊ້ານ ຈາກທ່າເຮືອຫ້ວຍຊາຍ ໄປຫຼວງພະບາງ.",
      zh: "会晒是博胶省省会，也是经第 4 泰老友谊大桥连接泰国清孔的主要口岸。从机场乘出租车直达会晒约需 45-60 分钟，固定票价为 750,000 基普或 250 元人民币。到达大桥后，可乘三轮车或双条车跨桥前往泰国清孔。会晒码头亦有开往琅勃拉邦的湄公河慢船服务。",
    },
    links: [
      {
        label: {
          en: "Taxi & Shuttle Fares",
          lo: "ລາຄາລົດຮັບ-ສົ່ງ",
          zh: "出租车资费",
        },
        href: "/services/taxi",
      },
    ],
  },
];
