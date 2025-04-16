// components/MobileDetailView.jsx
import React from 'react';
import { FaArrowLeft, FaCalendarAlt, FaPills, FaInfoCircle, FaPrint, FaEdit, FaTimesCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export const MobileDetailView = ({
    activePrescription,
    showMobileDetail,
    handleMobileBack
}) => {
    if (!activePrescription) return null;

    return (
        <div className={`mobile-detail-view ${showMobileDetail ? 'active' : ''}`}>
            <div className="detail-header">
                <button className="back-button" onClick={handleMobileBack}>
                    <FaArrowLeft className="back-icon" /> Back
                </button>
                <h2 className="prescription-title">Prescription {activePrescription.id}</h2>
            </div>
            <div className="detail-content">
                <div className="status-section">
                    <StatusBadge status={activePrescription.status} />
                </div>

                <div className="details-section">
                    <h5><FaCalendarAlt /> Prescription Details</h5>
                    <div className="info-row">
                        <span className="info-label">Date Issued</span>
                        <span className="info-value">{new Date(activePrescription.date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Patient</span>
                        <span className="info-value">
                            <NavLink to={`/doctor/medical-records/${activePrescription.patientId}`}>
                                {activePrescription.patientName} ({activePrescription.patientId})
                            </NavLink>
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Pharmacy</span>
                        <span className="info-value">{activePrescription.pharmacy}</span>
                    </div>
                </div>

                <div className="details-section">
                    <h5><FaPills /> Medications</h5>
                    <div className="medications-grid">
                        {activePrescription.medications.map((medication, index) => (
                            <div className="medication-card" key={index}>
                                <div className="med-name">{medication.name} {medication.dosage}</div>
                                <div className="med-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Frequency</span>
                                        <span className="detail-value">{medication.frequency}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Duration</span>
                                        <span className="detail-value">{medication.duration}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Refills</span>
                                        <span className="detail-value">{medication.refills}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {activePrescription.notes && (
                    <div className="details-section notes-section">
                        <h5><FaInfoCircle /> Notes</h5>
                        <p>{activePrescription.notes}</p>
                    </div>
                )}

                {activePrescription.declineReason && (
                    <div className="details-section decline-section">
                        <h5><FaTimesCircle /> Decline Reason</h5>
                        <p>{activePrescription.declineReason}</p>
                    </div>
                )}
            </div>

            <div className="detail-actions">
                <button className="action-btn secondary">
                    <FaPrint /> Print
                </button>
                {(activePrescription.status === 'Pending Approval' || activePrescription.status === 'Declined') && (
                    <NavLink to={`/doctor/write-prescription?edit=${activePrescription.id}`} className="action-btn primary">
                        <FaEdit /> Edit Prescription
                    </NavLink>
                )}
            </div>
        </div>
    );
};
