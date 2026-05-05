import { ApiError, fetchJSON, withQuery } from "@/lib";
import type { ICareerActivity, IJobPost } from "@/types/careers";

/**
 * List all published job posts (public, ordered by publishDate DESC)
 */
export function listJobPosts(): Promise<IJobPost[]> {
  return fetchJSON<IJobPost[]>("career/jobs/public");
}

/**
 * Get a single published job post by id (public, returns full data including content).
 * Returns null only on 404 — re-throws on 500 / network errors so
 * the caller (server component) can propagate to the error.tsx boundary.
 */
export async function getJobPostById(id: string): Promise<IJobPost | null> {
  try {
    return await fetchJSON<IJobPost>(`career/jobs/public/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.isNotFound) return null;
    throw err;
  }
}

/**
 * List featured published job posts for the home page
 */
export function listFeaturedJobPosts(limit: number = 3): Promise<IJobPost[]> {
  const url = withQuery("career/jobs/public/featured", { limit: limit.toString() });
  return fetchJSON<IJobPost[]>(url);
}

/**
 * List active company activity images for the careers gallery
 */
export function listCareerActivities(): Promise<ICareerActivity[]> {
  return fetchJSON<ICareerActivity[]>("career/activities");
}
