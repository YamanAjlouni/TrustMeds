import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authentication/authReducer";
import profileReducer from "./reducers/patients/ProfileReducer";
import emergencyContactReducer from "./reducers/patients/EmergencyContactReducer";
import allergyReducer from "./reducers/patients/AllergiesReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        emergencyContact: emergencyContactReducer,
        allergies: allergyReducer,

    },
});

export default store;