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
    lo: "ຖ້ຽວບິນ",
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
  {
    id: "f1",
    cat: "flights",
    q: {
      en: "What airlines operate at Bokeo International Airport?",
      lo: "ສາຍການບິນໃດແດ່ທີ່ເປີດໃຫ້ບໍລິການຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ?",
      zh: "哪些航空公司在博胶国际机场运营？",
    },
    a: {
      en: "Bokeo International Airport is currently served by Lao Airlines, Lao Skyway, and Lanexang Airways International. These airlines operate domestic routes to Vientiane and international routes to destinations in Thailand and China. You can stay updated on new flight routes and future news by following our official channels.",
      lo: "ປັດຈຸບັນ ສະໜາມບິນສາກົນບໍ່ແກ້ວ ແມ່ນໃຫ້ບໍລິການໂດຍ ສາຍການບິນລາວ (Lao Airlines), ລາວເດີນອາກາດ (Lao Skyway) ແລະ ສາຍການບິນລ້ານຊ້າງສາກົນ (Lanexang Airways International). ທ່ານສາມາດຕິດຕາມຂໍ້ມູນຂ່າວສານ ແລະ ການອັບເດດເສັ້ນທາງບິນໃໝ່ໆ ໄດ້ຜ່ານຊ່ອງທາງປະກາດຂ່າວຂອງພວກເຮົາໃນອະນາຄົດ.",
      zh: "博胶国际机场目前由老挝航空 (Lao Airlines)、老挝天空航空 (Lao Skyway) 和 澜沧航空 (Lanexang Airways International) 提供服务。航线涵盖往返万象的国内航班以及前往泰国和中国的国际航班。您可以关注我们的官方渠道，获取未来航线及最新资讯。",
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
      lo: "ຂ້ອຍສາມາດກວດສອບສະຖານະຖ້ຽວບິນໄດ້ແນວໃດ?",
      zh: "如何查询我的航班状态？",
    },
    a: {
      en: "Real-time flight information is displayed on screens throughout the terminal building. You can also check live updates for departures and arrivals, including gate assignments and baggage belt numbers, directly via the airport's official website.",
      lo: "ຫາກທ່ານຢູ່ອາຄານຜູ້ໂດຍສານ ຈະມີຈໍສະແດງຖ້ຽວບິນ (FIDS) ຕິດຕັ້ງໄວ້ທົ່ວອາຄານເພື່ອໃຫ້ຂໍ້ມູນແບບ Real-time. ນອກຈາກນີ້, ທ່ານຍັງສາມາດກວດສອບສະຖານະການບິນຂາເຂົ້າ-ຂາອອກ ຜ່ານທາງເວັບໄຊຂອງສະໜາມບິນໄດ້ເຊັ່ນກັນ.",
      zh: "航站楼内各处均设有航班信息显示屏。您也可以通过机场官方网站实时查询航班动态，包括起降时间、登机口位置及行李转盘编号。",
    },
    links: [
      {
        label: {
          en: "Departures Board",
          lo: "ກະດານຖ້ຽວບິນຂາອອກ",
          zh: "出发航班列表",
        },
        href: "/flights/departures",
      },
      {
        label: {
          en: "Arrivals Board",
          lo: "ກະດານຖ້ຽວບິນຂາເຂົ້າ",
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
      lo: "ຂ້ອຍຄວນເຮັດແນວໃດ ຫາກຖ້ຽວບິນຊັກຊ້າ ຫຼື ຖືກຍົກເລີກ?",
      zh: "如果我的航班延误或取消，我该怎么办？",
    },
    a: {
      en: "Contact your airline directly for rebooking and compensation options. Our information desk can help you locate your airline's service counter inside the terminal.",
      lo: "ກະລຸນາຕິດຕໍ່ສາຍການບິນຂອງທ່ານໂດຍກົງ ເພື່ອຂໍປ່ຽນຖ້ຽວບິນ ຫຼື ສອບຖາມກ່ຽວກັບການຊົດເຊີຍ. ເຄົາເຕີປະຊາສຳພັນຂອງພວກເຮົາ ສາມາດຊ່ວຍແນະນຳຈຸດບໍລິການຂອງສາຍການບິນຕ່າງໆ ພາຍໃນອາຄານຜູ້ໂດຍສານໃຫ້ທ່ານໄດ້.",
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
      lo: "ພວກເຮົາແນະນຳໃຫ້ມາຮອດສະໜາມບິນຢ່າງໜ້ອຍ 2 ຊົ່ວໂມງ ສຳລັບຖ້ຽວບິນພາຍໃນ ແລະ 3 ຊົ່ວໂມງ ສຳລັບຖ້ຽວບິນສາກົນ ເພື່ອໃຫ້ມີເວລາພຽງພໍໃນການຈອດລົດ, ແຈ້ງປີ້, ຝາກກະເປົາ, ກວດຄວາມປອດໄພ ແລະ ຂັ້ນຕອນກວດຄົນເຂົ້າເມືອງ (ສຳລັບຂາອອກສາກົນ). ໃນຊ່ວງເທດສະການທີ່ມີຄົນເດີນທາງຫຼາຍ ຄວນເພີ່ມເວລາອີກ 30–45 ນາທີ.",
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
      en: "Check-in typically opens 2 hours before departure. It closes 30 minutes before departure for domestic flights and 45 minutes before for international flights. Times may vary by airline, so please confirm with your carrier.",
      lo: "ໂດຍທົ່ວໄປ ການແຈ້ງປີ້ຈະເປີດ 2 ຊົ່ວໂມງກ່ອນເວລາບິນ ແລະ ຈະປິດກ່ອນເວລາບິນ 30 ນາທີ ສຳລັບຖ້ຽວບິນພາຍໃນ ແລະ 45 ນາທີ ສຳລັບຖ້ຽວບິນສາກົນ. ທັງນີ້ ເວລາອາດມີການປ່ຽນແປງຕາມແຕ່ລະສາຍການບິນ.",
      zh: "值机通常在起飞前 2 小时开放。国内航班通常在起飞前 30 分钟关闭，国际航班在起飞前 45 分钟关闭。具体时间因航空公司而异，请务必向您的航司确认。",
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
      lo: "ນ້ຳໜັກກະເປົາທີ່ອະນຸຍາດແມ່ນຂຶ້ນກັບສາຍການບິນ ແລະ ຊັ້ນຂອງປີ້ເຮືອບິນ ໂດຍທົ່ວໄປ ຊັ້ນປະຢັດ (Economy) ຈະອະນຸຍາດໃຫ້ຝາກກະເປົາໄດ້ 20–23 ກິໂລ ແລະ ຖືຂຶ້ນເຄື່ອງໄດ້ 7 ກິໂລ. ກະລຸນາກວດສອບເງື່ອນໄຂໃນປີ້ບິນຂອງທ່ານຄືນອີກຄັ້ງ.",
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
      lo: "ສິ່ງຂອງຕ້ອງຫ້າມຖືຂຶ້ນເຄື່ອງທີ່ພົບເລື້ອຍລວມມີ: ຂອງມີຄົມ (ມີດ, ມີດຕັດທີ່ມີຄວາມຍາວເກີນ 6 ຊມ), ຂອງແຫຼວທີ່ມີຂະໜາດເກີນ 100 ມິນລິລິດ (ml) ຕໍ່ພາຊະນະ, ວັດຖຸໄວໄຟ ຫຼື ລະເບີດ. ສຳລັບຂອງເຫຼວ, ເຈວ, ແລະ ສະເປຣ ຕ້ອງບັນຈຸໃນພາຊະນະບໍ່ເກີນ 100ml ແລະ ລວມກັນໃສ່ໃນຖົງຢາງໃສທີ່ປິດສະໜິດ. ສຳລັບແບັດເຕີຣີລິທຽມສຳຮອງ ແມ່ນຫ້າມຝາກໃຕ້ທ້ອງເຮືອບິນ (ຕ້ອງຖືຂຶ້ນເຮືອບິນເທົ່ານັ້ນ).",
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
      en: "If your baggage is lost or damaged, please inform airport staff immediately. Do not leave the airport before reporting the issue. Please present your boarding pass and baggage claim tag to the staff in the arrivals hall so they can file a report and assist you before you exit the terminal.",
      lo: "ຫາກກະເປົາເສຍ ຫຼື ເສຍຫາຍ: ໃຫ້ຮີບແຈ້ງຕໍ່ພະນັກງານສະໜາມບິນທັນທີ ແລະ ຫ້າມອອກຈາກສະໜາມບິນກ່ອນການແຈ້ງຄວາມເສຍຫາຍຕໍ່ພະນັກງານ ກະລຸນານຳປີ້ເຮືອບິນ ແລະ ໃບໝາຍເລກຮັບກະເປົາ ໄປແຈ້ງຕໍ່ພະນັກງານໃນອາຄານຂາເຂົ້າ ເພື່ອໃຫ້ພະນັກງານອອກໃບບັນທຶກການເສຍຫາຍໃຫ້ກ່ອນທີ່ທ່ານຈະເດີນທາງອອກຈາກສະໜາມບິນ.",
      zh: "如果您的行李丢失或损坏：请立即告知机场工作人员，切勿在申报前离开机场。请向到达大厅的工作人员出示您的登机牌和行李票，以便他们在您离开前为您办理登记并提供协助。",
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
  /* {
    id: "s1",
    cat: "security",
    q: {
      en: "What should I prepare for security screening?",
      lo: "ຂ້ອຍຕ້ອງກຽມຕົວແນວໃດ ກ່ອນຈະຜ່ານຈຸດກວດຄົ້ນຕົວຜູ້ໂດຍສານ?",
      zh: "通过安检前我需要做哪些准备？",
    },
    a: {
      en: "To speed up the screening process: (1) Remove electronic devices such as laptops, tablets, and phones from your bag and place them in a tray. (2) Place liquid containers kept in a clear ziplock bag into the tray. (3) Remove belts, jackets, and metal items like watches, keys, coins, and phones from your pockets. (4) Passengers with medical devices in their bodies (e.g., pacemakers) should inform the staff before the screening starts.",
      lo: "ເພື່ອຄວາມວ່ອງໄວໃນການກວດຄົ້ນ: (1) ເອົາອຸປະກອນເອເລັກໂຕຣນິກ ເຊັ່ນ: ຄອມພິວເຕີ Laptop, Tablet ແລະ ໂທລະສັບອອກຈາກກະເປົາວາງໃສ່ຖາດ. (2) ເອົາຂອງເຫຼວທີ່ບັນຈຸໃນຖົງພຣາສຕິກໃສ່ (Ziplock) ອອກມາວາງໃສ່ຖາດ. (3) ຖອດສາຍແອວ, ເສື້ອກັນໜາວ ແລະ ສິ່ງຂອງທີ່ເປັນໂລຫະເຊັ່ນ: ໂມງ, ກະແຈ, ຫຼຽນ ແລະ ໂທລະສັບອອກຈາກຖົງເສື້ອ/ຖົງໂສ້ງ. (4) ຜູ້ທີ່ມີອຸປະກອນການແພດໃນຮ່າງກາຍ (ເຊັ່ນ: ເຄື່ອງຊ່ວຍກະຕຸ້ນຫົວໃຈ) ຄວນແຈ້ງພະນັກງານກ່ອນການກວດຄົ້ນ.",
      zh: "为确保快速通过安检：(1) 请将笔记本电脑、平板电脑及手机等电子设备从包内取出并放入托盘；(2) 将装在透明密封袋（Ziplock）中的液体取出放入托盘；(3) 摘下皮带、外套，并清空口袋中的金属物品，如手表、钥匙、硬币及手机；(4) 体内装有医疗器械（如心脏起搏器）的旅客，请在安检前告知工作人员。",
    },
    links: [
      {
        label: { en: "Security Guide", lo: "ຄູ່ມືຄວາມປອດໄພ", zh: "安检指南" },
        href: "/guides/security",
      },
    ],
  },*/
  {
    id: "s2",
    cat: "security",
    q: {
      en: "What documents do I need for international travel?",
      lo: "ຂ້ອຍຕ້ອງກຽມເອກະສານຫຍັງແດ່ສຳລັບການເດີນທາງຕ່າງປະເທດ?",
      zh: "国际旅行需要哪些证件？",
    },
    a: {
      en: "You need a valid passport with at least 6 months of remaining validity, your return ticket, and a valid visa if required by your destination country. Some destinations may also require health certificates.",
      lo: "ທ່ານຕ້ອງມີ ໜັງສືຜ່ານແດນ (Passport) ທີ່ມີອາຍຸການໃຊ້ງານເຫຼືອຢ່າງໜ້ອຍ 6 ເດືອນ, ປີ້ເຮືອບິນຂາກັບ, ແລະ ວີຊາທີ່ຖືກຕ້ອງ (ຖ້າປະເທດປາຍທາງກຳນົດ) ບາງປະເທດອາດຮຽກຮ້ອງເອກະສານຢັ້ງຢືນສຸຂະພາບເພີ່ມເຕີມ.",
      zh: "您需要持有有效期在 6 个月以上的护照、返程机票以及目的地国家要求的有效签证。部分目的地可能还需要健康证明或疫苗接种证明。",
    },
  },
  {
    id: "s3",
    cat: "security",
    q: {
      en: "How long does immigration and customs take?",
      lo: "ຂັ້ນຕອນກວດຄົນເຂົ້າເມືອງ ແລະ ພາສີ ໃຊ້ເວລາດົນປານໃດ?",
      zh: "出入境和海关手续需要多长时间？",
    },
    a: {
      en: "Under normal conditions, passport control and customs take about 20–40 minutes in total. During peak periods (public holidays, festival seasons, or when multiple international flights land simultaneously) allow up to 60–75 minutes. Tips to speed things up: have your passport open to the photo page, fill in your arrival card on the plane if provided, and declare any goods over the allowance before joining the queue. A full step-by-step arrival walkthrough is in our Arrivals Guide.",
      lo: "ໃນສະພາບປົກກະຕິ, ຂັ້ນຕອນກວດໜັງສືຜ່ານແດນ ແລະ ພາສີ ຈະໃຊ້ເວລາປະມານ 20–40 ນາທີ ແຕ່ໃນຊ່ວງເທດສະການ ຫຼື ວັນພັກຍາວ ອາດໃຊ້ເວລາເຖິງ 60–75 ນາທີ. ຄຳແນະນຳ: ຄວນເປີດ Passport ລໍຖ້າໄວ້ທີ່ໜ້າທີ່ມີຮູບຖ່າຍ ແລະ ກຽມແຈ້ງສິ່ງຂອງທີ່ຕ້ອງເສຍພາສີໃຫ້ຮຽບຮ້ອຍກ່ອນເຂົ້າແຖວ.",
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
      lo: "ຂໍ້ກຳນົດການກວດສຸຂະພາບແມ່ນຂຶ້ນກັບມາດຕະການສາທາລະນະສຸກໃນປັດຈຸບັນ ແລະ ກົດລະບຽບຂອງປະເທດປາຍທາງ ກະລຸນາກວດສອບຂໍ້ມູນລ່າສຸດກັບສາຍການບິນ ຫຼື ສະຖານທູດກ່ອນການເດີນທາງ.",
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
      lo: "ມີ, ພວກເຮົາມີ Wi-Fi ຟຣີໃຫ້ບໍລິການທົ່ວອາຄານຜູ້ໂດຍສານ ທ່ານສາມາດເຊື່ອມຕໍ່ໄປທີ່ເຄືອຂ່າຍ 'BKIA_Free_WiFi' ແລະ ລົງທະບຽນງ່າຍໆເພື່ອເຂົ້າໃຊ້ງານ.",
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
      en: "The terminal provides shops selling a variety of drinks and snacks for your convenience. Please note that there are currently no full-service restaurants or duty-free shops available inside the airport.",
      lo: "ພວກເຮົາສຸມໃສ່ການບໍລິການທີ່ສະດວກສະບາຍ ໂດຍມີຮ້ານຄ້າຂາຍເຄື່ອງດື່ມ ແລະ ອາຫານຫວ່າງ ໄວ້ຄອຍບໍລິການທ່ານພາຍໃນອາຄານຜູ້ໂດຍສານ ຢ່າງໃດກໍຕາມ, ປັດຈຸບັນແມ່ນຍັງບໍ່ມີຮ້ານອາຫານ ແລະ ຮ້ານຄ້າປອດພາສີ (Duty Free) ເປີດໃຫ້ບໍລິການ.",
      zh: "航站楼内设有商店，为您提供各种饮料和小吃。请注意，目前机场内暂无餐厅或免税店（Duty Free）。",
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
      en: "Yes, we offer a VIP Lounge service located in a dedicated area separate from the main terminal. The lounge provides a premium experience featuring: (1) Private and exclusive seating, (2) A fully air-conditioned environment for maximum comfort, (3) A quiet and peaceful atmosphere perfect for rest or work, (4) Light snacks and refreshments, and (5) Complimentary high-speed Wi-Fi throughout the area.",
      lo: "ມີ, ພວກເຮົາມີບໍລິການຫ້ອງຮັບຮອງ VIP ເຊິ່ງຕັ້ງຢູ່ເຂດສະເພາະແຍກອອກຈາກອາຄານຜູ້ໂດຍສານຫຼັກ ພາຍໃນຫ້ອງຮັບຮອງມີສິ່ງອຳນວຍຄວາມສະດວກຄົບຊຸດຄື: (1) ທີ່ນັ່ງສ່ວນຕົວທີ່ເປັນເອກະລັກ, (2) ຫ້ອງແອເຢັນສະບາຍ, (3) ບັນຍາກາດທີ່ງຽບສະຫງົບ ແລະ ເປັນສ່ວນຕົວ ເໝາະແກ່ການພັກຜ່ອນ ຫຼື ເຮັດວຽກ, (4) ມີອາຫານວ່າງໄວ້ຄອຍບໍລິການ, (5) ບໍລິການ WiFi ຟຣີ ຄວາມໄວສູງທົ່ວບໍລິເວນ.",
      zh: "是的，我们提供位于独立区域的贵宾休息室（VIP Lounge）。该休息室与主候机楼分开，提供优质的候机体验：(1) 专属私密座椅；(2) 全空调覆盖的凉爽舒适环境；(3) 安静宁适的氛围，适合休息或办公；(4) 提供精美点心与小吃；(5) 全区覆盖免费高速无线网络 (Wi-Fi)。",
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
      en: "Currently, there are no currency exchange counters available inside the terminal. You may exchange currency at authorized exchange booths or banks located outside the airport area.",
      lo: "ປັດຈຸບັນແມ່ນຍັງບໍ່ມີບໍລິການເຄົາເຕີ້ແລກປ່ຽນເງິນຕາພາຍໃນອາຄານ ທ່ານສາມາດອອກໄປໃຊ້ບໍລິການແລກປ່ຽນເງິນຕາໄດ້ຢູ່ຮ້ານແລກປ່ຽນ ຫຼື ທະນາຄານທີ່ຕັ້ງຢູ່ພາຍນອກເຂດສະໜາມບິນ.",
      zh: "目前航站楼内暂无货币兑换柜台。您可以前往机场区域外的授权兑换点或银行办理兑换业务。",
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
      lo: "ທ່ານສາມາດໃຊ້ບໍລິການລົດແທັກຊີ ຫຼື ລົດຕູ້ຮັບ-ສົ່ງ ທີ່ຈອດລໍຖ້າຢູ່ທາງອອກອາຄານຂາເຂົ້າ ມີລາຄາຄົງທີ່ໄປຍັງ 3 ຈຸດຫຼັກ: ຕົວເມືອງຕົ້ນເຜິ້ງ, ເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ ແລະ ເມືອງຫ້ວຍຊາຍ ລາຄາແມ່ນມີການກຳນົດໄວ້ແລ້ວ. ການເດີນທາງໄປເມືອງຕົ້ນເຜິ້ງໃຊ້ເວລາປະມານ 15–20 ນາທີ.",
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
      en: "Yes. The car park is located directly in front of the terminal with separate zones for cars and motorcycles. Rates are charged per 2 hours — LAK 30,000 / THB 50 / CNY 10 for cars, and LAK 15,000 / THB 25 / CNY 5 for motorcycles. Payment is accepted in cash (LAK, THB, CNY) or via Lao QR. Note that overnight parking is not permitted.",
      lo: "ມີ. ລານຈອດລົດຕັ້ງຢູ່ທາງໜ້າອາຄານຜູ້ໂດຍສານ ມີເຂດແຍກຕ່າງຫາກສຳລັບລົດໃຫ່ຍ ແລະ ລົດຈັກ ຄ່າຈອດຄິດໄລ່ທຸກ 2 ຊົ່ວໂມງ — ລົດໃຫ່ຍ 30,000 ກີບ / 50 ບາດ / 10 ຢວນ, ລົດຈັກ 15,000 ກີບ / 25 ບາດ / 5 ຢວນ. ຊຳລະເງິນສົດ (ກີບ, ບາດ, ຢວນ) ຫຼື QR ທະນາຄານລາວ ທັງນີ້ ຫ້າມຈອດລົດຄ້າງຄືນ.",
      zh: "是的。停车场位于候机楼正前方，轿车与摩托车分区停放，按每 2 小时计费——轿车 30,000 基普 / 50 泰铢 / 10 元人民币，摩托车 15,000 基普 / 25 泰铢 / 5 元人民币。支持现金（基普、泰铢、人民币）及老挝二维码付款。注意：不允许过夜停车。",
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
      en: "Yes. You can pre-book a taxi or shuttle van by calling the airport at +856 20 9201 4955. Provide your flight number and arrival time and a vehicle will be waiting for you at the arrivals exit. Walk-up taxis and vans are also available at the taxi stand outside arrivals without any booking — just approach the desk, choose your destination, and pay the fixed fare. See our Taxi page for vehicle options and all destination fares.",
      lo: "ໄດ້, ທ່ານສາມາດຈອງລົດລ່ວງໜ້າໄດ້ໂດຍການໂທຫາເບີ +856 20 9201 4955 ພຽງແຕ່ແຈ້ງເລກຖ້ຽວບິນ ແລະ ເວລາຮອດ, ລົດຈະໄປລໍຖ້າຮັບທ່ານຢູ່ທາງອອກ ຫຼື ທ່ານສາມາດຍ່າງໄປຕິດຕໍ່ທີ່ເຄົາເຕີ້ແທັກຊີຢູ່ທາງອອກໄດ້ທັນທີໂດຍບໍ່ຕ້ອງຈອງ.",
      zh: "可以。您可以拨打 +856 20 9201 4955 预约接机。告知航班号和到达时间，司机将在门口等候。您也可以直接前往出口处的出租车柜台，按公示价格直接付费乘车。",
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
      lo: "ປັດຈຸບັນພວກເຮົາຍັງບໍ່ມີລິການລົດໃຫ້ເຊົ່າພາຍໃນສະໜາມບິນ",
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
      lo: "ໄດ້, ແຕ່ລະສາຍການບິນມີເຄົາເຕີຂາຍປີ້ຢູ່ໃກ້ກັບເຄົາເຕີແຈ້ງປີ້ ພະນັກງານສາມາດຊ່ວຍໃນການຈອງໃໝ່, ປ່ຽນວັນເດີນທາງ ຫຼື ປ່ຽນເສັ້ນທາງ ຕາມເງື່ອນໄຂຂອງສາຍການບິນ ໂດຍທົ່ວໄປ ຄວນຈອງ ຫຼື ປ່ຽນປີ້ລ່ວງໜ້າກັບຕົວແທນຈຳໜ່າຍ ຫຼື ສາຍການບິນ.",
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
  /*{
    id: "f6",
    cat: "flights",
    q: {
      en: "What international destinations can I fly to from Bokeo?",
      lo: "ສາມາດບິນໄປຕ່າງປະເທດທີ່ໃດໄດ້ແດ່ຈາກສະໜາມບິນສາກົນບໍ່ແກ້ວ?",
      zh: "从博胶国际机场可以飞往哪些国际目的地？",
    },
    a: {
      en: "Bokeo International Airport operates international routes to destinations in Thailand (including Chiang Rai) and China (including Xishuangbanna / Jinghong). Schedules and available routes may change seasonally, so we recommend checking current timetables on our departures board or confirming directly with Lao Airlines or Lao Skyway. Domestic routes connect Bokeo with Vientiane (Wattay International Airport).",
      lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ ໃຫ້ບໍລິການເສັ້ນທາງສາກົນໄປຍັງ ປະເທດໄທ (ລວມທັງເຊັງລາຍ) ແລະ ສປ ຈີນ (ລວມທັງຊີຊວງກ / ຈິ່ງຮົງ). ຕາຕະລາງການບິນ ອາດມີການປ່ຽນແປງຕາມລະດູການ ດັ່ງນັ້ນ ຂໍແນະນຳໃຫ້ກວດສອບຕາຕະລາງ ຫຼື ຕິດຕໍ່ສາຍການບິນໂດຍກົງ. ສຳລັບເສັ້ນທາງພາຍໃນ ມີຖ້ຽວບິນເຊື່ອມຕໍ່ ບໍ່ແກ້ວ — ວຽງຈັນ (ທ່ານຫ້ວຍ / Wattay).",
      zh: "博胶国际机场目前开通至泰国（含清莱）和中国（含西双版纳/景洪）的国际航线。航线及班期可能随季节调整，建议查看我们网站上的最新出发航班时刻表，或直接联系老挝航空或老挝天空航空确认。国内方面，博胶与万象（瓦岱国际机场）之间有直飞航班。",
    },
    links: [
      {
        label: {
          en: "Departures Board",
          lo: "ກະດານຖ້ຽວບິນຂາອອກ",
          zh: "出发航班列表",
        },
        href: "/flights/departures",
      },
    ],
  },*/

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
      en: "Yes, we provide a professional luggage wrapping service that meets international safety standards. Located in the terminal building, this service helps protect your bags against scratches, moisture, and tampering. Pricing starts at 15,000 LAK per item, with options available for various baggage sizes.",
      lo: "ມີ, ພວກເຮົາມີບໍລິການຫຸ້ມຫໍ່ກະເປົາທີ່ໄດ້ມາດຕະຖານສາກົນ ຕັ້ງຢູ່ພາຍໃນອາຄານຜູ້ໂດຍສານ. ການຫຸ້ມຫໍ່ຈະຊ່ວຍປ້ອງກັນຮອຍຂີດ, ຄວາມຊຸ່ມ ແລະ ການງັດແງະສຳພາລະຂອງທ່ານ ບໍລິການມີຫຼາຍຂະໜາດໃຫ້ເລືອກ ໂດຍລາຄາເລີ່ມຕົ້ນແມ່ນ 15,000 ກີບ",
      zh: "是的，我们提供符合国际标准的专业行李裹膜服务。该服务位于航站楼内，可有效防止行李划伤、受潮或被擅自开包。服务根据行李大小提供多种选择，价格每件 15,000 基普起。",
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
      en: "Rules vary by destination. For domestic flights, food that is tightly sealed is generally permitted. However, for items with a noticeable aroma, it is recommended to pack them securely and place them in checked baggage. Strong-smelling foods may be refused by the airline. For international travel, always check the destination's import laws and airline policies regarding fresh produce and meat.",
      lo: "ຂໍ້ກຳນົດແມ່ນຂຶ້ນກັບຈຸດໝາຍປາຍທາງ ສຳລັບຖ້ຽວບິນທົ່ວໄປ ອາຫານທີ່ຫຸ້ມຫໍ່ແໜ້ນໜາແມ່ນສາມາດຖືຂຶ້ນເຄື່ອງໄດ້ ແຕ່ສຳລັບອາຫານທີ່ມີກິ່ນ ແນະນຳໃຫ້ຫຸ້ມຫໍ່ໃຫ້ແໜ້ນໜາແລ້ວນຳໃສ່ກະເປົາໂຫຼດໃຕ້ທ້ອງເຮືອບິນ ອາຫານທີ່ສົ່ງກິ່ນແຮງອາດຖືກປະຕິເສດຕາມລະບຽບຂອງສາຍການບິນ ສຳລັບເດີນທາງໄປຕ່າງປະເທດ ກະລຸນາກວດສອບກົດລະບຽບການນຳເຂົ້າ ແລະ ນະໂຍບາຍຂອງສາຍການບິນຕື່ມອີກ.",
      zh: "规定因目的地而异。国内航班通常允许携带严密包装的食品。但对于有味道的食物，建议严密封装后办理托运。气味浓烈的食物可能会根据航空公司规定被拒绝携带。国际航线请务必提前核查目的地国家的进口法规及航司政策。",
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
      en: "Currently, there is no luggage storage or locker facility available at the airport. We recommend that you only bring items you can carry or check in for your flight. Please review the baggage regulations carefully to ensure your belongings meet the airline's safety and weight requirements.",
      lo: "ປັດຈຸບັນ ພວກເຮົາບໍ່ມີບໍລິການຝາກກະເປົາ ຫຼື ຕູ້ຝາກເຄື່ອງຊົ່ວຄາວຢູ່ສະໜາມບິນ. ແນະນຳໃຫ້ທ່ານນຳເອົາສະເພາະເຄື່ອງທີ່ສາມາດຖືຂຶ້ນເຮືອບິນ ຫຼື ໂຫຼດໃຕ້ທ້ອງເຮືອບິນໄປນຳໄດ້ເທົ່ານັ້ນ ແລະ ກະລຸນາສຶກສາກົດລະບຽບກ່ຽວກັບສຳພາລະໃຫ້ລະອຽດ ເພື່ອໃຫ້ຖືກຕ້ອງຕາມມາດຕະຖານຄວາມປອດໄພຂອງສາຍການບິນ.",
      zh: "目前机场暂不提供行李寄存或储物柜服务。建议您仅携带可随身登机或托运的物品，并请务必仔细阅读行李相关规定，确保您的物品符合航空公司的安全要求及重量限制。",
    },
  },

  // ── Security & Immigration (extra) ──────────────────────────────────────
  {
    id: "s5",
    cat: "security",
    q: {
      en: "Do I need a visa to enter Laos?",
      lo: "ຂ້ອຍຕ້ອງຂໍວີຊາເຂົ້າ ສປປ ລາວ ບໍ?",
      zh: "入境老挝是否需要签证？",
    },
    a: {
      en: "Visa requirements depend on your nationality. Citizens of ASEAN countries and several others can enter Laos visa-free for stays of 14 to 30 days. Most other nationalities can obtain a Visa on Arrival (VOA) at international airports and land border crossings — a passport photo, completed application form, and fee of approximately USD 30–50 are typically required. Some nationalities must apply in advance at a Lao embassy or consulate. Requirements change regularly, so please verify current rules with the Lao Department of Immigration or your nearest Lao embassy before travel.",
      lo: "ຂໍ້ກຳນົດວີຊາຂຶ້ນກັບສັນຊາດຂອງທ່ານ ພົນລະເມືອງ ອາຊຽນ ແລະ ອີກຫຼາຍສັນຊາດ ສາມາດເຂົ້າໄດ້ໂດຍບໍ່ຕ້ອງຂໍວີຊາ ສຳລັບ 14–30 ວັນ ສ່ວນໃຫຍ່ຂອງສັນຊາດອື່ນ ສາມາດຂໍວີຊາທີ່ດ່ານ (Visa On Arrival) ໄດ້ ໂດຍໃຊ້ຮູບຖ່າຍ, ແບບຟອມ ແລະ ຄ່າທຳນຽມ 30–50 USD. ຂໍ້ກຳນົດ ອາດມີການປ່ຽນແປງ ກະລຸນາກວດສອບຂໍ້ມູນລ່າສຸດຈາກສະຖານທູດ ຫຼື ກົມກວດຄົນເຂົ້າເມືອງ ກ່ອນການເດີນທາງ.",
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
      en: "Passengers can bring foreign currency into Laos without limit. However, amounts exceeding USD 10,000 (or equivalent) must be declared to customs officers at the border. Similarly, there is no limit on taking foreign currency out of Laos, but amounts exceeding USD 10,000 (or equivalent) require prior permission from the Foreign Currency Management Department or the Bank of the Lao PDR (BOL).",
      lo: "ຜູ້ໂດຍສານສາມາດນຳເງິນສົດເງິນຕາຕ່າງປະເທດເຂົ້າ ສປປ ລາວ ໂດຍບໍ່ຈຳກັດຈຳນວນ ແຕ່ຖ້ານຳເຂົ້າເກີນ 10,000 ໂດລາສະຫະລັດ ຫຼື ທຽບເທົ່າ ຕ້ອງແຈ້ງຕໍ່ເຈົ້າໜ້າທີ່ພາສີປະຈຳດ່ານ ສຳລັບການນຳອອກ ກໍ່ສາມາດນຳອອກໄດ້ໂດຍບໍ່ຈຳກັດຈຳນວນເຊັ່ນກັນ, ແຕ່ຫາກເກີນ 10,000 ໂດລາສະຫະລັດ ຫຼື ທຽບເທົ່າ ຕ້ອງຂໍອະນຸຍາດນຳກົມຄຸ້ມຄອງເງິນຕາຕ່າງປະເທດ ຫຼື ທະນາຄານແຫ່ງ ສປປ ລາວ ປະຈຳພາກ.",
      zh: "乘客携带外币入境老挝无金额限制。但若携带超过 10,000 美元（或等值外币）入境，必须向口岸海关人员申报。携带外币出境同样无金额限制，但若金额超过 10,000 美元（或等值外币），则必须预先取得外币管理司或老挝人民民主共和国银行（各地区分行）的许可。",
    },
  },
  {
    id: "s7",
    cat: "security",
    q: {
      en: "Can I bring prescription medication on the plane?",
      lo: "ຂ້ອຍສາມາດນຳຢາທີ່ມີໃບສັ່ງຈາກແພດຖືຂຶ້ນເຮືອບິນໄດ້ບໍ່?",
      zh: "我可以随身携带处方药上飞机吗？",
    },
    a: {
      en: "Generally, prescription medication is permitted on board. To ensure a smooth security check: (1) Keep medication in its original labeled packaging, (2) Carry your prescription or a doctor's letter (especially for chronic conditions), (3) Liquid medications exceeding 100ml can be exempted if accompanied by a medical certificate. Please check the drug import regulations of your destination country before traveling.",
      lo: "ໂດຍທົ່ວໄປຢາທີ່ມີໃບສັ່ງຈາກແພດສາມາດຖືຂຶ້ນເຮືອບິນໄດ້ ເພື່ອຄວາມສະດວກວ່ອງໄວໃນການຜ່ານຈຸດກວດຄົ້ນ: (1) ເກັບຢາໄວ້ໃນກ່ອງທີ່ຕິດລາຍຊື່ຕົວຢາ, (2) ຖືໃບສັ່ງຢາ ຫຼື ໜັງສືຈາກແພດ (ໂດຍສະເພາະຢາທີ່ໃຊ້ຮັກສາໂລກປະຈຳຕົວ), (3) ຢາເປັນທາດແຫຼວທີ່ມີຂະໜາດບັນຈຸ ແລະ ປະລິມານເກີນ 100ml ແມ່ນສາມາດຍົກເວັ້ນໄດ້ຫາກມີໃບຢັ້ງຢືນຈາກແພດ ກະລຸນາກວດສອບຂໍ້ກຳນົດການນຳເຂົ້າຢາຂອງປະເທດປາຍທາງກ່ອນເດີນທາງ.",
      zh: "通常情况下，处方药可以携带登机。为确保快速通过安检：(1) 请将药品保留在带有名称标识的原包装内；(2) 携带处方或医生证明（特别是针对慢性病的药物）；(3) 若液体药物容量超过 100 毫升，凭医疗证明可获豁免。出行前请务必核查目的地国家的药品进口规定。",
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
      lo: "ມີ, ອາຄານຜູ້ໂດຍສານມີ 2 ຫ້ອງ: ຫ້ອງກາບໄຫວ້ພຣະ (ສຳລັບສາດສະໜາພຸດ) ເຊິ່ງເປີດໃຫ້ຜູ້ໂດຍສານຂໍພອນກ່ອນການເດີນທາງ ແລະ ຫ້ອງລະມາດ (ສຳລັບສາດສະໜາອິດສະລາມ). ທັງສອງຫ້ອງ ສະອາດ, ສະຫງົບ ແລະ ເປີດຕະຫຼອດເວລາທຳການ.",
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
      lo: "ສະໜາມບິນ ມີຫ້ອງລ້ຽງເດັກ ຫຼື ບ່ອນປ່ຽນຜ້າອ້ອມບໍ?",
      zh: "机场是否有婴儿护理或哺乳设施？",
    },
    a: {
      en: "Yes, we provide dedicated baby-changing and nursing facilities for the convenience of families. These clean and private spaces are equipped with changing tables to assist parents traveling with infants.",
      lo: "ມີ, ພວກເຮົາມີສິ່ງອຳນວຍຄວາມສະດວກສຳລັບຄອບຄົວ ເຊັ່ນ: ຫ້ອງໃຫ້ນົມ ແລະ ບ່ອນປ່ຽນຜ້າອ້ອມເດັກ ເຊິ່ງເປັນພື້ນທີ່ສະອາດ ແລະ ເປັນສ່ວນຕົວ ເພື່ອອຳນວຍຄວາມສະດວກໃຫ້ແກ່ຜູ້ປົກຄອງທີ່ເດີນທາງພ້ອມກັບແອນ້ອຍ.",
      zh: "是的，为了方便家庭出行，我们设有专门的婴儿护理及哺乳设施。这些空间整洁且私密，配备有换尿布台，旨在为携带婴幼儿的家长提供便利。",
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
      en: "Yes. Complimentary wheelchair assistance is available throughout the terminal — just request at the check-in counter or service desk. Elderly passengers and passengers with disabilities also receive priority check-in and boarding. Please notify your airline at least 48 hours before departure and arrive at least 2.5 hours early so assistance can be arranged.",
      lo: "ມີ. ສະໜາມບິນໃຫ້ບໍລິການລໍ້ຍູ້ຟຣີທົ່ວອາຄານ ສາມາດແຈ້ງຂໍໄດ້ທີ່ເຄົາເຕີ້ແຈ້ງປີ້ ຫຼື ໂຕະບໍລິການ ຜູ້ສູງອາຍຸ ແລະ ຜູ້ພິການຍັງມີສິດໄດ້ຮັບການແຈ້ງປີ້ ແລະ ຂຶ້ນເຮືອບິນກ່ອນ ກະລຸນາແຈ້ງສາຍການບິນລ່ວງໜ້າຢ່າງໜ້ອຍ 48 ຊົ່ວໂມງ ແລະ ມາຮອດສະໜາມບິນຢ່າງໜ້ອຍ 2 ຊົ່ວໂມງ 30 ນາທີ ກ່ອນເດີນທາງ.",
      zh: "是的。航站楼内提供免费轮椅服务，在值机柜台或服务台申请即可。老年旅客及残疾旅客同样享有优先值机和登机待遇。请至少提前 48 小时通知航空公司，并提前 2.5 小时抵达机场以便安排协助。",
    },
    links: [
      {
        label: {
          en: "Passengers with Reduced Mobility",
          lo: "ຜູ້ໂດຍສານທີ່ມີຄວາມຕ້ອງການພິເສດ",
          zh: "行动不便旅客服务",
        },
        href: "/guides/custom-services/mobility-challenges",
      },
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
      en: "The Golden Triangle Special Economic Zone (SEZ) is approximately 8–12 km from the airport, depending on the entrance you are heading to. Under normal road conditions, the journey takes 15–25 minutes by taxi. The fixed taxi fare is 300,000 LAK or 100 CNY. Enquire at the taxi counter (Exit 04, Domestic Terminal) for up-to-date journey information.",
      lo: "ເຂດເສດຖະກິດພິເສດສາມຫຼ່ຽມຄຳ ຕັ້ງຢູ່ຫ່າງຈາກສະໜາມບິນປະມານ 8–12 ກິໂລ ຕາມຈຸດທາງເຂົ້າ, ໃຊ້ເວລາເດີນທາງປະມານ 10–15 ນາທີ ໂດຍລົດ. ລາຄາຄົງທີ່ຈາກສະໜາມບິນ ແມ່ນ 300,000 ກີບ ຫຼື 100 ຫຍວນ ສອບຖາມຢູ່ເຄົາເຕີລົດແທັກຊີ ປະຕູທາງອອກ 04.",
      zh: "金三角特区距机场约 8-12 公里（视入口而定），正常道路情况下出租车约需 15-25 分钟。从机场至金三角特区的固定票价为 300,000 基普或 100 元人民币。详情可在 04 号出口（国内航站楼）出租车服务台咨询。",
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
      en: "Huay Xai is the provincial capital of Bokeo and the main crossing point between Laos and Thailand via the 4th Thai-Lao Friendship Bridge (connecting to Chiang Khong, Thailand). From the airport, take a fixed-price taxi directly to Huay Xai — the journey takes approximately 45–60 minutes and the fixed fare is 1,050,000 LAK or 350 CNY. At the bridge, tuk-tuks and songthaews are available for the short crossing into Chiang Khong. Slow boats down the Mekong to Luang Prabang also depart from the Huay Xai boat landing.",
      lo: "ຫ້ວຍຊາຍ ແມ່ນສູນກາງແຂວງບໍ່ແກ້ວ ແລະ ມີດ່ານລາວ-ໄທ ຜ່ານຂົວມິດຕະພາບລາວ-ໄທ ແຫ່ງທີ່ 4 (ຊຽງຂອງ, ໄທ). ຈາກສະໜາມບິນ ທ່ານສາມາດໃຊ້ລົດແທັກຊີໃຊ້ເວລາປະມານ 45–60 ນາທີ ລາຄາ 1,050,000 ກີບ ຫຼື 350 ຫຍວນ. ທີ່ຂົວມິດຕະພາບ ມີບໍລິການລົດຂ້າມດ່ານ.",
      zh: "会晒是博胶省省会，也是经第 4 泰老友谊大桥连接泰国清孔的主要口岸。从机场乘出租车直达会晒约需 45-60 分钟，固定票价为 1,050,000 基普或 350 元人民币。到达大桥后，可乘三轮车或双条车跨桥前往泰国清孔。会晒码头亦有开往琅勃拉邦的湄公河慢船服务。",
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
