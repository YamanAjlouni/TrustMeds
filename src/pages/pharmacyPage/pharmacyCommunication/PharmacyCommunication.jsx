import React, { useState, useEffect, useRef } from 'react';
import './PharmacyCommunication.scss';
import {
    FaUserMd,
    FaUserAlt,
    FaExclamationTriangle,
    FaSearch,
    FaFilter,
    FaPaperPlane,
    FaPaperclip,
    FaFilePdf,
    FaFileImage,
    FaImage,
    FaEllipsisV,
    FaPhone,
    FaVideo,
    FaArchive,
    FaRegClock,
    FaBell
} from 'react-icons/fa';

const PharmacyCommunication = () => {
    // State
    const [isLoaded, setIsLoaded] = useState(false);
    const [contactSearch, setContactSearch] = useState('');
    const [messageSearch, setMessageSearch] = useState('');
    const [activeContact, setActiveContact] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Cardiologist',
            type: 'doctor',
            lastMessage: 'Please call me regarding patient Layla Ibrahim prescription',
            time: 'Today, 10:30 AM',
            unread: 2,
            status: 'online',
            avatar: 'SJ'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            role: 'Endocrinologist',
            type: 'doctor',
            lastMessage: 'Can you check if you have Metformin XR 1000mg in stock?',
            time: 'Today, 9:15 AM',
            unread: 0,
            status: 'away',
            avatar: 'MC'
        },
        {
            id: 3,
            name: 'Omar Khalid',
            role: 'Patient',
            type: 'patient',
            lastMessage: 'Is my prescription ready for pickup?',
            time: 'Yesterday',
            unread: 1,
            status: 'offline',
            avatar: 'OK'
        },
        {
            id: 4,
            name: 'Dr. Lisa Thompson',
            role: 'Pediatrician',
            type: 'doctor',
            lastMessage: 'The antibiotic dosage has been updated, please check the new prescription',
            time: 'Yesterday',
            unread: 0,
            status: 'online',
            avatar: 'LT'
        },
        {
            id: 5,
            name: 'Fatima Al-Sayed',
            role: 'Patient',
            type: 'patient',
            lastMessage: 'Thank you for the fast service!',
            time: '2 days ago',
            unread: 0,
            status: 'offline',
            avatar: 'FA'
        },
        {
            id: 6,
            name: 'Inventory System',
            role: 'Alerts',
            type: 'system',
            lastMessage: 'Low stock alert: Amoxicillin 500mg (15 units remaining)',
            time: 'Today, 8:00 AM',
            unread: 1,
            status: 'system',
            avatar: 'IS'
        },
        {
            id: 7,
            name: 'Dr. James Wilson',
            role: 'Internal Medicine',
            type: 'doctor',
            lastMessage: 'Could you check for any potential drug interactions for my patient?',
            time: '3 days ago',
            unread: 0,
            status: 'offline',
            avatar: 'JW'
        }
    ]);

    const [conversations, setConversations] = useState({
        1: [
            {
                id: 1,
                sender: 'Omar Khalid',
                senderType: 'patient',
                message: 'Hello, I received a notification that my prescription is ready for pickup. Is that correct?',
                time: '3:45 PM',
                date: 'Yesterday',
                status: 'read',
                files: []
            },
            {
                id: 2,
                sender: 'You',
                senderType: 'self',
                message: 'Hi Omar, yes your prescription for Fluticasone nasal spray is ready. You can pick it up anytime during our business hours (8 AM - 9 PM).',
                time: '4:00 PM',
                date: 'Yesterday',
                status: 'read',
                files: []
            },
            {
                id: 3,
                sender: 'Omar Khalid',
                senderType: 'patient',
                message: 'Great, thanks! I\'ll stop by this evening. Also, do I need to bring anything with me?',
                time: '4:05 PM',
                date: 'Yesterday',
                status: 'read',
                files: []
            },
            {
                id: 4,
                sender: 'You',
                senderType: 'self',
                message: 'Just your ID card and insurance card if applicable. The total cost will be $15 with your insurance.',
                time: '4:10 PM',
                date: 'Yesterday',
                status: 'read',
                files: []
            },
            {
                id: 5,
                sender: 'Omar Khalid',
                senderType: 'patient',
                message: 'Perfect, thank you!',
                time: '4:12 PM',
                date: 'Yesterday',
                status: 'unread',
                files: []
            }
        ],
        6: [
            {
                id: 1,
                sender: 'Inventory System',
                senderType: 'system',
                message: 'LOW STOCK ALERT: Amoxicillin 500mg (15 units remaining)',
                time: '8:00 AM',
                date: 'Today',
                status: 'unread',
                files: []
            }
        ]
    });

    const messageEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
            // Set default active contact
            setActiveContact(contacts[0]);
        }, 800);
    }, []);

    // Scroll to bottom of messages when new message is added or active contact changes
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeContact, conversations]);

    // Handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // Create new message object
        const newMessageObj = {
            id: Date.now(),
            sender: 'You',
            senderType: 'self',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: 'Today',
            status: 'sent',
            files: []
        };

        // Update conversations
        const currentConversation = conversations[activeContact.id] || [];
        setConversations({
            ...conversations,
            [activeContact.id]: [...currentConversation, newMessageObj]
        });

        // Clear new message input
        setNewMessage('');

        // Mark contact as read
        const updatedContacts = contacts.map(contact => {
            if (contact.id === activeContact.id) {
                return { ...contact, unread: 0 };
            }
            return contact;
        });
        setContacts(updatedContacts);
    };

    // Handle file upload
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        // In a real application, you would upload the files to a server
        // and then get the URLs to display in the chat

        // For this demo, we'll just create message objects for the files
        const fileMessages = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            sender: 'You',
            senderType: 'self',
            message: `File: ${file.name}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: 'Today',
            status: 'sent',
            files: [{
                name: file.name,
                type: file.type,
                size: file.size,
                // In a real app, this would be the URL from the server
                url: '#'
            }]
        }));

        // Update conversations
        const currentConversation = conversations[activeContact.id] || [];
        setConversations({
            ...conversations,
            [activeContact.id]: [...currentConversation, ...fileMessages]
        });
    };

    // Handle contact selection
    const handleContactSelect = (contact) => {
        setActiveContact(contact);

        // Mark contact as read
        const updatedContacts = contacts.map(c => {
            if (c.id === contact.id) {
                return { ...c, unread: 0 };
            }
            return c;
        });
        setContacts(updatedContacts);
    };

    // Filter contacts based on search term
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        contact.role.toLowerCase().includes(contactSearch.toLowerCase())
    );

    // Filter messages based on search term (if any)
    const filteredMessages = activeContact && conversations[activeContact.id]
        ? messageSearch
            ? conversations[activeContact.id].filter(message =>
                message.message.toLowerCase().includes(messageSearch.toLowerCase())
            )
            : conversations[activeContact.id]
        : [];

    // Get contact avatar color
    const getAvatarColor = (type) => {
        switch (type) {
            case 'doctor':
                return 'doctor-avatar';
            case 'patient':
                return 'patient-avatar';
            case 'system':
                return 'system-avatar';
            default:
                return 'default-avatar';
        }
    };

    // Get status indicator
    const getStatusIndicator = (status) => {
        switch (status) {
            case 'online':
                return 'status-online';
            case 'away':
                return 'status-away';
            case 'offline':
                return 'status-offline';
            case 'system':
                return 'status-system';
            default:
                return '';
        }
    };

    // Format file size
    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(1)} KB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
        }
    };

    // Get file icon based on file type
    const getFileIcon = (fileType) => {
        if (fileType.startsWith('image/')) {
            return <FaFileImage className="file-icon image" />;
        } else if (fileType === 'application/pdf') {
            return <FaFilePdf className="file-icon pdf" />;
        } else {
            return <FaPaperclip className="file-icon default" />;
        }
    };

    // Get message time format
    const getMessageTimeFormat = (message) => {
        return `${message.date} at ${message.time}`;
    };

    return (
        <div className="pharmacy-communication">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading messages...</p>
                </div>
            ) : (
                <div className="communication-container">
                    {/* Contacts Sidebar */}
                    <div className="contacts-sidebar">
                        <div className="sidebar-header">
                            <h2>Messages</h2>
                            <div className="header-actions">
                                <button className="action-btn" title="New Message">
                                    <FaPaperPlane />
                                </button>
                                <button className="action-btn" title="Settings">
                                    <FaEllipsisV />
                                </button>
                            </div>
                        </div>

                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={contactSearch}
                                onChange={(e) => setContactSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="contacts-filter">
                            <button className="filter-btn active">All</button>
                            <button className="filter-btn">Doctors</button>
                            <button className="filter-btn">Patients</button>
                            <button className="filter-btn">Alerts</button>
                        </div>

                        <div className="contacts-list">
                            {filteredContacts.length === 0 ? (
                                <div className="empty-contacts">
                                    <p>No contacts found</p>
                                </div>
                            ) : (
                                filteredContacts.map(contact => (
                                    <div
                                        key={contact.id}
                                        className={`contact-item ${activeContact && activeContact.id === contact.id ? 'active' : ''}`}
                                        onClick={() => handleContactSelect(contact)}
                                    >
                                        <div className="contact-avatar-container">
                                            <div className={`contact-avatar ${getAvatarColor(contact.type)}`}>
                                                {contact.avatar}
                                            </div>
                                            <span className={`status-indicator ${getStatusIndicator(contact.status)}`}></span>
                                        </div>
                                        <div className="contact-info">
                                            <div className="contact-header">
                                                <h3 className="contact-name">{contact.name}</h3>
                                                <span className="contact-time">{contact.time}</span>
                                            </div>
                                            <div className="contact-subheader">
                                                <span className="contact-role">{contact.role}</span>
                                                {contact.unread > 0 && (
                                                    <span className="unread-badge">{contact.unread}</span>
                                                )}
                                            </div>
                                            <p className="contact-preview">{contact.lastMessage}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    {activeContact ? (
                        <div className="chat-area">
                            <div className="chat-header">
                                <div className="chat-contact-info">
                                    <div className={`contact-avatar ${getAvatarColor(activeContact.type)}`}>
                                        {activeContact.avatar}
                                    </div>
                                    <div className="contact-details">
                                        <h3>{activeContact.name}</h3>
                                        <div className="contact-meta">
                                            <span className="contact-role">{activeContact.role}</span>
                                            <span className={`status-text ${activeContact.status}`}>{activeContact.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-actions">
                                    <div className="search-container">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search in conversation..."
                                            value={messageSearch}
                                            onChange={(e) => setMessageSearch(e.target.value)}
                                            className="search-input"
                                        />
                                    </div>
                                    <button className="action-btn" title="Call">
                                        <FaPhone />
                                    </button>
                                    <button className="action-btn" title="Video Call">
                                        <FaVideo />
                                    </button>
                                    <button className="action-btn" title="More Options">
                                        <FaEllipsisV />
                                    </button>
                                </div>
                            </div>

                            <div className="chat-messages">
                                {filteredMessages.length === 0 ? (
                                    <div className="empty-messages">
                                        <p>No messages yet</p>
                                        <button className="start-conversation-btn">
                                            Start Conversation
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="messages-container">
                                            {filteredMessages.map(message => (
                                                <div
                                                    key={message.id}
                                                    className={`message-item ${message.senderType === 'self' ? 'outgoing' : 'incoming'} ${message.senderType}`}
                                                >
                                                    {message.senderType !== 'self' && (
                                                        <div className={`message-avatar ${getAvatarColor(message.senderType)}`}>
                                                            {activeContact.avatar}
                                                        </div>
                                                    )}
                                                    <div className="message-content">
                                                        <div className="message-header">
                                                            <span className="message-sender">
                                                                {message.senderType === 'self' ? 'You' : message.sender}
                                                            </span>
                                                            <span className="message-time" title={getMessageTimeFormat(message)}>
                                                                {message.time}
                                                            </span>
                                                        </div>
                                                        <div className="message-bubble">
                                                            <p className="message-text">{message.message}</p>
                                                            {message.files.length > 0 && (
                                                                <div className="message-files">
                                                                    {message.files.map((file, index) => (
                                                                        <div key={index} className="file-attachment">
                                                                            {getFileIcon(file.type)}
                                                                            <div className="file-info">
                                                                                <span className="file-name">{file.name}</span>
                                                                                <span className="file-size">{formatFileSize(file.size)}</span>
                                                                            </div>
                                                                            <a href={file.url} className="file-download" download>
                                                                                <FaDownload />
                                                                            </a>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {message.senderType === 'self' && (
                                                            <div className="message-status">
                                                                {message.status === 'sent' && <span className="status-sent">Sent</span>}
                                                                {message.status === 'delivered' && <span className="status-delivered">Delivered</span>}
                                                                {message.status === 'read' && <span className="status-read">Read</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messageEndRef} />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="chat-input">
                                <button className="attachment-btn" onClick={handleFileUpload}>
                                    <FaPaperclip />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    multiple
                                />
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                </div>
                                <button className="send-btn" onClick={handleSendMessage}>
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-chat">
                            <div className="empty-chat-content">
                                <FaComments className="empty-icon" />
                                <h3>Select a conversation</h3>
                                <p>Choose a contact from the list to start chatting</p>
                            </div>
                        </div>
                    )}

                    {/* Information Panel */}
                    <div className="info-panel">
                        {activeContact && (
                            <>
                                <div className="panel-header">
                                    <h3>Contact Info</h3>
                                    <button className="close-panel-btn">×</button>
                                </div>

                                <div className="contact-profile">
                                    <div className={`profile-avatar ${getAvatarColor(activeContact.type)}`}>
                                        {activeContact.avatar}
                                    </div>
                                    <h3 className="profile-name">{activeContact.name}</h3>
                                    <p className="profile-role">{activeContact.role}</p>
                                    <div className={`profile-status ${activeContact.status}`}>
                                        <span className={`status-dot ${getStatusIndicator(activeContact.status)}`}></span>
                                        <span className="status-text">{activeContact.status}</span>
                                    </div>
                                </div>

                                {activeContact.type !== 'system' && (
                                    <div className="contact-actions">
                                        <button className="contact-action-btn">
                                            <FaPhone /> Call
                                        </button>
                                        <button className="contact-action-btn">
                                            <FaVideo /> Video
                                        </button>
                                        <button className="contact-action-btn">
                                            <FaBell /> Mute
                                        </button>
                                        <button className="contact-action-btn">
                                            <FaArchive /> Archive
                                        </button>
                                    </div>
                                )}

                                {activeContact.type === 'patient' && (
                                    <div className="patient-info">
                                        <div className="info-section">
                                            <h4 className="section-title">Patient Information</h4>
                                            <div className="info-item">
                                                <span className="info-label">Patient ID</span>
                                                <span className="info-value">PT-{activeContact.id}54321</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Date of Birth</span>
                                                <span className="info-value">15 Jun 1985</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Phone</span>
                                                <span className="info-value">+1 (555) 123-4567</span>
                                            </div>
                                        </div>

                                        <div className="info-section">
                                            <h4 className="section-title">Recent Prescriptions</h4>
                                            <div className="prescription-item">
                                                <div className="prescription-header">
                                                    <span className="prescription-id">RX-20250415-001</span>
                                                    <span className="prescription-date">Apr 15, 2025</span>
                                                </div>
                                                <div className="prescription-meds">
                                                    <span className="med-item">Fluticasone 50mcg</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeContact.type === 'doctor' && (
                                    <div className="doctor-info">
                                        <div className="info-section">
                                            <h4 className="section-title">Doctor Information</h4>
                                            <div className="info-item">
                                                <span className="info-label">Doctor ID</span>
                                                <span className="info-value">DR-{activeContact.id}5678</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Specialty</span>
                                                <span className="info-value">{activeContact.role}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Phone</span>
                                                <span className="info-value">+1 (555) 987-6543</span>
                                            </div>
                                        </div>

                                        <div className="info-section">
                                            <h4 className="section-title">Recent Activity</h4>
                                            <div className="activity-item">
                                                <FaRegClock className="activity-icon" />
                                                <div className="activity-content">
                                                    <p className="activity-text">Sent prescription for patient Omar Khalid</p>
                                                    <span className="activity-time">Yesterday</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeContact.type === 'system' && (
                                    <div className="system-info">
                                        <div className="info-section">
                                            <h4 className="section-title">System Alerts</h4>
                                            <p className="info-description">
                                                This channel provides automated alerts from the pharmacy inventory and management system.
                                            </p>
                                        </div>

                                        <div className="info-section">
                                            <h4 className="section-title">Alert Settings</h4>
                                            <div className="toggle-item">
                                                <span className="toggle-label">Low Stock Alerts</span>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" checked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            <div className="toggle-item">
                                                <span className="toggle-label">Prescription Alerts</span>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" checked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            <div className="toggle-item">
                                                <span className="toggle-label">System Maintenance</span>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" checked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="shared-media">
                                    <h4 className="section-title">Shared Media</h4>
                                    <div className="media-tabs">
                                        <button className="media-tab active">Files</button>
                                        <button className="media-tab">Images</button>
                                        <button className="media-tab">Links</button>
                                    </div>
                                    <div className="media-grid">
                                        <div className="media-item">
                                            <FaFilePdf className="media-icon" />
                                            <span className="media-name">Prescription.pdf</span>
                                        </div>
                                        <div className="media-item">
                                            <FaImage className="media-icon" />
                                            <span className="media-name">Medication.jpg</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyCommunication;
