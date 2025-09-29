import { MultilingualText } from "@/types/language";

export interface GuideTranslations {
  title: MultilingualText;
  tabs: {
    departure: MultilingualText;
    arrival: MultilingualText;
    transfer: MultilingualText;
    airportFacilities: MultilingualText;
    specialServices: MultilingualText;
    hotelServices: MultilingualText;
  };
}

export const guideTranslations: GuideTranslations = {
  title: {
    en: "Airport Guide",
    lo: "ຄູ່ມືສະໜາມບິນ",
    zh: "机场指南",
  },
  tabs: {
    departure: {
      en: "Departure",
      lo: "ຂາອອກ",
      zh: "出发",
    },
    arrival: {
      en: "Arrival",
      lo: "ຂາເຂົ້າ",
      zh: "到达",
    },
    transfer: {
      en: "Transfer",
      lo: "ການຂົນສົ່ງ",
      zh: "中转",
    },
    airportFacilities: {
      en: "Airport Facilities & Services",
      lo: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການ",
      zh: "机场设施与服务",
    },
    specialServices: {
      en: "Special Services",
      lo: "ບໍລິການພິເສດ",
      zh: "特殊照顾服务",
    },
    hotelServices: {
      en: "Hotel Services",
      lo: "ບໍລິການໂຮງແຮມ",
      zh: "酒店服务",
    },
  },
};
