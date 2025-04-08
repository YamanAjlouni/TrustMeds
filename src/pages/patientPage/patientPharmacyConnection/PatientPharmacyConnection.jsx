import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientPharmacyConnection.scss';
import {
    FaClinicMedical,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaClock,
    FaSearch,
    FaStar,
    FaTruck,
    FaWalking,
    FaPills,
    FaPlus,
    FaHome,
    FaHistory,
    FaExclamationTriangle
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export const PatientPharmacyConnection = () => {
    // State for preferred pharmacies
    const [preferredPharmacies, setPreferredPharmacies] = useState([
        {
            id: 1,
            name: "Main Street Pharmacy",
            address: "123 Main St, Anytown, CA 12345",
            phone: "(555) 123-4567",
            hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-6PM, Sun: 10AM-4PM",
            distance: "0.8 miles",
            rating: 4.7,
            numRatings: 156,
            deliveryAvailable: true,
            isPrimary: true,
            lastVisited: "2025-04-01"
        },
        {
            id: 2,
            name: "Central Pharmacy",
            address: "456 Center Ave, Anytown, CA 12345",
            phone: "(555) 987-6543",
            hours: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM",
            distance: "2.3 miles",
            rating: 4.5,
            numRatings: 98,
            deliveryAvailable: true,
            isPrimary: false,
            lastVisited: "2025-03-15"
        }
    ]);

    // State for nearby pharmacies
    const [nearbyPharmacies, setNearbyPharmacies] = useState([
        {
            id: 3,
            name: "Downtown Drugs",
            address: "789 Market St, Anytown, CA 12345",
            phone: "(555) 456-7890",
            hours: "Mon-Sun: 8AM-10PM",
            distance: "1.5 miles",
            rating: 4.2,
            numRatings: 87,
            deliveryAvailable: true
        },
        {
            id: 4,
            name: "Westside Wellness Pharmacy",
            address: "321 West Blvd, Anytown, CA 12345",
            phone: "(555) 321-6547",
            hours: "Mon-Sat: 9AM-8PM, Sun: Closed",
            distance: "3.1 miles",
            rating: 4.8,
            numRatings: 112,
            deliveryAvailable: false
        },
        {
            id: 5,
            name: "MediQuick Pharmacy",
            address: "555 Park Rd, Anytown, CA 12345",
            phone: "(555) 555-9876",
            hours: "24 Hours",
            distance: "4.5 miles",
            rating: 4.1,
            numRatings: 65,
            deliveryAvailable: true
        }
    ]);

    // State for prescription delivery options
    const [deliveryOptions, setDeliveryOptions] = useState({
        enabled: true,
        defaultOption: "scheduled",
        scheduledDay: "Friday",
        scheduledTime: "Afternoon (2-5PM)",
        address: "123 Home St, Apt 4B, Anytown, CA 12345",
        notificationPreference: "text",
        phoneNumber: "(555) 987-1234",
        email: "jamie@example.com"
    });

    // State for delivery history
    const [deliveryHistory, setDeliveryHistory] = useState([
        {
            id: 1,
            date: "2025-04-02",
            status: "Delivered",
            prescriptions: ["Amoxicillin 500mg", "Lisinopril 10mg"],
            pharmacy: "Main Street Pharmacy",
            trackingNumber: "RXDEL100234",
            signature: "Jamie S."
        },
        {
            id: 2,
            date: "2025-03-15",
            status: "Delivered",
            prescriptions: ["Atorvastatin 20mg"],
            pharmacy: "Central Pharmacy",
            trackingNumber: "RXDEL098123",
            signature: "Jamie S."
        }
    ]);

    // State for active tab
    const [activeTab, setActiveTab] = useState('preferred');

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // State for pharmacy details modal
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    // State for delivery setup modal
    const [showDeliverySetup, setShowDeliverySetup] = useState(false);

    // Search functionality
    const filteredNearbyPharmacies = nearbyPharmacies.filter(pharmacy =>
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    // Set primary pharmacy
    const setPrimaryPharmacy = (id) => {
        const updatedPharmacies = preferredPharmacies.map(pharmacy => ({
            ...pharmacy,
            isPrimary: pharmacy.id === id
        }));
        setPreferredPharmacies(updatedPharmacies);
    };

    // Add pharmacy to preferred
    const addToPreferred = (pharmacy) => {
        if (!preferredPharmacies.some(p => p.id === pharmacy.id)) {
            setPreferredPharmacies([...preferredPharmacies, {
                ...pharmacy,
                isPrimary: false,
                lastVisited: "Never"
            }]);
            // Remove from nearby list
            setNearbyPharmacies(nearbyPharmacies.filter(p => p.id !== pharmacy.id));
            setSelectedPharmacy(null);
        }
    };

    // Toggle delivery setup modal
    const toggleDeliverySetup = () => {
        setShowDeliverySetup(!showDeliverySetup);
    };

    // Save delivery options
    const saveDeliveryOptions = (options) => {
        setDeliveryOptions({
            ...deliveryOptions,
            ...options
        });
        setShowDeliverySetup(false);
    };

    // View pharmacy details
    const viewPharmacyDetails = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
    };

    // Close pharmacy details
    const closePharmacyDetails = () => {
        setSelectedPharmacy(null);
    };

    return (
        <div className="pharmacy-connection-container">
            <div className="page-header">
                <div className="header-content">
                    <h1><FaClinicMedical className="header-icon" /> Pharmacy Connection</h1>
                    <p>Manage your pharmacy preferences and medication delivery options</p>
                </div>
                <div className="pharmacy-stats">
                    <div className="stat-item">
                        <span className="stat-value">{preferredPharmacies.length}</span>
                        <span className="stat-label">Saved</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{deliveryOptions.enabled ? "On" : "Off"}</span>
                        <span className="stat-label">Delivery</span>
                    </div>
                </div>
            </div>

            <div className="pharmacy-tabs">
                <button
                    className={`tab-btn ${activeTab === 'preferred' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preferred')}
                >
                    <FaStar className="tab-icon" />
                    <span>My Pharmacies</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nearby')}
                >
                    <FaMapMarkerAlt className="tab-icon" />
                    <span>Find Pharmacies</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery')}
                >
                    <FaTruck className="tab-icon" />
                    <span>Prescription Delivery</span>
                </button>
            </div>

            {activeTab === 'preferred' && (
                <motion.div
                    className="preferred-pharmacies-section"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {preferredPharmacies.length > 0 ? (
                        <>
                            <div className="section-intro">
                                <h2>My Preferred Pharmacies</h2>
                                <p>These are the pharmacies where your prescriptions can be sent</p>
                            </div>
                            <div className="preferred-pharmacy-list">
                                {preferredPharmacies.map((pharmacy) => (
                                    <motion.div
                                        key={pharmacy.id}
                                        className={`pharmacy-card ${pharmacy.isPrimary ? 'primary-pharmacy' : ''}`}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                    >
                                        {pharmacy.isPrimary && (
                                            <div className="primary-badge">
                                                Primary
                                            </div>
                                        )}
                                        <div className="pharmacy-info">
                                            <h3>{pharmacy.name}</h3>
                                            <div className="pharmacy-details">
                                                <p className="pharmacy-address">
                                                    <FaMapMarkerAlt className="detail-icon" />
                                                    {pharmacy.address}
                                                </p>
                                                <p className="pharmacy-phone">
                                                    <FaPhoneAlt className="detail-icon" />
                                                    {pharmacy.phone}
                                                </p>
                                                <p className="pharmacy-hours">
                                                    <FaClock className="detail-icon" />
                                                    {pharmacy.hours}
                                                </p>
                                            </div>
                                            <div className="pharmacy-meta">
                                                <span className="pharmacy-distance">
                                                    <FaWalking className="meta-icon" /> {pharmacy.distance}
                                                </span>
                                                <span className="pharmacy-rating">
                                                    <FaStar className="meta-icon" /> {pharmacy.rating} ({pharmacy.numRatings})
                                                </span>
                                                {pharmacy.deliveryAvailable && (
                                                    <span className="delivery-available">
                                                        <FaTruck className="meta-icon" /> Delivery Available
                                                    </span>
                                                )}
                                            </div>
                                            <div className="last-visit">
                                                Last visit: {pharmacy.lastVisited !== "Never" ? new Date(pharmacy.lastVisited).toLocaleDateString() : "Never"}
                                            </div>
                                        </div>
                                        <div className="pharmacy-actions">
                                            {!pharmacy.isPrimary && (
                                                <motion.button
                                                    className="set-primary-btn"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setPrimaryPharmacy(pharmacy.id)}
                                                >
                                                    Set as Primary
                                                </motion.button>
                                            )}
                                            <motion.button
                                                className="view-details-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => viewPharmacyDetails(pharmacy)}
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>No preferred pharmacies found</h3>
                            <p>Switch to "Find Pharmacies" tab to add pharmacies</p>
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'nearby' && (
                <div className="nearby-pharmacies-section">
                    <div className="section-intro">
                        <h2>Find Pharmacies</h2>
                        <p>Discover pharmacies near you and add them to your preferences</p>
                    </div>
                    <div className="pharmacy-search">
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by name, address, or zip code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-filters">
                            <span className="filter-label">Filter by: </span>
                            <button className="filter-pill active">All</button>
                            <button className="filter-pill">Distance</button>
                            <button className="filter-pill">Rating</button>
                            <button className="filter-pill">Delivery</button>
                        </div>
                    </div>
                    <div className="nearby-pharmacy-list">
                        {filteredNearbyPharmacies.length > 0 ? (
                            filteredNearbyPharmacies.map((pharmacy) => (
                                <motion.div
                                    key={pharmacy.id}
                                    className="pharmacy-card"
                                    whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                >
                                    <div className="pharmacy-info">
                                        <h3>{pharmacy.name}</h3>
                                        <div className="pharmacy-details">
                                            <p className="pharmacy-address">
                                                <FaMapMarkerAlt className="detail-icon" />
                                                {pharmacy.address}
                                            </p>
                                            <p className="pharmacy-phone">
                                                <FaPhoneAlt className="detail-icon" />
                                                {pharmacy.phone}
                                            </p>
                                            <p className="pharmacy-hours">
                                                <FaClock className="detail-icon" />
                                                {pharmacy.hours}
                                            </p>
                                        </div>
                                        <div className="pharmacy-meta">
                                            <span className="pharmacy-distance">
                                                <FaWalking className="meta-icon" /> {pharmacy.distance}
                                            </span>
                                            <span className="pharmacy-rating">
                                                <FaStar className="meta-icon" /> {pharmacy.rating} ({pharmacy.numRatings})
                                            </span>
                                            {pharmacy.deliveryAvailable && (
                                                <span className="delivery-available">
                                                    <FaTruck className="meta-icon" /> Delivery Available
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pharmacy-actions">
                                        <motion.button
                                            className="add-preferred-btn"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => addToPreferred(pharmacy)}
                                        >
                                            <FaPlus className="btn-icon" /> Add to My Pharmacies
                                        </motion.button>
                                        <motion.button
                                            className="view-details-btn"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => viewPharmacyDetails(pharmacy)}
                                        >
                                            View Details
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-results">
                                <FaExclamationTriangle className="no-results-icon" />
                                <h3>No pharmacies found</h3>
                                <p>Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'delivery' && (
                <div className="delivery-section">
                    <div className="section-intro">
                        <h2>Prescription Delivery</h2>
                        <p>Set up and manage your prescription delivery options</p>
                    </div>
                    <div className="delivery-options-card">
                        <div className="delivery-status">
                            <h3>Delivery Status: <span className={deliveryOptions.enabled ? "status-active" : "status-inactive"}>
                                {deliveryOptions.enabled ? "Enabled" : "Disabled"}
                            </span></h3>
                        </div>
                        {deliveryOptions.enabled ? (
                            <div className="delivery-details">
                                <div className="detail-group">
                                    <h4>Delivery Preferences</h4>
                                    <div className="delivery-preferences">
                                        <div className="preference-item">
                                            <span className="preference-label">Default Option:</span>
                                            <span className="preference-value">
                                                {deliveryOptions.defaultOption === "scheduled" ? "Scheduled Weekly" : "As Needed"}
                                            </span>
                                        </div>
                                        {deliveryOptions.defaultOption === "scheduled" && (
                                            <>
                                                <div className="preference-item">
                                                    <span className="preference-label">Scheduled Day:</span>
                                                    <span className="preference-value">{deliveryOptions.scheduledDay}</span>
                                                </div>
                                                <div className="preference-item">
                                                    <span className="preference-label">Preferred Time:</span>
                                                    <span className="preference-value">{deliveryOptions.scheduledTime}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="detail-group">
                                    <h4>Delivery Address</h4>
                                    <div className="address-block">
                                        {deliveryOptions.address}
                                    </div>
                                </div>
                                <div className="detail-group">
                                    <h4>Notifications</h4>
                                    <div className="notification-preferences">
                                        <div className="preference-item">
                                            <span className="preference-label">Notification Method:</span>
                                            <span className="preference-value">{
                                                deliveryOptions.notificationPreference === "text" ? "Text Message" :
                                                    deliveryOptions.notificationPreference === "email" ? "Email" : "Both"
                                            }</span>
                                        </div>
                                        {(deliveryOptions.notificationPreference === "text" || deliveryOptions.notificationPreference === "both") && (
                                            <div className="preference-item">
                                                <span className="preference-label">Phone Number:</span>
                                                <span className="preference-value">{deliveryOptions.phoneNumber}</span>
                                            </div>
                                        )}
                                        {(deliveryOptions.notificationPreference === "email" || deliveryOptions.notificationPreference === "both") && (
                                            <div className="preference-item">
                                                <span className="preference-label">Email:</span>
                                                <span className="preference-value">{deliveryOptions.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="delivery-actions">
                                    <motion.button
                                        className="edit-delivery-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleDeliverySetup}
                                    >
                                        Edit Delivery Settings
                                    </motion.button>
                                    <motion.button
                                        className="disable-delivery-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setDeliveryOptions({ ...deliveryOptions, enabled: false })}
                                    >
                                        Disable Delivery
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="delivery-setup">
                                <p className="delivery-info">
                                    Prescription delivery allows you to receive your medications directly at your doorstep.
                                    Enable this feature to set up your delivery preferences.
                                </p>
                                <motion.button
                                    className="setup-delivery-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setDeliveryOptions({ ...deliveryOptions, enabled: true })}
                                >
                                    Enable Delivery
                                </motion.button>
                            </div>
                        )}
                    </div>

                    <div className="delivery-history-section">
                        <h3>Delivery History</h3>
                        {deliveryHistory.length > 0 ? (
                            <div className="delivery-history-list">
                                {deliveryHistory.map((delivery) => (
                                    <motion.div
                                        key={delivery.id}
                                        className="delivery-history-item"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="delivery-date">
                                            {new Date(delivery.date).toLocaleDateString()}
                                        </div>
                                        <div className="delivery-info">
                                            <div className="delivery-status">
                                                <span className={`status-badge ${delivery.status.toLowerCase()}`}>
                                                    {delivery.status}
                                                </span>
                                            </div>
                                            <div className="delivery-meds">
                                                <h4>Medications:</h4>
                                                <p>{delivery.prescriptions.join(", ")}</p>
                                            </div>
                                            <div className="delivery-pharmacy">
                                                <h4>From:</h4>
                                                <p>{delivery.pharmacy}</p>
                                            </div>
                                            <div className="delivery-tracking">
                                                <h4>Tracking #:</h4>
                                                <p>{delivery.trackingNumber}</p>
                                            </div>
                                            <div className="delivery-signature">
                                                <h4>Received by:</h4>
                                                <p>{delivery.signature}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-delivery-history">
                                <p>No delivery history available</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Pharmacy Details Modal */}
            {selectedPharmacy && (
                <div className="modal-overlay">
                    <motion.div
                        className="pharmacy-details-modal"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <div className="modal-header">
                            <h2>{selectedPharmacy.name}</h2>
                            <button className="close-modal-btn" onClick={closePharmacyDetails}>×</button>
                        </div>
                        <div className="modal-content">
                            <div className="pharmacy-details-grid">
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <div>
                                        <h4>Address</h4>
                                        <p>{selectedPharmacy.address}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaPhoneAlt className="detail-icon" />
                                    <div>
                                        <h4>Phone</h4>
                                        <p>{selectedPharmacy.phone}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaClock className="detail-icon" />
                                    <div>
                                        <h4>Hours</h4>
                                        <p>{selectedPharmacy.hours}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaWalking className="detail-icon" />
                                    <div>
                                        <h4>Distance</h4>
                                        <p>{selectedPharmacy.distance}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaStar className="detail-icon" />
                                    <div>
                                        <h4>Rating</h4>
                                        <p>{selectedPharmacy.rating} out of 5 ({selectedPharmacy.numRatings} reviews)</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaTruck className="detail-icon" />
                                    <div>
                                        <h4>Delivery</h4>
                                        <p>{selectedPharmacy.deliveryAvailable ? "Available" : "Not Available"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pharmacy-services">
                                <h3>Services Available</h3>
                                <div className="services-grid">
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>Prescription Filling</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>Medication Consulting</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>Flu Shots</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>Compounding</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>Health Screenings</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon cross">✗</div>
                                        <p>Drive-Through</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                {!preferredPharmacies.some(p => p.id === selectedPharmacy.id) ? (
                                    <motion.button
                                        className="add-preferred-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addToPreferred(selectedPharmacy)}
                                    >
                                        <FaPlus className="btn-icon" /> Add to My Pharmacies
                                    </motion.button>
                                ) : (
                                    !selectedPharmacy.isPrimary && (
                                        <motion.button
                                            className="set-primary-btn"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPrimaryPharmacy(selectedPharmacy.id)}
                                        >
                                            Set as Primary Pharmacy
                                        </motion.button>
                                    )
                                )}
                                <motion.button
                                    className="get-directions-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Directions
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Delivery Setup Modal */}
            {showDeliverySetup && (
                <div className="modal-overlay">
                    <motion.div
                        className="delivery-setup-modal"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <div className="modal-header">
                            <h2>Delivery Settings</h2>
                            <button className="close-modal-btn" onClick={toggleDeliverySetup}>×</button>
                        </div>
                        <div className="modal-content">
                            <div className="delivery-form">
                                <div className="form-group">
                                    <h3>Delivery Preference</h3>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="deliveryOption"
                                                checked={deliveryOptions.defaultOption === "scheduled"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, defaultOption: "scheduled" })}
                                            />
                                            <span>Scheduled Weekly Delivery</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="deliveryOption"
                                                checked={deliveryOptions.defaultOption === "asNeeded"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, defaultOption: "asNeeded" })}
                                            />
                                            <span>As Needed</span>
                                        </label>
                                    </div>
                                </div>

                                {deliveryOptions.defaultOption === "scheduled" && (
                                    <div className="schedule-options">
                                        <div className="form-group">
                                            <label>Preferred Day</label>
                                            <select
                                                value={deliveryOptions.scheduledDay}
                                                onChange={(e) => setDeliveryOptions({ ...deliveryOptions, scheduledDay: e.target.value })}
                                            >
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Preferred Time</label>
                                            <select
                                                value={deliveryOptions.scheduledTime}
                                                onChange={(e) => setDeliveryOptions({ ...deliveryOptions, scheduledTime: e.target.value })}
                                            >
                                                <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                                                <option value="Afternoon (2-5PM)">Afternoon (2-5PM)</option>
                                                <option value="Evening (6-8PM)">Evening (6-8PM)</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <h3>Delivery Address</h3>
                                    <textarea
                                        value={deliveryOptions.address}
                                        onChange={(e) => setDeliveryOptions({ ...deliveryOptions, address: e.target.value })}
                                        placeholder="Enter your delivery address"
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <h3>Notification Preferences</h3>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "text"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "text" })}
                                            />
                                            <span>Text Message</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "email"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "email" })}
                                            />
                                            <span>Email</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "both"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "both" })}
                                            />
                                            <span>Both</span>
                                        </label>
                                    </div>
                                </div>

                                {(deliveryOptions.notificationPreference === "text" || deliveryOptions.notificationPreference === "both") && (
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            value={deliveryOptions.phoneNumber}
                                            onChange={(e) => setDeliveryOptions({ ...deliveryOptions, phoneNumber: e.target.value })}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                )}

                                {(deliveryOptions.notificationPreference === "email" || deliveryOptions.notificationPreference === "both") && (
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            value={deliveryOptions.email}
                                            onChange={(e) => setDeliveryOptions({ ...deliveryOptions, email: e.target.value })}
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                )}

                                <div className="form-group privacy-notice">
                                    <h3>Privacy Notice</h3>
                                    <p>
                                        Your personal information is secure and will only be used for delivery purposes.
                                        See our <a href="/privacy" className="privacy-link">Privacy Policy</a> for more details.
                                    </p>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <motion.button
                                    className="save-settings-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => saveDeliveryOptions(deliveryOptions)}
                                >
                                    Save Settings
                                </motion.button>
                                <motion.button
                                    className="cancel-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleDeliverySetup}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PatientPharmacyConnection;