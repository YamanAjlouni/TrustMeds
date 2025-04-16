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

export const DoctorProfile = () => {
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
                        <h3>Edit Personal Information</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedData.firstName || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
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
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
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
                                <label>Address</label>
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
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={editedData.dateOfBirth || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={editedData.gender || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={editedData.specialization || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>License Number</label>
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
                                <label>Professional Biography</label>
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
                            Cancel
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            Save Changes
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
                        <h3>Personal Information</h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(personalInfo)}>
                            <FaEdit /> Edit
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
                                <h2 className="profile-name">Dr. {personalInfo.firstName} {personalInfo.lastName}</h2>
                                <p className="profile-specialization">{personalInfo.specialization}</p>
                                <p className="profile-license">License: {personalInfo.licenseNumber}</p>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="detail-group">
                                <div className="detail-item">
                                    <FaEnvelope className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">Email</span>
                                        <span className="detail-value">{personalInfo.email}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <FaPhone className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">Phone</span>
                                        <span className="detail-value">{personalInfo.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-group">
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">Address</span>
                                        <span className="detail-value">{personalInfo.address}</span>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <FaCalendarAlt className="detail-icon" />
                                    <div className="detail-content">
                                        <span className="detail-label">Date of Birth</span>
                                        <span className="detail-value">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="biography-section">
                                <h4>Professional Biography</h4>
                                <p>{personalInfo.biography}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <h3>Education</h3>
                        <button className="add-btn">
                            <FaEdit /> Add Education
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
                        <h3>Professional Experience</h3>
                        <button className="add-btn">
                            <FaEdit /> Add Experience
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
                        <h3>Certifications</h3>
                        <button className="add-btn">
                            <FaEdit /> Add Certification
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
                                    <p className="year">Issued: {cert.year} | Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
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
                        <h3>Edit Security Settings</h3>
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
                                    <span>Enable Two-Factor Authentication</span>
                                </label>
                                <p className="helper-text">Adds an extra layer of security to your account</p>
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
                                    <span>Receive Login Alerts</span>
                                </label>
                                <p className="helper-text">Get notified when there's a new login to your account</p>
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Change Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    className="mb-2"
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    className="mb-2"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            Cancel
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            Save Changes
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
                            <FaShieldAlt /> Account Security
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(security)}>
                            <FaEdit /> Edit
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-item">
                            <div className="item-icon secure">
                                <FaLock />
                            </div>

                            <div className="item-details">
                                <h4>Two-Factor Authentication</h4>
                                <p>Status: {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>

                                {security.twoFactorEnabled ? (
                                    <div className="status-badge success">
                                        <FaCheck /> Secure
                                    </div>
                                ) : (
                                    <div className="status-badge warning">
                                        <FaExclamationTriangle /> Not Secure
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-icon">
                                <FaBell />
                            </div>

                            <div className="item-details">
                                <h4>Login Alerts</h4>
                                <p>Status: {security.loginAlerts ? 'Enabled' : 'Disabled'}</p>

                                {security.loginAlerts ? (
                                    <div className="status-badge success">
                                        <FaCheck /> Enabled
                                    </div>
                                ) : (
                                    <div className="status-badge neutral">
                                        Disabled
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-icon">
                                <FaLock />
                            </div>

                            <div className="item-details">
                                <h4>Password</h4>
                                <p>Last changed: {new Date(security.lastPasswordChange).toLocaleDateString()}</p>

                                <button className="change-password-btn">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="security-tips">
                    <h3>Security Tips</h3>
                    <ul>
                        <li>Use a strong, unique password for your account</li>
                        <li>Enable two-factor authentication for an extra layer of security</li>
                        <li>Never share your password or account details with others</li>
                        <li>Log out when using shared or public computers</li>
                        <li>Change your password regularly, at least every 3 months</li>
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
                        <h3>Edit Notification Settings</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-section">
                            <h4>Notification Channels</h4>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="email"
                                            checked={editedData.email || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>Email Notifications</span>
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
                                        <span>SMS Notifications</span>
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
                                        <span>In-App Notifications</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        <div className="form-section">
                            <h4>Notification Types</h4>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="prescriptionAlerts"
                                            checked={editedData.prescriptionAlerts || false}
                                            onChange={handleFormChange}
                                        />
                                        <span>Prescription Alerts</span>
                                    </label>
                                    <p className="helper-text">Notifications about prescriptions that need review or have been filled</p>
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
                                        <span>Appointment Reminders</span>
                                    </label>
                                    <p className="helper-text">Notifications about upcoming appointments and schedule changes</p>
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
                                        <span>System Updates</span>
                                    </label>
                                    <p className="helper-text">Updates about new features, maintenance, and system changes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            Cancel
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            Save Changes
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
                            <FaBell /> Notification Settings
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing(notifications)}>
                            <FaEdit /> Edit
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-section">
                            <h4>Notification Channels</h4>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>Email Notifications</h4>
                                    <p>Receive notifications via email at {profileData.personalInfo.email}</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.email ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            Disabled
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>SMS Notifications</h4>
                                    <p>Receive notifications via text message on your phone</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.sms ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            Disabled
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>In-App Notifications</h4>
                                    <p>Receive notifications within the application</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.app ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            Disabled
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="settings-divider"></div>

                        <div className="settings-section">
                            <h4>Notification Types</h4>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>Prescription Alerts</h4>
                                    <p>Notifications about prescriptions that need review or have been filled</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.prescriptionAlerts ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            Disabled
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>Appointment Reminders</h4>
                                    <p>Notifications about upcoming appointments and schedule changes</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.appointmentReminders ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">
                                            Disabled
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-item">
                                <div className="item-details">
                                    <h4>System Updates</h4>
                                    <p>Updates about new features, maintenance, and system changes</p>
                                </div>

                                <div className="status-toggle">
                                    {notifications.systemUpdates ? (
                                        <div className="status-badge success">
                                            <FaCheck /> Enabled
                                        </div>
                                    ) : (
                                        <div className="status-badge neutral">Disabled
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
                        <h3>Edit Preferences</h3>
                    </div>

                    <div className="form-body">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Language</label>
                                <select
                                    name="language"
                                    value={editedData.language || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="English">English</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="French">French</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Time Zone</label>
                                <select
                                    name="timeZone"
                                    value={editedData.timeZone || ''}
                                    onChange={handleFormChange}
                                >
                                    <option value="(GMT+3) Amman">(GMT+3) Amman</option>
                                    <option value="(GMT+0) London">(GMT+0) London</option>
                                    <option value="(GMT-5) New York">(GMT-5) New York</option>
                                    <option value="(GMT+2) Cairo">(GMT+2) Cairo</option>
                                    <option value="(GMT+1) Paris">(GMT+1) Paris</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="cancel-btn" onClick={handleCancelEditing}>
                            Cancel
                        </button>
                        <button className="save-btn" onClick={handleSaveChanges}>
                            Save Changes
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
                            <FaGlobe /> Preferences
                        </h3>
                        <button className="edit-btn" onClick={() => handleStartEditing({ language, timeZone })}>
                            <FaEdit /> Edit
                        </button>
                    </div>

                    <div className="settings-body">
                        <div className="settings-item">
                            <div className="item-details">
                                <h4>Language</h4>
                                <p>Current language setting: {language}</p>
                            </div>
                        </div>

                        <div className="settings-item">
                            <div className="item-details">
                                <h4>Time Zone</h4>
                                <p>Current time zone: {timeZone}</p>
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
                    <p>Loading profile...</p>
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
                            <h2>Dr. {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h2>
                            <p>{profileData.personalInfo.specialization}</p>
                        </div>

                        <nav className="sidebar-nav">
                            <ul>
                                <li className={activeSection === 'profile' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('profile')}>
                                        <FaUserMd /> Profile
                                    </button>
                                </li>
                                <li className={activeSection === 'security' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('security')}>
                                        <FaShieldAlt /> Security
                                    </button>
                                </li>
                                <li className={activeSection === 'notifications' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('notifications')}>
                                        <FaBell /> Notifications
                                    </button>
                                </li>
                                <li className={activeSection === 'preferences' ? 'active' : ''}>
                                    <button onClick={() => handleSectionChange('preferences')}>
                                        <FaGlobe /> Preferences
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="profile-main-content">
                        <div className="content-header">
                            <h2>
                                {activeSection === 'profile' && 'Doctor Profile'}
                                {activeSection === 'security' && 'Security Settings'}
                                {activeSection === 'notifications' && 'Notification Settings'}
                                {activeSection === 'preferences' && 'Preferences'}
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