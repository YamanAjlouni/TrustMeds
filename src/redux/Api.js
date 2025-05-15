// The Base URL used in axiosInstance file so no need to define it here 

/////// Patient Endpoints ///////
export const GetPatientsAPI = 'patients/';
export const AddPatientAPI = 'patients/';
export const GetPatientByIdAPI = (id) => `patients/${id}/`;
export const UpdatePatientAPI = (id) => `patients/${id}/`; // Put and Patch
export const DeletePatientAPI = (id) => `patients/${id}/`;

// Emergency Contact Endpoints
export const GetEmergencyContactsAPI = 'patients/emergency-contacts/';
export const AddEmergencyContactAPI = 'patients/emergency-contacts/';
export const GetEmergencyContactByIdAPI = (id) => `patients/emergency-contacts/${id}/`;
export const UpdateEmergencyContactAPI = (id) => `patients/emergency-contacts/${id}/`; // Put and Patch
export const DeleteEmergencyContactAPI = (id) => `patients/emergency-contacts/${id}/`;

// Visit Endpoints
export const GetVisitsAPI = 'patients/visits/';
export const AddVisitAPI = 'patients/visits/';
export const GetVisitByIdAPI = (id) => `patients/visits/${id}/`;
export const UpdateVisitAPI = (id) => `patients/visits/${id}/`; // Put and Patch
export const DeleteVisitAPI = (id) => `patients/visits/${id}/`;

// Allergy Endpoints
export const GetAllergiesAPI = 'patients/allergies/';
export const AddAllergyAPI = 'patients/allergies/';
export const GetAllergyByIdAPI = (id) => `patients/allergies/${id}/`;
export const UpdateAllergyAPI = (id) => `patients/allergies/${id}/`; // Put and Patch
export const DeleteAllergyAPI = (id) => `patients/allergies/${id}/`;

// Chronic Disease Endpoints
export const GetChronicDiseasesAPI = 'patients/chronic-diseases/';
export const AddChronicDiseaseAPI = 'patients/chronic-diseases/';
export const GetChronicDiseaseByIdAPI = (id) => `patients/chronic-diseases/${id}/`;
export const UpdateChronicDiseaseAPI = (id) => `patients/chronic-diseases/${id}/`; // Put and Patch
export const DeleteChronicDiseaseAPI = (id) => `patients/chronic-diseases/${id}/`;

// Surgery Endpoints
export const GetSurgeriesAPI = 'patients/surgeries/';
export const AddSurgeryAPI = 'patients/surgeries/';
export const GetSurgeryByIdAPI = (id) => `patients/surgeries/${id}/`;
export const UpdateSurgeryAPI = (id) => `patients/surgeries/${id}/`; // Put and Patch
export const DeleteSurgeryAPI = (id) => `patients/surgeries/${id}/`;

// Disability Endpoints
export const GetDisabilitiesAPI = 'patients/disabilities/';
export const AddDisabilityAPI = 'patients/disabilities/';
export const GetDisabilityByIdAPI = (id) => `patients/disabilities/${id}/`;
export const UpdateDisabilityAPI = (id) => `patients/disabilities/${id}/`; // Put and Patch
export const DeleteDisabilityAPI = (id) => `patients/disabilities/${id}/`;

// Medication Endpoints
export const GetMedicationsAPI = 'patients/medications/';
export const AddMedicationAPI = 'patients/medications/';
export const GetMedicationByIdAPI = (id) => `patients/medications/${id}/`;
export const UpdateMedicationAPI = (id) => `patients/medications/${id}/`; // Put and Patch
export const DeleteMedicationAPI = (id) => `patients/medications/${id}/`;


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
