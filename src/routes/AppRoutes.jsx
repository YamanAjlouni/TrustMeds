import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import Landing from '../pages/landingPage/Landing';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Documentation from '../pages/docmentation/Documentation';
import { PatientPage } from '../pages/patientPage/PatientPage';
import { DoctorPage } from '../pages/doctorPage/DoctorPage';
import PharmacyPage from '../pages/pharmacyPage/PharmacyPage';

const AppRoutes = () => {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/patient/*" element={<PatientPage />} />
                <Route path="/doctor/*" element={<DoctorPage />} />
                <Route path="/pharmacy/*" element={<PharmacyPage />} />
            </Routes>
        </LanguageProvider>
    );
};

export default AppRoutes;
