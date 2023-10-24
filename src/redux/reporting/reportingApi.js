// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reporting = createApi({
  reducerPath: 'reportingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://wendi-dating.com/',
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

    reportingApi: builder.query({
      query: () => ({
        url: 'user/reporting',
        method: 'get',
        // body: payload
      }),
    }),
    // home: builder.mutation({
    //   query: (payload) => ({
    //       url: 'user/home',
    //       method: 'POST',
    //       body: payload
    //   }),
    //   }),
  }),
});

export const { useUserManagementQuery } = reporting;
