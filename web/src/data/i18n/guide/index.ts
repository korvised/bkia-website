import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { checkin, type CheckinKey, tCheckin } from "./checkin";
import { baggage, type BaggageKey, tBaggage } from "./baggage";
import {
  relatedServices,
  type RelatedServicesKey,
  tRelatedServices,
} from "./related-services";
import {
  departureNav,
  type DepartureNavKey,
  tDepartureNav,
} from "./departure-nav";

export function createPassengerGuideI18n(lang: Lang) {
  const checkinT = createTranslator<typeof checkin, CheckinKey>(checkin, lang);
  const baggageT = createTranslator<typeof baggage, BaggageKey>(baggage, lang);
  const relatedServicesT = createTranslator<
    typeof relatedServices,
    RelatedServicesKey
  >(relatedServices, lang);
  const departureNavT = createTranslator<typeof departureNav, DepartureNavKey>(
    departureNav,
    lang,
  );

  return {
    checkin: checkinT,
    baggage: baggageT,
    relatedServices: relatedServicesT,
    departureNav: departureNavT,
  };
}

export {
  checkin,
  tCheckin,
  baggage,
  tBaggage,
  relatedServices,
  tRelatedServices,
  departureNav,
  tDepartureNav,
};
export type { CheckinKey, BaggageKey, RelatedServicesKey, DepartureNavKey };
