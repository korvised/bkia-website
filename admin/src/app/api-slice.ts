import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios-base-query.ts';
import { USER_TAG } from '@/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [USER_TAG]
});
