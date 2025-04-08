import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/trustMeds-logo-blue-nobg-HD.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="TrustMeds Logo" />
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <img src={logo} alt="TrustMeds Logo" className="mobile-logo" />
          <button onClick={() => scrollToSection(homeRef)}>Home</button>
          <button onClick={() => scrollToSection(aboutRef)}>About Us</button>
          <button onClick={() => scrollToSection(aboutRef)}>How It Works</button>
          <button onClick={() => scrollToSection(servicesRef)}>Features & Security</button>
          <button onClick={() => scrollToSection(contactRef)}>Contact Us</button>
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>


        <div
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