import React, { useState, useEffect } from 'react';
import './PharmacyHelp.scss';
import {
    FaQuestionCircle,
    FaPlayCircle,
    FaFileAlt,
    FaShieldAlt,
    FaDownload,
    FaPhone,
    FaEnvelope,
    FaCommentAlt,
    FaSearch,
    FaExclamationTriangle,
    FaChevronDown,
    FaChevronUp,
    FaExternalLinkAlt,
    FaBookmark,
    FaRegBookmark,
    FaClipboardCheck,
    FaCheck
} from 'react-icons/fa';

const PharmacyHelp = () => {
    // State
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('guides');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [savedGuides, setSavedGuides] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);

    // Sample help data - in a real app, this would come from your API/backend
    const [helpData, setHelpData] = useState({
        guides: [
            {
                id: 'guide-1',
                title: 'Getting Started with Pharmacy System',
                description: 'Learn the basics of navigating and using the pharmacy management system',
                category: 'beginner',
                type: 'video',
                duration: '5:30',
                thumbnail: '/guide-1-thumbnail.jpg'
            },
            {
                id: 'guide-2',
                title: 'Processing Prescriptions',
                description: 'Step-by-step guide on how to process and verify prescriptions',
                category: 'workflow',
                type: 'document',
                pages: 3,
                thumbnail: '/guide-2-thumbnail.jpg'
            },
            {
                id: 'guide-3',
                title: 'Using the QR Scanner',
                description: 'How to use the QR scanner to quickly retrieve prescription information',
                category: 'workflow',
                type: 'video',
                duration: '3:45',
                thumbnail: '/guide-3-thumbnail.jpg'
            },
            {
                id: 'guide-4',
                title: 'Managing Insurance Claims',
                description: 'Complete guide to handling insurance claims for prescriptions',
                category: 'advanced',
                type: 'document',
                pages: 5,
                thumbnail: '/guide-4-thumbnail.jpg'
            },
            {
                id: 'guide-5',
                title: 'System Security Best Practices',
                description: 'Learn how to maintain security and privacy while using the system',
                category: 'security',
                type: 'document',
                pages: 4,
                thumbnail: '/guide-5-thumbnail.jpg'
            },
            {
                id: 'guide-6',
                title: 'Communicating with Doctors',
                description: 'Best practices for effective communication with prescribing physicians',
                category: 'workflow',
                type: 'video',
                duration: '4:15',
                thumbnail: '/guide-6-thumbnail.jpg'
            }
        ],
        faqs: [
            {
                id: 'faq-1',
                question: 'How do I reset my password?',
                answer: 'To reset your password, go to the Profile & Settings page, click on the "Change Password" button in the Personal Information tab, and follow the instructions. You\'ll need to enter your current password and a new password that meets our security requirements.',
                category: 'account'
            },
            {
                id: 'faq-2',
                question: 'What should I do if the QR scanner isn\'t working?',
                answer: 'If the QR scanner isn\'t working, first ensure that you\'ve granted the browser permission to access your camera. If that doesn\'t resolve the issue, try refreshing the page. If problems persist, you can manually enter the prescription ID in the search field on the Pending Prescriptions page.',
                category: 'technical'
            },
            {
                id: 'faq-3',
                question: 'How do I search for a patient\'s prescription history?',
                answer: 'To search for a patient\'s prescription history, go to the Dispensed History section and use the search box at the top of the page. You can search by patient name, ID, or prescription number. Use the filters to narrow down results by date range or medication type.',
                category: 'workflow'
            },
            {
                id: 'faq-4',
                question: 'Can I use the system on my mobile device?',
                answer: 'Yes, the pharmacy system is fully responsive and works on mobile devices. You can access all features including prescription scanning (using your device\'s camera), dispensing, and patient management. For the best experience on smaller screens, we recommend using the app in landscape mode.',
                category: 'technical'
            },
            {
                id: 'faq-5',
                question: 'What do I do if I notice a mistake on a prescription?',
                answer: 'If you notice a mistake on a prescription, do not dispense it. Instead, use the Communication feature to contact the prescribing physician. Select the prescription in question, click on "Contact Doctor," and explain the issue. Wait for the physician\'s response before proceeding. All communications are logged for record-keeping.',
                category: 'workflow'
            },
            {
                id: 'faq-6',
                question: 'How are patient data and prescription information kept secure?',
                answer: 'Patient data and prescription information are protected through multiple security measures. All data is encrypted both in transit and at rest. Access is controlled through role-based permissions, and all activities are logged for audit purposes. We comply with relevant healthcare data protection regulations and conduct regular security assessments.',
                category: 'security'
            }
        ],
        support: {
            phoneNumber: '+20 123 456 7890',
            email: 'pharmacy-support@healthplus.com',
            hours: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
            emergencySupport: true
        },
        securityGuidelines: [
            {
                id: 'security-1',
                title: 'Password Management',
                content: 'Always use strong, unique passwords for your account. Never share your password with anyone, including colleagues or IT support. Change your password regularly, at least once every 90 days.'
            },
            {
                id: 'security-2',
                title: 'System Access',
                content: 'Always lock your workstation when stepping away. Never leave the system logged in and unattended. Do not allow others to use the system under your credentials, even for a brief moment.'
            },
            {
                id: 'security-3',
                title: 'Patient Data Privacy',
                content: 'Patient information should only be accessed on a need-to-know basis. Do not discuss patient information in public areas. Ensure that screens displaying patient data are not visible to unauthorized individuals.'
            },
            {
                id: 'security-4',
                title: 'Suspicious Activity',
                content: 'Report any suspicious activity or potential security breaches immediately to your supervisor and the IT security team. This includes unexpected system behavior, unauthorized access attempts, or suspected phishing emails.'
            }
        ]
    });

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    // Handle search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter guides based on search query
    const filteredGuides = helpData.guides.filter(guide =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter FAQs based on search query
    const filteredFaqs = helpData.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Toggle FAQ expansion
    const toggleFaq = (id) => {
        if (expandedFaq === id) {
            setExpandedFaq(null);
        } else {
            setExpandedFaq(id);
        }
    };

    // Toggle save guide
    const toggleSaveGuide = (id) => {
        if (savedGuides.includes(id)) {
            setSavedGuides(savedGuides.filter(guideId => guideId !== id));
        } else {
            setSavedGuides([...savedGuides, id]);
        }
    };

    // Copy support email to clipboard
    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText(helpData.support.email).then(() => {
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        });
    };

    // Get guide icon based on type
    const getGuideIcon = (type) => {
        switch (type) {
            case 'video':
                return <FaPlayCircle className="guide-type-icon video" />;
            case 'document':
                return <FaFileAlt className="guide-type-icon document" />;
            default:
                return <FaQuestionCircle className="guide-type-icon" />;
        }
    };

    // Render Guides tab content
    const renderGuidesTab = () => {
        return (
            <div className="help-content-section">
                <div className="guides-header">
                    <h3>Guides & Tutorials</h3>
                    <div className="guides-search">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search guides..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>
                </div>

                {filteredGuides.length === 0 ? (
                    <div className="no-results">
                        <FaExclamationTriangle className="no-results-icon" />
                        <h4>No Guides Found</h4>
                        <p>No guides match your search term "{searchQuery}". Try a different search term or browse all guides.</p>
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="guides-grid">
                        {filteredGuides.map(guide => (
                            <div className="guide-card" key={guide.id}>
                                <div className="guide-header">
                                    <div className="guide-thumbnail">
                                        {getGuideIcon(guide.type)}
                                    </div>
                                    <button
                                        className="bookmark-btn"
                                        onClick={() => toggleSaveGuide(guide.id)}
                                    >
                                        {savedGuides.includes(guide.id) ?
                                            <FaBookmark className="bookmarked" /> :
                                            <FaRegBookmark />
                                        }
                                    </button>
                                </div>
                                <div className="guide-content">
                                    <h4 className="guide-title">{guide.title}</h4>
                                    <p className="guide-description">{guide.description}</p>
                                    <div className="guide-meta">
                                        <span className={`guide-category ${guide.category}`}>
                                            {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                                        </span>
                                        <span className="guide-info">
                                            {guide.type === 'video' ?
                                                `${guide.duration} min video` :
                                                `${guide.pages} page document`
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="guide-actions">
                                    <button className="view-guide-btn">
                                        {guide.type === 'video' ? 'Watch Video' : 'Read Guide'}
                                    </button>
                                    <button className="download-btn">
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Render FAQs tab content
    const renderFaqsTab = () => {
        return (
            <div className="help-content-section">
                <div className="faqs-header">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faqs-search">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>
                </div>

                {filteredFaqs.length === 0 ? (
                    <div className="no-results">
                        <FaExclamationTriangle className="no-results-icon" />
                        <h4>No FAQs Found</h4>
                        <p>No FAQs match your search term "{searchQuery}". Try a different search term or browse all FAQs.</p>
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="faqs-list">
                        {filteredFaqs.map(faq => (
                            <div className="faq-item" key={faq.id}>
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="question-text">
                                        <span className={`faq-category ${faq.category}`}>
                                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                                        </span>
                                        <h4>{faq.question}</h4>
                                    </div>
                                    <div className="expand-icon">
                                        {expandedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>
                                {expandedFaq === faq.id && (
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                        <div className="answer-actions">
                                            <button className="was-helpful-btn">
                                                <FaCheck /> This was helpful
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Render Support tab content
    const renderSupportTab = () => {
        return (
            <div className="help-content-section">
                <div className="support-header">
                    <h3>Contact Support</h3>
                </div>

                <div className="support-content">
                    <div className="support-card">
                        <div className="support-info">
                            <div className="support-contact">
                                <h4>Technical Support</h4>
                                <p>For system issues, account problems, or technical assistance</p>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaPhone />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">Phone Support</span>
                                        <span className="method-value">{helpData.support.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaEnvelope />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">Email Support</span>
                                        <div className="method-copy">
                                            <span className="method-value">{helpData.support.email}</span>
                                            <button
                                                className="copy-btn"
                                                onClick={copyEmailToClipboard}
                                            >
                                                {copySuccess ? <FaClipboardCheck className="success" /> : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaCommentAlt />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">Live Chat</span>
                                        <button className="start-chat-btn">Start Chat</button>
                                    </div>
                                </div>
                            </div>

                            <div className="support-hours">
                                <h4>Support Hours</h4>
                                <p>{helpData.support.hours}</p>

                                {helpData.support.emergencySupport && (
                                    <div className="emergency-support">
                                        <FaExclamationTriangle className="emergency-icon" />
                                        <div className="emergency-info">
                                            <h5>Emergency Support</h5>
                                            <p>Available 24/7 for critical system issues</p>
                                            <button className="emergency-btn">
                                                Emergency Contact
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="feedback-section">
                            <h4>Send Feedback</h4>
                            <p>Help us improve our pharmacy system with your suggestions and feedback</p>
                            <button className="feedback-btn">
                                Submit Feedback
                            </button>
                        </div>
                    </div>

                    <div className="resources-section">
                        <h4>Additional Resources</h4>

                        <div className="resources-list">
                            <a href="#" className="resource-link">
                                <FaFileAlt className="resource-icon" />
                                <span className="resource-text">System Documentation</span>
                                <FaExternalLinkAlt className="external-icon" />
                            </a>
                            <a href="#" className="resource-link">
                                <FaPlayCircle className="resource-icon" />
                                <span className="resource-text">Video Tutorials</span>
                                <FaExternalLinkAlt className="external-icon" />
                            </a>
                            <a href="#" className="resource-link">
                                <FaDownload className="resource-icon" />
                                <span className="resource-text">Download User Manual (PDF)</span>
                                <FaExternalLinkAlt className="external-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render Security tab content
    const renderSecurityTab = () => {
        return (
            <div className="help-content-section">
                <div className="security-header">
                    <h3>Security & Privacy Guidelines</h3>
                </div>

                <div className="security-content">
                    <div className="security-intro">
                        <div className="security-icon">
                            <FaShieldAlt />
                        </div>
                        <div className="security-intro-text">
                            <h4>Protecting Patient Data</h4>
                            <p>
                                As healthcare professionals, we are responsible for safeguarding sensitive patient information.
                                These guidelines help ensure the security and privacy of all data in our pharmacy system.
                                Please review and follow these best practices at all times.
                            </p>
                        </div>
                    </div>

                    <div className="guidelines-list">
                        {helpData.securityGuidelines.map((guideline, index) => (
                            <div className="guideline-item" key={guideline.id}>
                                <div className="guideline-number">{index + 1}</div>
                                <div className="guideline-content">
                                    <h4>{guideline.title}</h4>
                                    <p>{guideline.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="security-resources">
                        <h4>Security Resources</h4>
                        <div className="security-resources-grid">
                            <div className="security-resource-card">
                                <FaFileAlt className="resource-icon" />
                                <h5>Privacy Policy</h5>
                                <p>View our complete data privacy policy and guidelines</p>
                                <button className="resource-btn">View Policy</button>
                            </div>
                            <div className="security-resource-card">
                                <FaFileAlt className="resource-icon" />
                                <h5>Security Training</h5>
                                <p>Access required security awareness training modules</p>
                                <button className="resource-btn">Start Training</button>
                            </div>
                            <div className="security-resource-card">
                                <FaExclamationTriangle className="resource-icon" />
                                <h5>Report Security Issue</h5>
                                <p>Report a potential security incident or concern</p>
                                <button className="resource-btn">Report Issue</button>
                            </div>
                        </div>
                    </div>

                    <div className="compliance-info">
                        <h4>Compliance Information</h4>
                        <p>
                            Our pharmacy system is designed to comply with all applicable healthcare data protection regulations.
                            Regular security assessments and audits are conducted to ensure ongoing compliance.
                            If you have questions about our compliance status or security controls, please contact the IT Security team.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Render the appropriate tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'guides':
                return renderGuidesTab();
            case 'faqs':
                return renderFaqsTab();
            case 'support':
                return renderSupportTab();
            case 'security':
                return renderSecurityTab();
            default:
                return renderGuidesTab();
        }
    };

    return (
        <div className="pharmacy-help">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading help resources...</p>
                </div>
            ) : (
                <div className="help-container">
                    <div className="page-header">
                        <h1>Help & Resources</h1>
                        <p>Find guides, tutorials, FAQs, and support information</p>
                    </div>

                    <div className="help-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('guides');
                                setSearchQuery('');
                                setExpandedFaq(null);
                            }}
                        >
                            <FaPlayCircle className="tab-icon" />
                            <span>Guides & Tutorials</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('faqs');
                                setSearchQuery('');
                                setExpandedFaq(null);
                            }}
                        >
                            <FaQuestionCircle className="tab-icon" />
                            <span>FAQs</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'support' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('support');
                                setSearchQuery('');
                                setExpandedFaq(null);
                            }}
                        >
                            <FaPhone className="tab-icon" />
                            <span>Support</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('security');
                                setSearchQuery('');
                                setExpandedFaq(null);
                            }}
                        >
                            <FaShieldAlt className="tab-icon" />
                            <span>Security & Privacy</span>
                        </button>
                    </div>

                    <div className="help-content">
                        {renderTabContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyHelp;