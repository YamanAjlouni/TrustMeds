import React, { useState, useEffect, useRef } from 'react';
import './PatientNavbar.scss';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { FaBell, FaSearch, FaBars } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi'; // Adding globe icon for language
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Import the language hook

export const PatientNavbar = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const { language, changeLanguage, t } = useLanguage(); // Use the language context

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
          <div className="user-profile">
            <div className="user-avatar">YS</div>
            <span className="user-name">Yaman</span>
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