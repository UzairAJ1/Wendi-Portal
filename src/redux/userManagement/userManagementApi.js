// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userManagement = createApi({
  reducerPath: 'userManagement',
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
    userManagement: builder.query({
      query: () => ({
        url: 'user/userDetails',
        method: 'get',
      }),
    }),

    getUsers: builder.query({
      query: () => 'user/getUsers',
    }),

    getUserById: builder.query({
      query: (id) => `user/getUser/${id}`,
    }),
  }),
});

export const { useUserManagementQuery, useGetUsersQuery, useGetUserByIdQuery } = userManagement;
