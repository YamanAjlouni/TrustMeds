import React, { useState, useEffect } from 'react';
import './PatientHelpResources.scss';
import { FaQuestionCircle, FaBookOpen, FaVideo, FaPhoneAlt, FaEnvelope, FaComment, FaArrowRight, FaChevronDown, FaChevronUp, FaSearch, FaFileAlt, FaLifeRing, FaUserMd, FaPills, FaShieldAlt, FaUserCog, FaPlayCircle } from 'react-icons/fa';

export const PatientHelpResources = () => {
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
        { id: 'all', name: 'All Resources', icon: <FaBookOpen /> },
        { id: 'medications', name: 'Medications', icon: <FaPills /> },
        { id: 'account', name: 'Account & Security', icon: <FaShieldAlt /> },
        { id: 'prescriptions', name: 'Prescriptions', icon: <FaFileAlt /> },
        { id: 'doctors', name: 'Doctors & Communication', icon: <FaUserMd /> },
        { id: 'profile', name: 'Health Profile', icon: <FaUserCog /> }
    ];

    const faqs = [
        {
            id: 1,
            question: "How do I request a prescription refill?",
            answer: "To request a prescription refill, go to your Medications dashboard and find the medication you need refilled. Click the 'Request Refill' button. You'll be asked to confirm your pharmacy preference and any additional notes for your doctor. Once submitted, your request will be sent to your healthcare provider for approval. You can track the status of your refill request in the 'Recent Activity' section on your dashboard.",
            category: "medications"
        },
        {
            id: 2,
            question: "What should I do if I missed a dose of my medication?",
            answer: "If you miss a dose of your medication, what you should do depends on the specific medication and how late you are in taking it. As a general rule: 1) If it's within a few hours of your normal time, take the dose as soon as you remember. 2) If it's close to your next scheduled dose, skip the missed dose and continue with your regular schedule. 3) Never take a double dose to make up for a missed one unless specifically directed by your healthcare provider. For specific guidance, check the medication instructions in your prescription details or contact your healthcare provider.",
            category: "medications"
        },
        {
            id: 3,
            question: "How do I update my insurance information?",
            answer: "To update your insurance information, navigate to the Health Profile section and select the 'Insurance Information' tab. Click the 'Edit' button to modify your current insurance details. Fill in the updated information and click 'Save Changes'. Your insurance information will be updated across the system. If you're having trouble or have specific questions about insurance coverage, please contact our support team.",
            category: "profile"
        },
        {
            id: 4,
            question: "How secure is my medical information on TrustMeds?",
            answer: "TrustMeds takes your privacy and security seriously. We employ industry-leading security measures including end-to-end encryption, secure authentication, and regular security audits. All data is stored in compliance with HIPAA regulations, and we never share your information with third parties without your explicit consent. You can review and manage your privacy settings in the Security Center section of your account. Additionally, you can set up two-factor authentication for an extra layer of security.",
            category: "account"
        },
        {
            id: 5,
            question: "How do I send a message to my doctor?",
            answer: "To send a message to your doctor, go to the 'Doctor Communication' section from your dashboard. Select the doctor you wish to contact from your healthcare team list. Click the 'New Message' button and compose your message in the secure messaging interface. You can also attach relevant files or images if needed. Once sent, your doctor will receive a notification and respond through the same secure channel. All communication history is saved for your reference.",
            category: "doctors"
        },
        {
            id: 6,
            question: "What do I do if my prescription has expired?",
            answer: "If your prescription has expired, you'll need to request a renewal from your doctor rather than a refill. In the Prescriptions section, expired medications will be clearly marked. Select the expired medication and click 'Request Renewal' instead of 'Request Refill'. This will initiate a request to your healthcare provider to evaluate and potentially issue a new prescription. You may need to schedule an appointment or consultation before a renewal is approved, depending on the medication and your doctor's policies.",
            category: "prescriptions"
        },
        {
            id: 7,
            question: "How can I add a new pharmacy to my account?",
            answer: "To add a new pharmacy to your account, navigate to the Pharmacy Connection section from your dashboard. Click on 'Add New Pharmacy' and you can search for pharmacies by name, address, or zip code. Once you find your preferred pharmacy, select it and click 'Add to My Pharmacies'. You can designate one pharmacy as your primary choice for all prescriptions, or select different pharmacies for specific medications when requesting refills.",
            category: "prescriptions"
        },
        {
            id: 8,
            question: "Can I set medication reminders in the app?",
            answer: "Yes, TrustMeds offers medication reminder functionality. To set up reminders, go to your Medications list and select the medication you want reminders for. Click on 'Manage Reminders' and you can schedule custom reminders based on your medication schedule. You can choose to receive notifications through the app, email, or SMS. You can also set recurring reminders or one-time alerts for medications that are taken as needed.",
            category: "medications"
        },
        {
            id: 9,
            question: "How do I update my personal information?",
            answer: "To update your personal information, go to the Health Profile section and select the 'Personal Information' tab. Click the 'Edit Profile' button to modify your information. You can update details such as your contact information, address, emergency contacts, and other personal details. Once you've made your changes, click 'Save Changes' to update your profile. Critical information like your name or date of birth may require verification for security purposes.",
            category: "profile"
        },
        {
            id: 10,
            question: "What should I do if I experience side effects from my medication?",
            answer: "If you experience side effects from your medication, it's important to take appropriate action based on the severity. For mild side effects, document them in the 'Notes' section of your medication details for discussion at your next appointment. For moderate side effects, use the secure messaging feature to contact your healthcare provider for guidance. For severe or concerning side effects, seek immediate medical attention by calling your doctor, visiting an urgent care facility, or calling emergency services if necessary. Always report side effects to your healthcare provider even if they seem minor.",
            category: "medications"
        }
    ];

    const guides = [
        {
            id: 1,
            title: "Getting Started with TrustMeds",
            description: "Learn the basics of navigating and using your patient portal",
            category: "account",
            icon: <FaBookOpen />,
            type: "guide"
        },
        {
            id: 2,
            title: "Managing Your Medications",
            description: "How to view, refill, and keep track of your prescriptions",
            category: "medications",
            icon: <FaPills />,
            type: "guide"
        },
        {
            id: 3,
            title: "Communicating With Your Healthcare Team",
            description: "Using secure messaging and appointment scheduling features",
            category: "doctors",
            icon: <FaUserMd />,
            type: "guide"
        },
        {
            id: 4,
            title: "Understanding Your Health Profile",
            description: "How to view and update your medical information",
            category: "profile",
            icon: <FaUserCog />,
            type: "guide"
        },
        {
            id: 5,
            title: "Privacy and Security Features",
            description: "Protecting your account and understanding data privacy",
            category: "account",
            icon: <FaShieldAlt />,
            type: "guide"
        }
    ];

    const videos = [
        {
            id: 1,
            title: "How to Request Medication Refills",
            duration: "2:45",
            thumbnail: "/api/placeholder/320/180",
            category: "medications",
            type: "video"
        },
        {
            id: 2,
            title: "Setting Up Two-Factor Authentication",
            duration: "3:12",
            thumbnail: "/api/placeholder/320/180",
            category: "account",
            type: "video"
        },
        {
            id: 3,
            title: "Managing Your Health Records",
            duration: "4:30",
            thumbnail: "/api/placeholder/320/180",
            category: "profile",
            type: "video"
        },
        {
            id: 4,
            title: "Secure Messaging With Your Doctor",
            duration: "2:58",
            thumbnail: "/api/placeholder/320/180",
            category: "doctors",
            type: "video"
        }
    ];

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
        <div className="patient-help-resources">
            {!isLoaded ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading help resources...</p>
                </div>
            ) : (
                <div className="help-container">
                    <div className="help-header">
                        <div className="welcome-banner">
                            <div className="welcome-content">
                                <h1>Help & Resources</h1>
                                <p>Find answers to common questions and learn how to get the most out of TrustMeds</p>

                                <div className="search-container">
                                    <div className="search-input-wrapper">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder="Search for help topics, FAQs, or keywords..."
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
                                    <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
                                </div>

                                {filteredFaqs.length === 0 ? (
                                    <div className="empty-state">
                                        <FaQuestionCircle className="empty-icon" />
                                        <p>No FAQs match your search criteria.</p>
                                        <p>Try adjusting your search term or category filter.</p>
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
                                    <h3>Can't find what you're looking for?</h3>
                                    <p>Our support team is ready to help with any questions you may have.</p>
                                    <div className="contact-options">
                                        <div className="contact-option">
                                            <FaPhoneAlt className="contact-icon" />
                                            <span>Call us at (800) 555-1234</span>
                                        </div>
                                        <div className="contact-option">
                                            <FaEnvelope className="contact-icon" />
                                            <span>Email at support@trustmeds.com</span>
                                        </div>
                                        <div className="contact-option">
                                            <FaComment className="contact-icon" />
                                            <span>Live chat available 24/7</span>
                                        </div>
                                    </div>
                                    <button className="support-btn">
                                        <FaLifeRing /> Contact Support
                                    </button>
                                </div>
                            </div>

                            {/* Right column - Guides and Videos */}
                            <div className="resources-section">
                                {/* Guides */}
                                <div className="guides-section">
                                    <div className="section-header">
                                        <h2><FaBookOpen /> Quick Guides</h2>
                                        <button className="view-all-btn">View All Guides <FaArrowRight /></button>
                                    </div>

                                    <div className="guides-grid">
                                        {filteredGuides.map(guide => (
                                            <div key={guide.id} className="guide-card">
                                                <div className="guide-icon">
                                                    {guide.icon}
                                                </div>
                                                <div className="guide-content">
                                                    <h3>{guide.title}</h3>
                                                    <p>{guide.description}</p>
                                                </div>
                                                <button className="read-btn">
                                                    Read Guide <FaArrowRight />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Videos */}
                                <div className="videos-section">
                                    <div className="section-header">
                                        <h2><FaVideo /> Video Tutorials</h2>
                                        <button className="view-all-btn">View All Videos <FaArrowRight /></button>
                                    </div>

                                    <div className="videos-grid">
                                        {filteredVideos.map(video => (
                                            <div
                                                key={video.id}
                                                className="video-card"
                                                onClick={() => handleVideoClick(video)}
                                            >
                                                <div className="video-thumbnail">
                                                    <img src={video.thumbnail} alt={video.title} />
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
                                        <img src={selectedVideo.thumbnail} alt={selectedVideo.title} />
                                        <div className="play-button">
                                            <FaPlayCircle />
                                        </div>
                                    </div>
                                </div>
                                <div className="video-modal-description">
                                    <p>This is a tutorial video about {selectedVideo.title.toLowerCase()}. Watch this video to learn step-by-step instructions.</p>
                                    <div className="video-details">
                                        <span className="video-duration"><FaClock /> {selectedVideo.duration}</span>
                                        <button className="download-btn">Download Transcript</button>
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