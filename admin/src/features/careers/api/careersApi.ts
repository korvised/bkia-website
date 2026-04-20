import { apiSlice } from "@/redux";
import { CAREERS_TAG, CAREER_ACTIVITIES_TAG } from "@/constants";
import type { IJobPost, ICareerActivity } from "@/features/careers/types";

const careersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ── Job Posts ────────────────────────────────────────────────────────────

    fetchJobPosts: builder.query<IJobPost[], void>({
      query: () => ({ url: "/career/jobs", method: "GET" }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((item) => ({ type: CAREERS_TAG, id: item.id })),
              { type: CAREERS_TAG, id: "LIST" },
            ]
          : [{ type: CAREERS_TAG, id: "LIST" }],
    }),

    fetchJobPostById: builder.query<IJobPost, string>({
      query: (id) => ({ url: `/career/jobs/${id}`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: CAREERS_TAG, id }],
    }),

    createJobPost: builder.mutation<IJobPost, FormData>({
      query: (body) => ({ url: "/career/jobs", method: "POST", data: body }),
      invalidatesTags: [{ type: CAREERS_TAG, id: "LIST" }],
    }),

    updateJobPost: builder.mutation<IJobPost, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/career/jobs/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: CAREERS_TAG, id },
        { type: CAREERS_TAG, id: "LIST" },
      ],
    }),

    deleteJobPost: builder.mutation<void, string>({
      query: (id) => ({ url: `/career/jobs/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: CAREERS_TAG, id: "LIST" }],
    }),

    // ── Career Activities ────────────────────────────────────────────────────

    fetchCareerActivities: builder.query<ICareerActivity[], void>({
      query: () => ({ url: "/career/activities/all", method: "GET" }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((item) => ({
                type: CAREER_ACTIVITIES_TAG,
                id: item.id,
              })),
              { type: CAREER_ACTIVITIES_TAG, id: "LIST" },
            ]
          : [{ type: CAREER_ACTIVITIES_TAG, id: "LIST" }],
    }),

    uploadCareerActivity: builder.mutation<ICareerActivity, FormData>({
      query: (body) => ({
        url: "/career/activities",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: CAREER_ACTIVITIES_TAG, id: "LIST" }],
    }),

    updateCareerActivity: builder.mutation<
      ICareerActivity,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/career/activities/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: CAREER_ACTIVITIES_TAG, id },
        { type: CAREER_ACTIVITIES_TAG, id: "LIST" },
      ],
    }),

    deleteCareerActivity: builder.mutation<void, string>({
      query: (id) => ({ url: `/career/activities/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: CAREER_ACTIVITIES_TAG, id: "LIST" }],
    }),

    reorderCareerActivities: builder.mutation<{ success: boolean }, { ids: string[] }>({
      query: (body) => ({
        url: "/career/activities/reorder",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [{ type: CAREER_ACTIVITIES_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchJobPostsQuery,
  useFetchJobPostByIdQuery,
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
  useDeleteJobPostMutation,
  useFetchCareerActivitiesQuery,
  useUploadCareerActivityMutation,
  useUpdateCareerActivityMutation,
  useDeleteCareerActivityMutation,
  useReorderCareerActivitiesMutation,
} = careersApi;
