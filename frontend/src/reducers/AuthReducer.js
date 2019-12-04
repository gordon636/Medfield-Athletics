/**
 * AUTH REDUCER
 *
 * Written by: Gordon
 */
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function authReducer(state, action) {

    if (typeof state === 'undefined')
        return initialState;

    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case 'REGISTER_FAIL':
            return state;

        case 'LOGIN_SUCCESS':
        //case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        default:
            return state; // just return the default state
    }

}