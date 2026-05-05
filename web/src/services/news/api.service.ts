import { ApiError, fetchJSON, withQuery } from "@/lib";
import type {
  INewsResponse,
  QueryNews,
  NewsPageProps,
  INews,
} from "@/types/news";
import { NewsCategory } from "@/types/news";

export function toNewsQuery(
  filters: Awaited<NewsPageProps["searchParams"]>,
): QueryNews {
  const category = filters.category as NewsCategory | "all" | undefined;

  return {
    search: filters.q,
    category: category && category !== "all" ? category : undefined,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 12,
    sortBy: "publishDate",
    order: "DESC",
  };
}

/**
 * List public news (for website visitors)
 */
export function listNews(query: QueryNews) {
  const url = withQuery("news/public", {
    search: query.search,
    category: query.category,
    sortBy: query.sortBy,
    order: query.order,
    page: query.page,
    limit: query.limit,
  });
  return fetchJSON<INewsResponse>(url);
}

/**
 * Get featured news for homepage
 */
export function listFeaturedNews(limit: number = 3) {
  const url = withQuery("news/featured", {
    limit: limit.toString(),
  });
  return fetchJSON<INews[]>(url);
}

/**
 * Get a single news article by slug.
 * Returns null only on 404 — re-throws on 500 / network errors so
 * the caller (server component) can propagate to the error.tsx boundary.
 */
export async function getNewsBySlug(slug: string): Promise<INews | null> {
  try {
    return await fetchJSON<INews>(`news/slug/${slug}`);
  } catch (err) {
    if (err instanceof ApiError && err.isNotFound) return null;
    throw err;
  }
}
