// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './toolkitQuery/ApiCalls';
import authReducer from './slices/auth';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
