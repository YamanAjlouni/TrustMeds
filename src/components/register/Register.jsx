import React, { useState, useEffect } from 'react';
import './Register.scss';
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaShieldAlt,
  FaClinicMedical,
  FaPhone,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authentication/AuthActions';

export const Register = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Simplified form data - only include what the API requires
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    password: '',
    terms: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Simulate initial loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      phone: '',
      password: '',
      terms: ''
    };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setIsLoading(true);
      setRegisterError(''); // Clear any previous errors

      try {
        // Send the data in the format expected by the API
        await dispatch(registerUser({
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }));
        
        setRegisterSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } catch (err) {
        console.error('Registration error in component:', err);
        
        // Improved error message extraction
        let errorMessage = "Registration failed. Please try again.";
        
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
          } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.data?.error) {
            errorMessage = err.response.data.error;
          } else if (err.response.data?.email) {
            // Handle specific field errors
            errorMessage = `Email: ${err.response.data.email}`;
          } else if (err.response.data?.phone_number) {
            errorMessage = `Phone number: ${err.response.data.phone_number}`;
          } else if (err.response.data?.password) {
            errorMessage = `Password: ${err.response.data.password}`;
          } else if (err.response.data?.non_field_errors) {
            errorMessage = err.response.data.non_field_errors;
          } else {
            // Try to stringify the error data
            try {
              errorMessage = `Server error: ${JSON.stringify(err.response.data)}`;
            } catch (e) {
              errorMessage = `Server error (${err.response.status})`;
            }
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setRegisterError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

                {registerError && (
                  <div className="error-message">
                    <FaExclamationCircle />
                    <span>{registerError}</span>
                  </div>
                )}

                <form className="register-form" onSubmit={handleSubmit}>
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