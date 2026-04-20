import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-base-query.ts";
import {
  AIRLINE_TAG,
  AIRPORT_TAG,
  AUCTION_TAG,
  BANNER_TAG,
  CAREER_ACTIVITIES_TAG,
  CAREERS_TAG,
  COUNTER_TAG,
  FEEDBACK_TAG,
  FLIGHT_TAG,
  LOST_FOUND_TAG,
  NEWS_TAG,
  NOTICE_TAG,
  PERMISSION_TAG,
  ROLE_TAG,
  ROUTE_TAG,
  USER_TAG,
} from "@/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [AIRLINE_TAG, AIRPORT_TAG, AUCTION_TAG, BANNER_TAG, CAREER_ACTIVITIES_TAG, CAREERS_TAG, COUNTER_TAG, FEEDBACK_TAG, FLIGHT_TAG, LOST_FOUND_TAG, NEWS_TAG, NOTICE_TAG, ROUTE_TAG, USER_TAG, ROLE_TAG, PERMISSION_TAG],
});
