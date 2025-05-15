import { createSlice } from "@reduxjs/toolkit";
import { fetchPatients, addPatient, updatePatient, deletePatient } from "../../actions/patients/PatientsActions";

const initialState = {
    patients: [],
    loading: false,
    error: null,
    successMessage: null,
};

const patientSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        clearPatientMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Fetch Patients
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Patient
            .addCase(addPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.patients.push(action.payload);
                state.successMessage = "تمت إضافة المريض بنجاح";
            })
            .addCase(addPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Patient
            .addCase(updatePatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPatient = action.payload;
                state.patients = state.patients.map((patient) =>
                    patient._id === updatedPatient._id ? updatedPatient : patient
                );
                state.successMessage = "تم تحديث بيانات المريض";
            })
            .addCase(updatePatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Patient
            .addCase(deletePatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.patients = state.patients.filter((p) => p._id !== deletedId);
                state.successMessage = "تم حذف المريض بنجاح";
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPatientMessages } = patientSlice.actions;

export default patientSlice.reducer;
