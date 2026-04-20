import { createTranslator } from "@/lib";
import type { Lang } from "@/types/language";
import { careers, type CareersKey } from "./careers";

export {
  careers,
  careersDocsList,
  careersBenefitsList,
  careersValuesData,
  careersBenefitsShort,
} from "./careers";
export type { CareersKey } from "./careers";

export function createCareersI18n(lang: Lang) {
  const t = createTranslator<typeof careers, CareersKey>(careers, lang);
  return { careers: t };
}
