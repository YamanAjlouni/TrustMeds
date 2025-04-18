import React, { useState, useEffect } from 'react';
import './PharmacyProfile.scss';
import {
    FaUserAlt,
    FaEdit,
    FaKey,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaShieldAlt,
    FaBell,
    FaSave,
    FaTimes,
    FaCheck,
    FaExclamationTriangle,
    FaCamera,
    FaSyncAlt
} from 'react-icons/fa';

const PharmacyProfile = () => {
    // State
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // User profile data - in a real app, this would come from your API/backend
    const [userData, setUserData] = useState({
        personalInfo: {
            name: 'Yara Mohammed',
            role: 'Senior Pharmacist',
            employeeId: 'EMP-7856',
            email: 'yara.mohammed@healthplus.com',
            phone: '+20 123 456 7890',
            address: '123 Cairo Medical Center, Nasr City, Cairo',
            dateJoined: '2022-06-15',
            department: 'Outpatient Pharmacy',
            supervisor: 'Dr. Ahmed Mahmoud'
        },
        accountSettings: {
            language: 'english', // english or arabic
            notifications: {
                email: true,
                sms: true,
                inApp: true
            },
            sessionTimeout: 30, // minutes
            twoFactorAuth: false
        },
        securityActivity: [
            {
                id: 1,
                type: 'login',
                device: 'Chrome on Windows 10',
                location: 'Cairo, Egypt',
                ip: '197.54.xxx.xxx',
                date: '2025-04-17T09:15:22'
            },
            {
                id: 2,
                type: 'password',
                device: 'Chrome on Windows 10',
                location: 'Cairo, Egypt',
                ip: '197.54.xxx.xxx',
                date: '2025-04-15T14:32:10'
            },
            {
                id: 3,
                type: 'login',
                device: 'Safari on iPhone',
                location: 'Cairo, Egypt',
                ip: '197.55.xxx.xxx',
                date: '2025-04-14T08:45:33'
            }
        ]
    });

    // Form fields for editing
    const [formData, setFormData] = useState({ ...userData.personalInfo });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle password input changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });

        // Clear error when typing
        if (passwordError) {
            setPasswordError('');
        }
    };

    // Handle toggling notification settings
    const handleNotificationToggle = (type) => {
        setUserData({
            ...userData,
            accountSettings: {
                ...userData.accountSettings,
                notifications: {
                    ...userData.accountSettings.notifications,
                    [type]: !userData.accountSettings.notifications[type]
                }
            }
        });
    };

    // Handle language change
    const handleLanguageChange = (language) => {
        setUserData({
            ...userData,
            accountSettings: {
                ...userData.accountSettings,
                language
            }
        });
    };

    // Handle session timeout change
    const handleTimeoutChange = (e) => {
        const value = parseInt(e.target.value);
        setUserData({
            ...userData,
            accountSettings: {
                ...userData.accountSettings,
                sessionTimeout: value
            }
        });
    };

    // Handle two-factor authentication toggle
    const handleTwoFactorToggle = () => {
        setUserData({
            ...userData,
            accountSettings: {
                ...userData.accountSettings,
                twoFactorAuth: !userData.accountSettings.twoFactorAuth
            }
        });
    };

    // Handle save profile
    const handleSaveProfile = () => {
        // In a real app, you'd send this data to your API
        setUserData({
            ...userData,
            personalInfo: formData
        });

        setIsEditing(false);
        setSaveSuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);
    };

    // Handle password change submit
    const handlePasswordSubmit = () => {
        // Validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setPasswordError('All fields are required');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        // In a real app, you'd verify the current password and update to the new one

        // Reset form and close modal
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });

        setShowPasswordModal(false);
        setSaveSuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Format datetime for display
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    // Get security activity icon
    const getActivityIcon = (type) => {
        switch (type) {
            case 'login':
                return <FaUserAlt className="activity-icon login" />;
            case 'password':
                return <FaKey className="activity-icon password" />;
            default:
                return <FaShieldAlt className="activity-icon" />;
        }
    };

    // Render Personal Information tab content
    const renderPersonalTab = () => {
        return (
            <div className="profile-content-section">
                <div className="section-header">
                    <h3>Personal Information</h3>
                    {!isEditing ? (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit /> Edit Profile
                        </button>
                    ) : (
                        <div className="action-buttons">
                            <button className="cancel-btn" onClick={() => {
                                setFormData({ ...userData.personalInfo });
                                setIsEditing(false);
                            }}>
                                <FaTimes /> Cancel
                            </button>
                            <button className="save-btn" onClick={handleSaveProfile}>
                                <FaSave /> Save Changes
                            </button>
                        </div>
                    )}
                </div>

                {saveSuccess && (
                    <div className="success-message">
                        <FaCheck className="success-icon" />
                        <span>Changes saved successfully!</span>
                    </div>
                )}

                <div className="profile-info-container">
                    <div className="profile-image-section">
                        <div className="profile-image">
                            <FaUserAlt />
                            <button className="change-photo-btn">
                                <FaCamera />
                            </button>
                        </div>
                        <div className="profile-basic-info">
                            <h3>{userData.personalInfo.name}</h3>
                            <p className="role">{userData.personalInfo.role}</p>
                            <p className="employee-id">ID: {userData.personalInfo.employeeId}</p>
                        </div>
                    </div>

                    <div className="profile-details">
                        {!isEditing ? (
                            <div className="details-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Full Name</span>
                                    <span className="detail-value">{userData.personalInfo.name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email Address</span>
                                    <span className="detail-value with-icon">
                                        <FaEnvelope className="detail-icon" />
                                        {userData.personalInfo.email}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Phone Number</span>
                                    <span className="detail-value with-icon">
                                        <FaPhone className="detail-icon" />
                                        {userData.personalInfo.phone}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Address</span>
                                    <span className="detail-value">{userData.personalInfo.address}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Department</span>
                                    <span className="detail-value">{userData.personalInfo.department}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Supervisor</span>
                                    <span className="detail-value">{userData.personalInfo.supervisor}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Date Joined</span>
                                    <span className="detail-value">{formatDate(userData.personalInfo.dateJoined)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Password</span>
                                    <div className="password-section">
                                        <span className="password-mask">••••••••</span>
                                        <button className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="department">Department</label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="supervisor">Supervisor</label>
                                    <input
                                        type="text"
                                        id="supervisor"
                                        name="supervisor"
                                        value={formData.supervisor}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Render Settings tab content
    const renderSettingsTab = () => {
        return (
            <div className="profile-content-section">
                <div className="section-header">
                    <h3>Account Settings</h3>
                </div>

                {saveSuccess && (
                    <div className="success-message">
                        <FaCheck className="success-icon" />
                        <span>Settings updated successfully!</span>
                    </div>
                )}

                <div className="settings-container">
                    <div className="settings-group">
                        <h4 className="settings-title">Interface Language</h4>
                        <div className="language-options">
                            <button
                                className={`language-btn ${userData.accountSettings.language === 'english' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('english')}
                            >
                                <FaGlobe className="language-icon" />
                                <span>English</span>
                            </button>
                            <button
                                className={`language-btn ${userData.accountSettings.language === 'arabic' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('arabic')}
                            >
                                <FaGlobe className="language-icon" />
                                <span>العربية</span>
                            </button>
                        </div>
                    </div>

                    <div className="settings-group">
                        <h4 className="settings-title">Notification Preferences</h4>
                        <div className="notification-options">
                            <div className="notification-option">
                                <div className="option-info">
                                    <FaEnvelope className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">Email Notifications</span>
                                        <span className="option-desc">Receive notifications via email</span>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={userData.accountSettings.notifications.email}
                                        onChange={() => handleNotificationToggle('email')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="notification-option">
                                <div className="option-info">
                                    <FaPhone className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">SMS Notifications</span>
                                        <span className="option-desc">Receive notifications via SMS</span>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={userData.accountSettings.notifications.sms}
                                        onChange={() => handleNotificationToggle('sms')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="notification-option">
                                <div className="option-info">
                                    <FaBell className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">In-App Notifications</span>
                                        <span className="option-desc">Receive notifications within the app</span>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={userData.accountSettings.notifications.inApp}
                                        onChange={() => handleNotificationToggle('inApp')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="settings-group">
                        <h4 className="settings-title">Security Settings</h4>
                        <div className="security-options">
                            <div className="security-option">
                                <div className="option-info">
                                    <FaKey className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">Change Password</span>
                                        <span className="option-desc">Update your account password</span>
                                    </div>
                                </div>
                                <button className="option-btn" onClick={() => setShowPasswordModal(true)}>
                                    Change
                                </button>
                            </div>
                            <div className="security-option">
                                <div className="option-info">
                                    <FaShieldAlt className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">Two-Factor Authentication</span>
                                        <span className="option-desc">Add an extra layer of security</span>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={userData.accountSettings.twoFactorAuth}
                                        onChange={handleTwoFactorToggle}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="security-option">
                                <div className="option-info">
                                    <FaSyncAlt className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">Session Timeout</span>
                                        <span className="option-desc">Time before automatic logout</span>
                                    </div>
                                </div>
                                <select
                                    className="timeout-select"
                                    value={userData.accountSettings.sessionTimeout}
                                    onChange={handleTimeoutChange}
                                >
                                    <option value={15}>15 minutes</option>
                                    <option value={30}>30 minutes</option>
                                    <option value={60}>1 hour</option>
                                    <option value={120}>2 hours</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render Activity tab content
    const renderActivityTab = () => {
        return (
            <div className="profile-content-section">
                <div className="section-header">
                    <h3>Account Activity</h3>
                </div>

                <div className="activity-container">
                    <div className="activity-card">
                        <h4 className="activity-title">Recent Security Activity</h4>
                        <div className="activity-list">
                            {userData.securityActivity.map((activity) => (
                                <div className="activity-item" key={activity.id}>
                                    <div className="activity-icon-container">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-header">
                                            <span className="activity-type">
                                                {activity.type === 'login' ? 'Account Login' : 'Password Changed'}
                                            </span>
                                            <span className="activity-date">{formatDateTime(activity.date)}</span>
                                        </div>
                                        <div className="activity-info">
                                            <span className="activity-device">{activity.device}</span>
                                            <div className="activity-location">
                                                <span>{activity.location}</span>
                                                <span className="activity-ip">IP: {activity.ip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="devices-card">
                        <h4 className="devices-title">Active Sessions</h4>
                        <div className="device-item current">
                            <div className="device-icon">
                                <FaUserAlt />
                            </div>
                            <div className="device-details">
                                <div className="device-header">
                                    <span className="device-name">Chrome on Windows 10</span>
                                    <span className="device-status">Current session</span>
                                </div>
                                <div className="device-info">
                                    <span className="device-location">Cairo, Egypt</span>
                                    <span className="device-ip">IP: 197.54.xxx.xxx</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render the appropriate tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalTab();
            case 'settings':
                return renderSettingsTab();
            case 'activity':
                return renderActivityTab();
            default:
                return renderPersonalTab();
        }
    };

    return (
        <div className="pharmacy-profile">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading profile data...</p>
                </div>
            ) : (
                <div className="profile-container">
                    <div className="page-header">
                        <h1>Profile & Settings</h1>
                        <p>Manage your account information and preferences</p>
                    </div>

                    <div className="profile-content">
                        <div className="profile-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                                onClick={() => setActiveTab('personal')}
                            >
                                <FaUserAlt className="tab-icon" />
                                <span>Personal Information</span>
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <FaEdit className="tab-icon" />
                                <span>Account Settings</span>
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                                onClick={() => setActiveTab('activity')}
                            >
                                <FaShieldAlt className="tab-icon" />
                                <span>Security Activity</span>
                            </button>
                        </div>

                        <div className="tab-content">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="password-modal">
                        <div className="modal-header">
                            <h3>Change Password</h3>
                            <button className="close-btn" onClick={() => {
                                setShowPasswordModal(false);
                                setPasswordError('');
                                setPasswordData({
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                });
                            }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="modal-content">
                            {passwordError && (
                                <div className="error-message">
                                    <FaExclamationTriangle className="error-icon" />
                                    <span>{passwordError}</span>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="password-requirements">
                                <h4>Password Requirements:</h4>
                                <ul>
                                    <li>At least 8 characters long</li>
                                    <li>Include at least one uppercase letter</li>
                                    <li>Include at least one number</li>
                                    <li>Include at least one special character</li>
                                </ul>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => {
                                setShowPasswordModal(false);
                                setPasswordError('');
                                setPasswordData({
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                });
                            }}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handlePasswordSubmit}>
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyProfile;