import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { toThailand, type ToThailandKey, tToThailand } from "./to-thailand";
import { toMyanmar, type ToMyanmarKey, tToMyanmar } from "./to-myanmar";

export function createRegionalTransportI18n(lang: Lang) {
  const toThailandT = createTranslator<typeof toThailand, ToThailandKey>(
    toThailand,
    lang,
  );
  const toMyanmarT = createTranslator<typeof toMyanmar, ToMyanmarKey>(
    toMyanmar,
    lang,
  );

  return {
    toThailand: toThailandT,
    toMyanmar: toMyanmarT,
  };
}

export { toThailand, tToThailand, toMyanmar, tToMyanmar };

export type { ToThailandKey, ToMyanmarKey };
