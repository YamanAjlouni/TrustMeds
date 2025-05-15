import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PharmacyPendingPrescriptions.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import the language hook
import {
    FaSearch,
    FaFilter,
    FaSyncAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaUserAlt,
    FaUserMd,
    FaPills,
    FaExclamationTriangle,
    FaEye,
    FaSortAmountDown,
    FaSortAmountUp,
    FaClipboardList
} from 'react-icons/fa';

const PharmacyPendingPrescriptions = () => {
    // Get language context
    const { t, isRTL } = useLanguage();

    // Get query params (for direct links to specific prescriptions)
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const prescriptionIdFromUrl = queryParams.get('id');

    // State
    const [pendingPrescriptions, setPendingPrescriptions] = useState([
        {
            id: 'RX-20250417-001',
            patientName: 'Ahmed Hassan',
            patientId: 'PT-54321',
            dateOfBirth: '1985-06-12',
            doctorName: 'Dr. Sarah Johnson',
            doctorId: 'DR-12345',
            specialty: 'Cardiologist',
            issueDate: '2025-04-17',
            expiryDate: '2025-05-17',
            status: 'Pending',
            medications: [
                {
                    name: 'Amoxicillin',
                    dosage: '500mg',
                    quantity: 21,
                    instructions: '1 capsule 3 times daily for 7 days',
                    notes: 'Take with food'
                },
                {
                    name: 'Paracetamol',
                    dosage: '500mg',
                    quantity: 12,
                    instructions: '1-2 tablets every 4-6 hours as needed for pain',
                    notes: 'Maximum 8 tablets per day'
                }
            ],
            notes: 'Patient allergic to penicillin',
            priority: 'Normal',
            insuranceInfo: {
                provider: 'HealthPlus',
                policyNumber: 'HP-987654321',
                validUntil: '2025-12-31'
            }
        },
        // ... rest of the prescription data remains the same
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        priority: 'all', // 'all', 'normal', 'urgent'
        date: 'all', // 'all', 'today', 'yesterday', 'thisWeek'
        sort: 'newest' // 'newest', 'oldest', 'priority'
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Check if there is a prescription ID in the URL
    useEffect(() => {
        if (prescriptionIdFromUrl && isLoaded) {
            const prescription = pendingPrescriptions.find(p => p.id === prescriptionIdFromUrl);
            if (prescription) {
                setSelectedPrescription(prescription);
                setShowDetailModal(true);
            }
        }
    }, [prescriptionIdFromUrl, isLoaded, pendingPrescriptions]);

    // Handle search
    const filteredPrescriptions = pendingPrescriptions.filter(prescription => {
        // Search term filter
        const matchesSearch =
            prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));

        // Priority filter
        const matchesPriority =
            filterOptions.priority === 'all' ||
            prescription.priority.toLowerCase() === filterOptions.priority.toLowerCase();

        // Date filter
        let matchesDate = true;
        const issueDate = new Date(prescription.issueDate);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        if (filterOptions.date === 'today') {
            matchesDate = issueDate.toDateString() === today.toDateString();
        } else if (filterOptions.date === 'yesterday') {
            matchesDate = issueDate.toDateString() === yesterday.toDateString();
        } else if (filterOptions.date === 'thisWeek') {
            matchesDate = issueDate >= weekAgo;
        }

        return matchesSearch && matchesPriority && matchesDate;
    });

    // Sort prescriptions
    const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
        if (filterOptions.sort === 'newest') {
            return new Date(b.issueDate) - new Date(a.issueDate);
        } else if (filterOptions.sort === 'oldest') {
            return new Date(a.issueDate) - new Date(b.issueDate);
        } else if (filterOptions.sort === 'priority') {
            // Sort by priority (Urgent first) and then by date
            if (a.priority === 'Urgent' && b.priority !== 'Urgent') {
                return -1;
            } else if (a.priority !== 'Urgent' && b.priority === 'Urgent') {
                return 1;
            } else {
                return new Date(b.issueDate) - new Date(a.issueDate);
            }
        }
        return 0;
    });

    // Handle viewing prescription details
    const handleViewPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setShowDetailModal(true);

        // Update URL to include the prescription ID
        navigate(`/pharmacy/pending-prescriptions?id=${prescription.id}`);
    };

    // Handle prescription dispensing
    const handleDispensePrescription = (prescription) => {
        setIsVerifying(true);

        // Simulate verification process
        setTimeout(() => {
            setIsVerifying(false);

            // Remove from pending list
            setPendingPrescriptions(pendingPrescriptions.filter(p => p.id !== prescription.id));

            // Close modal
            setShowDetailModal(false);
            setSelectedPrescription(null);

            // Update URL
            navigate('/pharmacy/pending-prescriptions');
        }, 2000);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Handle close modal
    const handleCloseModal = () => {
        setShowDetailModal(false);
        setSelectedPrescription(null);
        navigate('/pharmacy/pending-prescriptions');
    };

    // Refresh prescriptions list
    const handleRefresh = () => {
        setIsLoaded(false);

        // Simulate refresh
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    };

    // Render prescription detail modal
    const renderPrescriptionDetailModal = () => {
        if (!selectedPrescription || !showDetailModal) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="header-left">
                            <h2>{t('pharmacyPage.pendingPrescriptions.detailModal.title')}</h2>
                            <span className="prescription-id">{selectedPrescription.id}</span>
                        </div>
                        <div className="header-right">
                            {selectedPrescription.priority === 'Urgent' && (
                                <span className="priority-badge urgent">
                                    <FaExclamationTriangle /> {t('pharmacyPage.pendingPrescriptions.prescriptionCard.urgent')}
                                </span>
                            )}
                            <button className="close-btn" onClick={handleCloseModal}>×</button>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="prescription-sections">
                            {/* Patient Information Section */}
                            <div className="info-section">
                                <div className="section-header">
                                    <div className="header-icon patient-icon">
                                        <FaUserAlt />
                                    </div>
                                    <h3>{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.title')}</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.name')}</span>
                                            <span className="info-value">{selectedPrescription.patientName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.id')}</span>
                                            <span className="info-value">{selectedPrescription.patientId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.dateOfBirth')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.dateOfBirth)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.insurance')}</span>
                                            <span className="info-value">{selectedPrescription.insuranceInfo.provider}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.policyNumber')}</span>
                                            <span className="info-value">{selectedPrescription.insuranceInfo.policyNumber}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.patient.fields.validUntil')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.insuranceInfo.validUntil)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Prescriber Information Section */}
                            <div className="info-section">
                                <div className="section-header">
                                    <div className="header-icon doctor-icon">
                                        <FaUserMd />
                                    </div>
                                    <h3>{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.title')}</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.fields.doctor')}</span>
                                            <span className="info-value">{selectedPrescription.doctorName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.fields.id')}</span>
                                            <span className="info-value">{selectedPrescription.doctorId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.fields.specialty')}</span>
                                            <span className="info-value">{selectedPrescription.specialty}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.fields.issueDate')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.issueDate)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.prescriber.fields.expiryDate')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.expiryDate)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medications Section */}
                            <div className="info-section medications-section">
                                <div className="section-header">
                                    <div className="header-icon medication-icon">
                                        <FaPills />
                                    </div>
                                    <h3>{t('pharmacyPage.pendingPrescriptions.detailModal.sections.medications.title')}</h3>
                                </div>
                                <div className="section-content">
                                    {selectedPrescription.medications.map((medication, index) => (
                                        <div className="medication-card" key={index}>
                                            <div className="medication-header">
                                                <h4>{medication.name} <span className="dosage">{medication.dosage}</span></h4>
                                                <span className="quantity">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.medications.quantity')}: {medication.quantity}</span>
                                            </div>
                                            <div className="medication-instructions">
                                                <div className="instruction-item">
                                                    <span className="instruction-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.medications.instructions')}</span>
                                                    <span className="instruction-value">{medication.instructions}</span>
                                                </div>
                                                {medication.notes && (
                                                    <div className="instruction-item">
                                                        <span className="instruction-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.medications.notes')}</span>
                                                        <span className="instruction-value">{medication.notes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {selectedPrescription.notes && (
                                        <div className="prescription-notes">
                                            <div className="notes-label">{t('pharmacyPage.pendingPrescriptions.detailModal.sections.medications.additionalNotes')}</div>
                                            <div className="notes-content">{selectedPrescription.notes}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        {isVerifying ? (
                            <div className="verifying-container">
                                <div className="loader small"></div>
                                <span>{t('pharmacyPage.pendingPrescriptions.detailModal.actions.processing')}</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="action-btn primary"
                                    onClick={() => handleDispensePrescription(selectedPrescription)}
                                >
                                    <FaCheckCircle /> {t('pharmacyPage.pendingPrescriptions.detailModal.actions.dispense')}
                                </button>
                                <button
                                    className="action-btn reject"
                                    onClick={handleCloseModal}
                                >
                                    <FaTimesCircle /> {t('pharmacyPage.pendingPrescriptions.detailModal.actions.reject')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="pharmacy-pending-prescriptions">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('pharmacyPage.pendingPrescriptions.loading')}</p>
                </div>
            ) : (
                <div className="pending-container">
                    <div className="page-header">
                        <h1>{t('pharmacyPage.pendingPrescriptions.pageTitle')}</h1>
                        <p>{t('pharmacyPage.pendingPrescriptions.pageSubtitle')}</p>
                    </div>

                    <div className="action-bar">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={t('pharmacyPage.pendingPrescriptions.search.placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-controls">
                            <div className="filter-group">
                                <label htmlFor="priority-filter">{t('pharmacyPage.pendingPrescriptions.filters.priority.label')}</label>
                                <select
                                    id="priority-filter"
                                    value={filterOptions.priority}
                                    onChange={e => setFilterOptions({ ...filterOptions, priority: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">{t('pharmacyPage.pendingPrescriptions.filters.priority.options.all')}</option>
                                    <option value="normal">{t('pharmacyPage.pendingPrescriptions.filters.priority.options.normal')}</option>
                                    <option value="urgent">{t('pharmacyPage.pendingPrescriptions.filters.priority.options.urgent')}</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="date-filter">{t('pharmacyPage.pendingPrescriptions.filters.date.label')}</label>
                                <select
                                    id="date-filter"
                                    value={filterOptions.date}
                                    onChange={e => setFilterOptions({ ...filterOptions, date: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">{t('pharmacyPage.pendingPrescriptions.filters.date.options.all')}</option>
                                    <option value="today">{t('pharmacyPage.pendingPrescriptions.filters.date.options.today')}</option>
                                    <option value="yesterday">{t('pharmacyPage.pendingPrescriptions.filters.date.options.yesterday')}</option>
                                    <option value="thisWeek">{t('pharmacyPage.pendingPrescriptions.filters.date.options.thisWeek')}</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="sort-filter">{t('pharmacyPage.pendingPrescriptions.filters.sort.label')}</label>
                                <select
                                    id="sort-filter"
                                    value={filterOptions.sort}
                                    onChange={e => setFilterOptions({ ...filterOptions, sort: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="newest">{t('pharmacyPage.pendingPrescriptions.filters.sort.options.newest')}</option>
                                    <option value="oldest">{t('pharmacyPage.pendingPrescriptions.filters.sort.options.oldest')}</option>
                                    <option value="priority">{t('pharmacyPage.pendingPrescriptions.filters.sort.options.priority')}</option>
                                </select>
                            </div>

                            <button className="refresh-btn" onClick={handleRefresh}>
                                <FaSyncAlt /> {t('pharmacyPage.pendingPrescriptions.filters.refresh')}
                            </button>
                        </div>
                    </div>

                    <div className="prescriptions-results">
                        <div className="results-header">
                            <h3>{t('pharmacyPage.pendingPrescriptions.results.title')} ({sortedPrescriptions.length})</h3>
                            <div className="sort-indicators">
                                {filterOptions.sort === 'newest' && <FaSortAmountDown className="sort-icon" />}
                                {filterOptions.sort === 'oldest' && <FaSortAmountUp className="sort-icon" />}
                                {filterOptions.sort === 'priority' && <FaExclamationTriangle className="sort-icon" />}
                            </div>
                        </div>

                        {sortedPrescriptions.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <FaClipboardList />
                                </div>
                                <h3>{t('pharmacyPage.pendingPrescriptions.results.noResults.title')}</h3>
                                <p>
                                    {searchTerm
                                        ? `${t('pharmacyPage.pendingPrescriptions.results.noResults.withSearch')} "${searchTerm}"`
                                        : t('pharmacyPage.pendingPrescriptions.results.noResults.noItems')}
                                </p>
                                {searchTerm && (
                                    <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                        {t('pharmacyPage.pendingPrescriptions.results.noResults.clearSearch')}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="prescriptions-list">
                                {sortedPrescriptions.map(prescription => (
                                    <div className="prescription-card" key={prescription.id}>
                                        <div className={`priority-bar ${prescription.priority.toLowerCase()}`}></div>
                                        <div className="prescription-content">
                                            <div className="prescription-header">
                                                <div className="header-main">
                                                    <h4>{prescription.id}</h4>
                                                    <span className="date">{formatDate(prescription.issueDate)}</span>
                                                </div>
                                                {prescription.priority === 'Urgent' && (
                                                    <span className="priority-tag">
                                                        <FaExclamationTriangle /> {t('pharmacyPage.pendingPrescriptions.prescriptionCard.urgent')}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="prescription-body">
                                                <div className="patient-info">
                                                    <span className="label">{t('pharmacyPage.pendingPrescriptions.prescriptionCard.patient')}</span>
                                                    <span className="value">{prescription.patientName}</span>
                                                </div>
                                                <div className="doctor-info">
                                                    <span className="label">{t('pharmacyPage.pendingPrescriptions.prescriptionCard.doctor')}</span>
                                                    <span className="value">{prescription.doctorName}</span>
                                                </div>
                                                <div className="medications-info">
                                                    <span className="label">{t('pharmacyPage.pendingPrescriptions.prescriptionCard.medications')}</span>
                                                    <span className="value">{prescription.medications.length} {t('pharmacyPage.pendingPrescriptions.prescriptionCard.items')}</span>
                                                </div>
                                            </div>

                                            <div className="medication-list">
                                                {prescription.medications.map((med, index) => (
                                                    <div className="medication-item" key={index}>
                                                        <span className="med-name">{med.name}</span>
                                                        <span className="med-dose">{med.dosage}</span>
                                                        <span className="med-qty">{t('pharmacyPage.pendingPrescriptions.prescriptionCard.qty')}: {med.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="prescription-actions">
                                                <button
                                                    className="view-btn"
                                                    onClick={() => handleViewPrescription(prescription)}
                                                >
                                                    <FaEye /> {t('pharmacyPage.pendingPrescriptions.prescriptionCard.actions.viewDetails')}
                                                </button>
                                                <button
                                                    className="dispense-btn"
                                                    onClick={() => handleDispensePrescription(prescription)}
                                                >
                                                    <FaCheckCircle /> {t('pharmacyPage.pendingPrescriptions.prescriptionCard.actions.dispense')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {renderPrescriptionDetailModal()}
        </div>
    );
};

export default PharmacyPendingPrescriptions;