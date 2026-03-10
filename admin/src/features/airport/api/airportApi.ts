import { apiSlice } from "@/redux";
import { AIRPORT_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { IAirport, IAirportFilter, IAirportForm } from "@/features/airport/types";

const airportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAirports: builder.query<IAirport[], IAirportFilter>({
      query: (params) => ({
        url: "/airports",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((airport) => ({
                type: AIRPORT_TAG,
                id: airport.id,
              })),
              { type: AIRPORT_TAG, id: "LIST" },
            ]
          : [{ type: AIRPORT_TAG, id: "LIST" }],
    }),

    addAirport: builder.mutation<IAirport, IAirportForm>({
      query: (body) => ({
        url: "/airports",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: AIRPORT_TAG, id: "LIST" }],
    }),

    updateAirport: builder.mutation<IAirport, { id: string; body: Partial<IAirportForm> }>({
      query: ({ id, body }) => ({
        url: `/airports/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: AIRPORT_TAG, id },
        { type: AIRPORT_TAG, id: "LIST" },
      ],
    }),

    deleteAirport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/airports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: AIRPORT_TAG, id },
        { type: AIRPORT_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchAirportsQuery,
  useAddAirportMutation,
  useUpdateAirportMutation,
  useDeleteAirportMutation,
} = airportApi;
