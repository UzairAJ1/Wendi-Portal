// persit
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// end
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './toolkitQuery/ApiCalls';
import authReducer from './slices/auth';

// import homeApi from './homeApi/homeApi';
import { homeApi } from './homeApi/homeApi';
import { dashboardApi } from './dashboard/dashboardApi';
import { userManagement } from './userManagement/userManagementApi';
import { reporting } from './reporting/reportingApi';
import rememberMeSlice from './slices/rememberMeSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userData'],
};

const persistRememberConfig = {
  key: 'remember',
  storage,
  whitelist: ['remember'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistedRememberReducer = persistReducer(persistRememberConfig, rememberMeSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    remember: persistedRememberReducer,
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
    ),
});

export const persistor = persistStore(store);
