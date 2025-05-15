import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PharmacyNavbar from '../../components/pharmacyNavbar/PharmacyNavbar';
import { PharmacySidebar } from '../../components/pharmacySidebar/PharmacySidebar';
import './PharmacyPage.scss';
import PharmacyDashboard from './pharmacyDashboard/PharmacyDashboard';
import PharmacyScanPrescription from './pharmacyScanPrescription/PharmacyScanPrescription';
import PharmacyPendingPrescriptions from './pharmacyPendingPrescriptions/PharmacyPendingPrescriptions';
import PharmacyDispensedHistory from './pharmacyDispensedHistory/PharmacyDispensedHistory';
import PharmacyCommunication from './pharmacyCommunication/PharmacyCommunication';
import PharmacyBilling from './pharmacyBilling/PharmacyBilling';
import PharmacyProfile from './pharmacyProfile/PharmacyProfile';
import PharmacyHelp from './pharmacyHelp/PharmacyHelp';
import { useLanguage } from '../../context/LanguageContext'; // Import language context

export const PharmacyPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
    const { isRTL } = useLanguage(); // Get RTL status from language context

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
        <div className={`pharmacy-out-container ${isRTL ? 'rtl' : 'ltr'}`}>
            <PharmacyNavbar toggleSidebar={toggleSidebar} />

            <div className="pharmacy-container">
                <PharmacySidebar
                    isSidebarOpen={isSidebarOpen}
                    onLinkClick={() => {
                        if (window.innerWidth < 1120) setIsSidebarOpen(false);
                    }}
                />

                <div className={`pharmacy-content ${isSidebarOpen ? '' : 'full-width'}`}>
                    <Routes>
                        <Route path="overview" element={<PharmacyDashboard />} />
                        <Route path="scan-prescription" element={<PharmacyScanPrescription />} />
                        <Route path="pending-prescriptions" element={<PharmacyPendingPrescriptions />} />
                        <Route path="dispensed-history" element={<PharmacyDispensedHistory />} />
                        <Route path="communication" element={<PharmacyCommunication />} />
                        <Route path="billing" element={<PharmacyBilling />} />
                        <Route path="profile" element={<PharmacyProfile />} />
                        <Route path="help" element={<PharmacyHelp />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default PharmacyPage;