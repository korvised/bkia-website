import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { feedback, type FeedbackKey, tFeedback } from "./feedback";

export function createFeedbackI18n(lang: Lang) {
  const feedbackT = createTranslator<typeof feedback, FeedbackKey>(feedback, lang);
  return { feedback: feedbackT };
}

export { feedback, tFeedback };
export type { FeedbackKey };
