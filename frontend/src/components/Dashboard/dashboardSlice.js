import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { resumes: [], loading: false, error: null },
  reducers: {
    fetchResumesRequest: (state, action) => {
      state.loading = true;
    },
    fetchResumesSuccess: (state, action) => {
      state.resumes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchResumesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.user = null;
      state.resumes = [];
      state.loading = false;
    },
    deleteResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteResumeSuccess: (state, action) => {
      state.loading = false;
      state.resumes = state.resumes.filter((resume) => resume._id !== action.payload);
    },
    deleteResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const { fetchResumesRequest,
  fetchResumesSuccess,
  fetchResumesFailure,
  logoutSuccess,
  deleteResumeRequest,
  deleteResumeSuccess,
  deleteResumeFailure,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
