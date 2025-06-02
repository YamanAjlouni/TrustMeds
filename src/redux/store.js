import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authentication/authReducer";
import profileReducer from "./reducers/patients/ProfileReducer";
import emergencyContactReducer from "./reducers/patients/EmergencyContactReducer";
import allergyReducer from "./reducers/patients/AllergiesReducer";
import chronicDiseaseReducer from "./reducers/patients/ChronicDiseasesReducer";
import surgeryReducer from "./reducers/patients/SurgeriesReducer";
import medicationReducer from './reducers/patients/MedicationsReducer';
import appointmentReducer from './reducers/patients/AppointmentsReducer';
import doctorReducer from './reducers/patients/DoctorsReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        emergencyContact: emergencyContactReducer,
        allergies: allergyReducer,
        chronicDiseases: chronicDiseaseReducer,
        surgeries: surgeryReducer,
        medications: medicationReducer,
        appointments: appointmentReducer,
        doctors: doctorReducer,
    },
});

export default store;