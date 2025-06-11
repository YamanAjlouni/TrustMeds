import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import {
    FaUserAlt, FaAllergies, FaNotesMedical, FaFileAlt, FaIdCard,
    FaPencilAlt, FaCheck, FaTimes, FaShieldAlt, FaHistory,
    FaExclamationTriangle, FaDownload, FaExclamationCircle, FaUserPlus
} from 'react-icons/fa';

// Styles and Context
import './PatientHealthProfile.scss';
import { useLanguage } from '../../../context/LanguageContext';

// Profile Actions
import {
    GetProfileAction,
    UpdateMyProfileAction,
    CreateProfileAction // Added for new patient creation
} from '../../../redux/actions/patients/profileAction';

// Emergency Contact Actions
import {
    GetEmergencyContactAction,
    CreateEmergencyContactAction,
    UpdateEmergencyContactAction
} from '../../../redux/actions/patients/emergencyContactAction';

// Allergies Actions
import {
    GetALLAllergiesAction,
    GetMyAllergiesAction,
    CreateMyAllergyAction,
    UpdateMyAllergyAction,
    DeleteMyAllergyAction
} from '../../../redux/actions/patients/allergiesActions';

// Chronic Diseases Actions
import {
    GetMyChronicDiseasesAction,
    CreateMyChronicDiseaseAction,
    UpdateMyChronicDiseaseAction,
    DeleteMyChronicDiseaseAction
} from '../../../redux/actions/patients/chronicDiseasesActions';

// Surgeries Actions
import {
    GetMySurgeriesAction,
    CreateMySurgeryAction,
    UpdateMySurgeryAction,
    DeleteMySurgeryAction
} from '../../../redux/actions/patients/surgeriesActions';

// ==================== CONSTANTS ====================
const TABS = {
    PERSONAL: 'personal',
    ALLERGIES: 'allergies',
    CHRONIC: 'chronic',
    INSURANCE: 'insurance',
    HISTORY: 'history'
};

const GENDER_MAP = {
    'M': { en: 'Male', ar: 'ذكر' },
    'F': { en: 'Female', ar: 'أنثى' },
    'O': { en: 'Other', ar: 'أخرى' }
};

const GENDER_REVERSE_MAP = {
    'Male': 'M', 'Female': 'F', 'Other': 'O',
    'ذكر': 'M', 'أنثى': 'F', 'أخرى': 'O'
};

// ==================== HELPER FUNCTIONS ====================
const formatMeasurement = (value, unit) => value ? `${value} ${unit}` : '';

const extractNumericValue = (str) => {
    if (!str) return null;
    const match = str.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
};

