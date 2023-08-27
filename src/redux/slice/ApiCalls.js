import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isError } from 'lodash';

// Action
export const fetchApi = createAsyncThunk('fetchApi', async (payload) => {
  console.log('DATA IN REDUX PAYLOAD ================', payload);
  const response = await fetch('');
  return response.json();
});

const ApiCalls = createSlice({
  name: 'ApiCalls',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchApi.pending, (state, action) => {
      state.isLoading = true;
    }).addCase(fetchApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }).addCase(fetchApi.rejected, (state, action) => {
      console.log('error', action.payload);
    state.isLoading = false
    });
  },
});

export default ApiCalls.reducer;
