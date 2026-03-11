import { apiSlice } from "@/redux";
import { BANNER_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  IBanner,
  IBannerListResponse,
  IBannerFilter,
} from "@/features/banner/types";

const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBanners: builder.query<IBannerListResponse, IBannerFilter>({
      query: (params) => ({
        url: "/banners",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((item) => ({
                type: BANNER_TAG,
                id: item.id,
              })),
              { type: BANNER_TAG, id: "LIST" },
            ]
          : [{ type: BANNER_TAG, id: "LIST" }],
    }),

    fetchBannerById: builder.query<IBanner, string>({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: BANNER_TAG, id }],
    }),

    createBanner: builder.mutation<IBanner, FormData>({
      query: (body) => ({
        url: "/banners",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: BANNER_TAG, id: "LIST" }],
    }),

    updateBanner: builder.mutation<IBanner, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/banners/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: BANNER_TAG, id },
        { type: BANNER_TAG, id: "LIST" },
      ],
    }),

    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: BANNER_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchBannersQuery,
  useFetchBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
