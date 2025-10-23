// Navigation structure
interface NavItem {
  id: string;
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
  hasDropdown: boolean;
  children?: {
    label: {
      en: string;
      lo: string;
      zh: string;
    };
    href: string;
    description: {
      en: string;
      lo: string;
      zh: string;
    };
  }[];
  adImage?: string;
  adTitle?: {
    en: string;
    lo: string;
    zh: string;
  };
  adDescription?: {
    en: string;
    lo: string;
    zh: string;
  };
}

// Main Navigation Items
export const mainNavigation: NavItem[] = [
  {
    id: "flights",
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    href: "/flights",
    hasDropdown: true,
    children: [
      {
        label: { en: "Arrivals", lo: "ຖ້ຽວບິນມາຮອດ", zh: "到达航班" },
        href: "/flights/arrivals",
        description: {
          en: "Check incoming flights",
          lo: "ກວດເບິ່ງຖ້ຽວບິນທີ່ມາຮອດ",
          zh: "查看到达航班",
        },
      },
      {
        label: { en: "Departures", lo: "ຖ້ຽວບິນອອກ", zh: "出发航班" },
        href: "/flights/departures",
        description: {
          en: "Check outgoing flights",
          lo: "ກວດເບິ່ງຖ້ຽວບິນທີ່ອອກ",
          zh: "查看出发航班",
        },
      },
      {
        label: { en: "Flight Status", lo: "ສະຖານະຖ້ຽວບິນ", zh: "航班状态" },
        href: "/flights/status",
        description: {
          en: "Track your flight",
          lo: "ຕິດຕາມຖ້ຽວບິນຂອງທ່ານ",
          zh: "跟踪您的航班",
        },
      },
      {
        label: { en: "Airlines", lo: "ສາຍການບິນ", zh: "航空公司" },
        href: "/flights/airlines",
        description: {
          en: "View all airlines",
          lo: "ເບິ່ງສາຍການບິນທັງໝົດ",
          zh: "查看所有航空公司",
        },
      },
    ],
    adImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    adTitle: {
      en: "Real-Time Flight Info",
      lo: "ຂໍ້ມູນຖ້ຽວບິນແບບສົດ",
      zh: "实时航班信息",
    },
    adDescription: {
      en: "Track flights in real-time",
      lo: "ຕິດຕາມຖ້ຽວບິນແບບສົດ",
      zh: "实时跟踪航班",
    },
  },
  {
    id: "passenger-guide",
    label: { en: "Passenger Guide", lo: "ຄູ່ມືຜູ້ໂດຍສານ", zh: "旅客指南" },
    href: "/guides",
    hasDropdown: true,
    children: [
      {
        label: { en: "Check-in", lo: "ເຊັກອິນ", zh: "办理登机" },
        href: "/guides/checkin",
        description: {
          en: "Check-in procedures",
          lo: "ຂັ້ນຕອນການເຊັກອິນ",
          zh: "办理登机手续",
        },
      },
      {
        label: { en: "Security", lo: "ຄວາມປອດໄພ", zh: "安检" },
        href: "/guides/security",
        description: {
          en: "Security guidelines",
          lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ",
          zh: "安检指南",
        },
      },
      {
        label: { en: "Baggage", lo: "ກະເປົາ", zh: "行李" },
        href: "/guides/baggage",
        description: {
          en: "Baggage information",
          lo: "ຂໍ້ມູນກ່ຽວກັບກະເປົາ",
          zh: "行李信息",
        },
      },
      {
        label: { en: "Terminal Guide", lo: "ຄູ່ມືເຕີມິນອນ", zh: "航站楼指南" },
        href: "/guides/terminal",
        description: {
          en: "Navigate the terminal",
          lo: "ນຳທາງເຕີມິນອນ",
          zh: "航站楼导航",
        },
      },
    ],
    adImage:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=300&fit=crop",
    adTitle: {
      en: "Smooth Journey",
      lo: "ການເດີນທາງທີ່ລຽບງ່າຍ",
      zh: "顺畅旅程",
    },
    adDescription: {
      en: "Hassle-free experience",
      lo: "ປະສົບການບໍ່ມີບັນຫາ",
      zh: "无忧体验",
    },
  },
  {
    id: "transport",
    label: { en: "Transport", lo: "ການຂົນສົ່ງ", zh: "交通" },
    href: "/transportations",
    hasDropdown: true,
    children: [
      {
        label: {
          en: "Ground Transport",
          lo: "ການຂົນສົ່ງພາກພື້ນດິນ",
          zh: "地面交通",
        },
        href: "/transportations/ground",
        description: {
          en: "Buses, taxis, shuttles",
          lo: "ລົດເມ, ແທັກຊີ, ລົດຮັບສົ່ງ",
          zh: "巴士、出租车",
        },
      },
      {
        label: { en: "Parking", lo: "ບ່ອນຈອດລົດ", zh: "停车" },
        href: "/transportations/parking",
        description: {
          en: "Parking facilities",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກຈອດລົດ",
          zh: "停车设施",
        },
      },
      {
        label: { en: "Car Rental", lo: "ເຊົ່າລົດ", zh: "租车" },
        href: "/transportations/rental",
        description: {
          en: "Rent a vehicle",
          lo: "ເຊົ່າພາຫະນະ",
          zh: "租赁车辆",
        },
      },
      {
        label: { en: "Directions", lo: "ທິດທາງ", zh: "方向" },
        href: "/transportations/directions",
        description: {
          en: "How to get here",
          lo: "ວິທີການມາເຖິງ",
          zh: "如何到达",
        },
      },
    ],
    adImage:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    adTitle: {
      en: "Easy Transportation",
      lo: "ການຂົນສົ່ງສະດວກ",
      zh: "便捷交通",
    },
    adDescription: {
      en: "24/7 transport options",
      lo: "ທາງເລືອກຂົນສົ່ງ 24/7",
      zh: "24/7交通选择",
    },
  },
  {
    id: "shop-dine",
    label: { en: "Shop & Dine", lo: "ຊື້ເຄື່ອງ & ອາຫານ", zh: "购物餐饮" },
    href: "/dining-shopping",
    hasDropdown: true,
    children: [
      {
        label: { en: "Restaurants", lo: "ຮ້ານອາຫານ", zh: "餐厅" },
        href: "/dining-shopping/restaurants",
        description: {
          en: "Dining options",
          lo: "ທາງເລືອກອາຫານ",
          zh: "用餐选择",
        },
      },
      {
        label: { en: "Cafés", lo: "ຮ້ານກາເຟ", zh: "咖啡厅" },
        href: "/dining-shopping/cafes",
        description: {
          en: "Coffee and snacks",
          lo: "ກາເຟ ແລະ ອາຫານວ່າງ",
          zh: "咖啡小吃",
        },
      },
      {
        label: { en: "Shops", lo: "ຮ້ານຄ້າ", zh: "商店" },
        href: "/dining-shopping/shops",
        description: {
          en: "Shopping destinations",
          lo: "ຈຸດໝາຍຊື້ເຄື່ອງ",
          zh: "购物目的地",
        },
      },
      {
        label: { en: "Duty Free", lo: "ປອດພາສີ", zh: "免税店" },
        href: "/dining-shopping/duty-free",
        description: {
          en: "Tax-free shopping",
          lo: "ຊື້ເຄື່ອງປອດພາສີ",
          zh: "免税购物",
        },
      },
    ],
    adImage:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    adTitle: {
      en: "Shop & Dine in Style",
      lo: "ຊື້ເຄື່ອງ & ອາຫານ",
      zh: "时尚购物",
    },
    adDescription: {
      en: "Premium experiences",
      lo: "ປະສົບການພຣີເມ້ຽມ",
      zh: "优质体验",
    },
  },
  {
    id: "relax-fun",
    label: { en: "Relax & Fun", lo: "ພັກຜ່ອນ & ສະໜຸກ", zh: "休闲娱乐" },
    href: "/services",
    hasDropdown: true,
    children: [
      {
        label: { en: "Lounges", lo: "ຫ້ອງພັກຜ່ອນ", zh: "休息室" },
        href: "/services/lounges",
        description: {
          en: "Premium lounge access",
          lo: "ເຂົ້າຫ້ອງພັກຜ່ອນພຣີເມ້ຽມ",
          zh: "高级休息室",
        },
      },
      {
        label: { en: "Entertainment", lo: "ບັນເທິງ", zh: "娱乐" },
        href: "/services/entertainment",
        description: {
          en: "Activities and games",
          lo: "ກິດຈະກຳ ແລະ ເກມ",
          zh: "活动游戏",
        },
      },
      {
        label: { en: "Spa & Wellness", lo: "ສະປາ & ສຸຂະພາບ", zh: "水疗" },
        href: "/services/spa",
        description: {
          en: "Relaxation services",
          lo: "ບໍລິການພັກຜ່ອນ",
          zh: "放松服务",
        },
      },
      {
        label: { en: "Family Services", lo: "ບໍລິການຄອບຄົວ", zh: "家庭服务" },
        href: "/services/family",
        description: {
          en: "Kids play areas",
          lo: "ພື້ນທີ່ຫຼິ້ນເດັກ",
          zh: "儿童游乐区",
        },
      },
    ],
    adImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    adTitle: {
      en: "Relax Before Flight",
      lo: "ພັກຜ່ອນກ່ອນຖ້ຽວບິນ",
      zh: "航班前放松",
    },
    adDescription: {
      en: "Premium amenities",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກພຣີເມ້ຽມ",
      zh: "优质设施",
    },
  },
  {
    id: "map",
    label: { en: "Map", lo: "ແຜນທີ່", zh: "地图" },
    href: "/map",
    hasDropdown: false,
  },
];
