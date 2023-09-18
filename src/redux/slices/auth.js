import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const auth = createSlice({
  name: "auth",
  initialState: {
    userData:null,
    primaryData : null
  },

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setPrimaryUser: (state,action) =>{
      state.primaryData = action.payload;
    }
  },
});


export const { setUser, login, logout,setPrimaryUser } = auth.actions;

export const getAuth = (state) => state.auth;

export default auth.reducer;