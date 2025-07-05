import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    openAuthModel:false,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        openAuthModel:(state,action) => {
            state.openAuthModel = action.payload;
        },
    },
});

export const {openAuthModel} = authSlice.actions;
export default authSlice.reducer;