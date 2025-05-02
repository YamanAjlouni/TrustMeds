import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientMyPrescriptions.scss';
import {
    FaPills, FaHistory, FaFilePrescription, FaHospitalUser,
    FaExclamationTriangle, FaSearch, FaFilter, FaPlusCircle,
    FaTimes, FaChevronDown, FaChevronUp, FaBell, FaCalendarAlt,
    FaArrowRight
} from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext'; // Import language context

export const PatientMyPrescriptions = () => {
    const { language, t } = useLanguage(); // Get language and translation function
    const isArabic = language === 'ar';

    // State for active prescriptions with both English and Arabic data
    const [activePrescriptions, setActivePrescriptions] = useState([
        {
            id: 1,
            nameEn: "Amoxicillin",
            nameAr: "أموكسيسيلين",
            dosage: "500mg",
            frequencyEn: "3 times daily",
            frequencyAr: "3 مرات يوميًا",
            refillsRemaining: 2,
            nextRefillDate: "2025-04-15",
            doctorEn: "Dr. Smith",
            doctorAr: "د. سميث",
            instructionsEn: "Take with food. Complete full course of treatment.",
            instructionsAr: "تناول مع الطعام. أكمل المدة العلاجية كاملة.",
            pharmacyEn: "Main Street Pharmacy",
            pharmacyAr: "صيدلية الشارع الرئيسي",
            prescribedDate: "2025-03-10",
            expirationDate: "2025-09-10",
            color: "#4B9CD3",
            ndc: "12345-678-90",
            status: "active"
        },
        {
            id: 2,
            nameEn: "Lisinopril",
            nameAr: "ليسينوبريل",
            dosage: "10mg",
            frequencyEn: "Once daily",
            frequencyAr: "مرة واحدة يوميًا",
            refillsRemaining: 3,
            nextRefillDate: "2025-04-20",
            doctorEn: "Dr. Johnson",
            doctorAr: "د. جونسون",
            instructionsEn: "Take in the morning. May cause dizziness.",
            instructionsAr: "تناول في الصباح. قد يسبب الدوار.",
            pharmacyEn: "Main Street Pharmacy",
            pharmacyAr: "صيدلية الشارع الرئيسي",
            prescribedDate: "2025-02-15",
            expirationDate: "2026-02-15",
            color: "#2AAC8A",
            ndc: "54321-876-54",
            status: "active"
        },
        {
            id: 3,
            nameEn: "Atorvastatin",
            nameAr: "أتورفاستاتين",
            dosage: "20mg",
            frequencyEn: "Once daily",
            frequencyAr: "مرة واحدة يوميًا",
            refillsRemaining: 5,
            nextRefillDate: "2025-05-05",
            doctorEn: "Dr. Johnson",
            doctorAr: "د. جونسون",
            instructionsEn: "Take in the evening. Report muscle pain.",
            instructionsAr: "تناول في المساء. أبلغ عن آلام العضلات.",
            pharmacyEn: "Central Pharmacy",
            pharmacyAr: "الصيدلية المركزية",
            prescribedDate: "2025-03-05",
            expirationDate: "2026-03-05",
            color: "#F6B93B",
            ndc: "98765-432-10",
            status: "active"
        }
    ]);

    // State for prescription history with both English and Arabic data
    const [prescriptionHistory, setPrescriptionHistory] = useState([
        {
            id: 101,
            nameEn: "Doxycycline",
            nameAr: "دوكسيسيكلين",
            dosage: "100mg",
            frequencyEn: "Twice daily",
            frequencyAr: "مرتين يوميًا",
            refillsRemaining: 0,
            doctorEn: "Dr. Smith",
            doctorAr: "د. سميث",
            instructionsEn: "Take with food. Avoid sun exposure.",
            instructionsAr: "تناول مع الطعام. تجنب التعرض للشمس.",
            pharmacyEn: "Main Street Pharmacy",
            pharmacyAr: "صيدلية الشارع الرئيسي",
            prescribedDate: "2025-01-05",
            expirationDate: "2025-02-05",
            color: "#975BA5",
            ndc: "11122-333-44",
            status: "completed"
        },
        {
            id: 102,
            nameEn: "Prednisone",
            nameAr: "بريدنيزون",
            dosage: "10mg",
            frequencyEn: "Once daily",
            frequencyAr: "مرة واحدة يوميًا",
            refillsRemaining: 0,
            doctorEn: "Dr. Lee",
            doctorAr: "د. لي",
            instructionsEn: "Take with food. Taper as directed.",
            instructionsAr: "تناول مع الطعام. قلل الجرعة حسب التوجيهات.",
            pharmacyEn: "Central Pharmacy",
            pharmacyAr: "الصيدلية المركزية",
            prescribedDate: "2024-12-10",
            expirationDate: "2025-01-10",
            color: "#E74C3C",
            ndc: "55566-777-88",
            status: "completed"
        }
    ]);

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

    // Check if screen is mobile/small
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 576);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Helper function to get localized value
    const getLocalizedValue = (enValue, arValue) => {
        return isArabic ? arValue : enValue;
    };

    // Get unique doctors and pharmacies for filter options based on current language
    const allDoctors = [...new Set([
        ...activePrescriptions.map(p => isArabic ? p.doctorAr : p.doctorEn),
        ...prescriptionHistory.map(p => isArabic ? p.doctorAr : p.doctorEn)
    ])];

    const allPharmacies = [...new Set([
        ...activePrescriptions.map(p => isArabic ? p.pharmacyAr : p.pharmacyEn),
        ...prescriptionHistory.map(p => isArabic ? p.pharmacyAr : p.pharmacyEn)
    ])];

    // Function to apply filters
    const applyFilters = (prescriptions) => {
        return prescriptions.filter(prescription => {
            const name = isArabic ? prescription.nameAr : prescription.nameEn;
            const doctor = isArabic ? prescription.doctorAr : prescription.doctorEn;
            const pharmacy = isArabic ? prescription.pharmacyAr : prescription.pharmacyEn;

            // Filter by search query
            const matchesSearch =
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pharmacy.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter by doctor
            const matchesDoctor = !filters.doctor || doctor === filters.doctor;

            // Filter by pharmacy
            const matchesPharmacy = !filters.pharmacy || pharmacy === filters.pharmacy;

            // Filter by refills needed (refillsRemaining <= 1)
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

    // For Add Prescription button - just show an info message for now
    const [showAddInfo, setShowAddInfo] = useState(false);

    const handleAddPrescriptionClick = () => {
        setShowAddInfo(true);
        // After 3 seconds, hide the message
        setTimeout(() => {
            setShowAddInfo(false);
        }, 3000);
    };

    // Format date function with language support
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isArabic) {
            // Arabic date format
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('ar-SA', options);
        } else {
            // English date format
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    };

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
                                            {getLocalizedValue(prescription.nameEn, prescription.nameAr)}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">
                                            {getLocalizedValue(prescription.frequencyEn, prescription.frequencyAr)}
                                        </p>
                                    </div>
                                    <div className="prescription-refills">
                                        <span
                                            className={`refills-count ${prescription.refillsRemaining <= 1 ? 'low-refills' : ''}`}
                                        >
                                            {prescription.refillsRemaining}
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
                                            {getLocalizedValue(prescription.doctorEn, prescription.doctorAr)}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.pharmacy')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.pharmacyEn, prescription.pharmacyAr)}
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
                                                    <span className="detail-label">{t('patientPage.prescriptions.ndc')}</span>
                                                    <span className="detail-value">{prescription.ndc}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.prescribed')}</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.expires')}</span>
                                                    <span className={`detail-value ${isExpiringWithin30Days(prescription.expirationDate) ? 'expiring-soon' : ''}`}>
                                                        {formatDate(prescription.expirationDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>{t('patientPage.prescriptions.instructions')}</h4>
                                            <p>{getLocalizedValue(prescription.instructionsEn, prescription.instructionsAr)}</p>
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
                                            {getLocalizedValue(prescription.nameEn, prescription.nameAr)}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">
                                            {getLocalizedValue(prescription.frequencyEn, prescription.frequencyAr)}
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
                                            {getLocalizedValue(prescription.doctorEn, prescription.doctorAr)}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.pharmacy')}</span>
                                        <span className="info-value">
                                            {getLocalizedValue(prescription.pharmacyEn, prescription.pharmacyAr)}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">{t('patientPage.prescriptions.prescribed')}</span>
                                        <span className="info-value">
                                            <FaCalendarAlt className="calendar-icon" />
                                            {formatDate(prescription.prescribedDate)}
                                        </span>
                                    </div>
                                </div>
                                
                                {expandedPrescription === prescription.id && (
                                    <div className="prescription-details">
                                        <div className="details-section">
                                            <h4>{t('patientPage.prescriptions.prescriptionDetails')}</h4>
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.ndc')}</span>
                                                    <span className="detail-value">{prescription.ndc}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.prescribed')}</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">{t('patientPage.prescriptions.expired')}</span>
                                                    <span className="detail-value">{formatDate(prescription.expirationDate)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>{t('patientPage.prescriptions.instructions')}</h4>
                                            <p>{getLocalizedValue(prescription.instructionsEn, prescription.instructionsAr)}</p>
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