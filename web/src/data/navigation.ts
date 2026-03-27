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
        label: { en: "Airlines", lo: "ສາຍການບິນ", zh: "航空公司" },
        description: {
          en: "View airline information",
          lo: "ເບິ່ງຂໍ້ມູນສາຍການບິນ",
          zh: "查看航空公司信息",
        },
        href: "/flights/airlines",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/flight-status.png",
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
          en: "Facilities & Services",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "设施与服务",
        },
        description: {
          en: "Airport amenities for passengers",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກຕ່າງໆ",
          zh: "机场旅客设施",
        },
        href: "/guides/facilities",
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
  {
    id: "transports",
    label: { en: "Transport", lo: "ການຂົນສົ່ງ", zh: "交通" },
    description: {
      en: "Ground transportation and parking",
      lo: "ການຂົນສົ່ງ ແລະ ບ່ອນຈອດລົດ",
      zh: "地面交通和停车",
    },
    href: "/transports/to-from-airport",
    hasDropdown: true,
    menuItems: [
      {
        label: {
          en: "To & From Airport",
          lo: "ຮັບ-ສົ່ງ ສະໜາມບິນ",
          zh: "往返机场",
        },
        description: {
          en: "Taxi and van shuttle services",
          lo: "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ຮັບສົ່ງ",
          zh: "出租车和面包车接送服务",
        },
        href: "/transports/to-from-airport",
      },
      {
        label: { en: "Parking", lo: "ບ່ອນຈອດລົດ", zh: "停车场" },
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
        label: { en: "Useful Contacts", lo: "ຕິດຕໍ່ສອບຖາມ", zh: "实用联系" },
        description: {
          en: "Transport service contacts",
          lo: "ເບີຕິດຕໍ່ບໍລິການຂົນສົ່ງ",
          zh: "交通服务联系",
        },
        href: "/transports/contacts",
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
  {
    id: "support",
    label: { en: "Support", lo: "ຊ່ວຍເຫຼືອ", zh: "客户支持" },
    description: {
      en: "Help center and passenger services",
      lo: "ສູນຊ່ວຍເຫຼືອຜູ້ໂດຍສານ",
      zh: "帮助中心和旅客服务",
    },
    href: "/support/notices",
    hasDropdown: true,
    menuItems: [
      {
        label: { en: "Notices", lo: "ແຈ້ງການ", zh: "机场公告" },
        description: {
          en: "Operational changes and advisories",
          lo: "ການປ່ຽນແປງ ແລະ ຄຳແນະນຳ",
          zh: "运营变更与提示",
        },
        href: "/support/notices",
      },
      {
        label: { en: "FAQs", lo: "ຄຳຖາມທີ່ພົບເລື້ອຍ", zh: "常见问题" },
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
          lo: "ເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ",
          zh: "失物招领",
        },
        description: {
          en: "Report or claim lost items at the airport",
          lo: "ແຈ້ງເຄື່ອງເສຍ ຫຼື ຢືນຢັນການຮັບເຄື່ອງຄືນ",
          zh: "报告或认领丢失物品",
        },
        href: "/support/lost-found",
      },
      {
        label: { en: "Feedback", lo: "ຄຳຄິດເຫັນ", zh: "意见反馈" },
        description: {
          en: "Share your experience",
          lo: "ແບ່ງປັນປະສົບການຂອງທ່ານ",
          zh: "分享您的体验",
        },
        href: "/support/feedback",
      },
    ],
    featuredContent: {
      image:
        "https://bkia-website.s3.ap-southeast-7.amazonaws.com/navbar/information.png",
      title: {
        en: "Passenger Assistance",
        lo: "ບໍລິການຊ່ວຍເຫຼືອ",
        zh: "旅客协助",
      },
      description: {
        en: "Our team is ready to help 24/7",
        lo: "ທີມງານພວກເຮົາພ້ອມຊ່ວຍເຫຼືອຕະຫຼອດ 24 ຊົ່ວໂມງ",
        zh: "我们的团队全天候为您提供帮助",
      },
    },
  },
  {
    id: "about",
    label: { en: "About", lo: "ກ່ຽວກັບ", zh: "关于我们" },
    description: {
      en: "Airport profile, news, and business",
      lo: "ຂໍ້ມູນສະໜາມບິນ, ຂ່າວສານ ແລະ ທຸລະກິດ",
      zh: "机场概况、新闻与商务",
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
        label: { en: "News", lo: "ຂ່າວສານ", zh: "新闻中心" },
        description: {
          en: "Latest airport updates and stories",
          lo: "ການອັບເດດ ແລະ ຂ່າວສານລ່າສຸດ",
          zh: "最新动态与新闻",
        },
        href: "/about/news",
      },
      {
        label: { en: "Careers", lo: "ຮ່ວມງານກັບພວກເຮົາ", zh: "人才招聘" },
        description: {
          en: "Job opportunities and recruitment",
          lo: "ໂອກາດການຈ້າງງານ ແລະ ການຮັບສະໝັກ",
          zh: "工作机会与人才招聘",
        },
        href: "/about/careers",
      },
      {
        label: { en: "Auctions", lo: "ການປະມູນ", zh: "拍卖招标" },
        description: {
          en: "Explore bidding documents and procurement opportunities",
          lo: "ຄົ້ນຫາເອກະສານການປະມູນ ແລະ ໂອກາດການຈັດຊື້",
          zh: "查看招标文件与采购机会",
        },
        href: "/about/auctions",
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
