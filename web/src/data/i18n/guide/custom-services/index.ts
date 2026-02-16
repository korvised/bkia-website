import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import {
  customServices,
  type CustomServicesKey,
  tCustomServices,
} from "./custom-services";
import {
  pregnancyGuideline,
  type PregnancyGuidelineKey,
  tPregnancyGuideline,
} from "./pregnancy-guideline";

export function createCustomServicesI18n(lang: Lang) {
  const customServicesT = createTranslator<
    typeof customServices,
    CustomServicesKey
  >(customServices, lang);
  const pregnancyGuidelineT = createTranslator<
    typeof pregnancyGuideline,
    PregnancyGuidelineKey
  >(pregnancyGuideline, lang);

  return {
    customServices: customServicesT,
    pregnancyGuideline: pregnancyGuidelineT,
  };
}

export { customServices, tCustomServices };
export type { CustomServicesKey };

export { pregnancyGuideline, tPregnancyGuideline };
export type { PregnancyGuidelineKey };
