import { fetchJSON, postForm, withQuery } from "@/lib";
import type { ILostFoundItem, QueryLostFound } from "@/types/lost-found";
import { Lang } from "@/types/language";
import { IPaginationMeta } from "@/types/pagination";

export function listLostFound(query: QueryLostFound, lang: Lang) {
  const url = withQuery("lost-found", {
    locale: lang,
    type: query.type,
    category: query.category,
    search: query.search,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<{ data: ILostFoundItem[]; meta: IPaginationMeta }>(url);
}

export function submitClaim(
  itemId: string,
  data: FormData,
): Promise<{ claimId: string; message: string }> {
  return postForm(`lost-found/${itemId}/claims`, data);
}

export function getLostFoundStats(): Promise<{
  total: number;
  open: number;
  matched: number;
  returned: number;
}> {
  return fetchJSON("lost-found/stats");
}
