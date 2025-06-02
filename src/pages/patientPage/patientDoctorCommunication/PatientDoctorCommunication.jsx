import React, { useState, useEffect } from 'react';
import { FaUserMd, FaRegClock, FaClinicMedical, FaRegStar, FaRegCalendarAlt, FaPhoneAlt, FaVideo, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PatientDoctorCommunication.scss';
import { useLanguage } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyAppointmentsAction } from '../../../redux/actions/patients/appointmentsActions';
import { GetMyDoctorsAction } from '../../../redux/actions/patients/doctorsActions';

const PatientDoctorCommunication = () => {
    const { language, t } = useLanguage();
    const isArabic = language === 'ar';
    const dispatch = useDispatch();

    // Get appointments from Redux store
    const { myAppointments, loading: appointmentsLoading, hasLoadedOnce: appointmentsLoaded } = useSelector(
        (state) => state.appointments
    );

    // Get doctors from Redux store
    const { myDoctors, loading: doctorsLoading, hasLoadedOnce: doctorsLoaded } = useSelector(
        (state) => state.doctors
    );

    // Helper function to get localized value
    const getLocalizedValue = (enValue, arValue) => {
        return isArabic ? arValue : enValue;
    };

    // Get upcoming appointments (future appointments sorted by date)
    const upcomingAppointments = myAppointments
        .filter(appointment => {
            const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
            return appointmentDateTime > new Date();
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });

    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState("appointments");
    const [isMobile, setIsMobile] = useState(false);

    // Check if window is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Listen for resize events
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch appointments on component mount
    useEffect(() => {
        if (!appointmentsLoaded) {
            dispatch(GetMyAppointmentsAction());
        }
    }, [dispatch, appointmentsLoaded]);

    // Fetch doctors on component mount
    useEffect(() => {
        if (!doctorsLoaded) {
            dispatch(GetMyDoctorsAction());
        }
    }, [dispatch, doctorsLoaded]);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    // Format date to display in readable format based on current language
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isArabic) {
            // Arabic date format
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('ar-SA', options);
        } else {
            // English date format
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }
    };

    // Format appointment time
    const formatAppointmentTime = (timeString) => {
        // Handle time in HH:MM:SS or HH:MM format
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0);
        
        if (isArabic) {
            return date.toLocaleTimeString('ar-SA', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        } else {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    // Check if data is loading
    const isDataLoading = appointmentsLoading || doctorsLoading;

    return (
        <div className="doctor-communication-container">
            {!isLoaded || isDataLoading ? (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>{t('patientPage.doctors.loading')}</p>
                </div>
            ) : (
                <>
                    <motion.div
                        className="section-header"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="header-content">
                            <h1>{t('patientPage.doctors.title')}</h1>
                            <p className="subtitle">{t('patientPage.doctors.subtitle')}</p>
                        </div>
                        <div className="secure-badge">
                            <FaLock className="lock-icon" />
                            <span>{t('patientPage.doctors.encrypted')}</span>
                        </div>
                    </motion.div>

                    <div className="communication-tabs">
                        <button
                            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appointments')}
                        >
                            <FaRegCalendarAlt className="tab-icon" />
                            {isMobile ? t('patientPage.doctors.apptsShort') : t('patientPage.doctors.appointments')}
                            {upcomingAppointments.length > 0 && (
                                <span className="badge">{upcomingAppointments.length}</span>
                            )}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'providers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('providers')}
                        >
                            <FaUserMd className="tab-icon" />
                            {isMobile ? t('patientPage.doctors.providersShort') : t('patientPage.doctors.myProviders')}
                        </button>
                    </div>

                    {activeTab === 'appointments' && (
                        <motion.div
                            className="appointments-section"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="appointments-toolbar">
                                <h2>{t('patientPage.doctors.upcomingAppointments')}</h2>
                                <button className="schedule-btn">
                                    <FaRegCalendarAlt className="btn-icon" />
                                    {isMobile ? t('patientPage.doctors.scheduleShort') : t('patientPage.doctors.scheduleNew')}
                                </button>
                            </div>

                            <div className="appointments-list">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.map((appointment) => (
                                        <motion.div
                                            key={appointment.id}
                                            className="appointment-card"
                                            variants={itemVariants}
                                        >
                                            <div className="appointment-date">
                                                <div className="calendar">
                                                    <span className="month">
                                                        {isArabic
                                                            ? new Date(appointment.date).toLocaleString('ar-SA', { month: 'short' })
                                                            : new Date(appointment.date).toLocaleString('default', { month: 'short' })}
                                                    </span>
                                                    <span className="day">{new Date(appointment.date).getDate()}</span>
                                                </div>
                                                <span className="time">{formatAppointmentTime(appointment.time)}</span>
                                            </div>

                                            <div className="appointment-details">
                                                <h3>{appointment.doctor_name}</h3>
                                                <p className="specialty">{appointment.specialty || t('patientPage.doctors.generalPractitioner')}</p>
                                                <div className="appointment-type">
                                                    <span className="in-person-badge">
                                                        <FaClinicMedical /> {t('patientPage.doctors.inPerson')}
                                                    </span>
                                                </div>
                                                {appointment.notes && (
                                                    <p className="appointment-notes">
                                                        <strong>{t('patientPage.doctors.notes')}:</strong> {appointment.notes}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="appointment-actions">
                                                <button className="action-btn primary">
                                                    {t('patientPage.doctors.checkIn')}
                                                </button>
                                                <button className="action-btn secondary">{t('patientPage.doctors.reschedule')}</button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="no-appointments">
                                        <FaRegCalendarAlt className="empty-icon" />
                                        <h3>{t('patientPage.doctors.noAppointments')}</h3>
                                        <p>{t('patientPage.doctors.scheduleNextVisit')}</p>
                                        <button className="schedule-empty-btn">{t('patientPage.doctors.scheduleAppointment')}</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'providers' && (
                        <motion.div
                            className="providers-section"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="providers-toolbar">
                                <h2>{t('patientPage.doctors.myHealthcareProviders')}</h2>
                                <button className="add-provider-btn">
                                    <FaUserMd className="btn-icon" />
                                    {isMobile ? t('patientPage.doctors.addShort') : t('patientPage.doctors.addProvider')}
                                </button>
                            </div>

                            <div className="providers-list">
                                {myDoctors.length > 0 ? (
                                    myDoctors.map((doctor) => (
                                        <motion.div
                                            key={doctor.id}
                                            className="provider-card"
                                            variants={itemVariants}
                                        >
                                            <div className="provider-header">
                                                <div className="provider-avatar">
                                                    <img 
                                                        src={doctor.image || "/api/placeholder/64/64"} 
                                                        alt={`${doctor.first_name} ${doctor.last_name}`} 
                                                    />
                                                    <div className="status-indicator available"></div>
                                                </div>
                                                <button 
                                                    className="favorite-btn" 
                                                    aria-label={doctor.is_primary ? t('patientPage.doctors.removeFromFavorites') : t('patientPage.doctors.addToFavorites')}
                                                >
                                                    <FaRegStar className={doctor.is_primary ? 'favorite' : ''} />
                                                </button>
                                            </div>

                                            <div className="provider-info">
                                                <h3>
                                                    {isArabic 
                                                        ? (doctor.nameAr || `د. ${doctor.first_name} ${doctor.last_name}`)
                                                        : `Dr. ${doctor.first_name} ${doctor.last_name}`
                                                    }
                                                </h3>
                                                <p className="specialty">{doctor.specialty || t('patientPage.doctors.generalPractitioner')}</p>
                                                <p className="status">{t('patientPage.doctors.available')}</p>
                                                <p className="response-time">
                                                    <FaRegClock className="time-icon" />
                                                    {doctor.phone ? doctor.phone : t('patientPage.doctors.contactInfo')}
                                                </p>
                                                {doctor.is_primary && (
                                                    <div className="primary-badge">
                                                        <span>{t('patientPage.doctors.primaryDoctor')}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="provider-actions">
                                                <button className="action-btn call">
                                                    <FaPhoneAlt /> {t('patientPage.doctors.callOffice')}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="no-providers">
                                        <FaUserMd className="empty-icon" />
                                        <h3>{t('patientPage.doctors.noProviders')}</h3>
                                        <p>{t('patientPage.doctors.addFirstProvider')}</p>
                                        <button className="add-provider-empty-btn">{t('patientPage.doctors.addProvider')}</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default PatientDoctorCommunication;