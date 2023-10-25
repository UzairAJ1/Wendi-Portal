// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
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
    activeUsersStats: builder.query({
      query: () => ({
        url: 'user/activeUsersStats',
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
      query: () => ({
        url: 'user/usersStats',
        method: 'get',
      }),
    }),

    getLikesStatistics: builder.query({
      query: () => ({
        url: 'like/likesStats',
        method: 'get',
      }),
    }),

    getUserByTime: builder.query({
      query: () => ({
        url: 'user/filterUserByTime',
        method: 'get',
      }), // This should be a correct API endpoint URL
    }),

    getLikesByTime: builder.query({
      query: () => ({
        url: 'like/filterLikesByTime',
        method: 'get',
      }),
    }),

    getUsersByMonth: builder.query({
      query: () => ({
        url: 'user/usersByMonths',
        method: 'get',
      }),
    }),
  }),
});

export const {
  useDashboardMainMutation,
  useStatisticsQuery,
  useDailyLikesQuery,
  useMonthlyLikesQuery,
  useActiveUsersStatsQuery,
  useMonthlyActiveUsersQuery,
  useGenderDistributionQuery,
  useGetUserStatisticsQuery,
  useGetLikesStatisticsQuery,
  useGetUserByTimeQuery,
  useGetLikesByTimeQuery,
  useGetUsersByMonthQuery,
} = dashboardApi;
