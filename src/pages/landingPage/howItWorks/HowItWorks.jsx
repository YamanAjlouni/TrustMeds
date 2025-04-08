import React, { useState } from 'react';
import './HowItWorks.scss';
import { UserPlus, FileText, Send, ShieldCheck, Bell, RefreshCw, Clipboard, Tablet, Database, CheckCircle, Package, MessageSquare } from 'lucide-react';

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('patients');

    const renderContent = () => {
        switch (activeTab) {
            case 'patients':
                return (
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-icon">
                                <UserPlus />
                            </div>
                            <div className="step-content">
                                <h3>Create Account</h3>
                                <p>Sign up with your personal information and connect with your healthcare providers.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Bell />
                            </div>
                            <div className="step-content">
                                <h3>Receive Notifications</h3>
                                <p>Get instant alerts when your doctor issues a new prescription.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Tablet />
                            </div>
                            <div className="step-content">
                                <h3>Access Prescriptions</h3>
                                <p>View all your prescriptions securely through the TrustMeds mobile app or web portal.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Send />
                            </div>
                            <div className="step-content">
                                <h3>Send to Pharmacy</h3>
                                <p>Choose your preferred pharmacy and send your prescription with one click.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <MessageSquare />
                            </div>
                            <div className="step-content">
                                <h3>Stay Updated</h3>
                                <p>Receive status updates and communicate with your pharmacy about your medication.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <RefreshCw />
                            </div>
                            <div className="step-content">
                                <h3>Manage Refills</h3>
                                <p>Request prescription renewals and set up reminders for medication refills.</p>
                            </div>
                        </div>
                    </div>
                );

            case 'doctors':
                return (
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-icon">
                                <Database />
                            </div>
                            <div className="step-content">
                                <h3>Secure Login</h3>
                                <p>Access the TrustMeds platform using multi-factor authentication.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <FileText />
                            </div>
                            <div className="step-content">
                                <h3>Create Prescription</h3>
                                <p>Generate digital prescriptions with comprehensive medication details.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <ShieldCheck />
                            </div>
                            <div className="step-content">
                                <h3>Digital Signature</h3>
                                <p>Authenticate prescriptions with your secure digital signature and encryption.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Send />
                            </div>
                            <div className="step-content">
                                <h3>Transmit Securely</h3>
                                <p>Send the prescription directly to the patient's TrustMeds account.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Clipboard />
                            </div>
                            <div className="step-content">
                                <h3>Manage Records</h3>
                                <p>Track prescription history and monitor patient medication compliance.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <MessageSquare />
                            </div>
                            <div className="step-content">
                                <h3>Patient Communication</h3>
                                <p>Securely message patients about their prescriptions and answer questions.</p>
                            </div>
                        </div>
                    </div>
                );

            case 'pharmacists':
                return (
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-icon">
                                <Bell />
                            </div>
                            <div className="step-content">
                                <h3>Receive Orders</h3>
                                <p>Get immediate notifications when new prescriptions are sent to your pharmacy.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <ShieldCheck />
                            </div>
                            <div className="step-content">
                                <h3>Verify Authenticity</h3>
                                <p>Confirm prescription validity through blockchain verification and doctor credentials.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <CheckCircle />
                            </div>
                            <div className="step-content">
                                <h3>Process Prescription</h3>
                                <p>Review medication details and check for potential drug interactions.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Package />
                            </div>
                            <div className="step-content">
                                <h3>Prepare Medication</h3>
                                <p>Fill the prescription and prepare it for pickup or delivery.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <MessageSquare />
                            </div>
                            <div className="step-content">
                                <h3>Patient Communication</h3>
                                <p>Send notifications about prescription status and answer medication questions.</p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-icon">
                                <Database />
                            </div>
                            <div className="step-content">
                                <h3>Update Records</h3>
                                <p>Maintain complete digital records of all dispensed medications.</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className="how-it-works-section" id="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">
                        Our seamless process ensures secure, efficient prescription management for everyone involved
                    </p>
                </div>

                <div className="user-tabs">
                    <button
                        className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patients')}
                    >
                        For Patients
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('doctors')}
                    >
                        For Doctors
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'pharmacists' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pharmacists')}
                    >
                        For Pharmacists
                    </button>
                </div>

                <div className="process-content">
                    {renderContent()}
                </div>
            </div>

            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>


        </section>
    );
};

export default HowItWorks;