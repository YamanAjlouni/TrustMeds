import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Documentation from '../pages/docmentation/Documentation';
import { PatientPage } from '../pages/patientPage/PatientPage';
import Landing from '../pages/landingPage/Landing';
import { DoctorPage } from '../pages/doctorPage/DoctorPage';
import PharmacyDashboard from '../pages/pharmacyPage/pharmacyDashboard/PharmacyDashboard';
import PharmacyPage from '../pages/pharmacyPage/PharmacyPage';
import { LanguageProvider } from '../context/LanguageContext';

const AppRoutes = () => {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/patient/*" element={<PatientPage />} />
                <Route path="/doctor/*" element={<DoctorPage />} />
                <Route path="/pharmacy/*" element={<PharmacyPage />} />
            </Routes>
        </LanguageProvider>
    );
};

export default AppRoutes;
