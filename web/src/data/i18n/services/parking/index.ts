import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { parking, type ParkingKey, tParking } from "./parking";

export function createParkingI18n(lang: Lang) {
  const parkingT = createTranslator<typeof parking, ParkingKey>(parking, lang);

  return {
    parking: parkingT,
  };
}

export { parking, tParking };
export type { ParkingKey };
