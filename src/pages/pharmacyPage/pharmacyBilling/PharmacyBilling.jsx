import React, { useState, useEffect } from 'react';
import './PharmacyBilling.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language hook
import {
    FaFileInvoiceDollar,
    FaMoneyBillWave,
    FaCreditCard,
    FaIdCard,
    FaSearch,
    FaCalendarAlt,
    FaSyncAlt,
    FaChartLine,
    FaDownload,
    FaPrint,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaChevronDown,
    FaChevronUp,
    FaFilter
} from 'react-icons/fa';

const PharmacyBilling = () => {
    // Get language context
    const { t, isRTL } = useLanguage();

    // State
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        paymentMethod: 'all', // 'all', 'insurance', 'cash', 'card'
        status: 'all', // 'all', 'completed', 'pending', 'failed'
        sort: 'newest' // 'newest', 'oldest', 'amount'
    });

    // Sample billing data
    const [billingStats, setBillingStats] = useState({
        totalRevenue: '$5,834.50',
        insuranceClaims: '$3,546.75',
        cashPayments: '$987.25',
        cardPayments: '$1,300.50',
        pendingClaims: '$432.75',
        transactionsToday: 38
    });

    // Sample transaction data
    const [recentTransactions, setRecentTransactions] = useState([
        // Keep the same transaction data
        {
            id: 'TRX-20250417-001',
            date: '2025-04-17',
            patient: {
                name: 'Ahmed Hassan',
                id: 'PT-54321'
            },
            prescription: 'RX-20250417-001D',
            paymentMethod: 'Insurance',
            insuranceProvider: 'HealthPlus',
            policyNumber: 'HP-987654321',
            totalAmount: '$45.75',
            patientPaid: '$15.00',
            insuranceCovered: '$30.75',
            status: 'Completed',
            details: [
                { item: 'Amoxicillin 500mg', quantity: 21, price: '$31.50' },
                { item: 'Paracetamol 500mg', quantity: 12, price: '$14.25' }
            ]
        },
        // Continue with the rest of your transaction data
    ]);

    // Sample insurance claims
    const [insuranceClaims, setInsuranceClaims] = useState([
        // Keep the same insurance data
        {
            id: 'CLM-20250417-001',
            date: '2025-04-17',
            patient: {
                name: 'Ahmed Hassan',
                id: 'PT-54321'
            },
            prescription: 'RX-20250417-001D',
            insuranceProvider: 'HealthPlus',
            policyNumber: 'HP-987654321',
            claimAmount: '$30.75',
            status: 'Approved',
            submittedDate: '2025-04-17',
            approvedDate: '2025-04-17',
            reimbursementDate: '2025-04-19',
            notes: ''
        },
        // Continue with the rest of your insurance data
    ]);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle date range change
    const handleDateRangeChange = (type, value) => {
        setDateRange({
            ...dateRange,
            [type]: value
        });
    };

    // Filter transactions based on search and filters
    const filteredTransactions = recentTransactions.filter(transaction => {
        // Search term filter
        const matchesSearch =
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.prescription.toLowerCase().includes(searchTerm.toLowerCase());

        // Payment method filter
        const matchesPaymentMethod =
            filterOptions.paymentMethod === 'all' ||
            transaction.paymentMethod.toLowerCase() === filterOptions.paymentMethod.toLowerCase();

        // Status filter
        const matchesStatus =
            filterOptions.status === 'all' ||
            transaction.status.toLowerCase() === filterOptions.status.toLowerCase();

        // Date range filter
        let matchesDateRange = true;
        if (dateRange.startDate && dateRange.endDate) {
            const transactionDate = new Date(transaction.date);
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            // Adjust end date to include the full day
            end.setHours(23, 59, 59, 999);
            matchesDateRange = transactionDate >= start && transactionDate <= end;
        }

        return matchesSearch && matchesPaymentMethod && matchesStatus && matchesDateRange;
    });

    // Sort transactions
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (filterOptions.sort === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (filterOptions.sort === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        } else if (filterOptions.sort === 'amount') {
            // Remove currency symbol and convert to number for sorting
            const amountA = parseFloat(a.totalAmount.replace(/[^0-9.-]+/g, ''));
            const amountB = parseFloat(b.totalAmount.replace(/[^0-9.-]+/g, ''));
            return amountB - amountA;
        }
        return 0;
    });

    // Format date with proper locale
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Render overview tab content
    const renderOverviewContent = () => {
        return (
            <div className="billing-overview">
                <div className="stats-section">
                    <div className="stat-card total-revenue">
                        <div className="stat-icon">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="stat-content">
                            <h4>{t('pharmacyPage.billing.overview.stats.totalRevenue.title')}</h4>
                            <p className="stat-value">{billingStats.totalRevenue}</p>
                            <p className="stat-meta">{billingStats.transactionsToday} {t('pharmacyPage.billing.overview.stats.totalRevenue.transactionsToday')}</p>
                        </div>
                    </div>

                    <div className="stat-card insurance">
                        <div className="stat-icon">
                            <FaIdCard />
                        </div>
                        <div className="stat-content">
                            <h4>{t('pharmacyPage.billing.overview.stats.insuranceClaims.title')}</h4>
                            <p className="stat-value">{billingStats.insuranceClaims}</p>
                            <p className="stat-meta">{t('pharmacyPage.billing.overview.stats.insuranceClaims.pending')}: {billingStats.pendingClaims}</p>
                        </div>
                    </div>

                    <div className="stat-card cash">
                        <div className="stat-icon">
                            <FaMoneyBillWave />
                        </div>
                        <div className="stat-content">
                            <h4>{t('pharmacyPage.billing.overview.stats.cashPayments.title')}</h4>
                            <p className="stat-value">{billingStats.cashPayments}</p>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon">
                            <FaCreditCard />
                        </div>
                        <div className="stat-content">
                            <h4>{t('pharmacyPage.billing.overview.stats.cardPayments.title')}</h4>
                            <p className="stat-value">{billingStats.cardPayments}</p>
                        </div>
                    </div>
                </div>

                <div className="chart-section">
                    <div className="section-header">
                        <h3>{t('pharmacyPage.billing.overview.chart.title')}</h3>
                        <div className="time-filter">
                            <button className="time-filter-btn active">{t('pharmacyPage.billing.overview.chart.timeFilter.week')}</button>
                            <button className="time-filter-btn">{t('pharmacyPage.billing.overview.chart.timeFilter.month')}</button>
                            <button className="time-filter-btn">{t('pharmacyPage.billing.overview.chart.timeFilter.quarter')}</button>
                        </div>
                    </div>
                    <div className="revenue-chart">
                        <div className="chart-placeholder">
                            <FaChartLine className="chart-icon" />
                            <p>{t('pharmacyPage.billing.overview.chart.placeholder.title')}</p>
                            <span className="chart-note">{t('pharmacyPage.billing.overview.chart.placeholder.note')}</span>
                        </div>
                    </div>
                </div>

                <div className="recent-transactions-section">
                    <div className="section-header">
                        <h3>{t('pharmacyPage.billing.overview.recentTransactions.title')}</h3>
                        <button className="view-all-btn" onClick={() => setActiveTab('transactions')}>
                            {t('pharmacyPage.billing.overview.recentTransactions.viewAll')}
                        </button>
                    </div>
                    <div className="transactions-list">
                        {recentTransactions.slice(0, 3).map(transaction => (
                            <div className="transaction-card" key={transaction.id}>
                                <div className="transaction-header">
                                    <div className="transaction-id">
                                        <h4>{transaction.id}</h4>
                                        <span className="transaction-date">{formatDate(transaction.date)}</span>
                                    </div>
                                    <div className="transaction-status">
                                        <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                                            {transaction.status === 'Completed' && <FaCheckCircle />}
                                            {transaction.status === 'Pending' && <FaExclamationTriangle />}
                                            {transaction.status === 'Failed' && <FaTimesCircle />}
                                            {t(`pharmacyPage.billing.statuses.${transaction.status.toLowerCase()}`)}
                                        </span>
                                    </div>
                                </div>
                                <div className="transaction-details">
                                    <div className="detail-group">
                                        <span className="detail-label">{t('pharmacyPage.billing.overview.recentTransactions.patient')}</span>
                                        <span className="detail-value">{transaction.patient.name}</span>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">{t('pharmacyPage.billing.overview.recentTransactions.prescription')}</span>
                                        <span className="detail-value">{transaction.prescription}</span>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">{t('pharmacyPage.billing.overview.recentTransactions.payment')}</span>
                                        <span className="detail-value">{transaction.paymentMethod}</span>
                                    </div>
                                    <div className="detail-group amount">
                                        <span className="detail-label">{t('pharmacyPage.billing.overview.recentTransactions.amount')}</span>
                                        <span className="detail-value">{transaction.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="insurance-section">
                    <div className="section-header">
                        <h3>{t('pharmacyPage.billing.overview.insuranceClaims.title')}</h3>
                        <button className="view-all-btn" onClick={() => setActiveTab('insurance')}>
                            {t('pharmacyPage.billing.overview.insuranceClaims.viewAll')}
                        </button>
                    </div>
                    <div className="insurance-summary">
                        <div className="summary-item approved">
                            <div className="summary-icon">
                                <FaCheckCircle />
                            </div>
                            <div className="summary-content">
                                <h4>{t('pharmacyPage.billing.overview.insuranceClaims.approved')}</h4>
                                <p className="summary-value">1</p>
                            </div>
                        </div>
                        <div className="summary-item pending">
                            <div className="summary-icon">
                                <FaExclamationTriangle />
                            </div>
                            <div className="summary-content">
                                <h4>{t('pharmacyPage.billing.overview.insuranceClaims.pending')}</h4>
                                <p className="summary-value">1</p>
                            </div>
                        </div>
                        <div className="summary-item rejected">
                            <div className="summary-icon">
                                <FaTimesCircle />
                            </div>
                            <div className="summary-content">
                                <h4>{t('pharmacyPage.billing.overview.insuranceClaims.rejected')}</h4>
                                <p className="summary-value">1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render transactions tab content
    const renderTransactionsContent = () => {
        return (
            <div className="transactions-content">
                <div className="filter-bar">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('pharmacyPage.billing.transactions.search.placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label htmlFor="payment-filter">{t('pharmacyPage.billing.transactions.filters.payment.label')}</label>
                            <select
                                id="payment-filter"
                                value={filterOptions.paymentMethod}
                                onChange={(e) => setFilterOptions({ ...filterOptions, paymentMethod: e.target.value })}
                                className="filter-select"
                            >
                                <option value="all">{t('pharmacyPage.billing.transactions.filters.payment.options.all')}</option>
                                <option value="insurance">{t('pharmacyPage.billing.transactions.filters.payment.options.insurance')}</option>
                                <option value="cash">{t('pharmacyPage.billing.transactions.filters.payment.options.cash')}</option>
                                <option value="card">{t('pharmacyPage.billing.transactions.filters.payment.options.card')}</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="status-filter">{t('pharmacyPage.billing.transactions.filters.status.label')}</label>
                            <select
                                id="status-filter"
                                value={filterOptions.status}
                                onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
                                className="filter-select"
                            >
                                <option value="all">{t('pharmacyPage.billing.transactions.filters.status.options.all')}</option>
                                <option value="completed">{t('pharmacyPage.billing.transactions.filters.status.options.completed')}</option>
                                <option value="pending">{t('pharmacyPage.billing.transactions.filters.status.options.pending')}</option>
                                <option value="failed">{t('pharmacyPage.billing.transactions.filters.status.options.failed')}</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="date-range">{t('pharmacyPage.billing.transactions.filters.dateRange.label')}</label>
                            <div className="date-inputs">
                                <div className="date-input-wrapper">
                                    <FaCalendarAlt className="calendar-icon" />
                                    <input
                                        type="date"
                                        value={dateRange.startDate}
                                        onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                                        className="date-input"
                                    />
                                </div>
                                <span className="date-separator">{t('pharmacyPage.billing.transactions.filters.dateRange.to')}</span>
                                <div className="date-input-wrapper">
                                    <FaCalendarAlt className="calendar-icon" />
                                    <input
                                        type="date"
                                        value={dateRange.endDate}
                                        onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                                        className="date-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort-filter">{t('pharmacyPage.billing.transactions.filters.sort.label')}</label>
                            <select
                                id="sort-filter"
                                value={filterOptions.sort}
                                onChange={(e) => setFilterOptions({ ...filterOptions, sort: e.target.value })}
                                className="filter-select"
                            >
                                <option value="newest">{t('pharmacyPage.billing.transactions.filters.sort.options.newest')}</option>
                                <option value="oldest">{t('pharmacyPage.billing.transactions.filters.sort.options.oldest')}</option>
                                <option value="amount">{t('pharmacyPage.billing.transactions.filters.sort.options.amount')}</option>
                            </select>
                        </div>

                        <button className="refresh-btn">
                            <FaSyncAlt /> {t('pharmacyPage.billing.transactions.filters.refresh')}
                        </button>
                    </div>
                </div>

                <div className="transactions-results">
                    <div className="results-header">
                        <h3>{t('pharmacyPage.billing.transactions.results.title')} ({sortedTransactions.length})</h3>
                        <div className="export-options">
                            <button className="export-btn">
                                <FaDownload /> {t('pharmacyPage.billing.transactions.results.export')}
                            </button>
                            <button className="print-btn">
                                <FaPrint /> {t('pharmacyPage.billing.transactions.results.print')}
                            </button>
                        </div>
                    </div>

                    {sortedTransactions.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <FaFileInvoiceDollar />
                            </div>
                            <h3>{t('pharmacyPage.billing.transactions.results.noResults.title')}</h3>
                            <p>
                                {searchTerm
                                    ? `${t('pharmacyPage.billing.transactions.results.noResults.withSearch')} "${searchTerm}"`
                                    : t('pharmacyPage.billing.transactions.results.noResults.noItems')}
                            </p>
                            {searchTerm && (
                                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                    {t('pharmacyPage.billing.transactions.results.noResults.clearSearch')}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="transactions-table-container">
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.id')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.date')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.patient')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.prescription')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.paymentMethod')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.amount')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.status')}</th>
                                        <th>{t('pharmacyPage.billing.transactions.table.headers.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTransactions.map(transaction => (
                                        <tr key={transaction.id} className={transaction.status.toLowerCase()}>
                                            <td className="id-cell">{transaction.id}</td>
                                            <td>{formatDate(transaction.date)}</td>
                                            <td className="patient-cell">
                                                <div className="cell-with-meta">
                                                    <span className="primary-text">{transaction.patient.name}</span>
                                                    <span className="secondary-text">{transaction.patient.id}</span>
                                                </div>
                                            </td>
                                            <td>{transaction.prescription}</td>
                                            <td>
                                                <span className={`payment-badge ${transaction.paymentMethod.toLowerCase()}`}>
                                                    {transaction.paymentMethod === 'Insurance' && <FaIdCard />}
                                                    {transaction.paymentMethod === 'Cash' && <FaMoneyBillWave />}
                                                    {transaction.paymentMethod === 'Card' && <FaCreditCard />}
                                                    {transaction.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="amount-cell">{transaction.totalAmount}</td>
                                            <td>
                                                <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                                                    {transaction.status === 'Completed' && <FaCheckCircle />}
                                                    {transaction.status === 'Pending' && <FaExclamationTriangle />}
                                                    {transaction.status === 'Failed' && <FaTimesCircle />}
                                                    {t(`pharmacyPage.billing.statuses.${transaction.status.toLowerCase()}`)}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn view-btn">
                                                    <FaEye /> {t('pharmacyPage.billing.transactions.table.actions.view')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="transaction-details">
                    <div className="transaction-detail-card expanded">
                        <div className="card-header" onClick={() => { }}>
                            <h3>{t('pharmacyPage.billing.transactions.details.title')}</h3>
                            <button className="toggle-btn">
                                <FaChevronUp />
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="detail-note">{t('pharmacyPage.billing.transactions.details.note')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render insurance tab content
    const renderInsuranceContent = () => {
        return (
            <div className="insurance-content">
                <div className="filter-bar">
                    <div className="search-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('pharmacyPage.billing.insurance.search.placeholder')}
                            className="search-input"
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label htmlFor="insurance-filter">{t('pharmacyPage.billing.insurance.filters.provider.label')}</label>
                            <select
                                id="insurance-filter"
                                className="filter-select"
                            >
                                <option value="all">{t('pharmacyPage.billing.insurance.filters.provider.options.all')}</option>
                                <option value="healthplus">HealthPlus</option>
                                <option value="nationalcare">NationalCare</option>
                                <option value="seniorcare">SeniorCare+</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="claim-status-filter">{t('pharmacyPage.billing.insurance.filters.status.label')}</label>
                            <select
                                id="claim-status-filter"
                                className="filter-select"
                            >
                                <option value="all">{t('pharmacyPage.billing.insurance.filters.status.options.all')}</option>
                                <option value="approved">{t('pharmacyPage.billing.insurance.filters.status.options.approved')}</option>
                                <option value="pending">{t('pharmacyPage.billing.insurance.filters.status.options.pending')}</option>
                                <option value="rejected">{t('pharmacyPage.billing.insurance.filters.status.options.rejected')}</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="claim-date-range">{t('pharmacyPage.billing.insurance.filters.dateRange.label')}</label>
                            <div className="date-inputs">
                                <div className="date-input-wrapper">
                                    <FaCalendarAlt className="calendar-icon" />
                                    <input
                                        type="date"
                                        className="date-input"
                                    />
                                </div>
                                <span className="date-separator">{t('pharmacyPage.billing.insurance.filters.dateRange.to')}</span>
                                <div className="date-input-wrapper">
                                    <FaCalendarAlt className="calendar-icon" />
                                    <input
                                        type="date"
                                        className="date-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="refresh-btn">
                            <FaSyncAlt /> {t('pharmacyPage.billing.insurance.filters.refresh')}
                        </button>
                    </div>
                </div>

                <div className="insurance-results">
                    <div className="results-header">
                        <h3>{t('pharmacyPage.billing.insurance.results.title')} ({insuranceClaims.length})</h3>
                        <div className="export-options">
                            <button className="export-btn">
                                <FaDownload /> {t('pharmacyPage.billing.insurance.results.export')}
                            </button>
                            <button className="print-btn">
                                <FaPrint /> {t('pharmacyPage.billing.insurance.results.print')}
                            </button>
                        </div>
                    </div>

                    <div className="insurance-table-container">
                        <table className="insurance-table">
                            <thead>
                                <tr>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.id')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.date')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.patient')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.prescription')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.provider')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.policyNumber')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.amount')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.status')}</th>
                                    <th>{t('pharmacyPage.billing.insurance.table.headers.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insuranceClaims.map(claim => (
                                    <tr key={claim.id} className={claim.status.toLowerCase()}>
                                        <td className="id-cell">{claim.id}</td>
                                        <td>{formatDate(claim.date)}</td>
                                        <td className="patient-cell">
                                            <div className="cell-with-meta">
                                                <span className="primary-text">{claim.patient.name}</span>
                                                <span className="secondary-text">{claim.patient.id}</span>
                                            </div>
                                        </td>
                                        <td>{claim.prescription}</td>
                                        <td>{claim.insuranceProvider}</td>
                                        <td>{claim.policyNumber}</td>
                                        <td className="amount-cell">{claim.claimAmount}</td>
                                        <td>
                                            <span className={`status-badge ${claim.status.toLowerCase()}`}>
                                                {claim.status === 'Approved' && <FaCheckCircle />}
                                                {claim.status === 'Pending' && <FaExclamationTriangle />}
                                                {claim.status === 'Rejected' && <FaTimesCircle />}
                                                {t(`pharmacyPage.billing.statuses.${claim.status.toLowerCase()}`)}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="action-btn view-btn">
                                                <FaEye /> {t('pharmacyPage.billing.insurance.table.actions.view')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="claim-details">
                    <div className="claim-detail-card expanded">
                        <div className="card-header" onClick={() => { }}>
                            <h3>{t('pharmacyPage.billing.insurance.details.title')}</h3>
                            <button className="toggle-btn">
                                <FaChevronUp />
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="detail-note">{t('pharmacyPage.billing.insurance.details.note')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render the appropriate tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverviewContent();
            case 'transactions':
                return renderTransactionsContent();
            case 'insurance':
                return renderInsuranceContent();
            default:
                return renderOverviewContent();
        }
    };

    return (
        <div className="pharmacy-billing">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('pharmacyPage.billing.loading')}</p>
                </div>
            ) : (
                <div className="billing-container">
                    <div className="page-header">
                        <h1>{t('pharmacyPage.billing.pageTitle')}</h1>
                        <p>{t('pharmacyPage.billing.pageSubtitle')}</p>
                    </div>

                    <div className="billing-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <FaChartLine /> {t('pharmacyPage.billing.tabs.overview')}
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transactions')}
                        >
                            <FaFileInvoiceDollar /> {t('pharmacyPage.billing.tabs.transactions')}
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('insurance')}
                        >
                            <FaIdCard /> {t('pharmacyPage.billing.tabs.insurance')}
                        </button>
                    </div>

                    <div className="tab-content">
                        {renderTabContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyBilling;