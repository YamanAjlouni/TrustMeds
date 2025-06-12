import React, { useState, useEffect } from 'react';
import './PatientPharmacyConnection.scss';
import {
    FaClinicMedical, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaSearch,
    FaStar, FaTruck, FaWalking, FaPills, FaPlus, FaHome, FaHistory,
    FaExclamationTriangle, FaTimes, FaChevronLeft
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { formatDate } from '../../../utils/dateFormatter';

export const PatientPharmacyConnection = () => {
    // Use language context for localization
    const { t, language, isRTL } = useLanguage();

    // Helper function to get the correct language field
    const getLangField = (obj, field) => {
        const langSuffix = language === 'ar' ? 'Ar' : 'En';
        return obj[field + langSuffix] || obj[field];
    };

    // State for preferred pharmacies
    const [preferredPharmacies, setPreferredPharmacies] = useState([
        {
            id: 1,
            nameEn: "Main Street Pharmacy",
            nameAr: "صيدلية الشارع الرئيسي",
            addressEn: "123 Main St, Anytown, CA 12345",
            addressAr: "١٢٣ شارع الرئيسي، المدينة، كاليفورنيا ١٢٣٤٥",
            phone: "(555) 123-4567",
            hoursEn: "Mon-Fri: 8AM-8PM, Sat: 9AM-6PM, Sun: 10AM-4PM",
            hoursAr: "الإثنين-الجمعة: ٨ص-٨م، السبت: ٩ص-٦م، الأحد: ١٠ص-٤م",
            distanceEn: "0.8 miles",
            distanceAr: "٠.٨ ميل",
            rating: 4.7,
            numRatings: 156,
            deliveryAvailable: true,
            isPrimary: true,
            lastVisited: "2025-04-01"
        },
        {
            id: 2,
            nameEn: "Central Pharmacy",
            nameAr: "الصيدلية المركزية",
            addressEn: "456 Center Ave, Anytown, CA 12345",
            addressAr: "٤٥٦ شارع سنتر، المدينة، كاليفورنيا ١٢٣٤٥",
            phone: "(555) 987-6543",
            hoursEn: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM",
            hoursAr: "الإثنين-الجمعة: ٩ص-٩م، السبت-الأحد: ١٠ص-٦م",
            distanceEn: "2.3 miles",
            distanceAr: "٢.٣ ميل",
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
            nameEn: "Downtown Drugs",
            nameAr: "صيدلية وسط المدينة",
            addressEn: "789 Market St, Anytown, CA 12345",
            addressAr: "٧٨٩ شارع ماركت، المدينة، كاليفورنيا ١٢٣٤٥",
            phone: "(555) 456-7890",
            hoursEn: "Mon-Sun: 8AM-10PM",
            hoursAr: "الإثنين-الأحد: ٨ص-١٠م",
            distanceEn: "1.5 miles",
            distanceAr: "١.٥ ميل",
            rating: 4.2,
            numRatings: 87,
            deliveryAvailable: true
        },
        {
            id: 4,
            nameEn: "Westside Wellness Pharmacy",
            nameAr: "صيدلية ويستسايد للعافية",
            addressEn: "321 West Blvd, Anytown, CA 12345",
            addressAr: "٣٢١ شارع ويست، المدينة، كاليفورنيا ١٢٣٤٥",
            phone: "(555) 321-6547",
            hoursEn: "Mon-Sat: 9AM-8PM, Sun: Closed",
            hoursAr: "الإثنين-السبت: ٩ص-٨م، الأحد: مغلق",
            distanceEn: "3.1 miles",
            distanceAr: "٣.١ ميل",
            rating: 4.8,
            numRatings: 112,
            deliveryAvailable: false
        },
        {
            id: 5,
            nameEn: "MediQuick Pharmacy",
            nameAr: "صيدلية ميديكويك",
            addressEn: "555 Park Rd, Anytown, CA 12345",
            addressAr: "٥٥٥ طريق بارك، المدينة، كاليفورنيا ١٢٣٤٥",
            phone: "(555) 555-9876",
            hoursEn: "24 Hours",
            hoursAr: "٢٤ ساعة",
            distanceEn: "4.5 miles",
            distanceAr: "٤.٥ ميل",
            rating: 4.1,
            numRatings: 65,
            deliveryAvailable: true
        }
    ]);

    // State for prescription delivery options
    const [deliveryOptions, setDeliveryOptions] = useState({
        enabled: true,
        defaultOption: "scheduled",
        scheduledDayEn: "Friday",
        scheduledDayAr: "الجمعة",
        scheduledTimeEn: "Afternoon (2-5PM)",
        scheduledTimeAr: "بعد الظهر (٢-٥م)",
        addressEn: "123 Home St, Apt 4B, Anytown, CA 12345",
        addressAr: "١٢٣ شارع هوم، شقة ٤ب، المدينة، كاليفورنيا ١٢٣٤٥",
        notificationPreference: "text",
        phoneNumber: "(555) 987-1234",
        email: "jamie@example.com"
    });

    // State for delivery history
    const [deliveryHistory, setDeliveryHistory] = useState([
        {
            id: 1,
            date: "2025-04-02",
            statusEn: "Delivered",
            statusAr: "تم التوصيل",
            prescriptionsEn: ["Amoxicillin 500mg", "Lisinopril 10mg"],
            prescriptionsAr: ["أموكسيسيلين ٥٠٠ملغ", "ليزينوبريل ١٠ملغ"],
            pharmacyEn: "Main Street Pharmacy",
            pharmacyAr: "صيدلية الشارع الرئيسي",
            trackingNumber: "RXDEL100234",
            signatureEn: "Jamie S.",
            signatureAr: "جيمي س."
        },
        {
            id: 2,
            date: "2025-03-15",
            statusEn: "Delivered",
            statusAr: "تم التوصيل",
            prescriptionsEn: ["Atorvastatin 20mg"],
            prescriptionsAr: ["أتورفاستاتين ٢٠ملغ"],
            pharmacyEn: "Central Pharmacy",
            pharmacyAr: "الصيدلية المركزية",
            trackingNumber: "RXDEL098123",
            signatureEn: "Jamie S.",
            signatureAr: "جيمي س."
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

    // State for mobile screen detection
    const [isMobile, setIsMobile] = useState(false);

    // State for active filter
    const [activeFilter, setActiveFilter] = useState('all');

    // Check if screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Search functionality
    const filteredNearbyPharmacies = nearbyPharmacies.filter(pharmacy =>
        getLangField(pharmacy, 'name').toLowerCase().includes(searchQuery.toLowerCase()) ||
        getLangField(pharmacy, 'address').toLowerCase().includes(searchQuery.toLowerCase())
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

        // Close modal if open
        if (selectedPharmacy && selectedPharmacy.id === id) {
            setSelectedPharmacy(null);
        }
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

    // Handle filter click
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        // In a real app, you would filter the data based on the selected filter
    };

    return (
        <div className="pharmacy-connection-container">
            <div className="page-header">
                <div className="header-content">
                    <h1><FaClinicMedical className="header-icon" /> {t('patientPage.pharmacyConnection.pageHeader.title')}</h1>
                    <p>{t('patientPage.pharmacyConnection.pageHeader.subtitle')}</p>
                </div>
                <div className="pharmacy-stats">
                    <div className="stat-item">
                        <span className="stat-value">{preferredPharmacies.length}</span>
                        <span className="stat-label">{t('patientPage.pharmacyConnection.pageHeader.stats.saved')}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{deliveryOptions.enabled ? t('patientPage.pharmacyConnection.delivery.status.enabled') : t('patientPage.pharmacyConnection.delivery.status.disabled')}</span>
                        <span className="stat-label">{t('patientPage.pharmacyConnection.pageHeader.stats.delivery')}</span>
                    </div>
                </div>
            </div>

            <div className="pharmacy-tabs">
                <button
                    className={`tab-btn ${activeTab === 'preferred' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preferred')}
                >
                    <FaStar className="tab-icon" />
                    <span>{isMobile ? t('patientPage.pharmacyConnection.tabs.myPharmaciesMobile') : t('patientPage.pharmacyConnection.tabs.myPharmacies')}</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nearby')}
                >
                    <FaMapMarkerAlt className="tab-icon" />
                    <span>{isMobile ? t('patientPage.pharmacyConnection.tabs.findPharmaciesMobile') : t('patientPage.pharmacyConnection.tabs.findPharmacies')}</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery')}
                >
                    <FaTruck className="tab-icon" />
                    <span>{isMobile ? t('patientPage.pharmacyConnection.tabs.prescriptionDeliveryMobile') : t('patientPage.pharmacyConnection.tabs.prescriptionDelivery')}</span>
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
                                <h2>{t('patientPage.pharmacyConnection.preferred.title')}</h2>
                                <p>{t('patientPage.pharmacyConnection.preferred.subtitle')}</p>
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
                                                {t('patientPage.pharmacyConnection.preferred.primary')}
                                            </div>
                                        )}
                                        <div className="pharmacy-info">
                                            <h3>{getLangField(pharmacy, 'name')}</h3>
                                            <div className="pharmacy-details">
                                                <p className="pharmacy-address">
                                                    <FaMapMarkerAlt className="detail-icon" />
                                                    {getLangField(pharmacy, 'address')}
                                                </p>
                                                <p className="pharmacy-phone">
                                                    <FaPhoneAlt className="detail-icon" />
                                                    {pharmacy.phone}
                                                </p>
                                                <p className="pharmacy-hours">
                                                    <FaClock className="detail-icon" />
                                                    {getLangField(pharmacy, 'hours')}
                                                </p>
                                            </div>
                                            <div className="pharmacy-meta">
                                                <span className="pharmacy-distance">
                                                    <FaWalking className="meta-icon" /> {getLangField(pharmacy, 'distance')}
                                                </span>
                                                <span className="pharmacy-rating">
                                                    <FaStar className="meta-icon" /> {pharmacy.rating} ({pharmacy.numRatings})
                                                </span>
                                                {pharmacy.deliveryAvailable && (
                                                    <span className="delivery-available">
                                                        <FaTruck className="meta-icon" /> {t('patientPage.pharmacyConnection.common.pharmacy.deliveryAvailable')}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="last-visit">
                                                {t('patientPage.pharmacyConnection.preferred.details.lastVisit')} {pharmacy.lastVisited !== "Never"
                                                    ? formatDate(pharmacy.lastVisited, language)
                                                    : t('patientPage.pharmacyConnection.preferred.details.never')}
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
                                                    {t('patientPage.pharmacyConnection.preferred.actions.setPrimary')}
                                                </motion.button>
                                            )}
                                            <motion.button
                                                className="view-details-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => viewPharmacyDetails(pharmacy)}
                                            >
                                                {t('patientPage.pharmacyConnection.preferred.actions.viewDetails')}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-results">
                            <FaExclamationTriangle className="no-results-icon" />
                            <h3>{t('patientPage.pharmacyConnection.preferred.noResults.title')}</h3>
                            <p>{t('patientPage.pharmacyConnection.preferred.noResults.subtitle')}</p>
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'nearby' && (
                <div className="nearby-pharmacies-section">
                    <div className="section-intro">
                        <h2>{t('patientPage.pharmacyConnection.nearby.title')}</h2>
                        <p>{t('patientPage.pharmacyConnection.nearby.subtitle')}</p>
                    </div>
                    <div className="pharmacy-search">
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={t('patientPage.pharmacyConnection.nearby.search.placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <FaTimes
                                    style={{
                                        position: 'absolute',
                                        right: isRTL ? 'auto' : '15px',
                                        left: isRTL ? '15px' : 'auto',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#94a3b8'
                                    }}
                                    onClick={() => setSearchQuery('')}
                                />
                            )}
                        </div>
                        <div className="search-filters">
                            <span className="filter-label">{t('patientPage.pharmacyConnection.nearby.filters.label')} </span>
                            <button
                                className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => handleFilterClick('all')}
                            >
                                {t('patientPage.pharmacyConnection.nearby.filters.all')}
                            </button>
                            <button
                                className={`filter-pill ${activeFilter === 'distance' ? 'active' : ''}`}
                                onClick={() => handleFilterClick('distance')}
                            >
                                {t('patientPage.pharmacyConnection.nearby.filters.distance')}
                            </button>
                            <button
                                className={`filter-pill ${activeFilter === 'rating' ? 'active' : ''}`}
                                onClick={() => handleFilterClick('rating')}
                            >
                                {t('patientPage.pharmacyConnection.nearby.filters.rating')}
                            </button>
                            <button
                                className={`filter-pill ${activeFilter === 'delivery' ? 'active' : ''}`}
                                onClick={() => handleFilterClick('delivery')}
                            >
                                {t('patientPage.pharmacyConnection.nearby.filters.delivery')}
                            </button>
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
                                        <h3>{getLangField(pharmacy, 'name')}</h3>
                                        <div className="pharmacy-details">
                                            <p className="pharmacy-address">
                                                <FaMapMarkerAlt className="detail-icon" />
                                                {getLangField(pharmacy, 'address')}
                                            </p>
                                            <p className="pharmacy-phone">
                                                <FaPhoneAlt className="detail-icon" />
                                                {pharmacy.phone}
                                            </p>
                                            <p className="pharmacy-hours">
                                                <FaClock className="detail-icon" />
                                                {getLangField(pharmacy, 'hours')}
                                            </p>
                                        </div>
                                        <div className="pharmacy-meta">
                                            <span className="pharmacy-distance">
                                                <FaWalking className="meta-icon" /> {getLangField(pharmacy, 'distance')}
                                            </span>
                                            <span className="pharmacy-rating">
                                                <FaStar className="meta-icon" /> {pharmacy.rating} ({pharmacy.numRatings})
                                            </span>
                                            {pharmacy.deliveryAvailable && (
                                                <span className="delivery-available">
                                                    <FaTruck className="meta-icon" /> {t('patientPage.pharmacyConnection.common.pharmacy.deliveryAvailable')}
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
                                            <FaPlus className="btn-icon" /> {isMobile
                                                ? t('patientPage.pharmacyConnection.nearby.actions.add')
                                                : t('patientPage.pharmacyConnection.nearby.actions.addToMyPharmacies')}
                                        </motion.button>
                                        <motion.button
                                            className="view-details-btn"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => viewPharmacyDetails(pharmacy)}
                                        >
                                            {t('patientPage.pharmacyConnection.nearby.actions.viewDetails')}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-results">
                                <FaExclamationTriangle className="no-results-icon" />
                                <h3>{t('patientPage.pharmacyConnection.nearby.noResults.title')}</h3>
                                <p>{t('patientPage.pharmacyConnection.nearby.noResults.subtitle')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'delivery' && (
                <div className="delivery-section">
                    <div className="section-intro">
                        <h2>{t('patientPage.pharmacyConnection.delivery.title')}</h2>
                        <p>{t('patientPage.pharmacyConnection.delivery.subtitle')}</p>
                    </div>
                    <div className="delivery-options-card">
                        <div className="delivery-status">
                            <h3>{t('patientPage.pharmacyConnection.delivery.status.title')} <span className={deliveryOptions.enabled ? "status-active" : "status-inactive"}>
                                {deliveryOptions.enabled
                                    ? t('patientPage.pharmacyConnection.delivery.status.enabled')
                                    : t('patientPage.pharmacyConnection.delivery.status.disabled')}
                            </span></h3>
                        </div>
                        {deliveryOptions.enabled ? (
                            <div className="delivery-details">
                                <div className="detail-group">
                                    <h4>{t('patientPage.pharmacyConnection.delivery.preferences.title')}</h4>
                                    <div className="delivery-preferences">
                                        <div className="preference-item">
                                            <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.preferences.defaultOption')}</span>
                                            <span className="preference-value">
                                                {deliveryOptions.defaultOption === "scheduled"
                                                    ? t('patientPage.pharmacyConnection.delivery.preferences.scheduledWeekly')
                                                    : t('patientPage.pharmacyConnection.delivery.preferences.asNeeded')}
                                            </span>
                                        </div>
                                        {deliveryOptions.defaultOption === "scheduled" && (
                                            <>
                                                <div className="preference-item">
                                                    <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.preferences.scheduledDay')}</span>
                                                    <span className="preference-value">{t(`${getLangField(deliveryOptions, 'scheduledDay')}`)}</span>
                                                </div>
                                                <div className="preference-item">
                                                    <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.preferences.preferredTime')}</span>
                                                    <span className="preference-value">{getLangField(deliveryOptions, 'scheduledTime')}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="detail-group">
                                    <h4>{t('patientPage.pharmacyConnection.delivery.address.title')}</h4>
                                    <div className="address-block">
                                        {getLangField(deliveryOptions, 'address')}
                                    </div>
                                </div>
                                <div className="detail-group">
                                    <h4>{t('patientPage.pharmacyConnection.delivery.notifications.title')}</h4>
                                    <div className="notification-preferences">
                                        <div className="preference-item">
                                            <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.notifications.method')}</span>
                                            <span className="preference-value">{
                                                deliveryOptions.notificationPreference === "text"
                                                    ? t('patientPage.pharmacyConnection.delivery.notifications.textMessage')
                                                    : deliveryOptions.notificationPreference === "email"
                                                        ? t('patientPage.pharmacyConnection.delivery.notifications.email')
                                                        : t('patientPage.pharmacyConnection.delivery.notifications.both')
                                            }</span>
                                        </div>
                                        {(deliveryOptions.notificationPreference === "text" || deliveryOptions.notificationPreference === "both") && (
                                            <div className="preference-item">
                                                <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.notifications.phoneNumber')}</span>
                                                <span className="preference-value">{deliveryOptions.phoneNumber}</span>
                                            </div>
                                        )}
                                        {(deliveryOptions.notificationPreference === "email" || deliveryOptions.notificationPreference === "both") && (
                                            <div className="preference-item">
                                                <span className="preference-label">{t('patientPage.pharmacyConnection.delivery.notifications.emailAddress')}</span>
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
                                        {t('patientPage.pharmacyConnection.delivery.actions.editSettings')}
                                    </motion.button>
                                    <motion.button
                                        className="disable-delivery-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setDeliveryOptions({ ...deliveryOptions, enabled: false })}
                                    >
                                        {t('patientPage.pharmacyConnection.delivery.actions.disableDelivery')}
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="delivery-setup">
                                <p className="delivery-info">
                                    {t('patientPage.pharmacyConnection.delivery.setup.info')}
                                </p>
                                <motion.button
                                    className="setup-delivery-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setDeliveryOptions({ ...deliveryOptions, enabled: true })}
                                >
                                    {t('patientPage.pharmacyConnection.delivery.actions.enableDelivery')}
                                </motion.button>
                            </div>
                        )}
                    </div>

                    <div className="delivery-history-section">
                        <h3>{t('patientPage.pharmacyConnection.delivery.history.title')}</h3>
                        {deliveryHistory.length > 0 ? (
                            <div className="delivery-history-list">
                                {deliveryHistory.map((delivery) => (
                                    <motion.div
                                        key={delivery.id}
                                        className="delivery-history-item"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="delivery-date">
                                            {formatDate(delivery.date, language)}
                                        </div>
                                        <div className="delivery-info">
                                            <div className="delivery-status">
                                                <span className={`status-badge ${getLangField(delivery, 'status').toLowerCase()}`}>
                                                    {t(`${getLangField(delivery, 'status')}`)}
                                                </span>
                                            </div>
                                            <div className="delivery-meds">
                                                <h4>{t('patientPage.pharmacyConnection.delivery.history.details.medications')}</h4>
                                                <p>{getLangField(delivery, 'prescriptions').join(", ")}</p>
                                            </div>
                                            <div className="delivery-pharmacy">
                                                <h4>{t('patientPage.pharmacyConnection.delivery.history.details.from')}</h4>
                                                <p>{getLangField(delivery, 'pharmacy')}</p>
                                            </div>
                                            <div className="delivery-tracking">
                                                <h4>{t('patientPage.pharmacyConnection.delivery.history.details.tracking')}</h4>
                                                <p>{delivery.trackingNumber}</p>
                                            </div>
                                            <div className="delivery-signature">
                                                <h4>{t('patientPage.pharmacyConnection.delivery.history.details.receivedBy')}</h4>
                                                <p>{getLangField(delivery, 'signature')}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-delivery-history">
                                <p>{t('patientPage.pharmacyConnection.delivery.history.noHistory')}</p>
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
                            <h2>{getLangField(selectedPharmacy, 'name')}</h2>
                            <button
                                className="close-modal-btn"
                                onClick={closePharmacyDetails}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="pharmacy-details-grid">
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.address')}</h4>
                                        <p>{getLangField(selectedPharmacy, 'address')}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaPhoneAlt className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.phone')}</h4>
                                        <p>{selectedPharmacy.phone}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaClock className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.hours')}</h4>
                                        <p>{getLangField(selectedPharmacy, 'hours')}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaWalking className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.distance')}</h4>
                                        <p>{getLangField(selectedPharmacy, 'distance')}</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaStar className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.rating')}</h4>
                                        <p>{selectedPharmacy.rating} {t('patientPage.pharmacyConnection.pharmacyDetails.details.outOf5')} ({selectedPharmacy.numRatings} {t('patientPage.pharmacyConnection.pharmacyDetails.details.reviews')})</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaTruck className="detail-icon" />
                                    <div>
                                        <h4>{t('patientPage.pharmacyConnection.pharmacyDetails.details.delivery')}</h4>
                                        <p>{selectedPharmacy.deliveryAvailable
                                            ? t('patientPage.pharmacyConnection.pharmacyDetails.details.available')
                                            : t('patientPage.pharmacyConnection.pharmacyDetails.details.notAvailable')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pharmacy-services">
                                <h3>{t('patientPage.pharmacyConnection.pharmacyDetails.services.title')}</h3>
                                <div className="services-grid">
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.prescriptionFilling')}</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.medicationConsulting')}</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.fluShots')}</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.compounding')}</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon check">✓</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.healthScreenings')}</p>
                                    </div>
                                    <div className="service-item">
                                        <div className="service-icon cross">✗</div>
                                        <p>{t('patientPage.pharmacyConnection.pharmacyDetails.services.types.driveThrough')}</p>
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
                                        <FaPlus className="btn-icon" /> {t('patientPage.pharmacyConnection.pharmacyDetails.actions.addToMyPharmacies')}
                                    </motion.button>
                                ) : (
                                    !selectedPharmacy.isPrimary && (
                                        <motion.button
                                            className="set-primary-btn"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPrimaryPharmacy(selectedPharmacy.id)}
                                        >
                                            {t('patientPage.pharmacyConnection.pharmacyDetails.actions.setPrimaryPharmacy')}
                                        </motion.button>
                                    )
                                )}
                                <motion.button
                                    className="get-directions-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t('patientPage.pharmacyConnection.pharmacyDetails.actions.getDirections')}
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
                            <h2>{t('patientPage.pharmacyConnection.deliverySetup.title')}</h2>
                            <button
                                className="close-modal-btn"
                                onClick={toggleDeliverySetup}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="delivery-form">
                                <div className="form-group">
                                    <h3>{t('patientPage.pharmacyConnection.deliverySetup.preference.title')}</h3>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="deliveryOption"
                                                checked={deliveryOptions.defaultOption === "scheduled"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, defaultOption: "scheduled" })}
                                            />
                                            <span>{t('patientPage.pharmacyConnection.deliverySetup.preference.scheduledWeekly')}</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="deliveryOption"
                                                checked={deliveryOptions.defaultOption === "asNeeded"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, defaultOption: "asNeeded" })}
                                            />
                                            <span>{t('patientPage.pharmacyConnection.deliverySetup.preference.asNeeded')}</span>
                                        </label>
                                    </div>
                                </div>

                                {deliveryOptions.defaultOption === "scheduled" && (
                                    <div className="schedule-options">
                                        <div className="form-group">
                                            <label htmlFor="scheduledDay">{t('patientPage.pharmacyConnection.deliverySetup.schedule.preferredDay')}</label>
                                            <select
                                                id="scheduledDay"
                                                value={language === 'ar' ? deliveryOptions.scheduledDayAr : deliveryOptions.scheduledDayEn}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Map between English and Arabic day names
                                                    const dayMap = {
                                                        'Monday': 'الإثنين',
                                                        'Tuesday': 'الثلاثاء',
                                                        'Wednesday': 'الأربعاء',
                                                        'Thursday': 'الخميس',
                                                        'Friday': 'الجمعة',
                                                        'Saturday': 'السبت',
                                                        'Sunday': 'الأحد',
                                                        'الإثنين': 'Monday',
                                                        'الثلاثاء': 'Tuesday',
                                                        'الأربعاء': 'Wednesday',
                                                        'الخميس': 'Thursday',
                                                        'الجمعة': 'Friday',
                                                        'السبت': 'Saturday',
                                                        'الأحد': 'Sunday'
                                                    };

                                                    setDeliveryOptions({
                                                        ...deliveryOptions,
                                                        scheduledDayEn: language === 'en' ? value : dayMap[value],
                                                        scheduledDayAr: language === 'ar' ? value : dayMap[value]
                                                    });
                                                }}
                                            >
                                                <option value={language === 'en' ? 'Monday' : 'الإثنين'}>
                                                    {t('patientPage.pharmacyConnection.common.days.monday')}
                                                </option>
                                                <option value={language === 'en' ? 'Tuesday' : 'الثلاثاء'}>
                                                    {t('patientPage.pharmacyConnection.common.days.tuesday')}
                                                </option>
                                                <option value={language === 'en' ? 'Wednesday' : 'الأربعاء'}>
                                                    {t('patientPage.pharmacyConnection.common.days.wednesday')}
                                                </option>
                                                <option value={language === 'en' ? 'Thursday' : 'الخميس'}>
                                                    {t('patientPage.pharmacyConnection.common.days.thursday')}
                                                </option>
                                                <option value={language === 'en' ? 'Friday' : 'الجمعة'}>
                                                    {t('patientPage.pharmacyConnection.common.days.friday')}
                                                </option>
                                                <option value={language === 'en' ? 'Saturday' : 'السبت'}>
                                                    {t('patientPage.pharmacyConnection.common.days.saturday')}
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="scheduledTime">{t('patientPage.pharmacyConnection.deliverySetup.schedule.preferredTime')}</label>
                                            <select
                                                id="scheduledTime"
                                                value={language === 'ar' ? deliveryOptions.scheduledTimeAr : deliveryOptions.scheduledTimeEn}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Map between English and Arabic time descriptions
                                                    const timeMap = {
                                                        'Morning (9AM-12PM)': 'صباحًا (٩ص-١٢ظ)',
                                                        'Afternoon (2-5PM)': 'بعد الظهر (٢-٥م)',
                                                        'Evening (6-8PM)': 'مساءً (٦-٨م)',
                                                        'صباحًا (٩ص-١٢ظ)': 'Morning (9AM-12PM)',
                                                        'بعد الظهر (٢-٥م)': 'Afternoon (2-5PM)',
                                                        'مساءً (٦-٨م)': 'Evening (6-8PM)'
                                                    };

                                                    setDeliveryOptions({
                                                        ...deliveryOptions,
                                                        scheduledTimeEn: language === 'en' ? value : timeMap[value],
                                                        scheduledTimeAr: language === 'ar' ? value : timeMap[value]
                                                    });
                                                }}
                                            >
                                                <option value={language === 'en' ? 'Morning (9AM-12PM)' : 'صباحًا (٩ص-١٢ظ)'}>
                                                    {t('patientPage.pharmacyConnection.deliverySetup.schedule.morning')}
                                                </option>
                                                <option value={language === 'en' ? 'Afternoon (2-5PM)' : 'بعد الظهر (٢-٥م)'}>
                                                    {t('patientPage.pharmacyConnection.deliverySetup.schedule.afternoon')}
                                                </option>
                                                <option value={language === 'en' ? 'Evening (6-8PM)' : 'مساءً (٦-٨م)'}>
                                                    {t('patientPage.pharmacyConnection.deliverySetup.schedule.evening')}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <h3>{t('patientPage.pharmacyConnection.deliverySetup.address.title')}</h3>
                                    <textarea
                                        value={getLangField(deliveryOptions, 'address')}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setDeliveryOptions({
                                                ...deliveryOptions,
                                                addressEn: language === 'en' ? value : deliveryOptions.addressEn,
                                                addressAr: language === 'ar' ? value : deliveryOptions.addressAr
                                            });
                                        }}
                                        placeholder={t('patientPage.pharmacyConnection.deliverySetup.address.placeholder')}
                                        rows={3}
                                        aria-label="Delivery address"
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <h3>{t('patientPage.pharmacyConnection.deliverySetup.notifications.title')}</h3>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "text"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "text" })}
                                            />
                                            <span>{t('patientPage.pharmacyConnection.deliverySetup.notifications.textMessage')}</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "email"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "email" })}
                                            />
                                            <span>{t('patientPage.pharmacyConnection.deliverySetup.notifications.email')}</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="notificationPreference"
                                                checked={deliveryOptions.notificationPreference === "both"}
                                                onChange={() => setDeliveryOptions({ ...deliveryOptions, notificationPreference: "both" })}
                                            />
                                            <span>{t('patientPage.pharmacyConnection.deliverySetup.notifications.both')}</span>
                                        </label>
                                    </div>
                                </div>

                                {(deliveryOptions.notificationPreference === "text" || deliveryOptions.notificationPreference === "both") && (
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">{t('patientPage.pharmacyConnection.deliverySetup.notifications.phoneNumber')}</label>
                                        <input
                                            id="phoneNumber"
                                            type="tel"
                                            value={deliveryOptions.phoneNumber}
                                            onChange={(e) => setDeliveryOptions({ ...deliveryOptions, phoneNumber: e.target.value })}
                                            placeholder={t('patientPage.pharmacyConnection.deliverySetup.notifications.phoneNumberPlaceholder')}
                                        />
                                    </div>
                                )}

                                {(deliveryOptions.notificationPreference === "email" || deliveryOptions.notificationPreference === "both") && (
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">{t('patientPage.pharmacyConnection.deliverySetup.notifications.emailAddress')}</label>
                                        <input
                                            id="emailAddress"
                                            type="email"
                                            value={deliveryOptions.email}
                                            onChange={(e) => setDeliveryOptions({ ...deliveryOptions, email: e.target.value })}
                                            placeholder={t('patientPage.pharmacyConnection.deliverySetup.notifications.emailAddressPlaceholder')}
                                        />
                                    </div>
                                )}

                                <div className="form-group privacy-notice">
                                    <h3>{t('patientPage.pharmacyConnection.deliverySetup.privacy.title')}</h3>
                                    <p>
                                        {t('patientPage.pharmacyConnection.deliverySetup.privacy.text')}{' '}
                                        <a href="/privacy" className="privacy-link">{t('patientPage.pharmacyConnection.deliverySetup.privacy.policyLink')}</a>{' '}
                                        {t('patientPage.pharmacyConnection.deliverySetup.privacy.forMore')}
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
                                    {t('patientPage.pharmacyConnection.deliverySetup.actions.saveSettings')}
                                </motion.button>
                                <motion.button
                                    className="cancel-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleDeliverySetup}
                                >
                                    {t('patientPage.pharmacyConnection.deliverySetup.actions.cancel')}
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