import { useState, useEffect } from 'react';
import './PatientDashboard.scss';
import { FaPills, FaCalendarAlt, FaPhoneAlt, FaClinicMedical, FaUserMd, FaShieldAlt, FaCheckCircle, FaArrowRight, FaSearch, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyMedicationsAction } from '../../../redux/actions/patients/medicationsActions';
import { GetProfileAction } from '../../../redux/actions/patients/profileAction';
import { GetMyAppointmentsAction } from '../../../redux/actions/patients/appointmentsActions';
import { GetMyDoctorsAction } from '../../../redux/actions/patients/doctorsActions';

export const PatientDashboard = () => {
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const dispatch = useDispatch();

  // Get medications from Redux store
  const { myMedications, loading: medicationsLoading, hasLoadedOnce: medicationsLoaded } = useSelector(
    (state) => state.medications
  );

  // Get profile from Redux store
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  // Get appointments from Redux store
  const { myAppointments, loading: appointmentsLoading, hasLoadedOnce: appointmentsLoaded } = useSelector(
    (state) => state.appointments
  );

  // Get doctors from Redux store
  const { myDoctors, loading: doctorsLoading, hasLoadedOnce: doctorsLoaded } = useSelector(
    (state) => state.doctors
  );

  // Get active medications
  const activeMedications = myMedications.filter(med => med.status === 'active');

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

  // Get next appointment
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  // Get primary doctor
  const primaryDoctor = myDoctors.find(doctor => doctor.is_primary) || myDoctors[0];

  // Sample pharmacy data with separate fields for English and Arabic
  const [preferredPharmacies, setPreferredPharmacies] = useState([
    {
      id: 1,
      nameEn: "Main Street Pharmacy",
      nameAr: "صيدلية الشارع الرئيسي",
      addressEn: "123 Main St, Anytown, CA 12345",
      addressAr: "123 شارع الرئيسي، أي تاون، كاليفورنيا 12345",
      phone: "(555) 123-4567",
      hoursEn: "Mon-Fri: 8AM-8PM, Sat: 9AM-6PM, Sun: 10AM-4PM",
      hoursAr: "الإثنين-الجمعة: 8 ص-8 م، السبت: 9 ص-6 م، الأحد: 10 ص-4 م",
      distanceEn: "0.8 miles",
      distanceAr: "0.8 ميل",
      rating: 4.7,
      numRatings: 156,
      deliveryAvailable: true,
      isPrimary: true,
      lastVisited: "2025-04-01"
    },
    {
      id: 2,
      nameEn: "Central Pharmacy",
      nameAr: "الصيدلية المركزية",
      addressEn: "456 Center Ave, Anytown, CA 12345",
      addressAr: "456 شارع سنتر، أي تاون، كاليفورنيا 12345",
      phone: "(555) 987-6543",
      hoursEn: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM",
      hoursAr: "الإثنين-الجمعة: 9 ص-9 م، السبت-الأحد: 10 ص-6 م",
      distanceEn: "2.3 miles",
      distanceAr: "2.3 ميل",
      rating: 4.5,
      numRatings: 98,
      deliveryAvailable: true,
      isPrimary: false,
      lastVisited: "2025-03-15"
    }
  ]);

  // Sample data for recent activities with separate fields for English and Arabic
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "refill",
      date: "2025-04-05",
      descriptionEn: "Prescription #1094 filled at Main Street Pharmacy",
      descriptionAr: "تمت تعبئة الوصفة الطبية #1094 في صيدلية الشارع الرئيسي",
      icon: <FaPills />
    },
    {
      id: 2,
      type: "message",
      date: "2025-04-03",
      descriptionEn: "Message received from Dr. Smith about recent lab results",
      descriptionAr: "تم استلام رسالة من د. سميث بخصوص نتائج المختبر الأخيرة",
      icon: <FaPhoneAlt />
    }
  ]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  // Fetch medications on component mount
  useEffect(() => {
    if (!medicationsLoaded) {
      dispatch(GetMyMedicationsAction());
    }
  }, [dispatch, medicationsLoaded]);

  // Fetch profile on component mount
  useEffect(() => {
    // Only fetch profile if we don't have it yet
    if (!profile || Object.keys(profile).length === 0) {
      dispatch(GetProfileAction());
    }
  }, [dispatch, profile]);

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
    }, 800);
  }, []);

  // Get primary pharmacy
  const primaryPharmacy = preferredPharmacies.find(pharmacy => pharmacy.isPrimary);

  // Function to handle event click on mobile
  const toggleEventActions = (eventId) => {
    if (activeEvent === eventId) {
      setActiveEvent(null);
    } else {
      setActiveEvent(eventId);
    }
  };

  // Function to get current login time
  const getCurrentLoginTime = () => {
    const now = new Date();
    if (isArabic) {
      return now.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Format date based on language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isArabic) {
      // Arabic date format
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('ar-SA', options);
    } else {
      // English date format
      return date.toLocaleDateString();
    }
  };

  // Format appointment date for display
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    if (isArabic) {
      return {
        day: date.getDate(),
        month: date.toLocaleDateString('ar-SA', { month: 'short' })
      };
    } else {
      return {
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
      };
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

  // Helper function to get localized value
  const getLocalizedValue = (enValue, arValue) => {
    return isArabic ? arValue : enValue;
  };

  // Get first name or fallback to 'Patient'
  const userName = profile?.first_name || t('patientPage.dashboard.patient');

  // Get first 2 active medications for display
  const displayMedications = activeMedications.slice(0, 2);

  // Check if all data is loading
  const isDataLoading = medicationsLoading || profileLoading || appointmentsLoading || doctorsLoading;

  return (
    <div className="patient-dashboard">
      {!isLoaded || isDataLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>{t('patientPage.dashboard.loading')}</p>
        </div>
      ) : (
        <>
          {/* Main Dashboard Content */}
          <main className="main-content">
            <div className="welcome-section">
              <div className="welcome-message">
                <h2>{t('patientPage.dashboard.welcomeBack')}, <span className="user-name-highlight">{userName}</span></h2>
                <p className="last-login">
                  {t('patientPage.dashboard.lastLogin')}: {getCurrentLoginTime()}
                </p>
              </div>

              <div className="quick-actions">
                <button className="quick-action-btn primary">
                  <FaPills />
                  <span>{t('patientPage.dashboard.requestRefill')}</span>
                </button>
                <button className="quick-action-btn">
                  <FaCalendarAlt />
                  <span>{t('patientPage.dashboard.schedule')}</span>
                </button>
                <NavLink to='/patient/doctors' className="quick-action-btn">
                  <FaPhoneAlt />
                  <span>{t('patientPage.dashboard.message')}</span>
                </NavLink>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Health Summary Section */}
              <section className="dashboard-section health-summary-section">
                <h3 className="section-title">{t('patientPage.dashboard.healthOverview')}</h3>
                <div className="health-metrics">
                  <div className="health-metric-card">
                    <div className="metric-icon medication-icon">
                      <FaPills />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.activeMedications')}</h4>
                      <p className="metric-value">{activeMedications.length}</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon appointment-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.nextAppointment')}</h4>
                      <p className="metric-value">
                        {nextAppointment 
                          ? formatAppointmentDate(nextAppointment.date).day + " " + formatAppointmentDate(nextAppointment.date).month
                          : t('patientPage.dashboard.noUpcoming')
                        }
                      </p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon doctor-icon">
                      <FaUserMd />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.primaryDoctor')}</h4>
                      <p className="metric-value">
                        {primaryDoctor 
                          ? (isArabic 
                              ? (primaryDoctor.nameAr || `د. ${primaryDoctor.first_name} ${primaryDoctor.last_name}`)
                              : `Dr. ${primaryDoctor.first_name} ${primaryDoctor.last_name}`
                            )
                          : t('patientPage.dashboard.notAssigned')
                        }
                      </p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon security-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.accountSecurity')}</h4>
                      <p className="metric-value">{t('patientPage.dashboard.strong')}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medications Section */}
              <section className="dashboard-section medications-section">
                <div className="section-header">
                  <h3 className="section-title">{t('patientPage.dashboard.myMedications')}</h3>
                  <NavLink to='/patient/prescriptions' className="view-all">{t('patientPage.dashboard.viewAll')}</NavLink>
                </div>

                <div className="medications-list">
                  {displayMedications.length > 0 ? (
                    displayMedications.map(med => (
                      <div className="medication-card" key={med.id}>
                        <div className="medication-color-bar" style={{ backgroundColor: med.color }}></div>
                        <div className="medication-details">
                          <div className="medication-primary-info">
                            <h4 className="medication-name">
                              {getLocalizedValue(med.nameEn, med.nameAr) || med.medication_name}
                            </h4>
                            <span className="medication-dosage">{med.dosage}</span>
                          </div>
                          <div className="medication-secondary-info">
                            <div className="info-item">
                              <span className="info-label">{t('patientPage.dashboard.frequency')}:</span>
                              <span className="info-value">
                                {getLocalizedValue(med.frequencyEn, med.frequencyAr) || med.frequency}
                              </span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">{t('patientPage.dashboard.refills')}:</span>
                              <span className="info-value">{med.refillsRemaining || 0} {t('patientPage.dashboard.remaining')}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">{t('patientPage.dashboard.nextRefill')}:</span>
                              <span className="info-value">
                                {med.nextRefillDate ? formatDate(med.nextRefillDate) : t('patientPage.dashboard.notSet')}
                              </span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">{t('patientPage.dashboard.lastTaken')}:</span>
                              <span className="info-value">
                                {getLocalizedValue("Today, 8:00 AM", "اليوم، 8:00 صباحًا")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="medication-actions">
                          <button className="medication-action-btn primary">{t('patientPage.dashboard.requestRefill')}</button>
                          <button className="medication-action-btn secondary">{t('patientPage.dashboard.viewDetails')}</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-medications">
                      <p>{t('patientPage.dashboard.noActiveMedications')}</p>
                      <NavLink to='/patient/prescriptions' className="view-all-link">
                        {t('patientPage.dashboard.viewPrescriptions')}
                      </NavLink>
                    </div>
                  )}
                </div>
              </section>

              {/* Upcoming Appointments Section */}
              <section className="dashboard-section upcoming-section">
                <div className="section-header">
                  <h3 className="section-title">{t('patientPage.dashboard.upcomingEvents')}</h3>
                  <NavLink to='/patient/appointments' className="view-all">{t('patientPage.dashboard.viewAll')}</NavLink>
                </div>
                <div className="upcoming-events">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.slice(0, 2).map(appointment => {
                      const dateInfo = formatAppointmentDate(appointment.date);
                      return (
                        <div
                          className="upcoming-event"
                          key={appointment.id}
                          onClick={() => window.innerWidth < 576 && toggleEventActions(appointment.id)}
                        >
                          <div className="event-date">
                            <div className="date-day">{dateInfo.day}</div>
                            <div className="date-month">{dateInfo.month}</div>
                          </div>
                          <div className="event-details">
                            <h4 className="event-title">
                              {appointment.appointment_type || t('patientPage.dashboard.doctorAppointment')}
                            </h4>
                            <p className="event-description">
                              {appointment.doctor_name || 
                               (primaryDoctor && (isArabic 
                                 ? (primaryDoctor.nameAr || `د. ${primaryDoctor.first_name} ${primaryDoctor.last_name}`)
                                 : `Dr. ${primaryDoctor.first_name} ${primaryDoctor.last_name}`
                               )) ||
                               t('patientPage.dashboard.generalCheckup')
                              }
                            </p>
                            <div className="event-time">
                              <FaCalendarAlt className="time-icon" />
                              <span>{formatAppointmentTime(appointment.time)}</span>
                            </div>
                            {appointment.notes && (
                              <div className="event-notes">
                                <span className="notes-label">{t('patientPage.dashboard.notes')}:</span>
                                <span className="notes-text">{appointment.notes}</span>
                              </div>
                            )}
                          </div>
                          <div className="event-actions">
                            <button className="event-action-btn">
                              {t('patientPage.dashboard.reschedule')}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-events">
                      <p>{t('patientPage.dashboard.noUpcoming')}</p>
                      <NavLink to='/patient/appointments' className="view-all-link">
                        {t('patientPage.dashboard.scheduleAppointment')}
                      </NavLink>
                    </div>
                  )}
                </div>
              </section>

              {/* Pharmacy Section */}
              <section className="dashboard-section pharmacy-section">
                <div className="section-header">
                  <h3 className="section-title">{t('patientPage.dashboard.myPharmacy')}</h3>
                  <NavLink to='/patient/pharmacies' className="view-all">{t('patientPage.dashboard.viewAll')}</NavLink>
                </div>

                {primaryPharmacy && (
                  <div className="primary-pharmacy-card">
                    <div className="pharmacy-info">
                      <div className="pharmacy-icon">
                        <FaClinicMedical />
                      </div>
                      <div className="pharmacy-details">
                        <div className="pharmacy-primary-info">
                          <h4 className="pharmacy-name">
                            {getLocalizedValue(primaryPharmacy.nameEn, primaryPharmacy.nameAr)}
                          </h4>
                          <span className="primary-badge">{t('patientPage.dashboard.primary')}</span>
                        </div>
                        <p className="pharmacy-address">
                          {getLocalizedValue(primaryPharmacy.addressEn, primaryPharmacy.addressAr)}
                        </p>
                        <div className="pharmacy-meta">
                          <span className="pharmacy-distance">
                            {getLocalizedValue(primaryPharmacy.distanceEn, primaryPharmacy.distanceAr)}
                          </span>
                          <span className="pharmacy-rating">★ {primaryPharmacy.rating} ({primaryPharmacy.numRatings} {t('patientPage.dashboard.reviews')})</span>
                        </div>
                        <div className="pharmacy-delivery">
                          {primaryPharmacy.deliveryAvailable && (
                            <span className="delivery-badge">
                              <FaCheckCircle className="delivery-icon" />
                              {t('patientPage.dashboard.deliveryAvailable')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pharmacy-actions">
                      <button className="pharmacy-action-btn primary">
                        <FaPhoneAlt className="btn-icon" />
                        <span>{t('patientPage.dashboard.call')}</span>
                      </button>
                      <button className="pharmacy-action-btn secondary">
                        <FaSearch className="btn-icon" />
                        <span>{t('patientPage.dashboard.directions')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* Recent Activity Section */}
              <section className="dashboard-section activity-section">
                <div className="section-header">
                  <h3 className="section-title">{t('patientPage.dashboard.recentActivity')}</h3>
                  <button className="view-all">{t('patientPage.dashboard.viewAll')}</button>
                </div>

                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div className="activity-item" key={activity.id}>
                      <div className="activity-icon">
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <p className="activity-description">
                          {getLocalizedValue(activity.descriptionEn, activity.descriptionAr)}
                        </p>
                        <span className="activity-date">{formatDate(activity.date)}</span>
                      </div>
                      <div className="activity-action">
                        <button className="action-arrow">
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default PatientDashboard;