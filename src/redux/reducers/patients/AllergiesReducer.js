import { createSlice } from '@reduxjs/toolkit';
import { 
    CreateMyAllergyAction, 
    DeleteMyAllergyAction, 
    GetALLAllergiesAction, 
    GetMyAllergiesAction, 
    UpdateMyAllergyAction 
} from '../../actions/patients/allergiesActions';

const allergySlice = createSlice({
    name: 'allergies',
    initialState: {
        allAllergies: [],
        myAllergies: [],
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        error: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
        hasLoadedAllAllergies: false, // Track if we've loaded all allergies
        hasLoadedMyAllergies: false, // Track if we've loaded my allergies
    },
    reducers: {
        clearAllergyStatus: (state) => {
            state.createSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // All Allergies
            .addCase(GetALLAllergiesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetALLAllergiesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.allAllergies = action.payload;
                state.hasLoadedAllAllergies = true;
            })
            .addCase(GetALLAllergiesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // My Allergies
            .addCase(GetMyAllergiesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMyAllergiesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myAllergies = action.payload;
                state.hasLoadedMyAllergies = true;
            })
            .addCase(GetMyAllergiesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Allergy
            .addCase(CreateMyAllergyAction.pending, (state) => {
                state.creating = true;
                state.createSuccess = false;
                state.error = null;
            })
            .addCase(CreateMyAllergyAction.fulfilled, (state, action) => {
                state.creating = false;
                state.createSuccess = true;
                state.myAllergies.push(action.payload);
            })
            .addCase(CreateMyAllergyAction.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
            })

            // Update Allergy
            .addCase(UpdateMyAllergyAction.pending, (state) => {
                state.updating = true;
                state.updateSuccess = false;
                state.error = null;
            })
            .addCase(UpdateMyAllergyAction.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = true;
                const index = state.myAllergies.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.myAllergies[index] = action.payload;
                }
            })
            .addCase(UpdateMyAllergyAction.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
            })

            // Delete Allergy
            .addCase(DeleteMyAllergyAction.pending, (state) => {
                state.deleting = true;
                state.deleteSuccess = false;
                state.error = null;
            })
            .addCase(DeleteMyAllergyAction.fulfilled, (state, action) => {
                state.deleting = false;
                state.deleteSuccess = true;
                state.myAllergies = state.myAllergies.filter(item => item.id !== action.payload);
            })
            .addCase(DeleteMyAllergyAction.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            });
    },
});

export const { clearAllergyStatus } = allergySlice.actions;
export default allergySlice.reducer;