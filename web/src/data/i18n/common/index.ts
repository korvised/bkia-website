import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { pagination, type PaginationKey, tPagination } from "./pagination";

export function createCommonI18n(lang: Lang) {
  const paginationT = createTranslator<typeof pagination, PaginationKey>(
    pagination,
    lang,
  );

  return {
    pagination: paginationT,
  };
}

export { pagination, tPagination };
export type { PaginationKey };
