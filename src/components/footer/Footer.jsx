import React from 'react';
import './Footer.scss';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="site-footer" id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-column company-info">
                            <div className="footer-logo">
                                <img src={logo} alt="TrustMeds Logo" />
                            </div>
                            <p className="company-description">
                                Secure prescription management platform connecting patients, doctors, and pharmacies
                                with advanced encryption and seamless medication tracking.
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
                            <h3 className="footer-heading">Quick Links</h3>
                            <ul className="footer-links">
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#features-security">Features & Security</a></li>
                                <li><a href="#testimonials">Testimonials</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column resources">
                            <h3 className="footer-heading">Resources</h3>
                            <ul className="footer-links">
                                <li><a href="/documentaion">Documentation</a></li>
                                <li><a href="#">Knowledge Base</a></li>
                                <li><a href="#">User Guides</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Partner Program</a></li>
                                <li><a href="#">Integration API</a></li>
                            </ul>
                        </div>

                        <div className="footer-column contact-info">
                            <h3 className="footer-heading">Contact Us</h3>
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
                                <h4>Stay Updated</h4>
                                <form className="newsletter-form">
                                    <input type="email" placeholder="Your email" required />
                                    <button type="submit">Subscribe</button>
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
                            &copy; {currentYear} TrustMeds. All rights reserved.
                        </p>
                        <div className="legal-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">HIPAA Compliance</a>
                            <a href="#">Accessibility</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;