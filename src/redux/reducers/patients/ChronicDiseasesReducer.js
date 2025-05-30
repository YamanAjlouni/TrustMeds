import { createSlice } from '@reduxjs/toolkit';
import {
    GetMyChronicDiseasesAction,
    CreateMyChronicDiseaseAction,
    UpdateMyChronicDiseaseAction,
    DeleteMyChronicDiseaseAction
} from '../../actions/patients/chronicDiseasesActions';

const chronicDiseaseSlice = createSlice({
    name: 'chronicDiseases',
    initialState: {
        myChronicDiseases: [],
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
        clearChronicDiseaseStatus: (state) => {
            state.createSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get My Chronic Diseases
            .addCase(GetMyChronicDiseasesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMyChronicDiseasesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myChronicDiseases = action.payload;
                state.hasLoadedOnce = true;
            })
            .addCase(GetMyChronicDiseasesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Chronic Disease
            .addCase(CreateMyChronicDiseaseAction.pending, (state) => {
                state.creating = true;
                state.createSuccess = false;
                state.error = null;
            })
            .addCase(CreateMyChronicDiseaseAction.fulfilled, (state, action) => {
                state.creating = false;
                state.createSuccess = true;
                state.myChronicDiseases.push(action.payload);
            })
            .addCase(CreateMyChronicDiseaseAction.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
            })

            // Update Chronic Disease
            .addCase(UpdateMyChronicDiseaseAction.pending, (state) => {
                state.updating = true;
                state.updateSuccess = false;
                state.error = null;
            })
            .addCase(UpdateMyChronicDiseaseAction.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = true;
                const index = state.myChronicDiseases.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.myChronicDiseases[index] = action.payload;
                }
            })
            .addCase(UpdateMyChronicDiseaseAction.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
            })

            // Delete Chronic Disease
            .addCase(DeleteMyChronicDiseaseAction.pending, (state) => {
                state.deleting = true;
                state.deleteSuccess = false;
                state.error = null;
            })
            .addCase(DeleteMyChronicDiseaseAction.fulfilled, (state, action) => {
                state.deleting = false;
                state.deleteSuccess = true;
                state.myChronicDiseases = state.myChronicDiseases.filter(item => item.id !== action.payload);
            })
            .addCase(DeleteMyChronicDiseaseAction.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            });
    },
});

export const { clearChronicDiseaseStatus } = chronicDiseaseSlice.actions;
export default chronicDiseaseSlice.reducer;