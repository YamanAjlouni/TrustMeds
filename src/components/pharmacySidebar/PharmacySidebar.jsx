import React from 'react';
import { NavLink } from 'react-router-dom';
import './PharmacySidebar.scss';
import { useLanguage } from '../../context/LanguageContext'; // Import language context
import {
    FaHome,
    FaQrcode,
    FaClipboardList,
    FaHistory,
    FaComments,
    FaFileInvoiceDollar,
    FaUserAlt,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa';

export const PharmacySidebar = ({ isSidebarOpen, onLinkClick }) => {
    const { t, isRTL } = useLanguage(); // Get translations and RTL status

    return (
        <div className={`pharmacy-sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="pharmacy-sidebar-profile">
                <div className="profile-avatar">
                    <FaUserAlt />
                </div>
                <div className="profile-info">
                    <h3>Yara Mohammed</h3>
                    <p>Senior Pharmacist</p>
                </div>
            </div>

            <nav className="pharmacy-sidebar-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/pharmacy/overview"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaHome className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.dashboard')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/scan-prescription"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaQrcode className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.scanPrescription')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/pending-prescriptions"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaClipboardList className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.pendingPrescriptions')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/dispensed-history"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaHistory className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.dispensedHistory')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/communication"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaComments className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.communication')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/billing"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaFileInvoiceDollar className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.billing')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/profile"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaUserAlt className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.profile')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/help"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaQuestionCircle className="nav-icon" />
                            <span className="nav-text">{t('pharmacyPage.sidebar.help')}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="pharmacy-sidebar-footer">
                <NavLink to='/' className="logout-btn">
                    <FaSignOutAlt className="logout-icon" />
                    <span className="logout-text">{t('pharmacyPage.navbar.logout')}</span>
                </NavLink>
            </div>
        </div>
    );
};