// redux/actions/authentication/AuthActions.js
// 
// BACKEND REQUIREMENTS:
// 1. Each user type should have separate login endpoints that ONLY accept credentials for that user type
// 2. Login response should include the actual user_type field: { access: "token", refresh: "token", user_type: "patient|doctor|pharmacy" }
// 3. Endpoints should return 401 for wrong credentials, 404 for user not found, 403 for wrong user type
//
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

// Login user action with user type support
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
            
            // Save token temporarily to make profile verification call
            const tempToken = response.data.access;
            
            try {
                // Verify user type by making a profile call
                console.log('Verifying user type with profile call...');
                const profileResponse = await axiosInstance.get('accounts/profile/', {
                    headers: {
                        'Authorization': `Bearer ${tempToken}`
                    }
                });
                
                console.log('Profile response:', profileResponse.data);
                
                // Determine actual user type from profile response
                let actualUserType = null;
                if (profileResponse.data?.user) {
                    const user = profileResponse.data.user;
                    if (user.is_patient) {
                        actualUserType = 'patient';
                    } else if (user.is_doctor) {
                        actualUserType = 'doctor';
                    } else if (user.is_pharmacist) {
                        actualUserType = 'pharmacy';
                    }
                } else if (profileResponse.data?.is_patient) {
                    actualUserType = 'patient';
                } else if (profileResponse.data?.is_doctor) {
                    actualUserType = 'doctor';
                } else if (profileResponse.data?.is_pharmacist) {
                    actualUserType = 'pharmacy';
                }
                
                console.log(`Selected user type: ${userType}`);
                console.log(`Actual user type from profile: ${actualUserType}`);
                
                // Validate that the selected user type matches the actual user type
                if (actualUserType && actualUserType !== userType) {
                    console.error(`User type mismatch! Selected: ${userType}, Actual: ${actualUserType}`);
                    throw new Error(`Cannot login as ${userType}. This account is registered as a ${actualUserType}. Please select the correct user type.`);
                }
                
                // If no actual user type detected but login was successful, use selected type
                const finalUserType = actualUserType || userType;
                
                // Save tokens to localStorage only after verification
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('userType', finalUserType);
                
                // Store refresh token if available
                if (response.data?.refresh) {
                    localStorage.setItem('refreshToken', response.data.refresh);
                }
                
                console.log(`User type ${finalUserType} verified and saved to localStorage`);
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { ...response.data, userType: finalUserType }
                });
                
                return response.data;
                
            } catch (profileError) {
                console.error('Profile verification failed:', profileError);
                
                // If profile call fails but we got a specific user type mismatch error, use that
                if (profileError.message && profileError.message.includes('Cannot login as')) {
                    throw profileError;
                }
                
                // If profile call fails for other reasons, proceed with selected user type
                console.warn('Profile verification failed, proceeding with selected user type');
                
                const actualUserType = userType;
                
                // Save tokens to localStorage
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('userType', actualUserType);
                
                // Store refresh token if available
                if (response.data?.refresh) {
                    localStorage.setItem('refreshToken', response.data.refresh);
                }
                
                console.log(`User type ${actualUserType} saved to localStorage`);
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { ...response.data, userType: actualUserType }
                });
                
                return response.data;
            }
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
        
        if (error.response?.status === 401) {
            errorMessage = `Invalid credentials for ${userType}. Please check your email/phone and password.`;
        } else if (error.response?.status === 400) {
            errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.detail ||
                          `Invalid login data for ${userType}. Please check your inputs.`;
        } else if (error.response?.status === 404) {
            errorMessage = `${userType.charAt(0).toUpperCase() + userType.slice(1)} account not found. Please check your credentials or select the correct user type.`;
        } else if (error.response?.status === 403) {
            errorMessage = `Access denied. You cannot login as ${userType} with these credentials.`;
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