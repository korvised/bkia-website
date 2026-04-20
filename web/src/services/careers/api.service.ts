import { fetchJSON } from "@/lib";
import type { ICareerActivity, IJobPost } from "@/types/careers";

/**
 * List all published job posts (public, ordered by publishDate DESC)
 */
export function listJobPosts(): Promise<IJobPost[]> {
  return fetchJSON<IJobPost[]>("career/jobs/public");
}

/**
 * Get a single published job post by id (public, returns full data including content)
 */
export async function getJobPostById(id: string): Promise<IJobPost | null> {
  try {
    return await fetchJSON<IJobPost>(`career/jobs/public/${id}`);
  } catch {
    return null;
  }
}

/**
 * List featured published job posts for the home page
 */
export function listFeaturedJobPosts(): Promise<IJobPost[]> {
  return fetchJSON<IJobPost[]>("career/jobs/public/featured");
}

/**
 * List active company activity images for the careers gallery
 */
export function listCareerActivities(): Promise<ICareerActivity[]> {
  return fetchJSON<ICareerActivity[]>("career/activities");
}
