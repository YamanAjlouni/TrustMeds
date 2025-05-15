import { useState, useEffect } from 'react';
import './PharmacyProfile.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language hook
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
    // Get language context
    const { t, isRTL } = useLanguage();
    
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
            language: isRTL ? 'arabic' : 'english', // english or arabic
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
            setPasswordError(t('pharmacyPage.profile.passwordModal.errors.allFieldsRequired'));
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError(t('pharmacyPage.profile.passwordModal.errors.passwordsDoNotMatch'));
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setPasswordError(t('pharmacyPage.profile.passwordModal.errors.passwordTooShort'));
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
        return new Date(dateString).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', options);
    };

    // Format datetime for display
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')} ${t('pharmacyPage.profile.activity.at')} ${date.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}`;
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
                    <h3>{t('pharmacyPage.profile.personal.title')}</h3>
                    {!isEditing ? (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit /> {t('pharmacyPage.profile.personal.editProfile')}
                        </button>
                    ) : (
                        <div className="action-buttons">
                            <button className="cancel-btn" onClick={() => {
                                setFormData({ ...userData.personalInfo });
                                setIsEditing(false);
                            }}>
                                <FaTimes /> {t('pharmacyPage.profile.personal.cancel')}
                            </button>
                            <button className="save-btn" onClick={handleSaveProfile}>
                                <FaSave /> {t('pharmacyPage.profile.personal.saveChanges')}
                            </button>
                        </div>
                    )}
                </div>

                {saveSuccess && (
                    <div className="success-message">
                        <FaCheck className="success-icon" />
                        <span>{t('pharmacyPage.profile.personal.successMessage')}</span>
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
                            <p className="employee-id">{t('pharmacyPage.profile.personal.idPrefix')}: {userData.personalInfo.employeeId}</p>
                        </div>
                    </div>

                    <div className="profile-details">
                        {!isEditing ? (
                            <div className="details-grid">
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.fullName')}</span>
                                    <span className="detail-value">{userData.personalInfo.name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.email')}</span>
                                    <span className="detail-value with-icon">
                                        <FaEnvelope className="detail-icon" />
                                        {userData.personalInfo.email}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.phone')}</span>
                                    <span className="detail-value with-icon">
                                        <FaPhone className="detail-icon" />
                                        {userData.personalInfo.phone}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.address')}</span>
                                    <span className="detail-value">{userData.personalInfo.address}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.department')}</span>
                                    <span className="detail-value">{userData.personalInfo.department}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.supervisor')}</span>
                                    <span className="detail-value">{userData.personalInfo.supervisor}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.dateJoined')}</span>
                                    <span className="detail-value">{formatDate(userData.personalInfo.dateJoined)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('pharmacyPage.profile.personal.fields.password')}</span>
                                    <div className="password-section">
                                        <span className="password-mask">••••••••</span>
                                        <button className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
                                            {t('pharmacyPage.profile.personal.changePassword')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label htmlFor="name">{t('pharmacyPage.profile.personal.fields.fullName')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">{t('pharmacyPage.profile.personal.fields.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">{t('pharmacyPage.profile.personal.fields.phone')}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">{t('pharmacyPage.profile.personal.fields.address')}</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="department">{t('pharmacyPage.profile.personal.fields.department')}</label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="supervisor">{t('pharmacyPage.profile.personal.fields.supervisor')}</label>
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
                    <h3>{t('pharmacyPage.profile.settings.title')}</h3>
                </div>

                {saveSuccess && (
                    <div className="success-message">
                        <FaCheck className="success-icon" />
                        <span>{t('pharmacyPage.profile.settings.successMessage')}</span>
                    </div>
                )}

                <div className="settings-container">
                    <div className="settings-group">
                        <h4 className="settings-title">{t('pharmacyPage.profile.settings.language.title')}</h4>
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
                        <h4 className="settings-title">{t('pharmacyPage.profile.settings.notifications.title')}</h4>
                        <div className="notification-options">
                            <div className="notification-option">
                                <div className="option-info">
                                    <FaEnvelope className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">{t('pharmacyPage.profile.settings.notifications.options.email.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.notifications.options.email.description')}</span>
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
                                        <span className="option-title">{t('pharmacyPage.profile.settings.notifications.options.sms.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.notifications.options.sms.description')}</span>
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
                                        <span className="option-title">{t('pharmacyPage.profile.settings.notifications.options.inApp.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.notifications.options.inApp.description')}</span>
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
                        <h4 className="settings-title">{t('pharmacyPage.profile.settings.security.title')}</h4>
                        <div className="security-options">
                            <div className="security-option">
                                <div className="option-info">
                                    <FaKey className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">{t('pharmacyPage.profile.settings.security.options.password.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.security.options.password.description')}</span>
                                    </div>
                                </div>
                                <button className="option-btn" onClick={() => setShowPasswordModal(true)}>
                                    {t('pharmacyPage.profile.settings.security.options.password.action')}
                                </button>
                            </div>
                            <div className="security-option">
                                <div className="option-info">
                                    <FaShieldAlt className="option-icon" />
                                    <div className="option-text">
                                        <span className="option-title">{t('pharmacyPage.profile.settings.security.options.twoFactor.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.security.options.twoFactor.description')}</span>
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
                                        <span className="option-title">{t('pharmacyPage.profile.settings.security.options.sessionTimeout.title')}</span>
                                        <span className="option-desc">{t('pharmacyPage.profile.settings.security.options.sessionTimeout.description')}</span>
                                    </div>
                                </div>
                                <select
                                    className="timeout-select"
                                    value={userData.accountSettings.sessionTimeout}
                                    onChange={handleTimeoutChange}
                                >
                                    <option value={15}>{t('pharmacyPage.profile.settings.security.options.sessionTimeout.options.15min')}</option>
                                    <option value={30}>{t('pharmacyPage.profile.settings.security.options.sessionTimeout.options.30min')}</option>
                                    <option value={60}>{t('pharmacyPage.profile.settings.security.options.sessionTimeout.options.1hour')}</option>
                                    <option value={120}>{t('pharmacyPage.profile.settings.security.options.sessionTimeout.options.2hours')}</option>
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
                    <h3>{t('pharmacyPage.profile.activity.title')}</h3>
                </div>

                <div className="activity-container">
                    <div className="activity-card">
                        <h4 className="activity-title">{t('pharmacyPage.profile.activity.recentActivityTitle')}</h4>
                        <div className="activity-list">
                            {userData.securityActivity.map((activity) => (
                                <div className="activity-item" key={activity.id}>
                                    <div className="activity-icon-container">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-header">
                                            <span className="activity-type">
                                                {activity.type === 'login' 
                                                    ? t('pharmacyPage.profile.activity.types.login') 
                                                    : t('pharmacyPage.profile.activity.types.password')}
                                            </span>
                                            <span className="activity-date">{formatDateTime(activity.date)}</span>
                                        </div>
                                        <div className="activity-info">
                                            <span className="activity-device">{activity.device}</span>
                                            <div className="activity-location">
                                                <span>{activity.location}</span>
                                                <span className="activity-ip">{t('pharmacyPage.profile.activity.ipPrefix')}: {activity.ip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="devices-card">
                        <h4 className="devices-title">{t('pharmacyPage.profile.activity.activeSessions')}</h4>
                        <div className="device-item current">
                            <div className="device-icon">
                                <FaUserAlt />
                            </div>
                            <div className="device-details">
                                <div className="device-header">
                                    <span className="device-name">Chrome on Windows 10</span>
                                    <span className="device-status">{t('pharmacyPage.profile.activity.currentSession')}</span>
                                </div>
                                <div className="device-info">
                                    <span className="device-location">Cairo, Egypt</span>
                                    <span className="device-ip">{t('pharmacyPage.profile.activity.ipPrefix')}: 197.54.xxx.xxx</span>
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
                    <p>{t('pharmacyPage.profile.loading')}</p>
                </div>
            ) : (
                <div className="profile-container">
                    <div className="page-header">
                        <h1>{t('pharmacyPage.profile.pageTitle')}</h1>
                        <p>{t('pharmacyPage.profile.pageSubtitle')}</p>
                    </div>

                    <div className="profile-content">
                        <div className="profile-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                                onClick={() => setActiveTab('personal')}
                            >
                                <FaUserAlt className="tab-icon" />
                                <span>{t('pharmacyPage.profile.tabs.personal')}</span>
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <FaEdit className="tab-icon" />
                                <span>{t('pharmacyPage.profile.tabs.settings')}</span>
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                                onClick={() => setActiveTab('activity')}
                            >
                                <FaShieldAlt className="tab-icon" />
                                <span>{t('pharmacyPage.profile.tabs.activity')}</span>
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
                            <h3>{t('pharmacyPage.profile.passwordModal.title')}</h3>
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
                                <label htmlFor="currentPassword">{t('pharmacyPage.profile.passwordModal.fields.currentPassword')}</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">{t('pharmacyPage.profile.passwordModal.fields.newPassword')}</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">{t('pharmacyPage.profile.passwordModal.fields.confirmPassword')}</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="password-requirements">
                                <h4>{t('pharmacyPage.profile.passwordModal.requirements.title')}:</h4>
                                <ul>
                                    <li>{t('pharmacyPage.profile.passwordModal.requirements.length')}</li>
                                    <li>{t('pharmacyPage.profile.passwordModal.requirements.uppercase')}</li>
                                    <li>{t('pharmacyPage.profile.passwordModal.requirements.number')}</li>
                                    <li>{t('pharmacyPage.profile.passwordModal.requirements.special')}</li>
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
                                {t('pharmacyPage.profile.passwordModal.actions.cancel')}
                            </button>
                            <button className="save-btn" onClick={handlePasswordSubmit}>
                                {t('pharmacyPage.profile.passwordModal.actions.update')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyProfile;