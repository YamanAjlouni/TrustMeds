import React from 'react';
import { NavLink } from 'react-router-dom';
import './PharmacySidebar.scss';
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
    return (
        <div className={`pharmacy-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
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
                            <span className="nav-text">Overview</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/scan-prescription"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaQrcode className="nav-icon" />
                            <span className="nav-text">Scan Prescription</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/pending-prescriptions"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaClipboardList className="nav-icon" />
                            <span className="nav-text">Pending Prescriptions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/dispensed-history"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaHistory className="nav-icon" />
                            <span className="nav-text">Dispensed History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/communication"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaComments className="nav-icon" />
                            <span className="nav-text">Communication</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/billing"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaFileInvoiceDollar className="nav-icon" />
                            <span className="nav-text">Billing</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/profile"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaUserAlt className="nav-icon" />
                            <span className="nav-text">Profile & Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pharmacy/help"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaQuestionCircle className="nav-icon" />
                            <span className="nav-text">Help & Resources</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="pharmacy-sidebar-footer">
                <NavLink to='/' className="logout-btn">
                    <FaSignOutAlt className="logout-icon" />
                    <span className="logout-text">Logout</span>
                </NavLink>
            </div>
        </div>
    );
};