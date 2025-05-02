import React, { useState, useEffect, useRef } from 'react';
import { FaUserMd, FaPaperPlane, FaRegClock, FaClinicMedical, FaRegStar, FaRegCalendarAlt, FaPhoneAlt, FaVideo, FaFileMedical, FaLock, FaBars, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PatientDoctorCommunication.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language context

const PatientDoctorCommunication = () => {
    const { language, t } = useLanguage(); // Get language and translation function
    const isArabic = language === 'ar';

    // Helper function to get localized value
    const getLocalizedValue = (enValue, arValue) => {
        return isArabic ? arValue : enValue;
    };

    // Sample data with both English and Arabic versions
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            nameEn: "Dr. Sarah Smith",
            nameAr: "د. سارة سميث",
            specialtyEn: "Primary Care Physician",
            specialtyAr: "طبيب الرعاية الأولية",
            image: "/api/placeholder/64/64",
            lastContact: "2025-04-02",
            statusEn: "Available",
            statusAr: "متاح",
            responseTimeEn: "Usually responds in 24 hours",
            responseTimeAr: "عادة ما يستجيب في غضون 24 ساعة",
            isFavorite: true
        },
        {
            id: 2,
            nameEn: "Dr. Michael Johnson",
            nameAr: "د. مايكل جونسون",
            specialtyEn: "Cardiologist",
            specialtyAr: "طبيب قلب",
            image: "/api/placeholder/64/64",
            lastContact: "2025-03-27",
            statusEn: "Available",
            statusAr: "متاح",
            responseTimeEn: "Usually responds in 48 hours",
            responseTimeAr: "عادة ما يستجيب في غضون 48 ساعة",
            isFavorite: false
        },
        {
            id: 3,
            nameEn: "Dr. Emily Chen",
            nameAr: "د. إيميلي تشن",
            specialtyEn: "Dermatologist",
            specialtyAr: "طبيب جلدية",
            image: "/api/placeholder/64/64",
            lastContact: "2025-03-15",
            statusEn: "Away until April 12",
            statusAr: "غائب حتى 12 أبريل",
            responseTimeEn: "Out of office until April 12",
            responseTimeAr: "خارج المكتب حتى 12 أبريل",
            isFavorite: false
        }
    ]);

    const [recentMessages, setRecentMessages] = useState([
        {
            id: 1,
            doctorId: 1,
            doctorNameEn: "Dr. Sarah Smith",
            doctorNameAr: "د. سارة سميث",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-04-02",
            time: "10:30 AM",
            timeAr: "10:30 ص",
            messagePreviewEn: "Your recent blood test results look good. Let's discuss your medication dosage at your next appointment.",
            messagePreviewAr: "نتائج فحص الدم الأخيرة الخاصة بك تبدو جيدة. دعنا نناقش جرعة الدواء الخاصة بك في موعدك القادم.",
            isRead: true,
            isUrgent: false
        },
        {
            id: 2,
            doctorId: 2,
            doctorNameEn: "Dr. Michael Johnson",
            doctorNameAr: "د. مايكل جونسون",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-03-27",
            time: "2:15 PM",
            timeAr: "2:15 م",
            messagePreviewEn: "I've reviewed your heart monitor data. Please continue with your current medication regimen.",
            messagePreviewAr: "لقد راجعت بيانات مراقبة القلب الخاصة بك. يرجى الاستمرار في نظام الدواء الحالي.",
            isRead: true,
            isUrgent: false
        },
        {
            id: 3,
            doctorId: 1,
            doctorNameEn: "Dr. Sarah Smith",
            doctorNameAr: "د. سارة سميث",
            doctorImage: "/api/placeholder/48/48",
            date: "2025-03-20",
            time: "9:45 AM",
            timeAr: "9:45 ص",
            messagePreviewEn: "Your prescription for Lisinopril has been renewed. You can pick it up at your pharmacy.",
            messagePreviewAr: "تم تجديد وصفتك الطبية لليسينوبريل. يمكنك استلامها من الصيدلية.",
            isRead: false,
            isUrgent: true
        }
    ]);

    const [upcomingAppointments, setUpcomingAppointments] = useState([
        {
            id: 1,
            doctorId: 1,
            doctorNameEn: "Dr. Sarah Smith",
            doctorNameAr: "د. سارة سميث",
            specialtyEn: "Primary Care Physician",
            specialtyAr: "طبيب الرعاية الأولية",
            date: "2025-04-22",
            time: "2:30 PM",
            timeAr: "2:30 م",
            typeEn: "In-person",
            typeAr: "شخصي",
            locationEn: "Main Street Medical Center, Room 305",
            locationAr: "المركز الطبي بالشارع الرئيسي، غرفة 305",
            preAppointmentInstructionsEn: "Please bring your current medication list",
            preAppointmentInstructionsAr: "يرجى إحضار قائمة الأدوية الحالية الخاصة بك"
        },
        {
            id: 2,
            doctorId: 2,
            doctorNameEn: "Dr. Michael Johnson",
            doctorNameAr: "د. مايكل جونسون",
            specialtyEn: "Cardiologist",
            specialtyAr: "طبيب قلب",
            date: "2025-05-10",
            time: "10:15 AM",
            timeAr: "10:15 ص",
            typeEn: "Virtual",
            typeAr: "عن بعد",
            locationEn: "Video Conference",
            locationAr: "مؤتمر فيديو",
            preAppointmentInstructionsEn: "Have your blood pressure readings from the past month ready",
            preAppointmentInstructionsAr: "يرجى تجهيز قراءات ضغط الدم الخاصة بك من الشهر الماضي"
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
            console.log(`Message to ${selectedDoctor.nameEn}: ${messageText}`);

            // Add the message to recent messages for demo purposes
            const newMessage = {
                id: recentMessages.length + 1,
                doctorId: selectedDoctor.id,
                doctorNameEn: selectedDoctor.nameEn,
                doctorNameAr: selectedDoctor.nameAr,
                doctorImage: selectedDoctor.image,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timeAr: isArabic ?
                    new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) :
                    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messagePreviewEn: messageText,
                messagePreviewAr: messageText, // In a real app, this would be translated
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
                            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            <FaPaperPlane className="tab-icon" />
                            {isMobile ? t('patientPage.doctors.messagesShort') : t('patientPage.doctors.messages')}
                            {filteredMessages.filter(msg => !msg.isRead).length > 0 && (
                                <span className="badge">{filteredMessages.filter(msg => !msg.isRead).length}</span>
                            )}
                        </button>
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
                                                {t('patientPage.doctors.all')}
                                            </button>
                                            <button
                                                className={`filter-btn ${activeFilter === 'unread' ? 'active' : ''}`}
                                                onClick={() => setActiveFilter('unread')}
                                            >
                                                {t('patientPage.doctors.unread')}
                                            </button>
                                            <button
                                                className={`filter-btn ${activeFilter === 'urgent' ? 'active' : ''}`}
                                                onClick={() => setActiveFilter('urgent')}
                                            >
                                                {t('patientPage.doctors.urgent')}
                                            </button>
                                        </div>
                                        <button
                                            className="new-message-btn"
                                            onClick={() => setSelectedDoctor(doctors[0])} // For demo, open with first doctor
                                        >
                                            <FaPaperPlane className="btn-icon" />
                                            {isMobile ? t('patientPage.doctors.newShort') : t('patientPage.doctors.newMessage')}
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
                                                    {message.isUrgent && <div className="urgent-indicator">{t('patientPage.doctors.urgentLabel')}</div>}
                                                    <div className="message-avatar">
                                                        <img src={message.doctorImage} alt={getLocalizedValue(message.doctorNameEn, message.doctorNameAr)} />
                                                        {message.sentByMe && <div className="sent-indicator">{t('patientPage.doctors.you')}</div>}
                                                    </div>
                                                    <div className="message-content">
                                                        <div className="message-header">
                                                            <h3>{getLocalizedValue(message.doctorNameEn, message.doctorNameAr)}</h3>
                                                            <span className="message-time">{formatDate(message.date)} • {getLocalizedValue(message.time, message.timeAr)}</span>
                                                        </div>
                                                        <p className="message-preview">{getLocalizedValue(message.messagePreviewEn, message.messagePreviewAr)}</p>
                                                    </div>
                                                    {!message.isRead && <div className="unread-indicator"></div>}
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="no-messages">
                                                <p>{t('patientPage.doctors.noMessagesFilter')}</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="message-detail">
                                    <button className="back-button" onClick={handleBackToMessages}>
                                        <FaChevronLeft /> {t('patientPage.doctors.backToMessages')}
                                    </button>

                                    <div className="message-detail-header">
                                        <div className="message-detail-avatar">
                                            <img src={selectedMessage.doctorImage} alt={getLocalizedValue(selectedMessage.doctorNameEn, selectedMessage.doctorNameAr)} />
                                        </div>
                                        <div className="message-detail-info">
                                            <h3 className="doctor-name">{getLocalizedValue(selectedMessage.doctorNameEn, selectedMessage.doctorNameAr)}</h3>
                                            <p className="message-timestamp">{formatDate(selectedMessage.date)} {t('patientPage.doctors.atTime')} {getLocalizedValue(selectedMessage.time, selectedMessage.timeAr)}</p>
                                        </div>
                                        {selectedMessage.isUrgent && <div className="message-detail-urgent">{t('patientPage.doctors.urgentLabel')}</div>}
                                    </div>

                                    <div className="message-detail-content">
                                        <p className="message-text">{getLocalizedValue(selectedMessage.messagePreviewEn, selectedMessage.messagePreviewAr)}</p>
                                    </div>

                                    <div className="message-reply">
                                        <form onSubmit={handleSendMessage}>
                                            <textarea
                                                placeholder={t('patientPage.doctors.replyPlaceholder')}
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                            ></textarea>
                                            <div className="reply-actions">
                                                <button className="upload-btn" type="button">
                                                    <FaFileMedical /> {isMobile ? "" : t('patientPage.doctors.attach')}
                                                </button>
                                                <button className="send-btn" type="submit">
                                                    <FaPaperPlane /> {isMobile ? t('patientPage.doctors.sendShort') : t('patientPage.doctors.sendReply')}
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
                                <h2>{t('patientPage.doctors.upcomingAppointments')}</h2>
                                <button className="schedule-btn">
                                    <FaRegCalendarAlt className="btn-icon" />
                                    {isMobile ? t('patientPage.doctors.scheduleShort') : t('patientPage.doctors.scheduleNew')}
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
                                                <span className="month">
                                                    {isArabic
                                                        ? new Date(appointment.date).toLocaleString('ar-SA', { month: 'short' })
                                                        : new Date(appointment.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="day">{new Date(appointment.date).getDate()}</span>
                                            </div>
                                            <span className="time">{getLocalizedValue(appointment.time, appointment.timeAr)}</span>
                                        </div>

                                        <div className="appointment-details">
                                            <h3>{getLocalizedValue(appointment.doctorNameEn, appointment.doctorNameAr)}</h3>
                                            <p className="specialty">{getLocalizedValue(appointment.specialtyEn, appointment.specialtyAr)}</p>
                                            <div className="appointment-type">
                                                {getLocalizedValue(appointment.typeEn, appointment.typeAr) === 'Virtual' || getLocalizedValue(appointment.typeEn, appointment.typeAr) === 'عن بعد' ? (
                                                    <span className="virtual-badge">
                                                        <FaVideo /> {t('patientPage.doctors.virtualVisit')}
                                                    </span>
                                                ) : (
                                                    <span className="in-person-badge">
                                                        <FaClinicMedical /> {t('patientPage.doctors.inPerson')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="location">{getLocalizedValue(appointment.locationEn, appointment.locationAr)}</p>
                                        </div>

                                        <div className="appointment-actions">
                                            <button className="action-btn primary">
                                                {getLocalizedValue(appointment.typeEn, appointment.typeAr) === 'Virtual' || getLocalizedValue(appointment.typeEn, appointment.typeAr) === 'عن بعد'
                                                    ? t('patientPage.doctors.joinCall')
                                                    : t('patientPage.doctors.checkIn')}
                                            </button>
                                            <button className="action-btn secondary">{t('patientPage.doctors.reschedule')}</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="no-appointments" style={{ display: upcomingAppointments.length > 0 ? 'none' : 'flex' }}>
                                <FaRegCalendarAlt className="empty-icon" />
                                <h3>{t('patientPage.doctors.noAppointments')}</h3>
                                <p>{t('patientPage.doctors.scheduleNextVisit')}</p>
                                <button className="schedule-empty-btn">{t('patientPage.doctors.scheduleAppointment')}</button>
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
                                {doctors.map((doctor) => (
                                    <motion.div
                                        key={doctor.id}
                                        className="provider-card"
                                        variants={itemVariants}
                                    >
                                        <div className="provider-header">
                                            <div className="provider-avatar">
                                                <img src={doctor.image} alt={getLocalizedValue(doctor.nameEn, doctor.nameAr)} />
                                                <div className={`status-indicator ${getLocalizedValue(doctor.statusEn, doctor.statusAr) === 'Available' || getLocalizedValue(doctor.statusEn, doctor.statusAr) === 'متاح' ? 'available' : 'away'}`}></div>
                                            </div>
                                            <button className="favorite-btn" aria-label={doctor.isFavorite ? t('patientPage.doctors.removeFromFavorites') : t('patientPage.doctors.addToFavorites')}>
                                                <FaRegStar className={doctor.isFavorite ? 'favorite' : ''} />
                                            </button>
                                        </div>

                                        <div className="provider-info">
                                            <h3>{getLocalizedValue(doctor.nameEn, doctor.nameAr)}</h3>
                                            <p className="specialty">{getLocalizedValue(doctor.specialtyEn, doctor.specialtyAr)}</p>
                                            <p className="status">{getLocalizedValue(doctor.statusEn, doctor.statusAr)}</p>
                                            <p className="response-time">
                                                <FaRegClock className="time-icon" />
                                                {getLocalizedValue(doctor.responseTimeEn, doctor.responseTimeAr)}
                                            </p>
                                        </div>

                                        <div className="provider-actions">
                                            <button className="action-btn message" onClick={() => handleSelectDoctor(doctor)}>
                                                <FaPaperPlane /> {t('patientPage.doctors.message')}
                                            </button>
                                            <button className="action-btn call">
                                                <FaPhoneAlt /> {t('patientPage.doctors.callOffice')}
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
                                    <h3>{t('patientPage.doctors.newMessage')}</h3>
                                    <button className="close-btn" onClick={() => setSelectedDoctor(null)} aria-label={t('patientPage.doctors.close')}>×</button>
                                </div>

                                <div className="modal-content">
                                    <div className="recipient-info">
                                        <span>{t('patientPage.doctors.to')}:</span>
                                        <div className="recipient-chip">
                                            <img src={selectedDoctor.image} alt={getLocalizedValue(selectedDoctor.nameEn, selectedDoctor.nameAr)} />
                                            <span>{getLocalizedValue(selectedDoctor.nameEn, selectedDoctor.nameAr)}</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSendMessage}>
                                        <div className="form-group">
                                            <label htmlFor="messageSubject">{t('patientPage.doctors.subject')}:</label>
                                            <select id="messageSubject">
                                                <option value="medication">{t('patientPage.doctors.medicationQuestion')}</option>
                                                <option value="prescription">{t('patientPage.doctors.prescriptionRefill')}</option>
                                                <option value="appointment">{t('patientPage.doctors.appointmentRequest')}</option>
                                                <option value="results">{t('patientPage.doctors.testResults')}</option>
                                                <option value="other">{t('patientPage.doctors.other')}</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="messageContent">{t('patientPage.doctors.messageLabel')}:</label>
                                            <textarea
                                                id="messageContent"
                                                placeholder={t('patientPage.doctors.messagePlaceholder')}
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div className="form-group urgent-checkbox">
                                            <input type="checkbox" id="isUrgent" />
                                            <label htmlFor="isUrgent">{t('patientPage.doctors.markAsUrgent')}</label>
                                            <span className="urgent-note">{t('patientPage.doctors.urgentNote')}</span>
                                        </div>

                                        <div className="form-actions">
                                            <div className="attachment-section">
                                                <button type="button" className="attach-btn">
                                                    <FaFileMedical /> {t('patientPage.doctors.attachFiles')}
                                                </button>
                                                <span className="attachment-note">{t('patientPage.doctors.maxSize')}</span>
                                            </div>

                                            <button type="submit" className="send-message-btn">
                                                <FaPaperPlane /> {t('patientPage.doctors.sendMessage')}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <div className="security-note">
                                        <FaLock className="lock-icon" />
                                        <span>{t('patientPage.doctors.securityNote')}</span>
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