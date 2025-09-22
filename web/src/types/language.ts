import { FlagComponent } from "country-flag-icons/react/1x1";

export type Lang = "en" | "lo" | "zh";

export interface MultilingualText {
  en: string;
  lo: string;
  zh: string;
}

export interface MultilingualContent {
  title: MultilingualText;
  description?: MultilingualText;
  content?: MultilingualText;
}

export interface NavigationItem {
  id: string;
  title: MultilingualText;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface LanguageConfig {
  code: Lang;
  name: string;
  nativeName: string;
  flag: FlagComponent;
  dir: "ltr" | "rtl";
}
