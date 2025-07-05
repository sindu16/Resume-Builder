import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { 
  registerRequest, 
  registerSuccess, 
  registerFailure, 
  resetRegisterState 
} = signupSlice.actions;

export default signupSlice.reducer;