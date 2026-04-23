import { createTranslator } from "@/lib";
import type { Lang } from "@/types/language";
import {
  parking,
  type ParkingKey,
  tParking,
  PARKING_VEHICLE_BASE,
  PARKING_VEHICLE_CONTENT,
  PARKING_ZONES,
  PARKING_PAYMENTS,
  PARKING_TIPS,
  type ParkingVehicleBase,
  type ParkingVehicleContent,
  type ParkingVehicle,
  type ParkingZone,
  type ParkingPayment,
} from "./parking";

export function createParkingI18n(lang: Lang) {
  const t = createTranslator<typeof parking, ParkingKey>(parking, lang);

  const vehicles: ParkingVehicle[] = PARKING_VEHICLE_BASE.map((base, i) => ({
    ...base,
    ...PARKING_VEHICLE_CONTENT[lang][i],
  }));

  const zones = PARKING_ZONES[lang];
  const payments = PARKING_PAYMENTS[lang];
  const tips = PARKING_TIPS[lang];

  return { parking: t, vehicles, zones, payments, tips };
}

export {
  parking,
  tParking,
  PARKING_VEHICLE_BASE,
  PARKING_VEHICLE_CONTENT,
  PARKING_ZONES,
  PARKING_PAYMENTS,
  PARKING_TIPS,
};
export type {
  ParkingKey,
  ParkingVehicleBase,
  ParkingVehicleContent,
  ParkingVehicle,
  ParkingZone,
  ParkingPayment,
};
