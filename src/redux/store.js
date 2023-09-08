// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './slice/ApiCalls';



export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
