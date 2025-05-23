import React, { useState, useEffect } from 'react';
import './DoctorDashboard.scss';
import {
    FaUserMd,
    FaPills,
    FaCalendarAlt,
    FaExclamationCircle,
    FaFileAlt,
    FaUserInjured,
    FaPlusCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaArrowRight,
    FaBell
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext'; // Import language context

export const DoctorDashboard = () => {
    // Get language context
    const { t, language } = useLanguage();
    
    // Create a helper function to make the translation paths easier to work with
    const tDashboard = (key) => t(`doctorPage.dashboard.doctorDashboard.${key}`);

    // Sample data - in a real app, this would come from your API/backend
    const [stats, setStats] = useState({
        activePatients: 87,
        prescriptionsThisWeek: 42,
        pendingReviews: 6,
        urgentCases: 2
    });

    const [recentActivity, setRecentActivity] = useState([
        {
            id: 1,
            type: 'prescription',
            date: '2025-04-10',
            description: 'Prescribed Lisinopril for Ahmed Hassan',
            patient: 'Ahmed Hassan',
            patientId: 'PT-1234',
            status: 'Pending',
            icon: <FaPills />
        },
        {
            id: 2,
            type: 'message',
            date: '2025-04-09',
            description: 'Message received from Layla Abbas about side effects',
            patient: 'Layla Abbas',
            patientId: 'PT-5678',
            status: 'Unread',
            icon: <FaEnvelope />
        },
        {
            id: 3,
            type: 'review',
            date: '2025-04-09',
            description: 'Lab results uploaded for Omar Farouq',
            patient: 'Omar Farouq',
            patientId: 'PT-9012',
            status: 'Pending Review',
            icon: <FaFileAlt />
        }
    ]);

    const [pendingPrescriptions, setPendingPrescriptions] = useState([
        {
            id: 1,
            patient: 'Fatima Khalid',
            patientId: 'PT-3456',
            medication: 'Metformin 500mg',
            requestDate: '2025-04-11',
            notes: 'Patient requested refill',
            urgency: 'Normal'
        },
        {
            id: 2,
            patient: 'Kareem Saleh',
            patientId: 'PT-7890',
            medication: 'Atorvastatin 20mg',
            requestDate: '2025-04-10',
            notes: 'Follow-up from last appointment',
            urgency: 'High'
        }
    ]);

    const [upcomingAppointments, setUpcomingAppointments] = useState([
        {
            id: 1,
            patient: 'Rania Nassar',
            patientId: 'PT-2468',
            date: '2025-04-12',
            time: '09:30 AM',
            type: 'Follow-up',
            notes: 'Diabetes management review'
        },
        {
            id: 2,
            patient: 'Sameer Osman',
            patientId: 'PT-1357',
            date: '2025-04-12',
            time: '11:00 AM',
            type: 'New Patient',
            notes: 'Initial consultation'
        },
        {
            id: 3,
            patient: 'Nadia Ibrahim',
            patientId: 'PT-9753',
            date: '2025-04-13',
            time: '10:15 AM',
            type: 'Follow-up',
            notes: 'Blood pressure check'
        }
    ]);

    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Helper function to get translated appointment type
    const getAppointmentTypeTranslation = (type) => {
        if (type === 'Follow-up') return tDashboard('appointmentTypes.followUp');
        if (type === 'New Patient') return tDashboard('appointmentTypes.newPatient');
        return type;
    };

    // Helper function to get translated status
    const getStatusTranslation = (status) => {
        if (status === 'Pending') return tDashboard('statuses.pending');
        if (status === 'Unread') return tDashboard('statuses.unread');
        if (status === 'Pending Review') return tDashboard('statuses.pendingReview');
        return status;
    };

    return (
        <div className="doctor-dashboard">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{tDashboard('loading')}</p>
                </div>
            ) : (
                <>
                    {/* Main Dashboard Content */}
                    <main className="main-content">
                        <div className="welcome-section">
                            <div className="welcome-message">
                                <h2>{tDashboard('welcome')}, <span className="doctor-name-highlight">Dr. Mahmoud</span></h2>
                                <p className="last-login">{tDashboard('lastLogin')}: April 10, 2025 {tDashboard('at')} 8:45 AM</p>
                            </div>

                            <div className="quick-actions">
                                <NavLink to='/doctor/write-prescription' className="quick-action-btn primary">
                                    <FaPlusCircle />
                                    <span>{tDashboard('quickActions.newPrescription')}</span>
                                </NavLink>
                                <NavLink to='/doctor/patients' className="quick-action-btn">
                                    <FaUserInjured />
                                    <span>{tDashboard('quickActions.viewPatients')}</span>
                                </NavLink>
                                <NavLink to='/doctor/communication' className="quick-action-btn">
                                    <FaPhoneAlt />
                                    <span>{tDashboard('quickActions.messages')}</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="dashboard-grid">
                            {/* Stats Summary Section */}
                            <section className="dashboard-section stats-summary-section">
                                <h3 className="section-title">{tDashboard('sections.quickOverview')}</h3>
                                <div className="stats-metrics">
                                    <div className="stats-metric-card">
                                        <div className="metric-icon patients-icon">
                                            <FaUserMd />
                                        </div>
                                        <div className="metric-info">
                                            <h4>{tDashboard('metrics.activePatients')}</h4>
                                            <p className="metric-value">{stats.activePatients}</p>
                                        </div>
                                    </div>

                                    <div className="stats-metric-card">
                                        <div className="metric-icon prescriptions-icon">
                                            <FaPills />
                                        </div>
                                        <div className="metric-info">
                                            <h4>{tDashboard('metrics.prescriptionsThisWeek')}</h4>
                                            <p className="metric-value">{stats.prescriptionsThisWeek}</p>
                                        </div>
                                    </div>

                                    <div className="stats-metric-card clickable" onClick={() => window.location.href = '/doctor/prescription-history'}>
                                        <div className="metric-icon reviews-icon">
                                            <FaFileAlt />
                                        </div>
                                        <div className="metric-info">
                                            <h4>{tDashboard('metrics.pendingReviews')}</h4>
                                            <p className="metric-value">{stats.pendingReviews}</p>
                                        </div>
                                    </div>

                                    <div className="stats-metric-card urgent clickable" onClick={() => window.location.href = '/doctor/patients'}>
                                        <div className="metric-icon urgent-icon">
                                            <FaExclamationCircle />
                                        </div>
                                        <div className="metric-info">
                                            <h4>{tDashboard('metrics.urgentCases')}</h4>
                                            <p className="metric-value">{stats.urgentCases}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Pending Prescriptions Section */}
                            <section className="dashboard-section pending-prescriptions-section">
                                <div className="section-header">
                                    <h3 className="section-title">{tDashboard('sections.pendingPrescriptions')}</h3>
                                    <NavLink to='/doctor/prescription-history' className="view-all">{tDashboard('actions.viewAll')}</NavLink>
                                </div>

                                <div className="pending-prescriptions-list">
                                    {pendingPrescriptions.map(prescription => (
                                        <div className={`pending-prescription-card ${prescription.urgency.toLowerCase()}`} key={prescription.id}>
                                            <div className="prescription-header">
                                                <div className="patient-info">
                                                    <h4 className="patient-name">{prescription.patient}</h4>
                                                    <span className="patient-id">{prescription.patientId}</span>
                                                </div>
                                                {prescription.urgency === 'High' && (
                                                    <span className="urgency-badge">
                                                        <FaExclamationCircle /> {tDashboard('actions.highPriority')}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="prescription-details">
                                                <div className="medication-info">
                                                    <span className="medication-name">{prescription.medication}</span>
                                                    <span className="request-date">Requested: {new Date(prescription.requestDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                                                </div>
                                                <p className="prescription-notes">{prescription.notes}</p>
                                            </div>
                                            <div className="prescription-actions">
                                                <NavLink to={`/doctor/write-prescription?patientId=${prescription.patientId}`} className="action-btn primary">
                                                    {tDashboard('actions.issuePrescription')}
                                                </NavLink>
                                                <NavLink to={`/doctor/medical-records/${prescription.patientId}`} className="action-btn secondary">
                                                    {tDashboard('actions.viewRecords')}
                                                </NavLink>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Upcoming Appointments Section */}
                            <section className="dashboard-section appointments-section">
                                <div className="section-header">
                                    <h3 className="section-title">{tDashboard('sections.upcomingAppointments')}</h3>
                                    <button className="view-all">{tDashboard('actions.viewCalendar')}</button>
                                </div>

                                <div className="appointments-list">
                                    {upcomingAppointments.map(appointment => (
                                        <div className="appointment-card" key={appointment.id}>
                                            <div className="appointment-date">
                                                <div className="date-day">{new Date(appointment.date).getDate()}</div>
                                                <div className="date-month">{new Date(appointment.date).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short' }).toUpperCase()}</div>
                                            </div>
                                            <div className="appointment-details">
                                                <h4 className="patient-name">{appointment.patient}</h4>
                                                <div className="appointment-meta">
                                                    <span className="appointment-time">
                                                        <FaCalendarAlt /> {appointment.time}
                                                    </span>
                                                    <span className={`appointment-type ${appointment.type.toLowerCase().replace(/\s+/g, '-')}`}>
                                                        {getAppointmentTypeTranslation(appointment.type)}
                                                    </span>
                                                </div>
                                                <p className="appointment-notes">{appointment.notes}</p>
                                            </div>
                                            <div className="appointment-actions">
                                                <NavLink to={`/doctor/medical-records/${appointment.patientId}`} className="action-btn">
                                                    {tDashboard('actions.viewRecords')}
                                                </NavLink>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Recent Activity Section */}
                            <section className="dashboard-section activity-section">
                                <div className="section-header">
                                    <h3 className="section-title">{tDashboard('sections.recentActivity')}</h3>
                                    <button className="view-all">{tDashboard('actions.viewAll')}</button>
                                </div>

                                <div className="activity-list">
                                    {recentActivity.map(activity => (
                                        <div className="activity-item" key={activity.id}>
                                            <div className="activity-icon">
                                                {activity.icon}
                                            </div>
                                            <div className="activity-content">
                                                <p className="activity-description">{activity.description}</p>
                                                <div className="activity-meta">
                                                    <span className="activity-date">{new Date(activity.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                                                    {activity.status && (
                                                        <span className={`activity-status ${activity.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                            {getStatusTranslation(activity.status)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="activity-action">
                                                <NavLink to={
                                                    activity.type === 'prescription'
                                                        ? `/doctor/prescription-history`
                                                        : activity.type === 'message'
                                                            ? `/doctor/communication`
                                                            : `/doctor/medical-records/${activity.patientId}`
                                                } className="action-arrow">
                                                    <FaArrowRight />
                                                </NavLink>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Notifications Section */}
                            <section className="dashboard-section notifications-section">
                                <div className="section-header">
                                    <h3 className="section-title">
                                        <FaBell className="notification-icon" /> {tDashboard('sections.notifications')}
                                    </h3>
                                    <button className="view-all">{tDashboard('actions.settings')}</button>
                                </div>

                                <div className="notification-items">
                                    <div className="notification-card">
                                        <div className="notification-content">
                                            <h4>Prescription Update</h4>
                                            <p>3 patients have picked up their medications from the pharmacy today.</p>
                                        </div>
                                        <span className="notification-time">1 hour ago</span>
                                    </div>

                                    <div className="notification-card unread">
                                        <div className="notification-content">
                                            <h4>System Maintenance</h4>
                                            <p>The system will undergo maintenance on Sunday, April 14 from 02:00 - 04:00 AM.</p>
                                        </div>
                                        <span className="notification-time">3 hours ago</span>
                                    </div>

                                    <div className="notification-card">
                                        <div className="notification-content">
                                            <h4>New Guidelines Available</h4>
                                            <p>New hypertension treatment guidelines have been published. Click to view.</p>
                                        </div>
                                        <span className="notification-time">Yesterday</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default DoctorDashboard;