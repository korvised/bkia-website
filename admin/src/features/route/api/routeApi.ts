import { apiSlice } from "@/redux";
import { ROUTE_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { IRoute, IRouteFilter, IRouteForm } from "@/features/route/types";

const routeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoutes: builder.query<IRoute[], IRouteFilter>({
      query: (params) => ({
        url: "/routes",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((route) => ({ type: ROUTE_TAG, id: route.id })),
              { type: ROUTE_TAG, id: "LIST" },
            ]
          : [{ type: ROUTE_TAG, id: "LIST" }],
    }),

    addRoute: builder.mutation<IRoute, Omit<IRouteForm, "isActive">>({
      query: (body) => ({
        url: "/routes",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: ROUTE_TAG, id: "LIST" }],
    }),

    updateRoute: builder.mutation<IRoute, { id: string; body: Partial<IRouteForm> }>({
      query: ({ id, body }) => ({
        url: `/routes/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: ROUTE_TAG, id },
        { type: ROUTE_TAG, id: "LIST" },
      ],
    }),

    deleteRoute: builder.mutation<void, string>({
      query: (id) => ({
        url: `/routes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: ROUTE_TAG, id },
        { type: ROUTE_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchRoutesQuery,
  useAddRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routeApi;
