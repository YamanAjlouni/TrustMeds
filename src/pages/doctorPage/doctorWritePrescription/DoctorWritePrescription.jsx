import React, { useState, useEffect } from 'react';
import './DoctorWritePrescription.scss';
import {
    FaUser,
    FaPills,
    FaStethoscope,
    FaExclamationTriangle,
    FaHistory,
    FaCalendarAlt,
    FaInfoCircle,
    FaFileAlt,
    FaPlus,
    FaTimesCircle,
    FaCheck,
    FaPaperPlane,
    FaSave,
    FaExclamationCircle,
    FaArrowLeft,
    FaSearch
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export const DoctorWritePrescription = () => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patientIdFromQuery = queryParams.get('patientId');

    // Sample data - in a real app, this would come from your API/backend
    const [patients, setPatients] = useState([
        {
            id: 'PT-1234',
            name: 'Ahmed Hassan',
            age: 45,
            gender: 'Male',
            allergies: ['Penicillin', 'Sulfa Drugs'],
            conditions: ['Hypertension', 'Type 2 Diabetes'],
            activePrescriptions: [
                {
                    medication: 'Metformin',
                    dosage: '500mg',
                    frequency: 'Twice daily',
                    startDate: '2025-01-15',
                    endDate: '2025-07-15'
                },
                {
                    medication: 'Lisinopril',
                    dosage: '10mg',
                    frequency: 'Once daily',
                    startDate: '2025-02-10',
                    endDate: '2025-08-10'
                }
            ]
        },
        // ... other patients (keeping original data)
    ]);

    // Common medications database (keeping original data)
    const [medications, setMedications] = useState([
        {
            name: 'Metformin',
            commonDosages: ['500mg', '850mg', '1000mg'],
            commonFrequencies: ['Once daily', 'Twice daily', 'Three times daily'],
            category: 'Antidiabetic',
            interactions: ['Alcohol', 'Certain X-ray contrast agents'],
            sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal discomfort']
        },
        // ... other medications
    ]);

    // State for form
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientSearchTerm, setPatientSearchTerm] = useState('');
    const [medicationSearchTerm, setMedicationSearchTerm] = useState('');
    const [showMedicationResults, setShowMedicationResults] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [prescriptionForm, setPrescriptionForm] = useState({
        dosage: '',
        customDosage: '',
        frequency: '',
        customFrequency: '',
        duration: 30,
        refills: 0,
        instructions: '',
        notes: ''
    });

    const [prescriptionItems, setPrescriptionItems] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);

            // If patient ID is in the URL, select that patient
            if (patientIdFromQuery) {
                const patient = patients.find(p => p.id === patientIdFromQuery);
                if (patient) {
                    setSelectedPatient(patient);
                }
            }
        }, 800);
    }, [patientIdFromQuery, patients]);

    // Filter patients based on search term
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(patientSearchTerm.toLowerCase())
    );

    // Filter medications based on search term
    const filteredMedications = medications.filter(medication =>
        medication.name.toLowerCase().includes(medicationSearchTerm.toLowerCase())
    );

    // Handle patient selection
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setPatientSearchTerm('');
    };

    // Handle medication selection
    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication);
        setMedicationSearchTerm(medication.name);
        setShowMedicationResults(false);

        // Reset form fields
        setPrescriptionForm({
            ...prescriptionForm,
            dosage: medication.commonDosages[0],
            customDosage: '',
            frequency: medication.commonFrequencies[0],
            customFrequency: ''
        });
    };

    // Handle form field changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionForm({
            ...prescriptionForm,
            [name]: value
        });
    };

    // Add medication to prescription
    const handleAddMedication = () => {
        // Validate form
        if (!selectedMedication) {
            alert(t('doctorPage.prescriptions.alerts.selectMedication'));
            return;
        }

        // Create prescription item
        const prescriptionItem = {
            id: Date.now(),
            medication: selectedMedication.name,
            dosage: prescriptionForm.dosage === 'Custom' ? prescriptionForm.customDosage : prescriptionForm.dosage,
            frequency: prescriptionForm.frequency === 'Custom' ? prescriptionForm.customFrequency : prescriptionForm.frequency,
            duration: prescriptionForm.duration,
            refills: prescriptionForm.refills,
            instructions: prescriptionForm.instructions
        };

        // Add to list
        setPrescriptionItems([...prescriptionItems, prescriptionItem]);

        // Reset form
        setSelectedMedication(null);
        setMedicationSearchTerm('');
        setPrescriptionForm({
            dosage: '',
            customDosage: '',
            frequency: '',
            customFrequency: '',
            duration: 30,
            refills: 0,
            instructions: '',
            notes: ''
        });
    };

    // Remove medication from prescription
    const handleRemoveMedication = (id) => {
        setPrescriptionItems(prescriptionItems.filter(item => item.id !== id));
    };

    // Check for allergies
    const checkForAllergies = (medication) => {
        if (!selectedPatient || !selectedPatient.allergies) return false;
        return selectedPatient.allergies.some(
            allergy => medication.toLowerCase().includes(allergy.toLowerCase())
        );
    };

    // Handle prescription submission
    const handleSubmitPrescription = () => {
        // In a real app, this would submit the prescription to your backend
        console.log('Prescription submitted:', {
            patient: selectedPatient,
            items: prescriptionItems,
            notes: prescriptionForm.notes
        });

        setShowConfirmation(true);
    };

    // Handle confirmation close
    const handleConfirmationClose = () => {
        setShowConfirmation(false);

        // Clear form
        setSelectedPatient(null);
        setPrescriptionItems([]);
        setPrescriptionForm({
            dosage: '',
            customDosage: '',
            frequency: '',
            customFrequency: '',
            duration: 30,
            refills: 0,
            instructions: '',
            notes: ''
        });

        // Redirect to prescription history
        navigate('/doctor/prescription-history');
    };

    // Check if form is valid
    const isPrescriptionValid = selectedPatient && prescriptionItems.length > 0;

    return (
        <div className="doctor-write-prescription">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('doctorPage.prescriptions.loadingMessage')}</p>
                </div>
            ) : (
                <div className="prescription-container">
                    <div className="prescription-header">
                        <h2>
                            <FaPills className="header-icon" />
                            {t('doctorPage.prescriptions.title')}
                        </h2>
                        <button className="back-button" onClick={() => navigate(-1)}>
                            <FaArrowLeft /> {t('doctorPage.prescriptions.actions.back')}
                        </button>
                    </div>

                    {/* Step 1: Select Patient */}
                    <section className="prescription-section patient-section">
                        <div className="section-header">
                            <h3>
                                <FaUser className="section-icon" />
                                {t('doctorPage.prescriptions.steps.step1')}
                            </h3>
                        </div>

                        <div className="section-content">
                            {selectedPatient ? (
                                <div className="selected-patient">
                                    <div className="patient-info">
                                        <h4>{selectedPatient.name}</h4>
                                        <div className="patient-meta">
                                            <span>{selectedPatient.age} {t('doctorPage.prescriptions.patientDetails.years')}</span>
                                            <span>•</span>
                                            <span>{selectedPatient.gender}</span>
                                            <span>•</span>
                                            <span>{selectedPatient.id}</span>
                                        </div>

                                        <div className="patient-health-info">
                                            <div className="health-item">
                                                <span className="label">{t('doctorPage.prescriptions.patientDetails.medicalConditions')}:</span>
                                                <div className="tags">
                                                    {selectedPatient.conditions.map((condition, index) => (
                                                        <span key={index} className="condition-tag">{condition}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="health-item">
                                                <span className="label">{t('doctorPage.prescriptions.patientDetails.allergies')}:</span>
                                                {selectedPatient.allergies.length > 0 ? (
                                                    <div className="tags">
                                                        {selectedPatient.allergies.map((allergy, index) => (
                                                            <span key={index} className="allergy-tag">
                                                                <FaExclamationTriangle /> {allergy}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-data">{t('doctorPage.prescriptions.patientDetails.noAllergies')}</span>
                                                )}
                                            </div>

                                            <div className="health-item">
                                                <span className="label">{t('doctorPage.prescriptions.patientDetails.activeMedications')}:</span>
                                                {selectedPatient.activePrescriptions.length > 0 ? (
                                                    <div className="active-meds">
                                                        {selectedPatient.activePrescriptions.map((prescription, index) => (
                                                            <div key={index} className="med-item">
                                                                <span className="med-name">{prescription.medication}</span>
                                                                <span className="med-details">
                                                                    {prescription.dosage}, {prescription.frequency}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-data">{t('doctorPage.prescriptions.patientDetails.noActiveMedications')}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="change-patient-btn" onClick={() => setSelectedPatient(null)}>
                                        {t('doctorPage.prescriptions.actions.changePatient')}
                                    </button>
                                </div>
                            ) : (
                                <div className="patient-search">
                                    <div className="search-container">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder={t('doctorPage.prescriptions.searchPlaceholders.patient')}
                                            value={patientSearchTerm}
                                            onChange={(e) => setPatientSearchTerm(e.target.value)}
                                            className="search-input"
                                        />
                                    </div>

                                    {patientSearchTerm.length > 0 && (
                                        <div className="search-results">
                                            {filteredPatients.length > 0 ? (
                                                filteredPatients.map(patient => (
                                                    <div
                                                        key={patient.id}
                                                        className="patient-result"
                                                        onClick={() => handlePatientSelect(patient)}
                                                    >
                                                        <div className="patient-name">{patient.name}</div>
                                                        <div className="patient-details">
                                                            <span>{patient.age} {t('doctorPage.prescriptions.patientDetails.years')}</span>
                                                            <span>•</span>
                                                            <span>{patient.gender}</span>
                                                            <span>•</span>
                                                            <span>{patient.id}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-results">{t('doctorPage.prescriptions.noResults.patients')}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Step 2: Add Medications */}
                    <section className="prescription-section medications-section">
                        <div className="section-header">
                            <h3>
                                <FaPills className="section-icon" />
                                {t('doctorPage.prescriptions.steps.step2')}
                            </h3>
                        </div>

                        <div className="section-content">
                            <div className="medication-search">
                                <div className="search-container">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder={t('doctorPage.prescriptions.searchPlaceholders.medication')}
                                        value={medicationSearchTerm}
                                        onChange={(e) => {
                                            setMedicationSearchTerm(e.target.value);
                                            setShowMedicationResults(true);
                                        }}
                                        className="search-input"
                                        disabled={!selectedPatient}
                                    />
                                </div>

                                {showMedicationResults && medicationSearchTerm.length > 0 && (
                                    <div className="search-results">
                                        {filteredMedications.length > 0 ? (
                                            filteredMedications.map(medication => (
                                                <div
                                                    key={medication.name}
                                                    className="medication-result"
                                                    onClick={() => handleMedicationSelect(medication)}
                                                >
                                                    <div className="medication-name">{medication.name}</div>
                                                    <div className="medication-category">{medication.category}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-results">{t('doctorPage.prescriptions.noResults.medications')}</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {selectedMedication && (
                                <div className="medication-form">
                                    <div className="form-header">
                                        <h4>{selectedMedication.name}</h4>
                                        <span className="category-badge">{selectedMedication.category}</span>

                                        {checkForAllergies(selectedMedication.name) && (
                                            <div className="allergy-warning">
                                                <FaExclamationCircle />
                                                <span>{t('doctorPage.prescriptions.alerts.allergyWarning')}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>{t('doctorPage.prescriptions.medicationForm.dosage')}</label>
                                            <select
                                                name="dosage"
                                                value={prescriptionForm.dosage}
                                                onChange={handleFormChange}
                                                className="form-select"
                                            >
                                                <option value="">{t('doctorPage.prescriptions.medicationForm.selectDosage')}</option>
                                                {selectedMedication.commonDosages.map(dosage => (
                                                    <option key={dosage} value={dosage}>{dosage}</option>
                                                ))}
                                                <option value="Custom">{t('doctorPage.prescriptions.medicationForm.customDosage')}</option>
                                            </select>

                                            {prescriptionForm.dosage === 'Custom' && (
                                                <input
                                                    type="text"
                                                    name="customDosage"
                                                    value={prescriptionForm.customDosage}
                                                    onChange={handleFormChange}
                                                    placeholder={t('doctorPage.prescriptions.medicationForm.enterCustomDosage')}
                                                    className="form-input mt-2"
                                                />
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>{t('doctorPage.prescriptions.medicationForm.frequency')}</label>
                                            <select
                                                name="frequency"
                                                value={prescriptionForm.frequency}
                                                onChange={handleFormChange}
                                                className="form-select"
                                            >
                                                <option value="">{t('doctorPage.prescriptions.medicationForm.selectFrequency')}</option>
                                                {selectedMedication.commonFrequencies.map(frequency => (
                                                    <option key={frequency} value={frequency}>{frequency}</option>
                                                ))}
                                                <option value="Custom">{t('doctorPage.prescriptions.medicationForm.customFrequency')}</option>
                                            </select>

                                            {prescriptionForm.frequency === 'Custom' && (
                                                <input
                                                    type="text"
                                                    name="customFrequency"
                                                    value={prescriptionForm.customFrequency}
                                                    onChange={handleFormChange}
                                                    placeholder={t('doctorPage.prescriptions.medicationForm.enterCustomFrequency')}
                                                    className="form-input mt-2"
                                                />
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>{t('doctorPage.prescriptions.medicationForm.duration')}</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                value={prescriptionForm.duration}
                                                onChange={handleFormChange}
                                                min="1"
                                                max="365"
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>{t('doctorPage.prescriptions.medicationForm.refills')}</label>
                                            <input
                                                type="number"
                                                name="refills"
                                                value={prescriptionForm.refills}
                                                onChange={handleFormChange}
                                                min="0"
                                                max="12"
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group span-2">
                                            <label>{t('doctorPage.prescriptions.medicationForm.specialInstructions')}</label>
                                            <textarea
                                                name="instructions"
                                                value={prescriptionForm.instructions}
                                                onChange={handleFormChange}
                                                placeholder={t('doctorPage.prescriptions.medicationForm.instructionsPlaceholder')}
                                                className="form-textarea"
                                                rows="2"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="medication-info-box">
                                        <div className="info-header">
                                            <FaInfoCircle /> {t('doctorPage.prescriptions.medicationInfo.title')}
                                        </div>
                                        <div className="info-content">
                                            <div className="info-group">
                                                <h5>{t('doctorPage.prescriptions.medicationInfo.sideEffects')}</h5>
                                                <ul>
                                                    {selectedMedication.sideEffects.map((effect, index) => (
                                                        <li key={index}>{effect}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="info-group">
                                                <h5>{t('doctorPage.prescriptions.medicationInfo.interactions')}</h5>
                                                <ul>
                                                    {selectedMedication.interactions.map((interaction, index) => (
                                                        <li key={index}>{interaction}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            className="cancel-btn"
                                            onClick={() => {
                                                setSelectedMedication(null);
                                                setMedicationSearchTerm('');
                                            }}
                                        >
                                            <FaTimesCircle /> {t('doctorPage.prescriptions.actions.cancel')}
                                        </button>
                                        <button
                                            className="add-btn"
                                            onClick={handleAddMedication}
                                            disabled={
                                                !prescriptionForm.dosage ||
                                                (prescriptionForm.dosage === 'Custom' && !prescriptionForm.customDosage) ||
                                                !prescriptionForm.frequency ||
                                                (prescriptionForm.frequency === 'Custom' && !prescriptionForm.customFrequency)
                                            }
                                        >
                                            <FaPlus /> {t('doctorPage.prescriptions.actions.addToPrescription')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Current prescription items */}
                            {prescriptionItems.length > 0 && (
                                <div className="prescription-items">
                                    <h4>{t('doctorPage.prescriptions.currentPrescription.title')}</h4>

                                    <div className="items-list">
                                        {prescriptionItems.map(item => (
                                            <div key={item.id} className="prescription-item">
                                                <div className="item-details">
                                                    <div className="item-header">
                                                        <h5>{item.medication}</h5>
                                                        <button
                                                            className="remove-item"
                                                            onClick={() => handleRemoveMedication(item.id)}
                                                        >
                                                            <FaTimesCircle />
                                                        </button>
                                                    </div>

                                                    <div className="item-info">
                                                        <span className="dosage">{item.dosage}</span>
                                                        <span className="separator">•</span>
                                                        <span className="frequency">{item.frequency}</span>
                                                        <span className="separator">•</span>
                                                        <span className="duration">{t('doctorPage.prescriptions.currentPrescription.for')} {item.duration} {t('doctorPage.prescriptions.currentPrescription.days')}</span>
                                                        <span className="separator">•</span>
                                                        <span className="refills">{item.refills} {item.refills !== 1 ? t('doctorPage.prescriptions.currentPrescription.refills') : t('doctorPage.prescriptions.currentPrescription.refill')}</span>
                                                    </div>

                                                    {item.instructions && (
                                                        <div className="item-instructions">
                                                            <span className="instructions-label">{t('doctorPage.prescriptions.currentPrescription.instructionsLabel')}:</span>
                                                            <span className="instructions-text">{item.instructions}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {checkForAllergies(item.medication) && (
                                                    <div className="item-warning">
                                                        <FaExclamationTriangle /> {t('doctorPage.prescriptions.alerts.knownAllergy')}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Step 3: Finalize Prescription */}
                    <section className="prescription-section finalize-section">
                        <div className="section-header">
                            <h3>
                                <FaFileAlt className="section-icon" />
                                {t('doctorPage.prescriptions.steps.step3')}
                            </h3>
                        </div>

                        <div className="section-content">
                            <div className="form-group">
                                <label>{t('doctorPage.prescriptions.finalize.notes')}</label>
                                <textarea
                                    name="notes"
                                    value={prescriptionForm.notes}
                                    onChange={handleFormChange}
                                    placeholder={t('doctorPage.prescriptions.finalize.notesPlaceholder')}
                                    className="form-textarea"
                                    rows="3"
                                    disabled={!selectedPatient}
                                ></textarea>
                            </div>

                            <div className="submit-actions">
                                <button
                                    className="save-draft-btn"
                                    disabled={!isPrescriptionValid}
                                >
                                    <FaSave /> {t('doctorPage.prescriptions.actions.saveAsDraft')}
                                </button>
                                <button
                                    className="submit-btn"
                                    onClick={handleSubmitPrescription}
                                    disabled={!isPrescriptionValid}
                                >
                                    <FaPaperPlane /> {t('doctorPage.prescriptions.actions.submitPrescription')}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Confirmation Modal */}
                    {showConfirmation && (
                        <div className="modal-overlay">
                            <div className="confirmation-modal">
                                <div className="modal-header">
                                    <FaCheck className="success-icon" />
                                    <h3>{t('doctorPage.prescriptions.confirmation.title')}</h3>
                                </div>

                                <div className="modal-content">
                                    <p>
                                        {t('doctorPage.prescriptions.confirmation.message', { patientName: selectedPatient.name })}
                                    </p>

                                    <div className="prescription-summary">
                                        <h4>{t('doctorPage.prescriptions.confirmation.summary')}</h4>
                                        <ul>
                                            {prescriptionItems.map((item, index) => (
                                                <li key={index}>
                                                    <strong>{item.medication}</strong> - {item.dosage}, {item.frequency}, {t('doctorPage.prescriptions.currentPrescription.for')} {item.duration} {t('doctorPage.prescriptions.currentPrescription.days')}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="modal-btn"
                                        onClick={handleConfirmationClose}
                                    >
                                        {t('doctorPage.prescriptions.actions.continue')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorWritePrescription;