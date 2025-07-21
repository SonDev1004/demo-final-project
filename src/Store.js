
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import rootSaga from "./redux/saga/index.js";
import rootReducer from "./redux/reducers/index.js";
import logger from "redux-logger";
const sagaMiddleware = createSagaMiddleware();



const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);

export default store;