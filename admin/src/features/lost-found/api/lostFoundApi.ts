import { apiSlice } from "@/redux";
import { LOST_FOUND_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  ILostFoundItem,
  ILostFoundListResponse,
  ILostFoundFilter,
  IUpdateDisplayPayload,
  IUpdateVisibilityPayload,
  IReviewClaimPayload,
  ILostFoundClaim,
} from "@/features/lost-found/types";

const lostFoundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchLostFoundItems: builder.query<ILostFoundListResponse, ILostFoundFilter>({
      query: (params) => ({
        url: "/lost-found/admin/all",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((item) => ({
                type: LOST_FOUND_TAG,
                id: item.id,
              })),
              { type: LOST_FOUND_TAG, id: "LIST" },
            ]
          : [{ type: LOST_FOUND_TAG, id: "LIST" }],
    }),

    fetchLostFoundById: builder.query<ILostFoundItem, string>({
      query: (id) => ({
        url: `/lost-found/admin/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: LOST_FOUND_TAG, id }],
    }),

    createLostFound: builder.mutation<{ referenceCode: string }, FormData>({
      query: (body) => ({
        url: "/lost-found",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: LOST_FOUND_TAG, id: "LIST" }],
    }),

    updateDisplay: builder.mutation<ILostFoundItem, { id: string; body: IUpdateDisplayPayload }>({
      query: ({ id, body }) => ({
        url: `/lost-found/${id}/display`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: LOST_FOUND_TAG, id },
        { type: LOST_FOUND_TAG, id: "LIST" },
      ],
    }),

    updateVisibility: builder.mutation<ILostFoundItem, { id: string; body: IUpdateVisibilityPayload }>({
      query: ({ id, body }) => ({
        url: `/lost-found/${id}/visibility`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: LOST_FOUND_TAG, id },
        { type: LOST_FOUND_TAG, id: "LIST" },
      ],
    }),

    setCover: builder.mutation<ILostFoundItem, { id: string; fileId: string }>({
      query: ({ id, fileId }) => ({
        url: `/lost-found/${id}/cover`,
        method: "PATCH",
        data: { fileId },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: LOST_FOUND_TAG, id }],
    }),

    uploadImages: builder.mutation<ILostFoundItem, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/lost-found/${id}/images`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: LOST_FOUND_TAG, id }],
    }),

    removeImage: builder.mutation<void, { id: string; fileId: string }>({
      query: ({ id, fileId }) => ({
        url: `/lost-found/${id}/images/${fileId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: LOST_FOUND_TAG, id }],
    }),

    fetchClaims: builder.query<ILostFoundClaim[], string>({
      query: (id) => ({
        url: `/lost-found/${id}/claims`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: LOST_FOUND_TAG, id: `claims-${id}` }],
    }),

    reviewClaim: builder.mutation<ILostFoundClaim, { claimId: string; body: IReviewClaimPayload; itemId: string }>({
      query: ({ claimId, body }) => ({
        url: `/lost-found/claims/${claimId}/review`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { itemId }) => [
        { type: LOST_FOUND_TAG, id: itemId },
        { type: LOST_FOUND_TAG, id: `claims-${itemId}` },
        { type: LOST_FOUND_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchLostFoundItemsQuery,
  useFetchLostFoundByIdQuery,
  useCreateLostFoundMutation,
  useUpdateDisplayMutation,
  useUpdateVisibilityMutation,
  useSetCoverMutation,
  useUploadImagesMutation,
  useRemoveImageMutation,
  useFetchClaimsQuery,
  useReviewClaimMutation,
} = lostFoundApi;
