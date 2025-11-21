import { IconType } from "react-icons";
import {
  Heart,
  HelpCircle,
  LucideIcon,
  Megaphone,
  Package,
  ParkingCircle,
  ShieldCheck,
} from "lucide-react";
import { FaSearch, FaTaxi } from "react-icons/fa";
import { MultilingualText } from "@/types/language";
import { MdAtm } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiVipLine } from "react-icons/ri";

type ServiceCategory = "terminal" | "transport" | "hospitality";
type ServiceColor =
  | "primary"
  | "secondary"
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "teal"
  | "cyan"
  | "indigo"
  | "pink"
  | "rose"
  | "amber"
  | "lime"
  | "emerald"
  | "violet"
  | "fuchsia"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

interface PricingItem {
  item: MultilingualText;
  price: string;
  unit?: MultilingualText;
}

interface ServiceLocation {
  area: MultilingualText;
  floor?: MultilingualText;
  nearBy?: MultilingualText;
  gate?: string;
  zone?: string;
}

interface FacilityService {
  id: string;
  category: ServiceCategory;
  name: MultilingualText;
  icon: LucideIcon | IconType;
  color: ServiceColor;
  shortDescription: MultilingualText;
  description: MultilingualText;
  features: MultilingualText[];
  guidelines?: MultilingualText[];
  prohibitedItems?: MultilingualText[];
  pricing?: PricingItem[];
  location?: ServiceLocation[];
  operatingHours?: MultilingualText;
}

