// src/pages/Landing.js
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Home from './home/Home';
import About from './about/About';
import HowItWorks from './howItWorks/HowItWorks';
import FeaturesAndSecurity from './featuresAndSecurity/FeaturesAndSecurity';
import TestimonialsSection from './testimonialsSection/TestimonialsSection';
import Footer from '../../components/footer/Footer';

const Landing = () => {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <HowItWorks />
            <FeaturesAndSecurity />
            <TestimonialsSection />
            <Footer />
        </>
    );
};

export default Landing;
