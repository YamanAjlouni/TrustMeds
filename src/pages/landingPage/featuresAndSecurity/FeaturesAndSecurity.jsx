import React, { useState } from 'react';
import './FeaturesAndSecurity.scss';
import { Shield, Lock, Zap, Smartphone, Clock, Users, Server, BarChart3, Share2, ShieldCheck, Key, Database } from 'lucide-react';

const FeaturesAndSecurity = () => {
    const [activeTab, setActiveTab] = useState('features');

    const renderContent = () => {
        switch (activeTab) {
            case 'features':
                return (
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Smartphone />
                            </div>
                            <h3>Mobile Access</h3>
                            <p>Access your prescriptions anytime, anywhere through our secure website application.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Clock />
                            </div>
                            <h3>Real-time Updates</h3>
                            <p>Receive instant notifications on prescription status changes and medication reminders.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users />
                            </div>
                            <h3>Family Management</h3>
                            <p>Manage prescriptions for family members with designated access controls.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Zap />
                            </div>
                            <h3>Instant Transfers</h3>
                            <p>Send prescriptions to any pharmacy in our network with just one click.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <BarChart3 />
                            </div>
                            <h3>Medication Tracking</h3>
                            <p>Monitor your medication history and adherence with detailed analytics.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Share2 />
                            </div>
                            <h3>Provider Integration</h3>
                            <p>Seamlessly connect with healthcare providers and pharmacies in our secure network.</p>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="security-content">
                        <div className="security-overview">
                            <p>TrustMeds employs industry-leading security protocols to protect your sensitive medical information. Our multi-layered approach ensures that your prescription data remains private and secure.</p>
                        </div>
                        
                        <div className="security-features">
                            <div className="security-feature">
                                <div className="security-icon">
                                    <ShieldCheck />
                                </div>
                                <div className="security-details">
                                    <h3>End-to-End Encryption</h3>
                                    <p>All prescription data is encrypted using military-grade encryption protocols, ensuring your information is protected from end to end.</p>
                                </div>
                            </div>

                            <div className="security-feature">
                                <div className="security-icon">
                                    <Key />
                                </div>
                                <div className="security-details">
                                    <h3>Multi-Factor Authentication</h3>
                                    <p>Access to your account is secured through multiple verification steps, preventing unauthorized access even if credentials are compromised.</p>
                                </div>
                            </div>

                            <div className="security-feature">
                                <div className="security-icon">
                                    <Lock />
                                </div>
                                <div className="security-details">
                                    <h3>HIPAA Compliance</h3>
                                    <p>Our platform is fully compliant with healthcare privacy regulations, ensuring your medical information is handled according to strict legal standards.</p>
                                </div>
                            </div>

                            <div className="security-feature">
                                <div className="security-icon">
                                    <Shield />
                                </div>
                                <div className="security-details">
                                    <h3>Blockchain Verification</h3>
                                    <p>Prescriptions are verified using blockchain technology, creating an immutable record that prevents unauthorized alterations.</p>
                                </div>
                            </div>

                            <div className="security-feature">
                                <div className="security-icon">
                                    <Database />
                                </div>
                                <div className="security-details">
                                    <h3>Secure Data Storage</h3>
                                    <p>Your data is stored in redundant, encrypted databases with continuous monitoring to detect and prevent potential security threats.</p>
                                </div>
                            </div>

                            <div className="security-feature">
                                <div className="security-icon">
                                    <Server />
                                </div>
                                <div className="security-details">
                                    <h3>Regular Security Audits</h3>
                                    <p>Our systems undergo rigorous third-party security assessments to identify and address potential vulnerabilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className="features-security-section" id="features-security">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Features & Security</h2>
                    <p className="section-subtitle">
                        Powerful features combined with industry-leading security to revolutionize prescription management
                    </p>
                </div>

                <div className="tab-selector">
                    <button
                        className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveTab('features')}
                    >
                        Key Features
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security Measures
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