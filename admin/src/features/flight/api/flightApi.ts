import { apiSlice } from "@/redux";
import { FLIGHT_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  IFlight,
  IFlightResponse,
  IFlightFilter,
} from "@/features/flight/types";

const flightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFlights: builder.query<IFlightResponse, IFlightFilter>({
      query: (params) => ({
        url: "/flights",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((flight) => ({
                type: FLIGHT_TAG,
                id: flight.id,
              })),
              { type: FLIGHT_TAG, id: "LIST" },
            ]
          : [{ type: FLIGHT_TAG, id: "LIST" }],
    }),

    addFlight: builder.mutation<IFlight, Record<string, unknown>>({
      query: (body) => ({
        url: "/flights",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: FLIGHT_TAG, id: "LIST" }],
    }),

    updateFlight: builder.mutation<
      IFlight,
      { id: string; body: Record<string, unknown> }
    >({
      query: ({ id, body }) => ({
        url: `/flights/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: FLIGHT_TAG, id }],
    }),

    deleteFlight: builder.mutation<void, string>({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: FLIGHT_TAG, id },
        { type: FLIGHT_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchFlightsQuery,
  useAddFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} = flightApi;
