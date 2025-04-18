import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PharmacyDispensedHistory.scss';
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
    // Get query params
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const prescriptionIdFromUrl = queryParams.get('id');

    // State
    const [dispensedPrescriptions, setDispensedPrescriptions] = useState([
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
        {
            id: 'RX-20250416-002D',
            patientName: 'Samir Ali',
            patientId: 'PT-23456',
            dateOfBirth: '1975-03-12',
            doctorName: 'Dr. Sarah Johnson',
            doctorId: 'DR-65432',
            specialty: 'Cardiology',
            issueDate: '2025-04-15',
            dispensedDate: '2025-04-16',
            dispensedBy: 'Mohammed Kareem',
            status: 'Dispensed',
            medications: [
                {
                    name: 'Atorvastatin',
                    dosage: '20mg',
                    quantity: 30,
                    instructions: '1 tablet daily at bedtime',
                    notes: ''
                },
                {
                    name: 'Aspirin',
                    dosage: '81mg',
                    quantity: 30,
                    instructions: '1 tablet daily with food',
                    notes: 'Low-dose for cardiac protection'
                }
            ],
            paymentMethod: 'Insurance',
            insuranceInfo: {
                provider: 'HealthPlus',
                policyNumber: 'HP-567891234',
                copayAmount: '$10.00',
                coveragePercentage: '90%'
            },
            totalCost: '$65.25',
            patientPaid: '$10.00'
        },
        {
            id: 'RX-20250415-003D',
            patientName: 'Lina Ahmad',
            patientId: 'PT-34567',
            dateOfBirth: '1990-11-05',
            doctorName: 'Dr. Michael Chen',
            doctorId: 'DR-76543',
            specialty: 'Dermatology',
            issueDate: '2025-04-14',
            dispensedDate: '2025-04-15',
            dispensedBy: 'Yara Mohammed',
            status: 'Dispensed',
            medications: [
                {
                    name: 'Tretinoin Cream',
                    dosage: '0.025%',
                    quantity: 1,
                    instructions: 'Apply a pea-sized amount to affected areas at bedtime',
                    notes: 'Avoid sun exposure, use sunscreen'
                }
            ],
            paymentMethod: 'Cash',
            totalCost: '$45.00',
            patientPaid: '$45.00'
        },
        {
            id: 'RX-20250414-004D',
            patientName: 'Karim Mustafa',
            patientId: 'PT-45678',
            dateOfBirth: '2018-04-03',
            doctorName: 'Dr. Lisa Thompson',
            doctorId: 'DR-87654',
            specialty: 'Pediatrics',
            issueDate: '2025-04-13',
            dispensedDate: '2025-04-14',
            dispensedBy: 'Mohammed Kareem',
            status: 'Dispensed',
            medications: [
                {
                    name: 'Amoxicillin',
                    dosage: '250mg/5ml',
                    quantity: 1,
                    instructions: '5ml three times daily for 10 days',
                    notes: 'Keep refrigerated after reconstitution'
                }
            ],
            paymentMethod: 'Insurance',
            insuranceInfo: {
                provider: 'FamilyCare',
                policyNumber: 'FC-678912345',
                copayAmount: '$5.00',
                coveragePercentage: '100%'
            },
            totalCost: '$18.75',
            patientPaid: '$5.00'
        },
        {
            id: 'RX-20250412-005D',
            patientName: 'Fatima Al-Sayed',
            patientId: 'PT-56789',
            dateOfBirth: '1956-08-20',
            doctorName: 'Dr. James Wilson',
            doctorId: 'DR-98765',
            specialty: 'Cardiology',
            issueDate: '2025-04-11',
            dispensedDate: '2025-04-12',
            dispensedBy: 'Yara Mohammed',
            status: 'Dispensed',
            medications: [
                {
                    name: 'Lisinopril',
                    dosage: '10mg',
                    quantity: 30,
                    instructions: '1 tablet daily in the morning',
                    notes: 'Monitor blood pressure regularly'
                },
                {
                    name: 'Metoprolol',
                    dosage: '25mg',
                    quantity: 60,
                    instructions: '1 tablet twice daily',
                    notes: ''
                },
                {
                    name: 'Furosemide',
                    dosage: '20mg',
                    quantity: 30,
                    instructions: '1 tablet daily in the morning',
                    notes: 'Take early in the day to avoid nighttime urination'
                }
            ],
            paymentMethod: 'Insurance',
            insuranceInfo: {
                provider: 'SeniorCare+',
                policyNumber: 'SC-789123456',
                copayAmount: '$0.00',
                coveragePercentage: '100%'
            },
            totalCost: '$125.50',
            patientPaid: '$0.00'
        }
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

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
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
                            <h2>Dispensed Prescription</h2>
                            <span className="prescription-id">{selectedPrescription.id}</span>
                        </div>
                        <div className="header-right">
                            <div className="header-actions">
                                <button className="action-btn print">
                                    <FaPrint /> Print
                                </button>
                                <button className="action-btn download">
                                    <FaDownload /> Download
                                </button>
                            </div>
                            <button className="close-btn" onClick={handleCloseModal}>×</button>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="status-bar">
                            <div className="status-item">
                                <span className="status-label">Status</span>
                                <span className="status-value dispensed">
                                    <FaCheckCircle /> Dispensed
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Dispensed On</span>
                                <span className="status-value">
                                    {formatDate(selectedPrescription.dispensedDate)}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Dispensed By</span>
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
                                    <h3>Patient Information</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Name</span>
                                            <span className="info-value">{selectedPrescription.patientName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">ID</span>
                                            <span className="info-value">{selectedPrescription.patientId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Date of Birth</span>
                                            <span className="info-value">{formatDate(selectedPrescription.dateOfBirth)}</span>
                                        </div>
                                        {selectedPrescription.insuranceInfo && (
                                            <>
                                                <div className="info-item">
                                                    <span className="info-label">Insurance</span>
                                                    <span className="info-value">{selectedPrescription.insuranceInfo.provider}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Policy Number</span>
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
                                    <h3>Prescriber</h3>
                                </div>
                                <div className="section-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Doctor</span>
                                            <span className="info-value">{selectedPrescription.doctorName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">ID</span>
                                            <span className="info-value">{selectedPrescription.doctorId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Specialty</span>
                                            <span className="info-value">{selectedPrescription.specialty}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Issue Date</span>
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
                                    <h3>Medications</h3>
                                </div>
                                <div className="section-content">
                                    {selectedPrescription.medications.map((medication, index) => (
                                        <div className="medication-card" key={index}>
                                            <div className="medication-header">
                                                <h4>{medication.name} <span className="dosage">{medication.dosage}</span></h4>
                                                <span className="quantity">Qty: {medication.quantity}</span>
                                            </div>
                                            <div className="medication-instructions">
                                                <div className="instruction-item">
                                                    <span className="instruction-label">Instructions</span>
                                                    <span className="instruction-value">{medication.instructions}</span>
                                                </div>
                                                {medication.notes && (
                                                    <div className="instruction-item">
                                                        <span className="instruction-label">Notes</span>
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
                                    <h3>Payment Information</h3>
                                </div>
                                <div className="section-content">
                                    <div className="payment-details">
                                        <div className="payment-row">
                                            <span className="payment-label">Payment Method</span>
                                            <span className="payment-value">{selectedPrescription.paymentMethod}</span>
                                        </div>
                                        <div className="payment-row">
                                            <span className="payment-label">Total Cost</span>
                                            <span className="payment-value">{selectedPrescription.totalCost}</span>
                                        </div>
                                        {selectedPrescription.insuranceInfo && (
                                            <>
                                                <div className="payment-row">
                                                    <span className="payment-label">Coverage</span>
                                                    <span className="payment-value">{selectedPrescription.insuranceInfo.coveragePercentage}</span>
                                                </div>
                                                <div className="payment-row">
                                                    <span className="payment-label">Copay Amount</span>
                                                    <span className="payment-value">{selectedPrescription.insuranceInfo.copayAmount}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="payment-row total">
                                            <span className="payment-label">Patient Paid</span>
                                            <span className="payment-value">{selectedPrescription.patientPaid}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="action-btn primary" onClick={handleCloseModal}>
                            Close
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
                    <p>Loading history...</p>
                </div>
            ) : (
                <div className="history-container">
                    <div className="page-header">
                        <h1>Dispensed Prescriptions</h1>
                        <p>View and manage previously dispensed prescriptions</p>
                    </div>

                    <div className="action-bar">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by ID, patient, doctor, or medication..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-controls">
                            <div className="filter-group">
                                <label htmlFor="date-filter">Date Range</label>
                                <select
                                    id="date-filter"
                                    value={filterOptions.dateRange}
                                    onChange={e => setFilterOptions({ ...filterOptions, dateRange: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="today">Today</option>
                                    <option value="thisWeek">This Week</option>
                                    <option value="thisMonth">This Month</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>

                            {filterOptions.dateRange === 'custom' && (
                                <div className="date-range-inputs">
                                    <div className="date-input-group">
                                        <label htmlFor="start-date">From</label>
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
                                        <label htmlFor="end-date">To</label>
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
                                <label htmlFor="payment-filter">Payment</label>
                                <select
                                    id="payment-filter"
                                    value={filterOptions.paymentMethod}
                                    onChange={e => setFilterOptions({ ...filterOptions, paymentMethod: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All Methods</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="dispensed-by-filter">Dispensed By</label>
                                <select
                                    id="dispensed-by-filter"
                                    value={filterOptions.dispensedBy}
                                    onChange={e => setFilterOptions({ ...filterOptions, dispensedBy: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All Staff</option>
                                    <option value="Yara Mohammed">Yara Mohammed</option>
                                    <option value="Mohammed Kareem">Mohammed Kareem</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="sort-filter">Sort By</label>
                                <select
                                    id="sort-filter"
                                    value={filterOptions.sort}
                                    onChange={e => setFilterOptions({ ...filterOptions, sort: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>

                            <button className="refresh-btn" onClick={handleRefresh}>
                                <FaSyncAlt /> Refresh
                            </button>
                        </div>
                    </div>

                    <div className="history-results">
                        <div className="results-header">
                            <h3>Results ({sortedPrescriptions.length})</h3>
                            <div className="export-options">
                                <button className="export-btn">
                                    <FaDownload /> Export
                                </button>
                                <button className="print-btn">
                                    <FaPrint /> Print
                                </button>
                            </div>
                        </div>

                        {sortedPrescriptions.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <FaFileAlt />
                                </div>
                                <h3>No Prescriptions Found</h3>
                                <p>
                                    {searchTerm
                                        ? `No prescriptions match your search term "${searchTerm}"`
                                        : 'No dispensed prescriptions for the selected filters'}
                                </p>
                                {searchTerm && (
                                    <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="history-table-container">
                                <table className="history-table">
                                    <thead>
                                        <tr>
                                            <th>Prescription ID</th>
                                            <th>Patient</th>
                                            <th>Doctor</th>
                                            <th>Dispensed Date</th>
                                            <th>Medications</th>
                                            <th>Payment</th>
                                            <th>Dispensed By</th>
                                            <th>Actions</th>
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
                                                    <div className="med-count">{prescription.medications.length} items</div>
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
                                                        <FaEye /> View
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