// middleware/authMiddleware.js
import tokenService from '../services/tokenService';

/**
 * Setup Axios interceptors for handling authentication
 * @param {Object} axiosInstance - The axios instance to add interceptors to
 */
const setupAuthInterceptors = (axiosInstance) => {
    // console.log('Setting up auth interceptors for axios');
    
    // Get store dynamically to avoid circular dependencies
    const getStore = () => {
        return import('../redux/store').then(module => module.default);
    };
    
    // Get actions dynamically to avoid circular dependencies
    const getActions = () => {
        return import('../redux/actions/authentication/AuthActions').then(module => ({
            refreshToken: module.refreshToken,
            logout: module.logout
        }));
    };

    // Add request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                // console.log(`Request to ${config.url}`);
                
                // Don't add token for auth endpoints
                if (config.url.includes('login') || config.url.includes('signup') || config.url.includes('token/refresh')) {
                    // console.log('Auth endpoint - no token needed');
                    return config;
                }

                // Check if token exists and is not expired
                let accessToken = tokenService.getAccessToken();
                // console.log('Access token exists:', !!accessToken);

                if (accessToken && tokenService.isTokenExpired(accessToken)) {
                    console.log('Token is expired, attempting to refresh');
                    
                    try {
                        const store = await getStore();
                        const actions = await getActions();
                        
                        await store.dispatch(actions.refreshToken());
                        // console.log('Token refreshed successfully');
                        
                        // Get the new token after refresh
                        accessToken = tokenService.getAccessToken();
                    } catch (error) {
                        console.error('Token refresh failed in request interceptor:', error);
                        
                        const store = await getStore();
                        const actions = await getActions();
                        store.dispatch(actions.logout());
                        
                        throw error;
                    }
                }
                
                // If we have a valid token, add it to the request
                if (accessToken) {
                    // console.log('Adding token to request');
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            } catch (error) {
                console.error('Error in request interceptor:', error);
                return Promise.reject(error);
            }
        },
        (error) => {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // console.log(`Response from ${response.config.url}: ${response.status}`);
            return response;
        },
        async (error) => {
            try {
                console.error('Response error:', error.message);
                
                // If no response, just reject
                if (!error.response) {
                    return Promise.reject(error);
                }
                
                console.log('Error status:', error.response.status);
                const originalRequest = error.config;

                // If we get a 401 Unauthorized error and we haven't tried to refresh the token yet
                if (error.response.status === 401 && !originalRequest._retry) {
                    console.log('Unauthorized error, attempting to refresh token');
                    originalRequest._retry = true;

                    try {
                        const store = await getStore();
                        const actions = await getActions();
                        
                        await store.dispatch(actions.refreshToken());
                        console.log('Token refreshed successfully after 401');
                        
                        // Update the authorization header with the new token
                        const newToken = tokenService.getAccessToken();
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            console.log('Retrying original request with new token');
                            // Retry the original request with the new token
                            return axiosInstance(originalRequest);
                        }
                    } catch (refreshError) {
                        console.error('Token refresh failed in response interceptor:', refreshError);
                        
                        const store = await getStore();
                        const actions = await getActions();
                        store.dispatch(actions.logout());
                    }
                }

                return Promise.reject(error);
            } catch (interceptorError) {
                console.error('Error in response interceptor:', interceptorError);
                return Promise.reject(error);
            }
        }
    );
    
    // console.log('Auth interceptors setup complete');
};

export default setupAuthInterceptors;