import { all } from 'redux-saga/effects';
import watchAuthSaga from "./authSaga.js";

/**
 * Setup root saga
 * @returns {Generator<*, void, *>}
 */
export default function* rootSaga(){
    yield all([
        // your sagas here
        watchAuthSaga(),
        // other sagas
    ])
}