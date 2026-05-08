import { fetchJSON, postForm, withQuery } from "@/lib";
import type { ILostFoundItem, QueryLostFound } from "@/types/lost-found";
import { Lang } from "@/types/language";
import { IPaginationMeta } from "@/types/pagination";

export function listLostFound(query: QueryLostFound, lang: Lang) {
  const url = withQuery("lost-found", {
    locale: lang,
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
): Promise<{ claimId: string; referenceCode: string; message: string }> {
  return postForm(`lost-found/${itemId}/claims`, data);
}

export function submitStandaloneClaim(
  data: FormData,
): Promise<{ claimId: string; referenceCode: string; message: string }> {
  return postForm("lost-found/claims", data);
}

export function getLostFoundStats(): Promise<{
  total: number;
  open: number;
  matched: number;
  returned: number;
}> {
  return fetchJSON("lost-found/stats");
}

export interface TrackedClaim {
  referenceCode: string;
  status: string;
  category: string | null;
  itemDescription: string | null;
  lostLocation: string | null;
  lostDate: string | null;
  claimantName: string;
  staffNote: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  linkedItem: {
    referenceCode: string;
    status: string;
    category: string;
    displayNames: Record<string, string>;
  } | null;
}

export function trackClaim(referenceCode: string): Promise<TrackedClaim> {
  return fetchJSON(`lost-found/claims/track/${encodeURIComponent(referenceCode)}`);
}
