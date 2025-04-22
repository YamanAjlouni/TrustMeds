import React, { useEffect, useRef } from 'react';
import './About.scss';
import { Shield, Clock, FileCheck, Users, Award, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const About = () => {
  const { loadSection, direction } = useLanguage();
  // Load about section translations
  const aboutText = loadSection('landingPage.about');

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Define benefit icons
  const benefitIcons = [
    <Shield className="benefit-icon" />,
    <Clock className="benefit-icon" />,
    <FileCheck className="benefit-icon" />,
    <Users className="benefit-icon" />,
    <Award className="benefit-icon" />,
    <RefreshCw className="benefit-icon" />
  ];

  return (
    <section className="about-section" id="about" ref={ref} dir={direction}>
      <div className="container">
        {/* 1. Section Header */}
        <div className='section-header'>
          <h2 className="section-title">
            {aboutText.title} <span className="highlight">{aboutText.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">
            {aboutText.subtitle}
          </p>
        </div>

        {/* 2. About Description Container */}
        <motion.div
          className="about-description-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <p className="about-description">
            {aboutText.description}
          </p>
          <div className="description-actions">
            <button className="learn-more-btn">
              {aboutText.learnMore} <ChevronRight size={16} />
            </button>
            <div className="trust-indicator">
              <div className="trust-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span>{aboutText.trustedBy}</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Two-column layout with visual-content and benefits-section */}
        <div className="content-wrapper">
          {/* Left Column: Visual Content with SVG */}
          <motion.div
            className="visual-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <div className="prescription-flow">
              <div className="animation-wrapper">
                <svg viewBox="0 0 450 400" xmlns="http://www.w3.org/2000/svg">
                  {/* Background elements */}
                  <circle cx="225" cy="200" r="160" fill="none" stroke="#e6f7ff" strokeWidth="30" opacity="0.4" />
                  <circle cx="225" cy="200" r="120" fill="none" stroke="#e6f7ff" strokeWidth="15" opacity="0.3" />

                  {/* Doctor */}
                  <g>
                    <circle cx="100" cy="100" r="45" fill="#e6f7ff" />
                    <circle cx="100" cy="100" r="43" fill="white" stroke="#1890ff" strokeWidth="2" />
                    <rect x="85" y="70" width="30" height="15" rx="7" fill="#1890ff" />
                    <circle cx="100" cy="90" r="20" fill="#e6f7ff" />
                    <rect x="90" y="120" width="20" height="40" rx="10" fill="#1890ff" />
                    <circle cx="100" cy="100" r="48" fill="none" stroke="#1890ff" strokeWidth="2" opacity="0.5" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="60" to="0" dur="10s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Prescription data flow */}
                  <g>
                    <path d="M145 100 L205 100" stroke="#1890ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <circle cx="155" cy="100" r="3" fill="#1890ff">
                      <animate attributeName="cx" values="145;205;145" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="175" cy="100" r="2" fill="#1890ff">
                      <animate attributeName="cx" values="145;205;145" dur="2s" begin="0.3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Server/Platform */}
                  <g>
                    <rect x="205" y="60" width="80" height="80" rx="15" fill="#f0f9ff" />
                    <rect x="205" y="60" width="80" height="80" rx="15" fill="none" stroke="#1890ff" strokeWidth="2" />
                    <rect x="220" y="75" width="50" height="10" rx="5" fill="#1890ff" opacity="0.7" />
                    <rect x="220" y="95" width="50" height="10" rx="5" fill="#1890ff" opacity="0.7" />
                    <rect x="220" y="115" width="30" height="10" rx="5" fill="#1890ff" opacity="0.7" />
                    <rect x="200" y="55" width="90" height="90" rx="20" fill="none" stroke="#1890ff" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="40" to="0" dur="8s" repeatCount="indefinite" />
                    </rect>
                  </g>

                  {/* Data flow to pharmacy */}
                  <g>
                    <path d="M285 100 L345 100" stroke="#1890ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <circle cx="305" cy="100" r="3" fill="#1890ff">
                      <animate attributeName="cx" values="285;345;285" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="325" cy="100" r="2" fill="#1890ff">
                      <animate attributeName="cx" values="285;345;285" dur="2s" begin="0.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.4s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Pharmacy */}
                  <g>
                    <rect x="345" y="65" width="65" height="65" rx="10" fill="#f6ffed" />
                    <rect x="345" y="65" width="65" height="65" rx="10" fill="none" stroke="#52c41a" strokeWidth="2" />
                    <rect x="355" y="75" width="45" height="5" rx="2.5" fill="#52c41a" />
                    <rect x="355" y="85" width="45" height="30" rx="5" fill="#f6ffed" stroke="#52c41a" strokeWidth="1" />
                    <circle cx="377.5" cy="115" r="8" fill="#52c41a" opacity="0.6" />
                    <rect x="340" y="60" width="75" height="75" rx="15" fill="none" stroke="#52c41a" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="40" to="0" dur="8s" repeatCount="indefinite" />
                    </rect>
                  </g>

                  {/* Patient */}
                  <g>
                    <circle cx="245" cy="250" r="45" fill="#fff7e6" />
                    <circle cx="245" cy="250" r="43" fill="none" stroke="#fa8c16" strokeWidth="2" />
                    <circle cx="245" cy="230" r="15" fill="#fff7e6" stroke="#fa8c16" strokeWidth="1" />
                    <path d="M225 260 Q245 280 265 260" stroke="#fa8c16" strokeWidth="2" fill="none" />
                    <circle cx="245" cy="250" r="48" fill="none" stroke="#fa8c16" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="40" to="0" dur="8s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Flow from doctor to patient */}
                  <g>
                    <path d="M120 140 Q150 200 210 250" stroke="#1890ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5,5" fill="none">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx="130" cy="150" r="3" fill="#1890ff">
                      <animate attributeName="cx" values="120;210;120" dur="3s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="cy" values="140;250;140" dur="3s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="145" cy="175" r="2" fill="#1890ff">
                      <animate attributeName="cx" values="120;210;120" dur="3s" begin="0.5s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="cy" values="140;250;140" dur="3s" begin="0.5s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Flow from pharmacy to patient */}
                  <g>
                    <path d="M345 130 Q300 200 280 250" stroke="#52c41a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5,5" fill="none">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx="335" cy="150" r="3" fill="#52c41a">
                      <animate attributeName="cx" values="345;280;345" dur="3s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="cy" values="130;250;130" dur="3s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="320" cy="175" r="2" fill="#52c41a">
                      <animate attributeName="cx" values="345;280;345" dur="3s" begin="0.7s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="cy" values="130;250;130" dur="3s" begin="0.7s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                      <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0.7s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Mobile device in patient's hand */}
                  <g>
                    <rect x="220" y="290" width="50" height="80" rx="10" fill="#ffffff" stroke="#fa8c16" strokeWidth="2" />
                    <rect x="225" y="295" width="40" height="60" rx="5" fill="#fff7e6" />
                    <rect x="235" y="305" width="20" height="5" rx="2" fill="#fa8c16" opacity="0.7" />
                    <rect x="235" y="315" width="20" height="5" rx="2" fill="#fa8c16" opacity="0.7" />
                    <rect x="235" y="325" width="20" height="5" rx="2" fill="#fa8c16" opacity="0.7" />
                    <circle cx="245" cy="365" r="5" fill="#fa8c16" opacity="0.6" />

                    <g>
                      <circle cx="245" cy="335" r="8" fill="none" stroke="#fa8c16" strokeWidth="1.5">
                        <animate attributeName="r" values="0;8;0" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="245" cy="335" r="12" fill="none" stroke="#fa8c16" strokeWidth="1">
                        <animate attributeName="r" values="0;15;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.4;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>

                  {/* Text labels with better styling */}
                  <g>
                    <rect x="70" y="175" width="60" height="22" rx="11" fill="white" stroke="#1890ff" strokeWidth="1.5" />
                    <text x="100" y="190" textAnchor="middle" fill="#1890ff" fontSize="12" fontWeight="bold">Doctor</text>
                  </g>

                  <g>
                    <rect x="215" y="30" width="60" height="22" rx="11" fill="white" stroke="#1890ff" strokeWidth="1.5" />
                    <text x="245" y="45" textAnchor="middle" fill="#1890ff" fontSize="12" fontWeight="bold">TrustMeds</text>
                  </g>

                  <g>
                    <rect x="345" y="150" width="65" height="22" rx="11" fill="white" stroke="#52c41a" strokeWidth="1.5" />
                    <text x="377.5" y="165" textAnchor="middle" fill="#52c41a" fontSize="12" fontWeight="bold">Pharmacy</text>
                  </g>

                  <g>
                    <rect x="215" y="380" width="60" height="22" rx="11" fill="white" stroke="#fa8c16" strokeWidth="1.5" />
                    <text x="245" y="395" textAnchor="middle" fill="#fa8c16" fontSize="12" fontWeight="bold">Patient</text>
                  </g>
                </svg>
              </div>
              <div className="tech-badge">
                <div className="badge-icon">
                  <Shield size={14} />
                </div>
                <span>{aboutText.blockchainSecured}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Benefits Section */}
          <motion.div
            className="benefits-section"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="benefits-title">{aboutText.benefitsTitle}</h3>

            <div className="benefits-grid">
              {aboutText.benefits.map((benefit, index) => (
                <div key={index} className='benefit-item'>
                  <div className="benefit-card">
                    <div className="icon-wrapper">
                      {benefitIcons[index]}
                    </div>
                    <div className="benefit-content">
                      <h3 className="benefit-title">{benefit.title}</h3>
                      <p className="benefit-description">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="benefit-hover-effect"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section remains at the bottom */}
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <div className="cta-content">
            <h3>{aboutText.ctaTitle}</h3>
            <p>{aboutText.ctaSubtitle}</p>
          </div>
          <div className="cta-actions">
            <NavLink to='/patient/overview' className="cta-button primary">{aboutText.getStarted}</NavLink>
            <button className="cta-button secondary">{aboutText.scheduleDemo}</button>
          </div>
        </motion.div>
      </div>

      <div className="decorative-shape shape-1"></div>
      <div className="decorative-shape shape-2"></div>
    </section>
  );
};

export default About;