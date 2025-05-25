// redux/actions/authentication/AuthActions.js
import axiosInstance from "../../axiosInstance"; // Fix the path
import tokenService from "../../../services/tokenService"; // Fix the path

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

// Register user action
export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        console.log('Registering user with data:', userData);
        const response = await axiosInstance.post('accounts/patients/signup/', {
            email: userData.email,
            phone_number: userData.phone,
            password: userData.password
        });

        console.log('Registration response:', response.data);

        // Save tokens if they exist in the response
        if (response.data?.access && response.data?.refresh) {
            tokenService.setTokens(response.data.access, response.data.refresh);
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        console.error('Error response:', error.response?.data);

        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data || error.message
        });

        throw error;
    }
};

// Login user action
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        console.log('Logging in with credentials:', credentials);
        const response = await axiosInstance.post('accounts/patients/login/', credentials);
        
        console.log('Login response:', response.data);
        
        // Handle the case where only access token is provided (no refresh token)
        if (response.data?.access) {
            console.log('Access token found in response');
            localStorage.setItem('accessToken', response.data.access);
            console.log('Access token saved to localStorage');
            
            // Check if token was actually saved
            const savedToken = localStorage.getItem('accessToken');
            console.log('Verification - token saved:', !!savedToken);
            
            if (!savedToken) {
                console.warn('Failed to save token to localStorage');
            }
        } else {
            console.warn('No access token found in response');
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
        
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data || error.message
        });
        
        throw error;
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

    dispatch({ type: LOGOUT });
};