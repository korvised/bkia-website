import {
  Briefcase,
  Building,
  Calendar,
  Car,
  FileText,
  Luggage,
  Plane,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { NavigationItem } from "@/types/navigation";

export const passengerItems: NavigationItem[] = [
  {
    id: "flights",
    title: {
      en: "Flight Information",
      lo: "ຂໍ້ມູນຖ້ຽວບິນ",
      zh: "航班信息",
    },
    icon: Plane,
    color: "bg-teal-500",
    href: "/flights",
    description: {
      en: "Flight schedules and real-time updates",
      lo: "ຕາລາງຖ້ຽວບິນ ແລະ ຂໍ້ມູນປັດຈຸບັນ",
      zh: "航班查询、航班时刻表",
    },
  },
  {
    id: "transportation",
    title: {
      en: "Traffic guidance",
      lo: "ຄຳແນະນຳດ້ານຈະລາຈອນ",
      zh: "交通导引",
    },
    icon: Car,
    color: "bg-cyan-500",
    href: "/transportation",
    description: {
      en: "Buses, taxis, parking, and car rental",
      lo: "ລົດເມ, ແທັກຊີ, ບ່ອນຈອດລົດ, ແລະ ການເຊົ່າລົດ",
      zh: "大巴、出租车、停车、租车",
    },
  },
  {
    id: "guide",
    title: {
      en: "Flight Guide",
      lo: "ຄູ່ມືການເດີນທາງ",
      zh: "乘机指南",
    },
    icon: Luggage,
    color: "bg-green-500",
    href: "/guide",
    description: {
      en: "Passenger flight process, Facility service",
      lo: "ຂັ້ນຕອນການເດີນທາງ ແລະ ບໍລິການສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "旅客乘机流程、设施服务",
    },
  },
  {
    id: "notices",
    title: {
      en: "Notices & Announcements",
      lo: "ປະກາດ-ແຈ້ງການ ",
      zh: "通知公告",
    },
    icon: Calendar,
    color: "bg-blue-600",
    href: "/notices",
    description: {
      en: "Important notice, Lost & Found",
      lo: "ແຈ້ງການສຳຄັນ, ເຄື່ອງເສຍ&ຮັບຄືນ",
      zh: "重要通知、失物信息",
    },
  },
  {
    id: "dining",
    title: {
      en: "Dining & Shopping",
      lo: "ອາຫານ ແລະ ຮ້ານຄ້າ",
      zh: "餐饮购物",
    },
    icon: UtensilsCrossed,
    color: "bg-teal-600",
    href: "/services/dining-shopping",
    description: {
      en: "Restaurants, cafes, and shopping",
      lo: "ຮ້ານອາຫານ, ຮ້ານກາເຟ, ແລະ ການຊື້ເຄື່ອງ",
      zh: "餐饮零售服务、价格表",
    },
  },
  {
    id: "cultural",
    title: {
      en: "Cultural Activities",
      lo: "ກິດຈະກຳວັດທະນະທຳ",
      zh: "文化活动",
    },
    icon: Calendar,
    color: "bg-cyan-600",
    href: "/services/cultural-interaction",
    description: {
      en: "Cultural exhibitions and activities",
      lo: "ການວາງສະແດງວັດທະນະທຳ ແລະ ກິດຈະກຳ",
      zh: "丰富的候机楼文化活动",
    },
  },
  {
    id: "joyful",
    title: {
      en: "Joyful Services",
      lo: "ບໍລິການເສີມ",
      zh: "禧悦服务",
    },
    icon: User,
    color: "bg-teal-700",
    href: "/services/joyful-service",
    description: {
      en: "VIP and premium passenger services",
      lo: "ບໍລິການຮັບຮອງແຂກພິເສດ VIP",
      zh: "提供嘉宾贵宾国宾服务",
    },
  },
];

export const aboutUsItems: NavigationItem[] = [
  {
    id: "overview",
    title: {
      en: "Airport Overview",
      lo: "ພາບລວມສະໜາມບິນ",
      zh: "机场概况",
    },
    icon: Building,
    color: "bg-teal-500",
    href: "/about/overview",
    description: {
      en: "Explore airport operations",
      lo: "ສຳຫຼວດການດຳເນີນງານສະໜາມບິນ",
      zh: "搜素机场的运行",
    },
  },
  {
    id: "company",
    title: {
      en: "Airport Profile",
      lo: "ປະຫວັດຫຍໍ້ ",
      zh: "公司简介",
    },
    icon: Briefcase,
    color: "bg-cyan-500",
    href: "/about/company",
    description: {
      en: "Learn about Bokeo International Airport",
      lo: "ທຳຄວາມຮູ້ຈັກກັບບໍລິສັດສະໜາມບິນສາກົນບໍ່ແກ້ວຈຳກັດ",
      zh: "了解博胶国际机场有限公司",
    },
  },
  {
    id: "procurement",
    title: {
      en: "Bidding notice",
      lo: "ແຈ້ງປະມູນ ",
      zh: "招标公告",
    },
    icon: FileText,
    color: "bg-green-500",
    href: "/about/procurement",
    description: {
      en: "Airport Bidding Information ",
      lo: "ຂ່າວສານການປະມູນຂອງສະໜາມບິນ",
      zh: "机场各类招投标信息",
    },
  },
  {
    id: "careers",
    title: {
      en: "Recruitment",
      lo: "ຮັບສະໝັກພະນັກງານ ",
      zh: "人才招聘",
    },
    icon: Users,
    color: "bg-blue-600",
    href: "/about/careers",
    description: {
      en: "Job opportunities and recruitment",
      lo: "ໂອກາດເຮັດວຽກ ແລະ ການສະໝັກງານ",
      zh: "机场各岗位人才招聘信息",
    },
  },
  {
    id: "news",
    title: {
      en: "Airport News",
      lo: "ຂ່າວສານສະໜາມບິນ",
      zh: "空港新闻",
    },
    icon: Calendar,
    color: "bg-teal-600",
    href: "/news",
    description: {
      en: "Latest news and updates",
      lo: "ຂ່າວສານ ແລະ ການອັບເດດຫຼ້າສຸດ",
      zh: "新闻、图片和视频资料",
    },
  },
  {
    id: "history",
    title: {
      en: "Development History",
      lo: "ປະຫວັດການພັດທະນາ",
      zh: "发展历史",
    },
    icon: Building,
    color: "bg-cyan-600",
    href: "/about/history",
    description: {
      en: "Our development journey",
      lo: "ປະຫວັດການພັດທະນາຂອງສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      zh: "回顾博胶国际机场的发展历史",
    },
  },
  {
    id: "cargo",
    title: {
      en: "Air Cargo",
      lo: "ຂົນສົ່ງສິນຄ້າທາງອາກາດ",
      zh: "航空货运",
    },
    icon: Plane,
    color: "bg-teal-700",
    href: "/cargo",
    description: {
      en: "Air cargo and freight services",
      lo: "ບໍລິການຂົນສົ່ງທາງອາກາດ",
      zh: "提供航空货运代理服务",
    },
  },
];
