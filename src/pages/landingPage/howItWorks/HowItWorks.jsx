import React, { useState } from 'react';
import './HowItWorks.scss';
import { UserPlus, FileText, Send, ShieldCheck, Bell, RefreshCw, Clipboard, Tablet, Database, CheckCircle, Package, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const HowItWorks = () => {
    const { loadSection, direction } = useLanguage();
    const howItWorksText = loadSection('landingPage.howItWorks');

    const [activeTab, setActiveTab] = useState('patients');

    // Define step icons for each user type
    const stepIcons = {
        patients: [
            <UserPlus />,
            <Bell />,
            <Tablet />,
            <Send />,
            <MessageSquare />,
            <RefreshCw />
        ],
        doctors: [
            <Database />,
            <FileText />,
            <ShieldCheck />,
            <Send />,
            <Clipboard />,
            <MessageSquare />
        ],
        pharmacists: [
            <Bell />,
            <ShieldCheck />,
            <CheckCircle />,
            <Package />,
            <MessageSquare />,
            <Database />
        ]
    };

    const renderContent = () => {
        const steps = howItWorksText.steps[activeTab];
        const icons = stepIcons[activeTab];

        return (
            <div className="process-steps">
                {steps.map((step, index) => (
                    <div className="step" key={index}>
                        <div className="step-icon">
                            {icons[index]}
                        </div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="how-it-works-section" id="how-it-works" dir={direction}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{howItWorksText.title}</h2>
                    <p className="section-subtitle">
                        {howItWorksText.subtitle}
                    </p>
                </div>

                <div className="user-tabs">
                    <button
                        className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patients')}
                    >
                        {howItWorksText.tabs.patients}
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('doctors')}
                    >
                        {howItWorksText.tabs.doctors}
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'pharmacists' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pharmacists')}
                    >
                        {howItWorksText.tabs.pharmacists}
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