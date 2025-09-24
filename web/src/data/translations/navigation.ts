import { MultilingualText } from "@/types/language";

export interface Translations {
  menu: MultilingualText;
  passengerServices: MultilingualText;
  aboutUs: MultilingualText;
  airportName: MultilingualText;
}

export const translations: Translations = {
  menu: {
    en: "Menu",
    lo: "ເມນູ",
    zh: "菜单",
  },
  passengerServices: {
    en: "Passenger Services",
    lo: "ບໍລິການຜູ້ໂດຍສານ",
    zh: "旅客服务",
  },
  aboutUs: {
    en: "About Us",
    lo: "ກ່ຽວກັບພວກເຮົາ",
    zh: "关于我们",
  },
  airportName: {
    en: "Bokeo International Airport",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场",
  },
};
