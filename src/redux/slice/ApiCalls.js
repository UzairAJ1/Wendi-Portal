// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'localhost:3333' }), // Replace with your API base URL
  endpoints: (builder) => ({
    // Define your API endpoints here
    getDummyData: builder.query({
      query: () => '/login',
    }),
  }),
});

export const { useGetDummyDataQuery } = api;

