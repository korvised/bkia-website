import { apiSlice } from "@/redux";
import { COUNTER_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { ICounter, ICounterFilter, ICounterForm } from "@/features/counter/types";

const counterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCounters: builder.query<ICounter[], ICounterFilter>({
      query: (params) => ({
        url: "/counters",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((counter) => ({
                type: COUNTER_TAG,
                id: counter.id,
              })),
              { type: COUNTER_TAG, id: "LIST" },
            ]
          : [{ type: COUNTER_TAG, id: "LIST" }],
    }),

    addCounter: builder.mutation<ICounter, ICounterForm>({
      query: (body) => ({
        url: "/counters",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: COUNTER_TAG, id: "LIST" }],
    }),

    updateCounter: builder.mutation<ICounter, { id: string; body: Partial<ICounterForm> }>({
      query: ({ id, body }) => ({
        url: `/counters/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: COUNTER_TAG, id },
        { type: COUNTER_TAG, id: "LIST" },
      ],
    }),

    deleteCounter: builder.mutation<void, string>({
      query: (id) => ({
        url: `/counters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: COUNTER_TAG, id },
        { type: COUNTER_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchCountersQuery,
  useAddCounterMutation,
  useUpdateCounterMutation,
  useDeleteCounterMutation,
} = counterApi;
