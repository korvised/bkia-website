import { CN, GB, LA } from "country-flag-icons/react/1x1";
import { LanguageConfig } from "@/types/language";

export const SITE_CONFIG = {
  name: "Bokeo International Airport",
  nameLao: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
  description: "Gateway to Laos - Bokeo International Airport",
  url: "https://bokeoairport.la",
  ogImage: "/images/logo/bkia-logo.png",
  links: {
    twitter: "https://twitter.com/bokeoairport",
    facebook: "https://facebook.com/bokeoairport",
    instagram: "https://instagram.com/bokeoairport",
  },
} as const;

export const languages: LanguageConfig[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: GB,
    dir: "ltr",
  },
  {
    code: "lo",
    name: "Lao",
    nativeName: "ລາວ",
    flag: LA,
    dir: "ltr",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: CN,
    dir: "ltr",
  },
];
