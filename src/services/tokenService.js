// tokenService.js with minimal, targeted logging
const tokenService = {
    // Get the access token from localStorage
    getAccessToken: () => {
        try {
            return localStorage.getItem('accessToken');
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    },

    // Get the refresh token from localStorage
    getRefreshToken: () => {
        try {
            return localStorage.getItem('refreshToken');
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    },

    // Save both tokens to localStorage
    setTokens: (accessToken, refreshToken) => {
        try {
            if (!accessToken && !refreshToken) {
                console.warn('No tokens provided to setTokens');
                return;
            }

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }

            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            // Only log on failure (missing tokens after save attempt)
            const hasAccessToken = !!localStorage.getItem('accessToken');
            const hasRefreshToken = !!localStorage.getItem('refreshToken');

            if (accessToken && !hasAccessToken) {
                console.warn('Failed to save access token to localStorage');
            }

            if (refreshToken && !hasRefreshToken) {
                console.warn('Failed to save refresh token to localStorage');
            }
        } catch (error) {
            console.error('Error setting tokens:', error);
        }
    },

    // Save access token only
    setAccessToken: (accessToken) => {
        try {
            if (!accessToken) {
                console.warn('No access token provided to setAccessToken');
                return;
            }

            localStorage.setItem('accessToken', accessToken);

            // Only log on failure
            if (!localStorage.getItem('accessToken')) {
                console.warn('Failed to save access token to localStorage');
            }
        } catch (error) {
            console.error('Error setting access token:', error);
        }
    },

    // Save refresh token only
    setRefreshToken: (refreshToken) => {
        try {
            if (!refreshToken) {
                console.warn('No refresh token provided to setRefreshToken');
                return;
            }

            localStorage.setItem('refreshToken', refreshToken);

            // Only log on failure
            if (!localStorage.getItem('refreshToken')) {
                console.warn('Failed to save refresh token to localStorage');
            }
        } catch (error) {
            console.error('Error setting refresh token:', error);
        }
    },

    // Remove all tokens (logout)
    clearTokens: () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    },

    // Check if the user is authenticated (has a token)
    isAuthenticated: () => {
        try {
            return !!localStorage.getItem('accessToken');
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    },

    // Parse JWT token to get payload (for user info, expiry, etc.)
    parseToken: (token) => {
        if (!token) {
            return null;
        }

        try {
            // Split the token into parts
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                console.warn('Invalid token format (not 3 parts)');
                return null;
            }

            // Decode the payload (middle part)
            const base64Url = tokenParts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                window.atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing token:', error);
            return null;
        }
    },

    // Get user info from token
    getUserFromToken: () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return null;
            }

            const payload = tokenService.parseToken(token);
            if (!payload) {
                return null;
            }

            // Based on your API's JWT structure, user_type is not included in the token
            // So we'll create a default user object with a default type
            return {
                id: payload.user_id,
                // Since user_type isn't in the token, we'll default to 'patient'
                user_type: 'patient'
            };
        } catch (error) {
            console.error('Error getting user from token:', error);
            return { user_type: 'patient' }; // Fallback
        }
    },

    // Check if token is expired
    isTokenExpired: (token) => {
        if (!token) return true;

        try {
            const payload = tokenService.parseToken(token);
            if (!payload) return true;

            // If no exp claim, assume token is not expired
            if (!payload.exp) {
                return false;
            }

            // exp is in seconds, Date.now() is in milliseconds
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            console.error('Error checking token expiration:', error);
            return true;
        }
    }
};

export default tokenService;