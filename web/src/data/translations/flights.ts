import { MultilingualText } from "@/types/language";

export interface FlightTranslations {
  title: MultilingualText;
  searchPlaceholder: MultilingualText;
  filterByAirline: MultilingualText;
  tabs: {
    departures: MultilingualText;
    arrivals: MultilingualText;
    schedule: MultilingualText;
    airlines: MultilingualText;
  };
  table: {
    flightNumber: MultilingualText;
    aircraft: MultilingualText;
    airline: MultilingualText;
    origin: MultilingualText;
    destination: MultilingualText;
    stopover1: MultilingualText;
    stopover2: MultilingualText;
    scheduled: MultilingualText;
    estimated: MultilingualText;
    actual: MultilingualText;
    gate: MultilingualText;
    status: MultilingualText;
    showing: MultilingualText;
    flights: MultilingualText;
  };
  status: {
    scheduled: MultilingualText;
    boarding: MultilingualText;
    delayed: MultilingualText;
    departed: MultilingualText;
    arrived: MultilingualText;
    cancelled: MultilingualText;
  };
  airline: {
    code: MultilingualText;
    name: MultilingualText;
    contact: MultilingualText;
    website: MultilingualText;
    serviceHotline: MultilingualText;
  };
  messages: {
    loading: MultilingualText;
    noFlights: MultilingualText;
    noResults: MultilingualText;
    error: MultilingualText;
    retry: MultilingualText;
    refresh: MultilingualText;
  };
}

export const flightTranslations: FlightTranslations = {
  title: {
    en: "Flight Information",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ",
    zh: "航班信息",
  },
  searchPlaceholder: {
    en: "Search flight number, destination...",
    lo: "ຊອກຫາເລກຖ້ຽວບິນ, ຈຸດໝາຍປາຍທາງ...",
    zh: "搜索航班号、目的地...",
  },
  filterByAirline: {
    en: "Filter by Airline",
    lo: "ກັ່ນຕອງຕາມສາຍການບິນ",
    zh: "按航空公司筛选",
  },
  tabs: {
    departures: {
      en: "Departures",
      lo: "ຂາອອກ",
      zh: "出发",
    },
    arrivals: {
      en: "Arrivals",
      lo: "ຂາເຂົ້າ",
      zh: "到达",
    },
    schedule: {
      en: "Flight Schedule",
      lo: "ຕາລາງຖ້ຽວບິນ",
      zh: "航班时刻表",
    },
    airlines: {
      en: "Airline Information",
      lo: "ຂໍ້ມູນສາຍການບິນ",
      zh: "航空公司资料",
    },
  },
  table: {
    flightNumber: {
      en: "Flight No.",
      lo: "ເລກຖ້ຽວບິນ",
      zh: "航班号",
    },
    aircraft: {
      en: "Aircraft",
      lo: "ເຄື່ອງບິນ",
      zh: "机型",
    },
    airline: {
      en: "Airline",
      lo: "ສາຍການບິນ",
      zh: "航空公司",
    },
    origin: {
      en: "Origin",
      lo: "ຕົ້ນທາງ",
      zh: "始发站",
    },
    destination: {
      en: "Destination",
      lo: "ປາຍທາງ",
      zh: "到达站",
    },
    stopover1: {
      en: "Stopover 1",
      lo: "ແວ່ທີ 1",
      zh: "经停站1",
    },
    stopover2: {
      en: "Stopover 2",
      lo: "ແວ່ທີ 2",
      zh: "经停站2",
    },
    scheduled: {
      en: "Scheduled",
      lo: "ກຳນົດການ",
      zh: "计划时间",
    },
    estimated: {
      en: "Estimated",
      lo: "ປະເມີນ",
      zh: "变更到达时间",
    },
    actual: {
      en: "Actual",
      lo: "ແທ້ຈິງ",
      zh: "实际到达时间",
    },
    gate: {
      en: "Gate",
      lo: "ປະຕູ",
      zh: "登机口",
    },
    status: {
      en: "Status",
      lo: "ສະຖານະ",
      zh: "状态",
    },
    showing: {
      en: "Showing",
      lo: "ສະແດງ",
      zh: "显示",
    },
    flights: {
      en: "flights",
      lo: "ຖ່ຽວບິນ",
      zh: "航班",
    },
  },
  status: {
    scheduled: {
      en: "Scheduled",
      lo: "ກຳນົດການ",
      zh: "计划",
    },
    boarding: {
      en: "Boarding",
      lo: "ກຳລັງຂຶ້ນເຄື່ອງ",
      zh: "起飞",
    },
    delayed: {
      en: "Delayed",
      lo: "ລ່າຊ້າ",
      zh: "延误",
    },
    departed: {
      en: "Departed",
      lo: "ອອກແລ້ວ",
      zh: "到达",
    },
    arrived: {
      en: "Arrived",
      lo: "ມາຮອດແລ້ວ",
      zh: "起飞",
    },
    cancelled: {
      en: "Cancelled",
      lo: "ຍົກເລີກ",
      zh: "取消",
    },
  },
  airline: {
    code: {
      en: "Code",
      lo: "ລະຫັດ",
      zh: "代码",
    },
    name: {
      en: "Airline Name",
      lo: "ຊື່ສາຍການບິນ",
      zh: "航空公司名称",
    },
    contact: {
      en: "Contact",
      lo: "ຕິດຕໍ່",
      zh: "联系电话",
    },
    website: {
      en: "Website",
      lo: "ເວັບໄຊທ໌",
      zh: "网址",
    },
    serviceHotline: {
      en: "Service Hotline",
      lo: "ສາຍດ່ວນບໍລິການ",
      zh: "全国客服热线",
    },
  },
  messages: {
    loading: {
      en: "Loading flights...",
      lo: "ກຳລັງໂຫລດຖ້ຽວບິນ...",
      zh: "正在加载航班信息...",
    },
    noFlights: {
      en: "No flights available",
      lo: "ບໍ່ມີຖ້ຽວບິນ",
      zh: "暂无航班信息",
    },
    noResults: {
      en: "No flights found matching your search",
      lo: "ບໍ່ພົບຖ້ຽວບິນທີ່ຕົງກັບການຊອກຫາ",
      zh: "未找到匹配的航班",
    },
    error: {
      en: "Failed to load flight information",
      lo: "ໂຫລດຂໍ້ມູນຖ້ຽວບິນບໍ່ສຳເລັດ",
      zh: "加载航班信息失败",
    },
    retry: {
      en: "Retry",
      lo: "ລອງໃໝ່",
      zh: "重试",
    },
    refresh: {
      en: "Refresh",
      lo: "ອັບເດດ",
      zh: "刷新",
    },
  },
};
