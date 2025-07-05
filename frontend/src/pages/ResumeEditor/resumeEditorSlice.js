
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resume: {
    title: '',
    themeColor: '#0d6efd',
    textColor: '#ffffff',
    personal: {
      fullName: '',
      designation: '',
      summary: '',
      email: '',
      phone: '',
      linkedin: '',
      location: '',
      address: '',
      github: '',
      website: '',
      profileImage: '',
      languages: [],
      interests: [],
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  },
  loading: false,
  error: null,
};

const resumeEditorSlice = createSlice({
  name: 'resumeEditor',
  initialState,
  reducers: {
    fetchResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchResumeSuccess: (state, action) => {
      state.resume = action.payload;
      state.loading = false;
    },
    fetchResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateResumeRequest: () => {},
    deleteResumeRequest: () => {},

  
    updateResumeField: (state, action) => {
  const { section, field, value } = action.payload;

  if (section && field) {
   
    state.resume[section] = {
      ...state.resume[section],
      [field]: value,
    };
  } else if (section && value !== undefined) {
    
    state.resume[section] = value;
  } else if (field && value !== undefined) {
    
    state.resume[field] = value;
  }
},


    setResume: (state, action) => {
      state.resume = action.payload;
    },

    deleteResumeSuccess: (state) => {
      state.resume = null;
    },
  },
});

export const {
  fetchResumeRequest,
  fetchResumeSuccess,
  fetchResumeFailure,
  updateResumeRequest,
  deleteResumeRequest,
  updateResumeField,
  setResume,
  deleteResumeSuccess,
} = resumeEditorSlice.actions;

export default resumeEditorSlice.reducer;
