import { apiSlice } from "@/redux";
import { ROUTE_TAG } from "@/constants";
import { cleanParams } from "@/lib";
import type { IRoute, IRouteFilter } from "@/features/route/types";

const routeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoutes: builder.query<IRoute[], IRouteFilter>({
      query: (params) => ({
        url: "/routes",
        method: "GET",
        params: cleanParams({ isActive: true, ...params }),
      }),
      providesTags: (routes) =>
        routes?.length
          ? [
              ...routes.map((route) => ({
                type: ROUTE_TAG,
                id: route.id,
              })),
              { type: ROUTE_TAG, id: "LIST" },
            ]
          : [{ type: ROUTE_TAG, id: "LIST" }],
    }),
  }),
});

export const { useFetchRoutesQuery } = routeApi;
