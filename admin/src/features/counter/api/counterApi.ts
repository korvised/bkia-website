import { apiSlice } from "@/redux";
import { ROUTE_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { ICounter, ICounterFilter } from "@/features/counter/types";

const counterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCounters: builder.query<ICounter[], ICounterFilter>({
      query: (params) => ({
        url: "/counters",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (counters) =>
        counters?.length
          ? [
              ...counters.map((counter) => ({
                type: ROUTE_TAG,
                id: counter.id,
              })),
              { type: ROUTE_TAG, id: "LIST" },
            ]
          : [{ type: ROUTE_TAG, id: "LIST" }],
    }),
  }),
});

export const { useFetchCountersQuery } = counterApi;
