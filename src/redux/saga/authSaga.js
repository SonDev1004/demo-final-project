import {call, put, takeLeading, takeEvery} from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    loginFailure,
    LOGOUT_REQUEST,
    logoutSuccess,
    setIsLogin,
    setLoading,
    setUser
} from "../actin/authAction.js";

//MOCK API call for login
function fakeLoginApi({email, password}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@example.com' && password === '123456') {
                resolve({id: 1, name: 'John Doe'});
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
}

function fakeLogoutApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

function* loginSaga(action) {
    function* LoginSuccess(user) {
        yield put(setUser(user));
        yield put(setIsLogin(true))
    }

    try {
        yield put(setLoading(true));
        const user = yield call(fakeLoginApi, action.payload);

        yield * LoginSuccess(user);

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLogin', 'true');

    } catch (error) {
        yield put(loginFailure(error.message));
        yield put(setIsLogin(false))
        localStorage.removeItem('user');
        localStorage.setItem('isLogin', 'false');
    } finally {
        yield put(setLoading(false));
    }
}

function* logoutSaga() {
    yield put(setLoading(true));
    yield call(fakeLogoutApi);
    localStorage.removeItem('user');
    localStorage.setItem('isLogin', 'false');
    yield put(logoutSuccess())
    yield put(setLoading(false));
}

export default function* watchAuthSaga() {
    yield takeLeading(LOGIN_REQUEST, loginSaga),
        yield takeEvery(LOGOUT_REQUEST, logoutSaga)
}