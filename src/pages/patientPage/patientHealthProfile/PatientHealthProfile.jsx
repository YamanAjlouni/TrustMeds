import React, { useState, useEffect } from 'react';
import {
    FaUserAlt,
    FaAllergies,
    FaNotesMedical,
    FaFileAlt,
    FaIdCard,
    FaPencilAlt,
    FaCheck,
    FaTimes,
    FaShieldAlt,
    FaHistory,
    FaExclamationTriangle,
    FaDownload,
    FaBell,
    FaExclamationCircle
} from 'react-icons/fa';
import './PatientHealthProfile.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Adjust path as needed

export const PatientHealthProfile = () => {
    // Use the language context
    const { t, isRTL, language } = useLanguage();

    // Translation prefix to simplify access
    const prefix = 'patientPage.healthProfile.patientHealthProfile';

    // Sample data with both languages - in a real app, this would come from your API/backend
    const [personalInfo, setPersonalInfo] = useState({
        firstName: 'Yaman',
        lastName: 'Ajlouni',
        dateOfBirth: '1990-06-15',
        genderEn: 'Male',
        genderAr: 'ذكر',
        bloodType: 'O+',
        height: '180 cm',
        weight: '75 kg',
        emailAddress: 'yaman.ajlouni@example.com',
        phoneNumber: '(555) 123-4567',
        address: '123 Main Street, Anytown, CA 12345',
        emergencyContact: {
            name: 'Sarah Ajlouni',
            relationshipEn: 'Spouse',
            relationshipAr: 'زوجة',
            phoneNumber: '(555) 987-6543'
        }
    });

    const [allergies, setAllergies] = useState([
        {
            id: 1,
            allergenEn: 'Penicillin',
            allergenAr: 'البنسلين',
            severityEn: 'High',
            severityAr: 'عالية',
            reactionEn: 'Hives, difficulty breathing',
            reactionAr: 'طفح جلدي، صعوبة في التنفس',
            diagnosedDate: '2015-03-20',
            notesEn: 'Avoid all penicillin-based antibiotics',
            notesAr: 'تجنب جميع المضادات الحيوية التي تحتوي على البنسلين'
        },
        {
            id: 2,
            allergenEn: 'Peanuts',
            allergenAr: 'الفول السوداني',
            severityEn: 'Moderate',
            severityAr: 'متوسطة',
            reactionEn: 'Skin rash, swelling',
            reactionAr: 'طفح جلدي، تورم',
            diagnosedDate: '2010-08-12',
            notesEn: 'Avoid all peanut products',
            notesAr: 'تجنب جميع منتجات الفول السوداني'
        }
    ]);

    const [medicalConditions, setMedicalConditions] = useState([
        {
            id: 1,
            conditionEn: 'Hypertension',
            conditionAr: 'ارتفاع ضغط الدم',
            diagnosedDate: '2018-05-10',
            treatingPhysicianEn: 'Dr. Smith',
            treatingPhysicianAr: 'د. سميث',
            statusEn: 'Active',
            statusAr: 'نشط',
            notesEn: 'Controlled with medication',
            notesAr: 'تحت السيطرة بالأدوية'
        },
        {
            id: 2,
            conditionEn: 'Asthma',
            conditionAr: 'الربو',
            diagnosedDate: '2005-11-23',
            treatingPhysicianEn: 'Dr. Johnson',
            treatingPhysicianAr: 'د. جونسون',
            statusEn: 'Active',
            statusAr: 'نشط',
            notesEn: 'Mild, exercise-induced',
            notesAr: 'خفيف، ناتج عن ممارسة الرياضة'
        }
    ]);

    const [insuranceInfo, setInsuranceInfo] = useState({
        providerEn: 'HealthPlus Insurance',
        providerAr: 'تأمين هيلث بلس',
        policyNumber: 'HP-12345678',
        groupNumber: 'G-9876543',
        memberId: 'M-12345-67',
        startDate: '2023-01-01',
        coverageTypeEn: 'Family',
        coverageTypeAr: 'عائلي',
        primaryCardholder: 'Yaman Ajlouni',
        relationshipEn: 'Self',
        relationshipAr: 'نفسه',
        copay: {
            primaryCare: '$20',
            specialist: '$40',
            emergency: '$150',
            prescription: '$10/$30/$50'
        }
    });

    const [medicalHistory, setMedicalHistory] = useState([
        {
            id: 1,
            typeEn: 'Surgery',
            typeAr: 'جراحة',
            procedureEn: 'Appendectomy',
            procedureAr: 'استئصال الزائدة الدودية',
            date: '2012-07-15',
            providerEn: 'General Hospital',
            providerAr: 'المستشفى العام',
            physicianEn: 'Dr. Williams',
            physicianAr: 'د. ويليامز',
            notesEn: 'No complications',
            notesAr: 'بدون مضاعفات'
        },
        {
            id: 2,
            typeEn: 'Hospitalization',
            typeAr: 'دخول المستشفى',
            procedureEn: 'Pneumonia treatment',
            procedureAr: 'علاج الالتهاب الرئوي',
            date: '2016-02-03',
            providerEn: 'County Medical Center',
            providerAr: 'المركز الطبي للمقاطعة',
            physicianEn: 'Dr. Martinez',
            physicianAr: 'د. مارتينيز',
            notesEn: '5-day stay, full recovery',
            notesAr: 'إقامة 5 أيام، تعافي كامل'
        }
    ]);

    // Helper function to get the correct language field
    const getLangField = (obj, field) => {
        const langSuffix = language === 'ar' ? 'Ar' : 'En';
        return obj[field + langSuffix] || obj[field];
    };

    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsEditing(false);
    };

    const startEditing = (data) => {
        setEditedData(data);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedData({});
    };

    const saveChanges = () => {
        // In a real app, this would send the updated data to your backend
        // For now, we'll just update the state directly
        switch (activeTab) {
            case 'personal':
                setPersonalInfo(editedData);
                break;
            case 'allergies':
                if (editedData.id) {
                    setAllergies(allergies.map(allergy =>
                        allergy.id === editedData.id ? editedData : allergy
                    ));
                } else {
                    setAllergies([...allergies, { ...editedData, id: allergies.length + 1 }]);
                }
                break;
            case 'conditions':
                if (editedData.id) {
                    setMedicalConditions(medicalConditions.map(condition =>
                        condition.id === editedData.id ? editedData : condition
                    ));
                } else {
                    setMedicalConditions([...medicalConditions, { ...editedData, id: medicalConditions.length + 1 }]);
                }
                break;
            case 'insurance':
                setInsuranceInfo(editedData);
                break;
            case 'history':
                if (editedData.id) {
                    setMedicalHistory(medicalHistory.map(record =>
                        record.id === editedData.id ? editedData : record
                    ));
                } else {
                    setMedicalHistory([...medicalHistory, { ...editedData, id: medicalHistory.length + 1 }]);
                }
                break;
            default:
                break;
        }
        setIsEditing(false);
        setEditedData({});
    };

    const renderPersonalInfoContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form personal-info-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.firstName`)}</label>
                            <input
                                type="text"
                                value={editedData.firstName || ''}
                                onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.lastName`)}</label>
                            <input
                                type="text"
                                value={editedData.lastName || ''}
                                onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.dateOfBirth`)}</label>
                            <input
                                type="date"
                                value={editedData.dateOfBirth || ''}
                                onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.gender`)}</label>
                            <select
                                value={editedData[`gender${language === 'ar' ? 'Ar' : 'En'}`] || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    genderEn: language === 'en' ? e.target.value : editedData.genderEn,
                                    genderAr: language === 'ar' ? e.target.value : editedData.genderAr
                                })}
                            >
                                <option value={language === 'en' ? 'Male' : 'ذكر'}>
                                    {t(`${prefix}.personalInfo.genderOptions.male`)}
                                </option>
                                <option value={language === 'en' ? 'Female' : 'أنثى'}>
                                    {t(`${prefix}.personalInfo.genderOptions.female`)}
                                </option>
                                <option value={language === 'en' ? 'Other' : 'أخرى'}>
                                    {t(`${prefix}.personalInfo.genderOptions.other`)}
                                </option>
                                <option value={language === 'en' ? 'Prefer not to say' : 'أفضل عدم الذكر'}>
                                    {t(`${prefix}.personalInfo.genderOptions.preferNotToSay`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.bloodType`)}</label>
                            <select
                                value={editedData.bloodType || ''}
                                onChange={(e) => setEditedData({ ...editedData, bloodType: e.target.value })}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.height`)}</label>
                            <input
                                type="text"
                                value={editedData.height || ''}
                                onChange={(e) => setEditedData({ ...editedData, height: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.weight`)}</label>
                            <input
                                type="text"
                                value={editedData.weight || ''}
                                onChange={(e) => setEditedData({ ...editedData, weight: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.contactInfo.email`)}</label>
                            <input
                                type="email"
                                value={editedData.emailAddress || ''}
                                onChange={(e) => setEditedData({ ...editedData, emailAddress: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.contactInfo.phone`)}</label>
                            <input
                                type="tel"
                                value={editedData.phoneNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.personalInfo.contactInfo.address`)}</label>
                            <input
                                type="text"
                                value={editedData.address || ''}
                                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <h4 className="section-subheading">{t(`${prefix}.personalInfo.emergencyContact.title`)}</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.emergencyContact.name`)}</label>
                            <input
                                type="text"
                                value={editedData.emergencyContact?.name || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    emergencyContact: { ...(editedData.emergencyContact || {}), name: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.emergencyContact.relationship`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData.emergencyContact || {}, 'relationship') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'relationshipAr' : 'relationshipEn';
                                    setEditedData({
                                        ...editedData,
                                        emergencyContact: {
                                            ...(editedData.emergencyContact || {}),
                                            [langField]: e.target.value
                                        }
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.emergencyContact.phone`)}</label>
                            <input
                                type="tel"
                                value={editedData.emergencyContact?.phoneNumber || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    emergencyContact: { ...(editedData.emergencyContact || {}), phoneNumber: e.target.value }
                                })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {t(`${prefix}.buttons.save`)}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display personal-info-display">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUserAlt />
                    </div>
                    <div className="profile-name">
                        <h3>{personalInfo.firstName} {personalInfo.lastName}</h3>
                        <p className="profile-subtitle">{t(`${prefix}.personalInfo.patientId`)}: PT-12345678</p>
                    </div>
                    <div className="profile-actions">
                        <button className="edit-btn" onClick={() => startEditing({ ...personalInfo })}>
                            <FaPencilAlt /> {t(`${prefix}.buttons.editProfile`)}
                        </button>
                    </div>
                </div>

                <div className="alert-box">
                    <FaExclamationCircle className="alert-box-icon" />
                    <div className="alert-box-content">
                        <h4>{t(`${prefix}.personalInfo.alertTitle`)}</h4>
                        <p>{t(`${prefix}.personalInfo.alertMessage`)}</p>
                    </div>
                    <button className="alert-box-action">{t(`${prefix}.buttons.scheduleNow`)}</button>
                </div>

                <div className="info-grid">
                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.personalDetails.title`)}</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.dateOfBirth`)}</span>
                                <span className="info-value">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.age`)}</span>
                                <span className="info-value">{new Date().getFullYear() - new Date(personalInfo.dateOfBirth).getFullYear()} {t(`${prefix}.personalInfo.personalDetails.years`)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.gender`)}</span>
                                <span className="info-value">{getLangField(personalInfo, 'gender')}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.bloodType`)}</span>
                                <span className="info-value">{personalInfo.bloodType}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.height`)}</span>
                                <span className="info-value">{personalInfo.height}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.weight`)}</span>
                                <span className="info-value">{personalInfo.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.contactInfo.title`)}</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.email`)}</span>
                                <span className="info-value">{personalInfo.emailAddress}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.phone`)}</span>
                                <span className="info-value">{personalInfo.phoneNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.address`)}</span>
                                <span className="info-value">{personalInfo.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.emergencyContact.title`)}</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.emergencyContact.name`)}</span>
                                <span className="info-value">{personalInfo.emergencyContact.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.emergencyContact.relationship`)}</span>
                                <span className="info-value">{getLangField(personalInfo.emergencyContact, 'relationship')}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.emergencyContact.phone`)}</span>
                                <span className="info-value">{personalInfo.emergencyContact.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="biometric-summary">
                    <h4 className="summary-title">{t(`${prefix}.personalInfo.biometricSummary.title`)}</h4>
                    <div className="biometric-grid">
                        <div className="biometric-item">
                            <div className="biometric-value">120/80</div>
                            <div className="biometric-label">{t(`${prefix}.personalInfo.biometricSummary.bloodPressure`)}</div>
                            <div className="trend normal">{t(`${prefix}.personalInfo.biometricSummary.normal`)}</div>
                        </div>
                        <div className="biometric-item">
                            <div className="biometric-value">72</div>
                            <div className="biometric-label">{t(`${prefix}.personalInfo.biometricSummary.heartRate`)}</div>
                            <div className="trend normal">{t(`${prefix}.personalInfo.biometricSummary.normal`)}</div>
                        </div>
                        <div className="biometric-item">
                            <div className="biometric-value">98.6°F</div>
                            <div className="biometric-label">{t(`${prefix}.personalInfo.biometricSummary.temperature`)}</div>
                            <div className="trend normal">{t(`${prefix}.personalInfo.biometricSummary.normal`)}</div>
                        </div>
                        <div className="biometric-item">
                            <div className="biometric-value">23.1</div>
                            <div className="biometric-label">{t(`${prefix}.personalInfo.biometricSummary.bmi`)}</div>
                            <div className="trend normal">{t(`${prefix}.personalInfo.biometricSummary.normal`)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAllergiesContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form allergies-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.allergen`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'allergen') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'allergenAr' : 'allergenEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.allergies.form.severity`)}</label>
                            <select
                                value={getLangField(editedData, 'severity') || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const severityMap = {
                                        'Low': 'منخفضة',
                                        'Moderate': 'متوسطة',
                                        'High': 'عالية',
                                        'Severe': 'شديدة',
                                        'منخفضة': 'Low',
                                        'متوسطة': 'Moderate',
                                        'عالية': 'High',
                                        'شديدة': 'Severe'
                                    };

                                    setEditedData({
                                        ...editedData,
                                        severityEn: language === 'en' ? value : severityMap[value],
                                        severityAr: language === 'ar' ? value : severityMap[value]
                                    });
                                }}
                            >
                                <option value={language === 'en' ? 'Low' : 'منخفضة'}>
                                    {t(`${prefix}.allergies.severity.low`)}
                                </option>
                                <option value={language === 'en' ? 'Moderate' : 'متوسطة'}>
                                    {t(`${prefix}.allergies.severity.moderate`)}
                                </option>
                                <option value={language === 'en' ? 'High' : 'عالية'}>
                                    {t(`${prefix}.allergies.severity.high`)}
                                </option>
                                <option value={language === 'en' ? 'Severe' : 'شديدة'}>
                                    {t(`${prefix}.allergies.severity.severe`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.allergies.form.diagnosedDate`)}</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.reaction`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'reaction') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'reactionAr' : 'reactionEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.notes`)}</label>
                            <textarea
                                value={getLangField(editedData, 'notes') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'notesAr' : 'notesEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {t(editedData.id ? `${prefix}.buttons.updateAllergy` : `${prefix}.buttons.addAllergy`)}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display allergies-display">
                <div className="section-header">
                    <div className="section-title-wrapper">
                        <h3>{t(`${prefix}.allergies.sectionTitle`)}</h3>
                        <p className="section-subtitle">{t(`${prefix}.allergies.sectionSubtitle`)}</p>
                    </div>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + {t(`${prefix}.buttons.addAllergy`)}
                    </button>
                </div>

                {allergies.length === 0 ? (
                    <div className="empty-state">
                        <FaAllergies className="empty-icon" />
                        <p>{t(`${prefix}.allergies.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addAllergy`)}
                        </button>
                    </div>
                ) : (
                    <div className="allergies-list">
                        {allergies.map(allergy => (
                            <div className="allergy-card" key={allergy.id}>
                                <div className="allergy-header">
                                    <div className="allergy-title">
                                        <h4>{getLangField(allergy, 'allergen')}</h4>
                                        <span className={`severity-badge severity-${allergy.severityEn.toLowerCase()}`}>
                                            {t(`${prefix}.allergies.severity.${allergy.severityEn.toLowerCase()}`)} {t(`${prefix}.allergies.form.severity`)}
                                        </span>
                                    </div>
                                    <button className="edit-btn small" onClick={() => startEditing({ ...allergy })}>
                                        <FaPencilAlt />
                                    </button>
                                </div>
                                <div className="allergy-details">
                                    <div className="allergy-item">
                                        <span className="allergy-label">{t(`${prefix}.allergies.details.reaction`)}:</span>
                                        <span className="allergy-value">{getLangField(allergy, 'reaction')}</span>
                                    </div>
                                    <div className="allergy-item">
                                        <span className="allergy-label">{t(`${prefix}.allergies.details.diagnosed`)}:</span>
                                        <span className="allergy-value">{new Date(allergy.diagnosedDate).toLocaleDateString()}</span>
                                    </div>
                                    {allergy.notesEn && (
                                        <div className="allergy-item notes">
                                            <span className="allergy-label">{t(`${prefix}.allergies.details.notes`)}:</span>
                                            <span className="allergy-value">{getLangField(allergy, 'notes')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderMedicalConditionsContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form conditions-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.condition`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'condition') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'conditionAr' : 'conditionEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalConditions.form.diagnosedDate`)}</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalConditions.form.status`)}</label>
                            <select
                                value={getLangField(editedData, 'status') || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const statusMap = {
                                        'Active': 'نشط',
                                        'Resolved': 'تم حله',
                                        'In Remission': 'في طور الهدوء',
                                        'Chronic': 'مزمن',
                                        'نشط': 'Active',
                                        'تم حله': 'Resolved',
                                        'في طور الهدوء': 'In Remission',
                                        'مزمن': 'Chronic'
                                    };

                                    setEditedData({
                                        ...editedData,
                                        statusEn: language === 'en' ? value : statusMap[value],
                                        statusAr: language === 'ar' ? value : statusMap[value]
                                    });
                                }}
                            >
                                <option value={language === 'en' ? 'Active' : 'نشط'}>
                                    {t(`${prefix}.medicalConditions.status.active`)}
                                </option>
                                <option value={language === 'en' ? 'Resolved' : 'تم حله'}>
                                    {t(`${prefix}.medicalConditions.status.resolved`)}
                                </option>
                                <option value={language === 'en' ? 'In Remission' : 'في طور الهدوء'}>
                                    {t(`${prefix}.medicalConditions.status.inRemission`)}
                                </option>
                                <option value={language === 'en' ? 'Chronic' : 'مزمن'}>
                                    {t(`${prefix}.medicalConditions.status.chronic`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.treatingPhysician`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'treatingPhysician') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'treatingPhysicianAr' : 'treatingPhysicianEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.notes`)}</label>
                            <textarea
                                value={getLangField(editedData, 'notes') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'notesAr' : 'notesEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {t(editedData.id ? `${prefix}.buttons.updateCondition` : `${prefix}.buttons.addCondition`)}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display conditions-display">
                <div className="section-header">
                    <div className="section-title-wrapper">
                        <h3>{t(`${prefix}.medicalConditions.sectionTitle`)}</h3>
                        <p className="section-subtitle">{t(`${prefix}.medicalConditions.sectionSubtitle`)}</p>
                    </div>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + {t(`${prefix}.buttons.addCondition`)}
                    </button>
                </div>

                {medicalConditions.length === 0 ? (
                    <div className="empty-state">
                        <FaNotesMedical className="empty-icon" />
                        <p>{t(`${prefix}.medicalConditions.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addCondition`)}
                        </button>
                    </div>
                ) : (
                    <div className="conditions-list">
                        {medicalConditions.map(condition => (
                            <div className="condition-card" key={condition.id}>
                                <div className="condition-header">
                                    <div className="condition-title">
                                        <h4>{getLangField(condition, 'condition')}</h4>
                                        <span className={`status-badge status-${condition.statusEn.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {t(`${prefix}.medicalConditions.status.${condition.statusEn.toLowerCase().replace(/\s+/g, '')}`)}
                                        </span>
                                    </div>
                                    <button className="edit-btn small" onClick={() => startEditing({ ...condition })}>
                                        <FaPencilAlt />
                                    </button>
                                </div>
                                <div className="condition-details">
                                    <div className="condition-item">
                                        <span className="condition-label">{t(`${prefix}.medicalConditions.details.diagnosed`)}:</span>
                                        <span className="condition-value">{new Date(condition.diagnosedDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="condition-item">
                                        <span className="condition-label">{t(`${prefix}.medicalConditions.details.physician`)}:</span>
                                        <span className="condition-value">{getLangField(condition, 'treatingPhysician')}</span>
                                    </div>
                                    {condition.notesEn && (
                                        <div className="condition-item notes">
                                            <span className="condition-label">{t(`${prefix}.medicalConditions.details.notes`)}:</span>
                                            <span className="condition-value">{getLangField(condition, 'notes')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderInsuranceContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form insurance-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.insuranceInfo.form.provider`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'provider') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'providerAr' : 'providerEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.policyNumber`)}</label>
                            <input
                                type="text"
                                value={editedData.policyNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, policyNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.groupNumber`)}</label>
                            <input
                                type="text"
                                value={editedData.groupNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, groupNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.memberId`)}</label>
                            <input
                                type="text"
                                value={editedData.memberId || ''}
                                onChange={(e) => setEditedData({ ...editedData, memberId: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.startDate`)}</label>
                            <input
                                type="date"
                                value={editedData.startDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.coverageType`)}</label>
                            <select
                                value={getLangField(editedData, 'coverageType') || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const coverageTypeMap = {
                                        'Individual': 'فردي',
                                        'Family': 'عائلي',
                                        'Group': 'جماعي',
                                        'فردي': 'Individual',
                                        'عائلي': 'Family',
                                        'جماعي': 'Group'
                                    };

                                    setEditedData({
                                        ...editedData,
                                        coverageTypeEn: language === 'en' ? value : coverageTypeMap[value],
                                        coverageTypeAr: language === 'ar' ? value : coverageTypeMap[value]
                                    });
                                }}
                            >
                                <option value={language === 'en' ? 'Individual' : 'فردي'}>
                                    {t(`${prefix}.insuranceInfo.coverageTypes.individual`)}
                                </option>
                                <option value={language === 'en' ? 'Family' : 'عائلي'}>
                                    {t(`${prefix}.insuranceInfo.coverageTypes.family`)}
                                </option>
                                <option value={language === 'en' ? 'Group' : 'جماعي'}>
                                    {t(`${prefix}.insuranceInfo.coverageTypes.group`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.primaryCardholder`)}</label>
                            <input
                                type="text"
                                value={editedData.primaryCardholder || ''}
                                onChange={(e) => setEditedData({ ...editedData, primaryCardholder: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.relationship`)}</label>
                            <select
                                value={getLangField(editedData, 'relationship') || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const relationshipMap = {
                                        'Self': 'نفسه',
                                        'Spouse': 'زوج/ة',
                                        'Child': 'طفل',
                                        'Other': 'أخرى',
                                        'نفسه': 'Self',
                                        'زوج/ة': 'Spouse',
                                        'طفل': 'Child',
                                        'أخرى': 'Other'
                                    };

                                    setEditedData({
                                        ...editedData,
                                        relationshipEn: language === 'en' ? value : relationshipMap[value],
                                        relationshipAr: language === 'ar' ? value : relationshipMap[value]
                                    });
                                }}
                            >
                                <option value={language === 'en' ? 'Self' : 'نفسه'}>
                                    {t(`${prefix}.insuranceInfo.relationships.self`)}
                                </option>
                                <option value={language === 'en' ? 'Spouse' : 'زوج/ة'}>
                                    {t(`${prefix}.insuranceInfo.relationships.spouse`)}
                                </option>
                                <option value={language === 'en' ? 'Child' : 'طفل'}>
                                    {t(`${prefix}.insuranceInfo.relationships.child`)}
                                </option>
                                <option value={language === 'en' ? 'Other' : 'أخرى'}>
                                    {t(`${prefix}.insuranceInfo.relationships.other`)}
                                </option>
                            </select>
                        </div>
                    </div>

                    <h4 className="section-subheading">{t(`${prefix}.insuranceInfo.form.copayInfo`)}</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.primaryCare`)}</label>
                            <input
                                type="text"
                                value={editedData.copay?.primaryCare || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), primaryCare: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.specialist`)}</label>
                            <input
                                type="text"
                                value={editedData.copay?.specialist || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), specialist: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.emergency`)}</label>
                            <input
                                type="text"
                                value={editedData.copay?.emergency || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), emergency: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.insuranceInfo.form.prescription`)}</label>
                            <input
                                type="text"
                                value={editedData.copay?.prescription || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), prescription: e.target.value }
                                })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {t(`${prefix}.buttons.save`)}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display insurance-display">
                <div className="section-header">
                    <div className="section-title-wrapper">
                        <h3>{t(`${prefix}.insuranceInfo.sectionTitle`)}</h3>
                        <p className="section-subtitle">{t(`${prefix}.insuranceInfo.sectionSubtitle`)}</p>
                    </div>
                    <div className="header-actions">
                        <button className="download-btn">
                            <FaDownload /> {t(`${prefix}.buttons.downloadCard`)}
                        </button>
                        <button className="edit-btn" onClick={() => startEditing({ ...insuranceInfo })}>
                            <FaPencilAlt /> {t(`${prefix}.buttons.edit`)}
                        </button>
                    </div>
                </div>

                <div className="insurance-card">
                    <div className="insurance-card-header">
                        <h3>{getLangField(insuranceInfo, 'provider')}</h3>
                    </div>

                    <div className="insurance-card-content">
                        <div className="member-info-section">
                            <div className="member-identifier">
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.form.memberId`)}</span>
                                    <span className="value highlight">{insuranceInfo.memberId}</span>
                                </div>
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.form.groupNumber`)}</span>
                                    <span className="value">{insuranceInfo.groupNumber}</span>
                                </div>
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.form.policyNumber`)}</span>
                                    <span className="value">{insuranceInfo.policyNumber}</span>
                                </div>
                            </div>

                            <div className="member-details">
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.memberInfo.memberName`)}</span>
                                    <span className="value">{insuranceInfo.primaryCardholder}</span>
                                </div>
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.memberInfo.relationship`)}</span>
                                    <span className="value">{getLangField(insuranceInfo, 'relationship')}</span>
                                </div>
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.memberInfo.coverageType`)}</span>
                                    <span className="value">{getLangField(insuranceInfo, 'coverageType')}</span>
                                </div>
                                <div>
                                    <span className="label">{t(`${prefix}.insuranceInfo.memberInfo.effectiveDate`)}</span>
                                    <span className="value">{new Date(insuranceInfo.startDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="copay-section">
                            <h4>{t(`${prefix}.insuranceInfo.form.copayInfo`)}</h4>
                            <div className="copay-grid">
                                <div className="copay-item">
                                    <span className="copay-label">{t(`${prefix}.insuranceInfo.form.primaryCare`)}</span>
                                    <span className="copay-value">{insuranceInfo.copay.primaryCare}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">{t(`${prefix}.insuranceInfo.form.specialist`)}</span>
                                    <span className="copay-value">{insuranceInfo.copay.specialist}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">{t(`${prefix}.insuranceInfo.form.emergency`)}</span>
                                    <span className="copay-value">{insuranceInfo.copay.emergency}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">{t(`${prefix}.insuranceInfo.form.prescription`)}</span>
                                    <span className="copay-value">{insuranceInfo.copay.prescription}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <FaShieldAlt className="security-icon" />
                            <p className="security-note">{t(`${prefix}.insuranceInfo.securityNote`)}</p>
                        </div>
                    </div>
                </div>

                <div className="benefits-summary">
                    <h4>{t(`${prefix}.insuranceInfo.benefitsSummary.title`)}</h4>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <h5>{t(`${prefix}.insuranceInfo.benefitsSummary.annualDeductible`)}</h5>
                            <span className="benefit-value">$1,500</span>
                            <span className="benefit-progress">$750 {t(`${prefix}.insuranceInfo.benefitsSummary.used`)}</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <h5>{t(`${prefix}.insuranceInfo.benefitsSummary.outOfPocketMax`)}</h5>
                            <span className="benefit-value">$4,500</span>
                            <span className="benefit-progress">$1,250 {t(`${prefix}.insuranceInfo.benefitsSummary.used`)}</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <h5>{t(`${prefix}.insuranceInfo.benefitsSummary.preventiveCare`)}</h5>
                            <span className="benefit-value">Covered 100%</span>
                            <span className="benefit-status covered">{t(`${prefix}.insuranceInfo.benefitsSummary.covered`)}</span>
                        </div>
                        <div className="benefit-item">
                            <h5>{t(`${prefix}.insuranceInfo.benefitsSummary.prescriptionCoverage`)}</h5>
                            <span className="benefit-value">Tiered Copay</span>
                            <span className="benefit-status covered">{t(`${prefix}.insuranceInfo.benefitsSummary.active`)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderMedicalHistoryContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form history-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalHistory.form.type`)}</label>
                            <select
                                value={getLangField(editedData, 'type') || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const typeMap = {
                                        'Surgery': 'جراحة',
                                        'Hospitalization': 'دخول المستشفى',
                                        'Vaccination': 'تطعيم',
                                        'Major Illness': 'مرض خطير',
                                        'Injury': 'إصابة',
                                        'Other': 'أخرى',
                                        'جراحة': 'Surgery',
                                        'دخول المستشفى': 'Hospitalization',
                                        'تطعيم': 'Vaccination',
                                        'مرض خطير': 'Major Illness',
                                        'إصابة': 'Injury',
                                        'أخرى': 'Other'
                                    };

                                    setEditedData({
                                        ...editedData,
                                        typeEn: language === 'en' ? value : typeMap[value],
                                        typeAr: language === 'ar' ? value : typeMap[value]
                                    });
                                }}
                            >
                                <option value={language === 'en' ? 'Surgery' : 'جراحة'}>
                                    {t(`${prefix}.medicalHistory.types.surgery`)}
                                </option>
                                <option value={language === 'en' ? 'Hospitalization' : 'دخول المستشفى'}>
                                    {t(`${prefix}.medicalHistory.types.hospitalization`)}
                                </option>
                                <option value={language === 'en' ? 'Vaccination' : 'تطعيم'}>
                                    {t(`${prefix}.medicalHistory.types.vaccination`)}
                                </option>
                                <option value={language === 'en' ? 'Major Illness' : 'مرض خطير'}>
                                    {t(`${prefix}.medicalHistory.types.majorIllness`)}
                                </option>
                                <option value={language === 'en' ? 'Injury' : 'إصابة'}>
                                    {t(`${prefix}.medicalHistory.types.injury`)}
                                </option>
                                <option value={language === 'en' ? 'Other' : 'أخرى'}>
                                    {t(`${prefix}.medicalHistory.types.other`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalHistory.form.procedureDescription`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'procedure') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'procedureAr' : 'procedureEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalHistory.form.date`)}</label>
                            <input
                                type="date"
                                value={editedData.date || ''}
                                onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalHistory.form.providerFacility`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'provider') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'providerAr' : 'providerEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalHistory.form.physician`)}</label>
                            <input
                                type="text"
                                value={getLangField(editedData, 'physician') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'physicianAr' : 'physicianEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalHistory.form.notes`)}</label>
                            <textarea
                                value={getLangField(editedData, 'notes') || ''}
                                onChange={(e) => {
                                    const langField = language === 'ar' ? 'notesAr' : 'notesEn';
                                    setEditedData({ ...editedData, [langField]: e.target.value });
                                }}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {t(editedData.id ? `${prefix}.buttons.updateRecord` : `${prefix}.buttons.addRecord`)}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display history-display">
                <div className="section-header">
                    <div className="section-title-wrapper">
                        <h3>{t(`${prefix}.medicalHistory.sectionTitle`)}</h3>
                        <p className="section-subtitle">{t(`${prefix}.medicalHistory.sectionSubtitle`)}</p>
                    </div>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + {t(`${prefix}.buttons.addRecord`)}
                    </button>
                </div>

                <div className="history-filter">
                    <div className="filter-label">{t(`${prefix}.medicalHistory.filterLabel`)}:</div>
                    <div className="filter-options">
                        <button className="filter-btn active">{t(`${prefix}.medicalHistory.filterOptions.all`)}</button>
                        <button className="filter-btn">{t(`${prefix}.medicalHistory.filterOptions.surgery`)}</button>
                        <button className="filter-btn">{t(`${prefix}.medicalHistory.filterOptions.hospitalization`)}</button>
                        <button className="filter-btn">{t(`${prefix}.medicalHistory.filterOptions.vaccination`)}</button>
                    </div>
                </div>

                {medicalHistory.length === 0 ? (
                    <div className="empty-state">
                        <FaHistory className="empty-icon" />
                        <p>{t(`${prefix}.medicalHistory.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addRecord`)}
                        </button>
                    </div>
                ) : (
                    <div className="timeline">
                        {medicalHistory.map(record => (
                            <div className="timeline-item" key={record.id}>
                                <div className="timeline-marker">
                                    <div className="timeline-icon">
                                        {getLangField(record, 'type') === (language === 'en' ? 'Surgery' : 'جراحة') && <FaNotesMedical />}
                                        {getLangField(record, 'type') === (language === 'en' ? 'Hospitalization' : 'دخول المستشفى') && <FaExclamationTriangle />}
                                        {getLangField(record, 'type') === (language === 'en' ? 'Vaccination' : 'تطعيم') && <FaShieldAlt />}
                                        {(getLangField(record, 'type') !== (language === 'en' ? 'Surgery' : 'جراحة') &&
                                            getLangField(record, 'type') !== (language === 'en' ? 'Hospitalization' : 'دخول المستشفى') &&
                                            getLangField(record, 'type') !== (language === 'en' ? 'Vaccination' : 'تطعيم')) && <FaFileAlt />}
                                    </div>
                                    <div className="timeline-date">
                                        {new Date(record.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h4>{getLangField(record, 'procedure')}</h4>
                                        <span className="badge">
                                            {t(`${prefix}.medicalHistory.types.${record.typeEn.toLowerCase().replace(/\s+/g, '')}`)}
                                        </span>
                                        <button className="edit-btn small" onClick={() => startEditing({ ...record })}>
                                            <FaPencilAlt />
                                        </button>
                                    </div>
                                    <div className="timeline-details">
                                        <div className="timeline-detail">
                                            <span className="detail-label">{t(`${prefix}.medicalHistory.details.provider`)}:</span>
                                            <span className="detail-value">{getLangField(record, 'provider')}</span>
                                        </div>
                                        <div className="timeline-detail">
                                            <span className="detail-label">{t(`${prefix}.medicalHistory.details.physician`)}:</span>
                                            <span className="detail-value">{getLangField(record, 'physician')}</span>
                                        </div>
                                        {record.notesEn && (
                                            <div className="timeline-detail notes">
                                                <span className="detail-label">{t(`${prefix}.medicalHistory.details.notes`)}:</span>
                                                <span className="detail-value">{getLangField(record, 'notes')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalInfoContent();
            case 'allergies':
                return renderAllergiesContent();
            case 'conditions':
                return renderMedicalConditionsContent();
            case 'insurance':
                return renderInsuranceContent();
            case 'history':
                return renderMedicalHistoryContent();
            default:
                return renderPersonalInfoContent();
        }
    };

    return (
        <div className="patient-health-profile">
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="sidebar-header">
                        <h2>{t(`${prefix}.title`)}</h2>
                    </div>
                    <div className="sidebar-nav">
                        <button
                            className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                            onClick={() => handleTabChange('personal')}
                        >
                            <FaUserAlt className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.personalInfo`)}</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'allergies' ? 'active' : ''}`}
                            onClick={() => handleTabChange('allergies')}
                        >
                            <FaAllergies className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.allergies`)}</span>
                            {allergies.length > 0 && <span className="badge">{allergies.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'conditions' ? 'active' : ''}`}
                            onClick={() => handleTabChange('conditions')}
                        >
                            <FaNotesMedical className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.medicalConditions`)}</span>
                            {medicalConditions.length > 0 && <span className="badge">{medicalConditions.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'insurance' ? 'active' : ''}`}
                            onClick={() => handleTabChange('insurance')}
                        >
                            <FaIdCard className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.insuranceInfo`)}</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => handleTabChange('history')}
                        >
                            <FaHistory className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.medicalHistory`)}</span>
                            {medicalHistory.length > 0 && <span className="badge">{medicalHistory.length}</span>}
                        </button>
                    </div>
                    <div className="sidebar-footer">
                        <button className="print-btn">
                            <FaFileAlt /> {t(`${prefix}.buttons.printRecord`)}
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    {!isLoaded ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t(`${prefix}.loading`)}</p>
                        </div>
                    ) : (
                        renderActiveTabContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientHealthProfile;