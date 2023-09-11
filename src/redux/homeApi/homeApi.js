// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.131:3333/',
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
        body: payload,
      }),
    }),
    globalSettingsGet: builder.query({
      query: () => ({
        url: 'global/globalSettings',
        method: 'get',
        // body: payload
      }),
    }),
  }),
});

export const { useGlobalSettingsMutation, useGlobalSettingsGetQuery } = homeApi;
