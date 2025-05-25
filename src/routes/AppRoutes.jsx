import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import Landing from '../pages/landingPage/Landing';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Documentation from '../pages/docmentation/Documentation';
import { PatientPage } from '../pages/patientPage/PatientPage';
import { DoctorPage } from '../pages/doctorPage/DoctorPage';
import PharmacyPage from '../pages/pharmacyPage/PharmacyPage';
import tokenService from '../services/tokenService';

// Define ProtectedRoute inline to avoid any import issues
const ProtectedRoute = ({ children }) => {
    //   console.log('ProtectedRoute rendering');

    // Simple check for token in localStorage
    const hasToken = localStorage.getItem('accessToken') !== null;
    //   console.log('Token exists:', hasToken);

    // If no token, redirect to login
    if (!hasToken) {
        // console.log('No token, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // If token exists, render children
    //   console.log('Token exists, rendering children');
    return children;
};

const AppRoutes = () => {
    // Function to check user type from token
    const checkUserType = (requiredType) => {
        try {
            const userInfo = tokenService.getUserFromToken();
            return userInfo?.user_type === requiredType;
        } catch (error) {
            return false;
        }
    };

    return (
        <LanguageProvider>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Protected patient routes */}
                <Route
                    path="/patient/*"
                    element={
                        <ProtectedRoute>
                            {checkUserType('doctor') ? (
                                <Navigate to="/doctor/overview" replace />
                            ) : checkUserType('pharmacy') ? (
                                <Navigate to="/pharmacy/overview" replace />
                            ) : (
                                <PatientPage />
                            )}
                        </ProtectedRoute>
                    }
                />

                {/* Protected doctor routes */}
                <Route
                    path="/doctor/*"
                    element={
                        <ProtectedRoute>
                            {checkUserType('patient') ? (
                                <Navigate to="/patient/overview" replace />
                            ) : checkUserType('pharmacy') ? (
                                <Navigate to="/pharmacy/overview" replace />
                            ) : (
                                <DoctorPage />
                            )}
                        </ProtectedRoute>
                    }
                />

                {/* Protected pharmacy routes */}
                <Route
                    path="/pharmacy/*"
                    element={
                        <ProtectedRoute>
                            {checkUserType('patient') ? (
                                <Navigate to="/patient/overview" replace />
                            ) : checkUserType('doctor') ? (
                                <Navigate to="/doctor/overview" replace />
                            ) : (
                                <PharmacyPage />
                            )}
                        </ProtectedRoute>
                    }
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </LanguageProvider>
    );
};

export default AppRoutes;


// import { Routes, Route } from 'react-router-dom';
// import { LanguageProvider } from '../context/LanguageContext';
// import Landing from '../pages/landingPage/Landing';
// import Login from '../components/login/Login';
// import Register from '../components/register/Register';
// import Documentation from '../pages/docmentation/Documentation';
// import { PatientPage } from '../pages/patientPage/PatientPage';
// import { DoctorPage } from '../pages/doctorPage/DoctorPage';
// import PharmacyPage from '../pages/pharmacyPage/PharmacyPage';

// const AppRoutes = () => {
//     return (
//         <LanguageProvider>
//             <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/documentation" element={<Documentation />} />
//                 <Route path="/patient/*" element={<PatientPage />} />
//                 <Route path="/doctor/*" element={<DoctorPage />} />
//                 <Route path="/pharmacy/*" element={<PharmacyPage />} />
//             </Routes>
//         </LanguageProvider>
//     );
// };

// export default AppRoutes;
