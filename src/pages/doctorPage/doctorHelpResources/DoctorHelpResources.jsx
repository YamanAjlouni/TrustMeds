import React, { useState } from 'react';
import './DoctorHelpResources.scss';
import { FaSearch, FaAngleDown, FaAngleUp, FaHeadset, FaQuestionCircle, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';

const DoctorHelpResources = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactFormData, setContactFormData] = useState({
        subject: '',
        message: '',
        priority: 'normal'
    });

    // Mock FAQ data
    const faqs = [
        {
            id: 1,
            category: 'prescriptions',
            question: 'How do I create a new prescription?',
            answer: 'To create a new prescription, navigate to "Write Prescription" in the sidebar menu. Search for a patient, select their name, fill out the medication details, and click "Generate Prescription". You can review the prescription before finalizing it.'
        },
        {
            id: 2,
            category: 'patients',
            question: 'How can I access a patient\'s medical history?',
            answer: 'You can access a patient\'s medical history by going to "My Patients" in the sidebar menu, finding the patient\'s name, and clicking the "Medical Records" button. Alternatively, you can directly navigate to "Medical Records" in the sidebar and search for the patient.'
        },
        {
            id: 3,
            category: 'prescriptions',
            question: 'What should I do if I need to update a prescription?',
            answer: 'To update an existing prescription, go to "Prescription History", locate the prescription you want to change, and click the "Edit" button. Make your changes and submit the updated prescription. The system will record the changes and notify the patient if required.'
        },
        {
            id: 4,
            category: 'communication',
            question: 'How do I communicate with my patients through the platform?',
            answer: 'Use the "Communication" section in the sidebar to message your patients. You can see all ongoing conversations, filter by urgency, and respond to patient inquiries. The platform supports text messages and file attachments for sharing documents securely.'
        },
        {
            id: 5,
            category: 'technical',
            question: 'What browser is recommended for using this platform?',
            answer: 'Our platform works best with modern browsers like Chrome, Firefox, Safari, or Edge. For the best experience, please ensure your browser is updated to the latest version. We recommend Chrome or Firefox for optimal performance and compatibility.'
        },
        {
            id: 6,
            category: 'security',
            question: 'How is patient data secured in the system?',
            answer: 'Patient data is secured using industry-standard encryption protocols both in transit and at rest. We implement strict access controls, regular security audits, and comply with all relevant healthcare privacy regulations including HIPAA. Your account is also protected with two-factor authentication.'
        },
        {
            id: 7,
            category: 'account',
            question: 'How do I update my profile information?',
            answer: 'To update your profile information, click on your profile picture in the top right corner and select "Profile" from the dropdown menu. Alternatively, click on "Profile" in the sidebar. From there, you can edit your personal information, contact details, and profile picture.'
        },
        {
            id: 8,
            category: 'technical',
            question: 'What should I do if I encounter an error?',
            answer: 'If you encounter an error, try refreshing the page first. If the problem persists, take a screenshot of the error message, note what actions you were taking when the error occurred, and contact our technical support team using the form at the bottom of this page. Our team will address the issue as quickly as possible.'
        }
    ];

    // Group FAQs by category
    const groupedFaqs = faqs.reduce((acc, faq) => {
        if (!acc[faq.category]) {
            acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
    }, {});

    // Filter FAQs based on search query
    const filteredFaqs = searchQuery
        ? faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqs;

    // Toggle FAQ expansion
    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const handleContactFormChange = (e) => {
        const { name, value } = e.target;
        setContactFormData({
            ...contactFormData,
            [name]: value
        });
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // This would connect to your backend in a real app
        alert('Your support request has been submitted. Our team will get back to you shortly.');
        setContactFormData({
            subject: '',
            message: '',
            priority: 'normal'
        });
        setShowContactForm(false);
    };

    // Convert category names to display names
    const getCategoryDisplayName = (category) => {
        const displayNames = {
            'prescriptions': 'Prescriptions',
            'patients': 'Patient Management',
            'communication': 'Communication',
            'technical': 'Technical Support',
            'security': 'Security & Privacy',
            'account': 'Account Management'
        };
        return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
    };

    // Get category color class
    const getCategoryColorClass = (category) => {
        const colorClasses = {
            'prescriptions': 'category-primary',
            'patients': 'category-secondary',
            'communication': 'category-accent',
            'technical': 'category-info',
            'security': 'category-danger',
            'account': 'category-warning'
        };
        return colorClasses[category] || 'category-default';
    };

    return (
        <div className="doctor-help-resources">
            <div className="help-header">
                <h1>Help Center</h1>
                <p>Find answers to your questions and get support</p>

                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search help topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            <div className="help-content">
                {searchQuery ? (
                    // Search results view
                    <div className="content-section">
                        <h2>Search Results for "{searchQuery}"</h2>

                        <div className="faq-list">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map(faq => (
                                    <div
                                        key={faq.id}
                                        className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''} ${getCategoryColorClass(faq.category)}`}
                                    >
                                        <div
                                            className="faq-question"
                                            onClick={() => toggleFaq(faq.id)}
                                        >
                                            <span className="category-tag">
                                                {getCategoryDisplayName(faq.category)}
                                            </span>
                                            <h3>{faq.question}</h3>
                                            {expandedFaq === faq.id ?
                                                <FaAngleUp className="toggle-icon" /> :
                                                <FaAngleDown className="toggle-icon" />
                                            }
                                        </div>

                                        {expandedFaq === faq.id && (
                                            <div className="faq-answer">
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">
                                    <FaQuestionCircle className="no-results-icon" />
                                    <h3>No results found</h3>
                                    <p>We couldn't find any FAQs matching your search. Try different keywords or contact our support team for assistance.</p>
                                    <button
                                        className="contact-support-btn"
                                        onClick={() => setShowContactForm(true)}
                                    >
                                        Contact Support
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Default view - grouped by category
                    Object.keys(groupedFaqs).map(category => (
                        <div className="content-section" key={category}>
                            <div className={`section-header ${getCategoryColorClass(category)}`}>
                                <h2>{getCategoryDisplayName(category)}</h2>
                            </div>

                            <div className="faq-list">
                                {groupedFaqs[category].map(faq => (
                                    <div
                                        key={faq.id}
                                        className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''} ${getCategoryColorClass(faq.category)}`}
                                    >
                                        <div
                                            className="faq-question"
                                            onClick={() => toggleFaq(faq.id)}
                                        >
                                            <FaQuestionCircle className="question-icon" />
                                            <h3>{faq.question}</h3>
                                            {expandedFaq === faq.id ?
                                                <FaAngleUp className="toggle-icon" /> :
                                                <FaAngleDown className="toggle-icon" />
                                            }
                                        </div>

                                        {expandedFaq === faq.id && (
                                            <div className="faq-answer">
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                <div className="content-section support-section">
                    <h2>Need More Help?</h2>
                    <div className="help-contact">
                        <div className="contact-option">
                            <div className="contact-icon-wrapper">
                                <FaPhone className="contact-icon" />
                            </div>
                            <h3>Call Support</h3>
                            <p>For urgent issues</p>
                            <a href="tel:+18005551234" className="contact-button phone">
                                1-800-555-1234
                            </a>
                            <span className="support-hours">Available 24/7</span>
                        </div>

                        <div className="contact-option">
                            <div className="contact-icon-wrapper">
                                <FaEnvelope className="contact-icon" />
                            </div>
                            <h3>Email Support</h3>
                            <p>For general inquiries</p>
                            <button
                                className="contact-button email"
                                onClick={() => setShowContactForm(true)}
                            >
                                Contact Us
                            </button>
                            <span className="support-hours">Response within 24 hours</span>
                        </div>
                    </div>
                </div>

                {showContactForm && (
                    <div className="contact-form-overlay">
                        <div className="contact-form-container">
                            <div className="form-header">
                                <h3>Contact Support</h3>
                                <button
                                    className="close-form"
                                    onClick={() => setShowContactForm(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleContactSubmit}>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={contactFormData.subject}
                                        onChange={handleContactFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={contactFormData.message}
                                        onChange={handleContactFormChange}
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={contactFormData.priority}
                                        onChange={handleContactFormChange}
                                    >
                                        <option value="low">Low - General Question</option>
                                        <option value="normal">Normal - Need Assistance</option>
                                        <option value="high">High - Affecting Patient Care</option>
                                        <option value="urgent">Urgent - Critical Issue</option>
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setShowContactForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorHelpResources;