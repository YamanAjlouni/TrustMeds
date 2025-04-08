import React, { useState } from 'react';
import './Documentation.scss';
import { Search, ChevronRight, Book, Users, Code, Lock, Download, PlayCircle, ExternalLink } from 'lucide-react';

const Documentation = () => {
    const [activeCategory, setActiveCategory] = useState('getting-started');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'getting-started', label: 'Getting Started', icon: <Book /> },
        { id: 'user-guides', label: 'User Guides', icon: <Users /> },
        { id: 'api-reference', label: 'API Reference', icon: <Code /> },
        { id: 'security', label: 'Security & Compliance', icon: <Lock /> },
        { id: 'downloads', label: 'Downloads', icon: <Download /> },
    ];

    const docContent = {
        'getting-started': [
            {
                title: 'Welcome to TrustMeds Documentation',
                description: 'Learn how to use TrustMeds to manage prescriptions securely across the healthcare ecosystem.',
                link: '#welcome',
                isNew: true,
            },
            {
                title: 'Quick Start Guide',
                description: 'Get up and running with TrustMeds in less than 10 minutes.',
                link: '#quick-start',
            },
            {
                title: 'System Requirements',
                description: 'Hardware and software requirements for optimal performance.',
                link: '#system-requirements',
            },
            {
                title: 'Core Concepts',
                description: 'Understanding the fundamental concepts behind TrustMeds.',
                link: '#core-concepts',
            },
            {
                title: 'Account Setup',
                description: 'How to create and configure your TrustMeds account.',
                link: '#account-setup',
            },
        ],
        'user-guides': [
            {
                title: 'For Patients',
                description: 'How patients can manage prescriptions, view medication history, and communicate with providers.',
                link: '#patient-guide',
            },
            {
                title: 'For Doctors',
                description: 'Guide for physicians on writing, managing, and tracking prescriptions.',
                link: '#doctor-guide',
            },
            {
                title: 'For Pharmacists',
                description: 'How pharmacies can receive, process, and update prescription status.',
                link: '#pharmacy-guide',
            },
            {
                title: 'Family Management',
                description: 'Setting up and managing family accounts for dependent care.',
                link: '#family-management',
                isNew: true,
            },
            {
                title: 'Analytics Dashboard',
                description: 'Understanding and utilizing medication analytics and reports.',
                link: '#analytics',
            },
        ],
        'api-reference': [
            {
                title: 'API Overview',
                description: 'Introduction to the TrustMeds API architecture and capabilities.',
                link: '#api-overview',
            },
            {
                title: 'Authentication',
                description: 'Secure access to the API using OAuth 2.0 and API keys.',
                link: '#authentication',
            },
            {
                title: 'Prescription Endpoints',
                description: 'API endpoints for creating, updating, and querying prescriptions.',
                link: '#prescription-endpoints',
            },
            {
                title: 'User Management',
                description: 'Endpoints for managing users, roles, and permissions.',
                link: '#user-management',
            },
            {
                title: 'Webhooks & Events',
                description: 'Real-time notifications for prescription updates and events.',
                link: '#webhooks',
                isNew: true,
            },
            {
                title: 'Rate Limits & Quotas',
                description: 'Understanding API usage limits and best practices.',
                link: '#rate-limits',
            },
        ],
        'security': [
            {
                title: 'Security Overview',
                description: 'TrustMeds security architecture and protection mechanisms.',
                link: '#security-overview',
            },
            {
                title: 'HIPAA Compliance',
                description: 'How TrustMeds ensures compliance with healthcare privacy regulations.',
                link: '#hipaa',
            },
            {
                title: 'Data Encryption',
                description: 'End-to-end encryption for sensitive prescription and patient data.',
                link: '#encryption',
            },
            {
                title: 'Audit Logs',
                description: 'Tracking and reviewing all system access and changes.',
                link: '#audit-logs',
            },
            {
                title: 'Security Best Practices',
                description: 'Recommended security settings and practices for administrators.',
                link: '#security-best-practices',
            },
        ],
        'downloads': [
            {
                title: 'Mobile Apps',
                description: 'Download TrustMeds mobile applications for iOS and Android.',
                link: '#mobile-apps',
            },
            {
                title: 'Desktop Applications',
                description: 'Desktop versions for Windows, macOS, and Linux.',
                link: '#desktop-apps',
            },
            {
                title: 'SDKs & Libraries',
                description: 'Development kits for various programming languages.',
                link: '#sdks',
                isNew: true,
            },
            {
                title: 'Sample Code',
                description: 'Example implementations and code samples.',
                link: '#sample-code',
            },
            {
                title: 'Integration Templates',
                description: 'Templates for common Electronic Health Record (EHR) integrations.',
                link: '#integration-templates',
            },
        ],
    };

    const filteredContent = searchQuery
        ? Object.values(docContent)
            .flat()
            .filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : docContent[activeCategory];

    return (
        <section className="documentation-section" id="documentation">
            <div className="container">
                <div className="section-header">
                    <h1 className="section-title">Documentation</h1>
                    <p className="section-subtitle">
                        Everything you need to know about integrating and using TrustMeds
                    </p>
                    <div className="search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search documentation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="documentation-content">
                    <div className="sidebar">
                        <nav className="category-nav">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setSearchQuery('');
                                    }}
                                >
                                    <span className="icon">{category.icon}</span>
                                    <span className="label">{category.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="help-card">
                            <div className="help-icon">
                                <PlayCircle />
                            </div>
                            <h3>Video Tutorials</h3>
                            <p>Watch our guided walkthroughs for visual learning</p>
                            <a href="#tutorials" className="help-link">
                                View Tutorials <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="main-content">
                        {searchQuery && (
                            <div className="search-results-header">
                                <h2>Search Results for "{searchQuery}"</h2>
                                <button 
                                    className="clear-search"
                                    onClick={() => setSearchQuery('')}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}

                        <div className="doc-cards-grid">
                            {filteredContent.map((item, index) => (
                                <a href={item.link} key={index} className="doc-card">
                                    <div className="card-content">
                                        <h3 className="doc-title">
                                            {item.title}
                                            {item.isNew && <span className="new-badge">New</span>}
                                        </h3>
                                        <p className="doc-description">{item.description}</p>
                                    </div>
                                    <div className="card-arrow">
                                        <ChevronRight />
                                    </div>
                                </a>
                            ))}
                        </div>
                        
                        {!searchQuery && (
                            <div className="category-footer">
                                <h3>Need more help with {categories.find(c => c.id === activeCategory).label}?</h3>
                                <div className="footer-links">
                                    <a href="#community">Community Forums</a>
                                    <a href="#contact-support">Contact Support</a>
                                    <a href="#feedback">Submit Feedback</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>
        </section>
    );
};

export default Documentation;