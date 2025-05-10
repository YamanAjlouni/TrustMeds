import React, { useState, useEffect } from 'react';
import './PatientHelpResources.scss';
import { FaQuestionCircle, FaBookOpen, FaVideo, FaPhoneAlt, FaEnvelope, FaComment, FaArrowRight, FaChevronDown, FaChevronUp, FaSearch, FaFileAlt, FaLifeRing, FaUserMd, FaPills, FaShieldAlt, FaUserCog, FaPlayCircle, FaClock } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export const PatientHelpResources = () => {
    const { t, isRTL } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    const categories = [
        { id: 'all', name: t('patientPage.helpResources.categories.all'), icon: <FaBookOpen /> },
        { id: 'medications', name: t('patientPage.helpResources.categories.medications'), icon: <FaPills /> },
        { id: 'account', name: t('patientPage.helpResources.categories.account'), icon: <FaShieldAlt /> },
        { id: 'prescriptions', name: t('patientPage.helpResources.categories.prescriptions'), icon: <FaFileAlt /> },
        { id: 'doctors', name: t('patientPage.helpResources.categories.doctors'), icon: <FaUserMd /> },
        { id: 'profile', name: t('patientPage.helpResources.categories.profile'), icon: <FaUserCog /> }
    ];

    // Get FAQs from translations
    const faqs = t('patientPage.helpResources.faqs');
    const guides = t('patientPage.helpResources.guides');
    const videos = t('patientPage.helpResources.videos');

    // Filter FAQs based on search term and active category
    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeCategory === 'all') {
            return matchesSearch;
        } else {
            return matchesSearch && faq.category === activeCategory;
        }
    });

    // Filter resources based on active category
    const filteredGuides = guides.filter(guide => {
        if (activeCategory === 'all') {
            return true;
        } else {
            return guide.category === activeCategory;
        }
    });

    const filteredVideos = videos.filter(video => {
        if (activeCategory === 'all') {
            return true;
        } else {
            return video.category === activeCategory;
        }
    });

    const toggleFaq = (id) => {
        if (expandedFaq === id) {
            setExpandedFaq(null);
        } else {
            setExpandedFaq(id);
        }
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setShowVideoModal(true);
    };

    return (
        <div className={`patient-help-resources ${isRTL ? 'rtl' : ''}`}>
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>{t('patientPage.helpResources.loading')}</p>
                </div>
            ) : (
                <div className="help-container">
                    <div className="help-header">
                        <div className="welcome-banner">
                            <div className="welcome-content">
                                <h1>{t('patientPage.helpResources.pageTitle')}</h1>
                                <p>{t('patientPage.helpResources.pageSubtitle')}</p>

                                <div className="search-container">
                                    <div className="search-input-wrapper">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder={t('patientPage.helpResources.search.placeholder')}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.icon}
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="help-content">
                        <div className="content-grid">
                            {/* Left column - FAQs */}
                            <div className="faqs-section">
                                <div className="section-header">
                                    <h2><FaQuestionCircle /> {t('patientPage.helpResources.sections.faqs.title')}</h2>
                                </div>

                                {filteredFaqs.length === 0 ? (
                                    <div className="empty-state">
                                        <FaQuestionCircle className="empty-icon" />
                                        <p>{t('patientPage.helpResources.sections.faqs.emptyState.title')}</p>
                                        <p>{t('patientPage.helpResources.sections.faqs.emptyState.subtitle')}</p>
                                    </div>
                                ) : (
                                    <div className="faq-list">
                                        {filteredFaqs.map(faq => (
                                            <div
                                                key={faq.id}
                                                className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
                                            >
                                                <div
                                                    className="faq-question"
                                                    onClick={() => toggleFaq(faq.id)}
                                                >
                                                    <h3>{faq.question}</h3>
                                                    {expandedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                                </div>

                                                {expandedFaq === faq.id && (
                                                    <div className="faq-answer">
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="support-contact-box">
                                    <h3>{t('patientPage.helpResources.sections.faqs.supportBox.title')}</h3>
                                    <p>{t('patientPage.helpResources.sections.faqs.supportBox.subtitle')}</p>
                                    <div className="contact-options">
                                        <div className="contact-option">
                                            <FaPhoneAlt className="contact-icon" />
                                            <span>{t('patientPage.helpResources.sections.faqs.supportBox.contactOptions.phone')}</span>
                                        </div>
                                        <div className="contact-option">
                                            <FaEnvelope className="contact-icon" />
                                            <span>{t('patientPage.helpResources.sections.faqs.supportBox.contactOptions.email')}</span>
                                        </div>
                                        <div className="contact-option">
                                            <FaComment className="contact-icon" />
                                            <span>{t('patientPage.helpResources.sections.faqs.supportBox.contactOptions.chat')}</span>
                                        </div>
                                    </div>
                                    <button className="support-btn">
                                        <FaLifeRing /> {t('patientPage.helpResources.sections.faqs.supportBox.buttonText')}
                                    </button>
                                </div>
                            </div>

                            {/* Right column - Guides and Videos */}
                            <div className="resources-section">
                                {/* Guides */}
                                <div className="guides-section">
                                    <div className="section-header">
                                        <h2><FaBookOpen /> {t('patientPage.helpResources.sections.guides.title')}</h2>
                                        <button className="view-all-btn">
                                            {t('patientPage.helpResources.sections.guides.viewAllButton')} <FaArrowRight />
                                        </button>
                                    </div>

                                    <div className="guides-grid">
                                        {filteredGuides.map(guide => (
                                            <div key={guide.id} className="guide-card">
                                                <div className="guide-icon">
                                                    {guide.category === 'account' ? <FaShieldAlt /> :
                                                        guide.category === 'medications' ? <FaPills /> :
                                                            guide.category === 'doctors' ? <FaUserMd /> :
                                                                guide.category === 'profile' ? <FaUserCog /> :
                                                                    guide.category === 'prescriptions' ? <FaFileAlt /> :
                                                                        <FaBookOpen />}
                                                </div>
                                                <div className="guide-content">
                                                    <h3>{guide.title}</h3>
                                                    <p>{guide.description}</p>
                                                </div>
                                                <button className="read-btn">
                                                    {t('patientPage.helpResources.sections.guides.readButton')} <FaArrowRight />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Videos */}
                                <div className="videos-section">
                                    <div className="section-header">
                                        <h2><FaVideo /> {t('patientPage.helpResources.sections.videos.title')}</h2>
                                        <button className="view-all-btn">
                                            {t('patientPage.helpResources.sections.videos.viewAllButton')} <FaArrowRight />
                                        </button>
                                    </div>

                                    <div className="videos-grid">
                                        {filteredVideos.map(video => (
                                            <div
                                                key={video.id}
                                                className="video-card"
                                                onClick={() => handleVideoClick(video)}
                                            >
                                                <div className="video-thumbnail">
                                                    <img src={`/api/placeholder/320/180`} alt={video.title} />
                                                    <div className="play-overlay">
                                                        <FaPlayCircle />
                                                    </div>
                                                    <span className="video-duration">{video.duration}</span>
                                                </div>
                                                <h3>{video.title}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Modal */}
                    {showVideoModal && selectedVideo && (
                        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
                            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                                <div className="video-modal-header">
                                    <h3>{selectedVideo.title}</h3>
                                    <button className="close-btn" onClick={() => setShowVideoModal(false)}>×</button>
                                </div>
                                <div className="video-player">
                                    {/* In a real app, this would be an actual video player */}
                                    <div className="placeholder-player">
                                        <img src={`/api/placeholder/800/450`} alt={selectedVideo.title} />
                                        <div className="play-button">
                                            <FaPlayCircle />
                                        </div>
                                    </div>
                                </div>
                                <div className="video-modal-description">
                                    <p>{t('patientPage.helpResources.sections.videos.modalDescription', { title: selectedVideo.title.toLowerCase() })}</p>
                                    <div className="video-details">
                                        <span className="video-duration"><FaClock /> {selectedVideo.duration}</span>
                                        <button className="download-btn">
                                            {t('patientPage.helpResources.sections.videos.downloadTranscript')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PatientHelpResources;