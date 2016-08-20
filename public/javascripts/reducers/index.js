import {combineReducers} from "redux";
import {twitter_auth_reducer, auth_reducer} from "./authReducer";

const rootReducer = combineReducers({
	twitter_auth_reducer,
	auth_reducer
})

export default rootReducer;