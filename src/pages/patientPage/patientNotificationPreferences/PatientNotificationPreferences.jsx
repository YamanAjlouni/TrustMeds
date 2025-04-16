import React, { useState, useEffect } from 'react';
import './PatientNotificationPreferences.scss';
import {
  FaBell,
  FaSms,
  FaEnvelope,
  FaMobileAlt,
  FaPills,
  FaCalendarAlt,
  FaUserMd,
  FaCreditCard,
  FaLock,
  FaShieldAlt,
  FaInfoCircle,
  FaChevronRight,
  FaCheckCircle,
  FaCog
} from 'react-icons/fa';

export const PatientNotificationPreferences = () => {
  // Sample data - in a real app, this would come from your API/backend
  const [notificationPreferences, setNotificationPreferences] = useState({
    channels: {
      email: true,
      sms: true,
      push: true,
      inApp: true
    },
    preferences: {
      medicationReminders: {
        title: "Medication Reminders",
        description: "Daily reminders to take your medications on schedule",
        icon: <FaPills />,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        frequency: "scheduled",
        priority: "high"
      },
      refillReminders: {
        title: "Prescription Refill Alerts",
        description: "Notifications when medications are due for refill",
        icon: <FaPills />,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        frequency: "as_needed",
        priority: "high"
      },
      appointmentReminders: {
        title: "Appointment Reminders",
        description: "Notifications about upcoming doctor appointments",
        icon: <FaCalendarAlt />,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        frequency: "as_needed",
        priority: "medium"
      },
      doctorMessages: {
        title: "Doctor Messages",
        description: "Notifications when you receive a message from your healthcare provider",
        icon: <FaUserMd />,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        frequency: "immediate",
        priority: "high"
      },
      billingNotifications: {
        title: "Billing & Insurance Updates",
        description: "Notifications about payments, insurance changes, and billing updates",
        icon: <FaCreditCard />,
        email: true,
        sms: false,
        push: false,
        inApp: true,
        frequency: "as_needed",
        priority: "medium"
      },
      securityAlerts: {
        title: "Security Alerts",
        description: "Important notifications about the security of your account",
        icon: <FaLock />,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        frequency: "immediate",
        priority: "high"
      },
      accountUpdates: {
        title: "Account Updates",
        description: "Notifications about changes to your account settings",
        icon: <FaShieldAlt />,
        email: true,
        sms: false,
        push: true,
        inApp: true,
        frequency: "as_needed",
        priority: "low"
      }
    }
  });

  const [contactInfo, setContactInfo] = useState({
    email: {
      value: "yaman.ajlouni@example.com",
      verified: true,
      primary: true
    },
    phone: {
      value: "+1 (555) 123-4567",
      verified: true,
      primary: true
    },
    additionalEmails: [
      {
        value: "yaman.work@example.com",
        verified: false,
        primary: false
      }
    ],
    additionalPhones: []
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [activeSection, setActiveSection] = useState('all');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState({});

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

  const handleChannelToggle = (channel) => {
    setNotificationPreferences({
      ...notificationPreferences,
      channels: {
        ...notificationPreferences.channels,
        [channel]: !notificationPreferences.channels[channel]
      }
    });
  };

  const handlePreferenceToggle = (prefId, channel) => {
    setNotificationPreferences({
      ...notificationPreferences,
      preferences: {
        ...notificationPreferences.preferences,
        [prefId]: {
          ...notificationPreferences.preferences[prefId],
          [channel]: !notificationPreferences.preferences[prefId][channel]
        }
      }
    });
  };

  const handleEditContact = (type, index = null) => {
    if (type === 'email') {
      if (index === null) {
        setEditingContact({
          type: 'email',
          value: contactInfo.email.value,
          isPrimary: contactInfo.email.primary,
          isMain: true
        });
      } else {
        setEditingContact({
          type: 'email',
          value: contactInfo.additionalEmails[index].value,
          isPrimary: contactInfo.additionalEmails[index].primary,
          index: index,
          isMain: false
        });
      }
    } else if (type === 'phone') {
      if (index === null) {
        setEditingContact({
          type: 'phone',
          value: contactInfo.phone.value,
          isPrimary: contactInfo.phone.primary,
          isMain: true
        });
      } else {
        setEditingContact({
          type: 'phone',
          value: contactInfo.additionalPhones[index].value,
          isPrimary: contactInfo.additionalPhones[index].primary,
          index: index,
          isMain: false
        });
      }
    }
    setShowEditContactModal(true);
  };

  const handleSaveContact = () => {
    let updatedContactInfo = { ...contactInfo };

    if (editingContact.type === 'email') {
      if (editingContact.isMain) {
        updatedContactInfo.email.value = editingContact.value;
        updatedContactInfo.email.primary = editingContact.isPrimary;
        
        // If this is set as primary, update others
        if (editingContact.isPrimary) {
          updatedContactInfo.additionalEmails = updatedContactInfo.additionalEmails.map(email => ({
            ...email,
            primary: false
          }));
        }
      } else {
        updatedContactInfo.additionalEmails[editingContact.index].value = editingContact.value;
        updatedContactInfo.additionalEmails[editingContact.index].primary = editingContact.isPrimary;
        
        // If this is set as primary, update others
        if (editingContact.isPrimary) {
          updatedContactInfo.email.primary = false;
          updatedContactInfo.additionalEmails = updatedContactInfo.additionalEmails.map((email, idx) => ({
            ...email,
            primary: idx === editingContact.index
          }));
        }
      }
    } else if (editingContact.type === 'phone') {
      if (editingContact.isMain) {
        updatedContactInfo.phone.value = editingContact.value;
        updatedContactInfo.phone.primary = editingContact.isPrimary;
        
        // If this is set as primary, update others
        if (editingContact.isPrimary) {
          updatedContactInfo.additionalPhones = updatedContactInfo.additionalPhones.map(phone => ({
            ...phone,
            primary: false
          }));
        }
      } else {
        updatedContactInfo.additionalPhones[editingContact.index].value = editingContact.value;
        updatedContactInfo.additionalPhones[editingContact.index].primary = editingContact.isPrimary;
        
        // If this is set as primary, update others
        if (editingContact.isPrimary) {
          updatedContactInfo.phone.primary = false;
          updatedContactInfo.additionalPhones = updatedContactInfo.additionalPhones.map((phone, idx) => ({
            ...phone,
            primary: idx === editingContact.index
          }));
        }
      }
    }

    setContactInfo(updatedContactInfo);
    setShowEditContactModal(false);
  };

  const handleAddNewContact = (type) => {
    setEditingContact({
      type: type,
      value: '',
      isPrimary: false,
      isMain: false,
      isNew: true
    });
    setShowEditContactModal(true);
  };

  const handleSaveNewContact = () => {
    let updatedContactInfo = { ...contactInfo };

    if (editingContact.type === 'email') {
      updatedContactInfo.additionalEmails.push({
        value: editingContact.value,
        verified: false,
        primary: editingContact.isPrimary
      });
      
      // If this is set as primary, update others
      if (editingContact.isPrimary) {
        updatedContactInfo.email.primary = false;
        updatedContactInfo.additionalEmails = updatedContactInfo.additionalEmails.map((email, idx) => ({
          ...email,
          primary: idx === updatedContactInfo.additionalEmails.length - 1
        }));
      }
    } else if (editingContact.type === 'phone') {
      updatedContactInfo.additionalPhones.push({
        value: editingContact.value,
        verified: false,
        primary: editingContact.isPrimary
      });
      
      // If this is set as primary, update others
      if (editingContact.isPrimary) {
        updatedContactInfo.phone.primary = false;
        updatedContactInfo.additionalPhones = updatedContactInfo.additionalPhones.map((phone, idx) => ({
          ...phone,
          primary: idx === updatedContactInfo.additionalPhones.length - 1
        }));
      }
    }

    setContactInfo(updatedContactInfo);
    setShowEditContactModal(false);
  };

  const toggleAdvancedOptions = (prefId) => {
    setShowAdvancedOptions({
      ...showAdvancedOptions,
      [prefId]: !showAdvancedOptions[prefId]
    });
  };

  const handlePriorityChange = (prefId, priority) => {
    setNotificationPreferences({
      ...notificationPreferences,
      preferences: {
        ...notificationPreferences.preferences,
        [prefId]: {
          ...notificationPreferences.preferences[prefId],
          priority: priority
        }
      }
    });
  };

  const handleFrequencyChange = (prefId, frequency) => {
    setNotificationPreferences({
      ...notificationPreferences,
      preferences: {
        ...notificationPreferences.preferences,
        [prefId]: {
          ...notificationPreferences.preferences[prefId],
          frequency: frequency
        }
      }
    });
  };

  const filterPreferencesBySection = () => {
    if (activeSection === 'all') {
      return Object.entries(notificationPreferences.preferences);
    }
    
    return Object.entries(notificationPreferences.preferences).filter(([_, pref]) => {
      if (activeSection === 'medications') {
        return pref.title.toLowerCase().includes('medication') || pref.title.toLowerCase().includes('prescription');
      } else if (activeSection === 'appointments') {
        return pref.title.toLowerCase().includes('appointment');
      } else if (activeSection === 'security') {
        return pref.title.toLowerCase().includes('security') || pref.title.toLowerCase().includes('account');
      } else if (activeSection === 'billing') {
        return pref.title.toLowerCase().includes('billing');
      } else if (activeSection === 'messages') {
        return pref.title.toLowerCase().includes('message') || pref.title.toLowerCase().includes('doctor');
      }
      return false;
    });
  };

  const sections = [
    { id: 'all', name: 'All Notifications', icon: <FaBell /> },
    { id: 'medications', name: 'Medications', icon: <FaPills /> },
    { id: 'appointments', name: 'Appointments', icon: <FaCalendarAlt /> },
    { id: 'messages', name: 'Messages', icon: <FaEnvelope /> },
    { id: 'billing', name: 'Billing', icon: <FaCreditCard /> },
    { id: 'security', name: 'Security', icon: <FaShieldAlt /> }
  ];

  return (
    <div className="notification-preferences">
      {!isLoaded ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading notification preferences...</p>
        </div>
      ) : (
        <div className="notifications-container">
          <div className="notifications-header">
            <h2><FaBell /> Notification Preferences</h2>
            <p>Manage how and when you receive notifications from TrustMeds</p>
          </div>
          
          <div className="notifications-content">
            <div className="notifications-sidebar">
              <div className="contact-info-section">
                <h3>Contact Information</h3>
                <p className="section-desc">Notifications will be sent to these contacts</p>
                
                <div className="contact-list">
                  <div className="contact-category">
                    <h4>
                      <FaEnvelope className="category-icon" />
                      Email Addresses
                    </h4>
                    
                    <div className="contact-item">
                      <div className="contact-details">
                        <span className="contact-value">{contactInfo.email.value}</span>
                        <div className="contact-badges">
                          {contactInfo.email.verified && (
                            <span className="badge verified">
                              <FaCheckCircle /> Verified
                            </span>
                          )}
                          {contactInfo.email.primary && (
                            <span className="badge primary">Primary</span>
                          )}
                        </div>
                      </div>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditContact('email')}
                      >
                        Edit
                      </button>
                    </div>
                    
                    {contactInfo.additionalEmails.map((email, index) => (
                      <div className="contact-item" key={`email-${index}`}>
                        <div className="contact-details">
                          <span className="contact-value">{email.value}</span>
                          <div className="contact-badges">
                            {email.verified ? (
                              <span className="badge verified">
                                <FaCheckCircle /> Verified
                              </span>
                            ) : (
                              <span className="badge unverified">
                                Unverified
                              </span>
                            )}
                            {email.primary && (
                              <span className="badge primary">Primary</span>
                            )}
                          </div>
                        </div>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditContact('email', index)}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      className="add-contact-btn"
                      onClick={() => handleAddNewContact('email')}
                    >
                      + Add Email Address
                    </button>
                  </div>
                  
                  <div className="contact-category">
                    <h4>
                      <FaMobileAlt className="category-icon" />
                      Phone Numbers
                    </h4>
                    
                    <div className="contact-item">
                      <div className="contact-details">
                        <span className="contact-value">{contactInfo.phone.value}</span>
                        <div className="contact-badges">
                          {contactInfo.phone.verified && (
                            <span className="badge verified">
                              <FaCheckCircle /> Verified
                            </span>
                          )}
                          {contactInfo.phone.primary && (
                            <span className="badge primary">Primary</span>
                          )}
                        </div>
                      </div>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditContact('phone')}
                      >
                        Edit
                      </button>
                    </div>
                    
                    {contactInfo.additionalPhones.map((phone, index) => (
                      <div className="contact-item" key={`phone-${index}`}>
                        <div className="contact-details">
                          <span className="contact-value">{phone.value}</span>
                          <div className="contact-badges">
                            {phone.verified ? (
                              <span className="badge verified">
                                <FaCheckCircle /> Verified
                              </span>
                            ) : (
                              <span className="badge unverified">
                                Unverified
                              </span>
                            )}
                            {phone.primary && (
                              <span className="badge primary">Primary</span>
                            )}
                          </div>
                        </div>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditContact('phone', index)}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      className="add-contact-btn"
                      onClick={() => handleAddNewContact('phone')}
                    >
                      + Add Phone Number
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="channels-section">
                <h3>Notification Channels</h3>
                <p className="section-desc">Enable or disable notification channels</p>
                
                <div className="channel-toggles">
                  <div className="channel-toggle">
                    <div className="channel-info">
                      <div className="channel-icon email">
                        <FaEnvelope />
                      </div>
                      <div className="channel-details">
                        <span className="channel-name">Email</span>
                        <span className="channel-desc">Send notifications to your email address</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notificationPreferences.channels.email}
                        onChange={() => handleChannelToggle('email')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="channel-toggle">
                    <div className="channel-info">
                      <div className="channel-icon sms">
                        <FaSms />
                      </div>
                      <div className="channel-details">
                        <span className="channel-name">SMS/Text</span>
                        <span className="channel-desc">Receive text messages on your phone</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notificationPreferences.channels.sms}
                        onChange={() => handleChannelToggle('sms')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="channel-toggle">
                    <div className="channel-info">
                      <div className="channel-icon push">
                        <FaMobileAlt />
                      </div>
                      <div className="channel-details">
                        <span className="channel-name">Push Notifications</span>
                        <span className="channel-desc">Receive notifications on your mobile device</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notificationPreferences.channels.push}
                        onChange={() => handleChannelToggle('push')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="channel-toggle">
                    <div className="channel-info">
                      <div className="channel-icon inapp">
                        <FaBell />
                      </div>
                      <div className="channel-details">
                        <span className="channel-name">In-App</span>
                        <span className="channel-desc">Show notifications in the TrustMeds portal</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notificationPreferences.channels.inApp}
                        onChange={() => handleChannelToggle('inApp')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="section-filters">
                <h3>Filter by Category</h3>
                <div className="section-buttons">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.icon}
                      <span>{section.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="preferences-section">
              <div className="preferences-header">
                <h3>Notification Settings</h3>
                <p>Customize which notifications you receive on each channel</p>
              </div>
              
              <div className="preferences-list">
                {filterPreferencesBySection().map(([prefId, pref]) => (
                  <div className="preference-card" key={prefId}>
                    <div className="preference-header">
                      <div className="preference-icon">
                        {pref.icon}
                      </div>
                      <div className="preference-title">
                        <h4>{pref.title}</h4>
                        <p>{pref.description}</p>
                      </div>
                    </div>
                    
                    <div className="preference-channels">
                      <div className="channel-toggle-group">
                        <div className="channel-label">
                          <FaEnvelope />
                          <span>Email</span>
                        </div>
                        <label className="toggle-switch small">
                          <input 
                            type="checkbox" 
                            checked={pref.email && notificationPreferences.channels.email}
                            onChange={() => handlePreferenceToggle(prefId, 'email')}
                            disabled={!notificationPreferences.channels.email}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="channel-toggle-group">
                        <div className="channel-label">
                          <FaSms />
                          <span>SMS</span>
                        </div>
                        <label className="toggle-switch small">
                          <input 
                            type="checkbox" 
                            checked={pref.sms && notificationPreferences.channels.sms}
                            onChange={() => handlePreferenceToggle(prefId, 'sms')}
                            disabled={!notificationPreferences.channels.sms}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="channel-toggle-group">
                        <div className="channel-label">
                          <FaMobileAlt />
                          <span>Push</span>
                        </div>
                        <label className="toggle-switch small">
                          <input 
                            type="checkbox" 
                            checked={pref.push && notificationPreferences.channels.push}
                            onChange={() => handlePreferenceToggle(prefId, 'push')}
                            disabled={!notificationPreferences.channels.push}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="channel-toggle-group">
                        <div className="channel-label">
                          <FaBell />
                          <span>In-App</span>
                        </div>
                        <label className="toggle-switch small">
                          <input 
                            type="checkbox" 
                            checked={pref.inApp && notificationPreferences.channels.inApp}
                            onChange={() => handlePreferenceToggle(prefId, 'inApp')}
                            disabled={!notificationPreferences.channels.inApp}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="preference-actions">
                      <button 
                        className="advanced-btn"
                        onClick={() => toggleAdvancedOptions(prefId)}
                      >
                        <FaCog /> Advanced Options
                        {showAdvancedOptions[prefId] ? (
                          <FaChevronRight className="rotated" />
                        ) : (
                          <FaChevronRight />
                        )}
                      </button>
                    </div>
                    
                    {showAdvancedOptions[prefId] && (
                      <div className="advanced-options">
                        <div className="option-group">
                          <label>Priority Level</label>
                          <div className="radio-buttons">
                            <label className={`radio-label ${pref.priority === 'low' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-priority`}
                                value="low"
                                checked={pref.priority === 'low'}
                                onChange={() => handlePriorityChange(prefId, 'low')}
                              />
                              <span className="radio-text">Low</span>
                            </label>
                            <label className={`radio-label ${pref.priority === 'medium' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-priority`}
                                value="medium"
                                checked={pref.priority === 'medium'}
                                onChange={() => handlePriorityChange(prefId, 'medium')}
                              />
                              <span className="radio-text">Medium</span>
                            </label>
                            <label className={`radio-label ${pref.priority === 'high' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-priority`}
                                value="high"
                                checked={pref.priority === 'high'}
                                onChange={() => handlePriorityChange(prefId, 'high')}
                              />
                              <span className="radio-text">High</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="option-group">
                          <label>Frequency</label>
                          <div className="radio-buttons">
                            <label className={`radio-label ${pref.frequency === 'immediate' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-frequency`}
                                value="immediate"
                                checked={pref.frequency === 'immediate'}
                                onChange={() => handleFrequencyChange(prefId, 'immediate')}
                              />
                              <span className="radio-text">Immediate</span>
                            </label>
                            <label className={`radio-label ${pref.frequency === 'scheduled' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-frequency`}
                                value="scheduled"
                                checked={pref.frequency === 'scheduled'}
                                onChange={() => handleFrequencyChange(prefId, 'scheduled')}
                              />
                              <span className="radio-text">Scheduled</span>
                            </label>
                            <label className={`radio-label ${pref.frequency === 'as_needed' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name={`${prefId}-frequency`}
                                value="as_needed"
                                checked={pref.frequency === 'as_needed'}
                                onChange={() => handleFrequencyChange(prefId, 'as_needed')}
                              />
                              <span className="radio-text">As Needed</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="option-info">
                          <FaInfoCircle />
                          <p>Priority affects notification timing and prominence. Frequency controls how often you'll receive similar notifications.</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Edit Modal */}
          {showEditContactModal && (
            <div className="modal-overlay" onClick={() => setShowEditContactModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>
                    {editingContact.isNew 
                      ? `Add New ${editingContact.type === 'email' ? 'Email Address' : 'Phone Number'}`
                      : `Edit ${editingContact.type === 'email' ? 'Email Address' : 'Phone Number'}`
                    }
                  </h3>
                  <button className="close-btn" onClick={() => setShowEditContactModal(false)}>×</button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label>{editingContact.type === 'email' ? 'Email Address' : 'Phone Number'}</label>
                    <input
                      type={editingContact.type === 'email' ? 'email' : 'tel'}
                      value={editingContact.value}
                      onChange={(e) => setEditingContact({...editingContact, value: e.target.value})}
                      placeholder={editingContact.type === 'email' ? 'Enter email address' : 'Enter phone number'}
                    />
                  </div>
                  
                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      id="make-primary"
                      checked={editingContact.isPrimary}
                      onChange={(e) => setEditingContact({...editingContact, isPrimary: e.target.checked})}
                    />
                    <label htmlFor="make-primary">
                      Set as primary contact for notifications
                    </label>
                  </div>
                  
                  {!editingContact.isNew && !editingContact.isMain && (
                    <div className="form-actions-secondary">
                      <button className="text-btn">Resend Verification</button>
                      <button className="text-btn danger">Remove</button>
                    </div>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowEditContactModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="save-btn"
                    onClick={editingContact.isNew ? handleSaveNewContact : handleSaveContact}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientNotificationPreferences;