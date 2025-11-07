import { createTranslator } from "@/utils/i18n";
import { Lang } from "@/types/language";
import { airline, type AirlineKey, tAirline } from "./airline";
import { board, type BoardKey, tBoard } from "./board";
import { common, type CommonKey, tCommon } from "./common";
import { filter, type FilterKey, tFilter } from "./filter";
import { search, type SearchKey, tSearch } from "./search";
import { table, type TableKey, tTable } from "./table";

export function createFlightI18n(lang: Lang) {
  const airlineT = createTranslator<typeof airline, AirlineKey>(airline, lang);
  const boardT = createTranslator<typeof board, BoardKey>(board, lang);
  const commonT = createTranslator<typeof common, CommonKey>(common, lang);
  const filterT = createTranslator<typeof filter, FilterKey>(filter, lang);
  const searchT = createTranslator<typeof search, SearchKey>(search, lang);
  const tableT = createTranslator<typeof table, TableKey>(table, lang);

  return {
    airline: airlineT,
    board: boardT,
    common: commonT,
    filter: filterT,
    search: searchT,
    table: tableT,
  };
}

export { tAirline, tBoard, tCommon, tFilter, tSearch, tTable };
export type { AirlineKey, BoardKey, CommonKey, FilterKey, TableKey };
