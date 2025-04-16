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

export const DoctorSidebar = ({ isSidebarOpen, onLinkClick }) => {
    return (
        <div className={`doctor-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
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
                    <li>
                        <NavLink
                            to="/doctor/overview"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaHome className="nav-icon" />
                            <span className="nav-text">Overview</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/patients"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaUserInjured className="nav-icon" />
                            <span className="nav-text">My Patients</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/write-prescription"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaPills className="nav-icon" />
                            <span className="nav-text">Write Prescription</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/prescription-history"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaHistory className="nav-icon" />
                            <span className="nav-text">Prescription History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/medical-records"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaFileAlt className="nav-icon" />
                            <span className="nav-text">Medical Records</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/communication"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaComments className="nav-icon" />
                            <span className="nav-text">Communication</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/profile"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaUserMd className="nav-icon" />
                            <span className="nav-text">Profile & Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/doctor/help"
                            onClick={onLinkClick}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FaQuestionCircle className="nav-icon" />
                            <span className="nav-text">Help & Resources</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="doctor-sidebar-footer">
                <button className="logout-btn">
                    <FaSignOutAlt className="logout-icon" />
                    <span className="logout-text">Logout</span>
                </button>
            </div>
        </div>
    );
};