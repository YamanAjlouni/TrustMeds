import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authentication/authReducer";
import profileReducer from "./reducers/patients/ProfileReducer";
import emergencyContactReducer from "./reducers/patients/EmergencyContactReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        emergencyContact: emergencyContactReducer,
    },
});

export default store;