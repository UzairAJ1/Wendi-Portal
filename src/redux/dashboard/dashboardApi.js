// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/',
    // baseUrl: 'http://127.0.0.1:3333/',
    prepareHeaders: (headers, { getState }) => {
      // @ts-ignore
      // const token = getCoo('token');
      // if (token) {
      //     headers.set('authorization', `Bearer ${token}`);
      // }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Define your API endpoints here

    dashboardMain: builder.mutation({
      query: (payload) => ({
        url: 'global/globalSettings',
        method: 'POST',
        body: payload,
      }),
    }),
    statistics: builder.query({
      query: () => ({
        url: 'user/home',
        method: 'get',
        // body: payload
      }),
    }),
    dailyLikes: builder.query({
      query: () => ({
        url: 'user/home',
        method: 'get',
        // body: payload
      }),
    }),
    monthlyLikes: builder.query({
      query: () => ({
        url: 'user/home',
        method: 'get',
        // body: payload
      }),
    }),
    dailyActiveUsers: builder.query({
      query: () => ({
        url: 'user/home',
        method: 'get',
        // body: payload
      }),
    }),
    monthlyActiveUsers: builder.query({
      query: () => ({
        url: 'user/home',
        method: 'get',
        // body: payload
      }),
    }),
    genderDistribution: builder.query({
      query: () => ({
        url: 'user/genderDistribution',
        method: 'get',
        // body: payload
      }),
    }),

    getUserStatistics: builder.query({
      query: () => 'user/usersStats',
    }),

    getLikesStatistics: builder.query({
      query: () => 'like/likesStats',
    }),
  }),
});

export const {
  useDashboardMainMutation,
  useStatisticsQuery,
  useDailyLikesQuery,
  useMonthlyLikesQuery,
  useDailyActiveUsersQuery,
  useMonthlyActiveUsersQuery,
  useGenderDistributionQuery,
  useGetUserStatisticsQuery,
  useGetLikesStatisticsQuery,
} = dashboardApi;
