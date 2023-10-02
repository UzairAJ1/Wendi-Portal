// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.18.131:3333/',
    // baseUrl: 'http://127.0.0.1:3333/',
      //  baseUrl: 'https://3cb2-206-84-191-58.ngrok-free.app',
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
    globalSettingsGet: builder.query({
      query: () => ({
        url: 'global/globalSettings',
        method: 'get',
      }),
      providesTags: ['Settings'],
    }),

    globalSettings: builder.mutation({
      query: (payload) => ({
        url: 'global/globalSettings',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGlobalSettingsMutation, useGlobalSettingsGetQuery } = homeApi;
