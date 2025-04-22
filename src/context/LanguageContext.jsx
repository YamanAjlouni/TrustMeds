import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTranslation, loadTranslationSection } from '../utils/localization';

// Create language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Get browser language or use stored preference
    const getBrowserLanguage = () => {
        const storedLanguage = localStorage.getItem('preferredLanguage');
        if (storedLanguage) return storedLanguage;

        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ar') ? 'ar' : 'en';
    };

    const [language, setLanguage] = useState('en'); // Default to English as requested
    const [direction, setDirection] = useState(language === 'ar' ? 'rtl' : 'ltr');

    // Update direction when language changes
    useEffect(() => {
        setDirection(language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        localStorage.setItem('preferredLanguage', language);

        // Add a class to the body for global styling based on language
        if (language === 'ar') {
            document.body.classList.add('lang-ar');
            document.body.classList.remove('lang-en');
        } else {
            document.body.classList.add('lang-en');
            document.body.classList.remove('lang-ar');
        }
    }, [language]);

    // Translation function
    const t = (path, params = {}) => {
        return getTranslation(language, path, params);
    };

    // Function to load an entire section's translations
    const loadSection = (section) => {
        return loadTranslationSection(language, section);
    };

    // Change language function
    const changeLanguage = (newLanguage) => {
        if (newLanguage === 'ar' || newLanguage === 'en') {
            setLanguage(newLanguage);
        }
    };

    // Provide language context
    const value = {
        language,
        direction,
        t,
        loadSection,
        changeLanguage,
        isRTL: language === 'ar'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;