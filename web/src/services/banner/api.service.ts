import { fetchJSON } from "@/lib";
import type { IBanner } from "@/types/banner";

/**
 * List active banner slides for the public homepage hero slider.
 * Returns slides sorted by `order` ASC.
 */
export async function listPublicBanners(): Promise<IBanner[]> {
  try {
    return await fetchJSON<IBanner[]>("banners/public");
  } catch {
    return [];
  }
}
