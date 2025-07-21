import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SET_IS_LOGIN,
    SET_LOADING,
    SET_USER
} from "../actin/authAction.js";

const userFromStorage = JSON.parse(localStorage.getItem("user"));
const isLoginFromStorage = localStorage.getItem('isLogin') === 'true';

const initialState = {
    user: userFromStorage || null,
    loading: false,
    error: '',
    isLogin: isLoginFromStorage,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLogin: true,
            }
            case LOGIN_FAILURE:
                return({
                    ...state,
                    error: action.payload,
                })
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            }

        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }
            case LOGOUT_SUCCESS:
                return({
                    ...state,
                    user: null,
                    isLogin: false,
                })
        default:
            return state;
    }
}

export default authReducer