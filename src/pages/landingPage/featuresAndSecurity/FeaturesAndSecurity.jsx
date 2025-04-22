import React, { useState } from 'react';
import './FeaturesAndSecurity.scss';
import { Shield, Lock, Zap, Smartphone, Clock, Users, Server, BarChart3, Share2, ShieldCheck, Key, Database } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const FeaturesAndSecurity = () => {
    const { loadSection, direction } = useLanguage();
    // You will create this translation file yourself
    const featuresText = loadSection('landingPage.featuresAndSecurity');

    const [activeTab, setActiveTab] = useState('features');

    // Define the feature icons
    const featureIcons = {
        mobile: <Smartphone />,
        realtime: <Clock />,
        family: <Users />,
        instant: <Zap />,
        tracking: <BarChart3 />,
        integration: <Share2 />
    };

    // Define the security icons
    const securityIcons = {
        encryption: <ShieldCheck />,
        authentication: <Key />,
        compliance: <Lock />,
        blockchain: <Shield />,
        storage: <Database />,
        audits: <Server />
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'features':
                return (
                    <div className="features-grid">
                        {featuresText.features.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="feature-icon">
                                    {featureIcons[feature.icon]}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'security':
                return (
                    <div className="security-content">
                        <div className="security-overview">
                            <p>{featuresText.securityOverview}</p>
                        </div>

                        <div className="security-features">
                            {featuresText.security.map((security, index) => (
                                <div className="security-feature" key={index}>
                                    <div className="security-icon">
                                        {securityIcons[security.icon]}
                                    </div>
                                    <div className="security-details">
                                        <h3>{security.title}</h3>
                                        <p>{security.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className="features-security-section" id="features-security" dir={direction}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{featuresText.title}</h2>
                    <p className="section-subtitle">
                        {featuresText.subtitle}
                    </p>
                </div>

                <div className="tab-selector">
                    <button
                        className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveTab('features')}
                    >
                        {featuresText.tabs.features}
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        {featuresText.tabs.security}
                    </button>
                </div>

                <div className="content-container">
                    {renderContent()}
                </div>
            </div>

            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>
        </section>
    );
};

export default FeaturesAndSecurity;