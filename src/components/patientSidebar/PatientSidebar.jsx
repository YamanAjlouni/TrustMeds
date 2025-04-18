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

export const PatientSidebar = ({ isSidebarOpen, onLinkClick }) => {
    const navItems = [
        { id: 'overview', icon: <FaChartLine />, label: 'Overview', path: '/patient/overview' },
        { id: 'medications', icon: <FaPills />, label: 'Medications', path: '/patient/prescriptions' },
        { id: 'doctor', icon: <FaPhoneAlt />, label: 'Doctors', path: '/patient/doctors' },
        { id: 'pharmacies', icon: <FaClinicMedical />, label: 'Pharmacies', path: '/patient/pharmacies' },
        { id: 'health-info', icon: <FaIdCard />, label: 'Health Info', path: '/patient/health-info' },
        { id: 'security-center', icon: <FaShieldAlt />, label: 'Security Center', path: '/patient/security-center' },
        { id: 'help-resources', icon: <FaQuestionCircle />, label: 'Help & Resources', path: '/patient/help' }
    ];

    return (
        <>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
                            <h4>Medication Adherence</h4>
                            <p>Great job this week!</p>
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