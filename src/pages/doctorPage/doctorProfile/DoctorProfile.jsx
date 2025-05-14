import React, { useState, useEffect } from 'react';
import './DoctorProfile.scss';
import {
    FaUserMd,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStethoscope,
    FaGraduationCap,
    FaBuilding,
    FaEdit,
    FaCamera,
    FaShieldAlt,
    FaBell,
    FaLock,
    FaGlobe,
    FaCheck,
    FaExclamationTriangle
} from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export const DoctorProfile = () => {
    const { t, isRTL } = useLanguage();
    
    // Sample data - in a real app, this would come from your API/backend
    const [profileData, setProfileData] = useState({
        personalInfo: {
            firstName: 'Mahmoud',
            lastName: 'Ahmed',
            email: 'dr.mahmoud@medconnect.com',
            phone: '+962 77 123 4567',
            address: '123 Medical Plaza, Amman, Jordan',
            dateOfBirth: '1980-05-15',
            gender: 'Male',
            specialization: 'Cardiology',
            licenseNumber: 'JMC-12345',
            biography: 'Dr. Mahmoud Ahmed is a board-certified cardiologist with over 15 years of experience in diagnosing and treating cardiovascular conditions. He specializes in preventive cardiology and heart failure management.'
        },
        education: [
            {
                degree: 'Doctor of Medicine',
                institution: 'Jordan University of Science and Technology',
                location: 'Irbid, Jordan',
                year: '2005'
            },
            {
                degree: 'Residency in Internal Medicine',
                institution: 'King Hussein Medical Center',
                location: 'Amman, Jordan',
                year: '2009'
            },
            {
                degree: 'Fellowship in Cardiology',
                institution: 'Cleveland Clinic',
                location: 'Cleveland, OH, USA',
                year: '2012'
            }
        ],
        experience: [
            {
                position: 'Senior Cardiologist',
                institution: 'Jordan Hospital',
                location: 'Amman, Jordan',
                startYear: '2017',
                endYear: 'Present',
                description: 'Leading the cardiology department and specializing in preventive cardiology and heart failure management.'
            },
            {
                position: 'Cardiologist',
                institution: 'Al-Khalidi Hospital',
                location: 'Amman, Jordan',
                startYear: '2012',
                endYear: '2017',
                description: 'Diagnosed and treated a wide range of cardiovascular conditions.'
            }
        ],
        certifications: [
            {
                name: 'Board Certification in Cardiology',
                issuingAuthority: 'Jordan Medical Board',
                year: '2013',
                expiryDate: '2028-06-30'
            },
            {
                name: 'Advanced Cardiac Life Support (ACLS)',
                issuingAuthority: 'American Heart Association',
                year: '2023',
                expiryDate: '2025-03-15'
            }
        ],
        settings: {
            security: {
                twoFactorEnabled: true,
                lastPasswordChange: '2025-01-15',
                loginAlerts: true
            },
            notifications: {
                email: true,
                sms: true,
                app: true,
                prescriptionAlerts: true,
                appointmentReminders: true,
                systemUpdates: false
            },
            language: 'English',
            timeZone: '(GMT+3) Amman'
        }
    });

    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);
    
    // Add RTL class to body when needed
    useEffect(() => {
        if (isRTL) {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
        
        return () => {
            document.body.classList.remove('rtl');
        };
    }, [isRTL]);

    // Handle section change
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setIsEditing(false);
    };

    // Start editing
    const handleStartEditing = (sectionData) => {
        setEditedData(sectionData);
        setIsEditing(true);
    };

    // Cancel editing
    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditedData({});
    };

    // Save changes
    const handleSaveChanges = () => {
        // In a real app, this would update the backend via an API call
        if (activeSection === 'profile') {
            setProfileData({
                ...profileData,
                personalInfo: editedData
            });
        } else if (activeSection === 'security') {
            setProfileData({
                ...profileData,
                settings: {
                    ...profileData.settings,
                    security: editedData
                }
            });
        } else if (activeSection === 'notifications') {
            setProfileData({
                ...profileData,
                settings: {
                    ...profileData.settings,
                    notifications: editedData
                }
            });
        } else if (activeSection === 'preferences') {
            setProfileData({
                ...profileData,
                settings: {
                    ...profileData.settings,
                    language: editedData.language,
                    timeZone: editedData.timeZone
                }
            });
        }

        setIsEditing(false);
        setEditedData({});
    };

    // Handle form field change
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedData({
            ...editedData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Render profile content
    const renderProfileContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form profile-form">
                    <div className="form-header">
                        <h3>{t('doctorPage.profile.profile.editPersonalInfo')}</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.firstName')}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedData.firstName || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.lastName')}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedData.lastName || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.phone')}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedData.phone || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>{t('doctorPage.profile.profile.address')}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editedData.address || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.dateOfBirth')}</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={editedData.dateOfBirth || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.gender')}</label>
                                <select
                                    name="gender"
                                    value={editedData.gender || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="Male">{t('doctorPage.profile.profile.genderOptions.male')}</option>
                                    <option value="Female">{t('doctorPage.profile.profile.genderOptions.female')}</option>
                                    <option value="Other">{t('doctorPage.profile.profile.genderOptions.other')}</option>
                                    <option value="Prefer not to say">{t('doctorPage.profile.profile.genderOptions.preferNotToSay')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.specialization')}</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={editedData.specialization || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('doctorPage.profile.profile.licenseNumber')}</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={editedData.licenseNumber || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>{t('doctorPage.profile.profile.biography')}</label>
                                <textarea
                                    name="biography"
                                    value={editedData.biography || ''}
                                    onChange={handleFormChange}
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            {t('doctorPage.profile.common.cancel')}
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            {t('doctorPage.profile.common.saveChanges')}
                        </button>
                    </div>
                </div>
            );
        }

        const { personalInfo, education, experience, certifications } = profileData;

        return (
            <div className="profile-content">
                <div className="profile-section">
                    <div className="section-header">
                        <h3>{t('doctorPage.profile.profile.personalInfo')}</h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(personalInfo)}>
                            <FaEdit /> {t('doctorPage.profile.common.edit')}
                        </button>
                    </div>

                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <div className="avatar-placeholder">
                                    <span>{personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}</span>
                                </div>
                                <button className="change-avatar-btn">
                                    <FaCamera />
                                </button>
                            </div>

                            <div className="profile-basic-info">
                                <h2 className="profile-name">{t('doctorPage.profile.profile.doctorTitle')} {personalInfo.firstName} {personalInfo.lastName}</h2>
                                <p className="profile-specialization">{personalInfo.specialization}</p>
                                <p className="profile-license">{t('doctorPage.profile.profile.license')}: {personalInfo.licenseNumber}</p>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="detail-group">
                                <div className="detail-item">
                                    <FaEnvelope className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">{t('doctorPage.profile.profile.email')}</span>
                                        <span className="detail-value">{personalInfo.email}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <FaPhone className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">{t('doctorPage.profile.profile.phone')}</span>
                                        <span className="detail-value">{personalInfo.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-group">
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">{t('doctorPage.profile.profile.address')}</span>
                                        <span className="detail-value">{personalInfo.address}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <FaCalendarAlt className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">{t('doctorPage.profile.profile.dateOfBirth')}</span>
                                        <span className="detail-value">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="biography-section">
                                <h4>{t('doctorPage.profile.profile.professionalBiography')}</h4>
                                <p>{personalInfo.biography}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <h3>{t('doctorPage.profile.profile.education')}</h3>
                        <button className="add-btn">
                            <FaEdit /> {t('doctorPage.profile.profile.addEducation')}
                        </button>
                    </div>

                    <div className="education-list">
                        {education.map((edu, index) => (
                            <div className="education-item" key={index}>
                                <div className="education-icon">
                                    <FaGraduationCap />
                                </div>

                                <div className="education-details">
                                    <h4>{edu.degree}</h4>
                                    <p className="institution">{edu.institution}, {edu.location}</p>
                                    <p className="year">{edu.year}</p>
                                </div>

                                <div className="item-actions">
                                    <button className="action-btn">
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <h3>{t('doctorPage.profile.profile.experience')}</h3>
                        <button className="add-btn">
                            <FaEdit /> {t('doctorPage.profile.profile.addExperience')}
                        </button>
                    </div>

                    <div className="experience-list">
                        {experience.map((exp, index) => (
                            <div className="experience-item" key={index}>
                                <div className="experience-icon">
                                    <FaBuilding />
                                </div>

                                <div className="experience-details">
                                    <h4>{exp.position}</h4>
                                    <p className="institution">{exp.institution}, {exp.location}</p>
                                    <p className="year">{exp.startYear} - {exp.endYear}</p>
                                    <p className="description">{exp.description}</p>
                                </div>

                                <div className="item-actions">
                                    <button className="action-btn">
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <h3>{t('doctorPage.profile.profile.certifications')}</h3>
                        <button className="add-btn">
                            <FaEdit /> {t('doctorPage.profile.profile.addCertification')}
                        </button>
                    </div>

                    <div className="certifications-list">
                        {certifications.map((cert, index) => (
                            <div className="certification-item" key={index}>
                                <div className="certification-icon">
                                    <FaStethoscope />
                                </div>

                                <div className="certification-details">
                                    <h4>{cert.name}</h4>
                                    <p className="authority">{cert.issuingAuthority}</p>
                                    <p className="year">{t('doctorPage.profile.profile.issued')}: {cert.year} | {t('doctorPage.profile.profile.expires')}: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                                </div>

                                <div className="item-actions">
                                    <button className="action-btn">
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Render security settings content
    const renderSecurityContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form security-form">
                    <div className="form-header">
                        <h3>{t('doctorPage.profile.security.editSecurity')}</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="twoFactorEnabled"
                                        checked={editedData.twoFactorEnabled || false}
                                        onChange={handleFormChange}
                                    />
                                    <span>{t('doctorPage.profile.security.enableTwoFactor')}</span>
                                </label>
                                <p className="helper-text">{t('doctorPage.profile.security.twoFactorHelp')}</p>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="loginAlerts"
                                        checked={editedData.loginAlerts || false}
                                        onChange={handleFormChange}
                                    />
                                    <span>{t('doctorPage.profile.security.receiveLoginAlerts')}</span>
                                </label>
                                <p className="helper-text">{t('doctorPage.profile.security.loginAlertsHelp')}</p>
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.security.changePassword')}</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder={t('doctorPage.profile.security.currentPassword')}
                                    className="mb-2"
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder={t('doctorPage.profile.security.newPassword')}
                                    className="mb-2"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder={t('doctorPage.profile.security.confirmPassword')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            {t('doctorPage.profile.common.cancel')}
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            {t('doctorPage.profile.common.saveChanges')}
                        </button>
                    </div>
                </div>
            );
        }

        const { security } = profileData.settings;

        return (
            <div className="settings-content security-content">
                <div className="settings-card">
                    <div className="settings-header">
                        <h3>
                            <FaShieldAlt /> {t('doctorPage.profile.security.accountSecurity')}
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(security)}>
                            <FaEdit /> {t('doctorPage.profile.common.edit')}
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-item">
                            <div className="item-icon secure">
                                <FaLock />
                            </div>

                            <div className="item-details">
                                <h4>{t('doctorPage.profile.security.twoFactorAuth')}</h4>
                                <p>{t('doctorPage.profile.security.status')}: {security.twoFactorEnabled ? t('doctorPage.profile.security.enabled') : t('doctorPage.security.disabled')}</p>

                                {security.twoFactorEnabled ? (
                                    <div className="status-badge success">
                                        <FaCheck /> {t('doctorPage.profile.security.secure')}
                                    </div>
                                ) : (
                                    <div className="status-badge warning">
                                        <FaExclamationTriangle /> {t('doctorPage.profile.security.notSecure')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-icon">
                                <FaBell />
                            </div>

                            <div className="item-details">
                                <h4>{t('doctorPage.profile.security.loginAlerts')}</h4>
                                <p>{t('doctorPage.profile.security.status')}: {security.loginAlerts ? t('doctorPage.profile.security.enabled') : t('doctorPage.security.disabled')}</p>

                                {security.loginAlerts ? (
                                    <div className="status-badge success">
                                        <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                    </div>
                                ) : (
                                    <div className="status-badge neutral">
                                        {t('doctorPage.profile.security.disabled')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-icon">
                                <FaLock />
                            </div>

                            <div className="item-details">
                                <h4>{t('doctorPage.profile.security.password')}</h4>
                                <p>{t('doctorPage.profile.security.lastChanged')}: {new Date(security.lastPasswordChange).toLocaleDateString()}</p>

                                <button className="change-password-btn">
                                    {t('doctorPage.profile.security.changePassword')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="security-tips">
                    <h3>{t('doctorPage.profile.security.securityTips')}</h3>
                    <ul>
                        <li>{t('doctorPage.profile.security.tips.strongPassword')}</li>
                        <li>{t('doctorPage.profile.security.tips.enableTwoFactor')}</li>
                        <li>{t('doctorPage.profile.security.tips.neverShare')}</li>
                        <li>{t('doctorPage.profile.security.tips.logOut')}</li>
                        <li>{t('doctorPage.profile.security.tips.changeRegularly')}</li>
                    </ul>
                </div>
            </div>
        );
    };

    // Render notification settings content
    const renderNotificationsContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form notifications-form">
                    <div className="form-header">
                        <h3>{t('doctorPage.profile.notifications.editNotifications')}</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-section">
                            <h4>{t('doctorPage.profile.notifications.channels')}</h4>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="email"
                                            checked={editedData.email || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.emailNotifications')}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="sms"
                                            checked={editedData.sms || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.smsNotifications')}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="app"
                                            checked={editedData.app || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.appNotifications')}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        <div className="form-section">
                            <h4>{t('doctorPage.profile.notifications.types')}</h4>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="prescriptionAlerts"
                                            checked={editedData.prescriptionAlerts || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.prescriptionAlerts')}</span>
                                    </label>
                                    <p className="helper-text">{t('doctorPage.profile.notifications.prescriptionAlertsHelp')}</p>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="appointmentReminders"
                                            checked={editedData.appointmentReminders || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.appointmentReminders')}</span>
                                    </label>
                                    <p className="helper-text">{t('doctorPage.profile.notifications.appointmentRemindersHelp')}</p>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="systemUpdates"
                                            checked={editedData.systemUpdates || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>{t('doctorPage.profile.notifications.systemUpdates')}</span>
                                    </label>
                                    <p className="helper-text">{t('doctorPage.profile.notifications.systemUpdatesHelp')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            {t('doctorPage.profile.common.cancel')}
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            {t('doctorPage.profile.common.saveChanges')}
                        </button>
                    </div>
                </div>
            );
        }

        const { notifications } = profileData.settings;

        return (
            <div className="settings-content notifications-content">
                <div className="settings-card">
                    <div className="settings-header">
                        <h3>
                            <FaBell /> {t('doctorPage.profile.notifications.settings')}
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(notifications)}>
                            <FaEdit /> {t('doctorPage.profile.common.edit')}
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-section">
                            <h4>{t('doctorPage.profile.notifications.channels')}</h4>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.emailNotifications')}</h4>
                                    <p>{t('doctorPage.profile.notifications.receiveViaEmail', { email: profileData.personalInfo.email })}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.email ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.smsNotifications')}</h4>
                                    <p>{t('doctorPage.profile.notifications.receiveViaSms')}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.sms ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.appNotifications')}</h4>
                                    <p>{t('doctorPage.profile.notifications.receiveViaApp')}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.app ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="settings-divider"></div>

                        <div className="settings-section">
                            <h4>{t('doctorPage.profile.notifications.types')}</h4>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.prescriptionAlerts')}</h4>
                                    <p>{t('doctorPage.profile.notifications.prescriptionAlertsHelp')}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.prescriptionAlerts ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.appointmentReminders')}</h4>
                                    <p>{t('doctorPage.profile.notifications.appointmentRemindersHelp')}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.appointmentReminders ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>{t('doctorPage.profile.notifications.systemUpdates')}</h4>
                                    <p>{t('doctorPage.profile.notifications.systemUpdatesHelp')}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.systemUpdates ? (
                                        <div className="status-badge success">
                                            <FaCheck /> {t('doctorPage.profile.security.enabled')}
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            {t('doctorPage.profile.security.disabled')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render preferences content
    const renderPreferencesContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form preferences-form">
                    <div className="form-header">
                        <h3>{t('doctorPage.profile.preferences.editPreferences')}</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.preferences.language')}</label>
                                <select
                                    name="language"
                                    value={editedData.language || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="English">{t('doctorPage.profile.preferences.languages.english')}</option>
                                    <option value="Arabic">{t('doctorPage.profile.preferences.languages.arabic')}</option>
                                    <option value="French">{t('doctorPage.profile.preferences.languages.french')}</option>
                                    <option value="Spanish">{t('doctorPage.profile.preferences.languages.spanish')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('doctorPage.profile.preferences.timeZone')}</label>
                                <select
                                    name="timeZone"
                                    value={editedData.timeZone || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="(GMT+3) Amman">{t('doctorPage.profile.preferences.timeZones.amman')}</option>
                                    <option value="(GMT+0) London">{t('doctorPage.profile.preferences.timeZones.london')}</option>
                                    <option value="(GMT-5) New York">{t('doctorPage.profile.preferences.timeZones.newYork')}</option>
                                    <option value="(GMT+2) Cairo">{t('doctorPage.profile.preferences.timeZones.cairo')}</option>
                                    <option value="(GMT+1) Paris">{t('doctorPage.profile.preferences.timeZones.paris')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            {t('doctorPage.profile.common.cancel')}
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            {t('doctorPage.profile.common.saveChanges')}
                        </button>
                    </div>
                </div>
            );
        }

        const { language, timeZone } = profileData.settings;

        return (
            <div className="settings-content preferences-content">
                <div className="settings-card">
                    <div className="settings-header">
                        <h3>
                            <FaGlobe /> {t('doctorPage.profile.preferences.title')}
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing({ language, timeZone })}>
                            <FaEdit /> {t('doctorPage.profile.common.edit')}
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-item">
                            <div className="item-details">
                                <h4>{t('doctorPage.profile.preferences.language')}</h4>
                                <p>{t('doctorPage.profile.preferences.currentLanguage')}: {language}</p>
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-details">
                                <h4>{t('doctorPage.profile.preferences.timeZone')}</h4>
                                <p>{t('doctorPage.profile.preferences.currentTimeZone')}: {timeZone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Main component render
    return (
        <div className="doctor-profile-container">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('doctorPage.profile.profile.loading')}</p>
                </div>
            ) : (
                <>
                    <div className="profile-sidebar">
                        <div className="sidebar-header">
                            <div className="doctor-avatar">
                                <div className="avatar-placeholder">
                                    <span>{profileData.personalInfo.firstName.charAt(0)}{profileData.personalInfo.lastName.charAt(0)}</span>
                                </div>
                            </div>
                            <h2>{t('doctorPage.profile.profile.doctorTitle')} {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h2>
                            <p>{profileData.personalInfo.specialization}</p>
                        </div>

                        <nav className="sidebar-nav">
                            <ul>
                                <li className={activeSection === 'profile' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('profile')}>
                                        <FaUserMd /> {t('doctorPage.profile.profile.title')}
                                    </button>
                                </li>
                                <li className={activeSection === 'security' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('security')}>
                                        <FaShieldAlt /> {t('doctorPage.profile.security.title')}
                                    </button>
                                </li>
                                <li className={activeSection === 'notifications' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('notifications')}>
                                        <FaBell /> {t('doctorPage.profile.notifications.title')}
                                    </button>
                                </li>
                                <li className={activeSection === 'preferences' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('preferences')}>
                                        <FaGlobe /> {t('doctorPage.profile.preferences.title')}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="profile-main-content">
                        <div className="content-header">
                            <h2>
                                {activeSection === 'profile' && t('doctorPage.profile.profile.heading')}
                                {activeSection === 'security' && t('doctorPage.profile.security.heading')}
                                {activeSection === 'notifications' && t('doctorPage.profile.notifications.heading')}
                                {activeSection === 'preferences' && t('doctorPage.profile.preferences.heading')}
                            </h2>
                        </div>

                        <div className="content-body">
                            {activeSection === 'profile' && renderProfileContent()}
                            {activeSection === 'security' && renderSecurityContent()}
                            {activeSection === 'notifications' && renderNotificationsContent()}
                            {activeSection === 'preferences' && renderPreferencesContent()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorProfile;