// features/allergies/allergyReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { CreateMyAllergyAction, DeleteMyAllergyAction, GetALLAllergiesAction, GetMyAllergiesAction, UpdateMyAllergyAction } from '../../actions/patients/allergiesActions';

const allergySlice = createSlice({
    name: 'allergies',
    initialState: {
        allAllergies: [],
        myAllergies: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // All Allergies
            .addCase(GetALLAllergiesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetALLAllergiesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.allAllergies = action.payload;
            })
            .addCase(GetALLAllergiesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // My Allergies
            .addCase(GetMyAllergiesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetMyAllergiesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myAllergies = action.payload;
            })
            .addCase(GetMyAllergiesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Allergy
            .addCase(CreateMyAllergyAction.fulfilled, (state, action) => {
                state.myAllergies.push(action.payload);
            })

            // Update Allergy
            .addCase(UpdateMyAllergyAction.fulfilled, (state, action) => {
                const index = state.myAllergies.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.myAllergies[index] = action.payload;
                }
            })

            // Delete Allergy
            .addCase(DeleteMyAllergyAction.fulfilled, (state, action) => {
                state.myAllergies = state.myAllergies.filter(item => item.id !== action.payload);
            });
    },
});

export default allergySlice.reducer;
