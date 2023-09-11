// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './toolkitQuery/ApiCalls';
import authReducer from './slices/auth';
// import homeApi from './homeApi/homeApi';
import { homeApi } from './homeApi/homeApi';
import { dashboardApi } from './dashboard/dashboardApi';
import { userManagement } from './userManagement/userManagementApi';
import { reporting } from './reporting/reportingApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userManagement.reducerPath]: userManagement.reducer,
    [reporting.reducerPath]: reporting.reducer,
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      homeApi.middleware,
      dashboardApi.middleware,
      userManagement.middleware,
      reporting.middleware
    )
});
