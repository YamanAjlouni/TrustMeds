// components/SearchFilters.jsx
import React from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaCaretDown } from 'react-icons/fa';

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
    return (
        <>
            {isMobile && (
                <button
                    className="filters-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <span><FaFilter /> Filters</span>
                    <FaCaretDown className={`toggle-icon ${showFilters ? 'open' : ''}`} />
                </button>
            )}

            <div className={`prescriptions-toolbar ${isMobile && !showFilters ? '' : 'visible'}`}>
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>

                <div className="filters">
                    <div className="filter date-filter">
                        <div className="filter-label">
                            <FaCalendarAlt /> Date:
                        </div>
                        <div className="date-buttons">
                            <button
                                className={`date-btn ${dateFilter === 'all' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('all')}
                            >
                                All Time
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'today' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('today')}
                            >
                                Today
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'week' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('week')}
                            >
                                This Week
                            </button>
                            <button
                                className={`date-btn ${dateFilter === 'month' ? 'active' : ''}`}
                                onClick={() => handleDateFilterChange('month')}
                            >
                                This Month
                            </button>
                        </div>
                    </div>

                    <div className="filter status-filter">
                        <span className="filter-label">
                            <FaFilter /> Status:
                        </span>
                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="status-select"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Filled">Filled</option>
                            <option value="Pending Pickup">Pending Pickup</option>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Declined">Declined</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};
