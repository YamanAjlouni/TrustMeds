import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.scss';
import { Quote, Star, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import pic1 from '../../../assets/images/testimonialsAndSuccess/success.jpg';
import pic2 from '../../../assets/images/testimonialsAndSuccess/success2.jpg';
import pic3 from '../../../assets/images/testimonialsAndSuccess/success3.webp';
import family from "../../../assets/images/testimonialsAndSuccess/family-doctor.webp";
import patient from "../../../assets/images/testimonialsAndSuccess/patient.png";
import pharmacist from "../../../assets/images/testimonialsAndSuccess/pharmacist.jpg";
import { useLanguage } from '../../../context/LanguageContext';

const TestimonialsSection = () => {
    const { loadSection, direction } = useLanguage();
    const testimonialsText = loadSection('landingPage.testimonials');

    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Map the testimonial images by id for consistency
    const testimonialImages = {
        1: family,
        2: patient,
        3: pharmacist
    };

    // Map the case study images by id
    const caseStudyImages = {
        1: pic1,
        2: pic2,
        3: pic3
    };

    // Setup and clear interval when component mounts/unmounts
    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [activeTestimonial, isPaused]);

    const startInterval = () => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Only start a new interval if not paused
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setActiveTestimonial((prev) => (prev + 1) % testimonialsText.testimonials.length);
            }, 8000);
        }
    };

    const handlePrev = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonialsText.testimonials.length) % testimonialsText.testimonials.length);
        // Reset timer when manually changing
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startInterval();
        }
    };

    const handleNext = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonialsText.testimonials.length);
        // Reset timer when manually changing
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startInterval();
        }
    };

    const handleIndicatorClick = (index) => {
        setActiveTestimonial(index);
        // Reset timer when manually changing
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startInterval();
        }
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        startInterval();
    };

    const openVideoModal = (videoId) => {
        setSelectedVideo(videoId);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <section className="testimonials-section" id="testimonials" dir={direction}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{testimonialsText.title}</h2>
                    <p className="section-subtitle">
                        {testimonialsText.subtitle}
                    </p>
                </div>

                <div className="testimonials-wrapper">
                    <div className="testimonials-carousel">
                        <button className="carousel-arrow prev" onClick={handlePrev}>
                            <ChevronLeft />
                        </button>

                        <div
                            className="testimonials-container"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {testimonialsText.testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                                >
                                    <div className="quote-icon">
                                        <Quote />
                                    </div>

                                    <div className="testimonial-content">
                                        <p className="testimonial-quote">{testimonial.quote}</p>

                                        <div className="testimonial-author">
                                            <div className="author-image">
                                                <img src={testimonialImages[testimonial.id]} alt={testimonial.author} />
                                            </div>
                                            <div className="author-info">
                                                <h4>{testimonial.author}</h4>
                                                <p>{testimonial.role}</p>
                                                <div className="stars">
                                                    {[...Array(testimonial.stars)].map((_, i) => (
                                                        <Star key={i} className="star-icon" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="carousel-arrow next" onClick={handleNext}>
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="carousel-indicators">
                        {testimonialsText.testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(index)}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="case-studies-section">
                    <h3 className="subsection-title">{testimonialsText.successStoriesTitle}</h3>
                    <div className="case-studies-grid">
                        {testimonialsText.caseStudies.map((caseStudy) => (
                            <div key={caseStudy.id} className="case-study-card">
                                <div className="case-study-thumbnail">
                                    <img src={caseStudyImages[caseStudy.id]} alt={caseStudy.title} />
                                    {caseStudy.videoId && (
                                        <button
                                            className="video-play-button"
                                            onClick={() => openVideoModal(caseStudy.videoId)}
                                        >
                                            <PlayCircle />
                                        </button>
                                    )}
                                </div>
                                <div className="case-study-content">
                                    <h4>{caseStudy.title}</h4>
                                    <p>{caseStudy.description}</p>
                                    <button className="read-more-button">
                                        {testimonialsText.readFullStory}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isVideoModalOpen && (
                <div className="video-modal" onClick={closeVideoModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={closeVideoModal}>×</button>
                        <div className="video-container">
                            {/* Video player would be inserted here */}
                            <div className="video-placeholder">
                                <p>Video Player: {selectedVideo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>
        </section>
    );
};

export default TestimonialsSection;