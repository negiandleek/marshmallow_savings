import * as types from "../actions/index.js";

const initial_state = {
	is_auth: false
};

// authまたはoatuhをしっかり使い分けて！ 
function auth_reducer(state = initial_state, action){
	switch (action.type){
		case types.TWITTER_OAUTH_REQUEST:
			return Object.assign({},state,{
				is_auth: "fetching_twitter"
			});

		case types.TWITTER_OAUTH_SUCCESS:
			location.href = action.res.url;
			return Object.assign({}, state, {
				is_auth: "success_twitter"
			});

		case types.TWITTER_OAUTH_FAILURE:
			return;

		case types.SIGIN_IN_REQUEST:
			return Object.assign({}, state, {
				is_auth: "fetching_auth"
			});

		case types.SIGIN_IN_SUCCESS:
			return Object.assign({}, state, {
				is_auth: true
			});

		default:
			return state;
	}
}

module.exports = auth_reducer;