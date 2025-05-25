import { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { loadSection, direction } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinksRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Load navbar translations
  const navbarText = loadSection('landingPage.navbar');

  // Creating refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to the specific section when the link is clicked
  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
    setMobileMenuOpen(false);
  };

  // Check scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside the navbar-links to close the mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} dir={direction}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="TrustMeds Logo" />
        </div>

        <div
          ref={navLinksRef}
          className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}
        >
          <img src={logo} alt="TrustMeds Logo" className="mobile-logo" />
          <button onClick={() => scrollToSection(homeRef)}>{navbarText.home}</button>
          <button onClick={() => scrollToSection(aboutRef)}>{navbarText.aboutUs}</button>
          <button onClick={() => scrollToSection(aboutRef)}>{navbarText.howItWorks}</button>
          <button onClick={() => scrollToSection(servicesRef)}>{navbarText.featuresAndSecurity}</button>
          <button onClick={() => scrollToSection(contactRef)}>{navbarText.contactUs}</button>
          <Link to="/login" className="btn-login">{navbarText.login}</Link>
          <Link to="/signup" className="btn-signup">{navbarText.signUp}</Link>
          <LanguageSwitcher />
        </div>

        <div
          ref={hamburgerRef}
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;