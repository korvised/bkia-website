// Navigation structure with enhanced UX

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
export const mainNavigation: NavItem[] = [
  {
    id: "flights",
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    description: {
      en: "Flight schedules and real-time updates",
      lo: "ຕາລາງຖ້ຽວບິນ ແລະ ຂໍ້ມູນປັດຈຸບັນ",
      zh: "航班时刻表和实时更新",
    },
    href: "/flights",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "Arrivals",
          lo: "ຖ້ຽວບິນຂາເຂົ້າ",
          zh: "到达航班",
        },
        description: {
          en: "Check arriving flights status",
          lo: "ກວດສອບສະຖານະຖ້ຽວບິນຂາເຂົ້າ",
          zh: "查看到达航班状态",
        },
        href: "/flights/arrivals",
      },
      {
        label: {
          en: "Departures",
          lo: "ຖ້ຽວບິນອອກ",
          zh: "出发航班",
        },
        description: {
          en: "Check departing flights status",
          lo: "ກວດສອບສະຖານະຖ້ຽວບິນອອກ",
          zh: "查看出发航班状态",
        },
        href: "/flights/departures",
      },
      {
        label: {
          en: "Airlines",
          lo: "ສາຍການບິນ",
          zh: "航空公司",
        },
        description: {
          en: "View airline information",
          lo: "ເບິ່ງຂໍ້ມູນສາຍການບິນ",
          zh: "查看航空公司信息",
        },
        href: "/flights/airlines",
      },
    ],
    featuredContent: {
      image: "/images/featured/my-hkg-app.png",
      title: {
        en: '"My Airport" Mobile App',
        lo: 'ແອັບມືຖື "ສະໜາມບິນຂອງຂ້ອຍ"',
        zh: '"我的机场" 移动应用',
      },
      description: {
        en: "Search all airport information at your fingertips",
        lo: "ຄົ້ນຫາຂໍ້ມູນສະໜາມບິນທັງໝົດ",
        zh: "随时搜索机场信息",
      },
    },
  },
  {
    id: "guides",
    label: { en: "Passenger Guide", lo: "ຄູ່ມືຜູ້ໂດຍສານ", zh: "乘客指南" },
    description: {
      en: "Everything you need for your journey",
      lo: "ທຸກສິ່ງທີ່ທ່ານຕ້ອງການສຳລັບການເດີນທາງ",
      zh: "您旅程所需的一切信息",
    },
    href: "/guides",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "Arrivals",
          lo: "ຂາເຂົ້າ",
          zh: "到达指南",
        },
        description: {
          en: "Arrival procedures and customs",
          lo: "ຄຳແນະນຳຜູ້ໂດຍສານຂາເຂົ້າ ແລະ ພາສີສຸນລະກອນ",
          zh: "到达流程和海关",
        },
        href: "/guides/arrivals",
      },
      {
        label: {
          en: "Departures",
          lo: "ຂາອອກ",
          zh: "出发指南",
        },
        description: {
          en: "Check-in and boarding process",
          lo: "ຂັ້ນຕອນການແຈ້ງ ແລະ ການຂຶ້ນເຄື່ອງ",
          zh: "值机和登机流程",
        },
        href: "/guides/departures",
      },
      {
        label: {
          en: "Transfer / Transit",
          lo: "ການຖ່າຍໂອນ / ຜ່ານແດນ",
          zh: "中转/过境",
        },
        description: {
          en: "Connection flight information",
          lo: "ຂໍ້ມູນການຕໍ່ຖ້ຽວບິນ",
          zh: "转机航班信息",
        },
        href: "/guides/transfer",
      },
      {
        label: {
          en: "Airport Security",
          lo: "ຄວາມປອດໄພ",
          zh: "安检须知",
        },
        description: {
          en: "Security guidelines and tips",
          lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ",
          zh: "安全检查指南",
        },
        href: "/guides/security",
      },
      {
        label: {
          en: "Facilities & Services",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "设施与服务",
        },
        description: {
          en: "Airport amenities for passengers",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກສຳລັບຜູ້ໂດຍສານ",
          zh: "机场旅客设施",
        },
        href: "/guides/facilities",
      },
    ],
    featuredContent: {
      image: "/images/featured/one-stop-booking.png",
      title: {
        en: "One-stop Services",
        lo: "ບໍລິການຄັ້ງດຽວ",
        zh: "一站式服务",
      },
      description: {
        en: "Book all airport essentials in one place",
        lo: "ຈອງບໍລິການທັງໝົດໃນບ່ອນດຽວ",
        zh: "一处预订所有服务",
      },
      link: {
        label: {
          en: "Explore More",
          lo: "ສຳຫຼວດເພີ່ມ",
          zh: "了解更多",
        },
        href: "/services/booking",
      },
    },
  },
  {
    id: "transports",
    label: { en: "Transport", lo: "ການຂົນສົ່ງ", zh: "交通" },
    description: {
      en: "Ground transportation and parking",
      lo: "ການຂົນສົ່ງພື້ນດິນ ແລະ ບ່ອນຈອດລົດ",
      zh: "地面交通和停车",
    },
    href: "/transports",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "To & From Airport",
          lo: "ໄປ-ມາສະໜາມບິນ",
          zh: "往返机场",
        },
        description: {
          en: "Bus, taxi and shuttle services",
          lo: "ລົດເມ, ແທັກຊີ ແລະ ລົດຮັບສົ່ງ",
          zh: "巴士、出租车和班车",
        },
        href: "/transports/to-from-airport",
      },
      {
        label: {
          en: "Parking",
          lo: "ບ່ອນຈອດລົດ",
          zh: "停车场",
        },
        description: {
          en: "Parking rates and reservations",
          lo: "ອັດຕາຄ່າຈອດລົດ ແລະ ການຈອງ",
          zh: "停车费和预订",
        },
        href: "/transports/parking",
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
        href: "/transports/regional",
      },
      {
        label: {
          en: "Useful Contacts",
          lo: "ຕິດຕໍ່ທີ່ເປັນປະໂຫຍດ",
          zh: "实用联系",
        },
        description: {
          en: "Transport service contacts",
          lo: "ຕິດຕໍ່ບໍລິການຂົນສົ່ງ",
          zh: "交通服务联系",
        },
        href: "/transports/contacts",
      },
    ],
    featuredContent: {
      image: "/images/featured/valet-parking.jpg",
      title: {
        en: "Valet Parking",
        lo: "ຈອດລົດພິເສດ",
        zh: "代客泊车",
      },
      description: {
        en: "Hassle-free parking experience",
        lo: "ປະສົບການຈອດລົດທີ່ສະດວກ",
        zh: "轻松停车体验",
      },
    },
  },
  {
    id: "support",
    label: { en: "Support", lo: "ສະໜັບສະໜູນ", zh: "客户支持" },
    description: {
      en: "Help center and customer service",
      lo: "ສູນຊ່ວຍເຫຼືອ ແລະ ບໍລິການລູກຄ້າ",
      zh: "帮助中心和客服",
    },
    href: "/support",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "Notices",
          lo: "ແຈ້ງການ",
          zh: "机场公告",
        },
        description: {
          en: "changes, advisories and alerts",
          lo: "ການປ່ຽນແປງການດຳເນີນງານ ແລະ ຄຳແນະນຳ/ເຕືອນ",
          zh: "运营变更、提示与警报",
        },
        href: "/support/notices",
      },
      {
        label: {
          en: "News",
          lo: "ຂ່າວສານ",
          zh: "新闻中心",
        },
        description: {
          en: "Press releases and media updates",
          lo: "ແຖງຂ່າວ ແລະ ອັບເດດສື່ມວນຊົນ",
          zh: "新闻稿与媒体更新",
        },
        href: "/support/newsroom",
      },
      {
        label: {
          en: "FAQs",
          lo: "ຄຳຖາມທີ່ພົບເລື້ອຍ",
          zh: "常见问题",
        },
        description: {
          en: "Frequently asked questions",
          lo: "ຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆ",
          zh: "常见问题解答",
        },
        href: "/support/faq",
      },
      {
        label: {
          en: "Lost & Found",
          lo: "ເສຍຫາຍ & ພົບເຫັນ",
          zh: "失物招领",
        },
        description: {
          en: "Report or claim lost items",
          lo: "ລາຍງານຫຼືຮັບເຄື່ອງເສຍຫາຍ",
          zh: "报告或认领失物",
        },
        href: "/support/lost-found",
      },
      {
        label: {
          en: "Feedback",
          lo: "ຄຳຄິດເຫັນ",
          zh: "意见反馈",
        },
        description: {
          en: "Share your experience",
          lo: "ແບ່ງປັນປະສົບການຂອງທ່ານ",
          zh: "分享您的体验",
        },
        href: "/support/feedback",
      },
    ],
    featuredContent: {
      image: "/images/featured/customer-support.jpeg",
      title: {
        en: "24/7 Support",
        lo: "ສະໜັບສະໜູນ 24/7",
        zh: "24/7客服",
      },
      description: {
        en: "We're here to help anytime",
        lo: "ພວກເຮົາພ້ອມຊ່ວຍເຫຼືອທຸກເວລາ",
        zh: "随时为您提供帮助",
      },
    },
  },
  {
    id: "about-us",
    label: { en: "About Us", lo: "ກ່ຽວກັບພວກເຮົາ", zh: "关于我们" },
    description: {
      en: "Learn about our airport",
      lo: "ຮຽນຮູ້ກ່ຽວກັບສະໜາມບິນຂອງພວກເຮົາ",
      zh: "了解我们的机场",
    },
    href: "/about",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "Overview",
          lo: "ພາບລວມ",
          zh: "机场概览",
        },
        description: {
          en: "Airport introduction",
          lo: "ແນະນຳສະໜາມບິນ",
          zh: "机场简介",
        },
        href: "/about/overview",
      },
      {
        label: {
          en: "Vision & Mission",
          lo: "ວິໄສທັດ ແລະ ພາລະກິດ",
          zh: "愿景使命",
        },
        description: {
          en: "Our goals and values",
          lo: "ເປົ້າໝາຍ ແລະ ຄຸນຄ່າຂອງພວກເຮົາ",
          zh: "我们的目标和价值",
        },
        href: "/about/vision-mission",
      },
      {
        label: {
          en: "Our History",
          lo: "ປະຫວັດຂອງພວກເຮົາ",
          zh: "发展历史",
        },
        description: {
          en: "Airport development timeline",
          lo: "ໄລຍະເວລາພັດທະນາສະໜາມບິນ",
          zh: "机场发展历程",
        },
        href: "/about/history",
      },
      {
        label: {
          en: "Bidding & Procurement",
          lo: "ການປະມູນ & ຈັດຊື້",
          zh: "招标与采购",
        },
        description: {
          en: "Open tenders, procurement notices",
          lo: "ການປະມູນເປີດ, ແຈ້ງການຈັດຊື້ ແລະ ຜົນປະມູນ",
          zh: "公开招标、采购公告与结果",
        },
        href: "/about/bidding",
      },
      {
        label: {
          en: "Careers",
          lo: "ຮ່ວມງານກັບພວກເຮົາ",
          zh: "招聘信息",
        },
        description: {
          en: "Job opportunities",
          lo: "ໂອກາດການຈ້າງງານ",
          zh: "工作机会",
        },
        href: "/about/careers",
      },
    ],
    featuredContent: {
      image: "/images/wallpaper/001.jpg",
      title: {
        en: "Modern Airport",
        lo: "ສະໜາມບິນທັນສະໄໝ",
        zh: "现代化机场",
      },
      description: {
        en: "Connecting Laos to the world",
        lo: "ເຊື່ອມຕໍ່ລາວກັບໂລກ",
        zh: "连接老挝与世界",
      },
    },
  },
];

export type { NavItem, MenuItem, FeaturedContent };
