// redux/reducers/authentication/authReducer.js
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE
} from "../../actions/authentication/AuthActions";

// Initialize token from localStorage at startup
const getInitialAuthState = () => {
    try {
        const hasToken = !!localStorage.getItem('accessToken');
        // console.log('Initial auth state - token exists:', hasToken);
        return hasToken;
    } catch (error) {
        // console.error('Error getting initial auth state:', error);
        return false;
    }
};

const initialState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: getInitialAuthState()
};

const authReducer = (state = initialState, action) => {    
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('Login/Register success payload:', action.payload);
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
                isAuthenticated: true
            };
            
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isAuthenticated: true
            };
            
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            };
            
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null
            };
            
        default:
            return state;
    }
};

export default authReducer;