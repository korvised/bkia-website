import { fetchJSON, withQuery } from "@/lib";
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
 * Get a single news by slug
 */
export async function getNewsBySlug(slug: string): Promise<INews | null> {
  try {
    return await fetchJSON<INews>(`news/slug/${slug}`);
  } catch (error) {
    return null;
  }
}
