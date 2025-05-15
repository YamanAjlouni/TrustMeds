import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './PharmacyDashboard.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language context
import {
    FaPills,
    FaCalendarAlt,
    FaUserAlt,
    FaQrcode,
    FaClipboardList,
    FaHistory,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaArrowRight,
    FaExclamationTriangle,
    FaSyncAlt,
    FaEye
} from 'react-icons/fa';

const PharmacyDashboard = () => {
    const { t, isRTL } = useLanguage(); // Get translations and RTL status

    // Sample data - in a real app, this would come from your API/backend
    const [overviewStats, setOverviewStats] = useState({
        newPrescriptions: 12,
        dispensedToday: 28,
        patientsServed: 35,
        medicationsDispensed: 57
    });

    const [pendingPrescriptions, setPendingPrescriptions] = useState([
        {
            id: 'RX-20250415-001',
            patientName: 'Ahmed Hassan',
            patientId: 'PT-54321',
            doctorName: 'Dr. Sarah Johnson',
            issueDate: '2025-04-15',
            status: 'Pending',
            medications: [
                { name: 'Amoxicillin', dosage: '500mg', quantity: 21, instructions: '3 times daily for 7 days' },
                { name: 'Paracetamol', dosage: '500mg', quantity: 12, instructions: 'As needed for pain, max 4 daily' }
            ],
            priority: 'Normal'
        },
        {
            id: 'RX-20250415-002',
            patientName: 'Layla Ibrahim',
            patientId: 'PT-65432',
            doctorName: 'Dr. Michael Chen',
            issueDate: '2025-04-15',
            status: 'Pending',
            medications: [
                { name: 'Lisinopril', dosage: '10mg', quantity: 30, instructions: 'Once daily in the morning' },
                { name: 'Atorvastatin', dosage: '20mg', quantity: 30, instructions: 'Once daily at bedtime' }
            ],
            priority: 'Urgent'
        },
        {
            id: 'RX-20250414-005',
            patientName: 'Omar Khalid',
            patientId: 'PT-76543',
            doctorName: 'Dr. Emily Rodriguez',
            issueDate: '2025-04-14',
            status: 'Pending',
            medications: [
                { name: 'Fluticasone', dosage: '50mcg', quantity: 1, instructions: '2 sprays each nostril daily' }
            ],
            priority: 'Normal'
        }
    ]);

    const [recentActivity, setRecentActivity] = useState([
        {
            id: 1,
            type: 'dispensed',
            date: '2025-04-15T10:30:00',
            description: 'Prescription RX-20250415-004 dispensed to Fatima Al-Sayed',
            prescriptionId: 'RX-20250415-004'
        },
        {
            id: 2,
            type: 'received',
            date: '2025-04-15T09:15:00',
            description: 'New prescription RX-20250415-001 received from Dr. Sarah Johnson',
            prescriptionId: 'RX-20250415-001'
        },
        {
            id: 3,
            type: 'alert',
            date: '2025-04-15T08:45:00',
            description: 'Inventory alert: Amoxicillin 500mg is low in stock (15 units remaining)',
            itemId: 'MED-1234'
        },
        {
            id: 4,
            type: 'communication',
            date: '2025-04-15T08:30:00',
            description: 'Message received from Dr. Michael Chen regarding patient Layla Ibrahim',
            messageId: 'MSG-4567'
        }
    ]);

    const [showScanner, setShowScanner] = useState(false);
    const [scannedPrescription, setScannedPrescription] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle QR code scanner simulation
    const handleScanToggle = () => {
        setShowScanner(!showScanner);
        if (!showScanner) {
            // Simulate scanning process
            setTimeout(() => {
                const randomPrescription = pendingPrescriptions[Math.floor(Math.random() * pendingPrescriptions.length)];
                setScannedPrescription(randomPrescription);
            }, 2000);
        } else {
            setScannedPrescription(null);
        }
    };

    // Handle prescription approval
    const handleApprovePrescription = (prescription) => {
        const now = new Date();

        // Update overview stats
        setOverviewStats({
            ...overviewStats,
            newPrescriptions: overviewStats.newPrescriptions - 1,
            dispensedToday: overviewStats.dispensedToday + 1,
            medicationsDispensed: overviewStats.medicationsDispensed + prescription.medications.length
        });

        // Add to recent activity
        setRecentActivity([
            {
                id: Date.now(),
                type: 'dispensed',
                date: now.toISOString(),
                description: `Prescription ${prescription.id} dispensed to ${prescription.patientName}`,
                prescriptionId: prescription.id
            },
            ...recentActivity
        ]);

        // Remove from pending list
        setPendingPrescriptions(pendingPrescriptions.filter(rx => rx.id !== prescription.id));

        // Clear the scanned prescription if this was from scanner
        if (scannedPrescription && scannedPrescription.id === prescription.id) {
            setScannedPrescription(null);
            setShowScanner(false);
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'dispensed':
                return <FaCheckCircle className="activity-icon dispensed" />;
            case 'received':
                return <FaClipboardList className="activity-icon received" />;
            case 'alert':
                return <FaExclamationTriangle className="activity-icon alert" />;
            case 'communication':
                return <FaSearch className="activity-icon communication" />;
            default:
                return <FaHistory className="activity-icon" />;
        }
    };

    const formatActivityTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    // Format date for localization based on language
    const getFormattedDate = () => {
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return new Date().toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', options);
    };

    return (
        <div className="pharmacy-dashboard">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('pharmacyPage.dashboard.loading')}</p>
                </div>
            ) : (
                <div className="dashboard-content">
                    <div className="welcome-section">
                        <div className="welcome-message">
                            <h2>{t('pharmacyPage.dashboard.welcomeMessage')}, <span className="highlight">Yara</span></h2>
                            <p>{t('pharmacyPage.dashboard.todayIs')} {getFormattedDate()}</p>
                        </div>

                        <div className="quick-actions">
                            <button className="quick-action-btn primary" onClick={handleScanToggle}>
                                <FaQrcode />
                                <span>{t('pharmacyPage.dashboard.quickActions.scanPrescription')}</span>
                            </button>
                            <NavLink to="/pharmacy/pending-prescriptions" className="quick-action-btn secondary">
                                <FaClipboardList />
                                <span>{t('pharmacyPage.dashboard.quickActions.viewPending')} ({pendingPrescriptions.length})</span>
                            </NavLink>
                            <NavLink to="/pharmacy/dispensed-history" className="quick-action-btn secondary">
                                <FaHistory />
                                <span>{t('pharmacyPage.dashboard.quickActions.dispensedHistory')}</span>
                            </NavLink>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        {/* Overview Stats Section */}
                        <div className="stats-section">
                            <h3 className="section-title">{t('pharmacyPage.dashboard.todayOverview')}</h3>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon pending-icon">
                                        <FaClipboardList />
                                    </div>
                                    <div className="stat-content">
                                        <h4>{t('pharmacyPage.dashboard.stats.pendingPrescriptions')}</h4>
                                        <p className="stat-value">{overviewStats.newPrescriptions}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon dispensed-icon">
                                        <FaCheckCircle />
                                    </div>
                                    <div className="stat-content">
                                        <h4>{t('pharmacyPage.dashboard.stats.dispensedToday')}</h4>
                                        <p className="stat-value">{overviewStats.dispensedToday}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon patients-icon">
                                        <FaUserAlt />
                                    </div>
                                    <div className="stat-content">
                                        <h4>{t('pharmacyPage.dashboard.stats.patientsServed')}</h4>
                                        <p className="stat-value">{overviewStats.patientsServed}</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon meds-icon">
                                        <FaPills />
                                    </div>
                                    <div className="stat-content">
                                        <h4>{t('pharmacyPage.dashboard.stats.medicationsDispensed')}</h4>
                                        <p className="stat-value">{overviewStats.medicationsDispensed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="activity-section">
                            <div className="section-header">
                                <h3 className="section-title">{t('pharmacyPage.dashboard.recentActivity.title')}</h3>
                                <div className="header-actions">
                                    <button className="refresh-btn">
                                        <FaSyncAlt /> {t('pharmacyPage.dashboard.recentActivity.refresh')}
                                    </button>
                                </div>
                            </div>
                            <div className="activity-list">
                                {recentActivity.map(activity => (
                                    <div className="activity-item" key={activity.id}>
                                        <div className="activity-time">
                                            {formatActivityTime(activity.date)}
                                        </div>
                                        <div className="activity-icon-container">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="activity-details">
                                            <p className="activity-description">{activity.description}</p>
                                        </div>
                                        <button className="action-btn">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Prescriptions Section */}
                        <div className="pending-section">
                            <div className="section-header">
                                <h3 className="section-title">{t('pharmacyPage.dashboard.pendingPrescriptions.title')}</h3>
                                <NavLink to="/pharmacy/pending-prescriptions" className="view-all">
                                    {t('pharmacyPage.dashboard.pendingPrescriptions.viewAll')}
                                </NavLink>
                            </div>

                            <div className="pending-prescriptions">
                                {pendingPrescriptions.length === 0 ? (
                                    <div className="empty-state">
                                        <FaClipboardList className="empty-icon" />
                                        <p>{t('pharmacyPage.dashboard.pendingPrescriptions.empty')}</p>
                                    </div>
                                ) : (
                                    pendingPrescriptions.slice(0, 3).map(prescription => (
                                        <div className="prescription-card" key={prescription.id}>
                                            <div className={`priority-indicator ${prescription.priority.toLowerCase()}`}></div>
                                            <div className="prescription-header">
                                                <div className="prescription-id">
                                                    <h4>{prescription.id}</h4>
                                                    {prescription.priority === 'Urgent' && (
                                                        <span className="urgent-badge">
                                                            <FaExclamationTriangle /> {t('pharmacyPage.dashboard.pendingPrescriptions.priority.urgent')}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="prescription-date">{new Date(prescription.issueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                                            </div>

                                            <div className="prescription-details">
                                                <div className="detail-row">
                                                    <span className="detail-label">{t('pharmacyPage.dashboard.pendingPrescriptions.details.patient')}:</span>
                                                    <span className="detail-value">{prescription.patientName}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">{t('pharmacyPage.dashboard.pendingPrescriptions.details.doctor')}:</span>
                                                    <span className="detail-value">{prescription.doctorName}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">{t('pharmacyPage.dashboard.pendingPrescriptions.details.medications')}:</span>
                                                    <span className="detail-value">{prescription.medications.length} {t('pharmacyPage.dashboard.pendingPrescriptions.details.items')}</span>
                                                </div>
                                            </div>

                                            <div className="prescription-actions">
                                                <NavLink to={`/pharmacy/pending-prescriptions?id=${prescription.id}`} className="action-btn view-btn">
                                                    <FaEye /> {t('pharmacyPage.dashboard.pendingPrescriptions.actions.viewDetails')}
                                                </NavLink>
                                                <div className="action-group">
                                                    <button
                                                        className="action-btn approve-btn"
                                                        onClick={() => handleApprovePrescription(prescription)}
                                                    >
                                                        <FaCheckCircle /> {t('pharmacyPage.dashboard.pendingPrescriptions.actions.dispense')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Scanner Section */}
                        <div className="scanner-section">
                            <div className="section-header">
                                <h3 className="section-title">{t('pharmacyPage.dashboard.scanner.title')}</h3>
                            </div>
                            <div className="scanner-content">
                                {!showScanner ? (
                                    <div className="scanner-cta">
                                        <div className="scanner-icon">
                                            <FaQrcode />
                                        </div>
                                        <h4>{t('pharmacyPage.dashboard.scanner.cta.title')}</h4>
                                        <p>{t('pharmacyPage.dashboard.scanner.cta.description')}</p>
                                        <button className="scanner-btn" onClick={handleScanToggle}>
                                            {t('pharmacyPage.dashboard.scanner.cta.button')}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="scanner-active">
                                        {!scannedPrescription ? (
                                            <div className="scanner-processing">
                                                <div className="scanner-animation">
                                                    <FaQrcode className="scanner-pulse" />
                                                </div>
                                                <p>{t('pharmacyPage.dashboard.scanner.processing.message')}</p>
                                                <button className="cancel-btn" onClick={handleScanToggle}>
                                                    {t('pharmacyPage.dashboard.scanner.processing.cancel')}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="scanned-result">
                                                <div className="result-header">
                                                    <FaCheckCircle className="success-icon" />
                                                    <h4>{t('pharmacyPage.dashboard.scanner.result.found')}</h4>
                                                </div>

                                                <div className="result-details">
                                                    <div className="detail-row">
                                                        <span className="detail-label">{t('pharmacyPage.dashboard.scanner.result.details.id')}:</span>
                                                        <span className="detail-value">{scannedPrescription.id}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">{t('pharmacyPage.dashboard.scanner.result.details.patient')}:</span>
                                                        <span className="detail-value">{scannedPrescription.patientName}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">{t('pharmacyPage.dashboard.scanner.result.details.doctor')}:</span>
                                                        <span className="detail-value">{scannedPrescription.doctorName}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">{t('pharmacyPage.dashboard.scanner.result.details.date')}:</span>
                                                        <span className="detail-value">{new Date(scannedPrescription.issueDate).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                                                    </div>

                                                    <div className="medications-list">
                                                        <h5>{t('pharmacyPage.dashboard.scanner.result.details.medications')} ({scannedPrescription.medications.length})</h5>
                                                        {scannedPrescription.medications.map((med, index) => (
                                                            <div className="medication-item" key={index}>
                                                                <span className="med-name">{med.name} ({med.dosage})</span>
                                                                <span className="med-qty">{t('pharmacyPage.dashboard.scanner.result.details.qty')}: {med.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="result-actions">
                                                    <button
                                                        className="action-btn approve-btn"
                                                        onClick={() => handleApprovePrescription(scannedPrescription)}
                                                    >
                                                        <FaCheckCircle /> {t('pharmacyPage.dashboard.scanner.result.actions.dispense')}
                                                    </button>
                                                    <button
                                                        className="action-btn cancel-btn"
                                                        onClick={handleScanToggle}
                                                    >
                                                        {t('pharmacyPage.dashboard.scanner.result.actions.cancel')}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyDashboard;