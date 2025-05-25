import axios from 'axios';
export const errorMessage = "Something went wrong .. please try again later";
export const paginatorSize = 15;

const axiosInstance = axios.create({
    // Using relative URL for better compatibility with development environments
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // Increased timeout to 30 seconds
    // Enable credentials for cross-origin requests
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
            // console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
        }
        
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

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (process.env.NODE_ENV === 'development') {
            // console.log('API Response:', response.status, response.data);
        }
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.error('API Error Response:', error.response.status, error.response.data);
            
            if (error.response.status === 401) {
                console.warn("Unauthorized - Please login again.");
                // Optionally redirect to login page or clear tokens
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API No Response Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Request Setup Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;