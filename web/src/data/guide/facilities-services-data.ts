import { IconType } from "react-icons";
import {
  Droplets,
  HelpCircle,
  LucideIcon,
  Megaphone,
  Wifi,
} from "lucide-react";
import { MultilingualText } from "@/types/language";
import { MdAtm, MdChildCare, MdMosque } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";
import { IoRestaurantOutline } from "react-icons/io5";
import { GiPrayer } from "react-icons/gi";
import { FaRestroom } from "react-icons/fa";

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
  location?: ServiceLocation[];
}

export const facilitiesServices: FacilityService[] = [
  {
    id: "free-wifi",
    category: "terminal",
    name: { en: "Free WiFi", lo: "WiFi ຟຣີ", zh: "免费无线网络" },
    icon: Wifi,
    color: "indigo",
    shortDescription: {
      en: "High-speed internet",
      lo: "ອິນເຕີເນັດຄວາມໄວສູງ",
      zh: "高速上网",
    },
    description: {
      en: "High-speed wireless internet available throughout the terminal for all passengers.",
      lo: "ບໍລິການອິນເຕີເນັດຄວາມໄວສູງແບບບໍ່ມີສາຍທົ່ວອາຄານຜູ້ໂດຍສານ.",
      zh: "航站楼全覆盖免费高速无线网络。",
    },
    location: [
      {
        area: {
          en: "Entire Terminal",
          lo: "ທົ່ວອາຄານຜູ້ໂດຍສານ",
          zh: "整个航站楼",
        },
      },
    ],
  },
  {
    id: "drinking-water",
    category: "terminal",
    name: { en: "Drinking Water", lo: "ຕູ້ກົດນໍ້າ", zh: "饮用水" },
    icon: Droplets,
    color: "blue",
    shortDescription: {
      en: "Free purified water",
      lo: "ບໍລິການນໍ້າດື່ມຟຣີ",
      zh: "免费饮用水",
    },
    description: {
      en: "Complimentary purified drinking water stations located conveniently throughout the terminal.",
      lo: "ຈຸດບໍລິການນໍ້າດື່ມບໍລິສຸດຟຣີ ຕິດຕັ້ງໄວ້ຕາມຈຸດຕ່າງໆທົ່ວອາຄານ.",
      zh: "航站楼遍布免费纯净饮用水直饮点。",
    },
    location: [
      {
        area: {
          en: "Throughout Terminal",
          lo: "ທົ່ວອາຄານຜູ້ໂດຍສານ",
          zh: "整个航站楼",
        },
        nearBy: {
          en: "Near restroom areas",
          lo: "ໃກ້ບໍລິເວນໜ້າຫ້ອງນໍ້າ",
          zh: "靠近洗手间区域",
        },
      },
    ],
  },
  {
    id: "restrooms",
    category: "terminal",
    name: { en: "Restrooms", lo: "ຫ້ອງນໍ້າ", zh: "洗手间" },
    icon: FaRestroom,
    color: "slate",
    shortDescription: {
      en: "Clean public toilets",
      lo: "ຫ້ອງນໍ້າສາທາລະນະ",
      zh: "公共洗手间",
    },
    description: {
      en: "Modern restroom facilities including accessible toilets and baby changing stations.",
      lo: "ຫ້ອງນໍ້າທີ່ສະອາດ ແລະ ທັນສະໄໝ ລວມມີຫ້ອງນໍ້າຄົນພິການ ແລະ ຈຸດປ່ຽນຜ້າອ້ອມ.",
      zh: "干净整洁的卫生设施，设有无障碍和婴儿设施。",
    },
    location: [
      {
        area: {
          en: "Throughout Terminal",
          lo: "ທົ່ວອາຄານຜູ້ໂດຍສານ",
          zh: "整个航站楼",
        },
      },
    ],
  },
  {
    id: "information-service",
    category: "terminal",
    name: { en: "Information Service", lo: "ໂຕະປະຊາສຳພັນ", zh: "信息服务" },
    icon: HelpCircle,
    color: "secondary",
    shortDescription: {
      en: "Passenger assistance",
      lo: "ຊ່ວຍເຫລືອຜູ້ໂດຍສານ",
      zh: "旅客协助",
    },
    description: {
      en: "Information desk for flight updates, airport regulations, and general passenger inquiries.",
      lo: "ບໍລິການຂໍ້ມູນຖ້ຽວບິນ, ລະບຽບການສະໜາມບິນ ແລະ ຕອບຂໍ້ຊັກຖາມທົ່ວໄປ.",
      zh: "提供航班动态、机场规定及旅客咨询服务。",
    },
    location: [
      {
        area: { en: "Main Terminal", lo: "ອາຄານຜູ້ໂດຍສານຫຼັກ", zh: "主航站楼" },
        nearBy: {
          en: "Near Emergency Exit 03",
          lo: "ໃກ້ປະຕູທາງອອກສຸກເສີນ 03",
          zh: "紧急出口03附近",
        },
      },
    ],
  },
  {
    id: "announcements",
    category: "terminal",
    name: { en: "Flight Announcements", lo: "ການປະກາດຖ້ຽວບິນ", zh: "航班广播" },
    icon: Megaphone,
    color: "violet",
    shortDescription: {
      en: "Multilingual updates",
      lo: "ຂໍ້ມູນຖ້ຽວບິນຫຼາຍພາສາ",
      zh: "多语言信息",
    },
    description: {
      en: "Regular flight updates and security announcements in Lao, English, and Chinese.",
      lo: "ປະກາດອັບເດດຖ້ຽວບິນ ແລະ ແຈ້ງການຕ່າງໆ ເປັນພາສາລາວ, ອັງກິດ ແລະ ຈີນ.",
      zh: "以老挝语、英语和中文进行航班及安全广播。",
    },
    location: [
      {
        area: { en: "Throughout Terminal", lo: "ທົ່ວອາຄານຜູ້ໂດຍສານ", zh: "整个航站楼" },
      },
    ],
  },
  {
    id: "atm-service",
    category: "terminal",
    name: { en: "ATM Services", lo: "ຕູ້ ATM", zh: "ATM服务" },
    icon: MdAtm,
    color: "rose",
    shortDescription: {
      en: "Cash withdrawal",
      lo: "ບໍລິການຖອນເງິນສົດ",
      zh: "取款服务",
    },
    description: {
      en: "24/7 ATM machines accepting major international cards for easy cash withdrawal.",
      lo: "ຕູ້ເອທີເອັມບໍລິການ 24 ຊົ່ວໂມງ.",
      zh: "24小时自动柜员机，支持各大国际银行卡。",
    },
    location: [
      {
        area: { en: "Near Gate 03", lo: "ທາງເຂົ້າປະຕູ 03", zh: "靠近3号登机口" },
      },
    ],
  },
  {
    id: "mother-child-room",
    category: "terminal",
    name: { en: "Mother & Child Room", lo: "ຫ້ອງລ້ຽງເດັກ", zh: "母婴室" },
    icon: MdChildCare,
    color: "fuchsia",
    shortDescription: {
      en: "Nursing facilities",
      lo: "ຫ້ອງໃຫ້ນົມລູກ",
      zh: "哺乳和育儿",
    },
    description: {
      en: "Private and comfortable space for mothers to feed and care for their infants.",
      lo: "ພື້ນທີ່ສ່ວນຕົວ ແລະ ສະດວກສະບາຍ ສຳລັບການໃຫ້ນົມ ແລະ ດູແລເດັກ.",
      zh: "为母亲提供私密的哺乳和照顾婴儿空间。",
    },
    location: [
      {
        area: {
          en: "International Departure",
          lo: "ຂາອອກສາຍຕ່າງປະເທດ",
          zh: "国际出发",
        },
        floor: { en: "2nd Floor", lo: "ຊັ້ນ 2", zh: "2楼" },
      },
    ],
  },
  {
    id: "prayer-room",
    category: "terminal",
    name: { en: "Prayer Room", lo: "ຫ້ອງພຣະ", zh: "祈祷室" },
    icon: GiPrayer,
    color: "amber",
    shortDescription: {
      en: "Buddhist meditation",
      lo: "ຫ້ອງກາບໄຫວ້ພຣະ",
      zh: "佛教祈祷",
    },
    description: {
      en: "A quiet space for passengers to pay respect and pray before their journey.",
      lo: "ຫ້ອງສະຫງົບສຳລັບຜູ້ໂດຍສານກາບໄຫວ້ພຣະ ແລະ ຂໍພອນກ່ອນການເດີນທາງ.",
      zh: "为旅客提供旅途前礼佛祈福的宁静空间。",
    },
  },
  {
    id: "muslim-prayer-room",
    category: "terminal",
    name: { en: "Muslim Prayer Room", lo: "ຫ້ອງລະມາດ", zh: "穆斯林祈祷室" },
    icon: MdMosque,
    color: "emerald",
    shortDescription: {
      en: "Islamic prayer hall",
      lo: "ຫ້ອງໄຫວ້ສາດສະໜາອິດສະລາມ",
      zh: "伊斯兰祈祷",
    },
    description: {
      en: "Dedicated facilities for Muslim passengers to perform religious worship.",
      lo: "ຫ້ອງສຳລັບຜູ້ໂດຍສານສາດສະໜາມຸດສະລິມ ນຳໃຊ້ໃນການໄຫວ້ສັກກາລະ.",
      zh: "专为穆斯林旅客提供的宗教礼拜场所。",
    },
  },
  {
    id: "dining-beverage",
    category: "hospitality",
    name: {
      en: "Dining & Beverage",
      lo: "ຮ້ານຄ້າ",
      zh: "餐饮服务",
    },
    icon: IoRestaurantOutline,
    color: "lime",
    shortDescription: {
      en: "Food options",
      lo: "ເຄຶ່ອງດື່ມ ແລະ ຂະໜົມ",
      zh: "餐饮选择",
    },
    description: {
      en: "Variety of cafes and restaurants serving local Lao and international cuisine.",
      lo: "ຮ້ານອາຫານ ແລະ ກາເຟ ທີ່ບໍລິການອາຫານລາວ ແລະ ສາກົນ.",
      zh: "提供老挝本地美食和国际选择的各类餐厅。",
    },
    location: [
      {
        area: { en: "Departure Waiting Hall", lo: "ຫ້ອງລໍຖ້າຂື້ນເຮືອບິນ", zh: "候机大厅" },
        nearBy: { en: "Near Gate 03", lo: "ທາງເຂົ້າປະຕູ 03", zh: "靠近3号登机口" },
      },
    ],
  },
  {
    id: "baggage-cart",
    category: "terminal",
    name: { en: "Baggage Cart", lo: "ລໍ້ຍູ້ກສຳພາລະ", zh: "行李推车" },
    icon: LuBaggageClaim,
    color: "cyan",
    shortDescription: { en: "Free carts", lo: "ລໍ້ຍູ້ກຟຣີ", zh: "免费推车" },
    description: {
      en: "Complimentary baggage carts available 24/7 throughout the terminal.",
      lo: "ບໍລິການລໍ້ຍູ້ກສຳພາລະຟຣີ 24 ຊົ່ວໂມງ.",
      zh: "航站楼内提供24/7免费行李推车服务。",
    },
    location: [
      {
        area: { en: "Terminal Entrance", lo: "ຢູ່ໜ້າທາງເຂົ້າອາຄານ", zh: "航站楼入口" },
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
