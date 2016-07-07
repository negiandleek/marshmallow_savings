import * as types from "../actions/index.js";

const initial_state = {
	is_auth: false
};

function auth_reducer(state = initial_state, action){
	switch (action.type){
		case types.TWITTER_OAUTH_REQUEST:
			return Object.assign({},state,{
				is_auth: "fetching"
			});

		case types.TWITTER_OAUTH_SUCCESS:
			location.href = action.res.url;

		default:
			return state;
	}
}

module.exports = auth_reducer;