import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { notices, type NoticesKey, tNotices } from "./notices";
import { lostFound, type LostFoundKey, tLostFound } from "./lost-found";
import { feedback, type FeedbackKey, tFeedback } from "./feedback";

export function createSupportI18n(lang: Lang) {
  const noticesT = createTranslator<typeof notices, NoticesKey>(notices, lang);
  const lostFoundT = createTranslator<typeof lostFound, LostFoundKey>(
    lostFound,
    lang,
  );
  const feedbackT = createTranslator<typeof feedback, FeedbackKey>(
    feedback,
    lang,
  );

  return {
    notices: noticesT,
    lostFound: lostFoundT,
    feedback: feedbackT,
  };
}

export { notices, tNotices, lostFound, tLostFound, feedback, tFeedback };
export type { NoticesKey, LostFoundKey, FeedbackKey };
