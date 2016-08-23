import {combineReducers} from "redux";
import authReducer from "./authReducer";
import doingReducer from "./doingReducer";

const rootReducer = combineReducers({
	authReducer,
	doingReducer
})

export default rootReducer;