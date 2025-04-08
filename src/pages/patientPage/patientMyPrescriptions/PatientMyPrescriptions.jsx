import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientMyPrescriptions.scss';
import {
    FaPills, FaHistory, FaFilePrescription, FaHospitalUser,
    FaExclamationTriangle, FaSearch, FaFilter, FaPlusCircle,
    FaTimes, FaChevronDown, FaChevronUp, FaBell, FaCalendarAlt
} from 'react-icons/fa';

export const PatientMyPrescriptions = () => {
    // State for active prescriptions
    const [activePrescriptions, setActivePrescriptions] = useState([
        {
            id: 1,
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3 times daily",
            refillsRemaining: 2,
            nextRefillDate: "2025-04-15",
            doctor: "Dr. Smith",
            instructions: "Take with food. Complete full course of treatment.",
            pharmacy: "Main Street Pharmacy",
            prescribedDate: "2025-03-10",
            expirationDate: "2025-09-10",
            color: "#4B9CD3",
            ndc: "12345-678-90",
            status: "active"
        },
        {
            id: 2,
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            refillsRemaining: 3,
            nextRefillDate: "2025-04-20",
            doctor: "Dr. Johnson",
            instructions: "Take in the morning. May cause dizziness.",
            pharmacy: "Main Street Pharmacy",
            prescribedDate: "2025-02-15",
            expirationDate: "2026-02-15",
            color: "#2AAC8A",
            ndc: "54321-876-54",
            status: "active"
        },
        {
            id: 3,
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "Once daily",
            refillsRemaining: 5,
            nextRefillDate: "2025-05-05",
            doctor: "Dr. Johnson",
            instructions: "Take in the evening. Report muscle pain.",
            pharmacy: "Central Pharmacy",
            prescribedDate: "2025-03-05",
            expirationDate: "2026-03-05",
            color: "#F6B93B",
            ndc: "98765-432-10",
            status: "active"
        }
    ]);

    // State for prescription history
    const [prescriptionHistory, setPrescriptionHistory] = useState([
        {
            id: 101,
            name: "Doxycycline",
            dosage: "100mg",
            frequency: "Twice daily",
            refillsRemaining: 0,
            doctor: "Dr. Smith",
            instructions: "Take with food. Avoid sun exposure.",
            pharmacy: "Main Street Pharmacy",
            prescribedDate: "2025-01-05",
            expirationDate: "2025-02-05",
            color: "#975BA5",
            ndc: "11122-333-44",
            status: "completed"
        },
        {
            id: 102,
            name: "Prednisone",
            dosage: "10mg",
            frequency: "Once daily",
            refillsRemaining: 0,
            doctor: "Dr. Lee",
            instructions: "Take with food. Taper as directed.",
            pharmacy: "Central Pharmacy",
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

    // Get unique doctors and pharmacies for filter options
    const allDoctors = [...new Set([
        ...activePrescriptions.map(p => p.doctor),
        ...prescriptionHistory.map(p => p.doctor)
    ])];

    const allPharmacies = [...new Set([
        ...activePrescriptions.map(p => p.pharmacy),
        ...prescriptionHistory.map(p => p.pharmacy)
    ])];

    // Function to apply filters
    const applyFilters = (prescriptions) => {
        return prescriptions.filter(prescription => {
            // Filter by search query
            const matchesSearch =
                prescription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prescription.pharmacy.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter by doctor
            const matchesDoctor = !filters.doctor || prescription.doctor === filters.doctor;

            // Filter by pharmacy
            const matchesPharmacy = !filters.pharmacy || prescription.pharmacy === filters.pharmacy;

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

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Variants for animations (no longer used)
    const cardVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const expandVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto" }
    };

    return (
        <div className="my-prescriptions-container">
            <div className="page-header">
                <div className="header-content">
                    <h1><FaFilePrescription className="header-icon" /> My Prescriptions</h1>
                    <p>Manage and view all your prescription medications</p>
                </div>
                <div className="prescription-stats">
                    <div className="stat-item">
                        <span className="stat-value">{activePrescriptions.length}</span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{prescriptionHistory.length}</span>
                        <span className="stat-label">Past</span>
                    </div>
                </div>
            </div>

            <div className="prescription-controls">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search medications, doctors, or pharmacies..."
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
                    >
                        <FaFilter className="filter-icon" />
                        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                    </button>
                    <button
                        className="add-prescription-btn"
                        onClick={handleAddPrescriptionClick}
                    >
                        <FaPlusCircle className="add-icon" />
                        <span>Request Prescription</span>
                    </button>
                </div>
            </div>

            {showAddInfo && (
                <div className="add-info-message">
                    <FaBell className="info-icon" /> This feature allows you to request a new prescription from your doctor.
                    Your doctor will review and approve it if appropriate.
                </div>
            )}

            {showFilters && (
                <div className="filter-panel">
                    <div className="filter-panel-header">
                        <h3>Filter Prescriptions</h3>
                        <button
                            className="reset-filters-btn"
                            onClick={resetFilters}
                        >
                            Reset All
                        </button>
                    </div>

                    <div className="filter-options">
                        <div className="filter-group">
                            <label>Doctor</label>
                            <select
                                value={filters.doctor}
                                onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
                            >
                                <option value="">All Doctors</option>
                                {allDoctors.map(doctor => (
                                    <option key={doctor} value={doctor}>{doctor}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Pharmacy</label>
                            <select
                                value={filters.pharmacy}
                                onChange={(e) => setFilters({ ...filters, pharmacy: e.target.value })}
                            >
                                <option value="">All Pharmacies</option>
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
                            <label htmlFor="refillsNeeded">Needs Refill Soon (≤ 1 refill left)</label>
                        </div>

                        <div className="filter-checkbox">
                            <input
                                type="checkbox"
                                id="expiringWithin30Days"
                                checked={filters.expiringWithin30Days}
                                onChange={(e) => setFilters({ ...filters, expiringWithin30Days: e.target.checked })}
                            />
                            <label htmlFor="expiringWithin30Days">Expiring Within 30 Days</label>
                        </div>
                    </div>

                    <div className="active-filters-summary">
                        {Object.entries(filters).some(([key, value]) =>
                            (typeof value === 'boolean' && value === true) || (typeof value === 'string' && value !== '')
                        ) ? (
                            <div className="active-filters-list">
                                <span>Active filters:</span>
                                {filters.doctor && <span className="filter-tag">Doctor: {filters.doctor}</span>}
                                {filters.pharmacy && <span className="filter-tag">Pharmacy: {filters.pharmacy}</span>}
                                {filters.refillsNeeded && <span className="filter-tag">Needs Refill</span>}
                                {filters.expiringWithin30Days && <span className="filter-tag">Expiring Soon</span>}
                            </div>
                        ) : (
                            <span>No active filters</span>
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
                    <span>Active Prescriptions</span>
                    {activeTab !== 'active' && (
                        <span className="count-badge">{activePrescriptions.length}</span>
                    )}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <FaHistory className="tab-icon" />
                    <span>Prescription History</span>
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
                                            {prescription.name}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">{prescription.frequency}</p>
                                    </div>
                                    <div className="prescription-refills">
                                        <span
                                            className={`refills-count ${prescription.refillsRemaining <= 1 ? 'low-refills' : ''}`}
                                        >
                                            {prescription.refillsRemaining}
                                        </span>
                                        <span className="refills-label">Refills Left</span>
                                    </div>
                                </div>

                                <div
                                    className="prescription-basic-info"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="info-item">
                                        <span className="info-label">Doctor</span>
                                        <span className="info-value">{prescription.doctor}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Pharmacy</span>
                                        <span className="info-value">{prescription.pharmacy}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Next Refill</span>
                                        <span className="info-value next-refill">
                                            <FaCalendarAlt className="calendar-icon" />
                                            {formatDate(prescription.nextRefillDate)}
                                        </span>
                                    </div>
                                </div>

                                <div className="expand-indicator" onClick={() => toggleExpand(prescription.id)}>
                                    {expandedPrescription === prescription.id ? (
                                        <FaChevronUp className="expand-icon" />
                                    ) : (
                                        <FaChevronDown className="expand-icon" />
                                    )}
                                </div>

                                {expandedPrescription === prescription.id && (
                                    <div className="prescription-details">
                                        <div className="details-section">
                                            <h4>Prescription Details</h4>
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">NDC</span>
                                                    <span className="detail-value">{prescription.ndc}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Prescribed</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Expires</span>
                                                    <span className={`detail-value ${isExpiringWithin30Days(prescription.expirationDate) ? 'expiring-soon' : ''}`}>
                                                        {formatDate(prescription.expirationDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>Instructions</h4>
                                            <p>{prescription.instructions}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="renew-btn action-btn">
                                                Request Renewal
                                            </button>
                                            <button className="info-btn action-btn">
                                                Medication Info
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>No active prescriptions found</h3>
                            <p>Try adjusting your search or filters</p>
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
                                            {prescription.name}
                                            <span className="prescription-dosage">{prescription.dosage}</span>
                                        </h3>
                                        <p className="prescription-frequency">{prescription.frequency}</p>
                                    </div>
                                    <div className="prescription-status">
                                        <span className="status-label">Completed</span>
                                    </div>
                                </div>

                                <div
                                    className="prescription-basic-info"
                                    onClick={() => toggleExpand(prescription.id)}
                                >
                                    <div className="info-item">
                                        <span className="info-label">Doctor</span>
                                        <span className="info-value">{prescription.doctor}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Pharmacy</span>
                                        <span className="info-value">{prescription.pharmacy}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Prescribed</span>
                                        <span className="info-value">
                                            <FaCalendarAlt className="calendar-icon" />
                                            {formatDate(prescription.prescribedDate)}
                                        </span>
                                    </div>
                                </div>

                                <div className="expand-indicator" onClick={() => toggleExpand(prescription.id)}>
                                    {expandedPrescription === prescription.id ? (
                                        <FaChevronUp className="expand-icon" />
                                    ) : (
                                        <FaChevronDown className="expand-icon" />
                                    )}
                                </div>

                                {expandedPrescription === prescription.id && (
                                    <div className="prescription-details">
                                        <div className="details-section">
                                            <h4>Prescription Details</h4>
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">NDC</span>
                                                    <span className="detail-value">{prescription.ndc}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Prescribed</span>
                                                    <span className="detail-value">{formatDate(prescription.prescribedDate)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Expired</span>
                                                    <span className="detail-value">{formatDate(prescription.expirationDate)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="instructions-section">
                                            <h4>Instructions</h4>
                                            <p>{prescription.instructions}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="renew-btn action-btn">
                                                Request Renewal
                                            </button>
                                            <button className="info-btn action-btn">
                                                Medication Info
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>No prescription history found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PatientMyPrescriptions;
