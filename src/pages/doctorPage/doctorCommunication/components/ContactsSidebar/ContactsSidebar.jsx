// components/ContactsSidebar.jsx
import React from 'react';
import { FaSearch, FaFilter, FaCircle } from 'react-icons/fa';
import { getInitials, getAvatarColor, getStatusColorClass } from '../../../../../utils/helpers';

export const ContactsSidebar = ({
    contacts,
    selectedContact,
    searchTerm,
    filterStatus,
    onSelectContact,
    onSearchChange,
    onFilterChange
}) => {
    return (
        <div className="contacts-sidebar">
            <div className="contacts-header">
                <h2>Messages</h2>
                <div className="contacts-search">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                </div>
                <div className="contacts-filter">
                    <div className="filter-button">
                        <FaFilter />
                        <select value={filterStatus} onChange={onFilterChange}>
                            <option value="all">All</option>
                            <option value="urgent">Urgent</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="stable">Stable</option>
                            <option value="med-adjust">Med Adjustment</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="contacts-list">
                {contacts.length === 0 ? (
                    <div className="no-contacts">
                        <p>No contacts match your search</p>
                    </div>
                ) : (
                    contacts.map(contact => (
                        <div
                            key={contact.id}
                            className={`contact-item ${selectedContact === contact.id ? 'selected' : ''}`}
                            onClick={() => onSelectContact(contact.id)}
                        >
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
                            <div className="contact-info">
                                <div className="contact-header">
                                    <h4>{contact.name}</h4>
                                    <span className="timestamp">{contact.timestamp}</span>
                                </div>
                                <div className="contact-message">
                                    <p>{contact.lastMessage}</p>
                                    {contact.unread > 0 && (
                                        <span className="unread-badge">{contact.unread}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};