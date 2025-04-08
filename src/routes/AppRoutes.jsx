import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Documentation from '../pages/docmentation/Documentation';
import { PatientPage } from '../pages/patientPage/PatientPage';
import Landing from '../pages/landingPage/Landing';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/patient/*" element={<PatientPage />} />
        </Routes>
    );
};

export default AppRoutes;
