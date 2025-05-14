// components/SearchFilters/SearchFilters.jsx
import React from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaCaretDown } from 'react-icons/fa';
import { useLanguage } from '../../../../../context/LanguageContext';

export const SearchFilters = ({
    isMobile,
    showFilters,
    setShowFilters,
    searchTerm,
    handleSearch,
    dateFilter,
    handleDateFilterChange,
    statusFilter,
    handleStatusFilterChange
}) => {
    const { t } = useLanguage();

    return (
        <>
            {isMobile && (
                <button
                    className="filters-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <span><FaFilter /> {t('doctorPage.prescriptionHistory.filters.title')}</span>
                    <FaCaretDown className={`toggle-icon ${showFilters ? 'open' : ''}`} />
                </button>
            )}

            <div className={`prescriptions-toolbar ${isMobile && !showFilters ? '' : 'visible'}`}>
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={t('doctorPage.prescriptionHistory.searchPlaceholder')}
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>

                <div className="filters">
                    <div className="filter date-filter">
                        <div className="filter-label">
                            <FaCalendarAlt /> {t('doctorPage.prescriptionHistory.filters.date')}:
                        </div>
                        <div className="date-buttons">
                            <button
                                className={`date-btn ${dateFilter === 'all' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('all')}
                            >
                                {t('doctorPage.prescriptionHistory.dateFilters.allTime')}
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'today' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('today')}
                            >
                                {t('doctorPage.prescriptionHistory.dateFilters.today')}
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'week' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('week')}
                            >
                                {t('doctorPage.prescriptionHistory.dateFilters.thisWeek')}
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'month' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('month')}
                            >
                                {t('doctorPage.prescriptionHistory.dateFilters.thisMonth')}
                            </button>
                        </div>
                    </div>

                    <div className="filter status-filter">
                        <span className="filter-label">
                            <FaFilter /> {t('doctorPage.prescriptionHistory.filters.status')}:
                        </span>
                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="status-select"
                        >
                            <option value="all">{t('doctorPage.prescriptionHistory.statusFilters.allStatuses')}</option>
                            <option value="Filled">{t('doctorPage.prescriptionHistory.statusFilters.filled')}</option>
                            <option value="Pending Pickup">{t('doctorPage.prescriptionHistory.statusFilters.pendingPickup')}</option>
                            <option value="Pending Approval">{t('doctorPage.prescriptionHistory.statusFilters.pendingApproval')}</option>
                            <option value="Declined">{t('doctorPage.prescriptionHistory.statusFilters.declined')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};