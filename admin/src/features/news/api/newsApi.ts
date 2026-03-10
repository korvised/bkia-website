import { apiSlice } from "@/redux";
import { NEWS_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { INews, INewsListResponse, INewsFilter } from "@/features/news/types";

const newsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNews: builder.query<INewsListResponse, INewsFilter>({
      query: (params) => ({
        url: "/news",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((item) => ({ type: NEWS_TAG, id: item.id })),
              { type: NEWS_TAG, id: "LIST" },
            ]
          : [{ type: NEWS_TAG, id: "LIST" }],
    }),

    fetchNewsById: builder.query<INews, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: NEWS_TAG, id }],
    }),

    createNews: builder.mutation<INews, FormData>({
      query: (body) => ({
        url: "/news",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: NEWS_TAG, id: "LIST" }],
    }),

    updateNews: builder.mutation<INews, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: NEWS_TAG, id },
        { type: NEWS_TAG, id: "LIST" },
      ],
    }),

    deleteNews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: NEWS_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchNewsQuery,
  useFetchNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
