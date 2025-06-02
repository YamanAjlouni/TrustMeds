import { createSlice } from '@reduxjs/toolkit';
import {
    GetMyDoctorsAction,
} from '../../actions/patients/doctorsActions';

const doctorSlice = createSlice({
    name: 'doctors',
    initialState: {
        myDoctors: [],
        loading: false,
        adding: false,
        updating: false,
        removing: false,
        error: null,
        addSuccess: false,
        updateSuccess: false,
        removeSuccess: false,
        hasLoadedOnce: false, // Track if we've loaded data at least once
    },
    reducers: {
        clearDoctorStatus: (state) => {
            state.addSuccess = false;
            state.updateSuccess = false;
            state.removeSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get My Doctors
            .addCase(GetMyDoctorsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMyDoctorsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myDoctors = action.payload;
                state.hasLoadedOnce = true;
            })
            .addCase(GetMyDoctorsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearDoctorStatus } = doctorSlice.actions;
export default doctorSlice.reducer;