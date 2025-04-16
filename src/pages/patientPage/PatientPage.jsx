import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientDashboard from './patientDashboard/PatientDashboard';
import PatientMyPrescriptions from './patientMyPrescriptions/PatientMyPrescriptions';
import PatientPharmacyConnection from './patientPharmacyConnection/PatientPharmacyConnection';
import PatientDoctorCommunication from './patientDoctorCommunication/PatientDoctorCommunication';
import PatientNavbar from '../../components/patientNavbar/PatientNavbar';
import { PatientSidebar } from '../../components/patientSidebar/PatientSidebar';
import './PatientPage.scss'
import { PatientHealthProfile } from './patientHealthProfile/PatientHealthProfile';
import PatientSecurityCenter from './patientSecurityCenter/PatientSecurityCenter';
import PatientHelpResources from './patientHelpResources/PatientHelpResources';
import { PatientNotificationPreferences } from './patientNotificationPreferences/PatientNotificationPreferences';

export const PatientPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Auto-open sidebar on large screens
            if (window.innerWidth >= 1120) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='patient-out-container'>
            <PatientNavbar toggleSidebar={toggleSidebar} />

            <div className="patient-container">
                <PatientSidebar
                    isSidebarOpen={isSidebarOpen}
                    onLinkClick={() => {
                        if (window.innerWidth < 1120) setIsSidebarOpen(false);
                    }}
                />

                <div className={`patient-content ${isSidebarOpen ? '' : 'full-width'}`}>
                    <Routes>
                        <Route path="overview" element={<PatientDashboard />} />
                        <Route path="prescriptions" element={<PatientMyPrescriptions />} />
                        <Route path="doctors" element={<PatientDoctorCommunication />} />
                        <Route path="pharmacies" element={<PatientPharmacyConnection />} />
                        <Route path="health-info" element={<PatientHealthProfile />} />
                        <Route path="security-center" element={<PatientSecurityCenter />} />
                        <Route path="help" element={<PatientHelpResources />} />
                        <Route path="test" element={<PatientNotificationPreferences />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};