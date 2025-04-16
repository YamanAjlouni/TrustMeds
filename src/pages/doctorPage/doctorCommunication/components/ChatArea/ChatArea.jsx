// components/ChatArea.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaCircle, FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import { getInitials, getAvatarColor, getStatusColorClass } from '../../../../../utils/helpers';

export const ChatArea = ({
    contact,
    messages,
    onSendMessage,
    isMobile
}) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        onSendMessage(newMessage);
        setNewMessage('');
    };

    // If no contact is selected
    if (!contact) {
        return (
            <div className="chat-area">
                <div className="no-chat-selected">
                    <h3>Select a conversation to start messaging</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-area">
            <div className="chat-header">
                <div className="chat-contact-info">
                    <div className="contact-avatar">
                        <div
                            className="avatar-placeholder"
                            style={{ backgroundColor: getAvatarColor(contact.name) }}
                        >
                            {getInitials(contact.name)}
                        </div>
                        <span className={`status-indicator ${getStatusColorClass(contact.status)}`}>
                            <FaCircle />
                        </span>
                    </div>
                    <div className="contact-details">
                        <h3>{contact.name}</h3>
                        <span className={`patient-status ${getStatusColorClass(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace('-', ' ')}
                        </span>
                    </div>
                </div>
                <div className="chat-actions">
                    <button className="btn-action view-records">
                        {isMobile ? 'Records' : 'View Medical Records'}
                    </button>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <div className="message-content">
                            <p>{message.text}</p>
                            <span className="message-time">{message.timestamp}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn">
                    <FaPaperclip />
                </button>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};