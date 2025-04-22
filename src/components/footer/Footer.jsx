import React from 'react';
import './Footer.scss';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { loadSection, direction } = useLanguage();
    const footerText = loadSection('landingPage.footer');

    return (
        <footer className="site-footer" id="footer" dir={direction}>
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-column company-info">
                            <div className="footer-logo">
                                <img src={logo} alt="TrustMeds Logo" />
                            </div>
                            <p className="company-description">
                                {footerText.companyDescription}
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-link">
                                    <Facebook />
                                </a>
                                <a href="#" className="social-link">
                                    <Twitter />
                                </a>
                                <a href="#" className="social-link">
                                    <Linkedin />
                                </a>
                                <a href="#" className="social-link">
                                    <Instagram />
                                </a>
                            </div>
                        </div>

                        <div className="footer-column quick-links">
                            <h3 className="footer-heading">{footerText.quickLinks}</h3>
                            <ul className="footer-links">
                                <li><a href="#home">{footerText.quickLinksItems.home}</a></li>
                                <li><a href="#about">{footerText.quickLinksItems.about}</a></li>
                                <li><a href="#how-it-works">{footerText.quickLinksItems.howItWorks}</a></li>
                                <li><a href="#features-security">{footerText.quickLinksItems.featuresAndSecurity}</a></li>
                                <li><a href="#testimonials">{footerText.quickLinksItems.testimonials}</a></li>
                                <li><a href="#pricing">{footerText.quickLinksItems.pricing}</a></li>
                                <li><a href="#contact">{footerText.quickLinksItems.contact}</a></li>
                            </ul>
                        </div>

                        <div className="footer-column resources">
                            <h3 className="footer-heading">{footerText.resources}</h3>
                            <ul className="footer-links">
                                <li><a href="/documentaion">{footerText.resourcesItems.documentation}</a></li>
                                <li><a href="#">{footerText.resourcesItems.knowledgeBase}</a></li>
                                <li><a href="#">{footerText.resourcesItems.userGuides}</a></li>
                                <li><a href="#">{footerText.resourcesItems.blog}</a></li>
                                <li><a href="#">{footerText.resourcesItems.partnerProgram}</a></li>
                                <li><a href="#">{footerText.resourcesItems.integrationAPI}</a></li>
                            </ul>
                        </div>

                        <div className="footer-column contact-info">
                            <h3 className="footer-heading">{footerText.contactUs}</h3>
                            <ul className="contact-details">
                                <li>
                                    <MapPin className="contact-icon" />
                                    <span>123 Health Street, Medical District<br />Syria , Damascus</span>
                                </li>
                                <li>
                                    <Phone className="contact-icon" />
                                    <span>+963 991 951 452</span>
                                </li>
                                <li>
                                    <Mail className="contact-icon" />
                                    <span>support@trustmeds.com</span>
                                </li>
                            </ul>
                            <div className="newsletter">
                                <h4>{footerText.stayUpdated}</h4>
                                <form className="newsletter-form">
                                    <input type="email" placeholder={footerText.emailPlaceholder} required />
                                    <button type="submit">{footerText.subscribeButton}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            &copy; {currentYear} TrustMeds. {footerText.copyright}
                        </p>
                        <div className="legal-links">
                            <a href="#">{footerText.legalLinks.privacyPolicy}</a>
                            <a href="#">{footerText.legalLinks.termsOfService}</a>
                            <a href="#">{footerText.legalLinks.hipaaCompliance}</a>
                            <a href="#">{footerText.legalLinks.accessibility}</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;