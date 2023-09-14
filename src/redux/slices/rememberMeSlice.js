import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const remember = createSlice({
  name: "remember",
  initialState: {
    remember:false
  },
  reducers: {
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
  },
});


export const { setRemember, } = remember.actions;

export const getRemember = (state) => state.remember;

export default remember.reducer;