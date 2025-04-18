import React, { useState, useEffect } from 'react';
import './PharmacyBilling.scss';
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

    const [recentTransactions, setRecentTransactions] = useState([
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
        {
            id: 'TRX-20250417-002',
            date: '2025-04-17',
            patient: {
                name: 'Layla Ibrahim',
                id: 'PT-65432'
            },
            prescription: 'RX-20250417-002D',
            paymentMethod: 'Card',
            cardType: 'Visa',
            cardLast4: '4567',
            totalAmount: '$65.25',
            status: 'Completed',
            details: [
                { item: 'Metformin 500mg', quantity: 60, price: '$42.00' },
                { item: 'Glimepiride 2mg', quantity: 30, price: '$23.25' }
            ]
        },
        {
            id: 'TRX-20250416-003',
            date: '2025-04-16',
            patient: {
                name: 'Omar Khalid',
                id: 'PT-76543'
            },
            prescription: 'RX-20250416-003D',
            paymentMethod: 'Cash',
            totalAmount: '$18.50',
            status: 'Completed',
            details: [
                { item: 'Fluticasone 50mcg', quantity: 1, price: '$18.50' }
            ]
        },
        {
            id: 'TRX-20250416-004',
            date: '2025-04-16',
            patient: {
                name: 'Fatima Al-Sayed',
                id: 'PT-87654'
            },
            prescription: 'RX-20250416-004D',
            paymentMethod: 'Insurance',
            insuranceProvider: 'SeniorCare+',
            policyNumber: 'SC-789123456',
            totalAmount: '$125.50',
            patientPaid: '$0.00',
            insuranceCovered: '$125.50',
            status: 'Pending',
            details: [
                { item: 'Lisinopril 10mg', quantity: 30, price: '$24.75' },
                { item: 'Metoprolol 25mg', quantity: 60, price: '$53.50' },
                { item: 'Furosemide 20mg', quantity: 30, price: '$47.25' }
            ]
        },
        {
            id: 'TRX-20250415-005',
            date: '2025-04-15',
            patient: {
                name: 'Samir Ali',
                id: 'PT-98765'
            },
            prescription: 'RX-20250415-005D',
            paymentMethod: 'Card',
            cardType: 'Mastercard',
            cardLast4: '7890',
            totalAmount: '$95.25',
            status: 'Failed',
            details: [
                { item: 'Insulin Glargine 100u/ml', quantity: 1, price: '$95.25' }
            ]
        }
    ]);

    const [insuranceClaims, setInsuranceClaims] = useState([
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
        {
            id: 'CLM-20250416-002',
            date: '2025-04-16',
            patient: {
                name: 'Fatima Al-Sayed',
                id: 'PT-87654'
            },
            prescription: 'RX-20250416-004D',
            insuranceProvider: 'SeniorCare+',
            policyNumber: 'SC-789123456',
            claimAmount: '$125.50',
            status: 'Pending',
            submittedDate: '2025-04-16',
            notes: 'Waiting for insurance approval'
        },
        {
            id: 'CLM-20250414-003',
            date: '2025-04-14',
            patient: {
                name: 'Nour Hammad',
                id: 'PT-12345'
            },
            prescription: 'RX-20250414-006D',
            insuranceProvider: 'NationalCare',
            policyNumber: 'NC-456789123',
            claimAmount: '$78.50',
            status: 'Rejected',
            submittedDate: '2025-04-14',
            rejectedDate: '2025-04-15',
            notes: 'Policy expired. Contact patient for payment'
        }
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
            // Remove commas and convert to number for sorting
            const amountA = parseFloat(a.totalAmount.replace(/,/g, ''));
            const amountB = parseFloat(b.totalAmount.replace(/,/g, ''));
            return amountB - amountA;
        }
        return 0;
    });


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
                            <h4>Total Revenue (7 days)</h4>
                            <p className="stat-value">{billingStats.totalRevenue}</p>
                            <p className="stat-meta">{billingStats.transactionsToday} transactions today</p>
                        </div>
                    </div>

                    <div className="stat-card insurance">
                        <div className="stat-icon">
                            <FaIdCard />
                        </div>
                        <div className="stat-content">
                            <h4>Insurance Claims</h4>
                            <p className="stat-value">{billingStats.insuranceClaims}</p>
                            <p className="stat-meta">Pending: {billingStats.pendingClaims}</p>
                        </div>
                    </div>

                    <div className="stat-card cash">
                        <div className="stat-icon">
                            <FaMoneyBillWave />
                        </div>
                        <div className="stat-content">
                            <h4>Cash Payments</h4>
                            <p className="stat-value">{billingStats.cashPayments}</p>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon">
                            <FaCreditCard />
                        </div>
                        <div className="stat-content">
                            <h4>Card Payments</h4>
                            <p className="stat-value">{billingStats.cardPayments}</p>
                        </div>
                    </div>
                </div>

                <div className="chart-section">
                    <div className="section-header">
                        <h3>Revenue Overview</h3>
                        <div className="time-filter">
                            <button className="time-filter-btn active">Week</button>
                            <button className="time-filter-btn">Month</button>
                            <button className="time-filter-btn">Quarter</button>
                        </div>
                    </div>
                    <div className="revenue-chart">
                        <div className="chart-placeholder">
                            <FaChartLine className="chart-icon" />
                            <p>Weekly Revenue Chart</p>
                            <span className="chart-note">Data visualization would be integrated here</span>
                        </div>
                    </div>
                </div>

                <div className="recent-transactions-section">
                    <div className="section-header">
                        <h3>Recent Transactions</h3>
                        <button className="view-all-btn" onClick={() => setActiveTab('transactions')}>View All</button>
                    </div>
                    <div className="transactions-list">
                        {recentTransactions.slice(0, 3).map(transaction => (
                            <div className="transaction-card" key={transaction.id}>
                                <div className="transaction-header">
                                    <div className="transaction-id">
                                        <h4>{transaction.id}</h4>
                                        <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="transaction-status">
                                        <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                                            {transaction.status === 'Completed' && <FaCheckCircle />}
                                            {transaction.status === 'Pending' && <FaExclamationTriangle />}
                                            {transaction.status === 'Failed' && <FaTimesCircle />}
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="transaction-details">
                                    <div className="detail-group">
                                        <span className="detail-label">Patient</span>
                                        <span className="detail-value">{transaction.patient.name}</span>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">Prescription</span>
                                        <span className="detail-value">{transaction.prescription}</span>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">Payment</span>
                                        <span className="detail-value">{transaction.paymentMethod}</span>
                                    </div>
                                    <div className="detail-group amount">
                                        <span className="detail-label">Amount</span>
                                        <span className="detail-value">{transaction.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="insurance-section">
                    <div className="section-header">
                        <h3>Insurance Claims Status</h3>
                        <button className="view-all-btn" onClick={() => setActiveTab('insurance')}>View All</button>
                    </div>
                    <div className="insurance-summary">
                        <div className="summary-item approved">
                            <div className="summary-icon">
                                <FaCheckCircle />
                            </div>
                            <div className="summary-content">
                                <h4>Approved</h4>
                                <p className="summary-value">1</p>
                            </div>
                        </div>
                        <div className="summary-item pending">
                            <div className="summary-icon">
                                <FaExclamationTriangle />
                            </div>
                            <div className="summary-content">
                                <h4>Pending</h4>
                                <p className="summary-value">1</p>
                            </div>
                        </div>
                        <div className="summary-item rejected">
                            <div className="summary-icon">
                                <FaTimesCircle />
                            </div>
                            <div className="summary-content">
                                <h4>Rejected</h4>
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
                            placeholder="Search by ID, patient, or prescription..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label htmlFor="payment-filter">Payment</label>
                            <select
                                id="payment-filter"
                                value={filterOptions.paymentMethod}
                                onChange={(e) => setFilterOptions({ ...filterOptions, paymentMethod: e.target.value })}
                                className="filter-select"
                            >
                                <option value="all">All Methods</option>
                                <option value="insurance">Insurance</option>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="status-filter">Status</label>
                            <select
                                id="status-filter"
                                value={filterOptions.status}
                                onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
                                className="filter-select"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="date-range">Date Range</label>
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
                                <span className="date-separator">to</span>
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
                            <label htmlFor="sort-filter">Sort By</label>
                            <select
                                id="sort-filter"
                                value={filterOptions.sort}
                                onChange={(e) => setFilterOptions({ ...filterOptions, sort: e.target.value })}
                                className="filter-select"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="amount">Amount (High to Low)</option>
                            </select>
                        </div>

                        <button className="refresh-btn">
                            <FaSyncAlt /> Refresh
                        </button>
                    </div>
                </div>

                <div className="transactions-results">
                    <div className="results-header">
                        <h3>Results ({sortedTransactions.length})</h3>
                        <div className="export-options">
                            <button className="export-btn">
                                <FaDownload /> Export
                            </button>
                            <button className="print-btn">
                                <FaPrint /> Print
                            </button>
                        </div>
                    </div>

                    {sortedTransactions.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <FaFileInvoiceDollar />
                            </div>
                            <h3>No Transactions Found</h3>
                            <p>
                                {searchTerm
                                    ? `No transactions match your search term "${searchTerm}"`
                                    : 'No transactions found for the selected filters'}
                            </p>
                            {searchTerm && (
                                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="transactions-table-container">
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Patient</th>
                                        <th>Prescription</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTransactions.map(transaction => (
                                        <tr key={transaction.id} className={transaction.status.toLowerCase()}>
                                            <td className="id-cell">{transaction.id}</td>
                                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
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
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn view-btn">
                                                    <FaEye /> View
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
                            <h3>Transaction Details</h3>
                            <button className="toggle-btn">
                                <FaChevronUp />
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="detail-note">Select a transaction to view details</p>
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
                            placeholder="Search by claim ID, patient, or policy..."
                            className="search-input"
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label htmlFor="insurance-filter">Provider</label>
                            <select
                                id="insurance-filter"
                                className="filter-select"
                            >
                                <option value="all">All Providers</option>
                                <option value="healthplus">HealthPlus</option>
                                <option value="nationalcare">NationalCare</option>
                                <option value="seniorcare">SeniorCare+</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="claim-status-filter">Status</label>
                            <select
                                id="claim-status-filter"
                                className="filter-select"
                            >
                                <option value="all">All Status</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="claim-date-range">Date Range</label>
                            <div className="date-inputs">
                                <div className="date-input-wrapper">
                                    <FaCalendarAlt className="calendar-icon" />
                                    <input
                                        type="date"
                                        className="date-input"
                                    />
                                </div>
                                <span className="date-separator">to</span>
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
                            <FaSyncAlt /> Refresh
                        </button>
                    </div>
                </div>

                <div className="insurance-results">
                    <div className="results-header">
                        <h3>Insurance Claims ({insuranceClaims.length})</h3>
                        <div className="export-options">
                            <button className="export-btn">
                                <FaDownload /> Export
                            </button>
                            <button className="print-btn">
                                <FaPrint /> Print
                            </button>
                        </div>
                    </div>

                    <div className="insurance-table-container">
                        <table className="insurance-table">
                            <thead>
                                <tr>
                                    <th>Claim ID</th>
                                    <th>Date</th>
                                    <th>Patient</th>
                                    <th>Prescription</th>
                                    <th>Insurance Provider</th>
                                    <th>Policy Number</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insuranceClaims.map(claim => (
                                    <tr key={claim.id} className={claim.status.toLowerCase()}>
                                        <td className="id-cell">{claim.id}</td>
                                        <td>{new Date(claim.date).toLocaleDateString()}</td>
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
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="action-btn view-btn">
                                                <FaEye /> View
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
                            <h3>Claim Details</h3>
                            <button className="toggle-btn">
                                <FaChevronUp />
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="detail-note">Select a claim to view details</p>
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
                    <p>Loading billing data...</p>
                </div>
            ) : (
                <div className="billing-container">
                    <div className="page-header">
                        <h1>Billing & Payments</h1>
                        <p>Manage transactions, insurance claims, and financial reports</p>
                    </div>

                    <div className="billing-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <FaChartLine /> Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transactions')}
                        >
                            <FaFileInvoiceDollar /> Transactions
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('insurance')}
                        >
                            <FaIdCard /> Insurance Claims
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