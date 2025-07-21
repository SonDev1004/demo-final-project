import {combineReducers} from "redux";
import authReducer from "./authReducer.js";

/**
 * Setup root reducer for the Redux store.
 * @type {Reducer<StateFromReducersMapObject<{}>, ActionFromReducersMapObject<{}>, Partial<PreloadedStateShapeFromReducersMapObject<{}>>>}
 */
const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;