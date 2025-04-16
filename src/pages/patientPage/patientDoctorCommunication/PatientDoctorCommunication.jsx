import React, { useState, useEffect, useRef } from 'react';
import { FaUserMd, FaPaperPlane, FaRegClock, FaClinicMedical, FaRegStar, FaRegCalendarAlt, FaPhoneAlt, FaVideo, FaFileMedical, FaLock, FaBars, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PatientDoctorCommunication.scss';

const PatientDoctorCommunication = () => {
    // Sample data - in a real app, this would come from your API/backend
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: "Dr. Sarah Smith",
            specialty: "Primary Care Physician",
            image: "/api/placeholder/64/64",
            lastContact: "2025-04-02",
            status: "Available",
            responseTime: "Usually responds in 24 hours",
            isFavorite: true
        },
        {
            id: 2,
            name: "Dr. Michael Johnson",
            specialty: "Cardiologist",
            image: "/api/placeholder/64/64",
            lastContact: "2025-03-27",
            status: "Available",
            responseTime: "Usually responds in 48 hours",
            isFavorite: false
        },
        {
            id: 3,
            name: "Dr. Emily Chen",
            specialty: "Dermatologist",
            image: "/api/placeholder/64/64",
            lastContact: "2025-03-15",
            status: "Away until April 12",
            responseTime: "Out of office until April 12",
            isFavorite: false
        }
    ]);

    const [recentMessages, setRecentMessages] = useState([
        {
            id: 1,
            doctorId: 1,
            doctorName: "Dr. Sarah Smith",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-04-02",
            time: "10:30 AM",
            messagePreview: "Your recent blood test results look good. Let's discuss your medication dosage at your next appointment.",
            isRead: true,
            isUrgent: false
        },
        {
            id: 2,
            doctorId: 2,
            doctorName: "Dr. Michael Johnson",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-03-27",
            time: "2:15 PM",
            messagePreview: "I've reviewed your heart monitor data. Please continue with your current medication regimen.",
            isRead: true,
            isUrgent: false
        },
        {
            id: 3,
            doctorId: 1,
            doctorName: "Dr. Sarah Smith",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-03-20",
            time: "9:45 AM",
            messagePreview: "Your prescription for Lisinopril has been renewed. You can pick it up at your pharmacy.",
            isRead: false,
            isUrgent: true
        }
    ]);

    const [upcomingAppointments, setUpcomingAppointments] = useState([
        {
            id: 1,
            doctorId: 1,
            doctorName: "Dr. Sarah Smith",
            specialty: "Primary Care Physician",
            date: "2025-04-22",
            time: "2:30 PM",
            type: "In-person",
            location: "Main Street Medical Center, Room 305",
            preAppointmentInstructions: "Please bring your current medication list"
        },
        {
            id: 2,
            doctorId: 2,
            doctorName: "Dr. Michael Johnson",
            specialty: "Cardiologist",
            date: "2025-05-10",
            time: "10:15 AM",
            type: "Virtual",
            location: "Video Conference",
            preAppointmentInstructions: "Have your blood pressure readings from the past month ready"
        }
    ]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState("messages");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

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

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    // Format date to display in readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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

    // Handle selecting a doctor to message
    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
    };

    // Handle message submission
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim() && selectedDoctor) {
            // In a real app, you would send this to your API
            console.log(`Message to ${selectedDoctor.name}: ${messageText}`);

            // Add the message to recent messages for demo purposes
            const newMessage = {
                id: recentMessages.length + 1,
                doctorId: selectedDoctor.id,
                doctorName: selectedDoctor.name,
                doctorImage: selectedDoctor.image,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messagePreview: messageText,
                isRead: true,
                isUrgent: false,
                sentByMe: true
            };

            setRecentMessages([newMessage, ...recentMessages]);
            setMessageText("");
            
            // If we're in a message detail view, close it and go back to list
            if (selectedMessage) {
                setSelectedMessage(null);
            }
            
            // Close the new message modal
            setSelectedDoctor(null);
        }
    };

    // Handle viewing a message
    const handleViewMessage = (message) => {
        setSelectedMessage(message);

        // Mark message as read
        if (!message.isRead) {
            const updatedMessages = recentMessages.map(msg =>
                msg.id === message.id ? { ...msg, isRead: true } : msg
            );
            setRecentMessages(updatedMessages);
        }
    };

    // Return to message list
    const handleBackToMessages = () => {
        setSelectedMessage(null);
    };
    
    // Filter messages based on active filter
    const getFilteredMessages = () => {
        if (activeFilter === "all") {
            return recentMessages;
        } else if (activeFilter === "unread") {
            return recentMessages.filter(msg => !msg.isRead);
        } else if (activeFilter === "urgent") {
            return recentMessages.filter(msg => msg.isUrgent);
        }
        return recentMessages;
    };
    
    const filteredMessages = getFilteredMessages();

    return (
        <div className="doctor-communication-container">
            {!isLoaded ? (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>Loading doctor communication...</p>
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
                            <h1>Doctor Communication</h1>
                            <p className="subtitle">Securely message your healthcare providers and manage appointments</p>
                        </div>
                        <div className="secure-badge">
                            <FaLock className="lock-icon" />
                            <span>End-to-end encrypted</span>
                        </div>
                    </motion.div>

                    <div className="communication-tabs">
                        <button
                            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            <FaPaperPlane className="tab-icon" />
                            {isMobile ? "Messages" : "Messages"}
                            {filteredMessages.filter(msg => !msg.isRead).length > 0 && (
                                <span className="badge">{filteredMessages.filter(msg => !msg.isRead).length}</span>
                            )}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appointments')}
                        >
                            <FaRegCalendarAlt className="tab-icon" />
                            {isMobile ? "Appts" : "Appointments"}
                            {upcomingAppointments.length > 0 && (
                                <span className="badge">{upcomingAppointments.length}</span>
                            )}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'providers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('providers')}
                        >
                            <FaUserMd className="tab-icon" />
                            {isMobile ? "Providers" : "My Providers"}
                        </button>
                    </div>

                    {activeTab === 'messages' && (
                        <motion.div
                            className="messages-section"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {!selectedMessage ? (
                                <>
                                    <div className="message-toolbar">
                                        <div className="message-filters">
                                            <button 
                                                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                                onClick={() => setActiveFilter('all')}
                                            >
                                                All
                                            </button>
                                            <button 
                                                className={`filter-btn ${activeFilter === 'unread' ? 'active' : ''}`}
                                                onClick={() => setActiveFilter('unread')}
                                            >
                                                Unread
                                            </button>
                                            <button 
                                                className={`filter-btn ${activeFilter === 'urgent' ? 'active' : ''}`}
                                                onClick={() => setActiveFilter('urgent')}
                                            >
                                                Urgent
                                            </button>
                                        </div>
                                        <button 
                                            className="new-message-btn"
                                            onClick={() => setSelectedDoctor(doctors[0])} // For demo, open with first doctor
                                        >
                                            <FaPaperPlane className="btn-icon" />
                                            {isMobile ? "New" : "New Message"}
                                        </button>
                                    </div>

                                    <div className="messages-list">
                                        {filteredMessages.length > 0 ? (
                                            filteredMessages.map((message) => (
                                                <motion.div
                                                    key={message.id}
                                                    className={`message-item ${!message.isRead ? 'unread' : ''} ${message.isUrgent ? 'urgent' : ''}`}
                                                    variants={itemVariants}
                                                    onClick={() => handleViewMessage(message)}
                                                >
                                                    {message.isUrgent && <div className="urgent-indicator">Urgent</div>}
                                                    <div className="message-avatar">
                                                        <img src={message.doctorImage} alt={message.doctorName} />
                                                        {message.sentByMe && <div className="sent-indicator">You</div>}
                                                    </div>
                                                    <div className="message-content">
                                                        <div className="message-header">
                                                            <h3>{message.doctorName}</h3>
                                                            <span className="message-time">{formatDate(message.date)} • {message.time}</span>
                                                        </div>
                                                        <p className="message-preview">{message.messagePreview}</p>
                                                    </div>
                                                    {!message.isRead && <div className="unread-indicator"></div>}
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="no-messages">
                                                <p>No messages match your filter.</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="message-detail">
                                    <button className="back-button" onClick={handleBackToMessages}>
                                        <FaChevronLeft /> Back to messages
                                    </button>

                                    <div className="message-detail-header">
                                        <div className="message-detail-avatar">
                                            <img src={selectedMessage.doctorImage} alt={selectedMessage.doctorName} />
                                        </div>
                                        <div className="message-detail-info">
                                            <h3 className="doctor-name">{selectedMessage.doctorName}</h3>
                                            <p className="message-timestamp">{formatDate(selectedMessage.date)} at {selectedMessage.time}</p>
                                        </div>
                                        {selectedMessage.isUrgent && <div className="message-detail-urgent">Urgent</div>}
                                    </div>

                                    <div className="message-detail-content">
                                        <p className="message-text">{selectedMessage.messagePreview}</p>
                                    </div>

                                    <div className="message-reply">
                                        <form onSubmit={handleSendMessage}>
                                            <textarea
                                                placeholder="Type your reply here..."
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                            ></textarea>
                                            <div className="reply-actions">
                                                <button className="upload-btn" type="button">
                                                    <FaFileMedical /> {isMobile ? "" : "Attach"}
                                                </button>
                                                <button className="send-btn" type="submit">
                                                    <FaPaperPlane /> {isMobile ? "Send" : "Send Reply"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'appointments' && (
                        <motion.div
                            className="appointments-section"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="appointments-toolbar">
                                <h2>Upcoming Appointments</h2>
                                <button className="schedule-btn">
                                    <FaRegCalendarAlt className="btn-icon" />
                                    {isMobile ? "Schedule" : "Schedule New"}
                                </button>
                            </div>

                            <div className="appointments-list">
                                {upcomingAppointments.map((appointment) => (
                                    <motion.div
                                        key={appointment.id}
                                        className="appointment-card"
                                        variants={itemVariants}
                                    >
                                        <div className="appointment-date">
                                            <div className="calendar">
                                                <span className="month">{new Date(appointment.date).toLocaleString('default', { month: 'short' })}</span>
                                                <span className="day">{new Date(appointment.date).getDate()}</span>
                                            </div>
                                            <span className="time">{appointment.time}</span>
                                        </div>

                                        <div className="appointment-details">
                                            <h3>{appointment.doctorName}</h3>
                                            <p className="specialty">{appointment.specialty}</p>
                                            <div className="appointment-type">
                                                {appointment.type === 'Virtual' ? (
                                                    <span className="virtual-badge">
                                                        <FaVideo /> Virtual Visit
                                                    </span>
                                                ) : (
                                                    <span className="in-person-badge">
                                                        <FaClinicMedical /> In-Person
                                                    </span>
                                                )}
                                            </div>
                                            <p className="location">{appointment.location}</p>
                                        </div>

                                        <div className="appointment-actions">
                                            <button className="action-btn primary">
                                                {appointment.type === 'Virtual' ? 'Join Call' : 'Check In'}
                                            </button>
                                            <button className="action-btn secondary">Reschedule</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="no-appointments" style={{ display: upcomingAppointments.length > 0 ? 'none' : 'flex' }}>
                                <FaRegCalendarAlt className="empty-icon" />
                                <h3>No upcoming appointments</h3>
                                <p>Schedule your next visit with your healthcare provider</p>
                                <button className="schedule-empty-btn">Schedule Appointment</button>
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
                                <h2>My Healthcare Providers</h2>
                                <button className="add-provider-btn">
                                    <FaUserMd className="btn-icon" />
                                    {isMobile ? "Add" : "Add Provider"}
                                </button>
                            </div>

                            <div className="providers-list">
                                {doctors.map((doctor) => (
                                    <motion.div
                                        key={doctor.id}
                                        className="provider-card"
                                        variants={itemVariants}
                                    >
                                        <div className="provider-header">
                                            <div className="provider-avatar">
                                                <img src={doctor.image} alt={doctor.name} />
                                                <div className={`status-indicator ${doctor.status === 'Available' ? 'available' : 'away'}`}></div>
                                            </div>
                                            <button className="favorite-btn" aria-label={doctor.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                                                <FaRegStar className={doctor.isFavorite ? 'favorite' : ''} />
                                            </button>
                                        </div>

                                        <div className="provider-info">
                                            <h3>{doctor.name}</h3>
                                            <p className="specialty">{doctor.specialty}</p>
                                            <p className="status">{doctor.status}</p>
                                            <p className="response-time">
                                                <FaRegClock className="time-icon" />
                                                {doctor.responseTime}
                                            </p>
                                        </div>

                                        <div className="provider-actions">
                                            <button className="action-btn message" onClick={() => handleSelectDoctor(doctor)}>
                                                <FaPaperPlane /> Message
                                            </button>
                                            <button className="action-btn call">
                                                <FaPhoneAlt /> Call Office
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {selectedDoctor && (
                        <div className="new-message-overlay">
                            <div className="new-message-modal">
                                <div className="modal-header">
                                    <h3>New Message</h3>
                                    <button className="close-btn" onClick={() => setSelectedDoctor(null)} aria-label="Close">×</button>
                                </div>

                                <div className="modal-content">
                                    <div className="recipient-info">
                                        <span>To:</span>
                                        <div className="recipient-chip">
                                            <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                                            <span>{selectedDoctor.name}</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSendMessage}>
                                        <div className="form-group">
                                            <label htmlFor="messageSubject">Subject:</label>
                                            <select id="messageSubject">
                                                <option value="medication">Medication Question</option>
                                                <option value="prescription">Prescription Refill</option>
                                                <option value="appointment">Appointment Request</option>
                                                <option value="results">Test Results</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="messageContent">Message:</label>
                                            <textarea
                                                id="messageContent"
                                                placeholder="Type your message here..."
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div className="form-group urgent-checkbox">
                                            <input type="checkbox" id="isUrgent" />
                                            <label htmlFor="isUrgent">Mark as urgent</label>
                                            <span className="urgent-note">Only use for time-sensitive medical issues</span>
                                        </div>

                                        <div className="form-actions">
                                            <div className="attachment-section">
                                                <button type="button" className="attach-btn">
                                                    <FaFileMedical /> Attach Files
                                                </button>
                                                <span className="attachment-note">Max size: 10MB</span>
                                            </div>

                                            <button type="submit" className="send-message-btn">
                                                <FaPaperPlane /> Send Message
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <div className="security-note">
                                        <FaLock className="lock-icon" />
                                        <span>All messages are securely encrypted and HIPAA compliant</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PatientDoctorCommunication;