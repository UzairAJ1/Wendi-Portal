import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";

export const auth = createSlice({
  name: "auth",
  initialState: {
    userData:null
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser } = auth.actions;

export const getAuth = (state) => state.auth;

export default auth.reducer;