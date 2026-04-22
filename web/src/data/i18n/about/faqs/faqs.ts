import type { Lang } from "@/types/language";

// ── Page meta strings ──────────────────────────────────────────────────────

export const faqs = {
  pageTitle: {
    en: "Frequently Asked Questions",
    lo: "ຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆ",
    zh: "常见问题",
  },
  pageDescription: {
    en: "Find answers to the most common questions about traveling through Bokeo International Airport.",
    lo: "ຊອກຫາຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປທີ່ສຸດກ່ຽວກັບການເດີນທາງຜ່ານສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    zh: "查找有关博胶国际机场出行的常见问题解答。",
  },
  heroTitle: {
    en: "How can we help you?",
    lo: "ພວກເຮົາຊ່ວຍທ່ານໄດ້ແນວໃດ?",
    zh: "我们能为您提供什么帮助？",
  },
  heroSubtitle: {
    en: "Browse our most common questions or search for a specific topic below.",
    lo: "ຄົ້ນຫາຄຳຖາມທີ່ພົບເລື້ອຍທີ່ສຸດ ຫຼື ຄົ້ນຫາຫົວຂໍ້ສະເພາະດ້ານລຸ່ມ.",
    zh: "浏览我们最常见的问题，或在下方搜索特定主题。",
  },
  searchPlaceholder: {
    en: "Search questions…",
    lo: "ຄົ້ນຫາຄຳຖາມ…",
    zh: "搜索问题…",
  },
  searchResults: {
    en: "results for",
    lo: "ຜົນຄົ້ນຫາສຳລັບ",
    zh: "条结果：",
  },
  clearSearch: {
    en: "Clear",
    lo: "ລ້າງ",
    zh: "清除",
  },
  noResults: {
    en: "No results found",
    lo: "ບໍ່ພົບຜົນການຄົ້ນຫາ",
    zh: "未找到相关结果",
  },
  noResultsHint: {
    en: "Try different keywords or browse all categories below.",
    lo: "ລອງໃຊ້ຄຳສັບອື່ນ ຫຼື ດູໝວດໝູ່ທັງໝົດດ້ານລຸ່ມ.",
    zh: "请尝试其他关键词，或浏览下方所有分类。",
  },
  catFlights: { en: "Flights", lo: "ທ່ຽວບິນ", zh: "航班信息" },
  catCheckin: { en: "Check-in & Baggage", lo: "ເຊັກອິນ ແລະ ກະເປົ໋າ", zh: "值机与行李" },
  catSecurity: { en: "Security & Immigration", lo: "ຄວາມປອດໄພ ແລະ ດ່ານຕົວເຈົ້າ", zh: "安检与入境" },
  catServices: { en: "Services & Facilities", lo: "ການບໍລິການ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກ", zh: "服务与设施" },
  catTransport: { en: "Transportation", lo: "ການຂົນສົ່ງ", zh: "交通运输" },
  stillHaveQuestions: {
    en: "Still have questions?",
    lo: "ຍັງມີຄຳຖາມຢູ່ບໍ?",
    zh: "还有疑问？",
  },
  contactSubtitle: {
    en: "Our team is available to help you. Reach us by phone or email.",
    lo: "ທີມງານຂອງພວກເຮົາພ້ອມໃຫ້ການຊ່ວຍເຫຼືອທ່ານ. ຕິດຕໍ່ພວກເຮົາທາງໂທລະສັບ ຫຼື ອີເມວ.",
    zh: "我们的团队随时为您提供帮助，欢迎致电或发送电子邮件联系我们。",
  },
  callUs: { en: "Call Us", lo: "ໂທຫາພວກເຮົາ", zh: "拨打电话" },
  emailUs: { en: "Email Us", lo: "ສົ່ງອີເມວ", zh: "发送邮件" },
} as const;

export type FAQsKey = keyof typeof faqs;

export const tFAQs = (k: FAQsKey, lang: Lang) =>
  faqs[k][lang] ?? faqs[k].en;

// ── FAQ data ───────────────────────────────────────────────────────────────

