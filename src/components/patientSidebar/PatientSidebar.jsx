import React from 'react';
import {
    FaChartLine,
    FaPills,
    FaPhoneAlt,
    FaClinicMedical,
    FaIdCard,
    FaShieldAlt,
    FaQuestionCircle
} from 'react-icons/fa';
import './PatientSidebar.scss';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Import language context

export const PatientSidebar = ({ isSidebarOpen, onLinkClick }) => {
    const { t, isRTL } = useLanguage(); // Get translations and RTL status
    
    const navItems = [
        { 
            id: 'overview', 
            icon: <FaChartLine />, 
            label: t('patientPage.sidebar.overview'), 
            path: '/patient/overview' 
        },
        { 
            id: 'medications', 
            icon: <FaPills />, 
            label: t('patientPage.sidebar.medications'), 
            path: '/patient/prescriptions' 
        },
        { 
            id: 'doctor', 
            icon: <FaPhoneAlt />, 
            label: t('patientPage.sidebar.doctors'), 
            path: '/patient/doctors' 
        },
        { 
            id: 'pharmacies', 
            icon: <FaClinicMedical />, 
            label: t('patientPage.sidebar.pharmacies'), 
            path: '/patient/pharmacies' 
        },
        { 
            id: 'health-info', 
            icon: <FaIdCard />, 
            label: t('patientPage.sidebar.healthInfo'), 
            path: '/patient/health-info' 
        },
        { 
            id: 'security-center', 
            icon: <FaShieldAlt />, 
            label: t('patientPage.sidebar.securityCenter'), 
            path: '/patient/security-center' 
        },
        { 
            id: 'help-resources', 
            icon: <FaQuestionCircle />, 
            label: t('patientPage.sidebar.help'), 
            path: '/patient/help' 
        }
    ];

    return (
        <>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isRTL ? 'rtl' : 'ltr'}`}>
                <nav className="main-nav">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                    onClick={onLinkClick}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="health-status">
                        <div className="adherence-chart">
                            <div className="percentage">98%</div>
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg"
                                    d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray="98, 100"
                                    d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                        </div>
                        <div className="adherence-info">
                            <h4>{t('patientPage.sidebar.medicationAdherence')}</h4>
                            <p>{t('patientPage.sidebar.adherenceStatus')}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Dark overlay when sidebar is open on mobile */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={onLinkClick}
            />
        </>
    );
};