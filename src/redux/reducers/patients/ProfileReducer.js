import { createSlice } from '@reduxjs/toolkit';
import { GetProfileAction, UpdateMyProfileAction } from '../../actions/patients/profileAction';

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        updating: false,
        profile: {},
        error: null,
        updateSuccess: false,
    },
    reducers: {
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Profile Cases
            .addCase(GetProfileAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetProfileAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.profile = payload; // Instead of payload.data
                state.error = null;
            })
            .addCase(GetProfileAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Update Profile Cases
            .addCase(UpdateMyProfileAction.pending, (state) => {
                state.updating = true;
                state.error = null;
                state.updateSuccess = false;
            })
            .addCase(UpdateMyProfileAction.fulfilled, (state, { payload }) => {
                state.updating = false;
                state.profile = payload.data;
                state.error = null;
                state.updateSuccess = true;
            })
            .addCase(UpdateMyProfileAction.rejected, (state, { payload }) => {
                state.updating = false;
                state.error = payload;
                state.updateSuccess = false;
            });
    },
});

export const { clearUpdateSuccess, clearError } = profileSlice.actions;

// Export the reducer as default
export default profileSlice.reducer;