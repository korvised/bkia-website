import { apiSlice } from "@/redux";
import { FLIGHT_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type {
  IFlight,
  IFlightResponse,
  IFlightFilter,
  IBulkCreateFlightPayload,
  IUpdateFlightPayload,
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

    fetchFlightById: builder.query<IFlight, string>({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: FLIGHT_TAG, id }],
    }),

    bulkCreateFlights: builder.mutation<IFlight[], IBulkCreateFlightPayload>({
      query: (body) => ({
        url: "/flights/bulk",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: FLIGHT_TAG, id: "LIST" }],
    }),

    updateFlight: builder.mutation<
      IFlight,
      { id: string; body: IUpdateFlightPayload }
    >({
      query: ({ id, body }) => ({
        url: `/flights/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: FLIGHT_TAG, id },
        { type: FLIGHT_TAG, id: "LIST" },
      ],
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
  useFetchFlightByIdQuery,
  useBulkCreateFlightsMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} = flightApi;
