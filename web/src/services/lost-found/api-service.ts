import { fetchJSON, postForm, withQuery } from "@/lib";
import type {
  ILostFoundItem,
  LostFoundPageProps,
  QueryLostFound,
} from "@/types/lost-found";
import { LostFoundCategory, LostFoundType } from "@/types/enum";
import { Lang } from "@/types/language";
import { IPaginationMeta } from "@/types/pagination";

export function toLostFoundQuery(
  filters: Awaited<LostFoundPageProps["searchParams"]>,
): QueryLostFound {
  const type = filters.type as LostFoundType | "all" | undefined;
  const category = filters.category as LostFoundCategory | "all" | undefined;

  return {
    type: type && type !== "all" ? type : undefined,
    category: category && category !== "all" ? category : undefined,
    search: filters.q,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 20,
  };
}

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

export async function getLostFound(
  id: string,
  lang: Lang,
): Promise<ILostFoundItem | null> {
  try {
    return await fetchJSON<ILostFoundItem>(`lost-found/${id}?locale=${lang}`);
  } catch {
    return null;
  }
}

export function submitLostFound(
  data: FormData,
): Promise<{ referenceCode: string }> {
  return postForm("lost-found", data);
}

export function submitClaim(
  itemId: string,
  data: FormData,
): Promise<{ claimId: string; message: string }> {
  return postForm(`lost-found/${itemId}/claims`, data);
}
