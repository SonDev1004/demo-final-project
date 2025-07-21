// Action types for authentication
export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const  LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


// Action creators for authentication
export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials
})
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const setUser = (payload) =>({
    type: SET_USER,
    payload
})
export const setIsLogin = (payload) => ({
    type: SET_IS_LOGIN,
    payload
});
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});
export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload
});


export const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});
export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});