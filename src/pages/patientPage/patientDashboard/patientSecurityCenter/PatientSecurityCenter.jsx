import React, { useState } from 'react';
import {
    Shield,
    Lock,
    Key,
    Smartphone,
    Share2,
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    EyeOff,
    RefreshCw,
    UserPlus,
    Settings,
    AlertCircle
} from 'lucide-react';
import './PatientSecurityCenter.scss';

const PatientSecurityCenter = () => {
    const [showSecurityScore, setShowSecurityScore] = useState(true);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [dataSharing, setDataSharing] = useState({
        doctors: true,
        pharmacies: true,
        insurers: true,
        researchers: false
    });

    const [recentActivity] = useState([
        {
            type: 'login',
            device: 'iPhone 13',
            location: 'San Francisco, CA',
            time: '2024-03-20T10:30:00',
            status: 'success'
        },
        {
            type: 'prescription_access',
            device: 'Chrome Browser',
            location: 'Seattle, WA',
            time: '2024-03-19T15:45:00',
            status: 'success'
        },
        {
            type: 'failed_login',
            device: 'Unknown Device',
            location: 'Bangkok, Thailand',
            time: '2024-03-18T03:20:00',
            status: 'blocked'
        }
    ]);

    const calculateSecurityScore = () => {
        let score = 60; // Base score
        if (twoFactorEnabled) score += 20;
        if (biometricEnabled) score += 10;
        if (dataSharing.researchers === false) score += 10; // Privacy-conscious
        return Math.min(score, 100);
    };

    const handleDataSharingChange = (key) => {
        setDataSharing(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const getActivityIcon = (type, status) => {
        if (status === 'blocked') return <AlertTriangle className="text-red-500" />;
        switch (type) {
            case 'login':
                return <CheckCircle className="text-green-500" />;
            case 'prescription_access':
                return <Eye className="text-blue-500" />;
            default:
                return <Clock className="text-gray-500" />;
        }
    };

    return (
        <div className="security-center">
            <div className="security-header">
                <div className="header-content">
                    <Shield className="header-icon" />
                    <div className="header-text">
                        <h1>Security Center</h1>
                        <p>Manage your account security and privacy preferences</p>
                    </div>
                </div>
            </div>

            <div className="security-grid">
                {/* Security Score Card */}
                <div className="security-card score-card">
                    <div className="card-header">
                        <h2>Security Score</h2>
                        <button
                            className="toggle-visibility"
                            onClick={() => setShowSecurityScore(!showSecurityScore)}
                        >
                            {showSecurityScore ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="score-content">
                        {showSecurityScore ? (
                            <>
                                <div className="score-circle">
                                    <svg viewBox="0 0 36 36" className="score-chart">
                                        <path
                                            d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#eee"
                                            strokeWidth="3"
                                        />
                                        <path
                                            d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#2C78BE"
                                            strokeWidth="3"
                                            strokeDasharray={`${calculateSecurityScore()}, 100`}
                                        />
                                        <text x="18" y="20.35" className="score-text">
                                            {calculateSecurityScore()}%
                                        </text>
                                    </svg>
                                </div>
                                <div className="score-actions">
                                    <button className="action-button">
                                        <RefreshCw size={18} />
                                        Refresh Score
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="score-hidden">
                                <Lock size={24} />
                                <p>Score hidden</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Authentication Settings */}
                <div className="security-card">
                    <h2>Authentication Settings</h2>
                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <Key size={20} />
                                <div>
                                    <h3>Two-Factor Authentication</h3>
                                    <p>Add an extra layer of security to your account</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={twoFactorEnabled}
                                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div className="setting-info">
                                <Smartphone size={20} />
                                <div>
                                    <h3>Biometric Login</h3>
                                    <p>Use fingerprint or face recognition to access your account</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={biometricEnabled}
                                    onChange={() => setBiometricEnabled(!biometricEnabled)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Data Sharing Preferences */}
                <div className="security-card">
                    <h2>Data Sharing Preferences</h2>
                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <UserPlus size={20} />
                                <div>
                                    <h3>Healthcare Providers</h3>
                                    <p>Share data with your doctors and specialists</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={dataSharing.doctors}
                                    onChange={() => handleDataSharingChange('doctors')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div className="setting-info">
                                <Share2 size={20} />
                                <div>
                                    <h3>Pharmacies</h3>
                                    <p>Share data with your preferred pharmacies</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={dataSharing.pharmacies}
                                    onChange={() => handleDataSharingChange('pharmacies')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div className="setting-info">
                                <Settings size={20} />
                                <div>
                                    <h3>Insurance Providers</h3>
                                    <p>Share data with your insurance company</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={dataSharing.insurers}
                                    onChange={() => handleDataSharingChange('insurers')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div className="setting-info">
                                <AlertCircle size={20} />
                                <div>
                                    <h3>Medical Research</h3>
                                    <p>Contribute anonymized data to medical research</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={dataSharing.researchers}
                                    onChange={() => handleDataSharingChange('researchers')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="security-card">
                    <h2>Recent Security Activity</h2>
                    <div className="activity-list">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-icon">
                                    {getActivityIcon(activity.type, activity.status)}
                                </div>
                                <div className="activity-details">
                                    <h3>{activity.type.replace('_', ' ').toUpperCase()}</h3>
                                    <p>{activity.device} • {activity.location}</p>
                                    <span className="activity-time">
                                        {new Date(activity.time).toLocaleString()}
                                    </span>
                                </div>
                                <div className={`activity-status ${activity.status}`}>
                                    {activity.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientSecurityCenter;
