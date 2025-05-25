import React, { useState, useEffect } from 'react';
import './Login.scss';
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
  FaPhone
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authentication/AuthActions';
import tokenService from '../../services/tokenService';

export const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Check if already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated || tokenService.isAuthenticated()) {
      // Get user info from token to determine user type
      const userInfo = tokenService.getUserFromToken();
      const userType = userInfo?.user_type || 'patient'; // Default to patient if not specified

      // Redirect based on user type
      switch (userType) {
        case 'doctor':
          navigate('/doctor/overview');
          break;
        case 'pharmacy':
          navigate('/pharmacy/overview');
          break;
        default:
          navigate('/patient/overview');
      }
    }
  }, [isAuthenticated, navigate]);

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
      password: ''
    };

    // Only validate email if using email method
    if (loginMethod === 'email') {
      if (!formData.email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Only validate phone if using phone method
    if (loginMethod === 'phone') {
      if (!formData.phone) {
        errors.phone = 'Phone number is required';
        isValid = false;
      } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
        isValid = false;
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
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

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'email' ? 'phone' : 'email');
    // Clear errors when switching methods
    setFormErrors({
      email: '',
      phone: '',
      password: ''
    });
  };

  // Update the handleSubmit function in your Login.jsx component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        // Create credentials object based on login method
        const credentials = {
          password: formData.password,
        };

        if (loginMethod === 'email') {
          credentials.email = formData.email;
        } else {
          credentials.phone_number = formData.phone;
        }

        console.log('Submitting login credentials:', credentials);

        // Dispatch login action
        await dispatch(loginUser(credentials));

        // Check if token was saved
        const hasToken = localStorage.getItem('accessToken');
        console.log('After login dispatch - token exists:', !!hasToken);

        if (hasToken) {
          console.log('Token exists, redirecting to patient dashboard');
          // Your token doesn't contain user_type, so always go to patient dashboard
          navigate('/patient/overview');
        } else {
          console.warn('Login completed but no token was saved');
        }
      } catch (err) {
        console.error('Login error:', err);
      }
    }
  };

  // Replace the useEffect for redirection with this simpler version
  useEffect(() => {
    // Check if token exists and redirect if needed
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('Token found on page load, redirecting to patient dashboard');
      navigate('/patient/overview');
    }
  }, [navigate]); // Only run on first render and when navigate changes

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="login-page">
      {!isLoaded ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading secure login...</p>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-left-panel">
            <div className="brand-container">
              <div className="app-logo">
                <FaClinicMedical />
              </div>
              <h1 className="app-name">TrustMeds</h1>
              <p className="app-tagline">Your Health, Connected</p>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon patient-icon">
                  <FaUser />
                </div>
                <div className="feature-text">
                  <h3>For Patients</h3>
                  <p>Access your medical records, track medications, and schedule appointments all in one place.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon doctor-icon">
                  <FaUserMd />
                </div>
                <div className="feature-text">
                  <h3>For Doctors</h3>
                  <p>Manage patient records, prescriptions, and your schedule efficiently in a secure environment.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon pharmacy-icon">
                  <FaStore />
                </div>
                <div className="feature-text">
                  <h3>For Pharmacies</h3>
                  <p>Process prescriptions, manage inventory, and coordinate with healthcare providers seamlessly.</p>
                </div>
              </div>
            </div>
            <div className="security-block">
              <FaShieldAlt className="security-icon" />
              <p>Your information is protected with industry-leading security standards</p>
            </div>
          </div>

          <div className="login-form-container">
            <div className="login-form-card">
              <div className="login-form-header">
                <h2>Welcome Back</h2>
                <p>Sign in to access your account</p>
              </div>

              <div className="login-method-toggle">
                <button
                  className={`login-method-button ${loginMethod === 'email' ? 'active' : ''}`}
                  onClick={() => setLoginMethod('email')}
                  type="button"
                >
                  <FaEnvelope /> Email
                </button>
                <button
                  className={`login-method-button ${loginMethod === 'phone' ? 'active' : ''}`}
                  onClick={() => setLoginMethod('phone')}
                  type="button"
                >
                  <FaPhone /> Phone
                </button>
              </div>

              {error && (
                <div className="error-message">
                  <FaExclamationCircle />
                  <span>{typeof error === 'string' ? error : 'Authentication failed. Please try again.'}</span>
                </div>
              )}

              <form className="login-form" onSubmit={handleSubmit}>
                {loginMethod === 'email' ? (
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
                ) : (
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
                )}

                <div className={`form-group ${formErrors.password && formSubmitted ? 'has-error' : ''}`}>
                  <div className="password-label-container">
                    <label htmlFor="password">Password</label>
                    <button
                      type="button"
                      className="forgot-password-btn"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
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
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className={`login-button ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="login-footer">
                <p>Don't have an account? <Link to="/register">Create an account</Link></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;