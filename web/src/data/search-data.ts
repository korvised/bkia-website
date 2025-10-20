// src/data/search-data.ts
import { MultilingualText } from "@/types/language";
import {
  BarChart3,
  Bell,
  Building,
  Building2,
  Bus,
  Car,
  CarTaxiFront,
  Coffee,
  FileText,
  HandHeart,
  Handshake,
  Heart,
  Layers,
  LucideIcon,
  Luggage,
  MapPinned,
  Megaphone,
  MessageSquareWarning,
  Newspaper,
  Package,
  PackageSearch,
  ParkingCircle,
  Phone,
  Plane,
  PlaneLanding,
  RefreshCcw,
  SearchCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

export interface SearchableItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  url: string;
  category: MultilingualText;
  icon: LucideIcon;
  keywords: {
    en: string[];
    lo: string[];
    zh: string[];
  };
}

// ====================
// PASSENGER SERVICES (Main Navigation)
// ====================

export const flightSearchItems: SearchableItem[] = [
  {
    id: "flights",
    title: {
      en: "Flight Information",
      lo: "ຂໍ້ມູນຖ້ຽວບິນ",
      zh: "航班信息",
    },
    description: {
      en: "Flight schedules and real-time updates",
      lo: "ຕາລາງຖ້ຽວບິນ ແລະ ຂໍ້ມູນປັດຈຸບັນ",
      zh: "航班查询、航班时刻表",
    },
    url: "/flights",
    category: {
      en: "Flights",
      lo: "ຖ້ຽວບິນ",
      zh: "航班",
    },
    icon: Plane,
    keywords: {
      en: [
        "flight",
        "departure",
        "arrival",
        "schedule",
        "airline",
        "gate",
        "boarding",
        "flight status",
      ],
      lo: [
        "ຖ້ຽວບິນ",
        "ອອກເດີນທາງ",
        "ມາຮອດ",
        "ຕາລາງ",
        "ສາຍການບິນ",
        "ປະຕູ",
        "ສະຖານະຖ້ຽວບິນ",
      ],
      zh: ["航班", "出发", "到达", "时刻表", "航空公司", "登机口", "航班状态"],
    },
  },
  {
    id: "flights-departures",
    title: {
      en: "Departures",
      lo: "ຖ້ຽວບິນອອກ",
      zh: "出发航班",
    },
    description: {
      en: "Departure flight schedules",
      lo: "ຕາລາງຖ້ຽວບິນອອກເດີນທາງ",
      zh: "出发航班时刻表",
    },
    url: "/flights?tab=departures",
    category: {
      en: "Flights",
      lo: "ຖ້ຽວບິນ",
      zh: "航班",
    },
    icon: Plane,
    keywords: {
      en: ["departure", "departing", "outbound", "leaving"],
      lo: ["ອອກເດີນທາງ", "ຖ້ຽວບິນອອກ"],
      zh: ["出发", "离港"],
    },
  },
  {
    id: "flights-arrivals",
    title: {
      en: "Arrivals",
      lo: "ຖ້ຽວບິນເຂົ້າ",
      zh: "到达航班",
    },
    description: {
      en: "Arrival flight schedules",
      lo: "ຕາລາງຖ້ຽວບິນມາຮອດ",
      zh: "到达航班时刻表",
    },
    url: "/flights?tab=arrivals",
    category: {
      en: "Flights",
      lo: "ຖ້ຽວບິນ",
      zh: "航班",
    },
    icon: PlaneLanding,
    keywords: {
      en: ["arrival", "arriving", "inbound", "landing"],
      lo: ["ມາຮອດ", "ຖ້ຽວບິນເຂົ້າ"],
      zh: ["到达", "进港"],
    },
  },
  {
    id: "flights-airlines",
    title: {
      en: "Airlines",
      lo: "ສາຍການບິນ",
      zh: "航空公司",
    },
    description: {
      en: "Airlines operating at Bokeo Airport",
      lo: "ສາຍການບິນທີ່ບິນຢູ່ສະໜາມບິນບໍ່ແກ້ວ",
      zh: "在博胶机场运营的航空公司",
    },
    url: "/flights?tab=airlines",
    category: {
      en: "Flights",
      lo: "ຖ້ຽວບິນ",
      zh: "航班",
    },
    icon: Plane,
    keywords: {
      en: ["airline", "carrier", "aviation company"],
      lo: ["ສາຍການບິນ", "ບໍລິສັດການບິນ"],
      zh: ["航空公司", "承运人"],
    },
  },
];

