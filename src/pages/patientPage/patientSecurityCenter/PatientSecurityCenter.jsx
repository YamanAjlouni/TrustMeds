import React, { useState, useEffect } from 'react';
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
    AlertCircle,
    Info,
    ChevronRight,
    Bell,
    FileText,
    LogOut
} from 'lucide-react';
import './PatientSecurityCenter.scss';
import { useLanguage } from '../../../context/LanguageContext';

const PatientSecurityCenter = () => {
    // Use the language context with patientPage.securityCenter prefix
    const { t: baseT, language, isRTL } = useLanguage();
    
    // Create a wrapper function that adds the prefix
    const t = (key, params = {}) => baseT(`patientPage.securityCenter.${key}`, params);

    const [showSecurityScore, setShowSecurityScore] = useState(true);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [passwordLastChanged, setPasswordLastChanged] = useState("62 days ago");
    const [isLoaded, setIsLoaded] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(true);

    const [dataSharing, setDataSharing] = useState({
        doctors: true,
        pharmacies: true,
        insurers: true,
        researchers: false,
        thirdParty: false
    });

    const [recentActivity] = useState([
        {
            type: 'login',
            device: 'iPhone 13',
            location: 'San Francisco, CA',
            time: '2024-03-20T10:30:00',
            status: 'success',
            ip: '192.168.1.1'
        },
        {
            type: 'prescription_access',
            device: 'Chrome Browser (Windows)',
            location: 'Seattle, WA',
            time: '2024-03-19T15:45:00',
            status: 'success',
            ip: '172.16.254.1'
        },
        {
            type: 'failed_login',
            device: 'Unknown Device',
            location: 'Bangkok, Thailand',
            time: '2024-03-18T03:20:00',
            status: 'blocked',
            ip: '203.0.113.1'
        },
        {
            type: 'security_settings',
            device: 'Chrome Browser (MacOS)',
            location: 'San Francisco, CA',
            time: '2024-03-16T14:22:00',
            status: 'success',
            ip: '192.168.1.1'
        }
    ]);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    const calculateSecurityScore = () => {
        let score = 60; // Base score
        if (twoFactorEnabled) score += 20;
        if (biometricEnabled) score += 10;
        if (dataSharing.researchers === false) score += 5;
        if (dataSharing.thirdParty === false) score += 5;
        return Math.min(score, 100);
    };

    const getSecurityLevel = (score) => {
        if (score >= 80) return { level: t('securityScore.level.strong'), color: '#10B981' };
        if (score >= 60) return { level: t('securityScore.level.good'), color: '#FBBF24' };
        return { level: t('securityScore.level.vulnerable'), color: '#EF4444' };
    };

    const handleDataSharingChange = (key) => {
        setDataSharing(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const getActivityIcon = (type, status) => {
        if (status === 'blocked') return <AlertTriangle className="activity-icon-symbol warning" />;
        switch (type) {
            case 'login':
                return <CheckCircle className="activity-icon-symbol success" />;
            case 'prescription_access':
                return <Eye className="activity-icon-symbol info" />;
            case 'security_settings':
                return <Settings className="activity-icon-symbol info" />;
            default:
                return <Clock className="activity-icon-symbol neutral" />;
        }
    };

    const getActivityTitle = (type) => {
        return t(`activity.types.${type}`);
    };

    const securityLevel = getSecurityLevel(calculateSecurityScore());

    const securityRecommendations = [
        {
            id: 1,
            title: t('recommendations.items.twoFactor.title'),
            description: t('recommendations.items.twoFactor.description'),
            icon: <Key size={20} />,
            action: t('recommendations.items.twoFactor.action'),
            enabled: twoFactorEnabled,
            onClick: () => setTwoFactorEnabled(true)
        },
        {
            id: 2,
            title: t('recommendations.items.password.title'),
            description: t('recommendations.items.password.description') + ' ' + passwordLastChanged,
            icon: <Lock size={20} />,
            action: t('recommendations.items.password.action'),
            enabled: false,
            onClick: () => alert('This would open the change password dialog')
        },
        {
            id: 3,
            title: t('recommendations.items.dataSharing.title'),
            description: t('recommendations.items.dataSharing.description'),
            icon: <Share2 size={20} />,
            action: t('recommendations.items.dataSharing.action'),
            enabled: !dataSharing.researchers && !dataSharing.thirdParty,
            onClick: () => document.getElementById('data-sharing-card').scrollIntoView({ behavior: 'smooth' })
        }
    ];

    useEffect(() => {
        // Select all info tooltips in the document
        const infoTooltips = document.querySelectorAll('.info-tooltip');

        const handleMouseEnter = (e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip-text');

            // Use fixed positioning to ensure tooltip is always visible
            tooltip.style.position = 'fixed';

            // Get the position of the info icon
            const rect = e.currentTarget.getBoundingClientRect();

            // Position the tooltip above the icon
            tooltip.style.bottom = 'auto';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

            // Center the tooltip horizontally relative to the icon
            // But ensure it doesn't go off-screen to the left
            const leftPosition = Math.max(
                10, // Minimum 10px from left edge
                rect.left - (tooltip.offsetWidth / 2) + (rect.width / 2)
            );

            // Ensure it doesn't go off-screen to the right
            const rightEdge = leftPosition + tooltip.offsetWidth;
            const viewportWidth = window.innerWidth;

            tooltip.style.left = (rightEdge > viewportWidth - 10
                ? viewportWidth - tooltip.offsetWidth - 10
                : leftPosition) + 'px';

            // Make tooltip visible
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            tooltip.style.zIndex = '9999';
        };

        const handleMouseLeave = (e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip-text');
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        };

        // Add event listeners to all tooltips
        infoTooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', handleMouseEnter);
            tooltip.addEventListener('mouseleave', handleMouseLeave);
        });

        // Clean up event listeners when component unmounts
        return () => {
            infoTooltips.forEach(tooltip => {
                tooltip.removeEventListener('mouseenter', handleMouseEnter);
                tooltip.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className={`security-center ${isRTL ? 'rtl' : ''}`}>
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('loading')}</p>
                </div>
            ) : (
                <>
                    <div className="security-header">
                        <div className="header-content">
                            <div className="header-icon-wrapper">
                                <Shield className="header-icon" />
                            </div>
                            <div className="header-text">
                                <h1>{t('header.title')}</h1>
                                <p>{t('header.subtitle')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="security-grid">
                        {/* Security Score Card */}
                        <div className="security-card score-card">
                            <div className="card-header">
                                <h2>{t('securityScore.title')}</h2>
                                <button
                                    className="toggle-visibility"
                                    onClick={() => setShowSecurityScore(!showSecurityScore)}
                                    aria-label={showSecurityScore ? t('securityScore.hideLabel') : t('securityScore.showLabel')}
                                >
                                    {showSecurityScore ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="score-content">
                                {showSecurityScore ? (
                                    <>
                                        <div className="score-visualization">
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
                                                        stroke={securityLevel.color}
                                                        strokeWidth="3"
                                                        strokeDasharray={`${calculateSecurityScore()}, 100`}
                                                    />
                                                    <text x="18" y="20.35" className="score-text">
                                                        {calculateSecurityScore()}%
                                                    </text>
                                                </svg>
                                            </div>
                                            <div className="score-details">
                                                <h3>{t('securityLevel')}: <span style={{ color: securityLevel.color }}>{securityLevel.level}</span></h3>
                                                <div className="score-breakdown">
                                                    <div className="score-item">
                                                        <span className="item-label">{t('securityScore.details.twoFactor')}:</span>
                                                        <span className={`item-status ${twoFactorEnabled ? 'active' : 'inactive'}`}>
                                                            {twoFactorEnabled ? t('securityScore.status.enabled') : t('securityScore.status.disabled')}
                                                        </span>
                                                    </div>
                                                    <div className="score-item">
                                                        <span className="item-label">{t('securityScore.details.biometric')}:</span>
                                                        <span className={`item-status ${biometricEnabled ? 'active' : 'inactive'}`}>
                                                            {biometricEnabled ? t('securityScore.status.enabled') : t('securityScore.status.disabled')}
                                                        </span>
                                                    </div>
                                                    <div className="score-item">
                                                        <span className="item-label">{t('securityScore.details.passwordAge')}:</span>
                                                        <span className="item-status">{passwordLastChanged}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="score-actions">
                                            <button className="action-button refresh">
                                                <RefreshCw size={18} />
                                                {t('securityScore.actions.refreshScore')}
                                            </button>
                                            <button className="action-button improve" onClick={() => setShowRecommendations(true)}>
                                                <Shield size={18} />
                                                {t('securityScore.actions.improveSecurity')}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="score-hidden">
                                        <Lock size={32} />
                                        <p>{t('securityScore.hiddenMessage')}</p>
                                        <p className="score-hidden-note">{t('securityScore.hiddenNote')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Recommendations */}
                        {showRecommendations && (
                            <div className="security-card recommendations-card">
                                <div className="card-header">
                                    <h2>{t('recommendations.title')}</h2>
                                    <button
                                        className="close-button"
                                        onClick={() => setShowRecommendations(false)}
                                        aria-label={t('closeButtonLabel')}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="recommendations-list">
                                    {securityRecommendations.map(recommendation => (
                                        <div key={recommendation.id} className={`recommendation-item ${recommendation.enabled ? 'completed' : ''}`}>
                                            <div className="recommendation-icon">
                                                {recommendation.enabled ?
                                                    <CheckCircle size={20} className="check-icon" /> :
                                                    recommendation.icon
                                                }
                                            </div>
                                            <div className="recommendation-content">
                                                <h3>{recommendation.title}</h3>
                                                <p>{recommendation.description}</p>
                                            </div>
                                            {!recommendation.enabled && (
                                                <button
                                                    className="recommendation-action"
                                                    onClick={recommendation.onClick}
                                                >
                                                    {recommendation.action}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Authentication Settings */}
                        <div className="security-card">
                            <div className="card-header">
                                <h2>{t('authentication.title')}</h2>
                                <div className="info-tooltip">
                                    <Info size={16} />
                                    <span className="tooltip-text">{t('authentication.tooltip')}</span>
                                </div>
                            </div>
                            <div className="settings-list">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-icon password">
                                            <Lock size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('authentication.items.password.title')}</h3>
                                            <p>{t('authentication.items.password.description')} {passwordLastChanged}</p>
                                        </div>
                                    </div>
                                    <button className="setting-action-btn">
                                        {t('authentication.items.password.action')}
                                    </button>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-icon two-factor">
                                            <Key size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('authentication.items.twoFactor.title')}</h3>
                                            <p>{t('authentication.items.twoFactor.description')}</p>
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
                                        <div className="setting-icon biometric">
                                            <Smartphone size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('authentication.items.biometric.title')}</h3>
                                            <p>{t('authentication.items.biometric.description')}</p>
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

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-icon sessions">
                                            <LogOut size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('authentication.items.sessions.title')}</h3>
                                            <p>{t('authentication.items.sessions.description')}</p>
                                        </div>
                                    </div>
                                    <button className="setting-action-btn">
                                        {t('authentication.items.sessions.action')} <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data Sharing Preferences */}
                        <div id="data-sharing-card" className="security-card">
                            <div className="card-header">
                                <h2>{t('dataSharing.title')}</h2>
                                <div className="info-tooltip">
                                    <Info size={16} />
                                    <span className="tooltip-text">{t('dataSharing.tooltip')}</span>
                                </div>
                            </div>
                            <div className="settings-list">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-icon doctors">
                                            <UserPlus size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('dataSharing.items.doctors.title')}</h3>
                                            <p>{t('dataSharing.items.doctors.description')}</p>
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
                                        <div className="setting-icon pharmacies">
                                            <Share2 size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('dataSharing.items.pharmacies.title')}</h3>
                                            <p>{t('dataSharing.items.pharmacies.description')}</p>
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
                                        <div className="setting-icon insurance">
                                            <FileText size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('dataSharing.items.insurers.title')}</h3>
                                            <p>{t('dataSharing.items.insurers.description')}</p>
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
                                        <div className="setting-icon research">
                                            <AlertCircle size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('dataSharing.items.researchers.title')}</h3>
                                            <p>{t('dataSharing.items.researchers.description')}</p>
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

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-icon third-party">
                                            <Bell size={20} />
                                        </div>
                                        <div className="setting-text">
                                            <h3>{t('dataSharing.items.thirdParty.title')}</h3>
                                            <p>{t('dataSharing.items.thirdParty.description')}</p>
                                        </div>
                                    </div>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={dataSharing.thirdParty}
                                            onChange={() => handleDataSharingChange('thirdParty')}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="privacy-notice">
                                <AlertTriangle size={16} />
                                <p>
                                    {t('dataSharing.privacyNotice')}
                                    <a href="#privacy-policy"> {t('dataSharing.privacyPolicyLink')}</a>
                                </p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="security-card activity-card">
                            <div className="card-header">
                                <h2>{t('activity.title')}</h2>
                                <button className="view-all-btn">
                                    {t('activity.viewAll')} <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="activity-list">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className={`activity-item ${activity.status}`}>
                                        <div className={`activity-icon ${activity.status}`}>
                                            {getActivityIcon(activity.type, activity.status)}
                                        </div>
                                        <div className="activity-details">
                                            <div className="activity-header">
                                                <h3>{getActivityTitle(activity.type)}</h3>
                                                <span className={`activity-status ${activity.status}`}>
                                                    {t(`activity.status.${activity.status}`)}
                                                </span>
                                            </div>
                                            <div className="activity-meta">
                                                <p className="activity-device">{activity.device}</p>
                                                <p className="activity-location">{activity.location} • IP: {activity.ip}</p>
                                                <time className="activity-time">
                                                    {new Date(activity.time).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                                </time>
                                            </div>
                                        </div>
                                        <div className="activity-actions">
                                            {activity.status === 'blocked' && (
                                                <button className="activity-action-btn warning">
                                                    {t('activity.actions.report')}
                                                </button>
                                            )}
                                            <button className="activity-action-btn">
                                                {t('activity.actions.details')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PatientSecurityCenter;