import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './doctorDashboard/DoctorDashboard';
import DoctorNavbar from '../../components/doctorNavbar/DoctorNavbar';
import { DoctorSidebar } from '../../components/doctorSidebar/DoctorSidebar';
import './DoctorPage.scss';
import DoctorMyPatients from './doctorMyPatients/DoctorMyPatients';
import DoctorWritePrescription from './doctorWritePrescription/DoctorWritePrescription';
import DoctorPrescriptionHistory from './doctorPrescriptionHistory/DoctorPrescriptionHistory';
import { DoctorProfile } from './doctorProfile/DoctorProfile';
import { DoctorPatientMedicalRecords } from './doctorPatientMedicalRecords/DoctorPatientMedicalRecords';
import DoctorCommunication from './doctorCommunication/DoctorCommunication';
import DoctorHelpResources from './doctorHelpResources/DoctorHelpResources';

export const DoctorPage = () => {
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
        <div className='doctor-out-container'>
            <DoctorNavbar toggleSidebar={toggleSidebar} />

            <div className="doctor-container">
                <DoctorSidebar
                    isSidebarOpen={isSidebarOpen}
                    onLinkClick={() => {
                        if (window.innerWidth < 1120) setIsSidebarOpen(false);
                    }}
                />

                <div className={`doctor-content ${isSidebarOpen ? '' : 'full-width'}`}>
                    <Routes>
                        <Route path="overview" element={<DoctorDashboard />} />
                        <Route path="patients" element={<DoctorMyPatients />} />
                        <Route path="write-prescription" element={<DoctorWritePrescription />} />
                        <Route path="prescription-history" element={<DoctorPrescriptionHistory />} />
                        <Route path="medical-records/:patientId?" element={<DoctorPatientMedicalRecords />} />
                        <Route path="communication" element={<DoctorCommunication />} />
                        <Route path="profile" element={<DoctorProfile />} />
                        <Route path="help" element={<DoctorHelpResources />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};