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
import PatientSecurityCenter from './patientDashboard/patientSecurityCenter/PatientSecurityCenter';

export const PatientPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1120) {
                setIsSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='patient-out-container'>
            <div className="patient-container">
                <PatientSidebar isSidebarOpen={isSidebarOpen} onLinkClick={() => {
                    if (window.innerWidth < 1120) setIsSidebarOpen(false);
                }} />
                <PatientNavbar />

                <div className={`patient-content ${isSidebarOpen ? '' : 'full-width'}`}>
                    <Routes>
                        <Route path="overview" element={<PatientDashboard />} />
                        <Route path="prescriptions" element={<PatientMyPrescriptions />} />
                        <Route path="doctors" element={<PatientDoctorCommunication />} />
                        <Route path="pharmacies" element={<PatientPharmacyConnection />} />
                        <Route path="health-info" element={<PatientHealthProfile />} />
                        <Route path="security-center" element={<PatientSecurityCenter />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
