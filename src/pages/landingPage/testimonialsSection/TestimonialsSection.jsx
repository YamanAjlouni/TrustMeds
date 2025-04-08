import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.scss';
import { Quote, Star, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import pic1 from '../../../assets/images/testimonialsAndSuccess/success.jpg';
import pic2 from '../../../assets/images/testimonialsAndSuccess/success2.jpg';
import pic3 from '../../../assets/images/testimonialsAndSuccess/success3.webp';
import family from "../../../assets/images/testimonialsAndSuccess/family-doctor.webp";
import patient from "../../../assets/images/testimonialsAndSuccess/patient.png";
import pharmacist from "../../../assets/images/testimonialsAndSuccess/pharmacist.jpg";

const TestimonialsSection = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            quote: "TrustMeds has completely transformed how I manage prescriptions for my patients. The security features give me confidence that sensitive information is protected, and the instant transfer functionality saves valuable time.",
            author: "Dr. Sarah Johnson",
            role: "Family Physician",
            stars: 5,
            image: family,
        },
        {
            id: 2,
            quote: "As someone who manages multiple medications for chronic conditions, this platform has been life-changing. I can track everything in one place and never miss a refill. The medication tracking analytics have helped me better understand my treatment.",
            author: "Michael Rodriguez",
            role: "Patient",
            stars: 5,
            image: patient,
        },
        {
            id: 3,
            quote: "The integration with our pharmacy systems is seamless. We've reduced prescription processing errors by 68% since implementing TrustMeds, and our customers appreciate the convenience of instant transfers and real-time updates.",
            author: "Emily Chen",
            role: "Lead Pharmacist, MedCare Pharmacy",
            stars: 5,
            image: pharmacist,
        }
    ];

    const caseStudies = [
        {
            id: 1,
            title: "Regional Hospital Network Implementation",
            description: "How Northwest Medical reduced prescription errors by 72% and improved patient satisfaction scores by implementing TrustMeds across their 12-hospital network.",
            thumbnail: pic1,
        },
        {
            id: 2,
            title: "Multi-Generation Family Management",
            description: "The Patel family's story of coordinating care for three generations using TrustMeds' family management features.",
            thumbnail: pic2,
        },
        {
            id: 3,
            title: "Rural Pharmacy Access Improvement",
            description: "How TrustMeds helped connect patients in remote areas with pharmacy services, reducing medication gaps by 84%.",
            thumbnail: pic3,
        }
    ];

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
                setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
            }, 8000);
        }
    };

    const handlePrev = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        // Reset timer when manually changing
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startInterval();
        }
    };

    const handleNext = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
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
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Testimonials & Success Stories</h2>
                    <p className="section-subtitle">
                        See how TrustMeds is transforming prescription management for healthcare providers and patients alike
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
                            {testimonials.map((testimonial, index) => (
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
                                                <img src={`${testimonial.image}`} alt={testimonial.author} />
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
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(index)}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="case-studies-section">
                    <h3 className="subsection-title">Success Stories</h3>
                    <div className="case-studies-grid">
                        {caseStudies.map((caseStudy) => (
                            <div key={caseStudy.id} className="case-study-card">
                                <div className="case-study-thumbnail">
                                    <img src={caseStudy.thumbnail} alt={caseStudy.title} />
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
                                        Read Full Story
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