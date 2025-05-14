import React, { useState, useEffect } from 'react';
import './DoctorHelpResources.scss';
import { FaSearch, FaAngleDown, FaAngleUp, FaHeadset, FaQuestionCircle, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

const DoctorHelpResources = () => {
    const { t, isRTL } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactFormData, setContactFormData] = useState({
        subject: '',
        message: '',
        priority: 'normal'
    });

    // Add RTL class when needed
    useEffect(() => {
        if (isRTL) {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
        
        return () => {
            document.body.classList.remove('rtl');
        };
    }, [isRTL]);

    // Mock FAQ data
    const faqs = [
        {
            id: 1,
            category: 'prescriptions',
            question: t('doctorPage.help.faqs.prescriptions.createNew.question'),
            answer: t('doctorPage.help.faqs.prescriptions.createNew.answer')
        },
        {
            id: 2,
            category: 'patients',
            question: t('doctorPage.help.faqs.patients.accessHistory.question'),
            answer: t('doctorPage.help.faqs.patients.accessHistory.answer')
        },
        {
            id: 3,
            category: 'prescriptions',
            question: t('doctorPage.help.faqs.prescriptions.update.question'),
            answer: t('doctorPage.help.faqs.prescriptions.update.answer')
        },
        {
            id: 4,
            category: 'communication',
            question: t('doctorPage.help.faqs.communication.platform.question'),
            answer: t('doctorPage.help.faqs.communication.platform.answer')
        },
        {
            id: 5,
            category: 'technical',
            question: t('doctorPage.help.faqs.technical.browser.question'),
            answer: t('doctorPage.help.faqs.technical.browser.answer')
        },
        {
            id: 6,
            category: 'security',
            question: t('doctorPage.help.faqs.security.patientData.question'),
            answer: t('doctorPage.help.faqs.security.patientData.answer')
        },
        {
            id: 7,
            category: 'account',
            question: t('doctorPage.help.faqs.account.updateProfile.question'),
            answer: t('doctorPage.help.faqs.account.updateProfile.answer')
        },
        {
            id: 8,
            category: 'technical',
            question: t('doctorPage.help.faqs.technical.error.question'),
            answer: t('doctorPage.help.faqs.technical.error.answer')
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
        alert(t('doctorPage.help.contactForm.successMessage'));
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
            'prescriptions': t('doctorPage.help.categories.prescriptions'),
            'patients': t('doctorPage.help.categories.patients'),
            'communication': t('doctorPage.help.categories.communication'),
            'technical': t('doctorPage.help.categories.technical'),
            'security': t('doctorPage.help.categories.security'),
            'account': t('doctorPage.help.categories.account')
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
                <h1>{t('doctorPage.help.title')}</h1>
                <p>{t('doctorPage.help.subtitle')}</p>

                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={t('doctorPage.help.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                            aria-label={t('doctorPage.help.clearSearch')}
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
                        <h2>{t('doctorPage.help.searchResults', { query: searchQuery })}</h2>

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
                                    <h3>{t('doctorPage.help.noResults.title')}</h3>
                                    <p>{t('doctorPage.help.noResults.message')}</p>
                                    <button
                                        className="contact-support-btn"
                                        onClick={() => setShowContactForm(true)}
                                    >
                                        {t('doctorPage.help.noResults.contactButton')}
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
                    <h2>{t('doctorPage.help.support.title')}</h2>
                    <div className="help-contact">
                        <div className="contact-option">
                            <div className="contact-icon-wrapper">
                                <FaPhone className="contact-icon" />
                            </div>
                            <h3>{t('doctorPage.help.support.call.title')}</h3>
                            <p>{t('doctorPage.help.support.call.description')}</p>
                            <a href="tel:+18005551234" className="contact-button phone">
                                {t('doctorPage.help.support.call.number')}
                            </a>
                            <span className="support-hours">{t('doctorPage.help.support.call.hours')}</span>
                        </div>

                        <div className="contact-option">
                            <div className="contact-icon-wrapper">
                                <FaEnvelope className="contact-icon" />
                            </div>
                            <h3>{t('doctorPage.help.support.email.title')}</h3>
                            <p>{t('doctorPage.help.support.email.description')}</p>
                            <button
                                className="contact-button email"
                                onClick={() => setShowContactForm(true)}
                            >
                                {t('doctorPage.help.support.email.button')}
                            </button>
                            <span className="support-hours">{t('doctorPage.help.support.email.hours')}</span>
                        </div>
                    </div>
                </div>

                {showContactForm && (
                    <div className="contact-form-overlay">
                        <div className="contact-form-container">
                            <div className="form-header">
                                <h3>{t('doctorPage.help.contactForm.title')}</h3>
                                <button
                                    className="close-form"
                                    onClick={() => setShowContactForm(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleContactSubmit}>
                                <div className="form-group">
                                    <label htmlFor="subject">{t('doctorPage.help.contactForm.subject')}</label>
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
                                    <label htmlFor="message">{t('doctorPage.help.contactForm.message')}</label>
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
                                    <label htmlFor="priority">{t('doctorPage.help.contactForm.priority.label')}</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={contactFormData.priority}
                                        onChange={handleContactFormChange}
                                    >
                                        <option value="low">{t('doctorPage.help.contactForm.priority.low')}</option>
                                        <option value="normal">{t('doctorPage.help.contactForm.priority.normal')}</option>
                                        <option value="high">{t('doctorPage.help.contactForm.priority.high')}</option>
                                        <option value="urgent">{t('doctorPage.help.contactForm.priority.urgent')}</option>
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setShowContactForm(false)}
                                    >
                                        {t('doctorPage.help.contactForm.cancel')}
                                    </button>
                                    <button type="submit" className="submit-btn">
                                        {t('doctorPage.help.contactForm.submit')}
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