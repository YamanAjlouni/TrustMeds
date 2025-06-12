import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageProvider } from '../context/LanguageContext';
import Landing from '../pages/landingPage/Landing';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Documentation from '../pages/docmentation/Documentation';
import { PatientPage } from '../pages/patientPage/PatientPage';
import { DoctorPage } from '../pages/doctorPage/DoctorPage';
import PharmacyPage from '../pages/pharmacyPage/PharmacyPage';
import tokenService from '../services/tokenService';

const ProtectedRoute = ({ children }) => {
    const hasToken = localStorage.getItem('accessToken') !== null;

    if (!hasToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRoutes = () => {
    const [userType, setUserType] = useState(null);
    const [isReady, setIsReady] = useState(false);
    
    // Get auth state from Redux to react to login changes immediately
    const authState = useSelector((state) => state.auth);
    const { isAuthenticated, userType: reduxUserType } = authState;

    // Function to get user type reliably
    const getUserType = () => {
        try {
            // First priority: Check Redux state (most up-to-date after login)
            if (reduxUserType) {
                return reduxUserType;
            }

            // Second priority: Check localStorage
            const storedUserType = localStorage.getItem('userType');
            if (storedUserType) {
                return storedUserType;
            }

            // Fallback: token service
            const userInfo = tokenService.getUserFromToken();
            const tokenUserType = userInfo?.user_type;
            if (tokenUserType) {
                localStorage.setItem('userType', tokenUserType);
                return tokenUserType;
            }

            return null;
        } catch (error) {
            console.error('Error getting user type:', error);
            return null;
        }
    };

    // Initialize and monitor user type changes
    useEffect(() => {
        const updateUserType = () => {
            const currentUserType = getUserType();
            setUserType(currentUserType);
            setIsReady(true);
        };

        // Initial check
        updateUserType();

        // React immediately to Redux state changes (after login)
        if (reduxUserType && reduxUserType !== userType) {
            setUserType(reduxUserType);
        }

    }, [reduxUserType, isAuthenticated]);

    // Function to check if current user type matches required type
    const checkUserType = (requiredType) => {
        const actualUserType = userType || getUserType();
        const matches = actualUserType === requiredType;
        return matches;
    };

    // Function to get the correct dashboard path
    const getDashboardPath = () => {
        const currentUserType = userType || getUserType();

        let path;
        switch (currentUserType) {
            case 'doctor':
                path = '/doctor/overview';
                break;
            case 'pharmacy':
                path = '/pharmacy/overview';
                break;
            case 'patient':
                path = '/patient/overview';
                break;
            default:
                path = '/login';
        }

        return path;
    };

    // Debug current state
    useEffect(() => {
        // console.log('AppRoutes state:', {
        //     userType,
        //     reduxUserType,
        //     isReady,
        //     isAuthenticated,
        //     accessToken: !!localStorage.getItem('accessToken'),
        //     storedUserType: localStorage.getItem('userType')
        // });
    }, [userType, reduxUserType, isReady, isAuthenticated]);

    if (!isReady) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading... (Determining user type)
            </div>
        );
    }

    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />

                <Route
                    path="/patient/*"
                    element={
                        <ProtectedRoute>
                            {(() => {
                                const matches = checkUserType('patient');

                                if (matches) {
                                    return <PatientPage />;
                                } else {
                                    const redirectPath = getDashboardPath();
                                    return <Navigate to={redirectPath} replace />;
                                }
                            })()}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor/*"
                    element={
                        <ProtectedRoute>
                            {(() => {
                                const matches = checkUserType('doctor');

                                if (matches) {
                                    return <DoctorPage />;
                                } else {
                                    const redirectPath = getDashboardPath();
                                    return <Navigate to={redirectPath} replace />;
                                }
                            })()}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pharmacy/*"
                    element={
                        <ProtectedRoute>
                            {(() => {
                                const matches = checkUserType('pharmacy');

                                if (matches) {
                                    return <PharmacyPage />;
                                } else {
                                    const redirectPath = getDashboardPath();
                                    return <Navigate to={redirectPath} replace />;
                                }
                            })()}
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all route */}
                <Route
                    path="*"
                    element={
                        (() => {
                            const hasToken = localStorage.getItem('accessToken');

                            if (hasToken) {
                                const redirectPath = getDashboardPath();
                                return <Navigate to={redirectPath} replace />;
                            } else {
                                console.log('Catch-all: Not authenticated, redirecting to login');
                                return <Navigate to="/login" replace />;
                            }
                        })()
                    }
                />
            </Routes>
        </LanguageProvider>
    );
};

export default AppRoutes;