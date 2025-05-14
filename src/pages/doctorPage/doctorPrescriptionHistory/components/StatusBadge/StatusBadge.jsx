// components/StatusBadge/StatusBadge.jsx
import { FaCheckCircle, FaHourglassHalf, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';
import { useLanguage } from '../../../../../context/LanguageContext';

export const StatusBadge = ({ status }) => {
    const { t } = useLanguage();
    
    // Get translated status
    const getTranslatedStatus = (status) => {
        switch (status) {
            case 'Filled':
                return t('doctorPage.prescriptionHistory.statusLabels.filled');
            case 'Pending Pickup':
                return t('doctorPage.prescriptionHistory.statusLabels.pendingPickup');
            case 'Pending Approval':
                return t('doctorPage.prescriptionHistory.statusLabels.pendingApproval');
            case 'Declined':
                return t('doctorPage.prescriptionHistory.statusLabels.declined');
            default:
                return status;
        }
    };
    
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
            <span>{getTranslatedStatus(status)}</span>
        </div>
    );
};