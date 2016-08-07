import {CALL_API} from "../middleware/webApiUtilities";

export const TWITTER_OAUTH_REQUEST = "TWITTER_OAUTH_REQUEST";
export const TWITTER_OAUTH_SUCCESS = "TWITTER_OAUTH_SUCCESS";
export const TWITTER_OAUTH_FAILURE = "TWITTER_OAUTH_FAILURE";

// TODO: ファイルを分割する
// oauthとauthの違いをしらべて統一する
// App.react.jsも統一
function oauth_twitter_api (endpoint,method) {
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
		dispatch(oauth_twitter_api("sign","get"))
	}
}

export const SIGIN_IN_REQUEST = "SIGIN_IN_REQUEST";
export const SIGIN_IN_SUCCESS = "SIGIN_IN_SUCCESS";
export const SIGIN_IN_FAILURE = "SIGIN_IN_FAILURE";

function check_jwt_api (endpoint, method, payload){
	return {
		[CALL_API]: {
			types: [SIGIN_IN_REQUEST,SIGIN_IN_SUCCESS,SIGIN_IN_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function check_jwt (jwt) {
	return (dispatch, getState) => {
		dispatch(check_jwt_api("check_jwt", "post", jwt))
	}
}