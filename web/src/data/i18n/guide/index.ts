import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { checkin, type CheckinKey, tCheckin } from "./checkin";
import { baggage, type BaggageKey, tBaggage } from "./baggage";
import { security, type SecurityKey, tSecurity } from "./security";
import { immigration, type ImmigrationKey, tImmigration } from "./immigration";
import { boarding, type BoardingKey, tBoarding } from "./boarding";
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
  const securityT = createTranslator<typeof security, SecurityKey>(
    security,
    lang,
  );
  const immigrationT = createTranslator<typeof immigration, ImmigrationKey>(
    immigration,
    lang,
  );
  const boardingT = createTranslator<typeof boarding, BoardingKey>(
    boarding,
    lang,
  );
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
    security: securityT,
    immigration: immigrationT,
    boarding: boardingT,
    relatedServices: relatedServicesT,
    departureNav: departureNavT,
  };
}

export {
  checkin,
  tCheckin,
  baggage,
  tBaggage,
  security,
  tSecurity,
  immigration,
  tImmigration,
  boarding,
  tBoarding,
  relatedServices,
  tRelatedServices,
  departureNav,
  tDepartureNav,
};
export type {
  CheckinKey,
  BaggageKey,
  SecurityKey,
  ImmigrationKey,
  BoardingKey,
  RelatedServicesKey,
  DepartureNavKey,
};
