import { FlagComponent } from "country-flag-icons/react/1x1";

export type Lang = "en" | "lo" | "zh";

export type MultilingualText = Record<Lang, string>;

export interface LanguageConfig {
  code: Lang;
  name: string;
  nativeName: string;
  flag: FlagComponent;
  dir: "ltr" | "rtl";
}
