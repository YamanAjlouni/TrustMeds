import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClinicMedical, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PharmacyConnectSection = ({ preferredPharmacies = [] }) => {
    const navigate = useNavigate();

    // Calculate pharmacy summary info
    const primaryPharmacy = preferredPharmacies.find(pharmacy => pharmacy.isPrimary);
    const hasDeliveryEnabled = preferredPharmacies.some(pharmacy => pharmacy.deliveryAvailable);

    return (
        <motion.div
            className="side-card pharmacy-connect-card"
            whileHover={{ scale: 1.02 }}
        >
            <div className="card-header">
                <h2><FaClinicMedical className="card-icon" /> Pharmacy Connect</h2>
            </div>

            <div className="pharmacy-connect-content">
                <div className="pharmacy-connect-summary">
                    <p className="pharmacy-count">
                        You have {preferredPharmacies.length} trusted {preferredPharmacies.length === 1 ? 'pharmacy' : 'pharmacies'}
                    </p>

                    {primaryPharmacy && (
                        <div className="primary-pharmacy-info">
                            <p className="primary-pharmacy-label">Primary:</p>
                            <p className="primary-pharmacy-name">{primaryPharmacy.name}</p>
                        </div>
                    )}

                    {hasDeliveryEnabled && (
                        <div className="delivery-status">
                            <span className="delivery-badge">Delivery Available</span>
                        </div>
                    )}
                </div>

                <motion.button
                    className="view-pharmacies-btn"
                    onClick={() => navigate('/patient/pharmacies')}
                    whileHover={{ scale: 1.02, backgroundColor: "#0056b3" }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Pharmacies <FaArrowRight className="arrow-icon" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PharmacyConnectSection;