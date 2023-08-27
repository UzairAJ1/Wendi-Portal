import { configureStore } from '@reduxjs/toolkit';
import ApiCalls from './slice/ApiCalls'

export const store = configureStore({
  reducer: {
        Apicall: ApiCalls,
  },
})