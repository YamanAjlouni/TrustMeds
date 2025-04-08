import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export const Home = () => {
  return (
    <div className="home-container" id="home">
      <div className="content-wrapper">
        <div className="text-overlay">
          <h1 className="main-headline">
            Secure, Digital Prescriptions <span>at Your Fingertips</span>
          </h1>
          <p className="sub-headline">
            TrustMeds ensures safety and efficiency in healthcare,
            bringing your medical prescriptions into the digital age
            with unparalleled security and convenience.
          </p>
          <div className="action-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Patient Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Online Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Secure & Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;