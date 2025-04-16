// DoctorCommunication.jsx - Main container component
import React, { useState, useEffect } from 'react';
import './DoctorCommunication.scss';
import { MobileNav } from './components/MobileNav/MobileNav';
import { ContactsSidebar } from './components/ContactsSidebar/ContactsSidebar';
import { ChatArea } from './components/ChatArea/ChatArea';
import { contactsData } from '../../../data/contactsData';
import { messagesData } from '../../../data/messagesData';

const DoctorCommunication = () => {
    const [contacts, setContacts] = useState(contactsData);
    const [messages, setMessages] = useState(messagesData);
    const [selectedContact, setSelectedContact] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [mobileView, setMobileView] = useState('contacts'); // 'contacts' or 'chat'
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Check if screen is mobile size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setMobileView('both');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize on component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Filter contacts based on search term and status
    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Select a contact to view conversation
    const handleSelectContact = (id) => {
        setSelectedContact(id);
        // Mark messages as read when selecting a contact
        setContacts(contacts.map(c =>
            c.id === id ? { ...c, unread: 0 } : c
        ));

        // On mobile, switch to chat view when a contact is selected
        if (isMobile) {
            setMobileView('chat');
        }
    };

    // Send a new message
    const handleSendMessage = (text) => {
        if (text.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'doctor',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);

        // Update last message in contacts
        setContacts(contacts.map(c =>
            c.id === selectedContact
                ? {
                    ...c,
                    lastMessage: text,
                    timestamp: 'Just now'
                }
                : c
        ));
    };

    // Get the selected contact
    const getSelectedContact = () => {
        return contacts.find(c => c.id === selectedContact);
    };

    // Handle back button on mobile
    const handleBackToContacts = () => {
        setMobileView('contacts');
    };

    return (
        <div className="doctor-communication">
            <div className="communication-container">
                {/* Mobile navigation bar */}
                {isMobile && (
                    <MobileNav
                        currentView={mobileView}
                        onBackClick={handleBackToContacts}
                        selectedContact={getSelectedContact()}
                    />
                )}

                {/* Left sidebar with contacts - hidden on mobile when in chat view */}
                <div className={`contacts-wrapper ${isMobile && mobileView === 'chat' ? 'hidden' : ''}`}>
                    <ContactsSidebar
                        contacts={filteredContacts}
                        selectedContact={selectedContact}
                        searchTerm={searchTerm}
                        filterStatus={filterStatus}
                        onSelectContact={handleSelectContact}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        onFilterChange={(e) => setFilterStatus(e.target.value)}
                    />
                </div>

                {/* Right chat area - hidden on mobile when in contacts view */}
                <div className={`chat-wrapper ${isMobile && mobileView === 'contacts' ? 'hidden' : ''}`}>
                    <ChatArea
                        contact={getSelectedContact()}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isMobile={isMobile}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoctorCommunication;