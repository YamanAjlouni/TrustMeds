// Import all localization files
import enNavbar from '../locale/en/landingPage/navbar.json';
import arNavbar from '../locale/ar/landingPage/navbar.json';
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



// Import other localization files as needed

// Organize translations by language and section
const translations = {
    en: {
        landingPage: {
            navbar: enNavbar,
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
            pharmacyConnection: enPatientPharmacyConnection, // English
            // Add patient page translations
        },
        doctorPage: {
            // Add doctor page translations
        },
        pharmacyPage: {
            // Add pharmacy page translations
        }
    },
    ar: {
        landingPage: {
            navbar: arNavbar,
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
            pharmacyConnection: arPatientPharmacyConnection, // Arabic
            // Add patient page translations
        },
        doctorPage: {
            // Add doctor page translations
        },
        pharmacyPage: {
            // Add pharmacy page translations
        }
    }
};

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