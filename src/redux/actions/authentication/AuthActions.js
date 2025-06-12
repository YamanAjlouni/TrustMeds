// redux/actions/authentication/AuthActions.js
// FIXED: Removed profile verification since backend doesn't have /api/accounts/profile/ endpoint
import axiosInstance from "../../axiosInstance";
import tokenService from "../../../services/tokenService";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

// Helper function to get endpoint based on user type
const getEndpoint = (userType, action) => {
    const endpoints = {
        patient: {
            login: 'accounts/patients/login/',
            signup: 'accounts/patients/signup/'
        },
        doctor: {
            login: 'accounts/doctors/login/',
            signup: 'accounts/doctors/signup/'
        },
        pharmacy: {
            login: 'accounts/pharmacies/login/',
            signup: 'accounts/pharmacies/signup/'
        }
    };
    
    return endpoints[userType]?.[action] || endpoints.patient[action];
};

// Register user action with user type support
export const registerUser = (userData, userType = 'patient') => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        console.log(`Registering ${userType} with data:`, userData);
        
        const endpoint = getEndpoint(userType, 'signup');
        const response = await axiosInstance.post(endpoint, {
            email: userData.email,
            phone_number: userData.phone,
            password: userData.password,
            // Add additional fields based on user type
            ...(userType === 'doctor' && {
                first_name: userData.firstName,
                last_name: userData.lastName,
                specialization: userData.specialization,
                license_number: userData.licenseNumber
            }),
            ...(userType === 'pharmacy' && {
                pharmacy_name: userData.pharmacyName,
                license_number: userData.licenseNumber,
                address: userData.address
            })
        });

        console.log('Registration response:', response.data);

        // Only save tokens if registration was successful and access token exists
        if (response.data?.access && (response.status === 200 || response.status === 201)) {
            console.log('Registration successful - access token received');
            
            // Determine actual user type from response
            let actualUserType = userType; // Default to selected type
            
            if (response.data.user) {
                // Check the user flags to determine actual type
                if (response.data.user.is_patient) {
                    actualUserType = 'patient';
                } else if (response.data.user.is_doctor) {
                    actualUserType = 'doctor';
                } else if (response.data.user.is_pharmacist) {
                    actualUserType = 'pharmacy';
                }
            }
            
            console.log(`Actual user type from response: ${actualUserType}`);
            
            // Save tokens to localStorage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('userType', actualUserType);
            
            // Store refresh token if available (optional)
            if (response.data?.refresh) {
                localStorage.setItem('refreshToken', response.data.refresh);
            }
            
            console.log(`Tokens saved: access=${!!response.data.access}, refresh=${!!response.data.refresh}`);
            
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { ...response.data, userType: actualUserType }
            });

            return response.data;
        } else {
            console.error('Registration failed - no access token in response');
            throw new Error('Registration failed - no access token received');
        }
    } catch (error) {
        console.error('Registration error:', error);
        console.error('Error response data:', error.response?.data);
        console.error('Error response status:', error.response?.status);
        console.error('Request payload was:', {
            email: userData.email,
            phone_number: userData.phone,
            password: userData.password,
            userType: userType,
            endpoint: getEndpoint(userType, 'signup')
        });

        // Clear any partial data on error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userType');

        // Extract detailed error messages from backend validation
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.response?.data) {
            const errorData = error.response.data;
            const errorMessages = [];
            
            // Handle field-specific validation errors
            if (errorData.email && Array.isArray(errorData.email)) {
                errorMessages.push(`Email: ${errorData.email.join(', ')}`);
            }
            if (errorData.phone_number && Array.isArray(errorData.phone_number)) {
                errorMessages.push(`Phone: ${errorData.phone_number.join(', ')}`);
            }
            if (errorData.password && Array.isArray(errorData.password)) {
                errorMessages.push(`Password: ${errorData.password.join(', ')}`);
            }
            
            // Handle general error messages
            if (errorData.message) {
                errorMessages.push(errorData.message);
            }
            if (errorData.error) {
                errorMessages.push(errorData.error);
            }
            if (errorData.detail) {
                errorMessages.push(errorData.detail);
            }
            if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
                errorMessages.push(errorData.non_field_errors.join(', '));
            }
            
            // Use the collected error messages or fallback
            if (errorMessages.length > 0) {
                errorMessage = errorMessages.join(' | ');
            }
        }

        dispatch({
            type: REGISTER_FAILURE,
            payload: errorMessage
        });

        throw error;
    }
};

