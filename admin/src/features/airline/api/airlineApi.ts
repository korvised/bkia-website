import { apiSlice } from "@/redux";
import { AIRLINE_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { IAirline, IAirlineFilter, IAirlineResponse } from "@/features/airline/types";

const airlineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAirlines: builder.query<IAirlineResponse, IAirlineFilter>({
      query: (params) => ({
        url: "/airlines",
        method: "GET",
        params: cleanParams(params),
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

    fetchAirlineById: builder.query<IAirline, string>({
      query: (id) => ({
        url: `/airlines/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: AIRLINE_TAG, id }],
    }),

    addAirline: builder.mutation<IAirline, FormData>({
      query: (body) => ({
        url: "/airlines",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: AIRLINE_TAG, id: "LIST" }],
    }),

    updateAirline: builder.mutation<IAirline, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/airlines/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: AIRLINE_TAG, id },
        { type: AIRLINE_TAG, id: "LIST" },
      ],
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

    activateAirline: builder.mutation<IAirline, string>({
      query: (id) => ({
        url: `/airlines/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: AIRLINE_TAG, id },
        { type: AIRLINE_TAG, id: "LIST" },
      ],
    }),

    deactivateAirline: builder.mutation<IAirline, string>({
      query: (id) => ({
        url: `/airlines/${id}/deactivate`,
        method: "PATCH",
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
  useFetchAirlineByIdQuery,
  useAddAirlineMutation,
  useUpdateAirlineMutation,
  useDeleteAirlineMutation,
  useActivateAirlineMutation,
  useDeactivateAirlineMutation,
} = airlineApi;
