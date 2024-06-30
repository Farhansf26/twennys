import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { orderApi } from './api/orderApi'
import { productApi } from './api/productApi'
import { userApi } from './api/userApi'
import cartSlice from './slices/cartSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: userSlice,
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(
      productApi.middleware, 
      authApi.middleware, 
      userApi.middleware, 
      orderApi.middleware
      )
})