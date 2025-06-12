// api.js - Updated configuration
import axios from 'axios';
export const errorMessage = "Something went wrong .. please try again later";
export const paginatorSize = 15;

// Determine the base URL based on environment
const getBaseURL = () => {
    // In production, use the absolute URL
    if (import.meta.env.PROD) {
        return 'https://malazshukri.pythonanywhere.com/api/';
    }

    // In development, use relative URL (proxy will handle it)
    return '/api/';
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
    // Enable credentials for cross-origin requests
    withCredentials: true,
});

// Simple request interceptor - just add token (auth refresh is handled in authMiddleware.js)
axiosInstance.interceptors.request.use(
    (config) => {
        // Log requests in development
        if (import.meta.env.DEV) {
            console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        }

        // Add token if available (authMiddleware.js handles refresh logic)
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Simple response interceptor - just log errors (auth refresh is handled in authMiddleware.js)
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (import.meta.env.DEV) {
            console.log(`API Response: ${response.status} from ${response.config.url}`);
        }
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`API Error: ${error.response.status} from ${error.config?.url}`, error.response.data);
        } else if (error.request) {
            console.error('API No Response Error:', error.request);
        } else {
            console.error('API Request Setup Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;