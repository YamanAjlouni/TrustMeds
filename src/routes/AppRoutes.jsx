import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    // console.log('ProtectedRoute check - hasToken:', hasToken);

    if (!hasToken) {
        console.log('No token, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // console.log('Token exists, rendering protected content');
    return children;
};

const AppRoutes = () => {
    const [userType, setUserType] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // Function to get user type reliably
    const getUserType = () => {
        try {
            // console.log('getUserType called');

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

            // console.warn('No user type found, defaulting to patient');
            return 'login';
        } catch (error) {
            console.error('Error getting user type:', error);
            return 'login';
        }
    };

    // Initialize and monitor user type changes
    useEffect(() => {
        // console.log('AppRoutes useEffect triggered');

        const updateUserType = () => {
            const currentUserType = getUserType();
            setUserType(currentUserType);
            setIsReady(true);
        };

        // Initial check
        updateUserType();

        // Set up polling to catch localStorage changes quickly
        const interval = setInterval(() => {
            const newUserType = getUserType();
            if (newUserType !== userType) {
                // console.log(`User type changed: ${userType} → ${newUserType}`);
                setUserType(newUserType);
            }
        }, 200);

        // Clean up after 5 seconds
        const timeout = setTimeout(() => {
            // console.log('Stopping user type polling');
            clearInterval(interval);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [userType]);

    // Function to check if current user type matches required type
    const checkUserType = (requiredType) => {
        const actualUserType = userType || getUserType();
        // console.log(`checkUserType: required=${requiredType}, actual=${actualUserType}`);
        const matches = actualUserType === requiredType;
        // console.log(`User type ${matches ? '✅ MATCHES' : '❌ DOES NOT MATCH'}`);
        return matches;
    };

    // Function to get the correct dashboard path
    const getDashboardPath = () => {
        const currentUserType = userType || getUserType();
        // console.log('getDashboardPath for user type:', currentUserType);

        let path;
        switch (currentUserType) {
            case 'doctor':
                path = '/doctor/overview';
                break;
            case 'pharmacy':
                path = '/pharmacy/overview';
                break;
            default:
                path = '/patient/overview';
        }

        // console.log('Dashboard path determined:', path);
        return path;
    };

    // Debug current state
    useEffect(() => {
        // console.log('AppRoutes state:', {
        //     userType,
        //     isReady,
        //     accessToken: !!localStorage.getItem('accessToken'),
        //     storedUserType: localStorage.getItem('userType')
        // });
    }, [userType, isReady]);

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
                                    console.log('Redirecting to:', redirectPath);
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
                                    console.log('Redirecting to:', redirectPath);
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
                                    console.log('Redirecting to:', redirectPath);
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
                                console.log('🌟 Authenticated, redirecting to dashboard:', redirectPath);
                                return <Navigate to={redirectPath} replace />;
                            } else {
                                console.log('🌟 Not authenticated, redirecting to login');
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