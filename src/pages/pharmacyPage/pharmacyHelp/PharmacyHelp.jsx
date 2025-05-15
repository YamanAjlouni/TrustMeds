import React, { useState, useEffect } from 'react';
import './PharmacyHelp.scss';
import { useLanguage } from '../../../context/LanguageContext'; // Import language hook
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
    // Get language context
    const { t, isRTL } = useLanguage();
    
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
                question: {
                    en: 'How do I reset my password?',
                    ar: 'كيف يمكنني إعادة تعيين كلمة المرور الخاصة بي؟'
                },
                answer: {
                    en: 'To reset your password, go to the Profile & Settings page, click on the "Change Password" button in the Personal Information tab, and follow the instructions. You\'ll need to enter your current password and a new password that meets our security requirements.',
                    ar: 'لإعادة تعيين كلمة المرور الخاصة بك، انتقل إلى صفحة الملف الشخصي والإعدادات، انقر على زر "تغيير كلمة المرور" في علامة تبويب المعلومات الشخصية، واتبع التعليمات. ستحتاج إلى إدخال كلمة المرور الحالية وكلمة مرور جديدة تلبي متطلبات الأمان لدينا.'
                },
                category: 'account'
            },
            {
                id: 'faq-2',
                question: {
                    en: 'What should I do if the QR scanner isn\'t working?',
                    ar: 'ماذا أفعل إذا لم يعمل ماسح رمز الاستجابة السريعة (QR)؟'
                },
                answer: {
                    en: 'If the QR scanner isn\'t working, first ensure that you\'ve granted the browser permission to access your camera. If that doesn\'t resolve the issue, try refreshing the page. If problems persist, you can manually enter the prescription ID in the search field on the Pending Prescriptions page.',
                    ar: 'إذا لم يعمل ماسح رمز الاستجابة السريعة (QR)، تأكد أولاً من أنك منحت المتصفح إذنًا للوصول إلى الكاميرا الخاصة بك. إذا لم يؤدِ ذلك إلى حل المشكلة، حاول تحديث الصفحة. إذا استمرت المشكلة، يمكنك إدخال معرف الوصفة الطبية يدويًا في حقل البحث في صفحة الوصفات الطبية المعلقة.'
                },
                category: 'technical'
            },
            {
                id: 'faq-3',
                question: {
                    en: 'How do I search for a patient\'s prescription history?',
                    ar: 'كيف يمكنني البحث عن تاريخ الوصفات الطبية للمريض؟'
                },
                answer: {
                    en: 'To search for a patient\'s prescription history, go to the Dispensed History section and use the search box at the top of the page. You can search by patient name, ID, or prescription number. Use the filters to narrow down results by date range or medication type.',
                    ar: 'للبحث عن تاريخ الوصفات الطبية للمريض، انتقل إلى قسم سجل الصرف واستخدم مربع البحث أعلى الصفحة. يمكنك البحث بواسطة اسم المريض أو رقم الهوية أو رقم الوصفة الطبية. استخدم عوامل التصفية لتضييق نطاق النتائج حسب النطاق الزمني أو نوع الدواء.'
                },
                category: 'workflow'
            },
            {
                id: 'faq-4',
                question: {
                    en: 'Can I use the system on my mobile device?',
                    ar: 'هل يمكنني استخدام النظام على جهازي المحمول؟'
                },
                answer: {
                    en: 'Yes, the pharmacy system is fully responsive and works on mobile devices. You can access all features including prescription scanning (using your device\'s camera), dispensing, and patient management. For the best experience on smaller screens, we recommend using the app in landscape mode.',
                    ar: 'نعم، نظام الصيدلية متوافق تمامًا مع الأجهزة المحمولة. يمكنك الوصول إلى جميع الميزات بما في ذلك مسح الوصفات الطبية (باستخدام كاميرا جهازك) وصرف الأدوية وإدارة المرضى. للحصول على أفضل تجربة على الشاشات الصغيرة، نوصي باستخدام التطبيق في وضع أفقي.'
                },
                category: 'technical'
            },
            {
                id: 'faq-5',
                question: {
                    en: 'What do I do if I notice a mistake on a prescription?',
                    ar: 'ماذا أفعل إذا لاحظت خطأ في الوصفة الطبية؟'
                },
                answer: {
                    en: 'If you notice a mistake on a prescription, do not dispense it. Instead, use the Communication feature to contact the prescribing physician. Select the prescription in question, click on "Contact Doctor," and explain the issue. Wait for the physician\'s response before proceeding. All communications are logged for record-keeping.',
                    ar: 'إذا لاحظت خطأ في الوصفة الطبية، لا تقم بصرفها. بدلاً من ذلك، استخدم ميزة التواصل للاتصال بالطبيب المعالج. حدد الوصفة الطبية المعنية، وانقر على "الاتصال بالطبيب"، واشرح المشكلة. انتظر رد الطبيب قبل المتابعة. يتم تسجيل جميع الاتصالات لأغراض حفظ السجلات.'
                },
                category: 'workflow'
            },
            {
                id: 'faq-6',
                question: {
                    en: 'How are patient data and prescription information kept secure?',
                    ar: 'كيف يتم الحفاظ على أمان بيانات المرضى ومعلومات الوصفات الطبية؟'
                },
                answer: {
                    en: 'Patient data and prescription information are protected through multiple security measures. All data is encrypted both in transit and at rest. Access is controlled through role-based permissions, and all activities are logged for audit purposes. We comply with relevant healthcare data protection regulations and conduct regular security assessments.',
                    ar: 'تتم حماية بيانات المرضى ومعلومات الوصفات الطبية من خلال تدابير أمنية متعددة. جميع البيانات مشفرة أثناء النقل وفي حالة التخزين. يتم التحكم في الوصول من خلال أذونات قائمة على الأدوار، ويتم تسجيل جميع الأنشطة لأغراض المراجعة. نحن نلتزم بلوائح حماية بيانات الرعاية الصحية ذات الصلة ونجري تقييمات أمنية منتظمة.'
                },
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

    // Get current language code
    const getCurrentLanguage = () => {
        // This assumes your useLanguage hook provides a way to get the current language
        // You might need to adjust this based on your actual implementation
        return isRTL ? 'ar' : 'en';
    };

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

    // Get the current language
    const currentLang = getCurrentLanguage();

    // Filter guides based on search query
    const filteredGuides = helpData.guides.filter(guide =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter FAQs based on search query
    const filteredFaqs = helpData.faqs.filter(faq =>
        faq.question[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer[currentLang].toLowerCase().includes(searchQuery.toLowerCase())
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

    // Format category name to display properly
    const formatCategory = (category) => {
        return t(`pharmacyPage.help.categories.${category}`);
    };

    // Render Guides tab content
    const renderGuidesTab = () => {
        return (
            <div className="help-content-section">
                <div className="guides-header">
                    <h3>{t('pharmacyPage.help.guides.title')}</h3>
                    <div className="guides-search">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('pharmacyPage.help.guides.searchPlaceholder')}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>
                </div>

                {filteredGuides.length === 0 ? (
                    <div className="no-results">
                        <FaExclamationTriangle className="no-results-icon" />
                        <h4>{t('pharmacyPage.help.guides.noResults.title')}</h4>
                        <p>{t('pharmacyPage.help.guides.noResults.message', { searchTerm: searchQuery })}</p>
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            {t('pharmacyPage.help.guides.noResults.clearSearch')}
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
                                        aria-label={savedGuides.includes(guide.id) ? 
                                            t('pharmacyPage.help.guides.removeBookmark') : 
                                            t('pharmacyPage.help.guides.addBookmark')}
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
                                            {formatCategory(guide.category)}
                                        </span>
                                        <span className="guide-info">
                                            {guide.type === 'video' ?
                                                t('pharmacyPage.help.guides.videoLength', { duration: guide.duration }) :
                                                t('pharmacyPage.help.guides.documentPages', { pages: guide.pages })
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="guide-actions">
                                    <button className="view-guide-btn">
                                        {guide.type === 'video' ? 
                                            t('pharmacyPage.help.guides.watchVideo') : 
                                            t('pharmacyPage.help.guides.readGuide')}
                                    </button>
                                    <button 
                                        className="download-btn"
                                        aria-label={t('pharmacyPage.help.guides.download')}
                                    >
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
                    <h3>{t('pharmacyPage.help.faqs.title')}</h3>
                    <div className="faqs-search">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('pharmacyPage.help.faqs.searchPlaceholder')}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </div>
                </div>

                {filteredFaqs.length === 0 ? (
                    <div className="no-results">
                        <FaExclamationTriangle className="no-results-icon" />
                        <h4>{t('pharmacyPage.help.faqs.noResults.title')}</h4>
                        <p>{t('pharmacyPage.help.faqs.noResults.message', { searchTerm: searchQuery })}</p>
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            {t('pharmacyPage.help.faqs.noResults.clearSearch')}
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
                                            {formatCategory(faq.category)}
                                        </span>
                                        <h4>{faq.question[currentLang]}</h4>
                                    </div>
                                    <div className="expand-icon">
                                        {expandedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>
                                {expandedFaq === faq.id && (
                                    <div className="faq-answer">
                                        <p>{faq.answer[currentLang]}</p>
                                        <div className="answer-actions">
                                            <button className="was-helpful-btn">
                                                <FaCheck /> {t('pharmacyPage.help.faqs.wasHelpful')}
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
                    <h3>{t('pharmacyPage.help.support.title')}</h3>
                </div>

                <div className="support-content">
                    <div className="support-card">
                        <div className="support-info">
                            <div className="support-contact">
                                <h4>{t('pharmacyPage.help.support.technicalSupport.title')}</h4>
                                <p>{t('pharmacyPage.help.support.technicalSupport.description')}</p>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaPhone />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">{t('pharmacyPage.help.support.technicalSupport.phone.label')}</span>
                                        <span className="method-value">{helpData.support.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaEnvelope />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">{t('pharmacyPage.help.support.technicalSupport.email.label')}</span>
                                        <div className="method-copy">
                                            <span className="method-value">{helpData.support.email}</span>
                                            <button
                                                className="copy-btn"
                                                onClick={copyEmailToClipboard}
                                            >
                                                {copySuccess ? <FaClipboardCheck className="success" /> : t('pharmacyPage.help.support.technicalSupport.email.copy')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaCommentAlt />
                                    </div>
                                    <div className="method-details">
                                        <span className="method-label">{t('pharmacyPage.help.support.technicalSupport.liveChat.label')}</span>
                                        <button className="start-chat-btn">{t('pharmacyPage.help.support.technicalSupport.liveChat.action')}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="support-hours">
                                <h4>{t('pharmacyPage.help.support.hours.title')}</h4>
                                <p>{helpData.support.hours}</p>

                                {helpData.support.emergencySupport && (
                                    <div className="emergency-support">
                                        <FaExclamationTriangle className="emergency-icon" />
                                        <div className="emergency-info">
                                            <h5>{t('pharmacyPage.help.support.emergency.title')}</h5>
                                            <p>{t('pharmacyPage.help.support.emergency.description')}</p>
                                            <button className="emergency-btn">
                                                {t('pharmacyPage.help.support.emergency.action')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="feedback-section">
                            <h4>{t('pharmacyPage.help.support.feedback.title')}</h4>
                            <p>{t('pharmacyPage.help.support.feedback.description')}</p>
                            <button className="feedback-btn">
                                {t('pharmacyPage.help.support.feedback.action')}
                            </button>
                        </div>
                    </div>

                    <div className="resources-section">
                        <h4>{t('pharmacyPage.help.support.resources.title')}</h4>

                        <div className="resources-list">
                            <a href="#" className="resource-link">
                                <FaFileAlt className="resource-icon" />
                                <span className="resource-text">{t('pharmacyPage.help.support.resources.documentation')}</span>
                                <FaExternalLinkAlt className="external-icon" />
                            </a>
                            <a href="#" className="resource-link">
                                <FaPlayCircle className="resource-icon" />
                                <span className="resource-text">{t('pharmacyPage.help.support.resources.videos')}</span>
                                <FaExternalLinkAlt className="external-icon" />
                            </a>
                            <a href="#" className="resource-link">
                                <FaDownload className="resource-icon" />
                                <span className="resource-text">{t('pharmacyPage.help.support.resources.userManual')}</span>
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
                    <h3>{t('pharmacyPage.help.security.title')}</h3>
                </div>

                <div className="security-content">
                    <div className="security-intro">
                        <div className="security-icon">
                            <FaShieldAlt />
                        </div>
                        <div className="security-intro-text">
                            <h4>{t('pharmacyPage.help.security.intro.title')}</h4>
                            <p>{t('pharmacyPage.help.security.intro.description')}</p>
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
                        <h4>{t('pharmacyPage.help.security.resources.title')}</h4>
                        <div className="security-resources-grid">
                            <div className="security-resource-card">
                                <FaFileAlt className="resource-icon" />
                                <h5>{t('pharmacyPage.help.security.resources.privacy.title')}</h5>
                                <p>{t('pharmacyPage.help.security.resources.privacy.description')}</p>
                                <button className="resource-btn">{t('pharmacyPage.help.security.resources.privacy.action')}</button>
                            </div>
                            <div className="security-resource-card">
                                <FaFileAlt className="resource-icon" />
                                <h5>{t('pharmacyPage.help.security.resources.training.title')}</h5>
                                <p>{t('pharmacyPage.help.security.resources.training.description')}</p>
                                <button className="resource-btn">{t('pharmacyPage.help.security.resources.training.action')}</button>
                            </div>
                            <div className="security-resource-card">
                                <FaExclamationTriangle className="resource-icon" />
                                <h5>{t('pharmacyPage.help.security.resources.report.title')}</h5>
                                <p>{t('pharmacyPage.help.security.resources.report.description')}</p>
                                <button className="resource-btn">{t('pharmacyPage.help.security.resources.report.action')}</button>
                            </div>
                        </div>
                    </div>

                    <div className="compliance-info">
                        <h4>{t('pharmacyPage.help.security.compliance.title')}</h4>
                        <p>{t('pharmacyPage.help.security.compliance.description')}</p>
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
                    <p>{t('pharmacyPage.help.loading')}</p>
                </div>
            ) : (
                <div className="help-container">
                    <div className="page-header">
                        <h1>{t('pharmacyPage.help.pageTitle')}</h1>
                        <p>{t('pharmacyPage.help.pageSubtitle')}</p>
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
                            <span>{t('pharmacyPage.help.tabs.guides')}</span>
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
                            <span>{t('pharmacyPage.help.tabs.faqs')}</span>
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
                            <span>{t('pharmacyPage.help.tabs.support')}</span>
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
                            <span>{t('pharmacyPage.help.tabs.security')}</span>
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