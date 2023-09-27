// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { useParams } from 'react-router-dom';

// const { _id } = useParams();

export const userManagement = createApi({
  reducerPath: 'userManagement',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.18.131:3333/',
    baseUrl: 'http://127.0.0.1:3333/',
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
      query: ({ _id }) => `user/getUser/${_id}`,
    }),

    setUserById: builder.mutation({
      query: (payload) => ({
        url: `user/updateUser/${payload._id}`,
        method: 'POST',
        body: payload?.preparedData,
      }),
    }),
    // setUserById: builder.mutation({
    //   query: ({ payload, _id }) => ({
    //     url: `user/updateUser/${_id}`,
    //     method: 'POST',
    //     body: payload
    //   }),
    // }),
  }),
});

export const { useUserManagementQuery, useGetUsersQuery, useGetUserByIdQuery, useSetUserByIdMutation } = userManagement;