// Login user action with user type support - ENHANCED: Better validation
export const loginUser = (credentials, userType = 'patient') => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        console.log(`Attempting to login as ${userType} with credentials:`, credentials);
        
        const endpoint = getEndpoint(userType, 'login');
        console.log(`Using endpoint: ${endpoint}`);
        
        const response = await axiosInstance.post(endpoint, credentials);
        
        console.log('Login response status:', response.status);
        console.log('Login response data:', response.data);
        
        // Only proceed if we have a successful response with tokens
        if (response.data?.access && (response.status === 200 || response.status === 201)) {
            console.log('Login successful - access token received');
            
            // ENHANCED: Try to verify the user type by making a test API call
            // If the backend properly restricts access, this will help us detect mismatches
            let verifiedUserType = userType; // Default to selected
            
            try {
                // Try to access a user-type-specific endpoint to verify
                const testEndpoints = {
                    'patient': 'patients/', // Assuming patients have access to /api/patients/
                    'doctor': 'doctors/',   // Assuming doctors have access to /api/doctors/
                    'pharmacy': 'pharmacies/' // Assuming pharmacies have access to /api/pharmacies/
                };
                
                const testEndpoint = testEndpoints[userType];
                if (testEndpoint) {
                    console.log(`Verifying ${userType} access with test call to ${testEndpoint}`);
                    
                    const testResponse = await axiosInstance.get(testEndpoint, {
                        headers: {
                            'Authorization': `Bearer ${response.data.access}`
                        }
                    });
                    
                    console.log(`✅ ${userType} verification successful`);
                    verifiedUserType = userType;
                } else {
                    console.log('No test endpoint available for verification');
                    verifiedUserType = userType;
                }
                
            } catch (verificationError) {
                console.error(`❌ ${userType} verification failed:`, verificationError);
                
                // If we get 403/401, it might mean wrong user type
                if (verificationError.response?.status === 403 || verificationError.response?.status === 401) {
                    // Try to determine the correct user type by testing other endpoints
                    const allTypes = ['patient', 'doctor', 'pharmacy'];
                    let correctType = null;
                    
                    for (const testType of allTypes) {
                        if (testType === userType) continue; // Skip the one we already tested
                        
                        try {
                            const testEndpoint = testEndpoints[testType];
                            if (testEndpoint) {
                                await axiosInstance.get(testEndpoint, {
                                    headers: {
                                        'Authorization': `Bearer ${response.data.access}`
                                    }
                                });
                                correctType = testType;
                                console.log(`✅ Found correct user type: ${correctType}`);
                                break;
                            }
                        } catch (e) {
                            // Continue testing
                        }
                    }
                    
                    if (correctType && correctType !== userType) {
                        throw new Error(`Authentication mismatch: You selected "${userType}" but your account is registered as "${correctType}". Please select the correct account type and try again.`);
                    }
                }
                
                // If verification fails but we can't determine the correct type,
                // proceed with selected type (backend might not have strict endpoints)
                console.warn('User type verification failed, proceeding with selected type');
                verifiedUserType = userType;
            }
            
            // Save tokens to localStorage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('userType', verifiedUserType);
            
            // Store refresh token if available
            if (response.data?.refresh) {
                localStorage.setItem('refreshToken', response.data.refresh);
            }
            
            console.log(`User type ${verifiedUserType} saved to localStorage`);
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { ...response.data, userType: verifiedUserType }
            });
            
            return response.data;
        } else {
            console.error('Login failed - no access token in response');
            throw new Error('Login failed - invalid response');
        }
    } catch (error) {
        console.error('Login error:', error);
        console.error('Error response:', error.response?.data);
        
        // Clear any tokens on error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userType');
        
        // Extract meaningful error message
        let errorMessage = 'Authentication failed. Please try again.';
        
        // Handle user type mismatch error specifically
        if (error.message && error.message.includes('Authentication mismatch')) {
            errorMessage = error.message;
        } else if (error.response?.status === 401) {
            errorMessage = `Invalid credentials for ${userType}. Please check your email/phone and password.`;
        } else if (error.response?.status === 400) {
            errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.detail ||
                          `Invalid login data for ${userType}. Please check your inputs.`;
        } else if (error.response?.status === 404) {
            errorMessage = `${userType.charAt(0).toUpperCase() + userType.slice(1)} login endpoint not found. Please select the correct user type.`;
        } else if (error.response?.status === 403) {
            errorMessage = `Access denied. Your account cannot login as ${userType}. Please select the correct account type.`;
        } else if (error.response?.data) {
            errorMessage = error.response.data.message || 
                          error.response.data.error || 
                          error.response.data.detail ||
                          `Login failed for ${userType}. Please verify your credentials and user type.`;
        }

        dispatch({
            type: LOGIN_FAILURE,
            payload: errorMessage
        });
        
        throw new Error(errorMessage);
    }
};

// Refresh token action
export const refreshToken = () => async (dispatch) => {
    const refreshTokenValue = tokenService.getRefreshToken();

    if (!refreshTokenValue) {
        console.warn('No refresh token available');
        dispatch(logout());
        return Promise.reject('No refresh token available');
    }

    dispatch({ type: REFRESH_TOKEN_REQUEST });

    try {
        console.log('Refreshing token...');
        const response = await axiosInstance.post('token/refresh/', {
            refresh: refreshTokenValue
        });

        console.log('Token refresh response:', response.data);

        if (response.data?.access) {
            tokenService.setAccessToken(response.data.access);

            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: response.data
            });

            return response.data;
        } else {
            throw new Error('No access token in refresh response');
        }
    } catch (error) {
        console.error('Token refresh error:', error);

        dispatch({
            type: REFRESH_TOKEN_FAILURE,
            payload: error.response?.data || error.message
        });

        // If refresh fails, logout
        dispatch(logout());

        throw error;
    }
};

// Logout action
export const logout = () => (dispatch) => {
    console.log('Logging out user');
    tokenService.clearTokens();
    localStorage.removeItem('userType');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    dispatch({ type: LOGOUT });
};