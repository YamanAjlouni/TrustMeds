import React, { useState, useEffect } from 'react';
import './Register.scss';
import {
  FaLock,
  FaEnvelope,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaShieldAlt,
  FaClinicMedical,
  FaUserMd,
  FaStore,
  FaPhone,
  FaArrowLeft,
  FaIdCard,
  FaCheckCircle
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'patient' // default to patient
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  const navigate = useNavigate();

  // Simulate initial loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Terms validation
    if (!acceptedTerms) {
      errors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData({
      ...formData,
      userType: type
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setRegisterError('');

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call with a timeout
      setTimeout(() => {
        // In a real app, you would make an actual API call to register the user
        setIsLoading(false);
        setRegisterSuccess(true);

        // Redirect to login after showing success message
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }, 2000);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-page">
      {!isLoaded ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading registration form...</p>
        </div>
      ) : (
        <div className="register-container">
          <div className="register-header">
            <Link to="/login" className="back-to-login">
              <FaArrowLeft /> Back to Login
            </Link>
            <div className="logo-container">
              <FaClinicMedical className="logo-icon" />
              <span>TrustMeds</span>
            </div>
          </div>

          <div className="register-form-card">
            {registerSuccess ? (
              <div className="success-message">
                <FaCheckCircle className="success-icon" />
                <h2>Registration Successful!</h2>
                <p>Your account has been created successfully. You'll be redirected to the login page shortly.</p>
              </div>
            ) : (
              <>
                <div className="register-form-header">
                  <h2>Create Your Account</h2>
                  <p>Join TrustMeds to access our healthcare services</p>
                </div>

                <div className="user-type-selector">
                  <div className="user-type-options">
                    <button
                      className={`user-type-option ${formData.userType === 'patient' ? 'active' : ''}`}
                      onClick={() => handleUserTypeChange('patient')}
                      type="button"
                    >
                      <FaUser className="user-type-icon" />
                      <span>Patient</span>
                    </button>
                    <button
                      className={`user-type-option ${formData.userType === 'doctor' ? 'active' : ''}`}
                      onClick={() => handleUserTypeChange('doctor')}
                      type="button"
                    >
                      <FaUserMd className="user-type-icon" />
                      <span>Doctor</span>
                    </button>
                    <button
                      className={`user-type-option ${formData.userType === 'pharmacy' ? 'active' : ''}`}
                      onClick={() => handleUserTypeChange('pharmacy')}
                      type="button"
                    >
                      <FaStore className="user-type-icon" />
                      <span>Pharmacy</span>
                    </button>
                  </div>
                </div>

                {registerError && (
                  <div className="error-message">
                    <FaExclamationCircle />
                    <span>{registerError}</span>
                  </div>
                )}

                <form className="register-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className={`form-group ${formErrors.firstName && formSubmitted ? 'has-error' : ''}`}>
                      <label htmlFor="firstName">First Name</label>
                      <div className="input-with-icon">
                        <FaUser className="input-icon" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.firstName && formSubmitted && (
                        <div className="input-error">{formErrors.firstName}</div>
                      )}
                    </div>

                    <div className={`form-group ${formErrors.lastName && formSubmitted ? 'has-error' : ''}`}>
                      <label htmlFor="lastName">Last Name</label>
                      <div className="input-with-icon">
                        <FaUser className="input-icon" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.lastName && formSubmitted && (
                        <div className="input-error">{formErrors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className={`form-group ${formErrors.email && formSubmitted ? 'has-error' : ''}`}>
                      <label htmlFor="email">Email Address</label>
                      <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.email && formSubmitted && (
                        <div className="input-error">{formErrors.email}</div>
                      )}
                    </div>

                    <div className={`form-group ${formErrors.phone && formSubmitted ? 'has-error' : ''}`}>
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-with-icon">
                        <FaPhone className="input-icon" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.phone && formSubmitted && (
                        <div className="input-error">{formErrors.phone}</div>
                      )}
                    </div>
                  </div>

                  <div className={`form-group ${formErrors.password && formSubmitted ? 'has-error' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <div className="input-with-icon">
                      <FaLock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={handleTogglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formErrors.password && formSubmitted && (
                      <div className="input-error">{formErrors.password}</div>
                    )}
                    <div className="password-requirements">
                      <p>Password must be at least 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number</p>
                    </div>
                  </div>

                  <div className={`form-group ${formErrors.confirmPassword && formSubmitted ? 'has-error' : ''}`}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-with-icon">
                      <FaLock className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={handleToggleConfirmPasswordVisibility}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && formSubmitted && (
                      <div className="input-error">{formErrors.confirmPassword}</div>
                    )}
                  </div>

                  <div className={`form-group terms-group ${formErrors.terms && formSubmitted ? 'has-error' : ''}`}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={() => setAcceptedTerms(!acceptedTerms)}
                      />
                      <span className="checkmark"></span>
                      I agree to the <a href="#terms" className="terms-link">Terms of Service</a> and <a href="#privacy" className="terms-link">Privacy Policy</a>
                    </label>
                    {formErrors.terms && formSubmitted && (
                      <div className="input-error">{formErrors.terms}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`register-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="register-footer">
              <div className="security-notice">
                <FaShieldAlt className="security-icon" />
                <p>Your information is protected with industry-leading security</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;