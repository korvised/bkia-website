import { createTranslator } from "@/lib";
import type { Lang } from "@/types/language";
import {
  packing,
  type PackingKey,
  tPacking,
  PACKING_BENEFITS,
  PACKING_SIZES,
  PACKING_PROHIBITED,
  type PackingBenefit,
  type PackingSize,
  type PackingProhibited,
} from "./packing";

export function createPackingI18n(lang: Lang) {
  const t = createTranslator<typeof packing, PackingKey>(packing, lang);

  const benefits = PACKING_BENEFITS[lang];
  const sizes = PACKING_SIZES[lang];
  const prohibited = PACKING_PROHIBITED[lang];

  return { packing: t, benefits, sizes, prohibited };
}

export {
  packing,
  tPacking,
  PACKING_BENEFITS,
  PACKING_SIZES,
  PACKING_PROHIBITED,
};
export type { PackingKey, PackingBenefit, PackingSize, PackingProhibited };