export const transportationSearchItems: SearchableItem[] = [
  {
    id: "transportations",
    title: {
      en: "Traffic Guidance",
      lo: "ຄຳແນະນຳດ້ານຈະລາຈອນ",
      zh: "交通导引",
    },
    description: {
      en: "Buses, taxis, parking, and car rental",
      lo: "ລົດເມ, ແທັກຊີ, ບ່ອນຈອດລົດ, ແລະ ການເຊົ່າລົດ",
      zh: "大巴、出租车、停车、租车",
    },
    url: "/transportations",
    category: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通",
    },
    icon: Car,
    keywords: {
      en: ["transport", "traffic", "guidance", "directions"],
      lo: ["ຂົນສົ່ງ", "ຈະລາຈອນ", "ຄຳແນະນຳ"],
      zh: ["交通", "导引", "指南"],
    },
  },
  {
    id: "van-service",
    title: {
      en: "Van Services",
      lo: "ບໍລິການລົດຕູ້",
      zh: "大巴服务",
    },
    description: {
      en: "Airport van schedules and routes",
      lo: "ຕາລາງ ແລະ ເສັ້ນທາງລົດຕູ້ສະໜາມບິນ",
      zh: "机场大巴时刻表和路线",
    },
    url: "/transportations/van",
    category: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通",
    },
    icon: Bus,
    keywords: {
      en: ["van", "bus", "shuttle", "schedule", "route"],
      lo: ["ລົດຕູ້", "ລົດເມ", "ຕາລາງ", "ເສັ້ນທາງ"],
      zh: ["大巴", "班车", "时刻表", "路线"],
    },
  },
  {
    id: "taxi-service",
    title: {
      en: "Taxi Services",
      lo: "ບໍລິການແທັກຊີ",
      zh: "出租车服务",
    },
    description: {
      en: "Taxi stands and booking",
      lo: "ທີ່ຈອດແທັກຊີ ແລະ ການຈອງ",
      zh: "出租车站和预订",
    },
    url: "/transportations/taxi",
    category: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通",
    },
    icon: CarTaxiFront,
    keywords: {
      en: ["taxi", "cab", "ride", "booking"],
      lo: ["ແທັກຊີ", "ລົດ", "ຈອງ"],
      zh: ["出租车", "的士", "打车", "预订"],
    },
  },
  {
    id: "parking",
    title: {
      en: "Parking",
      lo: "ບ່ອນຈອດລົດ",
      zh: "停车场",
    },
    description: {
      en: "Parking rates and availability",
      lo: "ອັດຕາການຈອດລົດ ແລະ ທີ່ວ່າງ",
      zh: "停车费率和空位",
    },
    url: "/transportations/parking",
    category: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通",
    },
    icon: ParkingCircle,
    keywords: {
      en: ["parking", "rates", "availability", "garage", "lot", "car park"],
      lo: ["ຈອດລົດ", "ອັດຕາ", "ບ່ອນຈອດ", "ທີ່ວ່າງ"],
      zh: ["停车", "费率", "车位", "停车场"],
    },
  },
  {
    id: "car-rental",
    title: {
      en: "Car Rental",
      lo: "ເຊົ່າລົດ",
      zh: "租车",
    },
    description: {
      en: "Rent a car services",
      lo: "ບໍລິການເຊົ່າລົດ",
      zh: "租车服务",
    },
    url: "/transportations/car-rental",
    category: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通",
    },
    icon: Car,
    keywords: {
      en: ["rental", "car", "hire", "vehicle", "rent"],
      lo: ["ເຊົ່າ", "ລົດ", "ຍານພາຫະນະ"],
      zh: ["租车", "汽车", "车辆", "租赁"],
    },
  },
];

