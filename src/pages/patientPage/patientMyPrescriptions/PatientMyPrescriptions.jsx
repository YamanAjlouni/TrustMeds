import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PatientMyPrescriptions.scss';
import {
    FaPills, FaHistory, FaFilePrescription, FaExclamationTriangle, FaSearch, FaFilter, FaPlusCircle,
    FaTimes, FaBell, FaCalendarAlt, FaSpinner
} from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import { GetMyMedicationsAction } from '../../../redux/actions/patients/medicationsActions';

export const PatientMyPrescriptions = () => {
    const { language, t } = useLanguage();
    const isArabic = language === 'ar';
    const dispatch = useDispatch();

    // Get medications from Redux store
    const { myMedications, loading, error, hasLoadedOnce } = useSelector(
        (state) => state.medications
    );

    // State for active tab
    const [activeTab, setActiveTab] = useState('active');

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // State for expanded prescription details
    const [expandedPrescription, setExpandedPrescription] = useState(null);

    // State for filters
    const [filters, setFilters] = useState({
        doctor: '',
        pharmacy: '',
        refillsNeeded: false,
        expiringWithin30Days: false
    });

    // State for showing filter panel
    const [showFilters, setShowFilters] = useState(false);

    // State for mobile view
    const [isMobile, setIsMobile] = useState(false);

    // Fetch medications on component mount
    useEffect(() => {
        if (!hasLoadedOnce) {
            dispatch(GetMyMedicationsAction());
        }
    }, [dispatch, hasLoadedOnce]);

    // Check if screen is mobile/small
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 576);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Separate active and completed prescriptions
    const activePrescriptions = myMedications.filter(med => med.status === 'active');
    const prescriptionHistory = myMedications.filter(med => med.status === 'completed');

    // Helper function to get localized value
    const getLocalizedValue = (enValue, arValue) => {
        return isArabic ? arValue : enValue;
    };

    // Get unique doctors and pharmacies for filter options
    const allDoctors = [...new Set(myMedications.map(p =>
        isArabic ? p.doctorAr : p.doctorEn
    ).filter(Boolean))];

    const allPharmacies = [...new Set(myMedications.map(p =>
        isArabic ? p.pharmacyAr : p.pharmacyEn
    ).filter(Boolean))];

    // Function to apply filters
    const applyFilters = (prescriptions) => {
        return prescriptions.filter(prescription => {
            const name = isArabic ? prescription.nameAr : prescription.nameEn;
            const doctor = isArabic ? prescription.doctorAr : prescription.doctorEn;
            const pharmacy = isArabic ? prescription.pharmacyAr : prescription.pharmacyEn;

            // Filter by search query
            const matchesSearch =
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (doctor && doctor.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (pharmacy && pharmacy.toLowerCase().includes(searchQuery.toLowerCase()));

            // Filter by doctor
            const matchesDoctor = !filters.doctor || doctor === filters.doctor;

            // Filter by pharmacy
            const matchesPharmacy = !filters.pharmacy || pharmacy === filters.pharmacy;

            // Filter by refills needed
            const matchesRefills = !filters.refillsNeeded ||
                (prescription.refillsRemaining !== undefined && prescription.refillsRemaining <= 1);

            // Filter by expiring within 30 days
            const matchesExpiration = !filters.expiringWithin30Days ||
                (prescription.expirationDate && isExpiringWithin30Days(prescription.expirationDate));

            return matchesSearch && matchesDoctor && matchesPharmacy &&
                matchesRefills && matchesExpiration;
        });
    };

    // Function to check if a prescription is expiring within 30 days
    const isExpiringWithin30Days = (expirationDate) => {
        if (!expirationDate) return false;
        const today = new Date();
        const expDate = new Date(expirationDate);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        return expDate <= thirtyDaysFromNow && expDate >= today;
    };

    // Function to check if urgent attention is needed
    const needsAttention = (prescription) => {
        return prescription.refillsRemaining <= 1 ||
            isExpiringWithin30Days(prescription.expirationDate);
    };

    // Apply filters to prescriptions
    const filteredActivePrescriptions = applyFilters(activePrescriptions);
    const filteredPrescriptionHistory = applyFilters(prescriptionHistory);

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            doctor: '',
            pharmacy: '',
            refillsNeeded: false,
            expiringWithin30Days: false
        });
        setSearchQuery('');
    };

    // Toggle expanded prescription details
    const toggleExpand = (id) => {
        if (expandedPrescription === id) {
            setExpandedPrescription(null);
        } else {
            setExpandedPrescription(id);
        }
    };

    // For Add Prescription button
    const [showAddInfo, setShowAddInfo] = useState(false);

    const handleAddPrescriptionClick = () => {
        setShowAddInfo(true);
        setTimeout(() => {
            setShowAddInfo(false);
        }, 3000);
    };

    // Format date function with language support
    const formatDate = (dateString) => {
        if (!dateString) return t('patientPage.prescriptions.notSet');
        const date = new Date(dateString);
        if (isArabic) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('ar-SA', options);
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    };

    if (loading && !hasLoadedOnce) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner" />
                <p>{t('common.loading')}</p>
            </div>
        );
    }

    return (
        <div className="my-prescriptions-container">
            <div className="page-header">
                <div className="header-content">
                    <h1><FaFilePrescription className="header-icon" /> {t('patientPage.prescriptions.title')}</h1>
                    <p>{t('patientPage.prescriptions.subtitle')}</p>
                </div>
                <div className="prescription-stats">
                    <div className="stat-item">
                        <span className="stat-value">{activePrescriptions.length}</span>
                        <span className="stat-label">{t('patientPage.prescriptions.active')}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{prescriptionHistory.length}</span>
                        <span className="stat-label">{t('patientPage.prescriptions.past')}</span>
                    </div>
                </div>
            </div>

            <div className="prescription-controls">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={t('patientPage.prescriptions.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <FaTimes
                            className="clear-search-icon"
                            onClick={() => setSearchQuery('')}
                        />
                    )}
                </div>
                <div className="filter-controls">
                    <button
                        className={`filter-btn ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                        aria-label={showFilters ? t('patientPage.prescriptions.hideFilters') : t('patientPage.prescriptions.showFilters')}
                    >
                        <FaFilter className="filter-icon" />
                        <span>{showFilters ? t('patientPage.prescriptions.hideFilters') : t('patientPage.prescriptions.showFilters')}</span>
                    </button>
                    <button
                        className="add-prescription-btn"
                        onClick={handleAddPrescriptionClick}
                        aria-label={t('patientPage.prescriptions.requestPrescription')}
                    >
                        <FaPlusCircle className="add-icon" />
                        <span>{t('patientPage.prescriptions.requestPrescription')}</span>
                    </button>
                </div>
            </div>

            {showAddInfo && (
                <div className="add-info-message">
                    <FaBell className="info-icon" /> {t('patientPage.prescriptions.requestInfo')}
                </div>
            )}

            {error && (
                <div className="error-message">
                    <FaExclamationTriangle className="error-icon" /> {error}
                </div>
            )}

            {showFilters && (
                <div className="filter-panel">
                    <div className="filter-panel-header">
                        <h3>{t('patientPage.prescriptions.filterPrescriptions')}</h3>
                        <button
                            className="reset-filters-btn"
                            onClick={resetFilters}
                        >
                            {t('patientPage.prescriptions.resetAll')}
                        </button>
                    </div>

                    <div className="filter-options">
                        <div className="filter-group">
                            <label htmlFor="doctor-filter">{t('patientPage.prescriptions.doctor')}</label>
                            <select
                                id="doctor-filter"
                                value={filters.doctor}
                                onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
                            >
                                <option value="">{t('patientPage.prescriptions.allDoctors')}</option>
                                {allDoctors.map(doctor => (
                                    <option key={doctor} value={doctor}>{doctor}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="pharmacy-filter">{t('patientPage.prescriptions.pharmacy')}</label>
                            <select
                                id="pharmacy-filter"
                                value={filters.pharmacy}
                                onChange={(e) => setFilters({ ...filters, pharmacy: e.target.value })}
                            >
                                <option value="">{t('patientPage.prescriptions.allPharmacies')}</option>
                                {allPharmacies.map(pharmacy => (
                                    <option key={pharmacy} value={pharmacy}>{pharmacy}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-checkbox">
                            <input
                                type="checkbox"
                                id="refillsNeeded"
                                checked={filters.refillsNeeded}
                                onChange={(e) => setFilters({ ...filters, refillsNeeded: e.target.checked })}
                            />
                            <label htmlFor="refillsNeeded">{t('patientPage.prescriptions.needsRefill')}</label>
                        </div>

                        <div className="filter-checkbox">
                            <input
                                type="checkbox"
                                id="expiringWithin30Days"
                                checked={filters.expiringWithin30Days}
                                onChange={(e) => setFilters({ ...filters, expiringWithin30Days: e.target.checked })}
                            />
                            <label htmlFor="expiringWithin30Days">{t('patientPage.prescriptions.expiringWithin30Days')}</label>
                        </div>
                    </div>

                    <div className="active-filters-summary">
                        {Object.entries(filters).some(([key, value]) =>
                            (typeof value === 'boolean' && value === true) || (typeof value === 'string' && value !== '')
                        ) ? (
                            <div className="active-filters-list">
                                <span>{t('patientPage.prescriptions.activeFilters')}:</span>
                                {filters.doctor && <span className="filter-tag">{t('patientPage.prescriptions.doctor')}: {filters.doctor}</span>}
                                {filters.pharmacy && <span className="filter-tag">{t('patientPage.prescriptions.pharmacy')}: {filters.pharmacy}</span>}
                                {filters.refillsNeeded && <span className="filter-tag">{t('patientPage.prescriptions.needsRefillShort')}</span>}
                                {filters.expiringWithin30Days && <span className="filter-tag">{t('patientPage.prescriptions.expiringSoon')}</span>}
                            </div>
                        ) : (
                            <span>{t('patientPage.prescriptions.noActiveFilters')}</span>
                        )}
                    </div>
                </div>
            )}

            <div className="prescription-tabs">
                <button
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    <FaPills className="tab-icon" />
                    <span>{isMobile ? t('patientPage.prescriptions.activeShort') : t('patientPage.prescriptions.activePrescriptions')}</span>
                    {activeTab !== 'active' && (
                        <span className="count-badge">{activePrescriptions.length}</span>
                    )}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <FaHistory className="tab-icon" />
                    <span>{isMobile ? t('patientPage.prescriptions.historyShort') : t('patientPage.prescriptions.prescriptionHistory')}</span>
                    {activeTab !== 'history' && (
                        <span className="count-badge">{prescriptionHistory.length}</span>
                    )}
                </button>
            </div>

            <div className="prescription-list">
                {activeTab === 'active' ? (
                    filteredActivePrescriptions.length > 0 ? (
                        filteredActivePrescriptions.map((prescription) => (
                            <div
                                key={prescription.id}
                                className={`prescription-card ${expandedPrescription === prescription.id ? 'expanded' : ''} ${needsAttention(prescription) ? 'needs-attention' : ''}`}
                            >
                                <div className="prescription-color-bar" style={{ backgroundColor: prescription.color }}>
                                    {needsAttention(prescription) && (
                                        <div className="attention-indicator">
                                            <FaExclamationTriangle />
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="prescription-header"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="prescription-name-section">
                                        <h3>
                                            {getLocalizedValue(prescription.nameEn, prescription.nameAr) || prescription.medication_name}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">
                                            {getLocalizedValue(prescription.frequencyEn, prescription.frequencyAr) || prescription.frequency}
                                        </p>
                                    </div>
                                    <div className="prescription-refills">
                                        <span
                                            className={`refills-count ${prescription.refillsRemaining <= 1 ? 'low-refills' : ''}`}
                                        >
                                            {prescription.refillsRemaining || 0}
                                        </span>
                                        <span className="refills-label">{t('patientPage.prescriptions.refillsLeft')}</span>
                                    </div>
                                </div>

                                <div
                                    className="prescription-basic-info"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.doctor')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.doctorEn, prescription.doctorAr) || t('patientPage.prescriptions.notAvailable')}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.pharmacy')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.pharmacyEn, prescription.pharmacyAr) || t('patientPage.prescriptions.notAvailable')}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.nextRefill')}</span>
                                        <span className="info-value next-refill">
                                            <FaCalendarAlt className="calendar-icon" />
                                            {formatDate(prescription.nextRefillDate)}
                                        </span>
                                    </div>
                                </div>

                                {expandedPrescription === prescription.id && (
                                    <div className="prescription-details">
                                        <div className="details-section">
                                            <h4>{t('patientPage.prescriptions.prescriptionDetails')}</h4>
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.medicationId')}</span>
                                                    <span className="detail-value">{prescription.medication || prescription.id}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.prescribed')}</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate || prescription.start_date)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.expires')}</span>
                                                    <span className={`detail-value ${isExpiringWithin30Days(prescription.expirationDate || prescription.end_date) ? 'expiring-soon' : ''}`}>
                                                        {formatDate(prescription.expirationDate || prescription.end_date)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>{t('patientPage.prescriptions.instructions')}</h4>
                                            <p>{getLocalizedValue(prescription.instructionsEn, prescription.instructionsAr) || t('patientPage.prescriptions.notAvailable')}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="renew-btn action-btn">
                                                {t('patientPage.prescriptions.requestRenewal')}
                                            </button>
                                            <button className="info-btn action-btn">
                                                {t('patientPage.prescriptions.medicationInfo')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>{t('patientPage.prescriptions.noActivePrescriptions')}</h3>
                            <p>{t('patientPage.prescriptions.tryAdjusting')}</p>
                        </div>
                    )
                ) : (
                    filteredPrescriptionHistory.length > 0 ? (
                        filteredPrescriptionHistory.map((prescription) => (
                            <div
                                key={prescription.id}
                                className={`prescription-card history-card ${expandedPrescription === prescription.id ? 'expanded' : ''}`}
                            >
                                <div className="prescription-color-bar" style={{ backgroundColor: prescription.color }}></div>
                                <div
                                    className="prescription-header"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="prescription-name-section">
                                        <h3>
                                            {getLocalizedValue(prescription.nameEn, prescription.nameAr) || prescription.medication_name}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">
                                            {getLocalizedValue(prescription.frequencyEn, prescription.frequencyAr) || prescription.frequency}
                                        </p>
                                    </div>
                                    <div className="prescription-status">
                                        <span className="status-label">{t('patientPage.prescriptions.completed')}</span>
                                    </div>
                                </div>

                                <div
                                    className="prescription-basic-info"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.doctor')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.doctorEn, prescription.doctorAr) || t('patientPage.prescriptions.notAvailable')}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.pharmacy')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.pharmacyEn, prescription.pharmacyAr) || t('patientPage.prescriptions.notAvailable')}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.prescribed')}</span>
                                        <span className="info-value">
                                            <FaCalendarAlt className="calendar-icon" />
                                            {formatDate(prescription.prescribedDate || prescription.start_date)}
                                        </span>
                                    </div>
                                </div>

                                {expandedPrescription === prescription.id && (
                                    <div className="prescription-details">
                                        <div className="details-section">
                                            <h4>{t('patientPage.prescriptions.prescriptionDetails')}</h4>
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.medicationId')}</span>
                                                    <span className="detail-value">{prescription.medication || prescription.id}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.prescribed')}</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate || prescription.start_date)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.expired')}</span>
                                                    <span className="detail-value">{formatDate(prescription.expirationDate || prescription.end_date)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>{t('patientPage.prescriptions.instructions')}</h4>
                                            <p>{getLocalizedValue(prescription.instructionsEn, prescription.instructionsAr) || t('patientPage.prescriptions.notAvailable')}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="renew-btn action-btn">
                                                {t('patientPage.prescriptions.requestRenewal')}
                                            </button>
                                            <button className="info-btn action-btn">
                                                {t('patientPage.prescriptions.medicationInfo')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>{t('patientPage.prescriptions.noPrescriptionHistory')}</h3>
                            <p>{t('patientPage.prescriptions.tryAdjusting')}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PatientMyPrescriptions;