interface FeaturedContent {
  image: string;
  title: {
    en: string;
    lo: string;
    zh: string;
  };
  description: {
    en: string;
    lo: string;
    zh: string;
  };
  link?: {
    label: {
      en: string;
      lo: string;
      zh: string;
    };
    href: string;
  };
}

interface MenuItem {
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  description?: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
}

interface NavItem {
  id: string;
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  description?: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
  hasDropdown: boolean;
  menuItems?: MenuItem[];
  featuredContent?: FeaturedContent;
}

// Main Navigation Items
export const navigation: NavItem[] = [
  // I. Flights — unchanged
  {
    id: "flights",
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    description: {
      en: "Flight schedules and real-time updates",
      lo: "ຕາລາງຖ້ຽວບິນ ແລະ ຂໍ້ມູນປັດຈຸບັນ",
      zh: "航班时刻表和实时更新",
    },
    href: "/flights/departures",
    hasDropdown: true,
    menuItems: [
      {
        label: { en: "Departures", lo: "ຖ້ຽວບິນອອກ", zh: "出发航班" },
        description: {
          en: "Check departing flights status",
          lo: "ກວດສອບສະຖານະຖ້ຽວບິນອອກ",
          zh: "查看出发航班状态",
        },
        href: "/flights/departures",
      },
      {
        label: { en: "Arrivals", lo: "ຖ້ຽວບິນຂາເຂົ້າ", zh: "到达航班" },
        description: {
          en: "Check arriving flights status",
          lo: "ກວດສອບສະຖານະຖ້ຽວບິນຂາເຂົ້າ",
          zh: "查看到达航班状态",
        },
        href: "/flights/arrivals",
      },
      {
        label: { en: "Schedules", lo: "ຕາຕະລາງຖ້ຽວບິນ", zh: "航班时刻表" },
        description: {
          en: "View all flight schedules",
          lo: "ເບິ່ງຕາຕະລາງຖ້ຽວບິນທັງໝົດ",
          zh: "查看所有航班时刻表",
        },
        href: "/flights/schedules",
      },
      {
        label: { en: "Airlines", lo: "ຂໍ້ມູນສາຍການບິນ", zh: "航空公司" },
        description: {
          en: "Search for airline codes and contact info",
          lo: "ຄົ້ນຫາລະຫັດສາຍການບິນ ແລະ ຂໍ້ມູນຕິດຕໍ່",
          zh: "搜索航空公司代码及联系信息",
        },
        href: "/flights/airlines",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/flight-status.jpg",
      title: {
        en: "Real-time Flight Status",
        lo: "ກວດສອບສະຖານະຖ່ຽວບິນ",
        zh: "实时航班动态",
      },
      description: {
        en: "Check arrivals and departures instantly",
        lo: "ຕິດຕາມຖ່ຽວບິນຂາເຂົ້າ ແລະ ຂາອອກ ໄດ້ທັນທີ",
        zh: "即时查询起飞与到达航班",
      },
    },
  },

  // II. Passenger Guide — remove facilities, add regional
  {
    id: "guides",
    label: { en: "Passenger Guide", lo: "ຄູ່ມືຜູ້ໂດຍສານ", zh: "乘客指南" },
    description: {
      en: "Everything you need for your journey",
      lo: "ທຸກສິ່ງທີ່ທ່ານຕ້ອງການສຳລັບການເດີນທາງ",
      zh: "您旅程所需的一切信息",
    },
    href: "/guides/departures",
    hasDropdown: true,
    menuItems: [
      {
        label: { en: "Departures", lo: "ຂາອອກ", zh: "出发指南" },
        description: {
          en: "Check-in and boarding process",
          lo: "ຂັ້ນຕອນການແຈ້ງເຂົ້າ ແລະ ຂຶ້ນເຄື່ອງ",
          zh: "值机和登机流程",
        },
        href: "/guides/departures",
      },
      {
        label: { en: "Arrivals", lo: "ຂາເຂົ້າ", zh: "到达指南" },
        description: {
          en: "Arrival procedures and customs",
          lo: "ຄຳແນະນຳຂາເຂົ້າ ແລະ ພາສີ",
          zh: "到达流程和海关",
        },
        href: "/guides/arrivals",
      },
      {
        label: { en: "Custom Services", lo: "ບໍລິການພິເສດ", zh: "定制服务" },
        description: {
          en: "Special assistance and pet travel guide",
          lo: "ບໍລິການຊ່ວຍເຫຼືອພິເສດ ແລະ ຄຳແນະນຳສັດລ້ຽງ",
          zh: "特殊协助及宠物飞行指南",
        },
        href: "/guides/custom-services",
      },
      {
        label: { en: "Airport Security", lo: "ຄວາມປອດໄພ", zh: "安检须知" },
        description: {
          en: "Security guidelines and tips",
          lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ",
          zh: "安全检查指南",
        },
        href: "/guides/security",
      },
      {
        label: {
          en: "Regional Connection",
          lo: "ການເຊື່ອມຕໍ່ພາກພື້ນ",
          zh: "区域连接",
        },
        description: {
          en: "Cross-border transport services",
          lo: "ບໍລິການຂົນສົ່ງຂ້າມແດນ",
          zh: "跨境交通服务",
        },
        href: "/guides/regional",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/check-in.png",
      title: {
        en: "Travel Guide",
        lo: "ຄຳແນະນຳການເດີນທາງ",
        zh: "出行指南",
      },
      description: {
        en: "Prepare your documents and digital forms",
        lo: "ກຽມເອກະສານ ແລະ ແບບຟອມດີຈີຕອນໃຫ້ພ້ອມ",
        zh: "准备好您的旅行证件和数字表格",
      },
    },
  },

  // III. Services (was Transport)
  {
    id: "services",
    label: { en: "Services", lo: "ການບໍລິການ", zh: "服务" },
    description: {
      en: "Airport services and ground transport",
      lo: "ບໍລິການສະໜາມບິນ ແລະ ການຂົນສົ່ງ",
      zh: "机场服务与地面交通",
    },
    href: "/services/taxi",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "Packing Services",
          lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ",
          zh: "包装服务",
        },
        description: {
          en: "Standardized packing services for secure shipping",
          lo: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ ທີ່ໄດ້ມາດຕະຖານ ແລະ ປອດໄພ",
          zh: "符合标准的专业包装服务，确保运输安全",
        },
        href: "/services/packing",
      },
      {
        label: {
          en: "Airport Taxi",
          lo: "ແທັກຊີສະໜາມບິນ",
          zh: "机场出租车",
        },
        description: {
          en: "Taxi and van shuttle services",
          lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ຮັບສົ່ງ",
          zh: "出租车和面包车接送服务",
        },
        href: "/services/taxi",
      },
      {
        label: { en: "Parking", lo: "ບ່ອນຈອດລົດ", zh: "停车场" },
        description: {
          en: "Parking rates and reservations",
          lo: "ອັດຕາຄ່າຈອດລົດ ແລະ ການຈອງ",
          zh: "停车费和预订",
        },
        href: "/services/parking",
      },
      {
        label: {
          en: "Facilities & Services",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "设施与服务",
        },
        description: {
          en: "Airport amenities for passengers",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກຕ່າງໆ",
          zh: "机场旅客设施",
        },
        href: "/services/facilities",
      },
      {
        label: { en: "VIP Lounge", lo: "ຫ້ອງ VIP", zh: "贵宾休息室" },
        description: {
          en: "Premium lounge services",
          lo: "ບໍລິການຫ້ອງ VIP ພິເສດ",
          zh: "尊享贵宾休息室服务",
        },
        href: "/services/vip-lounge",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/taxi.png",
      title: { en: "Premium Parking", lo: "ຈອດລົດພິເສດ", zh: "尊享停车" },
      description: {
        en: "Convenient and secure parking experience",
        lo: "ປະສົບການຈອດລົດທີ່ສະດວກ ແລະ ປອດໄພ",
        zh: "便捷且安全的停车体验",
      },
    },
  },

  // IV. Announcements (was Support)
  {
    id: "notices",
    label: { en: "Announcements", lo: "ແຈ້ງການ", zh: "公告" },
    description: {
      en: "Airport announcements and news",
      lo: "ແຈ້ງການ ແລະ ຂ່າວສານສະໜາມບິນ",
      zh: "机场公告与新闻",
    },
    href: "/notices/airport",
    hasDropdown: true,
    menuItems: [
      {
        label: { en: "Airport Notices", lo: "ແຈ້ງການສະໜາມບິນ", zh: "机场公告" },
        description: {
          en: "Operational changes and advisories",
          lo: "ການປ່ຽນແປງ ແລະ ຄຳແນະນຳ",
          zh: "运营变更与提示",
        },
        href: "/notices/airport",
      },
      {
        label: { en: "News", lo: "ຂ່າວສານ", zh: "新闻中心" },
        description: {
          en: "Latest airport updates and stories",
          lo: "ການອັບເດດ ແລະ ຂ່າວສານລ່າສຸດ",
          zh: "最新动态与新闻",
        },
        href: "/notices/news",
      },
      {
        label: { en: "Auctions", lo: "ແຈ້ງເປີດປະມູນ", zh: "拍卖招标" },
        description: {
          en: "Explore bidding documents and procurement opportunities",
          lo: "ຄົ້ນຫາເອກະສານການປະມູນ ແລະ ໂອກາດການຈັດຊື້",
          zh: "查看招标文件与采购机会",
        },
        href: "/notices/auctions",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/information.png",
      title: {
        en: "Stay Informed",
        lo: "ຕິດຕາມຂ່າວສານ",
        zh: "获取最新资讯",
      },
      description: {
        en: "Latest notices, news and procurement",
        lo: "ແຈ້ງການ, ຂ່າວສານ ແລະ ການປະມູນລ່າສຸດ",
        zh: "最新公告、新闻与采购信息",
      },
    },
  },

  // V. Careers — standalone, no dropdown
  {
    id: "careers",
    label: { en: "Careers", lo: "ຮ່ວມງານກັບພວກເຮົາ", zh: "人才招聘" },
    description: {
      en: "Job opportunities at the airport",
      lo: "ໂອກາດວຽກງານຢູ່ສະໜາມບິນ",
      zh: "机场工作机会",
    },
    href: "/careers",
    hasDropdown: false,
  },

  // VI. About — remove news/auctions/careers, add contact/faq/lost-found/feedback
  {
    id: "about",
    label: { en: "About", lo: "ກ່ຽວກັບ", zh: "关于我们" },
    description: {
      en: "Airport profile and passenger services",
      lo: "ຂໍ້ມູນສະໜາມບິນ ແລະ ບໍລິການຜູ້ໂດຍສານ",
      zh: "机场概况与旅客服务",
    },
    href: "/about/profile",
    hasDropdown: true,
    menuItems: [
      {
        label: { en: "Airport Profile", lo: "ຂໍ້ມູນສະໜາມບິນ", zh: "机场简介" },
        description: {
          en: "Our history, vision, and mission",
          lo: "ປະຫວັດ, ວິໄສທັດ ແລະ ພາລະກິດ",
          zh: "历史、愿景与使命",
        },
        href: "/about/profile",
      },
      {
        label: { en: "Contact Us", lo: "ຕິດຕໍ່ພວກເຮົາ", zh: "联系我们" },
        description: {
          en: "Get in touch with us",
          lo: "ຕິດຕໍ່ຫາພວກເຮົາ",
          zh: "与我们取得联系",
        },
        href: "/about/contact",
      },
      {
        label: { en: "FAQs", lo: "ຄຳຖາມທີ່ພົບເລື້ອຍ", zh: "常见问题" },
        description: {
          en: "Frequently asked questions",
          lo: "ຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆ",
          zh: "常见问题解答",
        },
        href: "/about/faqs",
      },
      {
        label: {
          en: "Lost & Found",
          lo: "ເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ",
          zh: "失物招领",
        },
        description: {
          en: "Report or claim lost items at the airport",
          lo: "ແຈ້ງເຄື່ອງເສຍ ຫຼື ຢືນຢັນການຮັບເຄື່ອງຄືນ",
          zh: "报告或认领丢失物品",
        },
        href: "/about/lost-found",
      },
      {
        label: { en: "Feedback", lo: "ຄຳຄິດເຫັນ", zh: "意见反馈" },
        description: {
          en: "Share your experience",
          lo: "ແບ່ງປັນປະສົບການຂອງທ່ານ",
          zh: "分享您的体验",
        },
        href: "/about/feedback",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/001.jpg",
      title: { en: "Airport Profile", lo: "ຂໍ້ມູນສະໜາມບິນ", zh: "机场简介" },
      description: {
        en: "Learn about Bokeo International Airport",
        lo: "ຮຽນຮູ້ກ່ຽວກັບສະໜາມບິນສາກົນບໍ່ແກ້ວ",
        zh: "了解博胶国际机场",
      },
    },
  },
];

export type { NavItem, MenuItem, FeaturedContent };
