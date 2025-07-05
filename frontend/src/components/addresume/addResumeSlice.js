import {createSlice} from '@reduxjs/toolkit';

const addResumeSlice = createSlice({
    name:'addResume',
    initialState:{
        loading:false,
        error:null,
    },
    reducers:{
        addResumeRequest:(state) => {
            state.loading = true;
            state.error = null;
        },
        addResumeSuccess:(state) => {
            state.loading = false;
        },
        addResumeFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {addResumeRequest,addResumeSuccess,addResumeFailure} = addResumeSlice.actions;
export default addResumeSlice.reducer;