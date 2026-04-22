import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { arrivalAirport, type ArrivalAirportKey, tArrivalAirport } from "./arrival-airport";
import { baggageClaim, type BaggageClaimKey, tBaggageClaim } from "./baggage-claim";
import { borderInspection, type BorderInspectionKey, tBorderInspection } from "./border-inspection";
import { customsInspection, type CustomsInspectionKey, tCustomsInspection } from "./customs-inspection";
import { exitCustoms, type ExitCustomsKey, tExitCustoms } from "./exit-customs";
import { leavingAirport, type LeavingAirportKey, tLeavingAirport } from "./leaving-airport";
import { arrivalNav, type ArrivalNavKey, tArrivalNav } from "./arrival-nav";

export function createArrivalGuideI18n(lang: Lang) {
  const arrivalAirportT = createTranslator<typeof arrivalAirport, ArrivalAirportKey>(arrivalAirport, lang);
  const baggageClaimT = createTranslator<typeof baggageClaim, BaggageClaimKey>(baggageClaim, lang);
  const borderInspectionT = createTranslator<typeof borderInspection, BorderInspectionKey>(borderInspection, lang);
  const customsInspectionT = createTranslator<typeof customsInspection, CustomsInspectionKey>(customsInspection, lang);
  const exitCustomsT = createTranslator<typeof exitCustoms, ExitCustomsKey>(exitCustoms, lang);
  const leavingAirportT = createTranslator<typeof leavingAirport, LeavingAirportKey>(leavingAirport, lang);
  const arrivalNavT = createTranslator<typeof arrivalNav, ArrivalNavKey>(arrivalNav, lang);

  return {
    arrivalAirport: arrivalAirportT,
    baggageClaim: baggageClaimT,
    borderInspection: borderInspectionT,
    customsInspection: customsInspectionT,
    exitCustoms: exitCustomsT,
    leavingAirport: leavingAirportT,
    arrivalNav: arrivalNavT,
  };
}

export {
  arrivalAirport,
  tArrivalAirport,
  baggageClaim,
  tBaggageClaim,
  borderInspection,
  tBorderInspection,
  customsInspection,
  tCustomsInspection,
  exitCustoms,
  tExitCustoms,
  leavingAirport,
  tLeavingAirport,
  arrivalNav,
  tArrivalNav,
};
export type {
  ArrivalAirportKey,
  BaggageClaimKey,
  BorderInspectionKey,
  CustomsInspectionKey,
  ExitCustomsKey,
  LeavingAirportKey,
  ArrivalNavKey,
};
