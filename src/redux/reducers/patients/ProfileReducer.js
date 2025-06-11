import { createSlice } from '@reduxjs/toolkit';
import { 
    GetProfileAction, 
    UpdateMyProfileAction, 
    CreateProfileAction 
} from '../../actions/patients/profileAction';

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        updating: false,
        creating: false,
        profile: {},
        error: null,
        updateSuccess: false,
        createSuccess: false,
        isPatient: false,
    },
    reducers: {
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
        clearCreateSuccess: (state) => {
            state.createSuccess = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        setIsPatient: (state, action) => {
            state.isPatient = action.payload;
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
                state.profile = payload;
                state.error = null;
                // If we successfully get profile data, user is already a patient
                state.isPatient = true;
            })
            .addCase(GetProfileAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                // If getting profile fails (404), user might not be a patient yet
                if (payload?.includes('404') || payload?.includes('not found')) {
                    state.isPatient = false;
                }
            })
            
            // Create Profile Cases
            .addCase(CreateProfileAction.pending, (state) => {
                state.creating = true;
                state.error = null;
                state.createSuccess = false;
            })
            .addCase(CreateProfileAction.fulfilled, (state, { payload }) => {
                state.creating = false;
                state.profile = payload.data || payload;
                state.error = null;
                state.createSuccess = true;
                state.isPatient = true; // Now they are a patient
            })
            .addCase(CreateProfileAction.rejected, (state, { payload }) => {
                state.creating = false;
                state.error = payload;
                state.createSuccess = false;
            })
            
            // Update Profile Cases
            .addCase(UpdateMyProfileAction.pending, (state) => {
                state.updating = true;
                state.error = null;
                state.updateSuccess = false;
            })
            .addCase(UpdateMyProfileAction.fulfilled, (state, { payload }) => {
                state.updating = false;
                state.profile = payload.data || payload;
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

export const { 
    clearUpdateSuccess, 
    clearCreateSuccess, 
    clearError, 
    setIsPatient 
} = profileSlice.actions;

// Export the reducer as default
export default profileSlice.reducer;