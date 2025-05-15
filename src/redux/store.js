import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patients/PatientsSlice";
// استورد الـ slices الأخرى لما تجهزهم

const store = configureStore({
    reducer: {
        patients: patientReducer,
    },
});

export default store;