export const guideSearchItems: SearchableItem[] = [
  {
    id: "guides",
    title: {
      en: "Flight Guide",
      lo: "ຄູ່ມືການເດີນທາງ",
      zh: "乘机指南",
    },
    description: {
      en: "Passenger flight process, Facility service",
      lo: "ຂັ້ນຕອນການເດີນທາງ ແລະ ບໍລິການສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "旅客乘机流程、设施服务",
    },
    url: "/guides",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: Luggage,
    keywords: {
      en: ["guide", "passenger", "process", "facility", "service"],
      lo: ["ຄູ່ມື", "ຜູ້ໂດຍສານ", "ຂັ້ນຕອນ", "ສິ່ງອຳນວຍຄວາມສະດວກ"],
      zh: ["指南", "旅客", "流程", "设施", "服务"],
    },
  },
  {
    id: "departure-guide",
    title: {
      en: "Departure Guide",
      lo: "ຄູ່ມືອອກເດີນທາງ",
      zh: "出发指南",
    },
    description: {
      en: "Departure procedures and check-in",
      lo: "ຂັ້ນຕອນອອກເດີນທາງ ແລະ ການກວດສອບ",
      zh: "出发流程和值机",
    },
    url: "/guides/departure",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: Plane,
    keywords: {
      en: ["departure", "check-in", "boarding", "procedure"],
      lo: ["ອອກເດີນທາງ", "ກວດສອບ", "ຂຶ້ນເຄື່ອງ"],
      zh: ["出发", "值机", "登机", "流程"],
    },
  },
  {
    id: "arrival-guide",
    title: {
      en: "Arrival Guide",
      lo: "ຄູ່ມືມາຮອດ",
      zh: "到达指南",
    },
    description: {
      en: "Arrival procedures and baggage claim",
      lo: "ຂັ້ນຕອນມາຮອດ ແລະ ຮັບກະເປົາ",
      zh: "到达流程和行李提取",
    },
    url: "/guides/arrival",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: PlaneLanding,
    keywords: {
      en: ["arrival", "baggage", "claim", "customs", "immigration"],
      lo: ["ມາຮອດ", "ກະເປົາ", "ພາສີ", "ຕົວຈິງ"],
      zh: ["到达", "行李", "海关", "入境"],
    },
  },
  {
    id: "transfer-guide",
    title: {
      en: "Transfer Guide",
      lo: "ຄູ່ມືການຕໍ່ຖ້ຽວບິນ",
      zh: "中转指南",
    },
    description: {
      en: "Transit and transfer procedures",
      lo: "ຂັ້ນຕອນການຖ່າຍທ່ຽວ ແລະ ຕໍ່ຖ້ຽວບິນ",
      zh: "中转和换乘流程",
    },
    url: "/guides/transfer",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: RefreshCcw,
    keywords: {
      en: ["transfer", "transit", "connecting", "layover"],
      lo: ["ຕໍ່ຖ້ຽວບິນ", "ຖ່າຍທ່ຽວ"],
      zh: ["中转", "换乘", "转机"],
    },
  },
  {
    id: "airport-facilities",
    title: {
      en: "Airport Facilities",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "机场设施",
    },
    description: {
      en: "Airport facilities and services",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການ",
      zh: "机场设施和服务",
    },
    url: "/guides/services",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: HandHeart,
    keywords: {
      en: ["facilities", "amenities", "services", "airport"],
      lo: ["ສິ່ງອຳນວຍຄວາມສະດວກ", "ບໍລິການ"],
      zh: ["设施", "服务", "便利"],
    },
  },
  {
    id: "special-services",
    title: {
      en: "Special Services",
      lo: "ບໍລິການພິເສດ",
      zh: "特殊服务",
    },
    description: {
      en: "Special assistance and care",
      lo: "ການຊ່ວຍເຫຼືອພິເສດ ແລະ ການດູແລ",
      zh: "特殊协助和关怀",
    },
    url: "/guides/cares",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: Heart,
    keywords: {
      en: ["special", "assistance", "care", "disability", "wheelchair"],
      lo: ["ພິເສດ", "ຊ່ວຍເຫຼືອ", "ດູແລ"],
      zh: ["特殊", "协助", "关怀", "无障碍"],
    },
  },
  {
    id: "hotel-services",
    title: {
      en: "Hotel Services",
      lo: "ບໍລິການໂຮງແຮມ",
      zh: "酒店服务",
    },
    description: {
      en: "Airport hotel accommodations",
      lo: "ທີ່ພັກໂຮງແຮມສະໜາມບິນ",
      zh: "机场酒店住宿",
    },
    url: "/guides/hotel",
    category: {
      en: "Guide",
      lo: "ຄູ່ມື",
      zh: "指南",
    },
    icon: Building,
    keywords: {
      en: ["hotel", "accommodation", "lodging", "stay"],
      lo: ["ໂຮງແຮມ", "ທີ່ພັກ"],
      zh: ["酒店", "住宿", "入住"],
    },
  },
];

export const noticeSearchItems: SearchableItem[] = [
  {
    id: "notices",
    title: {
      en: "Notices & Announcements",
      lo: "ປະກາດ-ແຈ້ງການ",
      zh: "通知公告",
    },
    description: {
      en: "Important notice, Lost & Found",
      lo: "ແຈ້ງການສຳຄັນ, ເຄື່ອງເສຍ&ຮັບຄືນ",
      zh: "重要通知、失物信息",
    },
    url: "/notices",
    category: {
      en: "Notice",
      lo: "ປະກາດ",
      zh: "通知",
    },
    icon: FileText,
    keywords: {
      en: ["notice", "announcement", "alert", "information"],
      lo: ["ປະກາດ", "ແຈ້ງການ"],
      zh: ["通知", "公告"],
    },
  },
  {
    id: "important-notice",
    title: {
      en: "Important Notices",
      lo: "ປະກາດສຳຄັນ",
      zh: "重要通知",
    },
    description: {
      en: "Important announcements and alerts",
      lo: "ແຈ້ງການສຳຄັນ ແລະ ການເຕືອນ",
      zh: "重要公告和提醒",
    },
    url: "/notices/important",
    category: {
      en: "Notice",
      lo: "ປະກາດ",
      zh: "通知",
    },
    icon: Bell,
    keywords: {
      en: ["important", "urgent", "alert", "critical"],
      lo: ["ສຳຄັນ", "ດ່ວນ", "ເຕືອນ"],
      zh: ["重要", "紧急", "提醒"],
    },
  },
  {
    id: "information-notice",
    title: {
      en: "Information Notices",
      lo: "ແຈ້ງການຂໍ້ມູນ",
      zh: "信息公告",
    },
    description: {
      en: "General information and updates",
      lo: "ຂໍ້ມູນທົ່ວໄປ ແລະ ການອັບເດດ",
      zh: "一般信息和更新",
    },
    url: "/notices/information",
    category: {
      en: "Notice",
      lo: "ປະກາດ",
      zh: "通知",
    },
    icon: Megaphone,
    keywords: {
      en: ["information", "update", "news", "general"],
      lo: ["ຂໍ້ມູນ", "ອັບເດດ", "ຂ່າວ"],
      zh: ["信息", "更新", "新闻"],
    },
  },
  {
    id: "lost-found",
    title: {
      en: "Lost & Found",
      lo: "ເຄື່ອງເສຍ & ຮັບຄືນ",
      zh: "失物招领",
    },
    description: {
      en: "Report lost items or claim found items",
      lo: "ແຈ້ງເຄື່ອງເສຍ ຫຼື ຮັບເຄື່ອງທີ່ພົບ",
      zh: "报失物品或认领物品",
    },
    url: "/notices/lost-found",
    category: {
      en: "Notice",
      lo: "ປະກາດ",
      zh: "通知",
    },
    icon: SearchCheck,
    keywords: {
      en: ["lost", "found", "missing", "claim", "items"],
      lo: ["ເສຍ", "ພົບ", "ຮັບຄືນ", "ເຄື່ອງ"],
      zh: ["失物", "招领", "认领", "物品"],
    },
  },
  {
    id: "complaint",
    title: {
      en: "Complaints & Feedback",
      lo: "ຄຳຮ້ອງທຸກ & ຄຳຄິດເຫັນ",
      zh: "投诉与反馈",
    },
    description: {
      en: "Submit complaints or feedback",
      lo: "ສົ່ງຄຳຮ້ອງທຸກ ຫຼື ຄຳຄິດເຫັນ",
      zh: "提交投诉或反馈",
    },
    url: "/notices/complaint",
    category: {
      en: "Notice",
      lo: "ປະກາດ",
      zh: "通知",
    },
    icon: MessageSquareWarning,
    keywords: {
      en: ["complaint", "feedback", "report", "issue", "problem"],
      lo: ["ຄຳຮ້ອງທຸກ", "ຄຳຄິດເຫັນ", "ບັນຫາ"],
      zh: ["投诉", "反馈", "报告", "问题"],
    },
  },
];

