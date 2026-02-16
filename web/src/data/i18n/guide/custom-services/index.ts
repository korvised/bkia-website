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
import {
  mobilityGuideline,
  type MobilityGuidelineKey,
  tMobilityGuideline,
} from "./mobility-guideline";
import {
  petsGuideline,
  type PetsGuidelineKey,
  tPetsGuideline,
} from "./pets-guideline";

export function createCustomServicesI18n(lang: Lang) {
  const customServicesT = createTranslator<
    typeof customServices,
    CustomServicesKey
  >(customServices, lang);
  const pregnancyGuidelineT = createTranslator<
    typeof pregnancyGuideline,
    PregnancyGuidelineKey
  >(pregnancyGuideline, lang);
  const mobilityGuidelineT = createTranslator<
    typeof mobilityGuideline,
    MobilityGuidelineKey
  >(mobilityGuideline, lang);
  const petsGuidelineT = createTranslator<
    typeof petsGuideline,
    PetsGuidelineKey
  >(petsGuideline, lang);

  return {
    customServices: customServicesT,
    pregnancyGuideline: pregnancyGuidelineT,
    mobilityGuideline: mobilityGuidelineT,
    petsGuideline: petsGuidelineT,
  };
}

export { customServices, tCustomServices };
export type { CustomServicesKey };

export { pregnancyGuideline, tPregnancyGuideline };
export type { PregnancyGuidelineKey };

export { mobilityGuideline, tMobilityGuideline };
export type { MobilityGuidelineKey };

export { petsGuideline, tPetsGuideline };
export type { PetsGuidelineKey };
