import { apiSlice } from "@/redux/api-slice";
import { FEEDBACK_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  IFeedback,
  IFeedbackFilter,
  IFeedbackListResponse,
  IUpdateFeedbackStatusPayload,
} from "@/features/feedback/types";

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeedbacks: builder.query<IFeedbackListResponse, IFeedbackFilter>({
      query: (params) => ({
        url: "feedback",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: [FEEDBACK_TAG],
    }),

    fetchFeedbackById: builder.query<IFeedback, string>({
      query: (id) => ({
        url: `feedback/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _err, id) => [{ type: FEEDBACK_TAG, id }],
    }),

    updateFeedbackStatus: builder.mutation<IFeedback, IUpdateFeedbackStatusPayload>({
      query: ({ id, body }) => ({
        url: `feedback/${id}/status`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        FEEDBACK_TAG,
        { type: FEEDBACK_TAG, id },
      ],
    }),

    deleteFeedback: builder.mutation<void, string>({
      query: (id) => ({
        url: `feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [FEEDBACK_TAG],
    }),
  }),
});

export const {
  useFetchFeedbacksQuery,
  useFetchFeedbackByIdQuery,
  useUpdateFeedbackStatusMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
