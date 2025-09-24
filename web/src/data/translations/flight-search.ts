import { MultilingualText } from "@/types/language";

export interface Translations {
  header: {
    title: MultilingualText;
    realtime: MultilingualText;
  };
  tabs: {
    departures: MultilingualText;
    arrivals: MultilingualText;
  };
  input: {
    placeholder: MultilingualText;
    emptyQuery: MultilingualText;
  };
  button: {
    search: MultilingualText;
    searching: MultilingualText;
  };
  messages: {
    failed: MultilingualText;
    info: MultilingualText;
  };
}

export const translations: Translations = {
  header: {
    title: {
      en: "Flight Search",
      lo: "ຄົ້ນຫາຖ່ຽວບິນ",
      zh: "航班查询",
    },
    realtime: {
      en: "Real-time Updates",
      lo: "ອັບເດດແບບ Real-time",
      zh: "实时更新",
    },
  },
  tabs: {
    departures: {
      en: "Departures",
      lo: "ຂາອອກ",
      zh: "出发航班",
    },
    arrivals: {
      en: "Arrivals",
      lo: "ຂາເຂົ້າ",
      zh: "到达航班",
    },
  },
  input: {
    placeholder: {
      en: "Flight number or destination...",
      lo: "ເລກຖ່ຽວບິນ ຫຼື ຈຸດໝາຍທາງ...",
      zh: "航班号或目的地...",
    },
    emptyQuery: {
      en: "Please enter flight number or destination",
      lo: "ກະລຸນາໃສ່ເລກຖ່ຽງບິນ ຫຼື ຈຸດໝາຍປາຍທາງ",
      zh: "请输入航班号或目的地",
    },
  },
  button: {
    search: {
      en: "Search",
      lo: "ຄົ້ນຫາ",
      zh: "搜索",
    },
    searching: {
      en: "Searching...",
      lo: "ກຳລັງຄົ້ນຫາ...",
      zh: "正在搜索...",
    },
  },
  messages: {
    failed: {
      en: "Search failed, please try again",
      lo: "ການຄົ້ນຫາລົ້ມເຫລວ, ກະລຸນາລອງອີກຄັ້ງ",
      zh: "搜索失败，请重试",
    },
    info: {
      en: "Real-time flight information • Click search to view all schedules",
      lo: "ຂໍ້ມູນຖ່ຽງບິນແບບ Real-time • ກົດຄົ້ນຫາເພື່ອເບິ່ງຕາຕະລາງທັງໝົດ",
      zh: "实时航班信息 • 点击搜索查看全部时刻表",
    },
  },
};
