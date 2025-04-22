import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button 
      className="language-switcher" 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;