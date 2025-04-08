import React, { useState, useEffect } from 'react';
import './PatientDashboard.scss';
import {
  FaPills,
  FaCalendarAlt,
  FaPhoneAlt,
  FaClinicMedical,
  FaUserMd,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSearch
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const PatientDashboard = () => {
  // Sample data - in a real app, this would come from your API/backend
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      refillsRemaining: 2,
      nextRefillDate: "2025-04-15",
      doctor: "Dr. Smith",
      color: "#4B9CD3",
      lastTaken: "Today, 8:00 AM"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refillsRemaining: 3,
      nextRefillDate: "2025-04-20",
      doctor: "Dr. Johnson",
      color: "#2AAC8A",
      lastTaken: "Today, 7:30 AM"
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "refill",
      date: "2025-04-05",
      description: "Prescription #1094 filled at Main Street Pharmacy",
      icon: <FaPills />
    },
    {
      id: 2,
      type: "message",
      date: "2025-04-03",
      description: "Message received from Dr. Smith about recent lab results",
      icon: <FaPhoneAlt />
    }
  ]);

  // Sample pharmacy data
  const [preferredPharmacies, setPreferredPharmacies] = useState([
    {
      id: 1,
      name: "Main Street Pharmacy",
      address: "123 Main St, Anytown, CA 12345",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-6PM, Sun: 10AM-4PM",
      distance: "0.8 miles",
      rating: 4.7,
      numRatings: 156,
      deliveryAvailable: true,
      isPrimary: true,
      lastVisited: "2025-04-01"
    },
    {
      id: 2,
      name: "Central Pharmacy",
      address: "456 Center Ave, Anytown, CA 12345",
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM",
      distance: "2.3 miles",
      rating: 4.5,
      numRatings: 98,
      deliveryAvailable: true,
      isPrimary: false,
      lastVisited: "2025-03-15"
    }
  ]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);


  // Get primary pharmacy
  const primaryPharmacy = preferredPharmacies.find(pharmacy => pharmacy.isPrimary);


  return (
    <div className="patient-dashboard">
      {!isLoaded ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your dashboard...</p>
        </div>
      ) : (
        <>
          {/* Main Dashboard Content */}
          <main className="main-content">
            <div className="welcome-section">
              <div className="welcome-message">
                <h2>Welcome back, <span className="user-name-highlight">Yaman</span></h2>
                <p className="last-login">Last login: April 7, 2025 at 9:30 AM</p>
              </div>

              <div className="quick-actions">
                <button className="quick-action-btn primary">
                  <FaPills />
                  <span>Request Refill</span>
                </button>
                <button className="quick-action-btn">
                  <FaCalendarAlt />
                  <span>Schedule Appointment</span>
                </button>
                <NavLink to='/patient/doctors' className="quick-action-btn">
                  <FaPhoneAlt />
                  <span>Message Doctor</span>
                </NavLink>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Health Summary Section */}
              <section className="dashboard-section health-summary-section">
                <h3 className="section-title">Health Overview</h3>
                <div className="health-metrics">
                  <div className="health-metric-card">
                    <div className="metric-icon medication-icon">
                      <FaPills />
                    </div>
                    <div className="metric-info">
                      <h4>Active Medications</h4>
                      <p className="metric-value">2</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon appointment-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="metric-info">
                      <h4>Next Appointment</h4>
                      <p className="metric-value">Apr 22</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon doctor-icon">
                      <FaUserMd />
                    </div>
                    <div className="metric-info">
                      <h4>Primary Doctor</h4>
                      <p className="metric-value">Dr. Smith</p>
                    </div>
                  </div>

                  <div className="health-metric-card">
                    <div className="metric-icon security-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="metric-info">
                      <h4>Account Security</h4>
                      <p className="metric-value">Strong</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medications Section */}
              <section className="dashboard-section medications-section">
                <div className="section-header">
                  <h3 className="section-title">My Medications</h3>
                  <NavLink to='/patient/prescriptions' className="view-all">View All</NavLink>
                </div>

                <div className="medications-list">
                  {prescriptions.map(med => (
                    <div className="medication-card" key={med.id}>
                      <div className="medication-color-bar" style={{ backgroundColor: med.color }}></div>
                      <div className="medication-details">
                        <div className="medication-primary-info">
                          <h4 className="medication-name">{med.name}</h4>
                          <span className="medication-dosage">{med.dosage}</span>
                        </div>
                        <div className="medication-secondary-info">
                          <div className="info-item">
                            <span className="info-label">Frequency:</span>
                            <span className="info-value">{med.frequency}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Refills:</span>
                            <span className="info-value">{med.refillsRemaining} remaining</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Next refill:</span>
                            <span className="info-value">{new Date(med.nextRefillDate).toLocaleDateString()}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Last taken:</span>
                            <span className="info-value">{med.lastTaken}</span>
                          </div>
                        </div>
                      </div>
                      <div className="medication-actions">
                        <button className="medication-action-btn primary">Request Refill</button>
                        <button className="medication-action-btn secondary">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Events Section */}
              <section className="dashboard-section upcoming-section">
                <h3 className="section-title">Upcoming Events</h3>
                <div className="upcoming-events">
                  <div className="upcoming-event">
                    <div className="event-date">
                      <div className="date-day">15</div>
                      <div className="date-month">APR</div>
                    </div>
                    <div className="event-details">
                      <h4 className="event-title">Prescription Refill</h4>
                      <p className="event-description">Amoxicillin 500mg</p>
                      <div className="event-time">
                        <FaCalendarAlt className="time-icon" />
                        <span>Automatic refill scheduled</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <button className="event-action-btn">Modify</button>
                    </div>
                  </div>

                  <div className="upcoming-event">
                    <div className="event-date">
                      <div className="date-day">22</div>
                      <div className="date-month">APR</div>
                    </div>
                    <div className="event-details">
                      <h4 className="event-title">Doctor Appointment</h4>
                      <p className="event-description">Annual checkup with Dr. Smith</p>
                      <div className="event-time">
                        <FaCalendarAlt className="time-icon" />
                        <span>2:30 PM - 3:30 PM</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <button className="event-action-btn">Reschedule</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pharmacy Section */}
              <section className="dashboard-section pharmacy-section">
                <div className="section-header">
                  <h3 className="section-title">My Pharmacy</h3>
                  <NavLink to='/patient/pharmacies' className="view-all">View All</NavLink>
                </div>

                {primaryPharmacy && (
                  <div className="primary-pharmacy-card">
                    <div className="pharmacy-info">
                      <div className="pharmacy-icon">
                        <FaClinicMedical />
                      </div>
                      <div className="pharmacy-details">
                        <div className="pharmacy-primary-info">
                          <h4 className="pharmacy-name">{primaryPharmacy.name}</h4>
                          <span className="primary-badge">Primary</span>
                        </div>
                        <p className="pharmacy-address">{primaryPharmacy.address}</p>
                        <div className="pharmacy-meta">
                          <span className="pharmacy-distance">{primaryPharmacy.distance}</span>
                          <span className="pharmacy-rating">★ {primaryPharmacy.rating} ({primaryPharmacy.numRatings} reviews)</span>
                        </div>
                        <div className="pharmacy-delivery">
                          {primaryPharmacy.deliveryAvailable && (
                            <span className="delivery-badge">
                              <FaCheckCircle className="delivery-icon" />
                              Delivery Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pharmacy-actions">
                      <button className="pharmacy-action-btn primary">
                        <FaPhoneAlt className="btn-icon" />
                        <span>Call</span>
                      </button>
                      <button className="pharmacy-action-btn secondary">
                        <FaSearch className="btn-icon" />
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* Recent Activity Section */}
              <section className="dashboard-section activity-section">
                <div className="section-header">
                  <h3 className="section-title">Recent Activity</h3>
                  <button className="view-all">View All</button>
                </div>

                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div className="activity-item" key={activity.id}>
                      <div className="activity-icon">
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <p className="activity-description">{activity.description}</p>
                        <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
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