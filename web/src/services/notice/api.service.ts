import { fetchJSON, withQuery } from "@/lib";
import type {
  INoticeResponse,
  QueryNotice,
  NoticePageProps,
  INotice,
} from "@/types/notice";
import { ImportantPriority } from "@/types/enum";

export function toNoticeQuery(
  filters: Awaited<NoticePageProps["searchParams"]>,
): QueryNotice {
  const priority = filters.priority as ImportantPriority | "all" | undefined;

  return {
    search: filters.q,
    priority: priority && priority !== "all" ? priority : undefined,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 25,
    sortBy: "publishDate",
    order: "DESC",
  };
}

/**
 * List public notices (for website visitors)
 * Only shows active notices within validity period
 */
export function listNotices(query: QueryNotice) {
  const url = withQuery("notices/public", {
    search: query.search,
    priority: query.priority,
    sortBy: query.sortBy,
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<INoticeResponse>(url);
}

/**
 * Get highlighted notices for homepage slider
 * Returns urgent and high priority notices only
 */
export function listHighlightNotices(limit: number = 5) {
  const url = withQuery("notices/highlights", {
    limit: limit.toString(),
  });
  return fetchJSON<INotice[]>(url);
}

/**
 * Get a single notice by ID
 */
export async function getNoticeById(id: string): Promise<INotice | null> {
  try {
    return await fetchJSON<INotice>(`notices/${id}`);
  } catch (error) {
    return null;
  }
}
