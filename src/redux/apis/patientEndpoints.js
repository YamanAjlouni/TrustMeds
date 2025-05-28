/////// Patient Self Endpoints ///////
// Profile
export const GetMyProfileAPI = 'patients/me/profile/';
export const UpdateMyProfileApi = 'patients/me/update-profile/';

// Emergency Contact
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
export const GetAllAllergiesAPI = 'patients/public/allergies/';
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
