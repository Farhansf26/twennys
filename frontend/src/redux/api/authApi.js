import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      }),
      transformResponse: (response) => {
        localStorage.setItem('token', response.token);
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }){
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getMe.initiate())
        } catch (error) {
          console.log(error);
        }
      }
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body
      }),
      transformResponse: (response) => {
        localStorage.setItem('token', response.token);
      },
    }),
    logout: builder.query({
      query: () => ({
        url: '/logout',
        method: 'GET'
      },
      localStorage.clear()
      )
    })
  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyLogoutQuery
} = authApi