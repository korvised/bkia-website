import {
  Bell,
  Building2,
  Car,
  LucideIcon,
  Luggage,
  Plane,
} from "lucide-react";
import type { MultilingualText } from "@/types/language";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SearchableItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  url: string;
  category: MultilingualText;
  icon: LucideIcon;
  keywords: { en: string[]; lo: string[]; zh: string[] };
}

// ── Category meta ──────────────────────────────────────────────────────────────

const CAT = {
  flights: {
    icon: Plane as LucideIcon,
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
  },
  guides: {
    icon: Luggage as LucideIcon,
    label: { en: "Passenger Guide", lo: "ຄູ່ມືຜູ້ໂດຍສານ", zh: "乘客指南" },
  },
  transports: {
    icon: Car as LucideIcon,
    label: { en: "Transport", lo: "ການຂົນສົ່ງ", zh: "交通" },
  },
  support: {
    icon: Bell as LucideIcon,
    label: { en: "Support", lo: "ຊ່ວຍເຫຼືອ", zh: "客户支持" },
  },
  about: {
    icon: Building2 as LucideIcon,
    label: { en: "About", lo: "ກ່ຽວກັບ", zh: "关于我们" },
  },
} as const;

type CatKey = keyof typeof CAT;

function item(
  id: string,
  cat: CatKey,
  title: MultilingualText,
  description: MultilingualText,
  url: string,
  keywords: { en: string[]; lo: string[]; zh: string[] },
): SearchableItem {
  return {
    id,
    title,
    description,
    url,
    category: CAT[cat].label,
    icon: CAT[cat].icon,
    keywords,
  };
}

// ── Comprehensive search item list ─────────────────────────────────────────────
//
//  ID convention: <category>-<slug>  (getCategoryKey splits on first "-")
//  URL: path only — the [lang] prefix is added by the dialog component.

