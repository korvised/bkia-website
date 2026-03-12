import { apiSlice } from "@/redux";
import { AUCTION_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  IAuction,
  IAuctionListResponse,
  IAuctionFilter,
} from "@/features/auction/types";

const auctionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAuctions: builder.query<IAuctionListResponse, IAuctionFilter>({
      query: (params) => ({
        url: "/auctions",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((item) => ({
                type: AUCTION_TAG,
                id: item.id,
              })),
              { type: AUCTION_TAG, id: "LIST" },
            ]
          : [{ type: AUCTION_TAG, id: "LIST" }],
    }),

    fetchAuctionById: builder.query<IAuction, string>({
      query: (id) => ({
        url: `/auctions/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: AUCTION_TAG, id }],
    }),

    createAuction: builder.mutation<IAuction, FormData>({
      query: (body) => ({
        url: "/auctions",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: AUCTION_TAG, id: "LIST" }],
    }),

    updateAuction: builder.mutation<IAuction, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/auctions/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: AUCTION_TAG, id },
        { type: AUCTION_TAG, id: "LIST" },
      ],
    }),

    deleteAuctionDocument: builder.mutation<
      { message: string },
      { auctionId: string; docId: string }
    >({
      query: ({ auctionId, docId }) => ({
        url: `/auctions/${auctionId}/documents/${docId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { auctionId }) => [
        { type: AUCTION_TAG, id: auctionId },
      ],
    }),

    deleteAuction: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/auctions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: AUCTION_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchAuctionsQuery,
  useFetchAuctionByIdQuery,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionDocumentMutation,
  useDeleteAuctionMutation,
} = auctionApi;
