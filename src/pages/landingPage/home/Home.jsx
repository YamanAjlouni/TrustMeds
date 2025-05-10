import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { useLanguage } from '../../../context/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home-container" id="home">
      <div className="content-wrapper">
        <div className="text-overlay">
          <h1 className="main-headline">
            {t('landingPage.home.mainHeadline.part1')}
            <span>{t('landingPage.home.mainHeadline.part2')}</span>
          </h1>
          <p className="sub-headline">
            {t('landingPage.home.subHeadline')}
          </p>
          <div className="action-buttons">
            <Link to="/doctor/overview" className="btn btn-primary">
              {t('landingPage.home.buttons.getStarted')}
            </Link>
            <Link to="/pharmacy/overview" className="btn btn-outline">
              {t('landingPage.home.buttons.learnMore')}
            </Link>
          </div>
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">
                {t('landingPage.home.quickStats.patientSatisfaction.number')}
              </span>
              <span className="stat-label">
                {t('landingPage.home.quickStats.patientSatisfaction.label')}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {t('landingPage.home.quickStats.support.number')}
              </span>
              <span className="stat-label">
                {t('landingPage.home.quickStats.support.label')}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {t('landingPage.home.quickStats.security.number')}
              </span>
              <span className="stat-label">
                {t('landingPage.home.quickStats.security.label')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;