export const allSearchItems: SearchableItem[] = [
  // ════════════════════════════════════════════════════════
  //  FLIGHTS
  // ════════════════════════════════════════════════════════

  item(
    "flights-departures",
    "flights",
    { en: "Departures", lo: "ຖ້ຽວບິນອອກ", zh: "出发航班" },
    {
      en: "Check real-time departing flight status",
      lo: "ກວດສອບສະຖານະຖ້ຽວບິນອອກໃນເວລາຈິງ",
      zh: "查看实时出发航班状态",
    },
    "/flights/departures",
    {
      en: ["departures", "departing flights", "flight board", "flight status", "departure time", "outbound"],
      lo: ["ຖ້ຽວບິນອອກ", "ຂາອອກ", "ຕາຕະລາງ", "ເວລາ", "ສະຖານະ", "ຜ່ານ", "ດ່ານ"],
      zh: ["出发", "出发航班", "航班状态", "起飞", "离港", "时刻表"],
    },
  ),

  item(
    "flights-arrivals",
    "flights",
    { en: "Arrivals", lo: "ຖ້ຽວບິນຂາເຂົ້າ", zh: "到达航班" },
    {
      en: "Check real-time arriving flight status",
      lo: "ກວດສອບສະຖານະຖ້ຽວບິນຂາເຂົ້າໃນເວລາຈິງ",
      zh: "查看实时到达航班状态",
    },
    "/flights/arrivals",
    {
      en: ["arrivals", "arriving flights", "landing", "inbound", "flight status", "arrival time"],
      lo: ["ຖ້ຽວບິນຂາເຂົ້າ", "ຂາເຂົ້າ", "ໄລ", "ມາຮອດ", "ສະຖານະ", "ລ່ານດ"],
      zh: ["到达", "到达航班", "入港", "降落", "航班动态", "抵达"],
    },
  ),

  item(
    "flights-schedules",
    "flights",
    { en: "Flight Schedules", lo: "ຕາຕະລາງຖ້ຽວບິນ", zh: "航班时刻表" },
    {
      en: "View all flight timetables and weekly schedules",
      lo: "ເບິ່ງຕາຕະລາງຖ້ຽວບິນ ແລະ ຕາຕະລາງລາຍອາທິດ",
      zh: "查看所有航班时刻表和每周航班计划",
    },
    "/flights/schedules",
    {
      en: ["schedules", "timetable", "flight schedule", "weekly flights", "seasonal", "routes"],
      lo: ["ຕາຕະລາງ", "ຖ້ຽວບິນ", "ລາຍອາທິດ", "ເສັ້ນທາງ", "ລະດູ"],
      zh: ["时刻表", "航班计划", "周班", "航线", "季节性航班"],
    },
  ),

  item(
    "flights-airlines",
    "flights",
    { en: "Airlines", lo: "ສາຍການບິນ", zh: "航空公司" },
    {
      en: "Airlines operating at Bokeo International Airport",
      lo: "ສາຍການບິນທີ່ໃຫ້ບໍລິການທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      zh: "在博胶国际机场运营的航空公司",
    },
    "/flights/airlines",
    {
      en: ["airlines", "airline", "carrier", "operators", "hotline", "airline contact", "lao airlines", "lak airlines"],
      lo: ["ສາຍການບິນ", "ການບິນ", "ຜູ້ປະກອບການ", "ສາຍ", "ເບີໂທ", "ຕິດຕໍ່"],
      zh: ["航空公司", "承运人", "运营商", "联系方式", "老挝航空"],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  DEPARTURE GUIDE — overview
  // ════════════════════════════════════════════════════════

  item(
    "guides-departures",
    "guides",
    { en: "Departure Guide", lo: "ຄູ່ມືຂາອອກ", zh: "出发指南" },
    {
      en: "Step-by-step guide for departing passengers",
      lo: "ຄຳແນະນຳທີລະຂັ້ນຕອນສຳລັບຜູ້ໂດຍສານຂາອອກ",
      zh: "离境旅客分步指南",
    },
    "/guides/departures",
    {
      en: ["departure guide", "departure procedures", "how to depart", "departing passenger"],
      lo: ["ຄູ່ມືຂາອອກ", "ຂັ້ນຕອນຂາອອກ", "ຜູ້ໂດຍສານ", "ໄປສ"],
      zh: ["出发指南", "离境流程", "出发手续", "离港"],
    },
  ),

  // ── Departure Tab 1: Check-in ──────────────────────────

  item(
    "guides-checkin",
    "guides",
    { en: "Check-in", lo: "ແຈ້ງປີ້", zh: "办理登机" },
    {
      en: "Counter check-in procedures, boarding pass, counter hours",
      lo: "ຂັ້ນຕອນການແຈ້ງປີ້, ບັດຂຶ້ນເຄື່ອງ, ເວລາເປີດ-ປິດ ເຄົາເຕີ",
      zh: "柜台值机流程、登机牌、柜台开放时间",
    },
    "/guides/departures?tab=checkin",
    {
      en: [
        "check-in", "checkin", "check in", "boarding pass", "counter",
        "check-in counter", "airline counter", "luggage drop",
        "counter hours", "check-in time", "departure check-in",
      ],
      lo: [
        "ແຈ້ງປີ້", "ແຈ້ງ", "ປີ້", "ບັດຂຶ້ນເຄື່ອງ", "ເຄົາເຕີ",
        "ໄດ້ຮັບ", "ເວລາ", "ເປີດ", "ເຊັກອິນ", "ຖ້ຽວ",
        "ຄ້ານ", "ກ້ານ", "ໜ້າ",
      ],
      zh: [
        "值机", "办理登机", "值机柜台", "登机牌",
        "行李托运", "柜台", "开放时间", "登机手续",
      ],
    },
  ),

  // ── Departure Tab 2: Baggage ───────────────────────────

  item(
    "guides-baggage-dep",
    "guides",
    { en: "Baggage (Departure)", lo: "ກະເປົາເດີນທາງ", zh: "行李（出发）" },
    {
      en: "Baggage allowance, weight limits, prohibited and restricted items",
      lo: "ນ້ຳໜັກກະເປົາ, ຂ້ຳຈຳກັດ, ສິ່ງຂອງຫ້າມ ແລະ ຈຳກັດ",
      zh: "行李额度、重量限制、禁止及限制物品",
    },
    "/guides/departures?tab=baggage",
    {
      en: [
        "baggage", "luggage", "weight limit", "baggage allowance",
        "hand carry", "cabin baggage", "checked baggage", "excess baggage",
        "prohibited items", "valuables", "fragile", "liquids", "dimensions",
        "7kg", "20kg", "30kg",
      ],
      lo: [
        "ກະເປົາ", "ນ້ຳໜັກ", "ຂ້ຳ", "ຈຳກັດ", "ຖື",
        "ຫ້ອງໂດຍສານ", "ສ່ວນເກີນ", "ສິ່ງຂອງ",
        "ຫ້ານ", "ເຄື່ອງ", "ເດີນທາງ",
      ],
      zh: [
        "行李", "重量", "行李额", "手提行李", "随身行李",
        "托运行李", "超重", "违禁品", "贵重物品", "液体限制",
      ],
    },
  ),

  // ── Departure Tab 3: Security Check ───────────────────

  item(
    "guides-security-dep",
    "guides",
    { en: "Security Screening", lo: "ຈຸດກວດຄົ້ນ", zh: "安检" },
    {
      en: "Security checkpoint procedures, LAGs rules, prohibited items",
      lo: "ຂັ້ນຕອນຈຸດກວດຄົ້ນ, ກົດລະບຽບ LAGs, ສິ່ງຂອງຫ້ານ",
      zh: "安检程序、液体限制规定、禁止物品",
    },
    "/guides/departures?tab=security",
    {
      en: [
        "security", "security check", "screening", "security checkpoint",
        "LAGs", "liquids aerosols gels", "100ml", "x-ray", "metal detector",
        "prohibited", "restricted", "body scan",
      ],
      lo: [
        "ກວດຄົ້ນ", "ຄວາມປອດໄພ", "ດ່ານ", "ຂອງເຫຼວ", "ຕ້ອງ",
        "X-ray", "ໂລຫະ", "ຫ້ານ", "ສຳຫຼວດ", "ສາຍ",
      ],
      zh: [
        "安检", "安全检查", "液体限制", "100毫升", "X光",
        "金属探测", "违禁物品", "安检程序",
      ],
    },
  ),

  // ── Departure Tab 4: Immigration ──────────────────────

  item(
    "guides-immigration-dep",
    "guides",
    { en: "Immigration (Departure)", lo: "ກວດຄົນເຂົ້າ-ອອກເມືອງ", zh: "边检（出境）" },
    {
      en: "Departure immigration, LDIF digital form, passport and visa requirements",
      lo: "ດ່ານກວດຄົນຂາອອກ, ແບບຟອມ LDIF, ໜັງສືຜ່ານແດນ ແລະ ວີຊ້າ",
      zh: "出境边检、LDIF数字表格、护照及签证要求",
    },
    "/guides/departures?tab=immigration",
    {
      en: [
        "immigration", "border control", "departure immigration",
        "LDIF", "digital immigration form", "passport", "visa",
        "departure card", "overstay", "currency declaration",
      ],
      lo: [
        "ກວດຄົນ", "ຫນ່ວຍ", "ໜັງສືຜ່ານແດນ", "ວີຊ້າ",
        "LDIF", "ແບບຟອມ", "ດ່ານ", "ອ່ານ", "ເງິນ",
        "ຖ່ານ", "ຂ້າມ", "ເດີນທາງ",
      ],
      zh: [
        "边检", "出境检查", "护照", "签证", "LDIF",
        "数字移民表格", "出境卡", "超期逗留", "货币申报",
      ],
    },
  ),

  // ── Departure Tab 5: Boarding ─────────────────────────

  item(
    "guides-boarding",
    "guides",
    { en: "Boarding", lo: "ຂຶ້ນເຮືອບິນ", zh: "登机" },
    {
      en: "Boarding process, gate times, priority boarding, in-flight rules",
      lo: "ຂັ້ນຕອນຂຶ້ນເຮືອບິນ, ເວລາປະຕູ, ກຸ່ມຂຶ້ນກ່ອນ, ກົດລະບຽບໃນເຮືອ",
      zh: "登机流程、登机口时间、优先登机、机上规定",
    },
    "/guides/departures?tab=boarding",
    {
      en: [
        "boarding", "gate", "boarding pass", "priority boarding",
        "boarding groups", "boarding time", "gate closes",
        "in-flight", "flight rules", "seatbelt", "airplane mode",
      ],
      lo: [
        "ຂຶ້ນ", "ເຮືອ", "ເຮືອບິນ", "ປະຕູ", "ກຸ່ມ",
        "ກ່ອນ", "ເວລາ", "ກົດ", "ລະບຽບ", "ເຂັມຂັດ",
      ],
      zh: [
        "登机", "登机口", "优先登机", "登机顺序",
        "登机时间", "机上规定", "安全带", "飞行模式",
      ],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  ARRIVAL GUIDE — overview
  // ════════════════════════════════════════════════════════

  item(
    "guides-arrivals",
    "guides",
    { en: "Arrival Guide", lo: "ຄູ່ມືຂາເຂົ້າ", zh: "到达指南" },
    {
      en: "Step-by-step guide for arriving passengers",
      lo: "ຄຳແນະນຳທີລະຂັ້ນຕອນສຳລັບຜູ້ໂດຍສານຂາເຂົ້າ",
      zh: "抵达旅客分步指南",
    },
    "/guides/arrivals",
    {
      en: ["arrival guide", "arriving", "arrival procedures", "arriving passenger"],
      lo: ["ຄູ່ມືຂາເຂົ້າ", "ຂັ້ນຕອນຂາເຂົ້າ", "ມາຮອດ", "ເຂົ້າ"],
      zh: ["到达指南", "入境流程", "到达手续", "抵达"],
    },
  ),

  // ── Arrival Tab 1: Arrival at Airport ─────────────────

  item(
    "guides-arrival-airport",
    "guides",
    { en: "Arrival at Airport", lo: "ມາຮອດສະໜາມບິນ", zh: "抵达机场" },
    {
      en: "Disembarkation, first steps, airport facilities on arrival",
      lo: "ການລົງຈາກເຮືອບິນ, ຂັ້ນຕອນທຳອິດ, ສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "下机、入境第一步、机场设施",
    },
    "/guides/arrivals?tab=airport",
    {
      en: [
        "arrival", "disembarkation", "disembark", "landing",
        "first steps", "arrival hall", "health screening",
        "wheelchair", "porter", "lost and found", "emergency",
      ],
      lo: [
        "ມາຮອດ", "ລົງ", "ຂັ້ນຕອນ", "ທຳອິດ",
        "ບໍລິການ", "ຊ່ວຍເຫຼືອ", "ພາຍໃນ", "ສຸຂະພາບ",
      ],
      zh: [
        "抵达", "下机", "第一步", "入境大厅",
        "健康检查", "轮椅", "行李员", "急救",
      ],
    },
  ),

  // ── Arrival Tab 2: Border Inspection ──────────────────

  item(
    "guides-border-inspection",
    "guides",
    { en: "Border Inspection (Arrival)", lo: "ກວດຄົນເຂົ້າ-ອອກເມືອງ", zh: "边检（入境）" },
    {
      en: "Entry immigration, LDIF form, visa categories, entry requirements",
      lo: "ດ່ານກວດຄົນຂາເຂົ້າ, ແບບຟອມ LDIF, ປະເພດວີຊ້າ, ຂໍ້ກຳນົດ",
      zh: "入境边检、LDIF表格、签证类别、入境要求",
    },
    "/guides/arrivals?tab=border-inspection",
    {
      en: [
        "immigration", "border inspection", "entry immigration",
        "LDIF", "visa", "visa on arrival", "e-visa", "tourist visa",
        "passport", "entry requirements", "visa exemption",
        "business visa", "transit visa",
      ],
      lo: [
        "ກວດຄົນ", "ດ່ານ", "ໜັງສືຜ່ານແດນ", "ວີຊ້າ",
        "LDIF", "ທ່ອງທ່ຽວ", "ທຸລະກິດ", "ຂ້ຳ",
        "ຂໍ້ກຳນົດ", "ທ່ານສາ", "ລາວ",
      ],
      zh: [
        "边检", "入境检查", "护照", "签证", "LDIF",
        "落地签", "电子签", "旅游签", "商务签",
        "过境签", "免签", "入境要求",
      ],
    },
  ),

  // ── Arrival Tab 3: Baggage Claim ──────────────────────

  item(
    "guides-baggage-claim",
    "guides",
    { en: "Baggage Claim", lo: "ຮັບກະເປົາ", zh: "行李提取" },
    {
      en: "Collecting luggage, carousel, lost or damaged baggage",
      lo: "ຮັບກະເປົາ, ສາຍສົ່ງ, ກະເປົາເສຍ ຫຼື ເສຍຫາຍ",
      zh: "领取行李、传送带、丢失或损坏行李",
    },
    "/guides/arrivals?tab=baggage-claim",
    {
      en: [
        "baggage claim", "luggage claim", "carousel",
        "lost baggage", "missing luggage", "damaged baggage",
        "PIR", "property irregularity", "baggage tag", "claim tag",
        "oversized baggage", "sports equipment",
      ],
      lo: [
        "ຮັບກະເປົາ", "ກະເປົາ", "ສາຍ", "ເສຍ",
        "ເສຍຫາຍ", "ລາຍງານ", "ແທັກ", "ໃຫຍ່",
      ],
      zh: [
        "行李提取", "行李", "传送带", "丢失行李",
        "损坏行李", "财产不规则报告", "行李标签",
        "超大行李",
      ],
    },
  ),

  // ── Arrival Tab 4: Customs Inspection ─────────────────

  item(
    "guides-customs-inspection",
    "guides",
    { en: "Customs Inspection", lo: "ກວດພາສີ", zh: "海关检查" },
    {
      en: "Green/Red channel, duty-free allowances, prohibited imports",
      lo: "ຊ່ອງສີຂຽວ/ສີແດງ, ຂ້ຳຍົກເວັ້ນອາກອນ, ສິ່ງຂອງຫ້ານ",
      zh: "绿色/红色通道、免税额度、禁止进口物品",
    },
    "/guides/arrivals?tab=customs-inspection",
    {
      en: [
        "customs", "customs inspection", "green channel", "red channel",
        "duty-free", "duty free", "allowance", "declare", "declaration",
        "tobacco", "alcohol", "cigarettes", "currency", "narcotics",
        "prohibited imports", "wildlife",
      ],
      lo: [
        "ພາສີ", "ກວດ", "ສີຂຽວ", "ສີແດງ", "ຊ່ອງ",
        "ຍົກເວັ້ນ", "ແຈ້ງ", "ຢາສູບ", "ເຫຼົ້າ",
        "ເງິນຕາ", "ຫ້ານ", "ສິ່ງຂອງ",
      ],
      zh: [
        "海关", "海关检查", "绿色通道", "红色通道",
        "免税", "免税额度", "申报", "烟草", "酒精",
        "货币申报", "违禁品", "毒品",
      ],
    },
  ),

  // ── Arrival Tab 5: Leaving Airport ────────────────────

  item(
    "guides-leaving",
    "guides",
    { en: "Leaving the Airport", lo: "ອອກຈາກສະໜາມບິນ", zh: "离开机场" },
    {
      en: "Taxis, transport options, orientation and cultural tips",
      lo: "ແທັກຊີ, ທາງເລືອກການຂົນສົ່ງ, ຂໍ້ມູນທ້ອງຖິ່ນ",
      zh: "出租车、交通选择、当地信息与文化贴士",
    },
    "/guides/arrivals?tab=leaving",
    {
      en: [
        "leaving airport", "exit airport", "taxi", "transport",
        "shuttle", "getting around", "orientation", "currency exchange",
        "ATM", "SIM card", "hotel", "time zone", "emergency contacts",
      ],
      lo: [
        "ອອກ", "ແທັກຊີ", "ຂົນສົ່ງ", "ເງິນ",
        "ATM", "ໂຮງແຮມ", "ທ້ອງຖິ່ນ", "ສຸກເສີນ",
      ],
      zh: [
        "离开机场", "出租车", "交通", "货币兑换",
        "ATM", "SIM卡", "酒店", "时区", "紧急联系",
      ],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  AIRPORT SECURITY (standalone page)
  // ════════════════════════════════════════════════════════

  item(
    "guides-security",
    "guides",
    { en: "Airport Security", lo: "ຄວາມປອດໄພສະໜາມບິນ", zh: "机场安检须知" },
    {
      en: "Full security guidelines, prohibited items list, security checkpoint process",
      lo: "ຄຳແນະນຳຄວາມປອດໄພ, ລາຍການສິ່ງຂອງຫ້ານ, ຂັ້ນຕອນດ່ານກວດ",
      zh: "完整安检指南、违禁品清单、安检程序",
    },
    "/guides/security",
    {
      en: [
        "airport security", "security guidelines", "prohibited items",
        "LAGs", "liquids", "weapons", "explosives", "sharp objects",
        "security rules", "x-ray", "body scanner", "smoking", "restricted areas",
      ],
      lo: [
        "ຄວາມປອດໄພ", "ກົດລະບຽບ", "ຫ້ານ", "ສິ່ງຂອງ",
        "ອາວຸດ", "ໄດນາໄມ", "ຂອງເຫຼວ", "ສູບຢາ",
      ],
      zh: [
        "安检", "安全规定", "违禁品", "液体限制",
        "武器", "爆炸物", "锋利物品", "吸烟", "限制区域",
      ],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  FACILITIES & SERVICES
  // ════════════════════════════════════════════════════════

  item(
    "guides-facilities",
    "guides",
    { en: "Facilities & Services", lo: "ສິ່ງອຳນວຍຄວາມສະດວກ", zh: "设施与服务" },
    {
      en: "Airport amenities: dining, shopping, WiFi, lounges, ATM",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ: ອາຫານ, ຊອບປິ້ງ, WiFi, ຫ້ອງພັກ, ATM",
      zh: "机场设施：餐饮、购物、WiFi、候机室、ATM",
    },
    "/guides/facilities",
    {
      en: [
        "facilities", "services", "amenities", "dining", "restaurant",
        "cafe", "shopping", "duty-free shop", "WiFi", "free wifi",
        "lounge", "VIP lounge", "ATM", "currency exchange", "restroom",
        "prayer room", "nursing room", "smoking area",
      ],
      lo: [
        "ສິ່ງ", "ອຳນວຍ", "ຄວາມສະດວກ", "ອາຫານ",
        "WiFi", "ຫ້ອງ", "ATM", "ຮ້ານ", "ໂທລະສັບ",
      ],
      zh: [
        "设施", "服务", "餐厅", "咖啡厅", "购物",
        "免税店", "WiFi", "贵宾室", "ATM", "货币兑换",
        "洗手间", "祈祷室",
      ],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  CUSTOM SERVICES
  // ════════════════════════════════════════════════════════

  item(
    "guides-custom-services",
    "guides",
    { en: "Custom Services", lo: "ບໍລິການພິເສດ", zh: "定制服务" },
    {
      en: "Special assistance for passengers with specific needs",
      lo: "ການບໍລິການພິເສດສຳລັບຜູ້ໂດຍສານທີ່ມີຄວາມຕ້ອງການສະເພາະ",
      zh: "为有特殊需求的旅客提供专属服务",
    },
    "/guides/custom-services",
    {
      en: ["special assistance", "custom services", "special needs", "disabled", "elderly", "pregnant", "infants", "pets"],
      lo: ["ພິເສດ", "ຊ່ວຍເຫຼືອ", "ຄວາມຕ້ອງການ", "ຜູ້ສູງ", "ເດັກ", "ສັດ"],
      zh: ["特殊服务", "专属协助", "残障", "老年人", "孕妇", "婴儿", "宠物"],
    },
  ),

  item(
    "guides-pregnancy",
    "guides",
    { en: "Pregnant Women & Infants", lo: "ແມ່ຍິງຖືພາ ແລະ ແອນ້ອຍ", zh: "孕妇及婴儿服务" },
    {
      en: "Airport services and facilities for pregnant women and families with infants",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ການບໍລິການສຳລັບແມ່ຍິງຖືພາ ແລະ ຄອບຄົວ",
      zh: "为孕妇及婴儿家庭提供的机场服务与设施",
    },
    "/guides/custom-services/pregnancy-and-children",
    {
      en: [
        "pregnant", "pregnancy", "infants", "baby", "children",
        "nursing room", "pram", "stroller", "bassinet", "infant",
        "traveling with children", "family",
      ],
      lo: [
        "ຖືພາ", "ແມ່ຍິງ", "ແອນ້ອຍ", "ເດັກ",
        "ຄອບຄົວ", "ນົມ", "ລົດ", "ລ້ຽງ",
      ],
      zh: [
        "孕妇", "婴儿", "儿童", "哺乳室", "婴儿车",
        "婴儿摇篮", "家庭出行",
      ],
    },
  ),

  item(
    "guides-mobility",
    "guides",
    { en: "Mobility Assistance", lo: "ບໍລິການຊ່ວຍເຫຼືອຜູ້ສູງອາຍຸ ແລະ ຜູ້ພິການ", zh: "无障碍助残服务" },
    {
      en: "Dedicated assistance for elderly passengers and travellers with disabilities",
      lo: "ການຊ່ວຍເຫຼືອສຳລັບຜູ້ສູງອາຍຸ ແລະ ຜູ້ໂດຍສານທີ່ມີຄວາມພິການ",
      zh: "为老年人及残障旅客提供的专用协助",
    },
    "/guides/custom-services/mobility-challenges",
    {
      en: [
        "wheelchair", "disability", "disabled", "elderly", "mobility",
        "special assistance", "accessibility", "ramp", "assistance request",
        "mobility aid",
      ],
      lo: [
        "ລົດຄົນເຈັບ", "ພິການ", "ສູງອາຍຸ", "ຜູ້ສູງ",
        "ຊ່ວຍ", "ການເຄື່ອນທີ່", "ໂຕ",
      ],
      zh: [
        "轮椅", "残障", "老年人", "无障碍",
        "特殊协助", "行动辅助", "坡道",
      ],
    },
  ),

  item(
    "guides-pets",
    "guides",
    { en: "Traveling with Pets", lo: "ການເດີນທາງກັບສັດລ້ຽງ", zh: "携带宠物旅行" },
    {
      en: "Guidelines, documentation and procedures for travelling with pets",
      lo: "ຄຳແນະນຳ, ເອກະສານ ແລະ ຂັ້ນຕອນສຳລັບການເດີນທາງກັບສັດລ້ຽງ",
      zh: "携带宠物旅行的指南、所需文件及程序",
    },
    "/guides/custom-services/traveling-with-pets",
    {
      en: [
        "pets", "dog", "cat", "animal", "traveling with pets",
        "pet carrier", "veterinary certificate", "health certificate",
        "pet travel", "cage", "kennel",
      ],
      lo: [
        "ສັດ", "ໝາ", "ແມວ", "ສັດລ້ຽງ",
        "ໃບ", "ຢັ້ງຢືນ", "ສາຍ", "ກ່ອງ",
      ],
      zh: [
        "宠物", "狗", "猫", "携带动物",
        "宠物航空箱", "兽医证明", "健康证书",
      ],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  TRANSPORTS
  // ════════════════════════════════════════════════════════

  item(
    "transports-to-from",
    "transports",
    { en: "To & From Airport", lo: "ຮັບ-ສົ່ງ ສະໜາມບິນ", zh: "往返机场" },
    {
      en: "Taxi, shuttle and van services to and from the airport",
      lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ຮັບ-ສົ່ງ ສະໜາມບິນ",
      zh: "往返机场的出租车、摆渡车及面包车服务",
    },
    "/transports/to-from-airport",
    {
      en: [
        "taxi", "shuttle", "van", "transportation", "transport to airport",
        "how to get to airport", "airport transfer", "minibus",
        "getting to airport", "airport bus", "pick up",
      ],
      lo: [
        "ແທັກຊີ", "ລົດ", "ຮັບ", "ສົ່ງ", "ຂົນສົ່ງ",
        "ໄປ", "ຈາກ", "ສະໜາມບິນ", "ຕູ້",
      ],
      zh: [
        "出租车", "接送", "摆渡车", "面包车",
        "机场交通", "如何前往机场", "机场大巴",
      ],
    },
  ),

  item(
    "transports-parking",
    "transports",
    { en: "Parking", lo: "ບ່ອນຈອດລົດ", zh: "停车场" },
    {
      en: "Parking rates, facilities and reservations at the airport",
      lo: "ອັດຕາຄ່າຈອດລົດ, ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ການຈອງ",
      zh: "机场停车费率、设施及预订",
    },
    "/transports/parking",
    {
      en: [
        "parking", "car park", "parking rate", "parking fee",
        "short-term parking", "long-term parking", "drop-off",
        "park and ride", "parking reservation",
      ],
      lo: [
        "ຈອດ", "ລົດ", "ບ່ອນ", "ຄ່າ",
        "ລາຄາ", "ໄລຍະ", "ຍາວ", "ສັ້ນ",
      ],
      zh: [
        "停车", "停车场", "停车费", "短期停车",
        "长期停车", "接送区", "停车预订",
      ],
    },
  ),

  item(
    "transports-regional",
    "transports",
    { en: "Regional Connection", lo: "ການເຊື່ອມຕໍ່ພາກພື້ນ", zh: "区域连接" },
    {
      en: "Cross-border transport to Thailand, Myanmar and other destinations",
      lo: "ການຂົນສົ່ງຂ້າມແດນໄທ, ມຽນມາ ແລະ ຈຸດໝາຍອື່ນໆ",
      zh: "前往泰国、缅甸及其他目的地的跨境交通",
    },
    "/transports/regional",
    {
      en: [
        "regional transport", "cross-border", "Thailand", "Myanmar",
        "GTSEZ", "Golden Triangle", "Chiang Rai", "Mae Sai",
        "border crossing",
      ],
      lo: [
        "ຂ້າມແດນ", "ໄທ", "ມຽນມາ", "ພາກພື້ນ",
        "ເຊຕ", "ສາມຫຼ່ຽມ", "ທອງ", "ແດນ",
      ],
      zh: [
        "跨境", "泰国", "缅甸", "区域交通",
        "金三角", "清莱", "湄赛", "边境口岸",
      ],
    },
  ),

  item(
    "transports-contacts",
    "transports",
    { en: "Transport Contacts", lo: "ຕິດຕໍ່ສອບຖາມ", zh: "交通联系方式" },
    {
      en: "Contact information for transport service providers",
      lo: "ຂໍ້ມູນຕິດຕໍ່ຜູ້ໃຫ້ບໍລິການຂົນສົ່ງ",
      zh: "交通服务提供商的联系方式",
    },
    "/transports/contacts",
    {
      en: ["transport contacts", "taxi contact", "shuttle contact", "transport phone", "driver contact"],
      lo: ["ຕິດຕໍ່", "ເບີ", "ໂທ", "ລົດ", "ຜູ້ໃຫ້ບໍລິການ"],
      zh: ["联系方式", "出租车电话", "交通联系", "司机联系"],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  SUPPORT
  // ════════════════════════════════════════════════════════

  item(
    "support-notices",
    "support",
    { en: "Notices", lo: "ແຈ້ງການ", zh: "机场公告" },
    {
      en: "Airport announcements, operational changes and travel advisories",
      lo: "ແຈ້ງການ, ການປ່ຽນແປງ ແລະ ຄຳແນະນຳການເດີນທາງ",
      zh: "机场公告、运营变更及旅行提示",
    },
    "/support/notices",
    {
      en: ["notices", "announcements", "advisory", "operational changes", "airport news", "alerts"],
      lo: ["ແຈ້ງ", "ການ", "ປ່ຽນ", "ຂ່າວ", "ຄຳ", "ແນະ"],
      zh: ["公告", "通知", "运营变更", "旅行提示", "机场新闻"],
    },
  ),

  item(
    "support-faq",
    "support",
    { en: "FAQs", lo: "ຄຳຖາມທີ່ພົບເລື້ອຍ", zh: "常见问题" },
    {
      en: "Frequently asked questions about the airport and services",
      lo: "ຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆ ກ່ຽວກັບສະໜາມບິນ ແລະ ບໍລິການ",
      zh: "有关机场及服务的常见问题解答",
    },
    "/support/faq",
    {
      en: ["faq", "faqs", "frequently asked questions", "questions", "help", "how to"],
      lo: ["ຄຳ", "ຖາມ", "ຕອບ", "ຊ່ວຍ", "ວິທີ", "ເລື້ອຍ"],
      zh: ["常见问题", "FAQ", "帮助", "问答", "如何"],
    },
  ),

  item(
    "support-lost-found",
    "support",
    { en: "Lost & Found", lo: "ເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ", zh: "失物招领" },
    {
      en: "Report or claim lost items at the airport",
      lo: "ແຈ້ງ ຫຼື ຢືນຢັນການຮັບເຄື່ອງທີ່ເສຍ ຫຼື ຕົກຄ້າງ",
      zh: "报告或认领在机场遗失的物品",
    },
    "/support/lost-found",
    {
      en: [
        "lost", "found", "lost and found", "lost item", "found item",
        "claim lost", "missing item", "left behind", "forgotten",
        "lost luggage", "lost bag", "lost passport", "lost phone",
      ],
      lo: [
        "ເສຍ", "ຕົກ", "ຄ້າງ", "ເຄື່ອງ",
        "ຫາ", "ຮັບ", "ແຈ້ງ", "ລືມ", "ໄວ",
      ],
      zh: [
        "失物", "招领", "遗失物品", "找回", "认领",
        "遗忘物品", "丢失行李", "丢失护照",
      ],
    },
  ),

  item(
    "support-feedback",
    "support",
    { en: "Feedback", lo: "ຄຳຄິດເຫັນ", zh: "意见反馈" },
    {
      en: "Share your experience or submit a complaint",
      lo: "ແບ່ງປັນປະສົບການ ຫຼື ສົ່ງຄຳຮ້ອງທຸກ",
      zh: "分享您的体验或提交投诉",
    },
    "/support/feedback",
    {
      en: ["feedback", "complaint", "suggestion", "review", "rate", "experience", "survey"],
      lo: ["ຄຳຄິດ", "ເຫັນ", "ຮ້ອງ", "ທຸກ", "ລາຍ", "ງານ", "ປະສົບ"],
      zh: ["反馈", "投诉", "建议", "评价", "体验调查"],
    },
  ),

  // ════════════════════════════════════════════════════════
  //  ABOUT
  // ════════════════════════════════════════════════════════

  item(
    "about-profile",
    "about",
    { en: "Airport Profile", lo: "ຂໍ້ມູນສະໜາມບິນ", zh: "机场简介" },
    {
      en: "History, vision, mission and profile of Bokeo International Airport",
      lo: "ປະຫວັດ, ວິໄສທັດ, ພາລະກິດ ແລະ ຂໍ້ມູນສະໜາມບິນ",
      zh: "博胶国际机场的历史、愿景、使命及简介",
    },
    "/about/profile",
    {
      en: [
        "about", "airport profile", "history", "vision", "mission",
        "BKIA", "Bokeo", "about us", "airport information",
      ],
      lo: [
        "ກ່ຽວ", "ຂໍ້ມູນ", "ປະຫວັດ", "ວິໄສ", "ທັດ",
        "ພາລະ", "ກິດ", "BKIA", "ບໍ່ແກ້ວ",
      ],
      zh: [
        "机场简介", "关于", "历史", "愿景", "使命",
        "博胶", "BKIA", "机场信息",
      ],
    },
  ),

  item(
    "about-news",
    "about",
    { en: "News", lo: "ຂ່າວສານ", zh: "新闻中心" },
    {
      en: "Latest news, updates and press releases from the airport",
      lo: "ຂ່າວສານ, ການອັບເດດ ແລະ ຂ່າວສານລ່າສຸດຈາກສະໜາມບິນ",
      zh: "机场最新新闻、动态及新闻稿",
    },
    "/about/news",
    {
      en: ["news", "press release", "updates", "articles", "stories", "latest news"],
      lo: ["ຂ່າວ", "ສານ", "ອັບ", "ເດດ", "ລ່າ", "ສຸດ"],
      zh: ["新闻", "新闻稿", "最新动态", "文章", "报道"],
    },
  ),

  item(
    "about-careers",
    "about",
    { en: "Careers", lo: "ຮ່ວມງານກັບພວກເຮົາ", zh: "人才招聘" },
    {
      en: "Job openings, vacancies and employment opportunities at BKIA",
      lo: "ຕໍາແໜ່ງວ່າງ ແລະ ໂອກາດການຈ້າງງານທີ່ BKIA",
      zh: "博胶国际机场的招聘职位与就业机会",
    },
    "/about/careers",
    {
      en: [
        "careers", "jobs", "vacancies", "employment", "hiring",
        "job openings", "recruitment", "apply", "application", "position",
      ],
      lo: [
        "ຮ່ວມງານ", "ວຽກ", "ຕໍາແໜ່ງ", "ສະໝັກ",
        "ຮັບ", "ຈ້າງ", "ພະນັກງານ", "ການ",
      ],
      zh: [
        "招聘", "职位", "工作", "就业",
        "空缺", "申请", "招募",
      ],
    },
  ),

  item(
    "about-auctions",
    "about",
    { en: "Auctions", lo: "ການປະມູນ", zh: "拍卖招标" },
    {
      en: "Bidding documents and procurement opportunities at the airport",
      lo: "ເອກະສານການປະມູນ ແລະ ໂອກາດການຈັດຊື້",
      zh: "机场招标文件与采购机会",
    },
    "/about/auctions",
    {
      en: ["auctions", "tender", "procurement", "bidding", "bid", "contract"],
      lo: ["ປະມູນ", "ຈັດ", "ຊື້", "ໂອ", "ກາດ", "ສັນ"],
      zh: ["拍卖", "招标", "采购", "投标", "合同"],
    },
  ),
];

// ── Popular searches (shown in empty state) ────────────────────────────────────

export const popularSearches: Record<string, string[]> = {
  en: [
    "Check-in",
    "Departures",
    "Arrivals",
    "Parking",
    "Lost & Found",
    "Baggage allowance",
  ],
  lo: [
    "ແຈ້ງປີ້",
    "ຖ້ຽວບິນອອກ",
    "ຖ້ຽວບິນຂາເຂົ້າ",
    "ບ່ອນຈອດລົດ",
    "ເຄື່ອງເສຍ",
    "ນ້ຳໜັກກະເປົາ",
  ],
  zh: [
    "值机",
    "出发航班",
    "到达航班",
    "停车场",
    "失物招领",
    "行李额度",
  ],
};
