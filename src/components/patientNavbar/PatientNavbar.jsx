import React, { useState, useEffect, useRef } from 'react';
import './PatientNavbar.scss';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { FaBell, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const PatientNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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


  return (
    <header className="dashboard-header">
      <NavLink to='/' className="logo-section">
        <img src={logo} alt="" />
      </NavLink>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search for medications, doctors, or pharmacies..." />
      </div>
      <div className="header-actions">
        <div className="notification-wrapper">
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
                <h3>Notifications</h3>
                <span className="mark-all-read">Mark all as read</span>
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
                <button className="view-all-btn">View all notifications</button>
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
  );
};

export default PatientNavbar;