export const diningShoppingSearchItems: SearchableItem[] = [
  {
    id: "dining-shopping",
    title: {
      en: "Dining & Shopping",
      lo: "ອາຫານ ແລະ ຮ້ານຄ້າ",
      zh: "餐饮购物",
    },
    description: {
      en: "Restaurants, cafes, and shopping",
      lo: "ຮ້ານອາຫານ, ຮ້ານກາເຟ, ແລະ ການຊື້ເຄື່ອງ",
      zh: "餐饮零售服务、价格表",
    },
    url: "/dining-shopping",
    category: {
      en: "Services",
      lo: "ບໍລິການ",
      zh: "服务",
    },
    icon: UtensilsCrossed,
    keywords: {
      en: ["dining", "shopping", "restaurant", "shop", "food", "retail"],
      lo: ["ອາຫານ", "ຮ້ານຄ້າ", "ຮ້ານອາຫານ", "ຊື້ເຄື່ອງ"],
      zh: ["餐饮", "购物", "餐厅", "商店"],
    },
  },
  {
    id: "restaurants",
    title: {
      en: "Restaurants",
      lo: "ຮ້ານອາຫານ",
      zh: "餐厅",
    },
    description: {
      en: "Airport dining options",
      lo: "ທາງເລືອກອາຫານໃນສະໜາມບິນ",
      zh: "机场餐饮选择",
    },
    url: "/dining-shopping/restaurants",
    category: {
      en: "Dining",
      lo: "ອາຫານ",
      zh: "餐饮",
    },
    icon: Utensils,
    keywords: {
      en: ["restaurant", "dining", "food", "eat", "meal"],
      lo: ["ຮ້ານອາຫານ", "ອາຫານ", "ກິນ"],
      zh: ["餐厅", "用餐", "食物"],
    },
  },
  {
    id: "cafes",
    title: {
      en: "Cafes & Coffee",
      lo: "ຮ້ານກາເຟ",
      zh: "咖啡厅",
    },
    description: {
      en: "Coffee shops and cafes",
      lo: "ຮ້ານກາເຟ ແລະ ເຄື່ອງດື່ມ",
      zh: "咖啡店和茶饮",
    },
    url: "/dining-shopping/cafes",
    category: {
      en: "Dining",
      lo: "ອາຫານ",
      zh: "餐饮",
    },
    icon: Coffee,
    keywords: {
      en: ["cafe", "coffee", "drink", "beverage", "tea"],
      lo: ["ກາເຟ", "ເຄື່ອງດື່ມ", "ຊາ"],
      zh: ["咖啡", "饮料", "茶"],
    },
  },
  {
    id: "shops",
    title: {
      en: "Shops & Retail",
      lo: "ຮ້ານຄ້າ",
      zh: "商店",
    },
    description: {
      en: "Shopping and retail stores",
      lo: "ຮ້ານຄ້າ ແລະ ຮ້ານຂາຍເຄື່ອງ",
      zh: "购物和零售商店",
    },
    url: "/dining-shopping/shops",
    category: {
      en: "Shopping",
      lo: "ຊື້ເຄື່ອງ",
      zh: "购物",
    },
    icon: Store,
    keywords: {
      en: ["shop", "store", "retail", "shopping", "buy"],
      lo: ["ຮ້ານ", "ຊື້", "ຂາຍ"],
      zh: ["商店", "零售", "购物"],
    },
  },
  {
    id: "duty-free",
    title: {
      en: "Duty Free",
      lo: "ຮ້ານປອດພາສີ",
      zh: "免税店",
    },
    description: {
      en: "Tax-free shopping",
      lo: "ຊື້ເຄື່ອງປອດພາສີ",
      zh: "免税购物",
    },
    url: "/dining-shopping/duty-free",
    category: {
      en: "Shopping",
      lo: "ຊື້ເຄື່ອງ",
      zh: "购物",
    },
    icon: ShoppingBag,
    keywords: {
      en: ["duty free", "tax free", "shopping", "international"],
      lo: ["ປອດພາສີ", "ຊື້ເຄື່ອງ"],
      zh: ["免税", "购物", "国际"],
    },
  },
];