export type FAQCategory = "flights" | "checkin" | "security" | "services" | "transport";

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
      lo: "ສາຍການບິນໃດທີ່ດຳເນີນການຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ?",
      zh: "哪些航空公司在博胶国际机场运营？",
    },
    a: {
      en: "Bokeo International Airport is currently served by Lao Airlines and Lao Skyway. Domestic routes connect Bokeo to Vientiane (Wattay), while international routes cover destinations in Thailand and China. Each airline operates its own ticketing counters inside the terminal. For hotlines, booking contacts, and the latest schedule, visit our Airlines page.",
      lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວໃຫ້ບໍລິການໂດຍ Lao Airlines ແລະ Lao Skyway. ເສັ້ນທາງພາຍໃນເຊື່ອມຕໍ່ບໍ່ແກ້ວກັບວຽງຈັນ (ວັດໄຕ), ໃນຂະນະທີ່ເສັ້ນທາງສາກົນຄວບຄຸມປາຍທາງໃນໄທ ແລະ ຈີນ. ສາຍການບິນແຕ່ລະສາຍດຳເນີນໂຕະຂາຍປີ້ຂອງຕົນເອງໃນ terminal. ສຳລັບເບີໂທ, ຕິດຕໍ່ຈອງ ແລະ ຕາຕະລາງລ່າສຸດ, ເຂົ້າຊົມໜ້າສາຍການບິນ.",
      zh: "博胶国际机场目前由老挝航空和老挝天空航空提供服务。国内航线连接博胶与万象（瓦岱机场），国际航线覆盖泰国和中国的目的地。各航空公司在候机楼内设有独立售票柜台。如需查询热线、预订联系方式及最新时刻表，请访问航空公司页面。",
    },
    links: [
      { label: { en: "View Airlines", lo: "ເບິ່ງສາຍການບິນ", zh: "查看航空公司" }, href: "/flights/airlines" },
    ],
  },
  {
    id: "f2",
    cat: "flights",
    q: {
      en: "How can I check my flight status?",
      lo: "ຂ້ອຍສາມາດກວດສອບສະຖານະທ່ຽວບິນຂອງຂ້ອຍໄດ້ແນວໃດ?",
      zh: "如何查询我的航班状态？",
    },
    a: {
      en: "Real-time departure and arrival status is updated continuously on our website. On the Departures board you can see estimated take-off times, gate assignments, and delay notices. On the Arrivals board you can see estimated landing times and baggage belt numbers. You can also call the airport information desk at +856 84 260 179 or ask staff at the terminal information counters.",
      lo: "ສະຖານະຂາອອກ ແລະ ຂາເຂົ້າ real-time ໄດ້ຮັບການອັບເດດຢ່າງຕໍ່ເນື່ອງຢູ່ໃນເວັບໄຊຂອງພວກເຮົາ. ໃນກະດານ ຈາກໄປ ທ່ານສາມາດເບິ່ງເວລາອອກເດີນທາງທີ່ຄາດໄວ້, ການມອບໝາຍ gate ແລະ ການແຈ້ງຊ້ານ. ໃນກະດານ ຂາເຂົ້າ ທ່ານສາມາດເບິ່ງເວລາລົງຈອດທີ່ຄາດໄວ້ ແລະ ໝາຍເລກສາຍກະໂນ. ທ່ານຍັງສາມາດໂທ +856 84 260 179 ຫຼື ຖາມພະນັກງານທີ່ໂຕະຂໍ້ມູນຂ່າວສານ.",
      zh: "我们网站上的实时出发和到达状态持续更新。在出发航班列表上，您可以查看预计起飞时间、登机口安排和延误通知。在到达航班列表上，您可以查看预计降落时间和行李转盘编号。您也可以拨打+856 84 260 179联系机场信息台，或向候机楼信息柜台工作人员咨询。",
    },
    links: [
      { label: { en: "Departures Board", lo: "ກະດານຈາກໄປ", zh: "出发航班" }, href: "/flights/departures" },
      { label: { en: "Arrivals Board", lo: "ກະດານຂາເຂົ້າ", zh: "到达航班" }, href: "/flights/arrivals" },
    ],
  },
  {
    id: "f3",
    cat: "flights",
    q: {
      en: "What should I do if my flight is delayed or cancelled?",
      lo: "ຖ້າທ່ຽວບິນຂ້ອຍຊັກຊ້າ ຫຼື ຍົກເລີກ, ຂ້ອຍຄວນເຮັດຫຍັງ?",
      zh: "如果我的航班延误或取消，我该怎么办？",
    },
    a: {
      en: "Contact your airline directly for rebooking and compensation options. Our information desk can help you locate your airline's service counter inside the terminal.",
      lo: "ຕິດຕໍ່ສາຍການບິນຂອງທ່ານໂດຍກົງສຳລັບການຈອງໃໝ່ ແລະ ທາງເລືອກການຊົດເຊີຍ. ໂຕະຂໍ້ມູນຂ່າວສານຂອງພວກເຮົາສາມາດຊ່ວຍທ່ານຊອກຫາໂຕະບໍລິການຂອງສາຍການບິນໃນ terminal.",
      zh: "请直接联系您的航空公司了解改签和赔偿事宜。我们的信息台可以帮助您在候机楼内找到该航空公司的服务柜台。",
    },
  },
  {
    id: "f4",
    cat: "flights",
    q: {
      en: "How early should I arrive before my flight?",
      lo: "ຂ້ອຍຄວນມາຮອດສະໜາມບິນກ່ອນທ່ຽວບິນຈັກໂມງ?",
      zh: "我应该提前多久到达机场？",
    },
    a: {
      en: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights. This allows time for parking or drop-off, check-in, baggage drop, security screening, and — for international departures — immigration. During peak travel periods (public holidays, major events) add an extra 30–45 minutes. See our full departure guide for a step-by-step walkthrough of the process.",
      lo: "ພວກເຮົາແນະນຳໃຫ້ທ່ານມາຮອດຢ່າງໜ້ອຍ 2 ຊ.ມ ກ່ອນທ່ຽວບິນພາຍໃນ ແລະ 3 ຊ.ມ ກ່ອນທ່ຽວບິນສາກົນ. ເຊິ່ງຈະເຮັດໃຫ້ທ່ານມີເວລາສຳລັບ ຈອດລົດ, ເຊັກອິນ, ຝາກກະເປົ໋າ, ກວດຄວາມປອດໄພ ແລະ — ສຳລັບຂາອອກສາກົນ — ດ່ານຕົວເຈົ້າ. ໃນໄລຍະທ່ອງທ່ຽວສູງສຸດ ໃຫ້ເພີ່ມ 30-45 ນາທີ. ເບິ່ງຄູ່ມືຈາກໄປຂອງພວກເຮົາສຳລັບຂັ້ນຕອນລະອຽດ.",
      zh: "我们建议国内航班至少提前2小时、国际航班至少提前3小时到达，以便有充足时间停车或下客、办理值机和托运行李、通过安检，以及（国际出发）办理出境手续。节假日或重大活动期间，请额外预留30-45分钟。请参阅我们的完整出发指南了解详细步骤。",
    },
    links: [
      { label: { en: "Departure Guide", lo: "ຄູ່ມືຈາກໄປ", zh: "出发指南" }, href: "/guides/departures" },
    ],
  },

  // ── Check-in & Baggage ───────────────────────────────────────────────────
  {
    id: "c1",
    cat: "checkin",
    q: {
      en: "When does check-in open and close?",
      lo: "ການເຊັກອິນເປີດ ແລະ ປິດເວລາໃດ?",
      zh: "值机何时开放和关闭？",
    },
    a: {
      en: "Check-in typically opens 2 hours before departure. It closes 45 minutes before departure for domestic flights and 60 minutes before for international flights. Times may vary by airline, so please confirm with your carrier.",
      lo: "ການເຊັກອິນໂດຍທົ່ວໄປເປີດ 2 ຊ.ມ ກ່ອນອອກເດີນທາງ. ປິດ 45 ນາທີ ກ່ອນອອກເດີນທາງສຳລັບທ່ຽວບິນພາຍໃນ ແລະ 60 ນາທີ ສຳລັບທ່ຽວບິນສາກົນ. ເວລາອາດຕ່າງກັນຕາມສາຍການບິນ.",
      zh: "值机通常在起飞前2小时开放。国内航班起飞前45分钟关闭，国际航班起飞前60分钟关闭。具体时间因航空公司而异，请向您的航空公司确认。",
    },
  },
  {
    id: "c2",
    cat: "checkin",
    q: {
      en: "What is the baggage allowance?",
      lo: "ນ້ຳໜັກກະເປົ໋າທີ່ອະນຸຍາດແມ່ນຈັກ?",
      zh: "行李限额是多少？",
    },
    a: {
      en: "Allowances vary by airline and cabin class. Economy class generally allows 20–23 kg for checked baggage and 7 kg for carry-on. Please check with your airline for your specific ticket's limits.",
      lo: "ນ້ຳໜັກທີ່ອະນຸຍາດຕ່າງກັນຕາມສາຍການບິນ ແລະ ຊັ້ນທີ່ນັ່ງ. ຊັ້ນ economy ໂດຍທົ່ວໄປອະນຸຍາດ 20-23 ກກ ສຳລັບກະເປົ໋ານ້ຳໜັກ ແລະ 7 ກກ ສຳລັບ carry-on. ກະລຸນາກວດສອບກັບສາຍການບິນຂອງທ່ານ.",
      zh: "行李限额因航空公司和舱位等级而异。经济舱通常允许20-23公斤托运行李和7公斤手提行李。请向您的航空公司确认您的票务具体限额。",
    },
  },
  {
    id: "c3",
    cat: "checkin",
    q: {
      en: "What items are prohibited in carry-on baggage?",
      lo: "ສິ່ງຂອງໃດທີ່ຫ້າມນຳໃນກະເປົ໋າ carry-on?",
      zh: "随身行李中禁止携带哪些物品？",
    },
    a: {
      en: "Common prohibited carry-on items include: sharp or pointed objects (knives, scissors over 6 cm), liquids over 100 ml per container, flammable or explosive materials, firearms and ammunition, and oversized sporting equipment. Liquids — including gels, aerosols, creams, and pastes — must each be in containers of 100 ml or less, all placed in a single clear resealable bag of max 1 litre. Items prohibited in checked baggage include lithium batteries over 160 Wh and spare/loose lithium batteries. For a full list and guidance on packing smart, see the links below.",
      lo: "ສິ່ງຂອງທີ່ຫ້າມ carry-on ທີ່ພົບເລື້ອຍ ລວມມີ: ຂອງມີຄົມ (ມີດ, ກັນຫຼຸດຫຼາຍກວ່າ 6 ຊມ), ຂອງເຫຼວຫຼາຍກວ່າ 100 ml ຕໍ່ຖ້ວຍ, ວັດສະດຸທີ່ຕິດໄຟ ຫຼື ລະເບີດ, ອາວຸດ ແລະ ກະສຸນ, ແລະ ອຸປະກອນກິລາຂະໜາດໃຫຍ່. ຂອງເຫຼວຕ້ອງຢູ່ໃນຖ້ວຍ 100 ml ຫຼື ໜ້ອຍກວ່ານັ້ນ ໃສ່ໃນຖົງໃສ 1 ລິດ. ສຳລັບລາຍການຄົບຖ້ວນ ເບິ່ງລິ້ງດ້ານລຸ່ມ.",
      zh: "常见随身行李禁止物品包括：锋利尖锐物品（刀具、超过6厘米的剪刀）、每个容器超过100毫升的液体、易燃或爆炸性物质、枪支和弹药，以及超大运动器材。液体（包括凝胶、喷雾、乳霜和糊状物）每个容器不超过100毫升，全部装入一个不超过1升的透明可密封袋。超过160瓦时的锂电池及备用/散装锂电池也不允许放入托运行李。完整清单及打包建议请参阅以下链接。",
    },
    links: [
      { label: { en: "Security Guide", lo: "ຄູ່ມືຄວາມປອດໄພ", zh: "安检指南" }, href: "/guides/security" },
      { label: { en: "Packing Guidelines", lo: "ຄຳແນະນຳການຈັດກະເປົ໋າ", zh: "行李打包指南" }, href: "/services/packing" },
    ],
  },
  {
    id: "c4",
    cat: "checkin",
    q: {
      en: "What should I do if my baggage is lost or damaged?",
      lo: "ຖ້າກະເປົ໋າຂ້ອຍເສຍ ຫຼື ເສຍຫາຍ, ຂ້ອຍຄວນເຮັດຫຍັງ?",
      zh: "如果我的行李丢失或损坏该怎么办？",
    },
    a: {
      en: "For lost baggage: do not leave the airport before reporting. Go directly to the Lost & Found desk in the arrivals hall with your boarding pass and baggage claim tag. Staff will file a Property Irregularity Report (PIR) and give you a reference number. Most delayed bags are located within 24–48 hours. For damaged baggage: report at the same desk before exiting the arrivals area — damage reported after leaving may not be accepted. You can also submit and track reports online through our Lost & Found service.",
      lo: "ສຳລັບກະເປົ໋າເສຍ: ຢ່າອອກຈາກສະໜາມບິນກ່ອນລາຍງານ. ໄປທີ່ໂຕະ Lost & Found ໃນ arrivals hall ພ້ອມ boarding pass ແລະ ບັດ claim ກະເປົ໋າ. ພະນັກງານຈະຂຽນ PIR ແລະ ໃຫ້ເລກອ້າງອີງ. ກະເປົ໋າທີ່ຊ້ານໂດຍທົ່ວໄປພົບພາຍໃນ 24-48 ຊ.ມ. ສຳລັບກະເປົ໋າເສຍຫາຍ: ລາຍງານທີ່ໂຕະດຽວກັນກ່ອນອອກ — ຄວາມເສຍຫາຍທີ່ລາຍງານຫຼັງຈາກອອກໄປ ອາດຈະບໍ່ໄດ້ຮັບການຮັບຮອງ. ທ່ານຍັງສາມາດສົ່ງ ແລະ ຕິດຕາມລາຍງານຜ່ານ Lost & Found ຂອງພວກເຮົາ.",
      zh: "行李丢失：请勿在报告前离开机场。携带登机牌和行李牌直接前往到达大厅的失物招领台，工作人员将填写财产异常报告（PIR）并提供参考编号。大多数延误行李会在24-48小时内找到。行李损坏：请在离开到达区之前在同一台前报告——离开后报告的损坏可能不被受理。您也可以通过我们的在线失物招领服务提交和追踪报告。",
    },
    links: [
      { label: { en: "Lost & Found Service", lo: "ບໍລິການ Lost & Found", zh: "失物招领服务" }, href: "/about/lost-found" },
    ],
  },

  // ── Security & Immigration ───────────────────────────────────────────────
  {
    id: "s1",
    cat: "security",
    q: {
      en: "What should I prepare for security screening?",
      lo: "ຂ້ອຍຄວນກຽມຫຍັງສຳລັບການກວດຄວາມປອດໄພ?",
      zh: "安检需要做哪些准备？",
    },
    a: {
      en: "To move through security quickly: (1) Remove laptops and tablets from your bag and place them separately in a tray. (2) Place all liquids, gels, and aerosols (max 100 ml each) in a clear resealable bag and take it out. (3) Remove belts, jackets, and bulky jewellery before the scanner. (4) Empty pockets of coins, keys, and phones. (5) Wear shoes that are easy to remove — officers may ask you to take them off. Passengers with medical devices (pacemakers, implants) should inform staff before screening. Full details are in our Security Guide.",
      lo: "ເພື່ອຜ່ານການກວດຄວາມປອດໄພໄດ້ໄວ: (1) ເອົາ laptop ແລະ tablet ອອກຈາກກາຍ ວາງໄວ້ໃນຖາດ. (2) ວາງຂອງເຫຼວ, ເຈວ ແລະ ສະເປຣ (ສູງສຸດ 100 ml) ໄວ້ໃນຖົງໃສ ແລ້ວເອົາອອກ. (3) ຖອດສາຍ, ເສື້ອນອກ ແລະ ເຄື່ອງປະດັບຂະໜາດໃຫຍ່. (4) ເອົາ ເຫຼັກ, ກຸນແຈ ແລະ ໂທລະສັບ ອອກຈາກຖົງ. (5) ໃສ່ເກີບທີ່ງ່າຍຕໍ່ການຖອດ. ຜູ້ໂດຍສານທີ່ມີອຸປະກອນທາງການແພດຄວນແຈ້ງພະນັກງານ.",
      zh: "快速通过安检的小贴士：(1)将笔记本电脑和平板电脑从包中取出，单独放入托盘；(2)将所有液体、凝胶和喷雾（每个不超过100毫升）放入透明可密封袋并取出；(3)摘除腰带、外套和大型首饰；(4)清空口袋中的硬币、钥匙和手机；(5)穿容易脱下的鞋子——安检员可能要求您脱鞋。携带医疗设备（心脏起搏器、植入物）的旅客应在检查前告知工作人员。详情请参阅我们的安检指南。",
    },
    links: [
      { label: { en: "Security Guide", lo: "ຄູ່ມືຄວາມປອດໄພ", zh: "安检指南" }, href: "/guides/security" },
    ],
  },
  {
    id: "s2",
    cat: "security",
    q: {
      en: "What documents do I need for international travel?",
      lo: "ຂ້ອຍຕ້ອງການເອກະສານຫຍັງສຳລັບການເດີນທາງສາກົນ?",
      zh: "国际旅行需要哪些证件？",
    },
    a: {
      en: "You need a valid passport with at least 6 months of remaining validity, your return ticket, and a valid visa if required by your destination country. Some destinations may also require health certificates.",
      lo: "ທ່ານຕ້ອງການ passport ທີ່ຍັງໃຊ້ໄດ້ຢ່າງໜ້ອຍ 6 ເດືອນ, ຕົ໋ວກັບ ແລະ ວີຊາທີ່ຖືກຕ້ອງຖ້າປາຍທາງຕ້ອງການ. ບາງປາຍທາງອາດຮຽກຮ້ອງໃບຢັ້ງຢືນສຸຂະພາບດ້ວຍ.",
      zh: "您需要有效护照（至少还有6个月有效期）、返程机票，以及目的地国家要求的有效签证。部分目的地还可能需要健康证明文件。",
    },
  },
  {
    id: "s3",
    cat: "security",
    q: {
      en: "How long does immigration and customs take?",
      lo: "ຂັ້ນຕອນດ່ານຕົວເຈົ້າ ແລະ ຕົ໋ວແຈ້ງໃຊ້ເວລານານຈັກໂມງ?",
      zh: "入境和海关手续需要多长时间？",
    },
    a: {
      en: "Under normal conditions, passport control and customs take about 20–40 minutes in total. During peak periods (public holidays, festival seasons, or when multiple international flights land simultaneously) allow up to 60–75 minutes. Tips to speed things up: have your passport open to the photo page, fill in your arrival card on the plane if provided, and declare any goods over the allowance before joining the queue. A full step-by-step arrival walkthrough is in our Arrivals Guide.",
      lo: "ພາຍໃຕ້ສະພາບທົ່ວໄປ, ດ່ານໜັງສືຜ່ານແດນ ແລະ ຕົ໋ວແຈ້ງ ໃຊ້ເວລາປະມານ 20-40 ນາທີທັງໝົດ. ໃນໄລຍະສູງສຸດ (ວັນພັກ, ງານບຸນ ຫຼື ເວລາທ່ຽວບິນສາກົນຫຼາຍສາຍລົງພ້ອມກັນ) ໃຫ້ຄິດໄວ້ 60-75 ນາທີ. ຄຳແນະນຳ: ເປີດ passport ໄວ້ທີ່ໜ້າຮູບ, ຕື່ມໃບ arrival card ໃນຍົນ ແລະ ປະກາດສິ່ງຂອງທີ່ເກີນກຳນົດ. ຄູ່ມືຂາເຂົ້າຂອງພວກເຮົາອະທິບາຍຂັ້ນຕອນຢ່າງລະອຽດ.",
      zh: "正常情况下，护照检查和海关手续共需约20-40分钟。旺季（节假日、节庆期间或多架国际航班同时落地时）请预留60-75分钟。加速通关小技巧：将护照翻到照片页、在飞机上填写入境卡（如有提供），并在排队前申报超出免税额的物品。完整的到达步骤说明请参阅我们的到达指南。",
    },
    links: [
      { label: { en: "Arrivals Guide", lo: "ຄູ່ມືຂາເຂົ້າ", zh: "到达指南" }, href: "/guides/arrivals" },
    ],
  },
  {
    id: "s4",
    cat: "security",
    q: {
      en: "Are there health screening requirements at the airport?",
      lo: "ສະໜາມບິນມີຂໍ້ກຳນົດການກວດສຸຂະພາບຫຍັງບໍ?",
      zh: "机场是否有健康检查要求？",
    },
    a: {
      en: "Health screening requirements depend on current public health guidelines and your destination country. Please check the latest travel requirements with your airline and the destination country's embassy before departing.",
      lo: "ຂໍ້ກຳນົດການກວດສຸຂະພາບຂຶ້ນຢູ່ກັບຄຳແນະນຳດ້ານສາທາລະນະສຸກທີ່ຕ່ຽວຂ້ອງ ແລະ ປາຍທາງຂອງທ່ານ. ກະລຸນາກວດສອບຂໍ້ກຳນົດລ່າສຸດກັບສາຍການບິນ ແລະ ສະຖານທູດປາຍທາງກ່ອນອອກເດີນທາງ.",
      zh: "健康筛查要求取决于当前的公共卫生指导方针和目的地国家的规定。出发前请向您的航空公司和目的地国家大使馆核实最新旅行要求。",
    },
  },

  // ── Services & Facilities ────────────────────────────────────────────────
  {
    id: "sv1",
    cat: "services",
    q: {
      en: "Is there Wi-Fi available at the airport?",
      lo: "ສະໜາມບິນມີ Wi-Fi ບໍ?",
      zh: "机场有Wi-Fi吗？",
    },
    a: {
      en: "Yes, complimentary Wi-Fi is available throughout the terminal. Connect to the 'BKIA_Free_WiFi' network and complete the simple registration to get online.",
      lo: "ມີ, Wi-Fi ຟຣີໃຫ້ບໍລິການທົ່ວ terminal. ເຊື່ອມຕໍ່ຫາ 'BKIA_Free_WiFi' ແລະ ລົງທະບຽນງ່າຍໆ ເພື່ອເຂົ້າໃຊ້ອິນເຕີເນັດ.",
      zh: "是的，候机楼全区提供免费Wi-Fi。连接 'BKIA_Free_WiFi' 网络并完成简单注册即可上网。",
    },
  },
  {
    id: "sv2",
    cat: "services",
    q: {
      en: "Are there restaurants and shops at the airport?",
      lo: "ສະໜາມບິນມີຮ້ານອາຫານ ແລະ ຮ້ານຄ້າຫຍັງບໍ?",
      zh: "机场内有餐厅和商店吗？",
    },
    a: {
      en: "Yes. The terminal has a mix of dining and retail options: local Lao cuisine, international fast food, a duty-free shop (for departing international passengers), a convenience store, a café, and a souvenir shop. Most outlets are airside (after security). The duty-free shop is only accessible to passengers departing on international flights. Operating hours vary — see our Facilities page for the current directory and opening hours.",
      lo: "ມີ. terminal ມີທາງເລືອກດ້ານອາຫານ ແລະ ຄ້າປີກ: ອາຫານລາວທ້ອງຖິ່ນ, ອາຫານຈານດ່ວນສາກົນ, ຮ້ານ duty-free (ສຳລັບຜູ້ໂດຍສານສາກົນຂາອອກ), ຮ້ານສະດວກ, ກາເຟ ແລະ ຮ້ານຂາຍສິນຄ້າທີ່ລະລຶກ. ເວລາເຮັດວຽກຕ່າງກັນ — ເຂົ້າໜ້າ ສິ່ງອຳນວຍຄວາມສະດວກ ຂອງພວກເຮົາ.",
      zh: "是的。候机楼内汇聚多种餐饮和零售选择：当地老挝美食、国际快餐、免税店（仅限国际出发旅客）、便利店、咖啡厅和纪念品商店。大多数商户位于安检后区域（隔离区）。免税店仅限乘坐国际航班出发的旅客进入。营业时间各异——请访问我们的设施页面查看最新目录和营业时间。",
    },
    links: [
      { label: { en: "Airport Facilities", lo: "ສິ່ງອຳນວຍຄວາມສະດວກ", zh: "机场设施" }, href: "/services/facilities" },
    ],
  },
  {
    id: "sv3",
    cat: "services",
    q: {
      en: "Is there a VIP Lounge available?",
      lo: "ມີ VIP Lounge ໃຫ້ໃຊ້ບໍ?",
      zh: "是否提供贵宾休息室？",
    },
    a: {
      en: "Yes. The BKIA VIP Lounge is located airside and offers complimentary food and beverages, comfortable seating, high-speed Wi-Fi, printing/scanning facilities, and private shower rooms. Access is included for business class ticket holders on participating airlines, and can also be purchased separately as a day pass. For access enquiries, rates, and opening hours, see our VIP Lounge page.",
      lo: "ມີ. ຫ້ອງ BKIA VIP Lounge ຕັ້ງຢູ່ airside ແລະ ໃຫ້ບໍລິການ: ອາຫານ ແລະ ເຄື່ອງດື່ມຟຣີ, ທີ່ນັ່ງສະດວກ, Wi-Fi ຄວາມໄວສູງ, ສິ່ງອຳນວຍຄວາມສະດວກພິມ/ສະແກນ ແລະ ຫ້ອງອາບນ້ຳສ່ວນຕົວ. ການເຂົ້າໃຊ້ ລວມຢູ່ໃນ business class ຂອງສາຍການບິນທີ່ຮ່ວມ ແລະ ຍັງສາມາດຊື້ day pass ແຍກຕ່າງຫາກ. ສຳລັບຂໍ້ມູນ, ລາຄາ ແລະ ເວລາເຮັດວຽກ ເຂົ້າໜ້າ VIP Lounge.",
      zh: "是的。BKIA贵宾休息室位于隔离区，提供免费餐饮、舒适座椅、高速Wi-Fi、打印/扫描设施及独立淋浴间。参与航空公司的商务舱旅客可免费使用，也可单独购买当日通票。如需了解进入资格、费用及营业时间，请访问贵宾休息室页面。",
    },
    links: [
      { label: { en: "VIP Lounge", lo: "ຫ້ອງ VIP Lounge", zh: "贵宾休息室" }, href: "/services/vip-lounge" },
    ],
  },
  {
    id: "sv4",
    cat: "services",
    q: {
      en: "Where can I find currency exchange?",
      lo: "ໂຕະແລກເງິນຢູ່ໃສ?",
      zh: "在哪里可以兑换货币？",
    },
    a: {
      en: "Currency exchange counters are located in the arrivals hall and near departure gates. We accept USD, EUR, THB, CNY, and other major currencies. ATMs are also available throughout the terminal.",
      lo: "ໂຕະແລກເງິນຕາຕັ້ງຢູ່ໃນ arrivals hall ແລະ ໃກ້ gate ອອກເດີນທາງ. ພວກເຮົາຮັບ USD, EUR, THB, CNY ແລະ ສະກຸນເງິນໃຫຍ່ອື່ນໆ. ຍັງມີ ATM ທົ່ວ terminal ຄ້ວຍ.",
      zh: "货币兑换柜台位于到达大厅和出发闸口附近，可兑换美元、欧元、泰铢、人民币及其他主要货币。候机楼全区也设有自动取款机。",
    },
  },

  // ── Transportation ───────────────────────────────────────────────────────
  {
    id: "t1",
    cat: "transport",
    q: {
      en: "How do I get from the airport to the city?",
      lo: "ຂ້ອຍຈະໄປຈາກສະໜາມບິນຫາເມືອງໄດ້ແນວໃດ?",
      zh: "如何从机场前往市区？",
    },
    a: {
      en: "The most convenient options are the metered taxis and fixed-price shuttle vans stationed at the arrivals exit. Fixed fares cover three main destinations: Ton Pheung city centre, Golden Triangle Special Economic Zone, and Huay Xai town. Rates are set and posted at the taxi desk — no haggling required. The journey to Ton Pheung centre takes approximately 15–20 minutes under normal traffic. For full fare details and vehicle types, see our Taxi & Shuttle page.",
      lo: "ທາງເລືອກທີ່ສະດວກທີ່ສຸດແມ່ນລົດແທັກຊີ ແລະ ລົດຕູ້ຮັບສົ່ງລາຄາຄົງທີ່ທີ່ຢູ່ທາງອອກ arrivals. ຄ່າຄົງທີ່ກວມລວມ 3 ປາຍທາງຫຼັກ: ໃຈກາງເມືອງຕົ້ນເຜິ້ງ, ເຂດ SEZ ສາມຫຼຽມຄຳ ແລະ ເມືອງຫ້ວຍຊາຍ. ລາຄາໄດ້ຮັບການຕັ້ງ ແລະ ສະແດງຢູ່ໂຕະແທັກຊີ. ການເດີນທາງໄປໃຈກາງຕົ້ນເຜິ້ງ ໃຊ້ເວລາປະມານ 15-20 ນາທີ.",
      zh: "最便捷的选择是停靠在到达出口处的计价出租车和固定价格小巴。固定票价涵盖三个主要目的地：屯丰市中心、金三角经济特区和会晒城区。价格已公示在出租车服务台，无需议价。前往屯丰市中心正常行驶约需15-20分钟。完整票价和车型信息请参阅出租车页面。",
    },
    links: [
      { label: { en: "Taxi & Shuttle", lo: "ແທັກຊີ ແລະ ລົດຮັບສົ່ງ", zh: "出租车与接送" }, href: "/services/taxi" },
    ],
  },
  {
    id: "t2",
    cat: "transport",
    q: {
      en: "Is parking available at the airport?",
      lo: "ສະໜາມບິນມີທີ່ຈອດລົດຫຍັງບໍ?",
      zh: "机场有停车场吗？",
    },
    a: {
      en: "Yes. The airport car park is open 24/7, located directly in front of the terminal. It accommodates both private cars and vans/minibuses. Fees are charged per 2-hour block, with a daily cap for longer stays. Payment is accepted in LAK, THB, and CNY. For current rates and a map of the parking zones, see our Parking page.",
      lo: "ມີ. ລານຈອດລົດສະໜາມບິນເປີດ 24/7, ຕັ້ງຢູ່ຕ່ຳໜ້ານ terminal. ຮອງຮັບທັງລົດໃຫຍ່ ແລະ ລົດຕູ້/ລົດ mini. ຄ່າຈ່າຍຕໍ່ 2 ຊ.ມ, ມີ cap ລາຍວັນ. ຮັບຊຳລະໃນ LAK, THB ແລະ CNY. ສຳລັບລາຄາ ແລະ ແຜນທີ່ເຂດ, ເຂົ້າໜ້າ ທີ່ຈອດລົດ ຂອງພວກເຮົາ.",
      zh: "是的。机场停车场全天候开放，位于候机楼正前方，可停放私家车及面包车/小巴。按每2小时计费，长时间停放设有每日上限。支持老挝基普、泰铢和人民币支付。当前收费标准和停车区域地图请参阅停车场页面。",
    },
    links: [
      { label: { en: "Parking Info & Map", lo: "ຂໍ້ມູນທີ່ຈອດລົດ ແລະ ແຜນທີ່", zh: "停车信息与地图" }, href: "/services/parking" },
    ],
  },
  {
    id: "t3",
    cat: "transport",
    q: {
      en: "Can I pre-book a taxi from the airport?",
      lo: "ຂ້ອຍສາມາດຈອງລົດແທັກຊີລ່ວງໜ້າຈາກສະໜາມບິນໄດ້ບໍ?",
      zh: "可以提前预约机场出租车吗？",
    },
    a: {
      en: "Yes. You can pre-book a taxi or shuttle van by calling the airport at +856 84 260 179. Provide your flight number and arrival time and a vehicle will be waiting for you at the arrivals exit. Walk-up taxis and vans are also available at the taxi stand outside arrivals without any booking — just approach the desk, choose your destination, and pay the fixed fare. See our Taxi page for vehicle options and all destination fares.",
      lo: "ໄດ້. ທ່ານສາມາດຈອງລ່ວງໜ້າໂດຍໂທ +856 84 260 179. ໃຫ້ໝາຍເລກທ່ຽວບິນ ແລະ ເວລາຮອດ ແລ້ວລົດຈະລໍຖ້າທ່ານ. ລົດແທັກຊີ walk-up ຍັງມີຢູ່ທີ່ station ທາງນອກ arrivals ໂດຍບໍ່ຕ້ອງຈອງ — ພຽງໄປທີ່ໂຕະ, ເລືອກປາຍທາງ ແລະ ຈ່າຍຄ່ານ້ຳ.",
      zh: "是的。您可以拨打+856 84 260 179提前预约出租车或小巴，提供航班号和预计到达时间，车辆将在到达出口等候。无需预约也可直接前往到达区外的出租车候车处——走到服务台，选择目的地，按固定价格付款即可。车型选择和目的地票价详情请参阅出租车页面。",
    },
    links: [
      { label: { en: "Taxi & Shuttle Fares", lo: "ລາຄາແທັກຊີ ແລະ ລົດຮັບສົ່ງ", zh: "出租车票价" }, href: "/services/taxi" },
    ],
  },
  {
    id: "t4",
    cat: "transport",
    q: {
      en: "Are there car rental services at the airport?",
      lo: "ສະໜາມບິນມີບໍລິການເຊົ່າລົດຫຍັງບໍ?",
      zh: "机场是否提供汽车租赁服务？",
    },
    a: {
      en: "Car rental services are available at the airport. Please enquire at the information desk in the arrivals hall for current providers and rates.",
      lo: "ບໍລິການເຊົ່າລົດໃຫ້ຢູ່ສະໜາມບິນ. ກະລຸນາສອບຖາມທີ່ໂຕະຂໍ້ມູນຂ່າວສານໃນ arrivals hall ສຳລັບຜູ້ໃຫ້ບໍລິການ ແລະ ລາຄາໃນປັດຈຸບັນ.",
      zh: "机场提供汽车租赁服务。请在到达大厅的信息台咨询当前租车供应商和价格。",
    },
  },
];
