// redux/reducers/authReducer.js
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
} from '../../actions/authentication/AuthActions';

const initialState = {
    user: null,
    userType: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null
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
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user || action.payload,
                userType: action.payload.userType,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                error: null
            };

        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access,
                error: null
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                userType: null,
                accessToken: null,
                refreshToken: null,
                error: action.payload
            };

        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default authReducer;