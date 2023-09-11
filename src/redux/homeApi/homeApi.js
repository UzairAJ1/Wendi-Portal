// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
  reducerPath: "homeApi",
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

    globalSettings: builder.mutation({
      query: (payload) => ({
          url: 'global/globalSettings',
          method: 'POST',
          body: payload
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

export const { useGlobalSettingsMutation } = homeApi;
