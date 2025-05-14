import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DoctorNavbar.scss';
import {
    FaBars,
    FaUserMd,
    FaSearch,
    FaBell,
    FaEnvelope,
    FaCog,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi'; // Added globe icon import
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { useLanguage } from '../../context/LanguageContext'; // Import language context

const DoctorNavbar = ({ toggleSidebar }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false); // Added language dropdown state

    // Get language context
    const { language, changeLanguage, t } = useLanguage();

    // References
    const notificationRef = React.useRef(null);
    const messageRef = React.useRef(null);
    const userMenuRef = React.useRef(null);
    const languageRef = React.useRef(null); // Added language dropdown ref

    // Sample notifications
    const notifications = [
        {
            id: 1,
            text: 'New lab results uploaded for Omar Farouq',
            time: '10 min ago',
            unread: true
        },
        {
            id: 2,
            text: 'Appointment request from Layla Abbas',
            time: '2 hours ago',
            unread: true
        },
        {
            id: 3,
            text: 'Prescription for Ahmed Hassan was filled',
            time: 'Yesterday',
            unread: false
        },
        {
            id: 4,
            text: 'System maintenance scheduled for Sunday',
            time: '2 days ago',
            unread: false
        }
    ];

    // Sample messages
    const messages = [
        {
            id: 1,
            sender: 'Fatima Khalid',
            text: 'Doctor, I have a question about my medication...',
            time: '30 min ago',
            unread: true
        },
        {
            id: 2,
            sender: 'Pharmacy - Main Street',
            text: 'Clarification needed on RX-12349 dosage',
            time: '1 hour ago',
            unread: true
        },
        {
            id: 3,
            sender: 'Dr. Sami (Referral)',
            text: 'Follow-up on the patient we discussed',
            time: 'Yesterday',
            unread: false
        }
    ];

    const toggleNotifications = (e) => {
        e.stopPropagation();
        setShowNotifications(!showNotifications);
        setShowMessages(false);
        setShowUserMenu(false);
        setShowLanguageDropdown(false); // Close language dropdown
    };

    const toggleMessages = (e) => {
        e.stopPropagation();
        setShowMessages(!showMessages);
        setShowNotifications(false);
        setShowUserMenu(false);
        setShowLanguageDropdown(false); // Close language dropdown
    };

    const toggleUserMenu = (e) => {
        e.stopPropagation();
        setShowUserMenu(!showUserMenu);
        setShowNotifications(false);
        setShowMessages(false);
        setShowLanguageDropdown(false); // Close language dropdown
    };

    // New function to toggle language dropdown
    const toggleLanguageDropdown = (e) => {
        e.stopPropagation();
        setShowLanguageDropdown(!showLanguageDropdown);
        setShowNotifications(false);
        setShowMessages(false);
        setShowUserMenu(false);
    };

    // Handle language change
    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
        setShowLanguageDropdown(false);
    };

    // Handle sidebar toggle
    const handleSidebarToggle = (e) => {
        e.stopPropagation();
        toggleSidebar();
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const closeDropdowns = (e) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
            if (messageRef.current && !messageRef.current.contains(e.target)) {
                setShowMessages(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
            if (languageRef.current && !languageRef.current.contains(e.target)) {
                setShowLanguageDropdown(false);
            }
        };

        document.addEventListener('click', closeDropdowns);

        return () => {
            document.removeEventListener('click', closeDropdowns);
        };
    }, []);

    return (
        <header className="doctor-navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <button className="sidebar-toggle" onClick={handleSidebarToggle}>
                        <FaBars />
                    </button>

                    <NavLink to="/doctor/overview" className="navbar-logo">
                        <img src={logo} alt="TrustMeds Logo" />
                    </NavLink>

                    <div className="navbar-search">
                        <input type="text" placeholder={t ? t('doctorPage.navbar.searchPlaceholder') : "Search patients, prescriptions..."} />
                        <FaSearch className="search-icon" />
                    </div>
                </div>

                <div className="navbar-right">
                    <div className="navbar-actions">
                        {/* Language Selector */}
                        <div className="language-wrapper" ref={languageRef}>
                            <div
                                className="language-icon-wrapper"
                                onClick={toggleLanguageDropdown}
                            >
                                <BiGlobe className="language-icon" />
                                <span className="current-language">{language?.toUpperCase()}</span>
                            </div>

                            {showLanguageDropdown && (
                                <div className="language-dropdown" onClick={e => e.stopPropagation()}>
                                    <div
                                        className={`language-option ${language === 'en' ? 'active' : ''}`}
                                        onClick={() => handleLanguageChange('en')}
                                    >
                                        English
                                    </div>
                                    <div
                                        className={`language-option ${language === 'ar' ? 'active' : ''}`}
                                        onClick={() => handleLanguageChange('ar')}
                                    >
                                        العربية
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="notification-container" ref={notificationRef}>
                            <button className="action-button" onClick={toggleNotifications}>
                                <FaBell />
                                {notifications.filter(n => n.unread).length > 0 && (
                                    <span className="notification-badge">{notifications.filter(n => n.unread).length}</span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="dropdown-menu notifications-dropdown" onClick={e => e.stopPropagation()}>
                                    <div className="dropdown-header">
                                        <h3>{t ? t('doctorPage.navbar.notifications') : "Notifications"}</h3>
                                        <button className="mark-all-read">{t ? t('doctorPage.navbar.markAllRead') : "Mark all as read"}</button>
                                    </div>

                                    <div className="dropdown-body">
                                        {notifications.length > 0 ? (
                                            <ul className="notification-list">
                                                {notifications.map(notification => (
                                                    <li
                                                        key={notification.id}
                                                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                                                    >
                                                        <div className="notification-content">
                                                            <p className="notification-text">{notification.text}</p>
                                                            <span className="notification-time">{notification.time}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="empty-state">
                                                <p>No notifications</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="dropdown-footer">
                                        <NavLink to="/doctor/notifications">{t ? t('doctorPage.navbar.viewAllNotifications') : "View all notifications"}</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <div className="message-container" ref={messageRef}>
                            <button className="action-button" onClick={toggleMessages}>
                                <FaEnvelope />
                                {messages.filter(m => m.unread).length > 0 && (
                                    <span className="notification-badge">{messages.filter(m => m.unread).length}</span>
                                )}
                            </button>

                            {showMessages && (
                                <div className="dropdown-menu messages-dropdown" onClick={e => e.stopPropagation()}>
                                    <div className="dropdown-header">
                                        <h3>{t ? t('doctorPage.navbar.messages') : "Messages"}</h3>
                                        <button className="mark-all-read">{t ? t('doctorPage.navbar.markAllRead') : "Mark all as read"}</button>
                                    </div>

                                    <div className="dropdown-body">
                                        {messages.length > 0 ? (
                                            <ul className="message-list">
                                                {messages.map(message => (
                                                    <li
                                                        key={message.id}
                                                        className={`message-item ${message.unread ? 'unread' : ''}`}
                                                    >
                                                        <div className="message-avatar">
                                                            {message.sender.charAt(0)}
                                                        </div>
                                                        <div className="message-content">
                                                            <p className="message-sender">{message.sender}</p>
                                                            <p className="message-text">{message.text}</p>
                                                            <span className="message-time">{message.time}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="empty-state">
                                                <p>No messages</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="dropdown-footer">
                                        <NavLink to="/doctor/communication">{t ? t('doctorPage.navbar.viewAllMessages') : "View all messages"}</NavLink>
                                    </div>
                                </div>
                            )}
                        </div> */}
                    </div>

                    <div className="user-menu-container" ref={userMenuRef}>
                        <button className="user-menu-button" onClick={toggleUserMenu}>
                            <div className="user-avatar">
                                <span>MA</span>
                            </div>
                            <span className="user-name">Dr. Mahmoud</span>
                        </button>

                        {showUserMenu && (
                            <div className="dropdown-menu user-dropdown" onClick={e => e.stopPropagation()}>
                                <div className="user-info">
                                    <div className="user-avatar large">
                                        <span>MA</span>
                                    </div>
                                    <div className="user-details">
                                        <h4>Dr. Mahmoud Ahmed</h4>
                                        <p>Cardiologist</p>
                                    </div>
                                </div>

                                <ul className="user-menu-list">
                                    <li>
                                        <NavLink to="/doctor/profile">
                                            <FaUserMd /> {t ? t('doctorPage.navbar.myProfile') : "My Profile"}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/doctor/profile/settings">
                                            <FaCog /> {t ? t('doctorPage.navbar.settings') : "Settings"}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/doctor/help">
                                            <FaQuestionCircle /> {t ? t('doctorPage.navbar.helpAndSupport') : "Help & Support"}
                                        </NavLink>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <button className="logout-button">
                                            <FaSignOutAlt /> {t ? t('doctorPage.navbar.logout') : "Logout"}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DoctorNavbar;