export const cargoSearchItems: SearchableItem[] = [
  {
    id: "cargo",
    title: {
      en: "Air Cargo",
      lo: "ຂົນສົ່ງສິນຄ້າ",
      zh: "航空货运",
    },
    description: {
      en: "Air freight and logistics services",
      lo: "ບໍລິການຂົນສົ່ງສິນຄ້າ ແລະ ການຈັດການຂົນສົ່ງ",
      zh: "航空货运与物流服务",
    },
    url: "/cargo",
    category: {
      en: "Cargo",
      lo: "ສິນຄ້າ",
      zh: "货运",
    },
    icon: PackageSearch,
    keywords: {
      en: ["cargo", "freight", "logistics", "shipping"],
      lo: ["ສິນຄ້າ", "ຂົນສົ່ງ"],
      zh: ["货运", "物流", "运输"],
    },
  },
  {
    id: "cargo-tracking",
    title: {
      en: "Cargo Tracking",
      lo: "ຕິດຕາມສິນຄ້າ",
      zh: "货物追踪",
    },
    description: {
      en: "Track your shipments",
      lo: "ຕິດຕາມການຂົນສົ່ງຂອງທ່ານ",
      zh: "追踪您的货物",
    },
    url: "/cargo/tracking",
    category: {
      en: "Cargo",
      lo: "ສິນຄ້າ",
      zh: "货运",
    },
    icon: Package,
    keywords: {
      en: ["tracking", "cargo", "shipment", "package", "trace"],
      lo: ["ຕິດຕາມ", "ສິນຄ້າ", "ແພັກເກັດ"],
      zh: ["追踪", "货物", "包裹"],
    },
  },
  {
    id: "cargo-rates",
    title: {
      en: "Cargo Rates",
      lo: "ອັດຕາຄ່າຂົນສົ່ງ",
      zh: "货运价格",
    },
    description: {
      en: "Shipping rates and pricing",
      lo: "ອັດຕາຄ່າຂົນສົ່ງ ແລະ ລາຄາ",
      zh: "运输价格和费率",
    },
    url: "/cargo/rates",
    category: {
      en: "Cargo",
      lo: "ສິນຄ້າ",
      zh: "货运",
    },
    icon: BarChart3,
    keywords: {
      en: ["rates", "pricing", "cost", "fees"],
      lo: ["ອັດຕາ", "ລາຄາ", "ຄ່າທຳນຽມ"],
      zh: ["价格", "费率", "费用"],
    },
  },
  {
    id: "cargo-services",
    title: {
      en: "Cargo Services",
      lo: "ບໍລິການຂົນສົ່ງ",
      zh: "货运服务",
    },
    description: {
      en: "Air freight services",
      lo: "ບໍລິການຂົນສົ່ງທາງອາກາດ",
      zh: "航空货运服务",
    },
    url: "/cargo/services",
    category: {
      en: "Cargo",
      lo: "ສິນຄ້າ",
      zh: "货运",
    },
    icon: Truck,
    keywords: {
      en: ["services", "freight", "logistics"],
      lo: ["ບໍລິການ", "ຂົນສົ່ງ"],
      zh: ["服务", "货运", "物流"],
    },
  },
];

