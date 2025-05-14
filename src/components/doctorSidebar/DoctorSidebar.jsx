import React from 'react';
import { NavLink } from 'react-router-dom';
import './DoctorSidebar.scss';
import {
    FaHome,
    FaUserInjured,
    FaPills,
    FaHistory,
    FaFileAlt,
    FaComments,
    FaUserMd,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext'; // Import language context

export const DoctorSidebar = ({ isSidebarOpen, onLinkClick }) => {
    const { t, isRTL } = useLanguage(); // Get translations and RTL status

    // Create navigation items array
    const navItems = [
        {
            id: 'overview',
            icon: <FaHome />,
            label: t('doctorPage.sidebar.overview'),
            path: '/doctor/overview'
        },
        {
            id: 'patients',
            icon: <FaUserInjured />,
            label: t('doctorPage.sidebar.patients'),
            path: '/doctor/patients'
        },
        {
            id: 'write-prescription',
            icon: <FaPills />,
            label: t('doctorPage.sidebar.writePrescription'),
            path: '/doctor/write-prescription'
        },
        {
            id: 'prescription-history',
            icon: <FaHistory />,
            label: t('doctorPage.sidebar.prescriptionHistory'),
            path: '/doctor/prescription-history'
        },
        {
            id: 'medical-records',
            icon: <FaFileAlt />,
            label: t('doctorPage.sidebar.medicalRecords'),
            path: '/doctor/medical-records'
        },
        {
            id: 'communication',
            icon: <FaComments />,
            label: t('doctorPage.sidebar.communication'),
            path: '/doctor/communication'
        },
        {
            id: 'profile',
            icon: <FaUserMd />,
            label: t('doctorPage.sidebar.profile'),
            path: '/doctor/profile'
        },
        {
            id: 'help',
            icon: <FaQuestionCircle />,
            label: t('doctorPage.sidebar.help'),
            path: '/doctor/help'
        }
    ];

    return (
        <div className={`doctor-sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="doctor-sidebar-profile">
                <div className="profile-avatar">
                    <FaUserMd />
                </div>
                <div className="profile-info">
                    <h3>Dr. Mahmoud Ahmed</h3>
                    <p>Cardiologist</p>
                </div>
            </div>

            <nav className="doctor-sidebar-nav">
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavLink
                                to={item.path}
                                onClick={onLinkClick}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="doctor-sidebar-footer">
                <button className="logout-btn">
                    <span className="logout-icon"><FaSignOutAlt /></span>
                    <span className="logout-text">{t('doctorPage.sidebar.logout')}</span>
                </button>
            </div>
        </div>
    );
};