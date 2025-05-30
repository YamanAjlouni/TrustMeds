import { createSlice } from '@reduxjs/toolkit';
import {
    GetMySurgeriesAction,
    CreateMySurgeryAction,
    UpdateMySurgeryAction,
    DeleteMySurgeryAction
} from '../../actions/patients/surgeriesActions';

const surgerySlice = createSlice({
    name: 'surgeries',
    initialState: {
        mySurgeries: [],
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
        clearSurgeryStatus: (state) => {
            state.createSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get My Surgeries
            .addCase(GetMySurgeriesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMySurgeriesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.mySurgeries = action.payload;
                state.hasLoadedOnce = true;
            })
            .addCase(GetMySurgeriesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Surgery
            .addCase(CreateMySurgeryAction.pending, (state) => {
                state.creating = true;
                state.createSuccess = false;
                state.error = null;
            })
            .addCase(CreateMySurgeryAction.fulfilled, (state, action) => {
                state.creating = false;
                state.createSuccess = true;
                state.mySurgeries.push(action.payload);
            })
            .addCase(CreateMySurgeryAction.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
            })

            // Update Surgery
            .addCase(UpdateMySurgeryAction.pending, (state) => {
                state.updating = true;
                state.updateSuccess = false;
                state.error = null;
            })
            .addCase(UpdateMySurgeryAction.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = true;
                const index = state.mySurgeries.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.mySurgeries[index] = action.payload;
                }
            })
            .addCase(UpdateMySurgeryAction.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
            })

            // Delete Surgery
            .addCase(DeleteMySurgeryAction.pending, (state) => {
                state.deleting = true;
                state.deleteSuccess = false;
                state.error = null;
            })
            .addCase(DeleteMySurgeryAction.fulfilled, (state, action) => {
                state.deleting = false;
                state.deleteSuccess = true;
                state.mySurgeries = state.mySurgeries.filter(item => item.id !== action.payload);
            })
            .addCase(DeleteMySurgeryAction.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            });
    },
});

export const { clearSurgeryStatus } = surgerySlice.actions;
export default surgerySlice.reducer;