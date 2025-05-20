import { createSlice } from "@reduxjs/toolkit";
import { createMyEmergencyContact, deleteMyEmergencyContact, fetchMyEmergencyContact, fetchMyProfile, updateMyEmergencyContact } from "../../actions/patients/PatientsActions";

const initialState = {
    myProfile: null,
    emergencyContact: null,
    loading: false,
    error: null,
    successMessage: null,
};

const myProfileSlice = createSlice({
    name: "myProfile",
    initialState,
    reducers: {
        clearProfileMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // 🔹 Fetch Profile
            .addCase(fetchMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.myProfile = action.payload;
            })
            .addCase(fetchMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Fetch Emergency Contact
            .addCase(fetchMyEmergencyContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyEmergencyContact.fulfilled, (state, action) => {
                state.loading = false;
                state.emergencyContact = action.payload;
            })
            .addCase(fetchMyEmergencyContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Create Emergency Contact
            .addCase(createMyEmergencyContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMyEmergencyContact.fulfilled, (state, action) => {
                state.loading = false;
                state.emergencyContact = action.payload;
                state.successMessage = "تمت إضافة جهة الاتصال في حالات الطوارئ";
            })
            .addCase(createMyEmergencyContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Update Emergency Contact
            .addCase(updateMyEmergencyContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMyEmergencyContact.fulfilled, (state, action) => {
                state.loading = false;
                state.emergencyContact = action.payload;
                state.successMessage = "تم تحديث جهة الاتصال في حالات الطوارئ";
            })
            .addCase(updateMyEmergencyContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 Delete Emergency Contact
            .addCase(deleteMyEmergencyContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMyEmergencyContact.fulfilled, (state) => {
                state.loading = false;
                state.emergencyContact = null;
                state.successMessage = "تم حذف جهة الاتصال في حالات الطوارئ";
            })
            .addCase(deleteMyEmergencyContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProfileMessages } = myProfileSlice.actions;

export default myProfileSlice.reducer;
