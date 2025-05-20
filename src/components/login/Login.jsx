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
  FaStore
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
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
      email: '',
      password: ''
    };

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setIsLoading(true);
      setLoginError('');

      // Simulate API call with a timeout
      setTimeout(() => {
        // In a real app, you would make an actual API call here and determine user type from response
        // For demo, we'll just navigate to the appropriate dashboard based on email
        if (formData.email === 'patient@example.com' && formData.password === 'password123') {
          navigate('/patient/overview');
        } else if (formData.email === 'doctor@example.com' && formData.password === 'password123') {
          navigate('/doctor/overview');
        } else if (formData.email === 'pharmacy@example.com' && formData.password === 'password123') {
          navigate('/pharmacy/overview');
        } else {
          setLoginError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to a password reset page
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

              {loginError && (
                <div className="error-message">
                  <FaExclamationCircle />
                  <span>{loginError}</span>
                </div>
              )}

              <form className="login-form" onSubmit={handleSubmit}>
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
                  className={`login-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
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

              <div className="demo-credentials">
                <h4>Demo Accounts</h4>
                <div className="credential-list">
                  <div className="credential-item">
                    <span className="user-type patient">Patient:</span>
                    <span className="credentials">patient@example.com / password123</span>
                  </div>
                  <div className="credential-item">
                    <span className="user-type doctor">Doctor:</span>
                    <span className="credentials">doctor@example.com / password123</span>
                  </div>
                  <div className="credential-item">
                    <span className="user-type pharmacy">Pharmacy:</span>
                    <span className="credentials">pharmacy@example.com / password123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;