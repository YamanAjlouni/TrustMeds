import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PharmacyScanPrescription.scss';
import {
    FaQrcode,
    FaCheckCircle,
    FaTimesCircle,
    FaClipboardList,
    FaExclamationTriangle,
    FaUserAlt,
    FaUserMd,
    FaCalendarAlt,
    FaPills,
    FaListAlt
} from 'react-icons/fa';

const PharmacyScanPrescription = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedPrescription, setScannedPrescription] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();

    // Sample prescriptions that might be "scanned"
    const samplePrescriptions = [
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
        }
    ];

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Start scanning
    const startScanning = () => {
        setError(null);
        setIsScanning(true);
        setScannedPrescription(null);
        setSuccessMessage(null);

        // Simulate scanning process
        setTimeout(() => {
            const randomPrescription = samplePrescriptions[Math.floor(Math.random() * samplePrescriptions.length)];
            setScannedPrescription(randomPrescription);
            setIsScanning(false);
        }, 3000);
    };

    // Cancel scanning
    const cancelScanning = () => {
        setIsScanning(false);
        setScannedPrescription(null);
    };

    // Handle prescription dispensing
    const handleDispensePrescription = () => {
        if (!scannedPrescription) return;

        setIsVerifying(true);

        // Simulate verification process
        setTimeout(() => {
            setIsVerifying(false);
            setSuccessMessage(`Prescription ${scannedPrescription.id} has been successfully dispensed.`);

            // Reset after showing success message
            setTimeout(() => {
                setScannedPrescription(null);
                setSuccessMessage(null);
            }, 3000);
        }, 2000);
    };

    // Handle prescription rejection
    const handleRejectPrescription = () => {
        if (!scannedPrescription) return;

        // Reset state
        setScannedPrescription(null);
        setError(null);
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

    return (
        <div className="pharmacy-scan-prescription">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading scanner...</p>
                </div>
            ) : (
                <div className="scan-container">
                    <div className="page-header">
                        <h1>Scan Prescription</h1>
                        <p>Use the QR code scanner to quickly process prescriptions</p>
                    </div>

                    {!scannedPrescription && !isScanning && !successMessage && (
                        <div className="scanner-card">
                            <div className="scanner-cta">
                                <div className="scanner-icon">
                                    <FaQrcode />
                                </div>
                                <h2>Ready to Scan</h2>
                                <p>Position the QR code in view of the camera to scan the prescription</p>
                                <button className="scan-btn primary" onClick={startScanning}>
                                    Start Scanner
                                </button>
                                <button className="scan-btn secondary" onClick={() => navigate('/pharmacy/pending-prescriptions')}>
                                    <FaClipboardList /> View Pending Prescriptions
                                </button>
                            </div>
                        </div>
                    )}

                    {isScanning && (
                        <div className="scanner-card">
                            <div className="scanner-active">
                                <div className="scanner-animation">
                                    <div className="scanner-crosshair"></div>
                                    <FaQrcode className="scanner-pulse" />
                                </div>
                                <h2>Scanning...</h2>
                                <p>Please hold the QR code steady in view of the camera</p>
                                <button className="cancel-btn" onClick={cancelScanning}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="error-card">
                            <div className="error-icon">
                                <FaExclamationTriangle />
                            </div>
                            <h2>Error</h2>
                            <p>{error}</p>
                            <button className="retry-btn" onClick={startScanning}>
                                Try Again
                            </button>
                        </div>
                    )}

                    {successMessage && (
                        <div className="success-card">
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <h2>Success!</h2>
                            <p>{successMessage}</p>
                            <button className="scan-btn primary" onClick={startScanning}>
                                Scan Another
                            </button>
                        </div>
                    )}

                    {scannedPrescription && !successMessage && (
                        <div className="prescription-details-card">
                            <div className="card-header">
                                <div className="header-left">
                                    <h2>Prescription Found</h2>
                                    <span className="prescription-id">{scannedPrescription.id}</span>
                                </div>
                                {scannedPrescription.priority === 'Urgent' && (
                                    <span className="priority-badge urgent">
                                        <FaExclamationTriangle /> Urgent
                                    </span>
                                )}
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
                                                <span className="info-value">{scannedPrescription.patientName}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">ID</span>
                                                <span className="info-value">{scannedPrescription.patientId}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Date of Birth</span>
                                                <span className="info-value">{formatDate(scannedPrescription.dateOfBirth)}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Insurance</span>
                                                <span className="info-value">{scannedPrescription.insuranceInfo.provider}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Policy Number</span>
                                                <span className="info-value">{scannedPrescription.insuranceInfo.policyNumber}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Valid Until</span>
                                                <span className="info-value">{formatDate(scannedPrescription.insuranceInfo.validUntil)}</span>
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
                                                <span className="info-value">{scannedPrescription.doctorName}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">ID</span>
                                                <span className="info-value">{scannedPrescription.doctorId}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Specialty</span>
                                                <span className="info-value">{scannedPrescription.specialty}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Issue Date</span>
                                                <span className="info-value">{formatDate(scannedPrescription.issueDate)}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Expiry Date</span>
                                                <span className="info-value">{formatDate(scannedPrescription.expiryDate)}</span>
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
                                        {scannedPrescription.medications.map((medication, index) => (
                                            <div className="medication-card" key={index}>
                                                <div className="medication-header">
                                                    <h4>{medication.name} <span className="dosage">{medication.dosage}</span></h4>
                                                    <span className="quantity">Qty: {medication.quantity}</span>
                                                </div>
                                                <div className="medication-instructions">
                                                    <div className="instruction-item">
                                                        <span className="instruction-label"><FaListAlt /> Sig</span>
                                                        <span className="instruction-value">{medication.instructions}</span>
                                                    </div>
                                                    {medication.notes && (
                                                        <div className="instruction-item">
                                                            <span className="instruction-label"><FaCalendarAlt /> Notes</span>
                                                            <span className="instruction-value">{medication.notes}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {scannedPrescription.notes && (
                                            <div className="prescription-notes">
                                                <div className="notes-label">Additional Notes</div>
                                                <div className="notes-content">{scannedPrescription.notes}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                {isVerifying ? (
                                    <div className="verifying-container">
                                        <div className="loader small"></div>
                                        <span>Verifying prescription...</span>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className="action-btn primary"
                                            onClick={handleDispensePrescription}
                                        >
                                            <FaCheckCircle /> Dispense Prescription
                                        </button>
                                        <button
                                            className="action-btn secondary"
                                            onClick={handleRejectPrescription}
                                        >
                                            <FaTimesCircle /> Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="instruction-card">
                        <h3>How to Use the Prescription Scanner</h3>
                        <ol className="instruction-list">
                            <li>
                                <span className="step-number">1</span>
                                <div className="step-content">
                                    <h4>Scan Prescription QR Code</h4>
                                    <p>Click "Start Scanner" and position the QR code within the camera view</p>
                                </div>
                            </li>
                            <li>
                                <span className="step-number">2</span>
                                <div className="step-content">
                                    <h4>Verify Information</h4>
                                    <p>Carefully review all patient and medication details to ensure accuracy</p>
                                </div>
                            </li>
                            <li>
                                <span className="step-number">3</span>
                                <div className="step-content">
                                    <h4>Process or Reject</h4>
                                    <p>Dispense the prescription or cancel if there are any issues</p>
                                </div>
                            </li>
                            <li>
                                <span className="step-number">4</span>
                                <div className="step-content">
                                    <h4>Verify Insurance</h4>
                                    <p>Check that the patient's insurance information is valid and up to date</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyScanPrescription;