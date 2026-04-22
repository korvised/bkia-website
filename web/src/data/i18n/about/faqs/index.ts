import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { faqs, type FAQsKey, tFAQs } from "./faqs";

export function createFAQsI18n(lang: Lang) {
  const faqsT = createTranslator<typeof faqs, FAQsKey>(faqs, lang);
  return { faqs: faqsT };
}

export { faqs, tFAQs, faqData } from "./faqs";
export type { FAQsKey, FAQQA, FAQLink, FAQCategory } from "./faqs";
