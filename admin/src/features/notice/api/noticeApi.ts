import { apiSlice } from "@/redux";
import { NOTICE_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  INotice,
  INoticeListResponse,
  INoticeFilter,
  ICreateNoticePayload,
} from "@/features/notice/types";

const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotices: builder.query<INoticeListResponse, INoticeFilter>({
      query: (params) => ({
        url: "/notices",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((item) => ({
                type: NOTICE_TAG,
                id: item.id,
              })),
              { type: NOTICE_TAG, id: "LIST" },
            ]
          : [{ type: NOTICE_TAG, id: "LIST" }],
    }),

    fetchNoticeById: builder.query<INotice, string>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: NOTICE_TAG, id }],
    }),

    createNotice: builder.mutation<INotice, ICreateNoticePayload>({
      query: (body) => ({
        url: "/notices",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: NOTICE_TAG, id: "LIST" }],
    }),

    updateNotice: builder.mutation<
      INotice,
      { id: string; body: Partial<ICreateNoticePayload> }
    >({
      query: ({ id, body }) => ({
        url: `/notices/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: NOTICE_TAG, id },
        { type: NOTICE_TAG, id: "LIST" },
      ],
    }),

    deleteNotice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: NOTICE_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchNoticesQuery,
  useFetchNoticeByIdQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApi;
