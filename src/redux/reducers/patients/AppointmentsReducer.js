import { createSlice } from '@reduxjs/toolkit';
import {
    GetMyAppointmentsAction,
} from '../../actions/patients/appointmentsActions';

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        myAppointments: [],
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        error: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
        hasLoadedOnce: false, // Track if we've loaded data at least once
    },
    reducers: {
        clearAppointmentStatus: (state) => {
            state.createSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get My Appointments
            .addCase(GetMyAppointmentsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMyAppointmentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myAppointments = action.payload;
                state.hasLoadedOnce = true;
            })
            .addCase(GetMyAppointmentsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearAppointmentStatus } = appointmentSlice.actions;
export default appointmentSlice.reducer;