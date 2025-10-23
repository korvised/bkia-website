// Navigation structure

interface SubMenuItem {
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
}

interface MenuItem {
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  subtitle?: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
  children?: SubMenuItem[];
}

interface NavItem {
  id: string;
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  subtitle?: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
  hasDropdown: boolean;
  menuGroups?: MenuItem[];
}

// Main Navigation Items
export const mainNavigation: NavItem[] = [
  {
    id: "flights",
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    subtitle: { en: "Flight information", lo: "ຂໍ້ມູນຖ້ຽວບິນ", zh: "航班信息" },
    href: "/flights",
    hasDropdown: true,
    menuGroups: [
      {
        label: { en: "Search Flight", lo: "ຄົ້ນຫາຖ້ຽວບິນ", zh: "搜索航班" },
        href: "/flights/search",
        children: [
          {
            label: { en: "Departure Flight", lo: "ຖ້ຽວບິນອອກ", zh: "出发航班" },
            href: "/flights/departures",
          },
          {
            label: { en: "Arrival Flight", lo: "ຖ້ຽວບິນຂາເຂົ້າ", zh: "到达航班" },
            href: "/flights/arrivals",
          },
          {
            label: {
              en: "Airline Information",
              lo: "ຂໍ້ມູນສາຍການບິນ",
              zh: "航空公司资料",
            },
            href: "/flights/airlines",
          },
        ],
      },
      {
        label: {
          en: "Cargo Information",
          lo: "ຂໍ້ມູນການຂົນສົ່ງສິນຄ້າ",
          zh: "货运航班信息",
        },
        href: "/flights/cargo",
      },
      {
        label: {
          en: "Airport Congestion Forecast",
          lo: "ພະຍາກອນຄວາມແອອັດ",
          zh: "机场拥堵预测",
        },
        href: "/flights/congestion",
        children: [
          {
            label: {
              en: "By Entry/Exit",
              lo: "ຕາມທາງເຂົ້າ/ອອກ",
              zh: "按出入口",
            },
            href: "/flights/congestion/entry",
          },
          {
            label: { en: "By Route", lo: "ຕາມເສັ້ນທາງ", zh: "按路线" },
            href: "/flights/congestion/route",
          },
        ],
      },
    ],
  },
  {
    id: "guide",
    label: { en: "Airport Guide", lo: "ຄູ່ມືສະໜາມບິນ", zh: "机场指南" },
    subtitle: { en: "Airport Guide", lo: "ຄູ່ມືສະໜາມບິນ", zh: "机场指南" },
    href: "/guide",
    hasDropdown: true,
    menuGroups: [
      {
        label: {
          en: "Departure Procedures",
          lo: "ຂັ້ນຕອນຂາເຂົ້າ",
          zh: "出发流程",
        },
        href: "/guide/departure",
        children: [
          {
            label: {
              en: "Departure Checklist",
              lo: "ລາຍການກວດສອບ",
              zh: "出发清单",
            },
            href: "/guide/departure/checklist",
          },
          {
            label: {
              en: "Departure Amenities",
              lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
              zh: "出发便利设施",
            },
            href: "/guide/departure/amenities",
          },
          {
            label: {
              en: "City Airport Terminal Services",
              lo: "ບໍລິການທາງລົດໄຟ",
              zh: "城市航站楼服务",
            },
            href: "/guide/departure/terminal",
          },
          {
            label: {
              en: "Check-in Counter",
              lo: "ເຄົາເຕີເຊັກອິນ",
              zh: "值机柜台",
            },
            href: "/guide/departure/checkin",
          },
          {
            label: {
              en: "Guide for Various Declarations",
              lo: "ຄູ່ມືການປະກາດ",
              zh: "各类申报指南",
            },
            href: "/guide/departure/declarations",
          },
          {
            label: { en: "Security Screening", lo: "ກວດຄວາມປອດໄພ", zh: "安检" },
            href: "/guide/departure/security",
          },
          {
            label: {
              en: "Departure Immigration",
              lo: "ຕົວະການອອກ",
              zh: "出境",
            },
            href: "/guide/departure/immigration",
          },
        ],
      },
      {
        label: {
          en: "Arrival Procedures",
          lo: "ຂັ້ນຕອນຂາອອກ",
          zh: "到达流程",
        },
        href: "/guide/arrival",
        children: [
          {
            label: {
              en: "Information/Declaration",
              lo: "ຂໍ້ມູນ/ການປະກາດ",
              zh: "信息/申报",
            },
            href: "/guide/arrival/information",
          },
          {
            label: { en: "Immigration", lo: "ຕົວະການເຂົ້າ", zh: "入境" },
            href: "/guide/arrival/immigration",
          },
          {
            label: { en: "Baggage", lo: "ກະເປົາ", zh: "行李" },
            href: "/guide/arrival/baggage",
          },
          {
            label: {
              en: "Welcome Information",
              lo: "ຂໍ້ມູນຕ້ອນຮັບ",
              zh: "欢迎信息",
            },
            href: "/guide/arrival/welcome",
          },
        ],
      },
      {
        label: { en: "Custom Services", lo: "ບໍລິການພິເສດ", zh: "定制服务" },
        href: "/guide/custom",
        children: [
          {
            label: {
              en: "Pregnant Women, Infants, and Children",
              lo: "ແມ່ຖືພາ, ເດັກນ້ອຍ ແລະ ເດັກ",
              zh: "孕妇、婴幼儿",
            },
            href: "/guide/custom/family",
          },
          {
            label: {
              en: "Travelers Accompanied by the Mobility Impaired",
              lo: "ຜູ້ເດີນທາງທີ່ມີຄວາມພິການດ້ານການເຄື່ອນໄຫວ",
              zh: "行动不便旅客",
            },
            href: "/guide/custom/mobility",
          },
          {
            label: {
              en: "Traveling with Pets",
              lo: "ເດີນທາງກັບສັດລ້ຽງ",
              zh: "携带宠物",
            },
            href: "/guide/custom/pets",
          },
        ],
      },
    ],
  },
  {
    id: "transport",
    label: { en: "Transport", lo: "ການຈາລະຈອນ", zh: "交通" },
    subtitle: {
      en: "Transportation · Parking",
      lo: "ການຂົນສົ່ງ · ບ່ອນຈອດລົດ",
      zh: "交通 · 停车",
    },
    href: "/transportation",
    hasDropdown: true,
    menuGroups: [
      {
        label: { en: "Home to Airport", lo: "ບ້ານໄປສະໜາມບິນ", zh: "前往机场" },
        href: "/transportation/to-airport",
      },
      {
        label: {
          en: "Parking Information",
          lo: "ຂໍ້ມູນບ່ອນຈອດລົດ",
          zh: "停车信息",
        },
        href: "/transportation/parking",
        children: [
          {
            label: {
              en: "Parking Lot Guide",
              lo: "ຄູ່ມືບ່ອນຈອດລົດ",
              zh: "停车场指南",
            },
            href: "/transportation/parking/guide",
          },
          {
            label: { en: "Valet Parking", lo: "ບໍລິການຈອດລົດ", zh: "代客泊车" },
            href: "/transportation/parking/valet",
          },
          {
            label: {
              en: "Parking Lot Congestion",
              lo: "ຄວາມແອອັດບ່ອນຈອດ",
              zh: "停车场拥堵",
            },
            href: "/transportation/parking/congestion",
          },
          {
            label: { en: "Parking Fees", lo: "ຄ່າບໍລິການ", zh: "停车费" },
            href: "/transportation/parking/fees",
          },
        ],
      },
      {
        label: {
          en: "Public Transportation",
          lo: "ການຂົນສົ່ງສາທາລະນະ",
          zh: "公共交通",
        },
        href: "/transportation/public",
        children: [
          {
            label: { en: "Taxi", lo: "ແທັກຊີ", zh: "出租车" },
            href: "/transportation/public/taxi",
          },
          {
            label: { en: "Van", lo: "ລົດຕູ້", zh: "叫车" },
            href: "/transportation/public/van",
          },
        ],
      },
    ],
  },
  {
    id: "at-airport",
    label: { en: "At the Airport", lo: "ທີ່ສະໜາມບິນ", zh: "在机场" },
    subtitle: {
      en: "Airport Facilities",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "机场设施",
    },
    href: "/facilities",
    hasDropdown: true,
    menuGroups: [
      {
        label: { en: "Airport Map", lo: "ແຜນທີ່ສະໜາມບິນ", zh: "机场地图" },
        href: "/facilities/map",
      },
      {
        label: {
          en: "Duty-Free Shopping",
          lo: "ຮ້ານປອດພາສີ",
          zh: "免税购物",
        },
        href: "/facilities/duty-free",
      },
      {
        label: { en: "General Shopping", lo: "ຮ້ານຊື້ເຄື່ອງ", zh: "购物" },
        href: "/facilities/shopping",
      },
      {
        label: {
          en: "Food & Beverage",
          lo: "ອາຫານ ແລະ ເຄື່ອງດື່ມ",
          zh: "餐饮",
        },
        href: "/facilities/dining",
      },
      {
        label: {
          en: "Convenience & Public Facilities",
          lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
          zh: "便利与公共设施",
        },
        href: "/facilities/convenience",
      },
      {
        label: {
          en: "Exhibitions, Performances, and Experiences",
          lo: "ການວາງສະແດງ, ການສະແດງ ແລະ ປະສົບການ",
          zh: "展览、表演与体验",
        },
        href: "/facilities/exhibitions",
      },
    ],
  },
  {
    id: "support",
    label: { en: "Support", lo: "ສະໜັບສະໜູນ", zh: "支持" },
    subtitle: { en: "Customer Center", lo: "ສູນລູກຄ້າ", zh: "客服中心" },
    href: "/support",
    hasDropdown: true,
    menuGroups: [
      {
        label: { en: "Notices", lo: "ປະກາດ", zh: "通知" },
        href: "/support/notices",
      },
      {
        label: { en: "News", lo: "ຂ່າວ", zh: "新闻" },
        href: "/support/news",
      },
      {
        label: {
          en: "Customer Support",
          lo: "ຊ່ວຍເຫຼືອລູກຄ້າ",
          zh: "客户支持",
        },
        href: "/support/customer",
        children: [
          {
            label: {
              en: "Frequently Asked Questions",
              lo: "ຄຳຖາມທີ່ພົບເລື້ອຍໆ",
              zh: "常见问题",
            },
            href: "/support/customer/faq",
          },
          {
            label: { en: "Phone Numbers", lo: "ເບີໂທລະສັບ", zh: "电话号码" },
            href: "/support/customer/phone",
          },
          {
            label: {
              en: "Lost and Found",
              lo: "ເສຍຫາຍ ແລະ ພົບເຫັນ",
              zh: "失物招领",
            },
            href: "/support/customer/lost-found",
          },
          {
            label: {
              en: "Voice of Customer",
              lo: "ສຽງຂອງລູກຄ້າ",
              zh: "客户之声",
            },
            href: "/support/customer/feedback",
          },
          {
            label: {
              en: "Notice for Passengers and Visitors",
              lo: "ແຈ້ງການສຳລັບຜູ້ໂດຍສານ",
              zh: "乘客须知",
            },
            href: "/support/customer/notice",
          },
        ],
      },
    ],
  },
];
