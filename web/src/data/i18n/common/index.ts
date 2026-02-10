import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { homepage, type HomepageKey, tHomepage } from "./homepage";
import { pagination, type PaginationKey, tPagination } from "./pagination";

export function createCommonI18n(lang: Lang) {
  const homepageT = createTranslator<typeof homepage, HomepageKey>(
    homepage,
    lang,
  );
  const paginationT = createTranslator<typeof pagination, PaginationKey>(
    pagination,
    lang,
  );

  return {
    homepage: homepageT,
    pagination: paginationT,
  };
}

export { pagination, tPagination, tHomepage };
export type { PaginationKey };
