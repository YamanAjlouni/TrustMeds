import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PharmacyPendingPrescriptions.scss';
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
    FaSortAmountUp
} from 'react-icons/fa';

const PharmacyPendingPrescriptions = () => {
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
        {
            id: 'RX-20250417-002',
            patientName: 'Layla Ibrahim',
            patientId: 'PT-65432',
            dateOfBirth: '1972-03-24',
            doctorName: 'Dr. Michael Chen',
            doctorId: 'DR-23456',
            specialty: 'Endocrinologist',
            issueDate: '2025-04-17',
            expiryDate: '2025-07-17',
            status: 'Pending',
            medications: [
                {
                    name: 'Metformin',
                    dosage: '500mg',
                    quantity: 60,
                    instructions: '1 tablet twice daily with meals',
                    notes: 'Increase to 2 tablets twice daily after 2 weeks if tolerated'
                },
                {
                    name: 'Glimepiride',
                    dosage: '2mg',
                    quantity: 30,
                    instructions: '1 tablet once daily before breakfast',
                    notes: 'Monitor blood sugar levels regularly'
                }
            ],
            notes: 'Follow up appointment in 1 month',
            priority: 'Urgent',
            insuranceInfo: {
                provider: 'NationalCare',
                policyNumber: 'NC-123456789',
                validUntil: '2026-06-30'
            }
        },
        {
            id: 'RX-20250416-003',
            patientName: 'Omar Khalid',
            patientId: 'PT-76543',
            dateOfBirth: '1990-11-18',
            doctorName: 'Dr. Emily Rodriguez',
            doctorId: 'DR-34567',
            specialty: 'Pulmonologist',
            issueDate: '2025-04-16',
            expiryDate: '2025-05-16',
            status: 'Pending',
            medications: [
                {
                    name: 'Fluticasone',
                    dosage: '50mcg',
                    quantity: 1,
                    instructions: '2 sprays each nostril daily',
                    notes: 'Use in the morning'
                },
                {
                    name: 'Montelukast',
                    dosage: '10mg',
                    quantity: 30,
                    instructions: '1 tablet daily at bedtime',
                    notes: ''
                }
            ],
            notes: 'Seasonal allergies, worsening asthma symptoms',
            priority: 'Normal',
            insuranceInfo: {
                provider: 'MediCover',
                policyNumber: 'MC-456789123',
                validUntil: '2025-09-30'
            }
        },
        {
            id: 'RX-20250416-004',
            patientName: 'Fatima Al-Sayed',
            patientId: 'PT-87654',
            dateOfBirth: '1956-08-20',
            doctorName: 'Dr. James Wilson',
            doctorId: 'DR-45678',
            specialty: 'Cardiologist',
            issueDate: '2025-04-16',
            expiryDate: '2025-10-16',
            status: 'Pending',
            medications: [
                {
                    name: 'Atorvastatin',
                    dosage: '20mg',
                    quantity: 90,
                    instructions: '1 tablet daily at bedtime',
                    notes: ''
                },
                {
                    name: 'Lisinopril',
                    dosage: '10mg',
                    quantity: 90,
                    instructions: '1 tablet daily in the morning',
                    notes: 'Monitor blood pressure regularly'
                },
                {
                    name: 'Aspirin',
                    dosage: '81mg',
                    quantity: 90,
                    instructions: '1 tablet daily with food',
                    notes: 'Low-dose for cardiac protection'
                }
            ],
            notes: 'Recent hospitalization for mild stroke. Follow up with cardiologist in 2 weeks.',
            priority: 'Urgent',
            insuranceInfo: {
                provider: 'SeniorCare+',
                policyNumber: 'SC-789123456',
                validUntil: '2025-12-31'
            }
        },
        {
            id: 'RX-20250415-005',
            patientName: 'Karim Mustafa',
            patientId: 'PT-98765',
            dateOfBirth: '2018-04-03',
            doctorName: 'Dr. Lisa Thompson',
            doctorId: 'DR-56789',
            specialty: 'Pediatrician',
            issueDate: '2025-04-15',
            expiryDate: '2025-04-22',
            status: 'Pending',
            medications: [
                {
                    name: 'Amoxicillin',
                    dosage: '250mg/5mL',
                    quantity: 100,
                    instructions: '5mL three times daily',
                    notes: 'For pediatric use. Keep refrigerated.'
                }
            ],
            notes: 'Ear infection. Parent to report if symptoms don\'t improve in 3 days',
            priority: 'Normal',
            insuranceInfo: {
                provider: 'FamilyCare',
                policyNumber: 'FC-891234567',
                validUntil: '2025-08-31'
            }
        }
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
                            <h2>Prescription Details</h2>
                            <span className="prescription-id">{selectedPrescription.id}</span>
                        </div>
                        <div className="header-right">
                            {selectedPrescription.priority === 'Urgent' && (
                                <span className="priority-badge urgent">
                                    <FaExclamationTriangle /> Urgent
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
                                        <div className="info-item">
                                            <span className="info-label">Insurance</span>
                                            <span className="info-value">{selectedPrescription.insuranceInfo.provider}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Policy Number</span>
                                            <span className="info-value">{selectedPrescription.insuranceInfo.policyNumber}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Valid Until</span>
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
                                        <div className="info-item">
                                            <span className="info-label">Expiry Date</span>
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

                                    {selectedPrescription.notes && (
                                        <div className="prescription-notes">
                                            <div className="notes-label">Additional Notes</div>
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
                                <span>Processing prescription...</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="action-btn primary"
                                    onClick={() => handleDispensePrescription(selectedPrescription)}
                                >
                                    <FaCheckCircle /> Dispense Prescription
                                </button>
                                <button
                                    className="action-btn reject"
                                    onClick={handleCloseModal}
                                >
                                    <FaTimesCircle /> Reject
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
                    <p>Loading prescriptions...</p>
                </div>
            ) : (
                <div className="pending-container">
                    <div className="page-header">
                        <h1>Pending Prescriptions</h1>
                        <p>Process and manage prescriptions awaiting fulfillment</p>
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
                                <label htmlFor="priority-filter">Priority</label>
                                <select
                                    id="priority-filter"
                                    value={filterOptions.priority}
                                    onChange={e => setFilterOptions({ ...filterOptions, priority: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All</option>
                                    <option value="normal">Normal</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="date-filter">Date</label>
                                <select
                                    id="date-filter"
                                    value={filterOptions.date}
                                    onChange={e => setFilterOptions({ ...filterOptions, date: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="today">Today</option>
                                    <option value="yesterday">Yesterday</option>
                                    <option value="thisWeek">This Week</option>
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
                                    <option value="priority">Priority</option>
                                </select>
                            </div>

                            <button className="refresh-btn" onClick={handleRefresh}>
                                <FaSyncAlt /> Refresh
                            </button>
                        </div>
                    </div>

                    <div className="prescriptions-results">
                        <div className="results-header">
                            <h3>Results ({sortedPrescriptions.length})</h3>
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
                                <h3>No Prescriptions Found</h3>
                                <p>
                                    {searchTerm
                                        ? `No prescriptions match your search term "${searchTerm}"`
                                        : 'There are no pending prescriptions at this time'}
                                </p>
                                {searchTerm && (
                                    <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                        Clear Search
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
                                                        <FaExclamationTriangle /> Urgent
                                                    </span>
                                                )}
                                            </div>

                                            <div className="prescription-body">
                                                <div className="patient-info">
                                                    <span className="label">Patient</span>
                                                    <span className="value">{prescription.patientName}</span>
                                                </div>
                                                <div className="doctor-info">
                                                    <span className="label">Doctor</span>
                                                    <span className="value">{prescription.doctorName}</span>
                                                </div>
                                                <div className="medications-info">
                                                    <span className="label">Medications</span>
                                                    <span className="value">{prescription.medications.length} item(s)</span>
                                                </div>
                                            </div>

                                            <div className="medication-list">
                                                {prescription.medications.map((med, index) => (
                                                    <div className="medication-item" key={index}>
                                                        <span className="med-name">{med.name}</span>
                                                        <span className="med-dose">{med.dosage}</span>
                                                        <span className="med-qty">Qty: {med.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="prescription-actions">
                                                <button
                                                    className="view-btn"
                                                    onClick={() => handleViewPrescription(prescription)}
                                                >
                                                    <FaEye /> View Details
                                                </button>
                                                <button
                                                    className="dispense-btn"
                                                    onClick={() => handleDispensePrescription(prescription)}
                                                >
                                                    <FaCheckCircle /> Dispense
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