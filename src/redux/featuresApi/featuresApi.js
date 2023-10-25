import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const featuresApi = createApi({
  reducerPath: 'features',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // baseUrl: 'http://127.0.0.1:3333/',
  }),
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: () => ({
        url: 'features',
        method: 'GET',
      }),
      providesTags: ['Features'],
    }),

    addFeature: builder.mutation({
      query: (feature) => ({
        url: 'features',
        method: 'POST',
        body: feature,
      }),
      invalidatesTags: ['Features'],
    }),

    updateFeature: builder.mutation({
      query: (payload) => ({
        url: `features/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Features'],
    }),

    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `features/${id}`,
        method: 'DELETE',
      }),
    }),
    invalidatesTags: ['Features'],
  }),
});

export const { useGetFeaturesQuery, useAddFeatureMutation, useUpdateFeatureMutation, useDeleteFeatureMutation } =
  featuresApi;
export { featuresApi };
