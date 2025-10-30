import { CN, GB, LA } from "country-flag-icons/react/1x1";
import { LanguageConfig } from "@/types/language";

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
