import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import {
  toFromAirport,
  type ToFromAirportKey,
  tToFromAirport,
} from "./to-from-airport";

export function createToFromAirportI18n(lang: Lang) {
  const toFromAirportT = createTranslator<
    typeof toFromAirport,
    ToFromAirportKey
  >(toFromAirport, lang);
  return { toFromAirport: toFromAirportT };
}

export { toFromAirport, tToFromAirport };
export type { ToFromAirportKey };
