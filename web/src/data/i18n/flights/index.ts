import { createTranslator } from "@/utils/i18n";
import { Lang } from "@/types/language";
import { board, type BoardKey, tBoard } from "./board";
import { common, type CommonKey, tCommon } from "./common";
import { filter, type FilterKey, tFilter } from "./filter";
import { table, type TableKey, tTable } from "./table";

export function createFlightI18n(lang: Lang) {
  const boardT = createTranslator<typeof board, BoardKey>(board, lang);
  const commonT = createTranslator<typeof common, CommonKey>(common, lang);
  const filterT = createTranslator<typeof filter, FilterKey>(filter, lang);
  const tableT = createTranslator<typeof table, TableKey>(table, lang);

  return {
    board: boardT,
    common: commonT,
    filter: filterT,
    table: tableT,
  };
}

export { tBoard, tCommon, tFilter, tTable };
export type { BoardKey, CommonKey, FilterKey, TableKey };
