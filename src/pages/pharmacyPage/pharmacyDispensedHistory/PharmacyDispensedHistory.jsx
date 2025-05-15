import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PharmacyDispensedHistory.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language hook
import {
    FaSearch,
    FaFilter,
    FaSyncAlt,
    FaCalendarAlt,
    FaUserAlt,
    FaUserMd,
    FaPills,
    FaFileAlt,
    FaEye,
    FaDownload,
    FaPrint,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';

const PharmacyDispensedHistory = () => {
    // Get language context
    const { t, isRTL } = useLanguage();

    // Get query params
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const prescriptionIdFromUrl = queryParams.get('id');

    // State
    const [dispensedPrescriptions, setDispensedPrescriptions] = useState([
        // Same prescription data array as in your original code
        {
            id: 'RX-20250417-001D',
            patientName: 'Nour Hammad',
            patientId: 'PT-12345',
            dateOfBirth: '1982-09-18',
            doctorName: 'Dr. James Wilson',
            doctorId: 'DR-54321',
            specialty: 'Internal Medicine',
            issueDate: '2025-04-16',
            dispensedDate: '2025-04-17',
            dispensedBy: 'Yara Mohammed',
            status: 'Dispensed',
            medications: [
                {
                    name: 'Hydrochlorothiazide',
                    dosage: '25mg',
                    quantity: 30,
                    instructions: '1 tablet daily',
                    notes: 'Take in the morning'
                },
                {
                    name: 'Potassium Chloride',
                    dosage: '10mEq',
                    quantity: 30,
                    instructions: '1 tablet daily with food',
                    notes: ''
                }
            ],
            paymentMethod: 'Insurance',
            insuranceInfo: {
                provider: 'NationalCare',
                policyNumber: 'NC-456789123',
                copayAmount: '$15.00',
                coveragePercentage: '80%'
            },
            totalCost: '$78.50',
            patientPaid: '$15.00'
        },
        // Continue with the rest of your prescription data
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        dateRange: 'all', // 'all', 'today', 'thisWeek', 'thisMonth', 'custom'
        paymentMethod: 'all', // 'all', 'insurance', 'cash'
        dispensedBy: 'all', // 'all', 'Yara Mohammed', 'Mohammed Kareem'
        sort: 'newest', // 'newest', 'oldest'
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Check if there is a prescription ID in the URL
    useEffect(() => {
        if (prescriptionIdFromUrl && isLoaded) {
            const prescription = dispensedPrescriptions.find(p => p.id === prescriptionIdFromUrl);
            if (prescription) {
                setSelectedPrescription(prescription);
                setShowDetailModal(true);
            }
        }
    }, [prescriptionIdFromUrl, isLoaded, dispensedPrescriptions]);

    // Handle search
    const filteredPrescriptions = dispensedPrescriptions.filter(prescription => {
        // Search term filter
        const matchesSearch =
            prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));

        // Payment method filter
        const matchesPaymentMethod =
            filterOptions.paymentMethod === 'all' ||
            prescription.paymentMethod.toLowerCase() === filterOptions.paymentMethod.toLowerCase();

        // Dispensed by filter
        const matchesDispensedBy =
            filterOptions.dispensedBy === 'all' ||
            prescription.dispensedBy === filterOptions.dispensedBy;

        // Date range filter
        let matchesDateRange = true;
        const dispensedDate = new Date(prescription.dispensedDate);
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        if (filterOptions.dateRange === 'today') {
            matchesDateRange = dispensedDate.toDateString() === today.toDateString();
        } else if (filterOptions.dateRange === 'thisWeek') {
            matchesDateRange = dispensedDate >= startOfWeek;
        } else if (filterOptions.dateRange === 'thisMonth') {
            matchesDateRange = dispensedDate >= startOfMonth;
        } else if (filterOptions.dateRange === 'custom' && dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            // Adjust end date to include the full day
            end.setHours(23, 59, 59, 999);
            matchesDateRange = dispensedDate >= start && dispensedDate <= end;
        }

        return matchesSearch && matchesPaymentMethod && matchesDispensedBy && matchesDateRange;
    });

    // Sort prescriptions
    const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
        if (filterOptions.sort === 'newest') {
            return new Date(b.dispensedDate) - new Date(a.dispensedDate);
        } else if (filterOptions.sort === 'oldest') {
            return new Date(a.dispensedDate) - new Date(b.dispensedDate);
        }
        return 0;
    });

    // Handle viewing prescription details
    const handleViewPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setShowDetailModal(true);

        // Update URL to include the prescription ID
        navigate(`/pharmacy/dispensed-history?id=${prescription.id}`);
    };

    // Handle date range change
    const handleDateRangeChange = (type, value) => {
        setDateRange({
            ...dateRange,
            [type]: value
        });
    };

    // Format date with appropriate locale
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
        navigate('/pharmacy/dispensed-history');
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
                            <h2>{t('pharmacyPage.dispensedHistory.detailModal.title')}</h2>
                            <span className="prescription-id">{selectedPrescription.id}</span>
                        </div>
                        <div className="header-right">
                            <div className="header-actions">
                                <button className="action-btn print">
                                    <FaPrint /> {t('pharmacyPage.dispensedHistory.detailModal.actions.print')}
                                </button>
                                <button className="action-btn download">
                                    <FaDownload /> {t('pharmacyPage.dispensedHistory.detailModal.actions.download')}
                                </button>
                            </div>
                            <button className="close-btn" onClick={handleCloseModal}>×</button>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="status-bar">
                            <div className="status-item">
                                <span className="status-label">{t('pharmacyPage.dispensedHistory.detailModal.status.title')}</span>
                                <span className="status-value dispensed">
                                    <FaCheckCircle /> {t('pharmacyPage.dispensedHistory.detailModal.status.dispensed')}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">{t('pharmacyPage.dispensedHistory.detailModal.status.dispensedOn')}</span>
                                <span className="status-value">
                                    {formatDate(selectedPrescription.dispensedDate)}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">{t('pharmacyPage.dispensedHistory.detailModal.status.dispensedBy')}</span>
                                <span className="status-value">
                                    {selectedPrescription.dispensedBy}
                                </span>
                            </div>
                        </div>

                        <div className="prescription-sections">
                            {/* Patient Information Section */}
                            <div className="info-section">
                                <div className="section-header">
                                    <div className="header-icon patient-icon">
                                        <FaUserAlt />
                                    </div>
                                    <h3>{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.title')}</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.fields.name')}</span>
                                            <span className="info-value">{selectedPrescription.patientName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.fields.id')}</span>
                                            <span className="info-value">{selectedPrescription.patientId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.fields.dateOfBirth')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.dateOfBirth)}</span>
                                        </div>
                                        {selectedPrescription.insuranceInfo && (
                                            <>
                                                <div className="info-item">
                                                    <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.fields.insurance')}</span>
                                                    <span className="info-value">{selectedPrescription.insuranceInfo.provider}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.patient.fields.policyNumber')}</span>
                                                    <span className="info-value">{selectedPrescription.insuranceInfo.policyNumber}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Prescriber Information Section */}
                            <div className="info-section">
                                <div className="section-header">
                                    <div className="header-icon doctor-icon">
                                        <FaUserMd />
                                    </div>
                                    <h3>{t('pharmacyPage.dispensedHistory.detailModal.sections.prescriber.title')}</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.prescriber.fields.doctor')}</span>
                                            <span className="info-value">{selectedPrescription.doctorName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.prescriber.fields.id')}</span>
                                            <span className="info-value">{selectedPrescription.doctorId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.prescriber.fields.specialty')}</span>
                                            <span className="info-value">{selectedPrescription.specialty}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.prescriber.fields.issueDate')}</span>
                                            <span className="info-value">{formatDate(selectedPrescription.issueDate)}</span>
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
                                    <h3>{t('pharmacyPage.dispensedHistory.detailModal.sections.medications.title')}</h3>
                                </div>
                                <div className="section-content">
                                    {selectedPrescription.medications.map((medication, index) => (
                                        <div className="medication-card" key={index}>
                                            <div className="medication-header">
                                                <h4>{medication.name} <span className="dosage">{medication.dosage}</span></h4>
                                                <span className="quantity">{t('pharmacyPage.dispensedHistory.detailModal.sections.medications.quantity')}: {medication.quantity}</span>
                                            </div>
                                            <div className="medication-instructions">
                                                <div className="instruction-item">
                                                    <span className="instruction-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.medications.instructions')}</span>
                                                    <span className="instruction-value">{medication.instructions}</span>
                                                </div>
                                                {medication.notes && (
                                                    <div className="instruction-item">
                                                        <span className="instruction-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.medications.notes')}</span>
                                                        <span className="instruction-value">{medication.notes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="info-section payment-section">
                                <div className="section-header">
                                    <div className="header-icon payment-icon">
                                        <FaFileAlt />
                                    </div>
                                    <h3>{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.title')}</h3>
                                </div>
                                <div className="section-content">
                                    <div className="payment-details">
                                        <div className="payment-row">
                                            <span className="payment-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.fields.method')}</span>
                                            <span className="payment-value">{selectedPrescription.paymentMethod}</span>
                                        </div>
                                        <div className="payment-row">
                                            <span className="payment-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.fields.totalCost')}</span>
                                            <span className="payment-value">{selectedPrescription.totalCost}</span>
                                        </div>
                                        {selectedPrescription.insuranceInfo && (
                                            <>
                                                <div className="payment-row">
                                                    <span className="payment-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.fields.coverage')}</span>
                                                    <span className="payment-value">{selectedPrescription.insuranceInfo.coveragePercentage}</span>
                                                </div>
                                                <div className="payment-row">
                                                    <span className="payment-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.fields.copayAmount')}</span>
                                                    <span className="payment-value">{selectedPrescription.insuranceInfo.copayAmount}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="payment-row total">
                                            <span className="payment-label">{t('pharmacyPage.dispensedHistory.detailModal.sections.payment.fields.patientPaid')}</span>
                                            <span className="payment-value">{selectedPrescription.patientPaid}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="action-btn primary" onClick={handleCloseModal}>
                            {t('pharmacyPage.dispensedHistory.detailModal.actions.close')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="pharmacy-dispensed-history">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('pharmacyPage.dispensedHistory.loading')}</p>
                </div>
            ) : (
                <div className="history-container">
                    <div className="page-header">
                        <h1>{t('pharmacyPage.dispensedHistory.pageTitle')}</h1>
                        <p>{t('pharmacyPage.dispensedHistory.pageSubtitle')}</p>
                    </div>

                    <div className="action-bar">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={t('pharmacyPage.dispensedHistory.search.placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-controls">
                            <div className="filter-group">
                                <label htmlFor="date-filter">{t('pharmacyPage.dispensedHistory.filters.dateRange.label')}</label>
                                <select
                                    id="date-filter"
                                    value={filterOptions.dateRange}
                                    onChange={e => setFilterOptions({ ...filterOptions, dateRange: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">{t('pharmacyPage.dispensedHistory.filters.dateRange.options.all')}</option>
                                    <option value="today">{t('pharmacyPage.dispensedHistory.filters.dateRange.options.today')}</option>
                                    <option value="thisWeek">{t('pharmacyPage.dispensedHistory.filters.dateRange.options.thisWeek')}</option>
                                    <option value="thisMonth">{t('pharmacyPage.dispensedHistory.filters.dateRange.options.thisMonth')}</option>
                                    <option value="custom">{t('pharmacyPage.dispensedHistory.filters.dateRange.options.custom')}</option>
                                </select>
                            </div>

                            {filterOptions.dateRange === 'custom' && (
                                <div className="date-range-inputs">
                                    <div className="date-input-group">
                                        <label htmlFor="start-date">{t('pharmacyPage.dispensedHistory.filters.dateRange.customRange.from')}</label>
                                        <div className="date-input-wrapper">
                                            <FaCalendarAlt className="calendar-icon" />
                                            <input
                                                type="date"
                                                id="start-date"
                                                value={dateRange.startDate}
                                                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                                                className="date-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="date-input-group">
                                        <label htmlFor="end-date">{t('pharmacyPage.dispensedHistory.filters.dateRange.customRange.to')}</label>
                                        <div className="date-input-wrapper">
                                            <FaCalendarAlt className="calendar-icon" />
                                            <input
                                                type="date"
                                                id="end-date"
                                                value={dateRange.endDate}
                                                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                                                className="date-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="filter-group">
                                <label htmlFor="payment-filter">{t('pharmacyPage.dispensedHistory.filters.payment.label')}</label>
                                <select
                                    id="payment-filter"
                                    value={filterOptions.paymentMethod}
                                    onChange={e => setFilterOptions({ ...filterOptions, paymentMethod: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">{t('pharmacyPage.dispensedHistory.filters.payment.options.all')}</option>
                                    <option value="insurance">{t('pharmacyPage.dispensedHistory.filters.payment.options.insurance')}</option>
                                    <option value="cash">{t('pharmacyPage.dispensedHistory.filters.payment.options.cash')}</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="dispensed-by-filter">{t('pharmacyPage.dispensedHistory.filters.dispensedBy.label')}</label>
                                <select
                                    id="dispensed-by-filter"
                                    value={filterOptions.dispensedBy}
                                    onChange={e => setFilterOptions({ ...filterOptions, dispensedBy: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">{t('pharmacyPage.dispensedHistory.filters.dispensedBy.options.all')}</option>
                                    <option value="Yara Mohammed">Yara Mohammed</option>
                                    <option value="Mohammed Kareem">Mohammed Kareem</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="sort-filter">{t('pharmacyPage.dispensedHistory.filters.sort.label')}</label>
                                <select
                                    id="sort-filter"
                                    value={filterOptions.sort}
                                    onChange={e => setFilterOptions({ ...filterOptions, sort: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="newest">{t('pharmacyPage.dispensedHistory.filters.sort.options.newest')}</option>
                                    <option value="oldest">{t('pharmacyPage.dispensedHistory.filters.sort.options.oldest')}</option>
                                </select>
                            </div>

                            <button className="refresh-btn" onClick={handleRefresh}>
                                <FaSyncAlt /> {t('pharmacyPage.dispensedHistory.filters.refresh')}
                            </button>
                        </div>
                    </div>

                    <div className="history-results">
                        <div className="results-header">
                            <h3>{t('pharmacyPage.dispensedHistory.results.title')} ({sortedPrescriptions.length})</h3>
                            <div className="export-options">
                                <button className="export-btn">
                                    <FaDownload /> {t('pharmacyPage.dispensedHistory.results.export')}
                                </button>
                                <button className="print-btn">
                                    <FaPrint /> {t('pharmacyPage.dispensedHistory.results.print')}
                                </button>
                            </div>
                        </div>

                        {sortedPrescriptions.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <FaFileAlt />
                                </div>
                                <h3>{t('pharmacyPage.dispensedHistory.results.noResults.title')}</h3>
                                <p>
                                    {searchTerm
                                        ? `${t('pharmacyPage.dispensedHistory.results.noResults.withSearch')} "${searchTerm}"`
                                        : t('pharmacyPage.dispensedHistory.results.noResults.noItems')}
                                </p>
                                {searchTerm && (
                                    <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                        {t('pharmacyPage.dispensedHistory.results.noResults.clearSearch')}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="history-table-container">
                                <table className="history-table">
                                    <thead>
                                        <tr>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.id')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.patient')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.doctor')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.dispensedDate')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.medications')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.payment')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.dispensedBy')}</th>
                                            <th>{t('pharmacyPage.dispensedHistory.table.headers.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedPrescriptions.map(prescription => (
                                            <tr key={prescription.id}>
                                                <td className="id-cell">{prescription.id}</td>
                                                <td className="patient-cell">
                                                    <div className="cell-with-meta">
                                                        <span className="primary-text">{prescription.patientName}</span>
                                                        <span className="secondary-text">{prescription.patientId}</span>
                                                    </div>
                                                </td>
                                                <td>{prescription.doctorName}</td>
                                                <td>{formatDate(prescription.dispensedDate)}</td>
                                                <td className="medications-cell">
                                                    <div className="med-count">{prescription.medications.length} {t('pharmacyPage.dispensedHistory.table.medicationCount')}</div>
                                                    <div className="med-list">
                                                        {prescription.medications.map((med, idx) => (
                                                            <span key={idx} className="med-tag">{med.name}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="payment-cell">
                                                    <span className={`payment-badge ${prescription.paymentMethod.toLowerCase()}`}>
                                                        {prescription.paymentMethod}
                                                    </span>
                                                    <span className="payment-amount">{prescription.totalCost}</span>
                                                </td>
                                                <td>{prescription.dispensedBy}</td>
                                                <td>
                                                    <button
                                                        className="table-action-btn"
                                                        onClick={() => handleViewPrescription(prescription)}
                                                    >
                                                        <FaEye /> {t('pharmacyPage.dispensedHistory.table.actions.view')}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {renderPrescriptionDetailModal()}
        </div>
    );
};

export default PharmacyDispensedHistory;