// components/LoadingState/LoadingState.jsx
import React from 'react';
import { useLanguage } from '../../../../../context/LanguageContext';

export const LoadingState = () => {
    const { t } = useLanguage();
    
    return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>{t('doctorPage.prescriptionHistory.loadingMessage')}</p>
        </div>
    );
};