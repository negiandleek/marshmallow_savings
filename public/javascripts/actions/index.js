import {CALL_API} from "../middleware/webApiUtilities";

export const TWITTER_OAUTH_REQUEST = "TWITTER_OAUTH_REQUEST";
export const TWITTER_OAUTH_SUCCESS = "TWITTER_OAUTH_SUCCESS";
export const TWITTER_OAUTH_FAILURE = "TWITTER_OAUTH_FAILURE";

function fetch_twitter (endpoint,method) {
	return {
		[CALL_API]: {
			types: [TWITTER_OAUTH_REQUEST, TWITTER_OAUTH_SUCCESS, TWITTER_OAUTH_FAILURE],
			endpoint: endpoint,
			method: method,
		}
	}
}

export function oauth_twitter () {
	return (dispatch, getState) => {
		dispatch(fetch_twitter("sign","get"))
	}
}