export const bokeoVisitSearchItems: SearchableItem[] = [
  {
    id: "bokeo-visit",
    title: {
      en: "Bokeo Visit",
      lo: "ທ່ອງທ່ຽວບໍ່ແກ້ວ",
      zh: "博胶旅游",
    },
    description: {
      en: "Discover top attractions and travel experiences in Bokeo",
      lo: "ຄົ້ນພົບສະຖານທີ່ທ່ອງທ່ຽວ ແລະ ປະສົບການທ່ອງທ່ຽວໃນແຂວງບໍ່ແກ້ວ",
      zh: "探索博胶省的热门景点与旅游体验",
    },
    url: "/bokeo-visit",
    category: {
      en: "Tourism",
      lo: "ທ່ອງທ່ຽວ",
      zh: "旅游",
    },
    icon: MapPinned,
    keywords: {
      en: ["tourism", "visit", "attraction", "bokeo", "travel", "destination"],
      lo: ["ທ່ອງທ່ຽວ", "ຢ້ຽມຢາມ", "ສະຖານທີ່", "བ່ອແກ້ວ"],
      zh: ["旅游", "游览", "景点", "博胶"],
    },
  },
];

// ====================
// ABOUT US SECTIONS
// ====================

export const aboutUsSearchItems: SearchableItem[] = [
  {
    id: "overview",
    title: {
      en: "Airport Overview",
      lo: "ພາບລວມສະໜາມບິນ",
      zh: "机场概况",
    },
    description: {
      en: "Explore airport operations",
      lo: "ສຳຫຼວດການດຳເນີນງານສະໜາມბิນ",
      zh: "搜素机场的运行",
    },
    url: "/survey",
    category: {
      en: "About",
      lo: "ກ່ຽວກັບ",
      zh: "关于",
    },
    icon: Building2,
    keywords: {
      en: ["overview", "airport", "operations", "survey"],
      lo: ["ພາບລວມ", "ສະໜາມბິນ", "ດຳເນີນງານ"],
      zh: ["概况", "机场", "运营"],
    },
  },
  {
    id: "company",
    title: {
      en: "Airport Profile",
      lo: "ປະຫວັດຫຍໍ້",
      zh: "公司简介",
    },
    description: {
      en: "Learn about Bokeo International Airport",
      lo: "ທຳຄວາມຮູ້ຈັກກັბບໍລິສັດສະໜາມბິນສາກົນბ່ོແກ້ວຈຳກັດ",
      zh: "了解博胶国际机场有限公司",
    },
    url: "/about",
    category: {
      en: "About",
      lo: "ກ່ຽວກັບ",
      zh: "关于",
    },
    icon: Handshake,
    keywords: {
      en: ["profile", "company", "about", "bokeo"],
      lo: ["ປະຫວັດ", "བོລິສັດ", "ກ່ຽວກັບ"],
      zh: ["简介", "公司", "关于"],
    },
  },
  {
    id: "procurement",
    title: {
      en: "Bidding Notice",
      lo: "ແຈ້ງປະມູນ",
      zh: "招标公告",
    },
    description: {
      en: "Airport Bidding Information",
      lo: "ຂ່າວສານການປະມູນຂອງສະໜາມბິນ",
      zh: "机场各类招投标信息",
    },
    url: "/bidding",
    category: {
      en: "Business",
      lo: "ທຸລະກິດ",
      zh: "商务",
    },
    icon: FileText,
    keywords: {
      en: ["bidding", "procurement", "tender", "notice"],
      lo: ["ປະມູນ", "ຈັດຊື້"],
      zh: ["招标", "采购", "投标"],
    },
  },
  {
    id: "careers",
    title: {
      en: "Recruitment",
      lo: "ຮັບສະໝັກພະນັກງານ",
      zh: "人才招聘",
    },
    description: {
      en: "Job opportunities and recruitment",
      lo: "ໂອກາດເຮັດວຽກ ແລະ ການສະໝັກງານ",
      zh: "机场各岗位人才招聘信息",
    },
    url: "/careers",
    category: {
      en: "Careers",
      lo: "ອາຊີບ",
      zh: "招聘",
    },
    icon: Users,
    keywords: {
      en: ["careers", "jobs", "recruitment", "hiring"],
      lo: ["ອາຊີບ", "ວຽກ", "ສະໝັກງານ"],
      zh: ["招聘", "工作", "职位"],
    },
  },
  {
    id: "news",
    title: {
      en: "Airport News",
      lo: "ຂ່າວສານສະໜາມབິນ",
      zh: "空港新闻",
    },
    description: {
      en: "Latest news and updates",
      lo: "ຂ່າວສານ ແລະ ການອັບເດດຫຼ້າສຸດ",
      zh: "新闻、图片和视频资料",
    },
    url: "/news",
    category: {
      en: "News",
      lo: "ຂ່າວ",
      zh: "新闻",
    },
    icon: Newspaper,
    keywords: {
      en: ["news", "updates", "latest", "announcements"],
      lo: ["ຂ່າວ", "ອັບເດດ", "ຫຼ້າສຸດ"],
      zh: ["新闻", "更新", "最新"],
    },
  },
  {
    id: "history",
    title: {
      en: "Development History",
      lo: "ປະຫວັດການພັດທະນາ",
      zh: "发展历史",
    },
    description: {
      en: "Our development journey",
      lo: "ປະຫວັດການພັດທະນາຂອງສະໜາມბิນສາກົນბ່ོແກ້ວ",
      zh: "回顾博胶国际机场的发展历史",
    },
    url: "/history",
    category: {
      en: "About",
      lo: "ກ່ຽວກັບ",
      zh: "关于",
    },
    icon: Layers,
    keywords: {
      en: ["history", "development", "timeline"],
      lo: ["ປະຫວັດ", "པັດທະນາ"],
      zh: ["历史", "发展", "时间线"],
    },
  },
];

// ====================
// CONTACT & FEEDBACK
// ====================

export const contactSearchItems: SearchableItem[] = [
  {
    id: "contact",
    title: {
      en: "Contact Us",
      lo: "ຕິດຕໍ່ພວກເຮົາ",
      zh: "联系我们",
    },
    description: {
      en: "Get in touch with us",
      lo: "ຕິດຕໍ່ມາຫາພວກเຮົາ",
      zh: "与我们联系",
    },
    url: "/contact",
    category: {
      en: "Contact",
      lo: "ຕິດຕໍ່",
      zh: "联系",
    },
    icon: Phone,
    keywords: {
      en: ["contact", "phone", "email", "support"],
      lo: ["ຕິດຕໍ່", "ໂທລະສັບ", "ອີເມວ"],
      zh: ["联系", "电话", "邮件"],
    },
  },
  {
    id: "feedback",
    title: {
      en: "Feedback",
      lo: "ຄຳຄິດເຫັນ",
      zh: "反馈",
    },
    description: {
      en: "Share your experience",
      lo: "ແບ່ງປັນປະສົบການຂອງທ່ານ",
      zh: "分享您的体验",
    },
    url: "/contact/feedback",
    category: {
      en: "Contact",
      lo: "ຕິດຕໍ່",
      zh: "联系",
    },
    icon: FileText,
    keywords: {
      en: ["feedback", "comment", "suggestion"],
      lo: ["ຄຳຄິດເຫັນ", "ຄຳແນະນຳ"],
      zh: ["反馈", "意见", "建议"],
    },
  },
];

// ====================
// COMBINE ALL ITEMS
// ====================

export const allSearchItems: SearchableItem[] = [
  ...flightSearchItems,
  ...transportationSearchItems,
  ...guideSearchItems,
  ...noticeSearchItems,
  ...diningShoppingSearchItems,
  ...cargoSearchItems,
  ...bokeoVisitSearchItems,
  ...aboutUsSearchItems,
  ...contactSearchItems,
];

// ====================
// POPULAR SEARCHES
// ====================

export const popularSearches = {
  en: [
    "Flight schedules",
    "Parking",
    "Restaurants",
    "Lost and found",
    "Taxi service",
    "Check-in",
  ],
  lo: [
    "ຕາລາງຖ້ຽວບິນ",
    "ບ່ອນຈອດລົດ",
    "ຮ້ານອາຫານ",
    "ເຄື່ອງເສຍ",
    "ແທັກຊີ",
    "ແຈ້ງປີ້",
  ],
  zh: ["航班时刻表", "停车场", "餐厅", "失物招领", "出租车", "值机"],
};
