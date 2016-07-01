import {CALL_API} from "../middleware/webApiUtilities";

export const TWITTER_SIGN_REQUEST = "TWITTER_SIGN_REQUEST";
export const TWITTER_SIGN_SUCCESS = "TWITTER_SIGN_SUCCESS";
export const TWITTER_SIGN_FAILURE = "TWITTER_SIGN_FAILURE";

function fetch_twitter (endpoint,method,payload) {
	return {
		[CALL_API]: {
			types: [TWITTER_SIGN_REQUEST, TWITTER_SIGN_SUCCESS, TWITTER_SIGN_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function twitter_api () {
	return function fetchosts(dispatch, getState) {
		dispatch(fetch_twitter("hoge","get","man"))
	}
}