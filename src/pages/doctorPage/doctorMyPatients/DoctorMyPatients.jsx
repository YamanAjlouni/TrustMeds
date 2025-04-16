import React, { useState, useEffect } from 'react';
import './DoctorMyPatients.scss';
import {
    FaSearch,
    FaUserInjured,
    FaFilter,
    FaExclamationCircle,
    FaRegStar,
    FaStar,
    FaEllipsisV,
    FaSyncAlt,
    FaUserPlus,
    FaPills,
    FaFileAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaCalendarAlt,
    FaSort,
    FaSortUp,
    FaSortDown
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const DoctorMyPatients = () => {
    // Sample data - in a real app, this would come from your API/backend
    const [patients, setPatients] = useState([
        {
            id: 'PT-1234',
            firstName: 'Ahmed',
            lastName: 'Hassan',
            age: 45,
            gender: 'Male',
            lastVisit: '2025-03-29',
            conditions: ['Hypertension', 'Type 2 Diabetes'],
            activeMedications: 3,
            status: 'Stable',
            nextAppointment: '2025-04-29',
            phoneNumber: '+962 77 123 4567',
            email: 'ahmed.hassan@example.com',
            favorite: true,
            alerts: []
        },
        {
            id: 'PT-5678',
            firstName: 'Layla',
            lastName: 'Abbas',
            age: 32,
            gender: 'Female',
            lastVisit: '2025-04-05',
            conditions: ['Asthma'],
            activeMedications: 2,
            status: 'Follow-up Needed',
            nextAppointment: '2025-04-20',
            phoneNumber: '+962 79 987 6543',
            email: 'layla.abbas@example.com',
            favorite: false,
            alerts: ['Reported medication side effects']
        },
        {
            id: 'PT-9012',
            firstName: 'Omar',
            lastName: 'Farouq',
            age: 58,
            gender: 'Male',
            lastVisit: '2025-04-02',
            conditions: ['Coronary Artery Disease', 'Hyperlipidemia'],
            activeMedications: 4,
            status: 'Stable',
            nextAppointment: '2025-05-15',
            phoneNumber: '+962 78 456 7890',
            email: 'omar.farouq@example.com',
            favorite: true,
            alerts: []
        },
        {
            id: 'PT-3456',
            firstName: 'Fatima',
            lastName: 'Khalid',
            age: 52,
            gender: 'Female',
            lastVisit: '2025-04-08',
            conditions: ['Type 2 Diabetes', 'Hypertension', 'Obesity'],
            activeMedications: 5,
            status: 'Medication Adjustment Needed',
            nextAppointment: '2025-04-15',
            phoneNumber: '+962 77 234 5678',
            email: 'fatima.khalid@example.com',
            favorite: false,
            alerts: ['Elevated blood sugar levels']
        },
        {
            id: 'PT-7890',
            firstName: 'Kareem',
            lastName: 'Saleh',
            age: 64,
            gender: 'Male',
            lastVisit: '2025-03-15',
            conditions: ['Atrial Fibrillation', 'Hypertension'],
            activeMedications: 3,
            status: 'Urgent Follow-up',
            nextAppointment: '2025-04-13',
            phoneNumber: '+962 79 345 6789',
            email: 'kareem.saleh@example.com',
            favorite: false,
            alerts: ['Irregular heartbeat reported', 'New chest pain']
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [sortField, setSortField] = useState('lastName');
    const [sortDirection, setSortDirection] = useState('asc');
    const [activePatient, setActivePatient] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle status filter change
    const handleStatusFilterChange = (status) => {
        setSelectedStatus(status);
    };

    // Handle favorites toggle
    const handleFavoritesToggle = () => {
        setShowOnlyFavorites(!showOnlyFavorites);
    };

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            // If already sorting by this field, toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // New sort field, default to ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Handle patient selection
    const handlePatientSelect = (patient) => {
        setActivePatient(patient);
    };

    // Handle favorite toggle
    const handleFavoriteToggle = (patientId) => {
        setPatients(patients.map(patient =>
            patient.id === patientId ? { ...patient, favorite: !patient.favorite } : patient
        ));
    };

    // Get sorting icon
    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort />;
        return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    // Filter and sort patients
    const filteredPatients = patients.filter(patient => {
        // Apply search filter
        const searchMatch =
            patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply status filter
        const statusMatch = selectedStatus === 'All' || patient.status === selectedStatus;

        // Apply favorites filter
        const favoriteMatch = !showOnlyFavorites || patient.favorite;

        return searchMatch && statusMatch && favoriteMatch;
    }).sort((a, b) => {
        // Apply sorting
        let aValue, bValue;

        switch (sortField) {
            case 'lastName':
                aValue = a.lastName;
                bValue = b.lastName;
                break;
            case 'age':
                aValue = a.age;
                bValue = b.age;
                break;
            case 'lastVisit':
                aValue = new Date(a.lastVisit);
                bValue = new Date(b.lastVisit);
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            default:
                aValue = a.lastName;
                bValue = b.lastName;
        }

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return (
        <div className="doctor-my-patients">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading patient records...</p>
                </div>
            ) : (
                <div className="patients-container">
                    <div className="patients-header">
                        <h2>
                            <FaUserInjured className="header-icon" />
                            My Patients
                        </h2>
                        <div className="header-actions">
                            <button className="add-patient-btn">
                                <FaUserPlus /> Add New Patient
                            </button>
                            <button className="refresh-btn">
                                <FaSyncAlt />
                            </button>
                        </div>
                    </div>

                    <div className="patients-toolbar">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>

                        <div className="filters">
                            <div className="filter status-filter">
                                <span className="filter-label">
                                    <FaFilter /> Status:
                                </span>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                                    className="status-select"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Stable">Stable</option>
                                    <option value="Follow-up Needed">Follow-up Needed</option>
                                    <option value="Medication Adjustment Needed">Medication Adjustment</option>
                                    <option value="Urgent Follow-up">Urgent Follow-up</option>
                                </select>
                            </div>

                            <button
                                className={`favorites-filter ${showOnlyFavorites ? 'active' : ''}`}
                                onClick={handleFavoritesToggle}
                            >
                                {showOnlyFavorites ? <FaStar /> : <FaRegStar />} Favorites
                            </button>
                        </div>
                    </div>

                    <div className="patients-table-container">
                        <table className="patients-table">
                            <thead>
                                <tr>
                                    <th className="favorite-col"></th>
                                    <th className="name-col" onClick={() => handleSort('lastName')}>
                                        <span>Patient Name {getSortIcon('lastName')}</span>
                                    </th>
                                    <th className="age-col" onClick={() => handleSort('age')}>
                                        <span>Age {getSortIcon('age')}</span>
                                    </th>
                                    <th className="last-visit-col" onClick={() => handleSort('lastVisit')}>
                                        <span>Last Visit {getSortIcon('lastVisit')}</span>
                                    </th>
                                    <th className="conditions-col">Conditions</th>
                                    <th className="status-col" onClick={() => handleSort('status')}>
                                        <span>Status {getSortIcon('status')}</span>
                                    </th>
                                    <th className="actions-col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="no-results">
                                            <div className="no-patients-message">
                                                <FaUserInjured className="no-results-icon" />
                                                <p>No patients match your search criteria</p>
                                                <button onClick={() => {
                                                    setSearchTerm('');
                                                    setSelectedStatus('All');
                                                    setShowOnlyFavorites(false);
                                                }}>Clear Filters</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPatients.map(patient => (
                                        <tr
                                            key={patient.id}
                                            className={`patient-row ${patient.alerts.length > 0 ? 'has-alerts' : ''} ${activePatient?.id === patient.id ? 'active' : ''}`}
                                            onClick={() => handlePatientSelect(patient)}
                                        >
                                            <td className="favorite-col">
                                                {/* Alert indicator now inside the first cell */}
                                                {patient.alerts.length > 0 && (
                                                    <div className="alert-indicator"></div>
                                                )}
                                                <button
                                                    className="favorite-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavoriteToggle(patient.id);
                                                    }}
                                                >
                                                    {patient.favorite ? <FaStar className="favorited" /> : <FaRegStar />}
                                                </button>
                                            </td>
                                            <td className="name-col">
                                                <div className="patient-name">
                                                    <span>{patient.firstName} {patient.lastName}</span>
                                                    <span className="patient-id">{patient.id}</span>
                                                </div>
                                            </td>
                                            <td className="age-col">
                                                <span className="patient-age">{patient.age}</span>
                                                <span className="patient-gender">{patient.gender}</span>
                                            </td>
                                            <td className="last-visit-col">
                                                {new Date(patient.lastVisit).toLocaleDateString()}
                                            </td>
                                            <td className="conditions-col">
                                                <div className="conditions-list">
                                                    {patient.conditions.slice(0, 2).map((condition, index) => (
                                                        <span key={index} className="condition-tag">
                                                            {condition}
                                                        </span>
                                                    ))}
                                                    {patient.conditions.length > 2 && (
                                                        <span className="more-conditions">+{patient.conditions.length - 2}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="status-col">
                                                <span className={`status-badge ${patient.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {patient.alerts.length > 0 && (
                                                        <FaExclamationCircle className="alert-icon" />
                                                    )}
                                                    {patient.status}
                                                </span>
                                            </td>
                                            <td className="actions-col">
                                                <div className="actions-dropdown">
                                                    <button className="actions-toggle">
                                                        <FaEllipsisV />
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <NavLink to={`/doctor/medical-records/${patient.id}`} className="dropdown-item">
                                                            <FaFileAlt /> View Medical Record
                                                        </NavLink>
                                                        <NavLink to={`/doctor/write-prescription?patientId=${patient.id}`} className="dropdown-item">
                                                            <FaPills /> Write Prescription
                                                        </NavLink>
                                                        <button className="dropdown-item">
                                                            <FaPhoneAlt /> Call Patient
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <FaEnvelope /> Send Message
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <FaCalendarAlt /> Schedule Appointment
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {activePatient && (
                        <div className="patient-detail-panel">
                            <div className="panel-header">
                                <h3>Patient Details</h3>
                                <button className="close-panel-btn" onClick={() => setActivePatient(null)}>×</button>
                            </div>
                            <div className="panel-content">
                                <div className="patient-header">
                                    <div className="patient-avatar">
                                        <FaUserInjured />
                                    </div>
                                    <div className="patient-info">
                                        <h4>{activePatient.firstName} {activePatient.lastName}</h4>
                                        <div className="patient-meta">
                                            <span>{activePatient.age} years</span>
                                            <span>•</span>
                                            <span>{activePatient.gender}</span>
                                            <span>•</span>
                                            <span>{activePatient.id}</span>
                                        </div>
                                        <span className={`status-badge ${activePatient.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {activePatient.status}
                                        </span>
                                    </div>
                                </div>

                                {activePatient.alerts.length > 0 && (
                                    <div className="alerts-section">
                                        <h5><FaExclamationCircle /> Alerts</h5>
                                        <ul className="alerts-list">
                                            {activePatient.alerts.map((alert, index) => (
                                                <li key={index} className="alert-item">{alert}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="panel-section">
                                    <h5>Medical Conditions</h5>
                                    <div className="conditions-grid">
                                        {activePatient.conditions.map((condition, index) => (
                                            <span key={index} className="condition-tag large">{condition}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="panel-section">
                                    <h5>Contact Information</h5>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <FaPhoneAlt className="contact-icon" />
                                            <span>{activePatient.phoneNumber}</span>
                                        </div>
                                        <div className="contact-item">
                                            <FaEnvelope className="contact-icon" />
                                            <span>{activePatient.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel-section">
                                    <h5>Upcoming Appointment</h5>
                                    <div className="appointment-info">
                                        <div className="appointment-date">
                                            <FaCalendarAlt className="appointment-icon" />
                                            <span>{new Date(activePatient.nextAppointment).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel-actions">
                                    <NavLink to={`/doctor/medical-records/${activePatient.id}`} className="panel-action primary">
                                        <FaFileAlt /> Medical Record
                                    </NavLink>
                                    <NavLink to={`/doctor/write-prescription?patientId=${activePatient.id}`} className="panel-action secondary">
                                        <FaPills /> Write Prescription
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorMyPatients;