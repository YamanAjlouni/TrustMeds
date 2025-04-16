// components/PrescriptionCards.jsx
import React from 'react';
import { FaBuilding, FaEye, FaPrint, FaEdit, FaPills } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export const PrescriptionCards = ({
    filteredPrescriptions,
    handlePrescriptionSelect,
    isSmallScreen,
    resetFilters
}) => {
    // Render mobile prescription card
    const renderPrescriptionCard = (prescription) => (
        <div
            className="prescription-card"
            key={prescription.id}
            onClick={() => handlePrescriptionSelect(prescription)}
        >
            <div className="card-header">
                <div className="prescription-id-date">
                    <div className="prescription-id">{prescription.id}</div>
                    <div className="prescription-date">{new Date(prescription.date).toLocaleDateString()}</div>
                </div>
                <StatusBadge status={prescription.status} />
            </div>
            <div className="card-content">
                <div className="patient-info">
                    <div className="patient-name">{prescription.patientName}</div>
                    <div className="patient-id">{prescription.patientId}</div>
                </div>
                <div className="medication-info">
                    <span className="medication-primary">
                        {prescription.medications[0].name} {prescription.medications[0].dosage}
                    </span>
                    {prescription.medications.length > 1 && (
                        <span className="medication-count">+{prescription.medications.length - 1} more medications</span>
                    )}
                </div>
                <div className="pharmacy-info">
                    <FaBuilding className="info-icon" />
                    <span>{prescription.pharmacy}</span>
                </div>
            </div>
            <div className="card-actions">
                <button className="action-btn">
                    <FaEye />
                    {!isSmallScreen && <span className="action-text">View</span>}
                </button>
                <button className="action-btn">
                    <FaPrint />
                    {!isSmallScreen && <span className="action-text">Print</span>}
                </button>
                {(prescription.status === 'Pending Approval' || prescription.status === 'Declined') && (
                    <NavLink to={`/doctor/write-prescription?edit=${prescription.id}`} className="action-btn">
                        <FaEdit />
                        {!isSmallScreen && <span className="action-text">Edit</span>}
                    </NavLink>
                )}
            </div>
        </div>
    );

    return (
        <div className="prescription-cards">
            {filteredPrescriptions.length === 0 ? (
                <div className="no-results-card">
                    <FaPills className="no-results-icon" />
                    <p>No prescriptions match your search criteria</p>
                    <button onClick={resetFilters}>Clear Filters</button>
                </div>
            ) : (
                filteredPrescriptions.map(prescription => renderPrescriptionCard(prescription))
            )}
        </div>
    );
};
