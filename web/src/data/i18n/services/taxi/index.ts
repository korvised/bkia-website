import { createTranslator } from "@/lib";
import type { Lang } from "@/types/language";
import {
  taxi,
  type TaxiKey,
  tTaxi,
  TAXI_IMAGES,
  TAXI_PRICES,
  TAXI_FEATURES,
  TAXI_DEST_BASE,
  TAXI_DEST_CONTENT,
  TAXI_VEHICLE_BASE,
  TAXI_VEHICLE_CONTENT,
  TAXI_PAYMENTS,
  type TaxiDestBase,
  type TaxiDestContent,
  type TaxiDest,
  type TaxiVehicleBase,
  type TaxiVehicleContent,
  type TaxiVehicle,
  type TaxiPayment,
} from "./taxi";

export function createTaxiI18n(lang: Lang) {
  const t = createTranslator<typeof taxi, TaxiKey>(taxi, lang);

  const features = TAXI_FEATURES[lang];

  const destinations: TaxiDest[] = TAXI_DEST_BASE.map((base, i) => ({
    ...base,
    ...TAXI_DEST_CONTENT[lang][i],
  }));

  const vehicles: TaxiVehicle[] = TAXI_VEHICLE_BASE.map((base, i) => ({
    ...base,
    ...TAXI_VEHICLE_CONTENT[lang][i],
  }));

  const payments = TAXI_PAYMENTS[lang];

  return { taxi: t, features, destinations, vehicles, payments };
}

export {
  taxi,
  tTaxi,
  TAXI_IMAGES,
  TAXI_PRICES,
  TAXI_FEATURES,
  TAXI_DEST_BASE,
  TAXI_DEST_CONTENT,
  TAXI_VEHICLE_BASE,
  TAXI_VEHICLE_CONTENT,
  TAXI_PAYMENTS,
};
export type {
  TaxiKey,
  TaxiDestBase,
  TaxiDestContent,
  TaxiDest,
  TaxiVehicleBase,
  TaxiVehicleContent,
  TaxiVehicle,
  TaxiPayment,
};
