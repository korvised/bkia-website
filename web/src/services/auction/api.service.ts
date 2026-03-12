import { fetchJSON, withQuery } from "@/lib";
import type {
  IAuction,
  IAuctionListResponse,
  AuctionStatus,
  AuctionCategory,
} from "@/types/auction";

export interface ListAuctionsQuery {
  status?: AuctionStatus;
  category?: AuctionCategory;
  page?: number;
  limit?: number;
}

/**
 * List auctions for the public website (paginated).
 */
export async function listPublicAuctions(
  query?: ListAuctionsQuery,
): Promise<IAuctionListResponse> {
  try {
    const url = withQuery("auctions/public", query);
    return await fetchJSON<IAuctionListResponse>(url);
  } catch {
    return {
      data: [],
      meta: { total: 0, page: 1, limit: 10, pages: 0 },
    };
  }
}

/**
 * Get a single auction by ID.
 */
export async function getAuction(id: string): Promise<IAuction | null> {
  try {
    return await fetchJSON<IAuction>(`auctions/${id}`);
  } catch {
    return null;
  }
}
