import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../slices/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  endpoints: builder => ({
    getMe: builder.query({
      query: () => ({
        url: '/me',
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
      }),
      transformResponse: (response) => {
        return response.user
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
          dispatch(setIsAuthenticated(true))
        } catch (error) {
          console.log(error)
        } 
      }
    }),
    getAdminUsers: builder.query({
      query: () => ({
        url: '/admin/users',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['AdminUsers']
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      providesTags: ['AdminUser']
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['AdminUsers']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }),
      invalidatesTags: ['AdminUsers']
    }),
  })
})

export const {
  useLazyGetMeQuery,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi