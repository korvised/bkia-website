import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-base-query.ts";
import {
  AIRLINE_TAG,
  COUNTER_TAG,
  FLIGHT_TAG,
  ROUTE_TAG,
  USER_TAG,
} from "@/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [AIRLINE_TAG, COUNTER_TAG, FLIGHT_TAG, ROUTE_TAG, USER_TAG],
});
