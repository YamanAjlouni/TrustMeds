// components/PrescriptionTable.jsx
import React from 'react';
import {
    FaSort, FaSortUp, FaSortDown, FaPills, FaFileAlt, FaCalendarAlt, FaUser,
    FaEllipsisV, FaPrint, FaEdit, FaTrashAlt, FaInfoCircle,
    FaTimesCircle
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export const PrescriptionTable = ({
    filteredPrescriptions,
    activePrescription,
    handlePrescriptionSelect,
    sortField,
    sortDirection,
    handleSort,
    resetFilters
}) => {
    // Get sorting icon
    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort />;
        return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="prescriptions-table-container">
            <table className="prescriptions-table">
                <thead>
                    <tr>
                        <th className="id-col" onClick={() => handleSort('id')}>
                            <span>Rx ID {getSortIcon('id')}</span>
                        </th>
                        <th className="date-col" onClick={() => handleSort('date')}>
                            <span>Date {getSortIcon('date')}</span>
                        </th>
                        <th className="patient-col" onClick={() => handleSort('patient')}>
                            <span>Patient {getSortIcon('patient')}</span>
                        </th>
                        <th className="medications-col">Medications</th>
                        <th className="status-col" onClick={() => handleSort('status')}>
                            <span>Status {getSortIcon('status')}</span>
                        </th>
                        <th className="pharmacy-col">Pharmacy</th>
                        <th className="actions-col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPrescriptions.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="no-results">
                                <div className="no-prescriptions-message">
                                    <FaPills className="no-results-icon" />
                                    <p>No prescriptions match your search criteria</p>
                                    <button onClick={resetFilters}>Clear Filters</button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredPrescriptions.map(prescription => (
                            <React.Fragment key={prescription.id}>
                                <tr
                                    className={`prescription-row ${activePrescription === prescription ? 'active' : ''}`}
                                    onClick={() => handlePrescriptionSelect(prescription)}
                                >
                                    <td className="id-col">{prescription.id}</td>
                                    <td className="date-col">
                                        {new Date(prescription.date).toLocaleDateString()}
                                    </td>
                                    <td className="patient-col">
                                        <div className="patient-info">
                                            <span className="patient-name">{prescription.patientName}</span>
                                            <span className="patient-id">{prescription.patientId}</span>
                                        </div>
                                    </td>
                                    <td className="medications-col">
                                        <div className="medications-summary">
                                            <span className="medication-primary">
                                                {prescription.medications[0].name} {prescription.medications[0].dosage}
                                            </span>
                                            {prescription.medications.length > 1 && (
                                                <span className="medication-count">+{prescription.medications.length - 1} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="status-col">
                                        <StatusBadge status={prescription.status} />
                                    </td>
                                    <td className="pharmacy-col">
                                        {prescription.pharmacy}
                                    </td>
                                    <td className="actions-col">
                                        <div className="actions-dropdown">
                                            <button className="actions-toggle">
                                                <FaEllipsisV />
                                            </button>
                                            <div className="dropdown-menu">
                                                <NavLink to={`/doctor/medical-records/${prescription.patientId}`} className="dropdown-item">
                                                    <FaFileAlt /> View Patient Record
                                                </NavLink>
                                                <button className="dropdown-item">
                                                    <FaPrint /> Print Prescription
                                                </button>
                                                {(prescription.status === 'Pending Approval' || prescription.status === 'Declined') && (
                                                    <NavLink to={`/doctor/write-prescription?edit=${prescription.id}`} className="dropdown-item">
                                                        <FaEdit /> Edit Prescription
                                                    </NavLink>
                                                )}
                                                {prescription.status === 'Pending Approval' && (
                                                    <button className="dropdown-item delete">
                                                        <FaTrashAlt /> Cancel Prescription
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {activePrescription === prescription && (
                                    <tr className="prescription-details-row">
                                        <td colSpan="7">
                                            <div className="prescription-details">
                                                <div className="details-header">
                                                    <div className="prescription-id">
                                                        <FaFileAlt className="details-icon" />
                                                        <h4>Prescription Details - {prescription.id}</h4>
                                                    </div>
                                                    <div className="prescription-meta">
                                                        <span className="issued-date">
                                                            <FaCalendarAlt /> Issued: {new Date(prescription.date).toLocaleDateString()}
                                                        </span>
                                                        <span className="patient-link">
                                                            <FaUser /> Patient: <NavLink to={`/doctor/medical-records/${prescription.patientId}`}>{prescription.patientName}</NavLink>
                                                        </span>
                                                        <StatusBadge status={prescription.status} />
                                                    </div>
                                                </div>

                                                <div className="details-body">
                                                    <div className="medications-list">
                                                        <h5><FaPills /> Medications</h5>
                                                        <table className="medications-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Medication</th>
                                                                    <th>Dosage</th>
                                                                    <th>Frequency</th>
                                                                    <th>Duration</th>
                                                                    <th>Refills</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {prescription.medications.map((medication, index) => (
                                                                    <tr key={index}>
                                                                        <td>{medication.name}</td>
                                                                        <td>{medication.dosage}</td>
                                                                        <td>{medication.frequency}</td>
                                                                        <td>{medication.duration}</td>
                                                                        <td>{medication.refills}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="details-footer">
                                                        <div className="pharmacy-info">
                                                            <h5>Pharmacy</h5>
                                                            <p>{prescription.pharmacy}</p>
                                                        </div>

                                                        {prescription.notes && (
                                                            <div className="prescription-notes">
                                                                <h5><FaInfoCircle /> Notes</h5>
                                                                <p>{prescription.notes}</p>
                                                            </div>
                                                        )}

                                                        {prescription.declineReason && (
                                                            <div className="decline-reason">
                                                                <h5><FaTimesCircle /> Decline Reason</h5>
                                                                <p>{prescription.declineReason}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="details-actions">
                                                        <button className="action-btn secondary">
                                                            <FaPrint /> Print
                                                        </button>
                                                        {(prescription.status === 'Pending Approval' || prescription.status === 'Declined') && (
                                                            <NavLink to={`/doctor/write-prescription?edit=${prescription.id}`} className="action-btn primary">
                                                                <FaEdit /> Edit Prescription
                                                            </NavLink>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
