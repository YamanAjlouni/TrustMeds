import { createSlice } from '@reduxjs/toolkit';
import {
    GetMyMedicationsAction,
    DeleteMyMedicationAction
} from '../../actions/patients/medicationsActions';

// Color palette for medications (will be assigned based on index)
const medicationColors = [
    '#4B9CD3', // Blue
    '#2AAC8A', // Green
    '#F6B93B', // Yellow
    '#975BA5', // Purple
    '#E74C3C', // Red
    '#3498DB', // Light Blue
    '#1ABC9C', // Turquoise
    '#9B59B6', // Violet
    '#F39C12', // Orange
    '#27AE60', // Emerald
];

const medicationSlice = createSlice({
    name: 'medications',
    initialState: {
        myMedications: [],
        loading: false,
        deleting: false,
        error: null,
        deleteSuccess: false,
        hasLoadedOnce: false, // Track if we've loaded data at least once
    },
    reducers: {
        clearMedicationStatus: (state) => {
            state.deleteSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get My Medications
            .addCase(GetMyMedicationsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetMyMedicationsAction.fulfilled, (state, action) => {
                state.loading = false;
                // Process medications and add necessary fields
                state.myMedications = action.payload.map((medication, index) => ({
                    ...medication,
                    // Add color based on index
                    color: medicationColors[index % medicationColors.length],
                    // Add empty fields that will be populated later by backend
                    nameEn: medication.medication_name,
                    nameAr: '', // Will be populated by backend
                    frequencyEn: medication.frequency,
                    frequencyAr: '', // Will be populated by backend
                    instructionsEn: '', // Will be populated by backend
                    instructionsAr: '', // Will be populated by backend
                    doctorEn: '', // Will be populated by backend
                    doctorAr: '', // Will be populated by backend
                    pharmacyEn: '', // Will be populated by backend
                    pharmacyAr: '', // Will be populated by backend
                    // Calculate status based on dates
                    status: medication.end_date && new Date(medication.end_date) < new Date() ? 'completed' : 'active',
                    // Additional fields that might be needed
                    refillsRemaining: 0, // Will be populated by backend
                    nextRefillDate: null, // Will be populated by backend
                    prescribedDate: medication.start_date,
                    expirationDate: medication.end_date,
                    ndc: '', // Will be populated by backend
                }));
                state.hasLoadedOnce = true;
            })
            .addCase(GetMyMedicationsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Medication
            .addCase(DeleteMyMedicationAction.pending, (state) => {
                state.deleting = true;
                state.deleteSuccess = false;
                state.error = null;
            })
            .addCase(DeleteMyMedicationAction.fulfilled, (state, action) => {
                state.deleting = false;
                state.deleteSuccess = true;
                state.myMedications = state.myMedications.filter(item => item.id !== action.payload);
            })
            .addCase(DeleteMyMedicationAction.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            });
    },
});

export const { clearMedicationStatus } = medicationSlice.actions;
export default medicationSlice.reducer;