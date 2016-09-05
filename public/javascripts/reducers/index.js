import {combineReducers} from "redux";
import authReducer from "./authReducer";
import doingReducer from "./doingReducer";
import activeReducer from "./activeReducer";

const rootReducer = combineReducers({
	authReducer,
	doingReducer,
	activeReducer
})

export default rootReducer;