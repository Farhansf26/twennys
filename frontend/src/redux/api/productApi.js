import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  tagTypes: ['Product', 'AdminProducts', 'Reviews'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        params: {
          page: params.page,
          keyword: params.keyword,
          category: params.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[lte]": params.ratings,
        }
      })
    }),
    getProductDetail: builder.query({
      query: (id) => ({
        url: `/products/${id}`
      }),
      providesTags: ['Product']
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: '/reviews',
        method: 'PUT',
        body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['Product']
    }),
    canUserReview: builder.query({
      query: (productId) => ({
        url: `/can_review/?productId=${productId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
    }),
    getAdminProducts: builder.query({
      query: () => ({
        url: '/admin/products',
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['AdminProducts']
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}`,
        method: 'PATCH',
        body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['AdminProducts', 'Product']
    }),
    getProductReviews: builder.query({
      query: (id) => ({
        url: `/reviews?id=${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['Reviews']
    }),
    deleteReview: builder.mutation({
      query: ({ id, productId }) => ({
        url: `/admin/reviews?productId=${productId}&id=${id}`,
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['Reviews']
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useUpdateProductMutation,
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery
} = productApi