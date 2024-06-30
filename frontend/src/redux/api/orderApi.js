import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({ 
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  tagTypes: ['Order', 'AdminOrders'],
  endpoints: builder => ({
    createNewOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/new',
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
    }),
    myOrders: builder.query({
      query: () => ({
        url: '/me/orders',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/me/order/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['Order']
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
    }),
    getAdminOrders: builder.query({
      query: () => ({
        url: '/admin/orders',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['AdminOrders']
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/orders/${id}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['Order']
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/orders/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['AdminOrders']
    }),
  })
})

export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = orderApi