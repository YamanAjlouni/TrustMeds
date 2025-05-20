// The Base URL used in axiosInstance file so no need to define it here 


/////// Patient Self Endpoints ///////
// Profile & Emergency Contact
export const GetMyProfileAPI = 'patients/me/profile/';
export const GetMyEmergencyContactAPI = 'patients/me/emergency-contact/';
export const CreateMyEmergencyContactAPI = 'patients/create-emergency-contact/';
export const UpdateMyEmergencyContactAPI = (id) => `patients/update-emergency-contact/${id}/`;
export const DeleteMyEmergencyContactAPI = (id) => `patients/delete-emergency-contact/${id}/`;

// Medications
export const GetMyMedicationsAPI = 'patients/me/medications/';
export const CreateMyMedicationAPI = 'patients/create-medication/';
export const UpdateMyMedicationAPI = (id) => `patients/update-medication/${id}/`;
export const DeleteMyMedicationAPI = (id) => `patients/delete-medication/${id}/`;

// Allergies
export const GetMyAllergiesAPI = 'patients/me/allergies/';
export const CreateMyAllergyAPI = 'patients/create-allergy/';
export const UpdateMyAllergyAPI = (id) => `patients/update-allergy/${id}/`;
export const DeleteMyAllergyAPI = (id) => `patients/delete-allergy/${id}/`;

// Chronic Diseases
export const GetMyChronicDiseasesAPI = 'patients/me/chronic-diseases/';
export const CreateMyChronicDiseaseAPI = 'patients/create-chronic-disease/';
export const UpdateMyChronicDiseaseAPI = (id) => `patients/update-chronic-disease/${id}/`;
export const DeleteMyChronicDiseaseAPI = (id) => `patients/delete-chronic-disease/${id}/`;

// Surgeries
export const GetMySurgeriesAPI = 'patients/me/surgeries/';
export const CreateMySurgeryAPI = 'patients/create-surgery/';
export const UpdateMySurgeryAPI = (id) => `patients/update-surgery/${id}/`;
export const DeleteMySurgeryAPI = (id) => `patients/delete-surgery/${id}/`;

// Disabilities
export const GetMyDisabilitiesAPI = 'patients/me/disabilities/';
export const CreateMyDisabilityAPI = 'patients/create-disability/';
export const UpdateMyDisabilityAPI = (id) => `patients/update-disability/${id}/`;
export const DeleteMyDisabilityAPI = (id) => `patients/delete-disability/${id}/`;

// Appointments & Doctors
export const GetMyAppointmentsAPI = 'patients/me/appointments/';
export const GetMyDoctorsAPI = 'patients/me/doctors/';


////// Doctors //////
export const GetDoctorsAPI = "/doctors/";
export const PostDoctorAPI = "/doctors/";
export const GetDoctorByIdAPI = (id) => `/doctors/${id}/`;
export const PutDoctorByIdAPI = (id) => `/doctors/${id}/`;
export const PatchDoctorByIdAPI = (id) => `/doctors/${id}/`;
export const DeleteDoctorByIdAPI = (id) => `/doctors/${id}/`;

// Doctor Schedules
export const GetDoctorSchedulesAPI = "/doctors/schedules/";
export const PostDoctorScheduleAPI = "/doctors/schedules/";
export const GetDoctorScheduleByIdAPI = (id) => `/doctors/schedules/${id}/`;
export const PutDoctorScheduleByIdAPI = (id) => `/doctors/schedules/${id}/`;
export const PatchDoctorScheduleByIdAPI = (id) => `/doctors/schedules/${id}/`;
export const DeleteDoctorScheduleByIdAPI = (id) => `/doctors/schedules/${id}/`;

////// Pharmacies //////
export const GetPharmaciesAPI = "/pharmacies/";
export const PostPharmacyAPI = "/pharmacies/";
export const GetPharmacyByIdAPI = (id) => `/pharmacies/${id}/`;
export const PutPharmacyByIdAPI = (id) => `/pharmacies/${id}/`;
export const PatchPharmacyByIdAPI = (id) => `/pharmacies/${id}/`;
export const DeletePharmacyByIdAPI = (id) => `/pharmacies/${id}/`;

// Prescriptions
export const GetPrescriptionsAPI = "/prescriptions/";
export const PostPrescriptionAPI = "/prescriptions/";
export const GetPrescriptionByIdAPI = (id) => `/prescriptions/${id}/`;
export const PutPrescriptionByIdAPI = (id) => `/prescriptions/${id}/`;
export const PatchPrescriptionByIdAPI = (id) => `/prescriptions/${id}/`;
export const DeletePrescriptionByIdAPI = (id) => `/prescriptions/${id}/`;

// Prescription Medications
export const GetPrescriptionMedicationsAPI = "/prescriptions/medications/";
export const PostPrescriptionMedicationAPI = "/prescriptions/medications/";
export const GetPrescriptionMedicationByIdAPI = (id) => `/prescriptions/medications/${id}/`;
export const PutPrescriptionMedicationByIdAPI = (id) => `/prescriptions/medications/${id}/`;
export const PatchPrescriptionMedicationByIdAPI = (id) => `/prescriptions/medications/${id}/`;
export const DeletePrescriptionMedicationByIdAPI = (id) => `/prescriptions/medications/${id}/`;

// Available Medications
export const GetAvailableMedsAPI = "/prescriptions/available-meds/";
export const PostAvailableMedAPI = "/prescriptions/available-meds/";
export const GetAvailableMedByIdAPI = (id) => `/prescriptions/available-meds/${id}/`;
export const PutAvailableMedByIdAPI = (id) => `/prescriptions/available-meds/${id}/`;
export const PatchAvailableMedByIdAPI = (id) => `/prescriptions/available-meds/${id}/`;
export const DeleteAvailableMedByIdAPI = (id) => `/prescriptions/available-meds/${id}/`;
