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
  const [userType, setUserType] = useState('patient');

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
    const token = localStorage.getItem('accessToken');
    const savedUserType = localStorage.getItem('userType');
    
    if (token && savedUserType && (isAuthenticated || tokenService.isAuthenticated())) {
      console.log(`Already authenticated, redirecting to ${savedUserType} dashboard`);
      redirectToDashboard(savedUserType);
    }
  }, [isAuthenticated, navigate]);

  // Function to redirect based on user type
  const redirectToDashboard = (type) => {
    switch (type) {
      case 'doctor':
        navigate('/doctor/overview');
        break;
      case 'pharmacy':
        navigate('/pharmacy/overview');
        break;
      default:
        navigate('/patient/overview');
    }
  };

  // Simulate initial loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        // Clear any existing tokens before attempting login
        console.log('Clearing existing tokens before login attempt');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userType');

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
        console.log('User type:', userType);

        // Dispatch login action with user type and wait for it to complete
        const loginResult = await dispatch(loginUser(credentials, userType));

        console.log('Login result:', loginResult);

        // Only redirect if login was actually successful
        // Check both the result and if tokens were saved
        const hasNewToken = localStorage.getItem('accessToken');
        const savedUserType = localStorage.getItem('userType');

        if (hasNewToken && savedUserType) {
          // Verify that the saved user type matches what we expected
          if (savedUserType === userType) {
            console.log(`Login successful, redirecting to ${userType} dashboard`);
            // Add small delay to ensure localStorage is fully committed
            setTimeout(() => {
              redirectToDashboard(userType);
            }, 200);
          } else {
            console.warn(`User type mismatch: Expected ${userType}, got ${savedUserType}`);
            // Clear tokens since there's a mismatch
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userType');
          }
        } else {
          console.warn('Login failed - no token saved');
          // Clear any partial data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userType');
        }

      } catch (err) {
        console.error('Login error:', err);
        
        // Make sure to clear any tokens on error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userType');
        
        // The error will be handled by Redux and shown in the UI
        // Don't redirect anywhere on error
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'doctor':
        return <FaUserMd />;
      case 'pharmacy':
        return <FaStore />;
      default:
        return <FaUser />;
    }
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 'doctor':
        return 'Doctor';
      case 'pharmacy':
        return 'Pharmacy';
      default:
        return 'Patient';
    }
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
            <Link to='/' className="brand-container">
              <div className="app-logo">
                <FaClinicMedical />
              </div>
              <h3 className="app-name">TrustMeds</h3>
              <p className="app-tagline">Your Health, Connected</p>
            </Link>
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

              {/* User Type Selector */}
              <div className="user-type-selector">
                <label>I am a:</label>
                <div className="user-type-options">
                  <button
                    type="button"
                    className={`user-type-option ${userType === 'patient' ? 'active' : ''}`}
                    onClick={() => setUserType('patient')}
                  >
                    <FaUser className="user-type-icon" />
                    <span>Patient</span>
                  </button>
                  <button
                    type="button"
                    className={`user-type-option ${userType === 'doctor' ? 'active' : ''}`}
                    onClick={() => setUserType('doctor')}
                  >
                    <FaUserMd className="user-type-icon" />
                    <span>Doctor</span>
                  </button>
                  <button
                    type="button"
                    className={`user-type-option ${userType === 'pharmacy' ? 'active' : ''}`}
                    onClick={() => setUserType('pharmacy')}
                  >
                    <FaStore className="user-type-icon" />
                    <span>Pharmacy</span>
                  </button>
                </div>
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
                  <span>{typeof error === 'string' ? error : 'Authentication failed. Please check your credentials and try again.'}</span>
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
                    <span>Sign In as {getUserTypeLabel(userType)}</span>
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