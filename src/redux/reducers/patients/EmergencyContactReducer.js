import { createSlice } from '@reduxjs/toolkit';
import { 
    GetEmergencyContactAction, 
    CreateEmergencyContactAction,
    UpdateEmergencyContactAction, 
    DeleteEmergencyContactAction 
} from '../../actions/patients/emergencyContactAction';

export const emergencyContactSlice = createSlice({
    name: "emergencyContact",
    initialState: {
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        contacts: [],
        error: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    },
    reducers: {
        clearCreateSuccess: (state) => {
            state.createSuccess = false;
        },
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
        clearDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Emergency Contacts Cases
            .addCase(GetEmergencyContactAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetEmergencyContactAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                // Since API returns single object, convert to array for consistency
                if (payload && payload.id) {
                    state.contacts = [payload]; // ✅ Fixed: payload is the data, not payload.data
                } else {
                    state.contacts = [];
                }
                state.error = null;
            })
            .addCase(GetEmergencyContactAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.contacts = [];
            })
            // Create Emergency Contact Cases
            .addCase(CreateEmergencyContactAction.pending, (state) => {
                state.creating = true;
                state.error = null;
                state.createSuccess = false;
            })
            .addCase(CreateEmergencyContactAction.fulfilled, (state, { payload }) => {
                state.creating = false;
                
                // Handle the response - could be payload or payload.data
                const newContact = payload.data || payload;
                
                // Add to contacts array
                if (Array.isArray(state.contacts)) {
                    state.contacts.push(newContact);
                } else {
                    state.contacts = [newContact];
                }
                
                state.error = null;
                state.createSuccess = true;
            })
            .addCase(CreateEmergencyContactAction.rejected, (state, { payload }) => {
                state.creating = false;
                state.error = payload;
                state.createSuccess = false;
            })
            // Update Emergency Contact Cases
            .addCase(UpdateEmergencyContactAction.pending, (state) => {
                state.updating = true;
                state.error = null;
                state.updateSuccess = false;
            })
            .addCase(UpdateEmergencyContactAction.fulfilled, (state, { payload }) => {
                state.updating = false;
                
                // Handle the response - could be payload or payload.data
                const updatedContact = payload.data || payload;
                
                if (Array.isArray(state.contacts)) {
                    const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
                    if (index !== -1) {
                        state.contacts[index] = updatedContact;
                    }
                } else {
                    state.contacts = [updatedContact];
                }
                
                state.error = null;
                state.updateSuccess = true;
            })
            .addCase(UpdateEmergencyContactAction.rejected, (state, { payload }) => {
                state.updating = false;
                state.error = payload;
                state.updateSuccess = false;
            })
            // Delete Emergency Contact Cases
            .addCase(DeleteEmergencyContactAction.pending, (state) => {
                state.deleting = true;
                state.error = null;
                state.deleteSuccess = false;
            })
            .addCase(DeleteEmergencyContactAction.fulfilled, (state, { payload }) => {
                state.deleting = false;
                
                if (Array.isArray(state.contacts)) {
                    state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
                } else {
                    state.contacts = [];
                }
                
                state.error = null;
                state.deleteSuccess = true;
            })
            .addCase(DeleteEmergencyContactAction.rejected, (state, { payload }) => {
                state.deleting = false;
                state.error = payload;
                state.deleteSuccess = false;
            });
    },
});

export const { 
    clearCreateSuccess, 
    clearUpdateSuccess, 
    clearDeleteSuccess, 
    clearError 
} = emergencyContactSlice.actions;

// Export the reducer as default
export default emergencyContactSlice.reducer;