// ==================== MAIN COMPONENT ====================
export const PatientHealthProfile = () => {
    const dispatch = useDispatch();
    const { t, language } = useLanguage();

    // Translation prefix
    const prefix = 'patientPage.healthProfile.patientHealthProfile';

    // ==================== REDUX STATE ====================
    // Profile State - Enhanced with new fields for patient creation
    const {
        loading: profileLoading,
        profile: apiProfile,
        error: profileError,
        updating: profileUpdating,
        creating: profileCreating, // New field
        updateSuccess: profileUpdateSuccess,
        createSuccess: profileCreateSuccess, // New field
        isPatient // New field to track if user is already a patient
    } = useSelector(state => state.profile);

    // Emergency Contacts State
    const {
        contacts: emergencyContacts,
        loading: contactsLoading,
        creating: contactCreating,
        updating: contactUpdating,
        error: contactError,
        createSuccess: contactCreateSuccess,
        updateSuccess: contactUpdateSuccess
    } = useSelector(state => state.emergencyContact || {});

    // Allergies State
    const {
        allAllergies,
        myAllergies,
        loading: allergiesLoading,
        error: allergiesError,
        creating: allergyCreating,
        updating: allergyUpdating,
        createSuccess: allergyCreateSuccess,
        updateSuccess: allergyUpdateSuccess,
        deleteSuccess: allergyDeleteSuccess,
        hasLoadedAllAllergies,
        hasLoadedMyAllergies
    } = useSelector(state => state.allergies);

    // Chronic Diseases State
    const {
        myChronicDiseases,
        loading: chronicDiseasesLoading,
        error: chronicDiseasesError,
        creating: chronicDiseaseCreating,
        updating: chronicDiseaseUpdating,
        createSuccess: chronicDiseaseCreateSuccess,
        updateSuccess: chronicDiseaseUpdateSuccess,
        deleteSuccess: chronicDiseaseDeleteSuccess,
        hasLoadedOnce: hasLoadedChronicDiseases
    } = useSelector(state => state.chronicDiseases);

    // Surgeries State
    const {
        mySurgeries,
        loading: surgeriesLoading,
        error: surgeriesError,
        creating: surgeryCreating,
        updating: surgeryUpdating,
        createSuccess: surgeryCreateSuccess,
        updateSuccess: surgeryUpdateSuccess,
        deleteSuccess: surgeryDeleteSuccess,
        hasLoadedOnce: hasLoadedSurgeries
    } = useSelector(state => state.surgeries);

    // ==================== LOCAL STATE ====================
    const [activeTab, setActiveTab] = useState(TABS.PERSONAL);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [personalInfo, setPersonalInfo] = useState(getEmptyPersonalInfo());
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    // Static Insurance Info (for demo - replace with real data later)
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

    // ==================== HELPER FUNCTIONS ====================
    function getEmptyPersonalInfo() {
        return {
            id: null,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            genderEn: '',
            genderAr: '',
            bloodType: '',
            height: '',
            weight: '',
            emailAddress: '',
            phoneNumber: '',
            address: '',
            emergencyContact: {
                name: '',
                relationshipEn: '',
                relationshipAr: '',
                phoneNumber: ''
            }
        };
    }

    function convertProfileFromAPI(profileData) {
        if (!profileData || Object.keys(profileData).length === 0) {
            return getEmptyPersonalInfo();
        }

        const genderMapping = GENDER_MAP[profileData.gender] || { en: 'Not specified', ar: 'غير محدد' };

        return {
            id: profileData.id,
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            dateOfBirth: profileData.date_of_birth || '',
            genderEn: genderMapping.en,
            genderAr: genderMapping.ar,
            bloodType: profileData.blood_type || '',
            height: formatMeasurement(profileData.height, 'cm'),
            weight: formatMeasurement(profileData.weight, 'kg'),
            emailAddress: profileData.email_address || profileData.email || '',
            phoneNumber: profileData.phone_number || profileData.phone || '',
            address: profileData.address || '',
            emergencyContact: {
                name: '',
                relationshipEn: '',
                relationshipAr: '',
                phoneNumber: ''
            }
        };
    }

    function convertProfileToAPI(formData) {
        const apiData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            date_of_birth: formData.dateOfBirth,
            email_address: formData.emailAddress,
            phone_number: formData.phoneNumber,
            address: formData.address,
            blood_type: formData.bloodType
        };

        // Convert gender
        const currentGender = getLangField(formData, 'gender');
        if (currentGender && GENDER_REVERSE_MAP[currentGender]) {
            apiData.gender = GENDER_REVERSE_MAP[currentGender];
        }

        // Extract numeric values
        apiData.height = extractNumericValue(formData.height);
        apiData.weight = extractNumericValue(formData.weight);

        return apiData;
    }

    function getLangField(obj, field) {
        const langSuffix = language === 'ar' ? 'Ar' : 'En';
        return obj?.[field + langSuffix] || obj?.[field] || '';
    }

    function getCurrentTabLoading() {
        switch (activeTab) {
            case TABS.PERSONAL:
                return !initialLoadComplete || profileLoading || contactsLoading;
            case TABS.ALLERGIES:
                return allergiesLoading;
            case TABS.CHRONIC:
                return chronicDiseasesLoading;
            case TABS.HISTORY:
                return surgeriesLoading;
            case TABS.INSURANCE:
                return false;
            default:
                return false;
        }
    }

    // New helper function to check if user has minimal data to be considered a patient
    function hasMinimalPatientData(data) {
        return data && (
            data.firstName ||
            data.lastName ||
            data.dateOfBirth ||
            data.emailAddress ||
            data.phoneNumber
        );
    }

    // ==================== DATA LOADING FUNCTIONS ====================
    const loadInitialData = useCallback(async () => {
        try {
            const profileResult = await dispatch(GetProfileAction()).unwrap();
            const convertedData = convertProfileFromAPI(profileResult.data || profileResult);
            setPersonalInfo(convertedData);

            // Only try to load emergency contacts if user is already a patient
            if (isPatient) {
                await dispatch(GetEmergencyContactAction()).unwrap();
            }

            setInitialLoadComplete(true);
        } catch (error) {
            console.error("Failed to load initial data:", error);
            setInitialLoadComplete(true);
        }
    }, [dispatch, isPatient]);

    const loadTabData = useCallback(async () => {
        // Only load additional data if user is already a patient
        if (!isPatient) return;

        try {
            switch (activeTab) {
                case TABS.ALLERGIES:
                    if (!hasLoadedAllAllergies) {
                        await dispatch(GetALLAllergiesAction()).unwrap();
                    }
                    if (!hasLoadedMyAllergies) {
                        await dispatch(GetMyAllergiesAction()).unwrap();
                    }
                    break;
                case TABS.CHRONIC:
                    if (!hasLoadedChronicDiseases) {
                        await dispatch(GetMyChronicDiseasesAction()).unwrap();
                    }
                    break;
                case TABS.HISTORY:
                    if (!hasLoadedSurgeries) {
                        await dispatch(GetMySurgeriesAction()).unwrap();
                    }
                    break;
            }
        } catch (error) {
            console.error(`Failed to load ${activeTab} data:`, error);
        }
    }, [activeTab, dispatch, isPatient, hasLoadedAllAllergies, hasLoadedMyAllergies, hasLoadedChronicDiseases, hasLoadedSurgeries]);

    // ==================== UI HANDLER FUNCTIONS ====================
    const handleTabChange = (tab) => {
        // Only restrict access if user is not a patient - but still allow navigation
        // The restriction will be shown in the content area instead
        setActiveTab(tab);
        setIsEditing(false);
        setEditedData({});
    };

    const startEditing = (data) => {
        setEditedData(data);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedData({});
    };

    // ==================== SAVE FUNCTIONS ====================
    const savePersonalInfo = async () => {
        try {
            const apiFormData = convertProfileToAPI(editedData);

            // Enhanced logic: use create or update based on patient status
            if (isPatient) {
                await dispatch(UpdateMyProfileAction(apiFormData)).unwrap();
            } else {
                // Create new patient profile
                await dispatch(CreateProfileAction(apiFormData)).unwrap();
            }

            // Handle emergency contact
            if (editedData.emergencyContact?.name) {
                const emergencyContactData = {
                    name: editedData.emergencyContact.name,
                    relationship: getLangField(editedData.emergencyContact, 'relationship'),
                    phone: editedData.emergencyContact.phoneNumber,
                    email: ''
                };

                if (emergencyContacts?.length > 0) {
                    await dispatch(UpdateEmergencyContactAction({
                        id: emergencyContacts[0].id,
                        contactData: emergencyContactData
                    })).unwrap();
                } else {
                    await dispatch(CreateEmergencyContactAction(emergencyContactData)).unwrap();
                }
            }
        } catch (error) {
            console.error("Profile save failed:", error);
        }
    };

    const saveAllergy = async () => {
        try {
            const allergyData = {
                allergy: parseInt(editedData.allergenId),
                severity: editedData.severity?.toLowerCase() || 'low',
                reaction: editedData.reaction || '',
                diagnosed_date: editedData.diagnosedDate || null,
                notes: editedData.notes || ''
            };

            if (editedData.id) {
                await dispatch(UpdateMyAllergyAction({
                    id: editedData.id,
                    data: allergyData
                })).unwrap();
            } else {
                await dispatch(CreateMyAllergyAction(allergyData)).unwrap();
            }

            cancelEditing();
        } catch (error) {
            console.error("Allergy save failed:", error);
        }
    };

    const saveChronicDisease = async () => {
        try {
            const chronicDiseaseData = {
                disease: editedData.condition || '',
                doctor: editedData.doctor || null,
                diagnosed_date: editedData.diagnosedDate || null,
                status: editedData.status || 'active',
                notes: editedData.notes || ''
            };

            if (editedData.id) {
                await dispatch(UpdateMyChronicDiseaseAction({
                    id: editedData.id,
                    data: chronicDiseaseData
                })).unwrap();
            } else {
                await dispatch(CreateMyChronicDiseaseAction(chronicDiseaseData)).unwrap();
            }

            cancelEditing();
        } catch (error) {
            console.error("Chronic disease save failed:", error);
        }
    };

    const saveSurgery = async () => {
        try {
            const surgeryData = {
                surgery: editedData.procedure || '',
                date: editedData.date || null,
                hospital: editedData.provider || '',
                doctor: editedData.physician || '',
                notes: editedData.notes || ''
            };

            if (editedData.id) {
                await dispatch(UpdateMySurgeryAction({
                    id: editedData.id,
                    data: surgeryData
                })).unwrap();
            } else {
                await dispatch(CreateMySurgeryAction(surgeryData)).unwrap();
            }

            cancelEditing();
        } catch (error) {
            console.error("Surgery save failed:", error);
        }
    };

    const saveInsurance = () => {
        setInsuranceInfo(editedData);
        cancelEditing();
    };

    const saveChanges = async () => {
        switch (activeTab) {
            case TABS.PERSONAL:
                await savePersonalInfo();
                break;
            case TABS.ALLERGIES:
                await saveAllergy();
                break;
            case TABS.CHRONIC:
                await saveChronicDisease();
                break;
            case TABS.HISTORY:
                await saveSurgery();
                break;
            case TABS.INSURANCE:
                saveInsurance();
                break;
        }
    };

    // ==================== EFFECTS ====================
    // Initial data load
    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    // Tab data load
    useEffect(() => {
        if (initialLoadComplete) {
            loadTabData();
        }
    }, [initialLoadComplete, loadTabData]);

    // Handle profile update success
    useEffect(() => {
        if (profileUpdateSuccess) {
            cancelEditing();
            dispatch(GetProfileAction())
                .unwrap()
                .then((result) => {
                    const convertedData = convertProfileFromAPI(result.data || result);
                    setPersonalInfo(convertedData);
                });
            dispatch(GetEmergencyContactAction());
        }
    }, [profileUpdateSuccess, dispatch]);

    // Handle profile create success - New effect
    useEffect(() => {
        if (profileCreateSuccess) {
            cancelEditing();
            // After successful creation, reload the profile
            dispatch(GetProfileAction())
                .unwrap()
                .then((result) => {
                    const convertedData = convertProfileFromAPI(result.data || result);
                    setPersonalInfo(convertedData);
                });
            dispatch(GetEmergencyContactAction());
        }
    }, [profileCreateSuccess, dispatch]);

    // Handle emergency contact updates
    useEffect(() => {
        if (contactCreateSuccess || contactUpdateSuccess) {
            dispatch(GetEmergencyContactAction());
        }
    }, [contactCreateSuccess, contactUpdateSuccess, dispatch]);

    // Handle allergies updates
    useEffect(() => {
        if (allergyCreateSuccess || allergyUpdateSuccess || allergyDeleteSuccess) {
            dispatch(GetMyAllergiesAction());
        }
    }, [allergyCreateSuccess, allergyUpdateSuccess, allergyDeleteSuccess, dispatch]);

    // Handle chronic diseases updates
    useEffect(() => {
        if (chronicDiseaseCreateSuccess || chronicDiseaseUpdateSuccess || chronicDiseaseDeleteSuccess) {
            dispatch(GetMyChronicDiseasesAction());
        }
    }, [chronicDiseaseCreateSuccess, chronicDiseaseUpdateSuccess, chronicDiseaseDeleteSuccess, dispatch]);

    // Handle surgeries updates
    useEffect(() => {
        if (surgeryCreateSuccess || surgeryUpdateSuccess || surgeryDeleteSuccess) {
            dispatch(GetMySurgeriesAction());
        }
    }, [surgeryCreateSuccess, surgeryUpdateSuccess, surgeryDeleteSuccess, dispatch]);

    // Update personal info with emergency contact
    useEffect(() => {
        if (emergencyContacts?.length > 0) {
            const primaryContact = emergencyContacts[0];
            setPersonalInfo(prev => ({
                ...prev,
                emergencyContact: {
                    name: primaryContact.name || '',
                    relationshipEn: primaryContact.relationship || '',
                    relationshipAr: primaryContact.relationship || '',
                    phoneNumber: primaryContact.phone || primaryContact.phone_number || ''
                }
            }));
        }
    }, [emergencyContacts]);

    // ==================== RENDER FUNCTIONS ====================
    const renderPersonalInfoContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form personal-info-form">
                    {profileError && (
                        <div className="alert alert-error">{profileError}</div>
                    )}
                    {contactError && (
                        <div className="alert alert-error">Emergency contact error: {contactError}</div>
                    )}

                    <div className="form-grid">
                        {/* Personal Details Fields */}
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
                                <option value="">Select Gender</option>
                                <option value={language === 'en' ? 'Male' : 'ذكر'}>
                                    {t(`${prefix}.personalInfo.genderOptions.male`)}
                                </option>
                                <option value={language === 'en' ? 'Female' : 'أنثى'}>
                                    {t(`${prefix}.personalInfo.genderOptions.female`)}
                                </option>
                                <option value={language === 'en' ? 'Other' : 'أخرى'}>
                                    {t(`${prefix}.personalInfo.genderOptions.other`)}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.bloodType`)}</label>
                            <select
                                value={editedData.bloodType || ''}
                                onChange={(e) => setEditedData({ ...editedData, bloodType: e.target.value })}
                            >
                                <option value="">Select Blood Type</option>
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
                                placeholder="e.g., 175 cm"
                                value={editedData.height || ''}
                                onChange={(e) => setEditedData({ ...editedData, height: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.personalInfo.personalDetails.weight`)}</label>
                            <input
                                type="text"
                                placeholder="e.g., 70 kg"
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

                    {/* Emergency Contact Section */}
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
                        <button
                            className="action-btn secondary"
                            onClick={cancelEditing}
                            disabled={profileUpdating || profileCreating || contactUpdating || contactCreating}
                        >
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button
                            className="action-btn primary"
                            onClick={saveChanges}
                            disabled={profileUpdating || profileCreating || contactUpdating || contactCreating}
                        >
                            <FaCheck />
                            {profileUpdating || profileCreating || contactUpdating || contactCreating
                                ? 'Saving...'
                                : t(`${prefix}.buttons.save`)
                            }
                        </button>
                    </div>
                </div>
            );
        }

        // View Mode
        const calculateBMI = () => {
            if (!personalInfo.height || !personalInfo.weight) return '--';
            const height = extractNumericValue(personalInfo.height);
            const weight = extractNumericValue(personalInfo.weight);
            if (!height || !weight) return '--';
            return ((weight / (height / 100) ** 2).toFixed(1));
        };

        const calculateAge = () => {
            if (!personalInfo.dateOfBirth) return 'Not provided';
            const age = new Date().getFullYear() - new Date(personalInfo.dateOfBirth).getFullYear();
            return `${age} ${t(`${prefix}.personalInfo.personalDetails.years`)}`;
        };

        // New patient welcome screen - only show if user has no profile data at all
        if (!isPatient && !hasMinimalPatientData(personalInfo)) {
            return (
                <div className="info-display personal-info-display">
                    <div className="welcome-patient-setup">
                        <div className="welcome-header">
                            <FaUserPlus className="welcome-icon" />
                            <h3>Welcome! Let's Set Up Your Health Profile</h3>
                            <p>To get started with your health profile, please provide some basic information about yourself.</p>
                        </div>

                        <div className="setup-benefits">
                            <h4>Why create your health profile?</h4>
                            <ul>
                                <li>Track your medical history and allergies</li>
                                <li>Store emergency contact information</li>
                                <li>Manage your insurance details</li>
                                <li>Keep all your health information in one place</li>
                            </ul>
                        </div>

                        <button
                            className="action-btn primary setup-btn"
                            onClick={() => startEditing(getEmptyPersonalInfo())}
                        >
                            <FaUserPlus /> Create My Health Profile
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display personal-info-display">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUserAlt />
                    </div>
                    <div className="profile-name">
                        <h3>{personalInfo.firstName} {personalInfo.lastName}</h3>
                        <p className="profile-subtitle">
                            {t(`${prefix}.personalInfo.patientId`)}: {personalInfo.id ? `PT-${String(personalInfo.id).padStart(8, '0')}` : 'PT---------'}
                        </p>
                        {!isPatient && (
                            <span className="profile-status-badge new-patient">
                                New Patient - Complete your profile
                            </span>
                        )}
                    </div>
                    <div className="profile-actions">
                        <button className="edit-btn" onClick={() => startEditing({ ...personalInfo })}>
                            <FaPencilAlt /> {isPatient ? t(`${prefix}.buttons.editProfile`) : 'Complete Profile'}
                        </button>
                    </div>
                </div>

                {/* Missing Info Alert */}
                {(!personalInfo.bloodType || !personalInfo.height || !personalInfo.weight || !isPatient) && (
                    <div className="alert-box">
                        <FaExclamationCircle className="alert-box-icon" />
                        <div className="alert-box-content">
                            <h4>
                                {!isPatient
                                    ? 'Complete Your Health Profile'
                                    : t(`${prefix}.personalInfo.alertTitle`)
                                }
                            </h4>
                            <p>
                                {!isPatient
                                    ? 'Please complete your profile to access all health features and ensure we have your important medical information.'
                                    : t(`${prefix}.personalInfo.alertMessage`)
                                }
                            </p>
                        </div>
                        {!isPatient && (
                            <button
                                className="alert-box-action"
                                onClick={() => startEditing({ ...personalInfo })}
                            >
                                Complete Now
                            </button>
                        )}
                    </div>
                )}

                {/* Info Grid */}
                <div className="info-grid">
                    {/* Personal Details */}
                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.personalDetails.title`)}</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.dateOfBirth`)}</span>
                                <span className="info-value">
                                    {personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString() : 'Not provided'}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.age`)}</span>
                                <span className="info-value">{calculateAge()}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.gender`)}</span>
                                <span className="info-value">{getLangField(personalInfo, 'gender') || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.bloodType`)}</span>
                                <span className="info-value">{personalInfo.bloodType || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.height`)}</span>
                                <span className="info-value">{personalInfo.height || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.personalDetails.weight`)}</span>
                                <span className="info-value">{personalInfo.weight || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.contactInfo.title`)}</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.email`)}</span>
                                <span className="info-value">{personalInfo.emailAddress || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.phone`)}</span>
                                <span className="info-value">{personalInfo.phoneNumber || 'Not provided'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">{t(`${prefix}.personalInfo.contactInfo.address`)}</span>
                                <span className="info-value">{personalInfo.address || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="info-group">
                        <h4>{t(`${prefix}.personalInfo.emergencyContact.title`)}</h4>
                        <div className="info-items">
                            {personalInfo?.emergencyContact?.name ? (
                                <>
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
                                </>
                            ) : (
                                <div className="emergency-contact-empty">
                                    <FaUserPlus className="empty-icon" />
                                    <div className="empty-message">
                                        <span className="primary-text">{t(`${prefix}.personalInfo.emergencyContact.noEmergencyContact`)}</span>
                                        <span className="secondary-text">
                                            {t(`${prefix}.personalInfo.emergencyContact.noEmergencyContactMessage`)}
                                        </span>
                                    </div>
                                    <button
                                        className="add-emergency-contact-btn"
                                        onClick={() => startEditing({ ...personalInfo })}
                                    >
                                        <FaUserPlus className="btn-icon" />
                                        {t(`${prefix}.personalInfo.emergencyContact.addEmergencyContactButton`)}Add Emergency Contact
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Biometric Summary - only show if user is already a patient */}
                {isPatient && (
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
                                <div className="biometric-value">{calculateBMI()}</div>
                                <div className="biometric-label">{t(`${prefix}.personalInfo.biometricSummary.bmi`)}</div>
                                <div className="trend normal">
                                    {personalInfo.height && personalInfo.weight ? t(`${prefix}.personalInfo.biometricSummary.normal`) : 'Not calculated'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // New function to render restricted content for non-patients
    const renderRestrictedTabContent = (tabName) => {
        return (
            <div className="info-display restricted-display">
                <div className="restricted-access">
                    <FaExclamationTriangle className="restricted-icon" />
                    <h3>Complete Your Profile First</h3>
                    <p>Please complete your basic health profile to access {tabName} management.</p>
                    <button
                        className="action-btn primary"
                        onClick={() => {
                            setActiveTab(TABS.PERSONAL);
                            startEditing({ ...personalInfo });
                        }}
                    >
                        Complete Profile
                    </button>
                </div>
            </div>
        );
    };

    const renderAllergiesContent = () => {
        // Show restricted content if user is not a patient yet
        if (!isPatient) {
            return renderRestrictedTabContent('allergies');
        }

        if (isEditing) {
            return (
                <div className="edit-form allergies-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.allergen`)}</label>
                            <select
                                value={editedData.allergenId || ''}
                                onChange={(e) => setEditedData({ ...editedData, allergenId: e.target.value })}
                                required
                            >
                                <option value="">{t(`${prefix}.allergies.form.selectAllergen`)}</option>
                                {allAllergies.map(allergen => (
                                    <option key={allergen.id} value={allergen.id}>
                                        {allergen.name || allergen.allergen_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.allergies.form.severity`)}</label>
                            <select
                                value={editedData.severity || 'low'}
                                onChange={(e) => setEditedData({ ...editedData, severity: e.target.value })}
                            >
                                <option value="low">{t(`${prefix}.allergies.severity.low`)}</option>
                                <option value="moderate">{t(`${prefix}.allergies.severity.moderate`)}</option>
                                <option value="high">{t(`${prefix}.allergies.severity.high`)}</option>
                                <option value="severe">{t(`${prefix}.allergies.severity.severe`)}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.allergies.form.diagnosedDate`)}</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || editedData.diagnosed_date || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.reaction`)}</label>
                            <input
                                type="text"
                                value={editedData.reaction || ''}
                                onChange={(e) => setEditedData({ ...editedData, reaction: e.target.value })}
                                placeholder="Describe the allergic reaction"
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.allergies.form.notes`)}</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                                placeholder="Additional notes"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button
                            className="action-btn primary"
                            onClick={saveChanges}
                            disabled={allergyCreating || allergyUpdating}
                        >
                            <FaCheck />
                            {allergyCreating || allergyUpdating
                                ? t(`${prefix}.buttons.saving`)
                                : t(editedData.id
                                    ? `${prefix}.buttons.updateAllergy`
                                    : `${prefix}.buttons.addAllergy`)
                            }
                        </button>
                    </div>
                </div>
            );
        }

        // View Mode
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

                {allergiesError && (
                    <div className="alert alert-error">{allergiesError}</div>
                )}

                {myAllergies.length === 0 ? (
                    <div className="empty-state">
                        <FaAllergies className="empty-icon" />
                        <p>{t(`${prefix}.allergies.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addAllergy`)}
                        </button>
                    </div>
                ) : (
                    <div className="allergies-list">
                        {myAllergies.map(allergy => (
                            <div className="allergy-card" key={allergy.id}>
                                <div className="allergy-header">
                                    <div className="allergy-title">
                                        <h4>{allergy.allergy_name || 'Unknown Allergen'}</h4>
                                        <span className={`severity-badge severity-${(allergy.severity || 'low').toLowerCase()}`}>
                                            {t(`${prefix}.allergies.severity.${(allergy.severity || 'low').toLowerCase()}`)}
                                        </span>
                                    </div>
                                    <div className="allergy-actions">
                                        <button
                                            className="edit-btn small"
                                            onClick={() => startEditing({
                                                ...allergy,
                                                allergenId: allergy.allergy,
                                                diagnosedDate: allergy.diagnosed_date
                                            })}
                                        >
                                            <FaPencilAlt />
                                        </button>
                                        <button
                                            className="delete-btn small"
                                            onClick={() => dispatch(DeleteMyAllergyAction(allergy.id))}
                                            disabled={allergiesLoading}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>
                                <div className="allergy-details">
                                    <div className="allergy-item">
                                        <span className="allergy-label">{t(`${prefix}.allergies.details.reaction`)}:</span>
                                        <span className="allergy-value">{allergy.reaction || 'Not specified'}</span>
                                    </div>
                                    <div className="allergy-item">
                                        <span className="allergy-label">{t(`${prefix}.allergies.details.diagnosed`)}:</span>
                                        <span className="allergy-value">
                                            {allergy.diagnosed_date
                                                ? new Date(allergy.diagnosed_date).toLocaleDateString()
                                                : 'Not specified'}
                                        </span>
                                    </div>
                                    {allergy.notes && (
                                        <div className="allergy-item notes">
                                            <span className="allergy-label">{t(`${prefix}.allergies.details.notes`)}:</span>
                                            <span className="allergy-value">{allergy.notes}</span>
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
        // Show restricted content if user is not a patient yet
        if (!isPatient) {
            return renderRestrictedTabContent('medical conditions');
        }

        if (isEditing) {
            return (
                <div className="edit-form conditions-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.condition`)}</label>
                            <input
                                type="text"
                                value={editedData.condition || ''}
                                onChange={(e) => setEditedData({ ...editedData, condition: e.target.value })}
                                placeholder="Enter condition name"
                                required
                            />
                        </div>
                        <div className="form-group span">
                            <label>{t(`${prefix}.medicalConditions.form.diagnosedDate`)}</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || editedData.diagnosed_date || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalConditions.form.status`)}</label>
                            <select
                                value={editedData.status || 'active'}
                                onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                            >
                                <option value="active">{t(`${prefix}.medicalConditions.status.active`)}</option>
                                <option value="inactive">{t(`${prefix}.medicalConditions.status.inactive`)}</option>
                                <option value="resolved">{t(`${prefix}.medicalConditions.status.resolved`)}</option>
                                <option value="unknown">{t(`${prefix}.medicalConditions.status.unknown`)}</option>
                            </select>
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.doctor`)}</label>
                            <input
                                type="text"
                                value={editedData.doctor || ''}
                                onChange={(e) => setEditedData({ ...editedData, doctor: e.target.value })}
                                placeholder="Enter doctor's name"
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalConditions.form.notes`)}</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                                placeholder="Additional notes about the condition"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button
                            className="action-btn primary"
                            onClick={saveChanges}
                            disabled={chronicDiseaseCreating || chronicDiseaseUpdating}
                        >
                            <FaCheck />
                            {chronicDiseaseCreating || chronicDiseaseUpdating
                                ? t(`${prefix}.buttons.saving`)
                                : t(editedData.id
                                    ? `${prefix}.buttons.updateCondition`
                                    : `${prefix}.buttons.addCondition`)
                            }
                        </button>
                    </div>
                </div>
            );
        }

        // View Mode
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

                {chronicDiseasesError && (
                    <div className="alert alert-error">{chronicDiseasesError}</div>
                )}

                {myChronicDiseases.length === 0 ? (
                    <div className="empty-state">
                        <FaNotesMedical className="empty-icon" />
                        <p>{t(`${prefix}.medicalConditions.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addCondition`)}
                        </button>
                    </div>
                ) : (
                    <div className="conditions-list">
                        {myChronicDiseases.map(condition => (
                            <div className="condition-card" key={condition.id}>
                                <div className="condition-header">
                                    <div className="condition-title">
                                        <h4>{condition.disease_name || condition.disease || 'Unknown Condition'}</h4>
                                        <span className={`status-badge status-${(condition.status || 'active').toLowerCase().replace(/\s+|_/g, '-')}`}>
                                            {t(`${prefix}.medicalConditions.status.${(condition.status || 'active').toLowerCase().replace(/\s+|_/g, '')}`)}
                                        </span>
                                    </div>
                                    <div className="condition-actions">
                                        <button
                                            className="edit-btn small"
                                            onClick={() => startEditing({
                                                ...condition,
                                                diagnosedDate: condition.diagnosed_date,
                                                condition: condition.disease_name || condition.disease,
                                                doctor: condition.doctor
                                            })}
                                        >
                                            <FaPencilAlt />
                                        </button>
                                        <button
                                            className="delete-btn small"
                                            onClick={() => dispatch(DeleteMyChronicDiseaseAction(condition.id))}
                                            disabled={chronicDiseasesLoading}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>
                                <div className="condition-details">
                                    {condition.doctor && (
                                        <div className="condition-item">
                                            <span className="condition-label">{t(`${prefix}.medicalConditions.details.doctor`)}:</span>
                                            <span className="condition-value">{condition.doctor}</span>
                                        </div>
                                    )}
                                    <div className="condition-item">
                                        <span className="condition-label">{t(`${prefix}.medicalConditions.details.diagnosed`)}:</span>
                                        <span className="condition-value">
                                            {condition.diagnosed_date
                                                ? new Date(condition.diagnosed_date).toLocaleDateString()
                                                : 'Not specified'}
                                        </span>
                                    </div>
                                    {condition.notes && (
                                        <div className="condition-item notes">
                                            <span className="condition-label">{t(`${prefix}.medicalConditions.details.notes`)}:</span>
                                            <span className="condition-value">{condition.notes}</span>
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
        // Show restricted content if user is not a patient yet
        if (!isPatient) {
            return renderRestrictedTabContent('insurance information');
        }

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

        // View Mode
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
        // Show restricted content if user is not a patient yet
        if (!isPatient) {
            return renderRestrictedTabContent('medical history');
        }

        if (isEditing) {
            return (
                <div className="edit-form history-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalHistory.form.procedureDescription`)}</label>
                            <input
                                type="text"
                                value={editedData.procedure || ''}
                                onChange={(e) => setEditedData({ ...editedData, procedure: e.target.value })}
                                placeholder="Describe the surgery or procedure"
                                required
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
                                value={editedData.provider || ''}
                                onChange={(e) => setEditedData({ ...editedData, provider: e.target.value })}
                                placeholder="Hospital or clinic name"
                            />
                        </div>
                        <div className="form-group">
                            <label>{t(`${prefix}.medicalHistory.form.physician`)}</label>
                            <input
                                type="text"
                                value={editedData.physician || ''}
                                onChange={(e) => setEditedData({ ...editedData, physician: e.target.value })}
                                placeholder="Doctor's name"
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>{t(`${prefix}.medicalHistory.form.notes`)}</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                                placeholder="Additional notes or complications"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> {t(`${prefix}.buttons.cancel`)}
                        </button>
                        <button
                            className="action-btn primary"
                            onClick={saveChanges}
                            disabled={surgeryCreating || surgeryUpdating}
                        >
                            <FaCheck />
                            {surgeryCreating || surgeryUpdating
                                ? t(`${prefix}.buttons.saving`)
                                : t(editedData.id
                                    ? `${prefix}.buttons.updateRecord`
                                    : `${prefix}.buttons.addRecord`)
                            }
                        </button>
                    </div>
                </div>
            );
        }

        // View Mode
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

                {surgeriesError && (
                    <div className="alert alert-error">{surgeriesError}</div>
                )}

                {mySurgeries.length === 0 ? (
                    <div className="empty-state">
                        <FaHistory className="empty-icon" />
                        <p>{t(`${prefix}.medicalHistory.emptyState`)}</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            {t(`${prefix}.buttons.addRecord`)}
                        </button>
                    </div>
                ) : (
                    <div className="timeline">
                        {mySurgeries.map(record => (
                            <div className="timeline-item" key={record.id}>
                                <div className="timeline-marker">
                                    <div className="timeline-icon">
                                        <FaNotesMedical />
                                    </div>
                                    <div className="timeline-date">
                                        {record.date
                                            ? new Date(record.date).toLocaleDateString(
                                                language === 'ar' ? 'ar-EG' : 'en-US',
                                                { year: 'numeric', month: 'short' }
                                            )
                                            : 'No date'
                                        }
                                    </div>
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h4>{record.surgery_name || record.surgery || 'Unknown Procedure'}</h4>
                                        <button
                                            className="edit-btn small"
                                            onClick={() => startEditing({
                                                ...record,
                                                procedure: record.surgery_name || record.surgery,
                                                provider: record.provider,
                                                physician: record.doctor
                                            })}
                                        >
                                            <FaPencilAlt />
                                        </button>
                                        <button
                                            className="delete-btn small"
                                            onClick={() => dispatch(DeleteMySurgeryAction(record.id))}
                                            disabled={surgeriesLoading}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <div className="timeline-details">
                                        {record.provider && (
                                            <div className="timeline-detail">
                                                <span className="detail-label">{t(`${prefix}.medicalHistory.details.provider`)}:</span>
                                                <span className="detail-value">{record.provider}</span>
                                            </div>
                                        )}
                                        {record.doctor && (
                                            <div className="timeline-detail">
                                                <span className="detail-label">{t(`${prefix}.medicalHistory.details.physician`)}:</span>
                                                <span className="detail-value">{record.doctor}</span>
                                            </div>
                                        )}
                                        {record.notes && (
                                            <div className="timeline-detail notes">
                                                <span className="detail-label">{t(`${prefix}.medicalHistory.details.notes`)}:</span>
                                                <span className="detail-value">{record.notes}</span>
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
            case TABS.PERSONAL:
                return renderPersonalInfoContent();
            case TABS.ALLERGIES:
                return renderAllergiesContent();
            case TABS.CHRONIC:
                return renderMedicalConditionsContent();
            case TABS.INSURANCE:
                return renderInsuranceContent();
            case TABS.HISTORY:
                return renderMedicalHistoryContent();
            default:
                return renderPersonalInfoContent();
        }
    };

    // ==================== ERROR HANDLING ====================
    if (profileError && !apiProfile && initialLoadComplete && isPatient !== false) {
        return (
            <div className="patient-health-profile">
                <div className="error-state">
                    <FaExclamationTriangle className="error-icon" />
                    <h3>Error Loading Profile</h3>
                    <p>{profileError}</p>
                    <button
                        className="action-btn primary"
                        onClick={() => dispatch(GetProfileAction())}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // ==================== MAIN RENDER ====================
    return (
        <div className="patient-health-profile">
            <div className="profile-container">
                {/* Sidebar Navigation */}
                <div className="profile-sidebar">
                    <div className="sidebar-header">
                        <h2>{t(`${prefix}.title`)}</h2>
                    </div>
                    <div className="sidebar-nav">
                        <button
                            className={`nav-item ${activeTab === TABS.PERSONAL ? 'active' : ''}`}
                            onClick={() => handleTabChange(TABS.PERSONAL)}
                        >
                            <FaUserAlt className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.personalInfo`)}</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === TABS.ALLERGIES ? 'active' : ''} ${!isPatient ? 'disabled' : ''}`}
                            onClick={() => handleTabChange(TABS.ALLERGIES)}
                        >
                            <FaAllergies className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.allergies`)}</span>
                            {myAllergies.length > 0 && <span className="badge">{myAllergies.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === TABS.CHRONIC ? 'active' : ''} ${!isPatient ? 'disabled' : ''}`}
                            onClick={() => handleTabChange(TABS.CHRONIC)}
                        >
                            <FaNotesMedical className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.chronicDiseases`)}</span>
                            {myChronicDiseases.length > 0 && <span className="badge">{myChronicDiseases.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === TABS.INSURANCE ? 'active' : ''} ${!isPatient ? 'disabled' : ''}`}
                            onClick={() => handleTabChange(TABS.INSURANCE)}
                        >
                            <FaIdCard className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.insuranceInfo`)}</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === TABS.HISTORY ? 'active' : ''} ${!isPatient ? 'disabled' : ''}`}
                            onClick={() => handleTabChange(TABS.HISTORY)}
                        >
                            <FaHistory className="nav-icon" />
                            <span>{t(`${prefix}.navigationTabs.medicalHistory`)}</span>
                            {mySurgeries.length > 0 && <span className="badge">{mySurgeries.length}</span>}
                        </button>
                    </div>
                    <div className="sidebar-footer">
                        <button className="print-btn" disabled={!isPatient}>
                            <FaFileAlt /> {t(`${prefix}.buttons.printRecord`)}
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="profile-content">
                    {getCurrentTabLoading() ? (
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