export const facilitiesServices: FacilityService[] = [
  {
    id: "baggage-wrapping",
    category: "terminal",
    name: {
      en: "Baggage Wrapping Service",
      lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ",
      zh: "行李包装服务",
    },
    icon: Package,
    color: "purple",
    shortDescription: {
      en: "Professional baggage wrapping for safe travel",
      lo: "ບໍລິການຫຸ້ມຫໍ່ສຳພາລະເພື່ອຄວາມປອດໄພ",
      zh: "专业行李包装，确保旅途安全",
    },
    description: {
      en: "Protect your luggage from damage, scratches, and tampering with our professional wrapping service. We wrap suitcases, fragile items, documents, and various materials that passengers need to carry on board.",
      lo: "ບໍລິການຫຸ້ມຫໍ່ກະເປົາເດີນທາງ, ການຫຸ້ມຫໍ່ສຳພາລະກັນແຕກ, ຫໍ່ເອກະສານ ແລະ ຫຸ້ມຫໍ່ພັດສະດຸຕ່າງໆທີ່ຜູ້ໂດຍສານຈຳເປັນຕ້ອງນຳຂື້ນເຮືອບິນ. ເພື່ອຮັບປະກັນບໍ່ໃຫ້ເກີດຄວາມເສຍຫາຍຕໍ່ສິ່ງຂອງ.",
      zh: "专业包装您的行李箱、易碎物品、文件和各种需要携带上飞机的物品，确保不会损坏、刮伤或在旅途中打开。",
    },
    features: [
      {
        en: "Protection against scratches, damage, and tampering",
        lo: "ຮັບປະກັນບໍ່ໃຫ້ເກີດຮ່ອງຮອຍຂີດຂ່ວານກະເປົ໋າ, ສິ່ງຂອງແຕກຫັກ, ຫຼືເປີດອອກລະຫວ່າງເດີນທາງ",
        zh: "防止刮伤、损坏和篡改",
      },
      {
        en: "Ensures passenger confidence in luggage safety",
        lo: "ຊ່ວຍໃຫ້ຜູ້ໂດຍສານໝັ້ນໃຈໄດ້ວ່າກະເປົ໋າຫຼື ສຳພາລະຂອງຜູ້ໂດຍສານຈະປອດໄພ",
        zh: "确保旅客对行李安全的信心",
      },
      {
        en: "Complies with airline transportation terms and conditions",
        lo: "ເປັນໄປຕາມຂໍ້ກຳນົດ ແລະ ເງື່ອນໄຂການຂົນສົ່ງຂອງສາຍການບິນ",
        zh: "符合航空公司运输条款和条件",
      },
      {
        en: "Available for suitcases, fragile items, and documents",
        lo: "ຫຸ້ມຫໍ່ກະເປົາເດີນທາງ, ສຳພາລະກັນແຕກ, ເອກະສານ",
        zh: "适用于行李箱、易碎物品和文件",
      },
    ],
    guidelines: [
      {
        en: "Check your belongings before wrapping",
        lo: "ກວດຄືນສີ່ງຂອງກ່ອນຫຸ້ມຫໍ່ສຳພາລະ",
        zh: "包装前请检查您的物品",
      },
      {
        en: "Inquire about pricing details at the wrapping counter",
        lo: "ສາມາດສອບຖາມລາຍລະອຽດ ແລະ ຄ່າບໍລິການໄດ້ທີ່ເຄົາເຕີ້ບໍລິການຫຸ້ມຫໍ່",
        zh: "可在包装柜台查询价格详情",
      },
    ],
    prohibitedItems: [
      {
        en: "Flammable materials, chemicals, and gases",
        lo: "ວັດຖຸໄວໄຟ, ສານເຄມີ, ແກ໊ດ",
        zh: "易燃材料、化学品和气体",
      },
      {
        en: "Weapons, firearms, explosives",
        lo: "ອາວຸດປືນ, ທາດລະເບີດ",
        zh: "武器、枪支、爆炸物",
      },
      {
        en: "Batteries, lighters, mobile phones (in checked baggage)",
        lo: "ແບັດເຕີລີ້, ກັບໄຟ, ໂທລະສັບ",
        zh: "电池、打火机、手机（托运行李中）",
      },
      {
        en: "Sharp objects and high-strength magnets",
        lo: "ວັດຖຸມີຄົມ, ແມ່ເຫຼັກແຮງສູງ",
        zh: "尖锐物品和高强度磁铁",
      },
      {
        en: "Strong-smelling foods (durian, fermented fish)",
        lo: "ອາຫານ ແລະ ໜາກໄມ້ທີ່ມີກີ່ນແຮງ (ໝາກທຸລຽນ, ໝາກໝີ້)",
        zh: "气味强烈的食物（榴莲、臭鱼）",
      },
    ],
    location: [
      {
        area: {
          en: "Domestic Terminal",
          lo: "ອາຄານສາຍພາຍໃນປະເທດ",
          zh: "国内航站楼",
        },
        nearBy: {
          en: "Left side of Exit Gate 04 or near Domestic Entrance",
          lo: "ຂ້າງເບື້ອງຊ້າຍຂອງປະຕູທາງອອກ 04 ຫຼື ໜ້າປະຕູຂາເຂົ້າສາຍພາຍໃນປະເທດ",
          zh: "04号出口左侧或国内入口附近",
        },
      },
    ],
    pricing: [
      {
        item: { en: "Small Size", lo: "ຂະໜາດນ້ອຍ", zh: "小号" },
        price: "20,000 LAK",
      },
      {
        item: { en: "Medium Size", lo: "ຂະໜາດກາງ", zh: "中号" },
        price: "25,000 LAK",
      },
      {
        item: { en: "Large Size", lo: "ຂະໜາດໃຫຍ່", zh: "大号" },
        price: "30,000 LAK",
      },
      {
        item: { en: "Extra Large Size", lo: "ຂະໜາດໃຫຍ່ພິເສດ", zh: "特大号" },
        price: "35,000 LAK",
      },
    ],
  },

  {
    id: "taxi-service",
    category: "transport",
    name: {
      en: "Taxi Service",
      lo: "ບໍລິການລົດຮັບ-ສົ່ງ Taxi",
      zh: "出租车服务",
    },
    icon: FaTaxi,
    color: "blue",
    shortDescription: {
      en: "Convenient airport taxi service",
      lo: "ບໍລິການລົດແທັກຊີສະດວກສະບາຍ",
      zh: "便捷的机场出租车服务",
    },
    description: {
      en: "Convenient transportation service for passengers traveling to and from the airport. Fixed pricing to destinations, ensuring safety and no need to wait for public transport.",
      lo: "ໃຫ້ບໍລິການເພື່ອອຳນວຍຄວາມສະດວກໃຫ້ຜູ້ໂດຍສານທີ່ເດີນທາງເຂົ້າ-ອອກສະໜາມບິນ ສາມາດອອກເດີນທາງໄປເຖິງຈຸດໝາຍໂດຍບໍ່ຕ້ອງລໍຖ້າລົດສາທາລະນະ. ກຳນົດລາຄາຄ່າບໍລິການໃນແຕ່ລະຈຸດໝາຍຢ່າງລະອຽດ.",
      zh: "为往返机场的旅客提供便捷的交通服务。到各目的地的价格固定，确保安全，无需等待公共交通。",
    },
    features: [
      {
        en: "Fixed pricing to destinations",
        lo: "ລາຄາຄ່າບໍລິການກຳນົດຢ່າງລະອຽດ",
        zh: "固定价格到各目的地",
      },
      {
        en: "Safe and reliable service",
        lo: "ຄວາມປອດໄພເປັນອັນດັບໜື່ງ",
        zh: "安全可靠的服务",
      },
      {
        en: "No waiting for public transport",
        lo: "ບໍ່ຕ້ອງລໍຖ້າລົດສາທາລະນະ",
        zh: "无需等待公共交通",
      },
      {
        en: "Professional drivers",
        lo: "ຄົນຂັບມືອາຊີບ",
        zh: "专业司机",
      },
    ],
    guidelines: [
      {
        en: "Check your belongings before boarding and alighting",
        lo: "ຜູ້ໂດຍສານຕ້ອງກວດເບິ່ງສຳພາລະຂອງທ່ານກ່ອນຂື້ນ-ລົງລົດທຸກຄັ້ງ",
        zh: "上下车前请检查您的物品",
      },
      {
        en: "Capacity: 1-4 passengers per vehicle",
        lo: "ຜູ້ໂດຍສານຕໍ່ຖ້ຽວ 1-4 ຄົນ/ຄັນ",
        zh: "每辆车1-4名乘客",
      },
      {
        en: "Inquire about pricing and vehicle types at service counter",
        lo: "ສາມາດສອບຖາມລາຄາ ແລະ ປະເພດລົດທີ່ເຄົາເຕີ້ບໍລິການ",
        zh: "可在服务台查询价格和车型",
      },
    ],
    location: [
      {
        area: {
          en: "Domestic Terminal",
          lo: "ອາຄານສາຍພາຍໃນປະເທດ",
          zh: "国内航站楼",
        },
        nearBy: {
          en: "Right side of Exit Gate 04 or near Domestic Entrance",
          lo: "ຂ້າງເບື້ອງຂວ້າປະຕູທາງອອກ 04 ຫຼື ໜ້າປະຕູຂາເຂົ້າພາຍໃນປະເທດ",
          zh: "04号出口右侧或国内入口附近",
        },
      },
    ],
    pricing: [
      {
        item: { en: "Si Muang Ngam", lo: "ສີເມືອງງາມ", zh: "西蒙昂" },
        price: "250,000 LAK / 80 CNY",
      },

      {
        item: {
          en: "Nam Ngan / Ton Pheung / Ton Pheung Checkpoint",
          lo: "ນ້ຳແງ້ນ / ຕົ້ນເຜິ້ງ / ດ່ານຕົ້ນເຜິ້ງ",
          zh: "南岸 / 吞盆 / 吞盆口岸",
        },
        price: "450,000 LAK / 150 CNY",
      },

      {
        item: {
          en: "Si Thad / Si Boun Heuang",
          lo: "ສີທາດ / ສີບຸນເຮືອງ",
          zh: "西塔 / 西本香",
        },
        price: "600,000 LAK / 200 CNY",
      },

      {
        item: {
          en: "Si Don Yang / Houy Pheung",
          lo: "ສີດອນແຍງ / ຫ້ວຍເຜິ້ງ",
          zh: "西东阳 / 会盆",
        },
        price: "660,000 LAK / 220 CNY",
      },

      {
        item: {
          en: "B. Mom / Nam Kerng Mai / Si Don Me / Nam Kerng Kao",
          lo: "ບ້ານມອມ / ນ້ຳເກີ່ງໃໝ່ / ສີດອນໝີ / ນ້ຳເກີ່ງເກົ່າ",
          zh: "孟村 / 新南更 / 西东梅 / 老南更",
        },
        price: "750,000 LAK / 250 CNY",
      },

      {
        item: { en: "Houy Tamg", lo: "ຫ້ວຍຕ້າງ", zh: "会当" },
        price: "850,000 LAK / 280 CNY",
      },

      {
        item: {
          en: "Louang Sing Chai / Nam Yone",
          lo: "ຫຼວງສິງໃຈ / ນ້ຳຍອນ",
          zh: "龙星寨 / 南苑",
        },
        price: "900,000 LAK / 300 CNY",
      },

      {
        item: { en: "Pak Ngao", lo: "ປາກງາວ", zh: "帕瑙" },
        price: "960,000 LAK / 320 CNY",
      },

      {
        item: {
          en: "Houy Tap / Houy Mone / Nong Xay / Houy Xay",
          lo: "ຫ້ວຍຕາບ / ຫ້ວຍມອນ / ຫນອງໄຊ / ຫ້ວຍຊາຍ",
          zh: "会塔 / 会蒙 / 农赛 / 会晒",
        },
        price: "1,000,000 LAK / 350 CNY",
      },
    ],
  },

  {
    id: "vip-lounge",
    category: "hospitality",
    name: {
      en: "VIP Lounge Service",
      lo: "ບໍລິການຫ້ອງຮັບຮອງພິເສດ",
      zh: "贵宾休息室服务",
    },
    icon: RiVipLine,
    color: "amber",
    shortDescription: {
      en: "Premium lounge experience",
      lo: "ບໍລິການຫ້ອງພັກຜ່ອນພິເສດ",
      zh: "高级休息室体验",
    },
    description: {
      en: "Exclusive lounge service for passengers seeking privacy while waiting for their flight. Features comfortable seating, air conditioning, quiet private space, refreshments, and complimentary WiFi.",
      lo: "ຮອງຮັບຜູ້ໂດຍສານທີ່ຕ້ອງການຄວາມເປັນສ່ວນຕົວໃນການນັ່ງລໍຖ້າຂື້ນເຮືອບິນ. ມີບ່ອນນັ່ງລໍຖ້າທີ່ສະບາຍ, ຫ້ອງແອເຢັນສາຍບາຍ, ງຽບສະຫງົບເປັນສ່ວນຕົວ, ມີອາຫານວ່າງ, ມີ WIFI ໃຫ້ບໍລິການ.",
      zh: "为需要隐私的旅客提供专属休息室服务。配备舒适座椅、空调、安静私密空间、茶点和免费WiFi。",
    },
    features: [
      {
        en: "Comfortable seating areas",
        lo: "ບ່ອນນັ່ງລໍຖ້າທີ່ສະບາຍ",
        zh: "舒适的座位区",
      },
      {
        en: "Air-conditioned private rooms",
        lo: "ຫ້ອງແອເຢັນສ່ວນຕົວ",
        zh: "空调私人房间",
      },
      {
        en: "Quiet and peaceful environment",
        lo: "ງຽບສະຫງົບເປັນສ່ວນຕົວ",
        zh: "安静祥和的环境",
      },
      {
        en: "Complimentary refreshments",
        lo: "ອາຫານວ່າງຟຣີ",
        zh: "免费茶点",
      },
      {
        en: "Free WiFi service",
        lo: "WiFi ຟຣີ",
        zh: "免费WiFi",
      },
    ],
    location: [
      {
        area: {
          en: "International Departure",
          lo: "ຂາອອກສາຍຕ່າງປະເທດ",
          zh: "国际出发",
        },
        floor: {
          en: "2nd Floor",
          lo: "ຊັ້ນ 2",
          zh: "2楼",
        },
        nearBy: {
          en: "Waiting area near Gate 02-03",
          lo: "ບໍລິເວນຫ້ອງລໍຖ້າ GATE 02-03",
          zh: "02-03号登机口等候区",
        },
      },
      {
        area: {
          en: "Domestic Departure",
          lo: "ຂາອອກສາຍພາຍໃນປະເທດ",
          zh: "国内出发",
        },
        floor: {
          en: "1st Floor",
          lo: "ຊັ້ນ 1",
          zh: "1楼",
        },
        nearBy: {
          en: "Waiting area near Gate 04",
          lo: "ບໍລິເວນຫ້ອງລໍຖ້າ GATE 04",
          zh: "04号登机口等候区",
        },
      },
      {
        area: {
          en: "International Arrival",
          lo: "ຂາເຂົ້າສາຍຕ່າງປະເທດ",
          zh: "国际到达",
        },
        floor: {
          en: "2nd Floor",
          lo: "ຊັ້ນ 2",
          zh: "2楼",
        },
        nearBy: {
          en: "Arrival hall area",
          lo: "ບໍລິເວນໂຖງຂາເຂົ້າ",
          zh: "到达大厅区域",
        },
      },
    ],
    pricing: [
      {
        item: { en: "Gold Package", lo: "Gold Package", zh: "黄金套餐" },
        price: "179 CNY",
      },
      {
        item: {
          en: "Premium Package",
          lo: "Premium Package",
          zh: "高级套餐",
        },
        price: "169 CNY",
      },
      {
        item: { en: "Silver Package", lo: "Silver Package", zh: "银牌套餐" },
        price: "159 CNY",
      },
    ],
  },

  {
    id: "parking-service",
    category: "transport",
    name: {
      en: "Parking Service",
      lo: "ບໍລິການລານຈອດລົດ",
      zh: "停车服务",
    },
    icon: ParkingCircle,
    color: "emerald",
    shortDescription: {
      en: "Convenient airport parking",
      lo: "ລານຈອດລົດສະໜາມບິນ",
      zh: "便捷的机场停车场",
    },
    description: {
      en: "Spacious parking facilities for passengers and visitors. Accommodates various vehicle types including motorcycles, cars, vans, and buses. Organized zones ensure order and prevent accidents.",
      lo: "ມີບໍລິການສະຖານທີ່ລານຈອດລົດເພື່ອອຳນວຍຄວາມສະດວກແກ່ຜູ້ໂດຍສານ, ຜູ້ມາຮັບ-ສົ່ງຜູ້ໂດຍສານ. ສະຖານທີ່ກວ້າງຂວາງຈອດໄດ້ຫຼາຍປະເພດ.",
      zh: "为旅客和访客提供宽敞的停车设施。可停放各种车型，包括摩托车、汽车、面包车和巴士。分区管理确保秩序，防止事故。",
    },
    features: [
      {
        en: "Spacious parking areas",
        lo: "ສະຖານທີ່ກວ້າງຂວາງ",
        zh: "宽敞的停车区",
      },
      {
        en: "Multiple vehicle types accommodated",
        lo: "ຈອດໄດ້ຫຼາຍປະເພດລົດ",
        zh: "适用多种车型",
      },
      {
        en: "Separate domestic and international parking",
        lo: "ລານຈອດໜ້າອາຄານພາຍໃນ ແລະ ຕ່າງປະເທດ",
        zh: "国内和国际航站楼分别设有停车场",
      },
      {
        en: "Organized zones for safety",
        lo: "ຈັດສັນຄວາມເປັນລະບຽບຮຽບຮ້ອຍ",
        zh: "分区管理确保安全",
      },
      {
        en: "Clear pricing structure",
        lo: "ກຳນົດຄ່າບໍລິການຊັດເຈນ",
        zh: "明确的价格结构",
      },
    ],
    location: [
      {
        area: {
          en: "Domestic Terminal Parking",
          lo: "ລານຈອດອາຄານພາຍໃນປະເທດ",
          zh: "国内航站楼停车场",
        },
        zone: "Zone 1: Bus & Taxi | Zone 2-3: General Parking & Motorcycles | Zone 4: Staff & VIP",
      },
      {
        area: {
          en: "International Terminal Parking",
          lo: "ລານຈອດອາຄານຕ່າງປະເທດ",
          zh: "国际航站楼停车场",
        },
        zone: "Zone 1: VIP & Staff | Zone 2-3: General Parking & Motorcycles | Zone 4: General Parking",
      },
    ],
    pricing: [
      {
        item: {
          en: "Motorcycle",
          lo: "ລົດໃຫຍ່",
          zh: "摩托车",
        },
        price: "30,000 LAK / 50 THB / 10 CNY",
        unit: {
          en: "per 2 hours",
          lo: "ຕໍ່ 2 ຊົ່ວໂມງ",
          zh: "每2小时",
        },
      },
      {
        item: {
          en: "Car, Pickup Truck",
          lo: "ລົດເກັງ, ລົດສາມລໍ້",
          zh: "轿车、皮卡",
        },
        price: "15,000 LAK / 25 THB / 5 CNY",
        unit: {
          en: "per 2 hours",
          lo: "ຕໍ່ 2 ຊົ່ວໂມງ",
          zh: "每2小时",
        },
      },
    ],
  },

  {
    id: "information-service",
    category: "terminal",
    name: {
      en: "Information Service",
      lo: "ບໍລິການປະຊາສຳພັນ",
      zh: "信息服务",
    },
    icon: HelpCircle,
    color: "secondary",
    shortDescription: {
      en: "Passenger assistance and information",
      lo: "ບໍລິການຂໍ້ມູນ ແລະ ຊ່ວຍເຫລືອຜູ້ໂດຍສານ",
      zh: "旅客协助和信息服务",
    },
    description: {
      en: "Comprehensive information service providing flight updates, airline information, terminal regulations, and passenger assistance. Multilingual staff available to help with inquiries.",
      lo: "ບໍລິການແຈ້ງຂໍ້ມູນຖ້ຽວບິນ, ສາຍການບິນຕ່າງໆໃຫ້ແກ່ຜູ້ໂດຍສານ. ປະກາດແຈ້ງເຕືອນທີ່ເປັນລະບຽບການຫຼື ຂໍ້ຫ້າມຕ່າງໆພາຍໃນສະໜາມບິນ.",
      zh: "全面的信息服务，提供航班更新、航空公司信息、航站楼规定和旅客协助。多语言工作人员可帮助解答问题。",
    },
    features: [
      {
        en: "Flight information and updates",
        lo: "ຂໍ້ມູນຖ້ຽວບິນ ແລະ ສາຍການບິນ",
        zh: "航班信息和更新",
      },
      {
        en: "Terminal regulations and announcements",
        lo: "ລະບຽບການ ແລະ ຂໍ້ຫ້າມພາຍໃນສະໜາມບິນ",
        zh: "航站楼规定和公告",
      },
      {
        en: "Service information within terminal",
        lo: "ຂໍ້ມູນການໃຫ້ບໍລິການຕ່າງໆພາຍໃນອາຄານ",
        zh: "航站楼内服务信息",
      },
      {
        en: "Passenger assistance and support",
        lo: "ໃຫ້ຄວາມຊ່ວຍເຫລືອຜູ້ໂດຍສານ",
        zh: "旅客协助和支持",
      },
      {
        en: "Multilingual support",
        lo: "ບໍລິການຫຼາຍພາສາ",
        zh: "多语言支持",
      },
    ],
    location: [
      {
        area: {
          en: "Main Terminal",
          lo: "ອາຄານຜູ້ໂດຍສານຫຼັກ",
          zh: "主航站楼",
        },
        nearBy: {
          en: "Near Emergency Exit 03, next to ATM service point",
          lo: "ໜ້າປະຕູທາງອອກສຸກເສີນ 03, ຂ້າງຈຸດບໍລິການຕູ້ ATM",
          zh: "紧急出口03附近，ATM服务点旁边",
        },
      },
    ],
    operatingHours: {
      en: "Daily 06:00 - 18:00",
      lo: "ທຸກວັນ 06:00 - 18:00",
      zh: "每日 06:00 - 18:00",
    },
  },

  {
    id: "atm-service",
    category: "terminal",
    name: {
      en: "ATM Services",
      lo: "ບໍລິການຕູ້ ATM",
      zh: "ATM服务",
    },
    icon: MdAtm,
    color: "pink",
    shortDescription: {
      en: "Cash withdrawal services",
      lo: "ບໍລິການຖອນເງິນສົດ",
      zh: "取款服务",
    },
    description: {
      en: "Automated teller machines located throughout the terminal for convenient cash withdrawal. Accept major international cards.",
      lo: "ຕູ້ເອທີເອັມຕັ້ງຢູ່ທົ່ວອາຄານເພື່ອຄວາມສະດວກໃນການຖອນເງິນສົດ. ຮັບບັດສາກົນຕ່າງໆ.",
      zh: "航站楼内设有自动柜员机，方便取款。接受主要国际银行卡。",
    },
    features: [
      {
        en: "Multiple ATM locations",
        lo: "ມີຫຼາຍຈຸດບໍລິການ",
        zh: "多个ATM位置",
      },
      {
        en: "Accept international cards",
        lo: "ຮັບບັດສາກົນ",
        zh: "接受国际银行卡",
      },
      {
        en: "LAK and USD withdrawal",
        lo: "ຖອນໄດ້ທັງ LAK ແລະ USD",
        zh: "可取LAK和USD",
      },
      {
        en: "24/7 availability",
        lo: "ໃຫ້ບໍລິການ 24 ຊົ່ວໂມງ",
        zh: "24/7全天服务",
      },
    ],
    location: [
      {
        area: {
          en: "Throughout Terminal",
          lo: "ທົ່ວອາຄານຜູ້ໂດຍສານ",
          zh: "整个航站楼",
        },
        nearBy: {
          en: "Multiple locations in arrivals and departures",
          lo: "ຫຼາຍຈຸດໃນພື້ນທີ່ຂາເຂົ້າ ແລະ ຂາອອກ",
          zh: "到达和出发区有多个位置",
        },
      },
    ],
  },

  {
    id: "lost-found",
    category: "terminal",
    name: {
      en: "Lost & Found",
      lo: "ບໍລິການພົວພັນຮັບເຄື່ອງ",
      zh: "失物招领",
    },
    icon: FaSearch,
    color: "rose",
    shortDescription: {
      en: "Lost items assistance",
      lo: "ບໍລິການຊອກຫາຂອງເສຍເຫຍ ຫຼື ພົບເຫັນສິ່ງຂອງ",
      zh: "失物协助",
    },
    description: {
      en: "Dedicated counter to report and claim lost items. Safe storage with 30-day holding period.",
      lo: "ເຄົາເຕີ້ພິເສດສຳລັບແຈ້ງ ແລະ ຮັບຂອງເສຍ. ເກັບຮັກສາຂອງພົບຢ່າງປອດໄພເປັນເວລາ 30 ວັນ.",
      zh: "专门柜台报告和认领遗失物品。安全存储，保管期30天。",
    },
    features: [
      {
        en: "Report lost items online or in person",
        lo: "ແຈ້ງຂອງເສຍທາງອອນລາຍ ຫຼື ດ້ວຍຕົນເອງ",
        zh: "可在线或亲自报告遗失物品",
      },
      {
        en: "Safe storage of found items",
        lo: "ເກັບຮັກສາຂອງທີ່ພົບເຫັນຢ່າງປອດໄພ",
        zh: "安全保管找到的物品",
      },
      {
        en: "30-day holding period",
        lo: "ເກັບຮັກສາ 30 ວັນ",
        zh: "保管期30天",
      },
      {
        en: "Identification required for claims",
        lo: "ຕ້ອງມີບັດປະຈຳຕົວເພື່ອຮັບຂອງ",
        zh: "认领需要身份证明",
      },
    ],
    location: [
      {
        area: {
          en: "Arrivals Hall",
          lo: "ໂຖງຂາເຂົ້າ",
          zh: "到达大厅",
        },
      },
    ],
  },

  {
    id: "security-safety",
    category: "terminal",
    name: {
      en: "Security & Safety",
      lo: "ຄວາມປອດໄພ",
      zh: "安全保卫",
    },
    icon: ShieldCheck,
    color: "green",
    shortDescription: {
      en: "Comprehensive security measures",
      lo: "ມາດຕະການຄວາມປອດໄພຢ່າງຄົບຖ້ວນ",
      zh: "全面安全措施",
    },
    description: {
      en: "24/7 security personnel, CCTV monitoring, security screening, and emergency response team ensuring passenger safety.",
      lo: "ພະນັກງານຮັກສາຄວາມປອດໄພ 24/7, ກ້ອງວົງຈອນປິດ, ການກວດຄວາມປອດໄພ ແລະ ທີມຮັບມືສຸກເສີນ.",
      zh: "24/7安保人员、闭路电视监控、安全检查和应急响应团队确保旅客安全。",
    },
    features: [
      {
        en: "24/7 security personnel",
        lo: "ພະນັກງານຮັກສາຄວາມປອດໄພ 24 ຊົ່ວໂມງ",
        zh: "24/7安保人员",
      },
      {
        en: "CCTV monitoring throughout terminal",
        lo: "ກ້ອງວົງຈອນປິດທົ່ວອາຄານ",
        zh: "航站楼全程闭路电视监控",
      },
      {
        en: "Security screening at all entry points",
        lo: "ກວດຄວາມປອດໄພທຸກຈຸດທາງເຂົ້າ",
        zh: "所有入口安全检查",
      },
      {
        en: "Emergency response team",
        lo: "ທີມຮັບມືສຸກເສີນ",
        zh: "应急响应团队",
      },
    ],
  },

  {
    id: "announcements",
    category: "terminal",
    name: {
      en: "Flight Announcements",
      lo: "ການປະກາດຖ້ຽວບິນ",
      zh: "航班广播",
    },
    icon: Megaphone,
    color: "indigo",
    shortDescription: {
      en: "Multilingual flight information",
      lo: "ຂໍ້ມູນຖ້ຽວບິນຫຼາຍພາສາ",
      zh: "多语言航班信息",
    },
    description: {
      en: "Multilingual announcements in Lao, English, and Chinese for flight status updates, gate changes, and emergency notifications.",
      lo: "ການປະກາດເປັນພາສາລາວ, ອັງກິດ ແລະ ຈີນ ສຳລັບການອັບເດດສະຖານະຖ້ຽວບິນ, ການປ່ຽນປະຕູຂື້ນເຮືອບິນ ແລະ ການແຈ້ງເຕືອນສຸກເສີນ.",
      zh: "以老挝语、英语和中文进行多语言广播，提供航班状态更新、登机口变更和紧急通知。",
    },
    features: [
      {
        en: "Multilingual (Lao, English, Chinese)",
        lo: "ຫຼາຍພາສາ (ລາວ, ອັງກິດ, ຈີນ)",
        zh: "多语言（老挝语、英语、中文）",
      },
      {
        en: "Flight status updates",
        lo: "ອັບເດດສະຖານະຖ້ຽວບິນ",
        zh: "航班状态更新",
      },
      {
        en: "Gate change notifications",
        lo: "ແຈ້ງການປ່ຽນປະຕູຂື້ນເຮືອບິນ",
        zh: "登机口变更通知",
      },
      {
        en: "Information displays throughout terminal",
        lo: "ຈໍສະແດງຂໍ້ມູນທົ່ວອາຄານ",
        zh: "航站楼全程信息显示",
      },
    ],
  },

  {
    id: "dining-beverage",
    category: "hospitality",
    name: {
      en: "Dining & Beverage",
      lo: "ອາຫານ ແລະ ເຄື່ອງດື່ມ",
      zh: "餐饮服务",
    },
    icon: IoRestaurantOutline,
    color: "lime",
    shortDescription: {
      en: "Food and beverage options",
      lo: "ທາງເລືອກອາຫານ ແລະ ເຄື່ອງດື່ມ",
      zh: "餐饮选择",
    },
    description: {
      en: "Variety of restaurants, cafes, and beverage outlets offering local Lao cuisine and international options.",
      lo: "ຮ້ານອາຫານ, ຮ້ານກາເຟ ແລະ ຈຸດຂາຍເຄື່ອງດື່ມຫຼາກຫຼາຍທີ່ສະເໜີອາຫານລາວ ແລະ ອາຫານສາກົນ.",
      zh: "各种餐厅、咖啡馆和饮料店，提供老挝本地美食和国际选择。",
    },
    features: [
      {
        en: "Local Lao and international cuisine",
        lo: "ອາຫານລາວ ແລະ ອາຫານສາກົນ",
        zh: "老挝和国际美食",
      },
      {
        en: "Coffee shops and cafes",
        lo: "ຮ້ານກາເຟ",
        zh: "咖啡店和咖啡馆",
      },
      {
        en: "Snack bars and convenience stores",
        lo: "ຮ້ານຂາຍອາຫານວ່າງ",
        zh: "小吃店和便利店",
      },
      {
        en: "Takeaway options available",
        lo: "ມີບໍລິການອາຫານເທກເອວ",
        zh: "提供外卖服务",
      },
    ],
  },

  {
    id: "joyful-service",
    category: "terminal",
    name: {
      en: "Passenger Comfort",
      lo: "ຄວາມສະດວກສະບາຍຂອງຜູ້ໂດຍສານ",
      zh: "旅客舒适设施",
    },
    icon: Heart,
    color: "violet",
    shortDescription: {
      en: "Comfort and convenience amenities",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກສະບາຍ",
      zh: "舒适便利设施",
    },
    description: {
      en: "Experience comfort with modern seating, family rooms, children's play areas, prayer rooms, and free WiFi throughout the terminal.",
      lo: "ປະສົບການຄວາມສະດວກສະບາຍດ້ວຍບ່ອນນັ່ງທີ່ທັນສະໄໝ, ຫ້ອງຄອບຄົວ, ພື້ນທີ່ຫຼີ້ນສຳລັບເດັກນ້ອຍ, ຫ້ອງສວດມົນ ແລະ WiFi ຟຣີທົ່ວອາຄານ.",
      zh: "提供现代座椅、家庭房、儿童游乐区、祈祷室和全航站楼免费WiFi的舒适体验。",
    },
    features: [
      {
        en: "Modern comfortable seating",
        lo: "ບ່ອນນັ່ງທີ່ທັນສະໄໝສະດວກສະບາຍ",
        zh: "现代舒适座椅",
      },
      {
        en: "Family rooms and nursing facilities",
        lo: "ຫ້ອງຄອບຄົວ ແລະ ຫ້ອງໃຫ້ນົມລູກ",
        zh: "家庭房和哺乳设施",
      },
      {
        en: "Children's play areas",
        lo: "ພື້ນທີ່ຫຼີ້ນສຳລັບເດັກນ້ອຍ",
        zh: "儿童游乐区",
      },
      {
        en: "Prayer rooms and quiet spaces",
        lo: "ຫ້ອງສວດມົນ ແລະ ພື້ນທີ່ງຽບສະຫງົບ",
        zh: "祈祷室和安静空间",
      },
      {
        en: "Free WiFi throughout terminal",
        lo: "WiFi ຟຣີທົ່ວອາຄານ",
        zh: "全航站楼免费WiFi",
      },
    ],
  },

  {
    id: "baggage-cart",
    category: "terminal",
    name: {
      en: "Baggage Cart Service",
      lo: "ບໍລິການລໍ້ເຂັນສຳພາລະ",
      zh: "行李推车服务",
    },
    icon: LuBaggageClaim,
    color: "cyan",
    shortDescription: {
      en: "Free baggage carts",
      lo: "ລໍ້ເຂັນສຳພາລະຟຣີ",
      zh: "免费行李推车",
    },
    description: {
      en: "Free baggage carts available throughout the terminal at arrivals and departures areas, available 24/7.",
      lo: "ລໍ້ເຂັນສຳພາລະຟຣີທົ່ວອາຄານ ໃນພື້ນທີ່ຂາເຂົ້າ ແລະ ຂາອອກ, ມີໃຫ້ບໍລິການ 24 ຊົ່ວໂມງ.",
      zh: "航站楼到达和出发区提供免费行李推车，24/7全天可用。",
    },
    features: [
      {
        en: "Located at arrivals and departures",
        lo: "ຕັ້ງຢູ່ພື້ນທີ່ຂາເຂົ້າ ແລະ ຂາອອກ",
        zh: "位于到达和出发区",
      },
      {
        en: "Free of charge for all passengers",
        lo: "ຟຣີສຳລັບຜູ້ໂດຍສານທຸກທ່ານ",
        zh: "所有旅客免费使用",
      },
      {
        en: "Easy to maneuver design",
        lo: "ອອກແບບໃຫ້ເຄື່ອນຍ້າຍງ່າຍ",
        zh: "易于操控的设计",
      },
      {
        en: "Available 24/7",
        lo: "ມີໃຫ້ບໍລິການ 24 ຊົ່ວໂມງ",
        zh: "24/7全天可用",
      },
    ],
  },
];

export const getColorClasses = (color: ServiceColor) => {
  switch (color) {
    case "purple":
    case "violet":
      return {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        dot: "bg-purple-600",
        border: "border-purple-200",
        hover: "hover:border-purple-400 hover:bg-purple-100",
      };

    case "blue":
    case "cyan":
      return {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        dot: "bg-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-400 hover:bg-blue-100",
      };

    case "amber":
    case "orange":
      return {
        bg: "bg-amber-50",
        icon: "text-amber-600",
        dot: "bg-amber-600",
        border: "border-amber-200",
        hover: "hover:border-amber-400 hover:bg-amber-100",
      };

    case "emerald":
    case "green":
      return {
        bg: "bg-emerald-50",
        icon: "text-emerald-600",
        dot: "bg-emerald-600",
        border: "border-emerald-200",
        hover: "hover:border-emerald-400 hover:bg-emerald-100",
      };

    case "teal":
      return {
        bg: "bg-teal-50",
        icon: "text-teal-600",
        dot: "bg-teal-600",
        border: "border-teal-200",
        hover: "hover:border-teal-400 hover:bg-teal-100",
      };

    case "pink":
      return {
        bg: "bg-pink-50",
        icon: "text-pink-600",
        dot: "bg-pink-600",
        border: "border-pink-200",
        hover: "hover:border-pink-400 hover:bg-pink-100",
      };

    case "rose":
      return {
        bg: "bg-rose-50",
        icon: "text-rose-600",
        dot: "bg-rose-600",
        border: "border-rose-200",
        hover: "hover:border-rose-400 hover:bg-rose-100",
      };

    case "indigo":
      return {
        bg: "bg-indigo-50",
        icon: "text-indigo-600",
        dot: "bg-indigo-600",
        border: "border-indigo-200",
        hover: "hover:border-indigo-400 hover:bg-indigo-100",
      };

    case "primary":
      return {
        bg: "bg-primary-50",
        icon: "text-primary-600",
        dot: "bg-primary-600",
        border: "border-primary-200",
        hover: "hover:border-primary-400 hover:bg-primary-100",
      };

    case "secondary":
      return {
        bg: "bg-secondary-50",
        icon: "text-secondary-600",
        dot: "bg-secondary-600",
        border: "border-secondary-200",
        hover: "hover:border-secondary-400 hover:bg-secondary-100",
      };

    case "slate":
      return {
        bg: "bg-slate-50",
        icon: "text-slate-600",
        dot: "bg-slate-600",
        border: "border-slate-200",
        hover: "hover:border-slate-400 hover:bg-slate-100",
      };

    case "gray":
      return {
        bg: "bg-gray-50",
        icon: "text-gray-600",
        dot: "bg-gray-600",
        border: "border-gray-200",
        hover: "hover:border-gray-400 hover:bg-gray-100",
      };

    case "zinc":
      return {
        bg: "bg-zinc-50",
        icon: "text-zinc-600",
        dot: "bg-zinc-600",
        border: "border-zinc-200",
        hover: "hover:border-zinc-400 hover:bg-zinc-100",
      };

    case "neutral":
      return {
        bg: "bg-neutral-50",
        icon: "text-neutral-600",
        dot: "bg-neutral-600",
        border: "border-neutral-200",
        hover: "hover:border-neutral-400 hover:bg-neutral-100",
      };

    case "stone":
      return {
        bg: "bg-stone-50",
        icon: "text-stone-600",
        dot: "bg-stone-600",
        border: "border-stone-200",
        hover: "hover:border-stone-400 hover:bg-stone-100",
      };

    case "yellow":
      return {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        dot: "bg-yellow-600",
        border: "border-yellow-200",
        hover: "hover:border-yellow-400 hover:bg-yellow-100",
      };

    case "lime":
      return {
        bg: "bg-lime-50",
        icon: "text-lime-600",
        dot: "bg-lime-600",
        border: "border-lime-200",
        hover: "hover:border-lime-400 hover:bg-lime-100",
      };

    case "fuchsia":
      return {
        bg: "bg-fuchsia-50",
        icon: "text-fuchsia-600",
        dot: "bg-fuchsia-600",
        border: "border-fuchsia-200",
        hover: "hover:border-fuchsia-400 hover:bg-fuchsia-100",
      };

    default:
      return {
        bg: "bg-primary-50",
        icon: "text-primary-600",
        dot: "bg-primary-600",
        border: "border-primary-200",
        hover: "hover:border-primary-400 hover:bg-primary-100",
      };
  }
};

// Helper function to filter services by category
export function getServicesByCategory(category: ServiceCategory) {
  return facilitiesServices.filter((service) => service.category === category);
}

// Helper function to get all categories
export function getAllCategories(): {
  id: ServiceCategory;
  name: MultilingualText;
}[] {
  return [
    {
      id: "terminal",
      name: {
        en: "Terminal Services",
        lo: "ບໍລິການພາຍໃນອາຄານ",
        zh: "航站楼服务",
      },
    },
    {
      id: "transport",
      name: {
        en: "Transportation",
        lo: "ການຂົນສົ່ງ",
        zh: "交通运输",
      },
    },
    {
      id: "hospitality",
      name: {
        en: "Hospitality Services",
        lo: "ບໍລິການຕ້ອນຮັບ",
        zh: "接待服务",
      },
    },
  ];
}
