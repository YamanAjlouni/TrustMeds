// components/StatusBadge.jsx
import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

export const StatusBadge = ({ status }) => {
    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Filled':
                return <FaCheckCircle className="status-icon filled" />;
            case 'Pending Pickup':
                return <FaHourglassHalf className="status-icon pending" />;
            case 'Pending Approval':
                return <FaExclamationCircle className="status-icon approval" />;
            case 'Declined':
                return <FaTimesCircle className="status-icon declined" />;
            default:
                return null;
        }
    };

    // Get status class
    const getStatusClass = (status) => {
        return status.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className={`status-badge ${getStatusClass(status)}`}>
            {getStatusIcon(status)}
            <span>{status}</span>
        </div>
    );
};
