// components/MobileNav.jsx
import React from 'react';
import { FaArrowLeft, FaCircle } from 'react-icons/fa';
import { getInitials, getAvatarColor, getStatusColorClass } from '../../../../../utils/helpers';

export const MobileNav = ({ currentView, onBackClick, selectedContact }) => {
    // Only show back button when in chat view
    if (currentView === 'contacts') {
        return (
            <div className="mobile-nav">
                <h2>Messages</h2>
            </div>
        );
    }

    return (
        <div className="mobile-nav">
            <button className="back-button" onClick={onBackClick}>
                <FaArrowLeft />
            </button>
            
            {selectedContact && (
                <div className="mobile-contact-info">
                    <div className="avatar-mini">
                        <div
                            className="avatar-placeholder"
                            style={{ backgroundColor: getAvatarColor(selectedContact.name) }}
                        >
                            {getInitials(selectedContact.name)}
                        </div>
                    </div>
                    <div className="contact-details">
                        <span className="contact-name">{selectedContact.name}</span>
                        <span className={`status-indicator ${getStatusColorClass(selectedContact.status)}`}>
                            <FaCircle />
                            <span className="status-text">
                                {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1).replace('-', ' ')}
                            </span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};