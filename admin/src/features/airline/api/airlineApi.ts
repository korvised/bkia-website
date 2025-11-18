import { apiSlice } from "@/redux";
import type { IAirline, IAirlineResponse } from "@/features/airline/types";
import { AIRLINE_TAG } from "@/constants";

const airlineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAirlines: builder.query<IAirlineResponse, void>({
      query: () => ({
        url: "/airlines",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((airline) => ({
                type: AIRLINE_TAG,
                id: airline.id,
              })),
              { type: AIRLINE_TAG, id: "LIST" },
            ]
          : [{ type: AIRLINE_TAG, id: "LIST" }],
    }),

    addAirline: builder.mutation<IAirline, Record<string, string>>({
      query: (body) => ({
        url: "/airlines",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: AIRLINE_TAG, id: "LIST" }],
    }),

    updateAirline: builder.mutation<
      IAirline,
      { id: string; body: Record<string, string> }
    >({
      query: ({ id, body }) => ({
        url: `/airlines/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: AIRLINE_TAG, id }],
    }),

    deleteAirline: builder.mutation<void, string>({
      query: (id) => ({
        url: `/airlines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: AIRLINE_TAG, id },
        { type: AIRLINE_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchAirlinesQuery,
  useAddAirlineMutation,
  useUpdateAirlineMutation,
  useDeleteAirlineMutation,
} = airlineApi;
