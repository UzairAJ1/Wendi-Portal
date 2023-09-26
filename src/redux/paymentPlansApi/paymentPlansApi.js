import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentPlansApi = createApi({
  reducerPath: 'paymentPlans',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.131:3333/',
  }),
  endpoints: (builder) => ({
    getPaymentPlans: builder.query({
      query: () => ({
        url: 'paymentPlans',
        method: 'GET',
      }),
      providesTags: [],
    }),

    addPaymentPlan: builder.mutation({
      query: (paymentPlan) => ({
        url: 'paymentPlans',
        method: 'POST',
        body: paymentPlan,
      }),
      invalidatesTags: [],
    }),

    updatePaymentPlan: builder.mutation({
      query: (payload) => ({
        url: `paymentPlans/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: [],
    }),

    deletePaymentPlan: builder.mutation({
      query: (id) => ({
        url: `paymentPlans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetPaymentPlansQuery,
  useAddPaymentPlanMutation,
  useUpdatePaymentPlanMutation,
  useDeletePaymentPlanMutation,
} = paymentPlansApi;

export { paymentPlansApi };
