import React, { useState, useEffect } from 'react';
import './PatientDashboard.scss';
import { FaPills, FaCalendarAlt, FaPhoneAlt, FaClinicMedical, FaUserMd, FaShieldAlt, FaCheckCircle, FaArrowRight, FaSearch, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext'; // Import language context

export const PatientDashboard = () => {
  const { language, t } = useLanguage(); // Get language and translation function
  const isArabic = language === 'ar';

  // Sample data with separate fields for English and Arabic
  // In a real app, this would come from your API/backend
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      nameEn: "Amoxicillin",
      nameAr: "أموكسيسيلين",
      dosage: "500mg",
      frequencyEn: "3 times daily",
      frequencyAr: "3 مرات يوميًا",
      refillsRemaining: 2,
      nextRefillDate: "2025-04-15",
      doctorEn: "Dr. Smith",
      doctorAr: "د. سميث",
      color: "#4B9CD3",
      lastTakenEn: "Today, 8:00 AM",
      lastTakenAr: "اليوم، 8:00 صباحًا"
    },
    {
      id: 2,
      nameEn: "Lisinopril",
      nameAr: "ليسينوبريل",
      dosage: "10mg",
      frequencyEn: "Once daily",
      frequencyAr: "مرة واحدة يوميًا",
      refillsRemaining: 3,
      nextRefillDate: "2025-04-20",
      doctorEn: "Dr. Johnson",
      doctorAr: "د. جونسون",
      color: "#2AAC8A",
      lastTakenEn: "Today, 7:30 AM",
      lastTakenAr: "اليوم، 7:30 صباحًا"
    }
  ]);

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

  // Sample upcoming events with separate fields for English and Arabic
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      dateDay: 15,
      dateMonthEn: "APR",
      dateMonthAr: "أبريل",
      titleEn: "Prescription Refill",
      titleAr: "إعادة تعبئة الوصفة الطبية",
      descriptionEn: "Amoxicillin 500mg",
      descriptionAr: "أموكسيسيلين 500 ملغ",
      timeInfoEn: "Automatic refill scheduled",
      timeInfoAr: "تمت جدولة إعادة تعبئة تلقائية"
    },
    {
      id: 2,
      dateDay: 22,
      dateMonthEn: "APR",
      dateMonthAr: "أبريل",
      titleEn: "Doctor Appointment",
      titleAr: "موعد مع الطبيب",
      descriptionEn: "Annual checkup with Dr. Smith",
      descriptionAr: "فحص سنوي مع د. سميث",
      timeInfoEn: "2:30 PM - 3:30 PM",
      timeInfoAr: "2:30 مساءً - 3:30 مساءً"
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

  // Helper function to get localized value
  const getLocalizedValue = (enValue, arValue) => {
    return isArabic ? arValue : enValue;
  };

  return (
    <div className="patient-dashboard">
      {!isLoaded ? (
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
                <h2>{t('patientPage.dashboard.welcomeBack')}, <span className="user-name-highlight">Yaman</span></h2>
                <p className="last-login">
                  {t('patientPage.dashboard.lastLogin')}: {getLocalizedValue(
                    "April 7, 2025 at 9:30 AM",
                    "7 أبريل 2025 الساعة 9:30 صباحًا"
                  )}
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
                      <p className="metric-value">2</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon appointment-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.nextAppointment')}</h4>
                      <p className="metric-value">{getLocalizedValue("Apr 22", "22 أبريل")}</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon doctor-icon">
                      <FaUserMd />
                    </div>
                    <div className="metric-info">
                      <h4>{t('patientPage.dashboard.primaryDoctor')}</h4>
                      <p className="metric-value">{getLocalizedValue("Dr. Smith", "د. سميث")}</p>
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
                  {prescriptions.map(med => (
                    <div className="medication-card" key={med.id}>
                      <div className="medication-color-bar" style={{ backgroundColor: med.color }}></div>
                      <div className="medication-details">
                        <div className="medication-primary-info">
                          <h4 className="medication-name">
                            {getLocalizedValue(med.nameEn, med.nameAr)}
                          </h4>
                          <span className="medication-dosage">{med.dosage}</span>
                        </div>
                        <div className="medication-secondary-info">
                          <div className="info-item">
                            <span className="info-label">{t('patientPage.dashboard.frequency')}:</span>
                            <span className="info-value">
                              {getLocalizedValue(med.frequencyEn, med.frequencyAr)}
                            </span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">{t('patientPage.dashboard.refills')}:</span>
                            <span className="info-value">{med.refillsRemaining} {t('patientPage.dashboard.remaining')}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">{t('patientPage.dashboard.nextRefill')}:</span>
                            <span className="info-value">{formatDate(med.nextRefillDate)}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">{t('patientPage.dashboard.lastTaken')}:</span>
                            <span className="info-value">
                              {getLocalizedValue(med.lastTakenEn, med.lastTakenAr)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="medication-actions">
                        <button className="medication-action-btn primary">{t('patientPage.dashboard.requestRefill')}</button>
                        <button className="medication-action-btn secondary">{t('patientPage.dashboard.viewDetails')}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Events Section */}
              <section className="dashboard-section upcoming-section">
                <h3 className="section-title">{t('patientPage.dashboard.upcomingEvents')}</h3>
                <div className="upcoming-events">
                  {upcomingEvents.map(event => (
                    <div
                      className="upcoming-event"
                      key={event.id}
                      onClick={() => window.innerWidth < 576 && toggleEventActions(event.id)}
                    >
                      <div className="event-date">
                        <div className="date-day">{event.dateDay}</div>
                        <div className="date-month">
                          {getLocalizedValue(event.dateMonthEn, event.dateMonthAr)}
                        </div>
                      </div>
                      <div className="event-details">
                        <h4 className="event-title">
                          {getLocalizedValue(event.titleEn, event.titleAr)}
                        </h4>
                        <p className="event-description">
                          {getLocalizedValue(event.descriptionEn, event.descriptionAr)}
                        </p>
                        <div className="event-time">
                          <FaCalendarAlt className="time-icon" />
                          <span>{getLocalizedValue(event.timeInfoEn, event.timeInfoAr)}</span>
                        </div>
                      </div>
                      <div className="event-actions">
                        <button className="event-action-btn">
                          {event.id === 1 ? t('patientPage.dashboard.modify') : t('patientPage.dashboard.reschedule')}
                        </button>
                      </div>
                    </div>
                  ))}
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