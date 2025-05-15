// Import all localization files
import enNavbar from '../locale/en/landingPage/navbar.json';
import arNavbar from '../locale/ar/landingPage/navbar.json';
import enHome from '../locale/en/landingPage/home.json';
import arHome from '../locale/ar/landingPage/home.json';
import enAbout from '../locale/en/landingPage/about.json';
import arAbout from '../locale/ar/landingPage/about.json';
import enHowItWorks from '../locale/en/landingPage/howItWorks.json';
import arHowItWorks from '../locale/ar/landingPage/howItWorks.json';
import enFeaturesAndSecurity from '../locale/en/landingPage/featuresAndSecurity.json';
import arFeaturesAndSecurity from '../locale/ar/landingPage/featuresAndSecurity.json';
import enTestimonials from '../locale/en/landingPage/testimonials.json';
import arTestimonials from '../locale/ar/landingPage/testimonials.json';
import enFooter from '../locale/en/landingPage/footer.json';
import arFooter from '../locale/ar/landingPage/footer.json';

// patient page translations
import enPatientNavbar from '../locale/en/patientPage/navbar.json';
import arPatientNavbar from '../locale/ar/patientPage/navbar.json';
import enPatientSidebar from '../locale/en/patientPage/sidebar.json';
import arPatientSidebar from '../locale/ar/patientPage/sidebar.json';
import enPatientDashboard from '../locale/en/patientPage/dashboard.json';
import arPatientDashboard from '../locale/ar/patientPage/dashboard.json';
import enPatientPrescriptions from '../locale/en/patientPage/prescriptions.json';
import arPatientPrescriptions from '../locale/ar/patientPage/prescriptions.json';
import enPatientDoctors from '../locale/en/patientPage/doctors.json';
import arPatientDoctors from '../locale/ar/patientPage/doctors.json';
import enPatientPharmacyConnection from '../locale/en/patientPage/pharmacyConnection.json';
import arPatientPharmacyConnection from '../locale/ar/patientPage/pharmacyConnection.json';
import enPatientHealthProfile from '../locale/en/patientPage/healthProfile.json';
import arPatientHealthProfile from '../locale/ar/patientPage/healthProfile.json';
import enPatientSecurityCenter from '../locale/en/patientPage/securityCenter.json';
import arPatientSecurityCenter from '../locale/ar/patientPage/securityCenter.json';
import enPatientHelpResources from '../locale/en/patientPage/helpResources.json';
import arPatientHelpResources from '../locale/ar/patientPage/helpResources.json';

// doctor page translations
import enDoctorNavbar from '../locale/en/doctorPage/navbar.json';
import arDoctorNavbar from '../locale/ar/doctorPage/navbar.json';
import enDoctorSidebar from '../locale/en/doctorPage/sidebar.json';
import arDoctorSidebar from '../locale/ar/doctorPage/sidebar.json';
import enDoctorDashboard from '../locale/en/doctorPage/dashboard.json';
import arDoctorDashboard from '../locale/ar/doctorPage/dashboard.json';
import enDoctorPatients from '../locale/en/doctorPage/patients.json';
import arDoctorPatients from '../locale/ar/doctorPage/patients.json';
import enDoctorPrescriptions from '../locale/en/doctorPage/prescriptions.json';
import arDoctorPrescriptions from '../locale/ar/doctorPage/prescriptions.json';
import enDoctorPrescriptionHistory from '../locale/en/doctorPage/prescriptionHistory.json';
import arDoctorPrescriptionHistory from '../locale/ar/doctorPage/prescriptionHistory.json';
import enDoctorMedicalRecords from '../locale/en/doctorPage/medicalRecords.json';
import arDoctorMedicalRecords from '../locale/ar/doctorPage/medicalRecords.json';
import enDoctorProfile from '../locale/en/doctorPage/profile.json';
import arDoctorProfile from '../locale/ar/doctorPage/profile.json';
import enDoctorHealthResources from '../locale/en/doctorPage/helpResources.json';
import arDoctorHealthResources from '../locale/ar/doctorPage/helpResources.json';


// pharmacy page translation 
import enPharmacyNavbar from '../locale/en/pharmacyPage/navbar.json';
import arPharmacyNavbar from '../locale/ar/pharmacyPage/navbar.json';
import enPharmacySidebar from '../locale/en/pharmacyPage/sidebar.json';
import arPharmacySidebar from '../locale/ar/pharmacyPage/sidebar.json';
import enPharmacyDashboard from '../locale/en/pharmacyPage/dashboard.json'
import arPharmacyDashboard from '../locale/ar/pharmacyPage/dashboard.json'
import enPharmacyScanPrescription from '../locale/en/pharmacyPage/scanPrescription.json'
import arPharmacyScanPrescription from '../locale/ar/pharmacyPage/scanPrescription.json'
import enPharmacyPendingPrescriptions from '../locale/en/pharmacyPage/pendingPrescriptions.json'
import arPharmacyPendingPrescriptions from '../locale/ar/pharmacyPage/pendingPrescriptions.json'
import enPharmacyDispensedHistory from '../locale/en/pharmacyPage/dispensedHistory.json'
import arPharmacyDispensedHistory from '../locale/ar/pharmacyPage/dispensedHistory.json'
import enPharmacyBilling from '../locale/en/pharmacyPage/billing.json'
import arPharmacyBilling from '../locale/ar/pharmacyPage/billing.json'
import enPharmacyProfile from '../locale/en/pharmacyPage/profile.json'
import arPharmacyProfile from '../locale/ar/pharmacyPage/profile.json'
import enPharmacyHelp from '../locale/en/pharmacyPage/help.json'
import arPharmacyHelp from '../locale/ar/pharmacyPage/help.json'


// Organize translations by language and section
const translations = {
    en: {
        landingPage: {
            navbar: enNavbar,
            home: enHome,
            about: enAbout,
            howItWorks: enHowItWorks,
            featuresAndSecurity: enFeaturesAndSecurity,
            testimonials: enTestimonials,
            footer: enFooter,
            // Add other sections as needed
        },
        patientPage: {
            navbar: enPatientNavbar,
            sidebar: enPatientSidebar,
            dashboard: enPatientDashboard,
            prescriptions: enPatientPrescriptions,
            doctors: enPatientDoctors,
            pharmacyConnection: enPatientPharmacyConnection,
            healthProfile: enPatientHealthProfile,
            securityCenter: enPatientSecurityCenter,
            helpResources: enPatientHelpResources, // Added help resources translations
            // Add patient page translations
        },
        doctorPage: {
            navbar: enDoctorNavbar,
            sidebar: enDoctorSidebar,
            dashboard: enDoctorDashboard,
            patients: enDoctorPatients,
            prescriptions: enDoctorPrescriptions,
            prescriptionHistory: enDoctorPrescriptionHistory,
            medicalRecords: enDoctorMedicalRecords,
            profile: enDoctorProfile,
            help: enDoctorHealthResources, // Added health resources translations

            // Add doctor page translations
        },
        pharmacyPage: {
            navbar: enPharmacyNavbar,
            sidebar: enPharmacySidebar,
            dashboard: enPharmacyDashboard,
            scanPrescription: enPharmacyScanPrescription,
            pendingPrescriptions: enPharmacyPendingPrescriptions,
            dispensedHistory: enPharmacyDispensedHistory,
            billing: enPharmacyBilling,
            profile: enPharmacyProfile,
            help: enPharmacyHelp,
            // Add pharmacy page translations
        }
    },
    ar: {
        landingPage: {
            navbar: arNavbar,
            home: arHome,
            about: arAbout,
            howItWorks: arHowItWorks,
            featuresAndSecurity: arFeaturesAndSecurity,
            testimonials: arTestimonials,
            footer: arFooter,
            // Add other sections as needed
        },
        patientPage: {
            navbar: arPatientNavbar,
            sidebar: arPatientSidebar,
            dashboard: arPatientDashboard,
            prescriptions: arPatientPrescriptions,
            doctors: arPatientDoctors,
            pharmacyConnection: arPatientPharmacyConnection,
            healthProfile: arPatientHealthProfile,
            securityCenter: arPatientSecurityCenter,
            helpResources: arPatientHelpResources, // Added help resources translations
            // Add patient page translations
        },
        doctorPage: {
            navbar: arDoctorNavbar,
            sidebar: arDoctorSidebar,
            dashboard: arDoctorDashboard,
            patients: arDoctorPatients,
            prescriptions: arDoctorPrescriptions,
            prescriptionHistory: arDoctorPrescriptionHistory,
            medicalRecords: arDoctorMedicalRecords,
            profile: arDoctorProfile,
            help: arDoctorHealthResources, // Added health resources translations

            // Add doctor page translations
        },
        pharmacyPage: {
            navbar: arPharmacyNavbar,
            sidebar: arPharmacySidebar,
            dashboard: arPharmacyDashboard,
            scanPrescription: arPharmacyScanPrescription,
            pendingPrescriptions: arPharmacyPendingPrescriptions,
            dispensedHistory: arPharmacyDispensedHistory,
            billing: arPharmacyBilling,
            profile: arPharmacyProfile,
            help: arPharmacyHelp,

            // Add pharmacy page translations
        }
    }
};

// The rest of the file remains unchanged

// The rest of the file remains unchanged

/**
 * Get translation for a specific key
 * @param {string} language - The language code (en, ar)
 * @param {string} path - The dot-separated path to the translation (e.g., 'landingPage.navbar.home')
 * @param {object} params - Optional parameters to replace in the translation
 * @returns {string} - The translated string
 */
export const getTranslation = (language, path, params = {}) => {
    const keys = path.split('.');
    let value = translations[language];

    // Navigate through the object path
    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation key not found: ${path} for language ${language}`);
            return path; // Return the path as fallback
        }
    }

    // Replace parameters in the string if any
    if (typeof value === 'string' && params) {
        return Object.entries(params).reduce((result, [param, paramValue]) => {
            return result.replace(`{{${param}}}`, paramValue);
        }, value);
    }

    return value;
};

/**
 * Loads a specific section's translations
 * @param {string} language - The language code (en, ar)
 * @param {string} section - The section path (e.g., 'landingPage.navbar')
 * @returns {object} - The translation object for that section
 */
export const loadTranslationSection = (language, section) => {
    const keys = section.split('.');
    let value = translations[language];

    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation section not found: ${section} for language ${language}`);
            return {}; // Return empty object as fallback
        }
    }

    return value;
};

export default translations;