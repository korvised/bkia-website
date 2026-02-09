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
    isActive: true,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 25,
    sortBy: "publishDate",
    order: "DESC",
  };
}

export function listNotices(query: QueryNotice) {
  const url = withQuery("notices", {
    search: query.search,
    priority: query.priority,
    publishDate: query.publishDate,
    effectiveFrom: query.effectiveFrom,
    effectiveTo: query.effectiveTo,
    isActive: query.isActive ? "true" : undefined,
    sortBy: query.sortBy,
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<INoticeResponse>(url);
}

export function getNoticeById(id: string) {
  return fetchJSON<INotice>(`notices/${id}`);
}
