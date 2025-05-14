import React, { useState, useEffect } from 'react';
import './DoctorPatientMedicalRecords.scss';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import {
    FaUserAlt,
    FaArrowLeft,
    FaHistory,
    FaPills,
    FaAllergies,
    FaNotesMedical,
    FaFileMedical,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaFilePdf,
    FaFileImage,
    FaFileAlt,
    FaDownload,
    FaSearch,
    FaUserMd,
    FaClinicMedical,
    FaPencilAlt,
    FaSyncAlt,
    FaPlus,
    FaVial,
    FaHeartbeat,
    FaWeight,
    FaRulerVertical,
    FaClipboardCheck
} from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export const DoctorPatientMedicalRecords = () => {
    const { t, isRTL } = useLanguage();
    const { patientId } = useParams();
    const navigate = useNavigate();

    // Sample data - in a real app, this would come from your API/backend
    const [patients, setPatients] = useState([
        {
            id: 'PT-1234',
            name: 'Ahmed Hassan',
            age: 45,
            gender: 'Male',
            dateOfBirth: '1980-06-15',
            phoneNumber: '+962 77 123 4567',
            email: 'ahmed.hassan@example.com',
            address: '123 Main Street, Amman, Jordan',
            bloodType: 'O+',
            emergencyContact: {
                name: 'Fatima Hassan',
                relationship: 'Wife',
                phone: '+962 77 987 6543'
            },
            allergies: [
                {
                    allergen: 'Penicillin',
                    severity: 'High',
                    reaction: 'Hives, difficulty breathing',
                    notes: 'Avoid all penicillin-based antibiotics'
                },
                {
                    allergen: 'Sulfa Drugs',
                    severity: 'Moderate',
                    reaction: 'Skin rash',
                    notes: ''
                }
            ],
            conditions: [
                {
                    name: 'Hypertension',
                    diagnosedDate: '2018-03-15',
                    status: 'Active',
                    notes: 'Well-controlled with medication'
                },
                {
                    name: 'Type 2 Diabetes',
                    diagnosedDate: '2020-07-10',
                    status: 'Active',
                    notes: 'Monitoring blood glucose levels daily'
                }
            ],
            medications: [
                {
                    name: 'Metformin',
                    dosage: '500mg',
                    frequency: 'Twice daily',
                    startDate: '2020-07-15',
                    endDate: null,
                    prescribedBy: 'Dr. Mahmoud Ahmed'
                },
                {
                    name: 'Lisinopril',
                    dosage: '10mg',
                    frequency: 'Once daily',
                    startDate: '2018-04-10',
                    endDate: null,
                    prescribedBy: 'Dr. Mahmoud Ahmed'
                }
            ],
            visits: [
                {
                    id: 'V-5678',
                    date: '2025-03-15',
                    type: 'Follow-up',
                    provider: 'Dr. Mahmoud Ahmed',
                    reason: 'Diabetes management',
                    notes: 'Patient reports good compliance with medication. Blood sugar levels have improved since last visit.',
                    vitalSigns: {
                        bloodPressure: '135/85 mmHg',
                        heartRate: '72 bpm',
                        respiratoryRate: '16 breaths/min',
                        temperature: '36.7°C',
                        height: '175 cm',
                        weight: '82 kg',
                        bmi: '26.8'
                    },
                    diagnoses: ['Well-controlled hypertension', 'Type 2 diabetes'],
                    prescriptions: ['Metformin 500mg', 'Lisinopril 10mg'],
                    recommendations: 'Continue current medications. Follow up in 3 months. Maintain diet and exercise routine.'
                },
                {
                    id: 'V-4567',
                    date: '2024-12-10',
                    type: 'Annual physical',
                    provider: 'Dr. Mahmoud Ahmed',
                    reason: 'Annual check-up',
                    notes: 'Comprehensive physical examination with no significant findings. Review of chronic conditions.',
                    vitalSigns: {
                        bloodPressure: '140/90 mmHg',
                        heartRate: '75 bpm',
                        respiratoryRate: '18 breaths/min',
                        temperature: '36.5°C',
                        height: '175 cm',
                        weight: '84 kg',
                        bmi: '27.4'
                    },
                    diagnoses: ['Hypertension', 'Type 2 diabetes', 'Overweight'],
                    prescriptions: ['Metformin 500mg', 'Lisinopril 10mg'],
                    recommendations: 'Weight management through diet and exercise. Monitor blood sugar levels.'
                }
            ],
            labResults: [
                {
                    id: 'LR-7890',
                    date: '2025-03-10',
                    type: 'Blood Work',
                    orderedBy: 'Dr. Mahmoud Ahmed',
                    facility: 'Jordan Medical Lab',
                    results: [
                        {
                            test: 'HbA1c',
                            value: '6.8%',
                            referenceRange: '4.0-5.6%',
                            flag: 'High'
                        },
                        {
                            test: 'Glucose (Fasting)',
                            value: '135 mg/dL',
                            referenceRange: '70-99 mg/dL',
                            flag: 'High'
                        },
                        {
                            test: 'Cholesterol, Total',
                            value: '195 mg/dL',
                            referenceRange: '<200 mg/dL',
                            flag: 'Normal'
                        },
                        {
                            test: 'LDL',
                            value: '110 mg/dL',
                            referenceRange: '<100 mg/dL',
                            flag: 'High'
                        },
                        {
                            test: 'HDL',
                            value: '45 mg/dL',
                            referenceRange: '>40 mg/dL',
                            flag: 'Normal'
                        },
                        {
                            test: 'Triglycerides',
                            value: '150 mg/dL',
                            referenceRange: '<150 mg/dL',
                            flag: 'Normal'
                        }
                    ],
                    summary: 'Diabetes slightly above target. Lipid panel largely within normal limits with slight LDL elevation. Continue current management.'
                },
                {
                    id: 'LR-6789',
                    date: '2024-12-05',
                    type: 'Blood Work',
                    orderedBy: 'Dr. Mahmoud Ahmed',
                    facility: 'Jordan Medical Lab',
                    results: [
                        {
                            test: 'HbA1c',
                            value: '7.2%',
                            referenceRange: '4.0-5.6%',
                            flag: 'High'
                        },
                        {
                            test: 'Glucose (Fasting)',
                            value: '145 mg/dL',
                            referenceRange: '70-99 mg/dL',
                            flag: 'High'
                        },
                        {
                            test: 'Cholesterol, Total',
                            value: '205 mg/dL',
                            referenceRange: '<200 mg/dL',
                            flag: 'High'
                        },
                        {
                            test: 'LDL',
                            value: '115 mg/dL',
                            referenceRange: '<100 mg/dL',
                            flag: 'High'
                        },
                        {
                            test: 'HDL',
                            value: '42 mg/dL',
                            referenceRange: '>40 mg/dL',
                            flag: 'Normal'
                        },
                        {
                            test: 'Triglycerides',
                            value: '170 mg/dL',
                            referenceRange: '<150 mg/dL',
                            flag: 'High'
                        }
                    ],
                    summary: 'Diabetes control needs improvement. Lipid panel shows multiple elevations. Recommend lifestyle modifications and medication adjustment.'
                }
            ],
            documents: [
                {
                    id: 'DOC-1234',
                    name: 'ECG Report',
                    date: '2024-12-10',
                    type: 'pdf',
                    uploadedBy: 'Dr. Mahmoud Ahmed',
                    description: 'Annual ECG results'
                },
                {
                    id: 'DOC-2345',
                    name: 'Chest X-Ray',
                    date: '2024-12-10',
                    type: 'image',
                    uploadedBy: 'Radiology Department',
                    description: 'Annual chest X-ray'
                }
            ]
        },
        {
            id: 'PT-5678',
            name: 'Layla Abbas',
            age: 32,
            gender: 'Female',
            // Additional patient data would go here
        },
        {
            id: 'PT-9012',
            name: 'Omar Farouq',
            age: 58,
            gender: 'Male',
            // Additional patient data would go here
        }
    ]);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeTab, setActiveTab] = useState('summary');
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [selectedLabResult, setSelectedLabResult] = useState(null);

    // Simulate loading state and find patient
    useEffect(() => {
        // Set a loading state
        setIsLoaded(false);

        const loadPatient = setTimeout(() => {
            if (patientId) {
                const patient = patients.find(p => p.id === patientId);

                if (patient) {
                    setSelectedPatient(patient);
                    console.log("Patient data loaded successfully:", patient.id);
                } else {
                    console.error("Patient not found with ID:", patientId);
                    // Handle the case when patient is not found
                    // You might want to show an error message or redirect
                }
            } else {
                console.log("No patient ID provided");
            }

            // Set loaded to true regardless of whether patient was found
            setIsLoaded(true);
        }, 800);

        // Clean up the timeout if the component unmounts
        return () => clearTimeout(loadPatient);
    }, [patientId, patients]);

    // Handler for tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedVisit(null);
        setSelectedLabResult(null);
    };

    // Select a visit for detailed view
    const handleVisitSelect = (visit) => {
        setSelectedVisit(visit === selectedVisit ? null : visit);
    };

    // Select a lab result for detailed view
    const handleLabResultSelect = (result) => {
        setSelectedLabResult(result === selectedLabResult ? null : result);
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get age from birthdate
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    // Get severity class
    const getSeverityClass = (severity) => {
        switch (severity.toLowerCase()) {
            case 'high':
                return 'high';
            case 'moderate':
                return 'moderate';
            case 'low':
                return 'low';
            default:
                return '';
        }
    };

    // Get status class
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'active';
            case 'resolved':
                return 'resolved';
            case 'in remission':
                return 'in-remission';
            default:
                return '';
        }
    };

    // Get file icon
    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <FaFilePdf />;
            case 'image':
                return <FaFileImage />;
            default:
                return <FaFileAlt />;
        }
    };

    // Get flag class
    const getFlagClass = (flag) => {
        switch (flag.toLowerCase()) {
            case 'high':
            case 'abnormal':
            case 'critical':
                return 'high';
            case 'low':
                return 'low';
            case 'normal':
                return 'normal';
            default:
                return '';
        }
    };

    // Render no patient view
    const renderNoPatient = () => {
        return (
            <div className="no-patient-view">
                <div className="no-patient-content">
                    <FaUserAlt className="no-patient-icon" />
                    <h2>{t('doctorPage.medicalRecords.noPatientSelected')}</h2>
                    <p>{t('doctorPage.medicalRecords.selectPatientPrompt')}</p>
                    <button
                        className="go-to-patients-btn"
                        onClick={() => navigate('/doctor/patients')}
                    >
                        {t('doctorPage.medicalRecords.viewMyPatients')}
                    </button>
                </div>
            </div>
        );
    };

    // Render summary tab
    const renderSummaryTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="summary-tab">
                <div className="patient-overview">
                    <div className="overview-header">
                        <h3>{t('doctorPage.medicalRecords.summary.patientOverview')}</h3>
                    </div>

                    <div className="overview-content">
                        <div className="patient-basic-info">
                            <div className="info-group">
                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.dateOfBirth')}</span>
                                    <span className="info-value">{formatDate(selectedPatient.dateOfBirth)} ({calculateAge(selectedPatient.dateOfBirth)} {t('doctorPage.medicalRecords.summary.years')})</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.gender')}</span>
                                    <span className="info-value">{selectedPatient.gender}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.bloodType')}</span>
                                    <span className="info-value">{selectedPatient.bloodType}</span>
                                </div>
                            </div>

                            <div className="info-group">
                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.phone')}</span>
                                    <span className="info-value">{selectedPatient.phoneNumber}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.email')}</span>
                                    <span className="info-value">{selectedPatient.email}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.address')}</span>
                                    <span className="info-value">{selectedPatient.address}</span>
                                </div>
                            </div>

                            <div className="info-group">
                                <div className="info-item">
                                    <span className="info-label">{t('doctorPage.medicalRecords.summary.emergencyContact')}</span>
                                    <span className="info-value">
                                        {selectedPatient.emergencyContact?.name} ({selectedPatient.emergencyContact?.relationship}) - {selectedPatient.emergencyContact?.phone}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="patient-vitals">
                            <h4>{t('doctorPage.medicalRecords.summary.lastRecordedVitalSigns')}</h4>
                            <p className="vital-date">{t('doctorPage.medicalRecords.summary.fromVisitOn')} {formatDate(selectedPatient.visits[0]?.date || 'N/A')}</p>

                            <div className="vitals-grid">
                                <div className="vital-card">
                                    <div className="vital-icon">
                                        <FaHeartbeat />
                                    </div>
                                    <div className="vital-data">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.bloodPressure')}</span>
                                        <span className="vital-value">{selectedPatient.visits[0]?.vitalSigns.bloodPressure || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="vital-card">
                                    <div className="vital-icon">
                                        <FaHeartbeat />
                                    </div>
                                    <div className="vital-data">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.heartRate')}</span>
                                        <span className="vital-value">{selectedPatient.visits[0]?.vitalSigns.heartRate || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="vital-card">
                                    <div className="vital-icon">
                                        <FaWeight />
                                    </div>
                                    <div className="vital-data">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.weight')}</span>
                                        <span className="vital-value">{selectedPatient.visits[0]?.vitalSigns.weight || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="vital-card">
                                    <div className="vital-icon">
                                        <FaRulerVertical />
                                    </div>
                                    <div className="vital-data">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.height')}</span>
                                        <span className="vital-value">{selectedPatient.visits[0]?.vitalSigns.height || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('visits')}>
                                {t('doctorPage.medicalRecords.summary.viewAllVitals')}
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="summary-sections">
                    <div className="summary-section">
                        <div className="section-header">
                            <h3><FaAllergies /> {t('doctorPage.medicalRecords.allergies.title')}</h3>
                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('allergies')}>
                                {t('doctorPage.medicalRecords.common.viewAll')}
                            </NavLink>
                        </div>

                        <div className="section-content">
                            {selectedPatient.allergies.length > 0 ? (
                                <div className="allergies-list">
                                    {selectedPatient.allergies.slice(0, 2).map((allergy, index) => (
                                        <div className="summary-allergy-item" key={index}>
                                            <div className="allergy-header">
                                                <span className="allergy-name">{allergy.allergen}</span>
                                                <span className={`severity-badge ${getSeverityClass(allergy.severity)}`}>
                                                    {allergy.severity}
                                                </span>
                                            </div>
                                            <p className="allergy-reaction">{allergy.reaction}</p>
                                        </div>
                                    ))}

                                    {selectedPatient.allergies.length > 2 && (
                                        <NavLink to="#" className="more-link" onClick={() => handleTabChange('allergies')}>
                                            +{selectedPatient.allergies.length - 2} {t('doctorPage.medicalRecords.common.more')}
                                        </NavLink>
                                    )}
                                </div>
                            ) : (
                                <p className="no-data-message">{t('doctorPage.medicalRecords.allergies.noAllergies')}</p>
                            )}
                        </div>
                    </div>

                    <div className="summary-section">
                        <div className="section-header">
                            <h3><FaNotesMedical /> {t('doctorPage.medicalRecords.conditions.title')}</h3>
                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('conditions')}>
                                {t('doctorPage.medicalRecords.common.viewAll')}
                            </NavLink>
                        </div>

                        <div className="section-content">
                            {selectedPatient.conditions.length > 0 ? (
                                <div className="conditions-list">
                                    {selectedPatient.conditions.slice(0, 2).map((condition, index) => (
                                        <div className="summary-condition-item" key={index}>
                                            <div className="condition-header">
                                                <span className="condition-name">{condition.name}</span>
                                                <span className={`status-badge ${getStatusClass(condition.status)}`}>
                                                    {condition.status}
                                                </span>
                                            </div>
                                            <p className="condition-details">
                                                {t('doctorPage.medicalRecords.conditions.diagnosed')}: {formatDate(condition.diagnosedDate)}
                                            </p>
                                        </div>
                                    ))}

                                    {selectedPatient.conditions.length > 2 && (
                                        <NavLink to="#" className="more-link" onClick={() => handleTabChange('conditions')}>
                                            +{selectedPatient.conditions.length - 2} {t('doctorPage.medicalRecords.common.more')}
                                        </NavLink>
                                    )}
                                </div>
                            ) : (
                                <p className="no-data-message">{t('doctorPage.medicalRecords.conditions.noConditions')}</p>
                            )}
                        </div>
                    </div>

                    <div className="summary-section">
                        <div className="section-header">
                            <h3><FaPills /> {t('doctorPage.medicalRecords.medications.currentMedications')}</h3>
                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('medications')}>
                                {t('doctorPage.medicalRecords.common.viewAll')}
                            </NavLink>
                        </div>

                        <div className="section-content">
                            {selectedPatient.medications.length > 0 ? (
                                <div className="medications-list">
                                    {selectedPatient.medications.slice(0, 3).map((medication, index) => (
                                        <div className="summary-medication-item" key={index}>
                                            <div className="medication-header">
                                                <span className="medication-name">{medication.name}</span>
                                                <span className="medication-dosage">{medication.dosage}</span>
                                            </div>
                                            <p className="medication-details">
                                                {medication.frequency} • {t('doctorPage.medicalRecords.medications.since')} {formatDate(medication.startDate)}
                                            </p>
                                        </div>
                                    ))}

                                    {selectedPatient.medications.length > 3 && (
                                        <NavLink to="#" className="more-link" onClick={() => handleTabChange('medications')}>
                                            +{selectedPatient.medications.length - 3} {t('doctorPage.medicalRecords.common.more')}
                                        </NavLink>
                                    )}
                                </div>
                            ) : (
                                <p className="no-data-message">{t('doctorPage.medicalRecords.medications.noMedications')}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="recent-records">
                    <div className="recent-section">
                        <div className="section-header">
                            <h3><FaHistory /> {t('doctorPage.medicalRecords.visits.recentVisits')}</h3>
                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('visits')}>
                                {t('doctorPage.medicalRecords.common.viewAll')}
                            </NavLink>
                        </div>

                        <div className="section-content">
                            {selectedPatient.visits.length > 0 ? (
                                <div className="visits-list">
                                    {selectedPatient.visits.slice(0, 2).map((visit, index) => (
                                        <div className="summary-visit-item" key={index}>
                                            <div className="visit-date">
                                                <div className="date-day">{new Date(visit.date).getDate()}</div>
                                                <div className="date-month">{new Date(visit.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                            </div>

                                            <div className="visit-details">
                                                <div className="visit-header">
                                                    <h4>{visit.type}</h4>
                                                    <span className="visit-provider">{visit.provider}</span>
                                                </div>
                                                <p className="visit-reason">{visit.reason}</p>
                                            </div>

                                            <NavLink to="#" className="view-details-link" onClick={(e) => {
                                                e.preventDefault();
                                                handleTabChange('visits');
                                                setTimeout(() => handleVisitSelect(visit), 0);
                                            }}>
                                                {t('doctorPage.medicalRecords.common.details')}
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data-message">{t('doctorPage.medicalRecords.visits.noVisits')}</p>
                            )}
                        </div>
                    </div>

                    <div className="recent-section">
                        <div className="section-header">
                            <h3><FaVial /> {t('doctorPage.medicalRecords.labs.recentLabResults')}</h3>
                            <NavLink to="#" className="view-all-link" onClick={() => handleTabChange('labs')}>
                                {t('doctorPage.medicalRecords.common.viewAll')}
                            </NavLink>
                        </div>

                        <div className="section-content">
                            {selectedPatient.labResults?.length > 0 ? (
                                <div className="lab-results-list">
                                    {selectedPatient.labResults.slice(0, 1).map((lab, index) => (
                                        <div className="summary-lab-item" key={index}>
                                            <div className="lab-header">
                                                <h4>{lab.type}</h4>
                                                <span className="lab-date">{formatDate(lab.date)}</span>
                                            </div>

                                            <div className="key-results">
                                                {lab.results.filter(result => result.flag !== 'Normal').slice(0, 2).map((result, i) => (
                                                    <div className="result-item" key={i}>
                                                        <span className="result-name">{result.test}:</span>
                                                        <span className="result-value">{result.value}</span>
                                                        <span className={`result-flag ${getFlagClass(result.flag)}`}>
                                                            {result.flag}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <NavLink to="#" className="view-details-link" onClick={(e) => {
                                                e.preventDefault();
                                                handleTabChange('labs');
                                                setTimeout(() => handleLabResultSelect(lab), 0);
                                            }}>
                                                {t('doctorPage.medicalRecords.labs.viewFullResults')}
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data-message">{t('doctorPage.medicalRecords.labs.noLabResults')}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <NavLink to={`/doctor/write-prescription?patientId=${selectedPatient.id}`} className="action-button primary">
                        <FaPills /> {t('doctorPage.medicalRecords.actions.writePrescription')}
                    </NavLink>

                    <button className="action-button secondary">
                        <FaCalendarAlt /> {t('doctorPage.medicalRecords.actions.scheduleAppointment')}
                    </button>
                </div>
            </div>
        );
    };

    // Render allergies tab
    const renderAllergiesTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="allergies-tab">
                <div className="section-header-with-actions">
                    <h3><FaAllergies /> {t('doctorPage.medicalRecords.allergies.allergiesAndSensitivities')}</h3>
                    <div className="section-actions">
                        <button className="action-button secondary add-btn">
                            <FaPlus /> {t('doctorPage.medicalRecords.allergies.addAllergy')}
                        </button>
                    </div>
                </div>

                <div className="allergies-list-detailed">
                    {selectedPatient.allergies.length > 0 ? (
                        selectedPatient.allergies.map((allergy, index) => (
                            <div className="allergy-card" key={index}>
                                <div className="allergy-header">
                                    <h4>{allergy.allergen}</h4>
                                    <span className={`severity-badge ${getSeverityClass(allergy.severity)}`}>
                                        {allergy.severity} {t('doctorPage.medicalRecords.allergies.severity')}
                                    </span>
                                </div>

                                <div className="allergy-details">
                                    <div className="detail-item">
                                        <span className="detail-label">{t('doctorPage.medicalRecords.allergies.reaction')}:</span>
                                        <span className="detail-value">{allergy.reaction}</span>
                                    </div>

                                    {allergy.notes && (
                                        <div className="detail-item">
                                            <span className="detail-label">{t('doctorPage.medicalRecords.common.notes')}:</span>
                                            <span className="detail-value">{allergy.notes}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="allergy-warning">
                                    <FaExclamationTriangle />
                                    <span>{t('doctorPage.medicalRecords.allergies.verifyWarning')}</span>
                                </div>

                                <button className="edit-btn">
                                    <FaPencilAlt />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-data-card">
                            <FaAllergies className="no-data-icon" />
                            <h4>{t('doctorPage.medicalRecords.allergies.noKnownAllergies')}</h4>
                            <p>{t('doctorPage.medicalRecords.allergies.noAllergiesRecorded')}</p>
                            <button className="action-button secondary">
                                <FaPlus /> {t('doctorPage.medicalRecords.allergies.addAllergy')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render medications tab
    const renderMedicationsTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="medications-tab">
                <div className="section-header-with-actions">
                    <h3><FaPills /> {t('doctorPage.medicalRecords.medications.title')}</h3>
                    <div className="section-actions">
                        <NavLink to={`/doctor/write-prescription?patientId=${selectedPatient.id}`} className="action-button primary add-btn">
                            <FaPills /> {t('doctorPage.medicalRecords.actions.writePrescription')}
                        </NavLink>
                    </div>
                </div>

                <div className="medications-list detailed">
                    {selectedPatient.medications.length > 0 ? (
                        selectedPatient.medications.map((medication, index) => (
                            <div className="medication-card" key={index}>
                                <div className="medication-header">
                                    <h4>{medication.name}</h4>
                                    <span className="medication-dosage">{medication.dosage}</span>
                                </div>

                                <div className="medication-details">
                                    <div className="detail-item">
                                        <span className="detail-label">{t('doctorPage.medicalRecords.medications.frequency')}:</span>
                                        <span className="detail-value">{medication.frequency}</span>
                                    </div>

                                    <div className="detail-item">
                                        <span className="detail-label">{t('doctorPage.medicalRecords.medications.startDate')}:</span>
                                        <span className="detail-value">{formatDate(medication.startDate)}</span>
                                    </div>

                                    {medication.endDate && (
                                        <div className="detail-item">
                                            <span className="detail-label">{t('doctorPage.medicalRecords.medications.endDate')}:</span>
                                            <span className="detail-value">{formatDate(medication.endDate)}</span>
                                        </div>
                                    )}

                                    <div className="detail-item">
                                        <span className="detail-label">{t('doctorPage.medicalRecords.medications.prescribedBy')}:</span>
                                        <span className="detail-value">{medication.prescribedBy}</span>
                                    </div>
                                </div>

                                <button className="edit-btn">
                                    <FaPencilAlt />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-data-card">
                            <FaPills className="no-data-icon" />
                            <h4>{t('doctorPage.medicalRecords.medications.noMedications')}</h4>
                            <p>{t('doctorPage.medicalRecords.medications.noMedicationsRecorded')}</p>
                            <NavLink to={`/doctor/write-prescription?patientId=${selectedPatient.id}`} className="action-button primary">
                                <FaPills /> {t('doctorPage.medicalRecords.actions.writePrescription')}
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render visits tab
    const renderVisitsTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="visits-tab">
                <div className="section-header-with-actions">
                    <h3><FaHistory /> {t('doctorPage.medicalRecords.visits.title')}</h3>
                    <div className="section-actions">
                        <button className="action-button secondary add-btn">
                            <FaPlus /> {t('doctorPage.medicalRecords.visits.recordVisit')}
                        </button>
                    </div>
                </div>

                {selectedVisit ? (
                    <div className="visit-detail-view">
                        <button className="back-to-list-btn" onClick={() => setSelectedVisit(null)}>
                            <FaArrowLeft /> {t('doctorPage.medicalRecords.visits.backToVisitList')}
                        </button>

                        <div className="visit-detail-header">
                            <h3>{selectedVisit.type} - {formatDate(selectedVisit.date)}</h3>
                            <span className="provider-info">{t('doctorPage.medicalRecords.medications.prescribedBy')}: {selectedVisit.provider}</span>
                        </div>

                        <div className="visit-detail-card">
                            <div className="card-section">
                                <h4>{t('doctorPage.medicalRecords.visits.visitNotes')}</h4>
                                <p>{selectedVisit.notes}</p>
                            </div>

                            <div className="card-section">
                                <h4>{t('doctorPage.medicalRecords.visits.vitalSigns')}</h4>
                                <div className="vitals-grid detail">
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.bloodPressure')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.bloodPressure}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.heartRate')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.heartRate}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.visits.respiratoryRate')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.respiratoryRate}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.visits.temperature')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.temperature}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.height')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.height}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.summary.weight')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.weight}</span>
                                    </div>
                                    <div className="vital-item">
                                        <span className="vital-label">{t('doctorPage.medicalRecords.visits.bmi')}:</span>
                                        <span className="vital-value">{selectedVisit.vitalSigns.bmi}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-section">
                                <h4>{t('doctorPage.medicalRecords.visits.diagnoses')}</h4>
                                <ul className="diagnoses-list">
                                    {selectedVisit.diagnoses.map((diagnosis, index) => (
                                        <li key={index}>{diagnosis}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-section">
                                <h4>{t('doctorPage.medicalRecords.visits.prescriptions')}</h4>
                                <ul className="prescriptions-list">
                                    {selectedVisit.prescriptions.map((prescription, index) => (
                                        <li key={index}>{prescription}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-section">
                                <h4>{t('doctorPage.medicalRecords.visits.recommendations')}</h4>
                                <p>{selectedVisit.recommendations}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="visits-list-view">
                        {selectedPatient.visits.length > 0 ? (
                            <div className="visits-timeline">
                                {selectedPatient.visits.map((visit, index) => (
                                    <div
                                        className="visit-timeline-item"
                                        key={index}
                                        onClick={() => handleVisitSelect(visit)}
                                    >
                                        <div className="visit-date">
                                            <div className="date-day">{new Date(visit.date).getDate()}</div>
                                            <div className="date-month">{new Date(visit.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                            <div className="date-year">{new Date(visit.date).getFullYear()}</div>
                                        </div>

                                        <div className="visit-content">
                                            <div className="visit-header">
                                                <h4>{visit.type}</h4>
                                                <span className="visit-id">{visit.id}</span>
                                            </div>
                                            <p className="visit-provider">{visit.provider}</p>
                                            <p className="visit-reason">{visit.reason}</p>
                                            <div className="visit-tags">
                                                {visit.diagnoses.slice(0, 2).map((diagnosis, i) => (
                                                    <span className="tag" key={i}>{diagnosis}</span>
                                                ))}
                                                {visit.diagnoses.length > 2 && (
                                                    <span className="more-tag">+{visit.diagnoses.length - 2} {t('doctorPage.medicalRecords.common.more')}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data-card">
                                <FaHistory className="no-data-icon" />
                                <h4>{t('doctorPage.medicalRecords.visits.noVisitHistory')}</h4>
                                <p>{t('doctorPage.medicalRecords.visits.noVisitsRecorded')}</p>
                                <button className="action-button secondary">
                                    <FaPlus /> {t('doctorPage.medicalRecords.visits.recordVisit')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Render labs tab
    const renderLabsTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="labs-tab">
                <div className="section-header-with-actions">
                    <h3><FaVial /> {t('doctorPage.medicalRecords.labs.title')}</h3>
                    <div className="section-actions">
                        <button className="action-button secondary add-btn">
                            <FaPlus /> {t('doctorPage.medicalRecords.labs.addLabResult')}
                        </button>
                    </div>
                </div>

                {selectedLabResult ? (
                    <div className="lab-detail-view">
                        <button className="back-to-list-btn" onClick={() => setSelectedLabResult(null)}>
                            <FaArrowLeft /> {t('doctorPage.medicalRecords.labs.backToLabResults')}
                        </button>

                        <div className="lab-detail-header">
                            <h3>{selectedLabResult.type} - {formatDate(selectedLabResult.date)}</h3>
                            <div className="lab-meta">
                                <span>ID: {selectedLabResult.id}</span>
                                <span>{t('doctorPage.medicalRecords.labs.orderedBy')}: {selectedLabResult.orderedBy}</span>
                                <span>{t('doctorPage.medicalRecords.labs.facility')}: {selectedLabResult.facility}</span>
                            </div>
                        </div>

                        <div className="lab-detail-card">
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>{t('doctorPage.medicalRecords.labs.test')}</th>
                                        <th>{t('doctorPage.medicalRecords.labs.result')}</th>
                                        <th>{t('doctorPage.medicalRecords.labs.referenceRange')}</th>
                                        <th>{t('doctorPage.medicalRecords.labs.flag')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedLabResult.results.map((result, index) => (
                                        <tr key={index} className={`result-row ${getFlagClass(result.flag)}`}>
                                            <td>{result.test}</td>
                                            <td className="result-value">{result.value}</td>
                                            <td>{result.referenceRange}</td>
                                            <td>
                                                <span className={`result-flag ${getFlagClass(result.flag)}`}>
                                                    {result.flag}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="summary-section">
                                <h4>{t('doctorPage.medicalRecords.labs.summary')}</h4>
                                <p>{selectedLabResult.summary}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="labs-list-view">
                        {selectedPatient.labResults?.length > 0 ? (
                            <div className="lab-results-grid">
                                {selectedPatient.labResults.map((lab, index) => (
                                    <div
                                        className="lab-result-card"
                                        key={index}
                                        onClick={() => handleLabResultSelect(lab)}
                                    >
                                        <div className="lab-header">
                                            <h4>{lab.type}</h4>
                                            <span className="lab-date">{formatDate(lab.date)}</span>
                                        </div>

                                        <div className="lab-meta">
                                            <span><FaUserMd /> {lab.orderedBy}</span>
                                            <span><FaClinicMedical /> {lab.facility}</span>
                                        </div>

                                        <div className="lab-highlights">
                                            <h5>{t('doctorPage.medicalRecords.labs.highlights')}</h5>
                                            <div className="result-highlights">
                                                {lab.results
                                                    .filter(result => result.flag !== 'Normal')
                                                    .slice(0, 3)
                                                    .map((result, i) => (
                                                        <div className="highlight-item" key={i}>
                                                            <span className="highlight-name">{result.test}</span>
                                                            <div className="highlight-value">
                                                                <span>{result.value}</span>
                                                                <span className={`highlight-flag ${getFlagClass(result.flag)}`}>
                                                                    {result.flag}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                                {lab.results.filter(result => result.flag !== 'Normal').length > 3 && (
                                                    <div className="more-results">
                                                        +{lab.results.filter(result => result.flag !== 'Normal').length - 3} {t('doctorPage.medicalRecords.labs.moreAbnormalResults')}
                                                    </div>
                                                )}

                                                {lab.results.filter(result => result.flag !== 'Normal').length === 0 && (
                                                    <div className="all-normal">
                                                        {t('doctorPage.medicalRecords.labs.allResultsNormal')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button className="view-full-results-btn">
                                            {t('doctorPage.medicalRecords.labs.viewFullResults')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data-card">
                                <FaVial className="no-data-icon" />
                                <h4>{t('doctorPage.medicalRecords.labs.noLabResultsFound')}</h4>
                                <p>{t('doctorPage.medicalRecords.labs.noLabResultsRecorded')}</p>
                                <button className="action-button secondary">
                                    <FaPlus /> {t('doctorPage.medicalRecords.labs.addLabResult')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Render documents tab
    const renderDocumentsTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="documents-tab">
                <div className="section-header-with-actions">
                    <h3><FaFileMedical /> {t('doctorPage.medicalRecords.documents.title')}</h3>
                    <div className="section-actions">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder={t('doctorPage.medicalRecords.documents.searchPlaceholder')} className="search-input" />
                        </div>
                        <button className="action-button secondary add-btn">
                            <FaPlus /> {t('doctorPage.medicalRecords.documents.uploadDocument')}
                        </button>
                    </div>
                </div>

                <div className="documents-list">
                    {selectedPatient.documents?.length > 0 ? (
                        <div className="documents-grid">
                            {selectedPatient.documents.map((document, index) => (
                                <div className="document-card" key={index}>
                                    <div className="document-icon">
                                        {getFileIcon(document.type)}
                                    </div>

                                    <div className="document-info">
                                        <h4>{document.name}</h4>
                                        <span className="document-date">{formatDate(document.date)}</span>
                                        <p className="document-description">{document.description}</p>
                                        <p className="document-uploader">{t('doctorPage.medicalRecords.documents.uploadedBy')}: {document.uploadedBy}</p>
                                    </div>

                                    <div className="document-actions">
                                        <button className="document-action-btn view">
                                            <FaSearch /> {t('doctorPage.medicalRecords.common.view')}
                                        </button>
                                        <button className="document-action-btn download">
                                            <FaDownload /> {t('doctorPage.medicalRecords.common.download')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-data-card">
                            <FaFileMedical className="no-data-icon" />
                            <h4>{t('doctorPage.medicalRecords.documents.noDocuments')}</h4>
                            <p>{t('doctorPage.medicalRecords.documents.noDocumentsRecorded')}</p>
                            <button className="action-button secondary">
                                <FaPlus /> {t('doctorPage.medicalRecords.documents.uploadDocument')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render conditions tab
    const renderConditionsTab = () => {
        if (!selectedPatient) return null;

        return (
            <div className="conditions-tab">
                <div className="section-header-with-actions">
                    <h3><FaNotesMedical /> {t('doctorPage.medicalRecords.conditions.title')}</h3>
                    <div className="section-actions">
                        <button className="action-button secondary add-btn">
                            <FaPlus /> {t('doctorPage.medicalRecords.conditions.addCondition')}
                        </button>
                    </div>
                </div>

                <div className="conditions-list detailed">
                    {selectedPatient.conditions.length > 0 ? (
                        selectedPatient.conditions.map((condition, index) => (
                            <div className="condition-card" key={index}>
                                <div className="condition-header">
                                    <h4>{condition.name}</h4>
                                    <span className={`status-badge ${getStatusClass(condition.status)}`}>
                                        {condition.status}
                                    </span>
                                </div>

                                <div className="condition-details">
                                    <div className="detail-item">
                                        <span className="detail-label">{t('doctorPage.medicalRecords.conditions.diagnosed')}:</span>
                                        <span className="detail-value">{formatDate(condition.diagnosedDate)}</span>
                                    </div>

                                    {condition.notes && (
                                        <div className="detail-item">
                                            <span className="detail-label">{t('doctorPage.medicalRecords.common.notes')}:</span>
                                            <span className="detail-value">{condition.notes}</span>
                                        </div>
                                    )}
                                </div>

                                <button className="edit-btn">
                                    <FaPencilAlt />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-data-card">
                            <FaNotesMedical className="no-data-icon" />
                            <h4>{t('doctorPage.medicalRecords.conditions.noMedicalConditions')}</h4>
                            <p>{t('doctorPage.medicalRecords.conditions.noConditionsRecorded')}</p>
                            <button className="action-button secondary">
                                <FaPlus /> {t('doctorPage.medicalRecords.conditions.addCondition')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Main render function
    return (
        <div className="doctor-patient-medical-records">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('doctorPage.medicalRecords.loadingPatientRecords')}</p>
                </div>
            ) : !selectedPatient ? (
                renderNoPatient()
            ) : (
                <div className="medical-records-container">
                    <div className="records-header">
                        <button
                            className="back-btn"
                            onClick={() => navigate('/doctor/patients')}
                        >
                            <FaArrowLeft /> {t('doctorPage.medicalRecords.backToPatients')}
                        </button>

                        <div className="patient-info">
                            <h2>{selectedPatient.name}</h2>
                            <div className="patient-meta">
                                <span>{selectedPatient.age} {t('doctorPage.medicalRecords.summary.years')}</span>
                                <span>•</span>
                                <span>{selectedPatient.gender}</span>
                                <span>•</span>
                                <span>{selectedPatient.id}</span>
                            </div>
                        </div>

                        <div className="header-actions">
                            <button className="refresh-btn">
                                <FaSyncAlt />
                            </button>
                        </div>
                    </div>

                    <div className="records-tabs">
                        <nav className="tabs-nav">
                            <button
                                className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                                onClick={() => handleTabChange('summary')}
                            >
                                <FaClipboardCheck /> {t('doctorPage.medicalRecords.tabs.summary')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'allergies' ? 'active' : ''}`}
                                onClick={() => handleTabChange('allergies')}
                            >
                                <FaAllergies /> {t('doctorPage.medicalRecords.tabs.allergies')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'conditions' ? 'active' : ''}`}
                                onClick={() => handleTabChange('conditions')}
                            >
                                <FaNotesMedical /> {t('doctorPage.medicalRecords.tabs.conditions')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'medications' ? 'active' : ''}`}
                                onClick={() => handleTabChange('medications')}
                            >
                                <FaPills /> {t('doctorPage.medicalRecords.tabs.medications')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'visits' ? 'active' : ''}`}
                                onClick={() => handleTabChange('visits')}
                            >
                                <FaHistory /> {t('doctorPage.medicalRecords.tabs.visits')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'labs' ? 'active' : ''}`}
                                onClick={() => handleTabChange('labs')}
                            >
                                <FaVial /> {t('doctorPage.medicalRecords.tabs.labResults')}
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                                onClick={() => handleTabChange('documents')}
                            >
                                <FaFileMedical /> {t('doctorPage.medicalRecords.tabs.documents')}
                            </button>
                        </nav>

                        <div className="tab-content">
                            {activeTab === 'summary' && renderSummaryTab()}
                            {activeTab === 'allergies' && renderAllergiesTab()}
                            {activeTab === 'conditions' && renderConditionsTab()}
                            {activeTab === 'medications' && renderMedicationsTab()}
                            {activeTab === 'visits' && renderVisitsTab()}
                            {activeTab === 'labs' && renderLabsTab()}
                            {activeTab === 'documents' && renderDocumentsTab()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPatientMedicalRecords;