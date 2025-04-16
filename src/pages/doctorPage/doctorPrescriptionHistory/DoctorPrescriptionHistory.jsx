// DoctorPrescriptionHistory.jsx - Main Container Component
import React, { useState, useEffect } from 'react';
import './DoctorPrescriptionHistory.scss';
import { FaSyncAlt, FaPills } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { prescriptionData } from '../../../data/prescriptions';
import { LoadingState } from './components/LoadingState/LoadingState';
import { SearchFilters } from './components/SearchFilters/SearchFilters';
import { PrescriptionTable } from './components/PrescriptionTable/PrescriptionTable';
import { PrescriptionCards } from './components/PrescriptionCards/PrescriptionCards';
import { MobileDetailView } from './components/MobileDetailView/MobileDetailView';

export const DoctorPrescriptionHistory = () => {
    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallScreen = useMediaQuery({ maxWidth: 576 });

    // State
    const [prescriptions, setPrescriptions] = useState(prescriptionData);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [activePrescription, setActivePrescription] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showMobileDetail, setShowMobileDetail] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle date filter
    const handleDateFilterChange = (filter) => {
        setDateFilter(filter);
    };

    // Handle status filter
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            // If already sorting by this field, toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // New sort field, default to descending for date, ascending for others
            setSortField(field);
            setSortDirection(field === 'date' ? 'desc' : 'asc');
        }
    };

    // Handle prescription selection
    const handlePrescriptionSelect = (prescription) => {
        if (isMobile) {
            setActivePrescription(prescription);
            setShowMobileDetail(true);
        } else {
            setActivePrescription(prescription === activePrescription ? null : prescription);
        }
    };

    // Handle mobile back button
    const handleMobileBack = () => {
        setShowMobileDetail(false);
        setActivePrescription(null);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setDateFilter('all');
        setStatusFilter('all');
    };

    // Filter and sort prescriptions
    const filteredPrescriptions = prescriptions.filter(prescription => {
        // Apply search filter
        const searchMatch =
            prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));

        // Apply date filter
        let dateMatch = true;
        const prescriptionDate = new Date(prescription.date);
        const today = new Date();

        if (dateFilter === 'today') {
            dateMatch =
                prescriptionDate.getDate() === today.getDate() &&
                prescriptionDate.getMonth() === today.getMonth() &&
                prescriptionDate.getFullYear() === today.getFullYear();
        } else if (dateFilter === 'week') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            dateMatch = prescriptionDate >= oneWeekAgo;
        } else if (dateFilter === 'month') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);
            dateMatch = prescriptionDate >= oneMonthAgo;
        }

        // Apply status filter
        const statusMatch = statusFilter === 'all' || prescription.status === statusFilter;

        return searchMatch && dateMatch && statusMatch;
    }).sort((a, b) => {
        // Apply sorting
        let aValue, bValue;

        switch (sortField) {
            case 'date':
                aValue = new Date(a.date);
                bValue = new Date(b.date);
                break;
            case 'patient':
                aValue = a.patientName;
                bValue = b.patientName;
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'id':
                aValue = a.id;
                bValue = b.id;
                break;
            default:
                aValue = new Date(a.date);
                bValue = new Date(b.date);
        }

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    if (!isLoaded) {
        return <LoadingState />;
    }

    return (
        <div className="doctor-prescription-history">
            <div className="prescriptions-container">
                {/* Header */}
                <div className="prescriptions-header">
                    <h2>
                        <FaPills className="header-icon" />
                        Prescription History
                    </h2>
                    <div className="header-actions">
                        <NavLink to='/doctor/write-prescription' className="new-prescription-btn">
                            <FaPills /> {!isMobile && <span>New Prescription</span>}
                        </NavLink>
                        <button className="refresh-btn">
                            <FaSyncAlt />
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <SearchFilters
                    isMobile={isMobile}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    dateFilter={dateFilter}
                    handleDateFilterChange={handleDateFilterChange}
                    statusFilter={statusFilter}
                    handleStatusFilterChange={handleStatusFilterChange}
                />

                {/* Desktop Table View */}
                {!isMobile && (
                    <PrescriptionTable
                        filteredPrescriptions={filteredPrescriptions}
                        activePrescription={activePrescription}
                        handlePrescriptionSelect={handlePrescriptionSelect}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                        resetFilters={resetFilters}
                    />
                )}

                {/* Mobile Card View */}
                {isMobile && (
                    <PrescriptionCards
                        filteredPrescriptions={filteredPrescriptions}
                        handlePrescriptionSelect={handlePrescriptionSelect}
                        isSmallScreen={isSmallScreen}
                        resetFilters={resetFilters}
                    />
                )}

                {/* Mobile Detail View */}
                {isMobile && (
                    <MobileDetailView
                        activePrescription={activePrescription}
                        showMobileDetail={showMobileDetail}
                        handleMobileBack={handleMobileBack}
                    />
                )}
            </div>
        </div>
    );
};

export default DoctorPrescriptionHistory;