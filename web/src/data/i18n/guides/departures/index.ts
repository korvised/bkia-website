import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { checkin, type CheckinKey, tCheckin } from "./checkin";
import { baggage, type BaggageKey, tBaggage } from "./baggage";
import { security, type SecurityKey, tSecurity } from "./security";
import { facilities, type FacilitiesKey, tFacilities } from "./facility";
import { immigration, type ImmigrationKey, tImmigration } from "./immigration";
import { boarding, type BoardingKey, tBoarding } from "./boarding";
import {
  airportSecurity,
  type AirportSecurityKey,
  tAirportSecurity,
} from "./airport-security";
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

export function createDepartureGuideI18n(lang: Lang) {
  const checkinT = createTranslator<typeof checkin, CheckinKey>(checkin, lang);
  const baggageT = createTranslator<typeof baggage, BaggageKey>(baggage, lang);
  const securityT = createTranslator<typeof security, SecurityKey>(
    security,
    lang,
  );
  const facilitiesT = createTranslator<typeof facilities, FacilitiesKey>(
    facilities,
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
  const airportSecurityT = createTranslator<
    typeof airportSecurity,
    AirportSecurityKey
  >(airportSecurity, lang);
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
    facilities: facilitiesT,
    immigration: immigrationT,
    boarding: boardingT,
    airportSecurity: airportSecurityT,
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
  facilities,
  tFacilities,
  immigration,
  tImmigration,
  boarding,
  tBoarding,
  airportSecurity,
  tAirportSecurity,
  relatedServices,
  tRelatedServices,
  departureNav,
  tDepartureNav,
};
export type {
  CheckinKey,
  BaggageKey,
  SecurityKey,
  FacilitiesKey,
  ImmigrationKey,
  BoardingKey,
  AirportSecurityKey,
  RelatedServicesKey,
  DepartureNavKey,
};
