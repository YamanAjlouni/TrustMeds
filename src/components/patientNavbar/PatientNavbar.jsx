import React, { useState, useEffect, useRef } from 'react';
import './PatientNavbar.scss';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { FaBell, FaSearch, FaBars, FaUserAlt, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi'; // Adding globe icon for language
import { NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useLanguage } from '../../context/LanguageContext'; // Import the language hook

export const PatientNavbar = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // Added state for user menu dropdown

  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const userMenuRef = useRef(null); // Added ref for user menu dropdown

  const { language, changeLanguage, t, isRTL } = useLanguage(); // Use the language context with isRTL
  const navigate = useNavigate(); // Added navigate hook

  // Check scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) &&
        !event.target.classList.contains('mobile-search-button')) {
        setShowMobileSearch(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Medication Reminder",
      message: "Time to take your Amoxicillin (500mg)",
      time: "10 minutes ago",
      isRead: false
    },
    {
      id: 2,
      title: "Appointment Confirmation",
      message: "Your appointment with Dr. Smith is confirmed for April 22",
      time: "2 hours ago",
      isRead: true
    }
  ];

  // Handle language change
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // Toggle user menu dropdown
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
    setShowLanguageDropdown(false);
  };

  // Handle logout - remove access token and redirect
  const handleLogout = () => {
    try {
      // Remove access token from localStorage
      localStorage.removeItem('accessToken');
      // You might also want to remove other auth-related items
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Close the user menu
      setShowUserMenu(false);

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate even if there's an error removing items
      navigate('/');
    }
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <FaBars />
        </div>

        <NavLink to='/' className="logo-section">
          <img src={logo} alt="TrustMeds Logo" />
        </NavLink>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder={t('patientPage.navbar.searchPlaceholder')} />
        </div>

        <div className="mobile-search-button" onClick={() => setShowMobileSearch(!showMobileSearch)}>
          <FaSearch />
        </div>

        <div className="header-actions">
          {/* Language Selector */}
          <div className="language-wrapper" ref={languageRef}>
            <div
              className="language-icon-wrapper"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <BiGlobe className="language-icon" />
              <span className="current-language">{language.toUpperCase()}</span>
            </div>

            {showLanguageDropdown && (
              <div className="language-dropdown">
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

          <div className="notification-wrapper" ref={notificationRef}>
            <div
              className="notification-icon-wrapper"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="notification-icon" />
              <span className="notification-count">2</span>
            </div>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>{t('patientPage.navbar.notifications')}</h3>
                  <span className="mark-all-read">{t('patientPage.navbar.markAllRead')}</span>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notification-footer">
                  <button className="view-all-btn">{t('patientPage.navbar.viewAllNotifications')}</button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="user-profile-wrapper" ref={userMenuRef}>
            <div className="user-profile" onClick={toggleUserMenu}>
              <div className="user-avatar">YS</div>
              <span className="user-name">Yaman</span>
            </div>

            {showUserMenu && (
              <div className={`user-dropdown ${isRTL ? 'rtl' : ''}`}>
                <div className="user-info">
                  <div className="user-avatar large">
                    <span>YS</span>
                  </div>
                  <div className="user-details">
                    <h4>Yaman Saleh</h4>
                    <p>Patient ID: P-78945</p>
                  </div>
                </div>

                <ul className="user-menu-list">
                  <li>
                    <NavLink to="/patient/profile">
                      <FaUserAlt /> {t ? t('patientPage.navbar.myProfile') : "My Profile"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/patient/settings">
                      <FaCog /> {t ? t('patientPage.navbar.settings') : "Settings"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/patient/help">
                      <FaQuestionCircle /> {t ? t('patientPage.navbar.helpAndSupport') : "Help & Support"}
                    </NavLink>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <button
                      className="logout-button"
                      onClick={handleLogout}>
                      <FaSignOutAlt /> {t ? t('patientPage.navbar.logout') : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay" ref={searchRef}>
          <div className="mobile-search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={t('patientPage.navbar.searchPlaceholder')}
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientNavbar;