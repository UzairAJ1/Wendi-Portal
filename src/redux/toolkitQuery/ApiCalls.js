// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
      baseUrl: "http://192.168.18.122:3333/",
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

    getDummyData: builder.query({
      query: () => 'dummy',
    }),

    login: builder.mutation({
      query: (payload) => ({
          url: 'user/login',
          method: 'POST',
          body: payload
      }),
      }),
  }),
});

export const { useGetDummyDataQuery,useLoginMutation } = authApi;
