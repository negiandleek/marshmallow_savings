import * as active_types from "../actions/active";

const initial_state = {
	fetching: false,
	date: ""
}

function active_reducer(state = initial_state, action){
	switch (action.type) {
		case active_types.GET_ACTIVED_DATE_REQUEST:
			var new_state = Object.assign({},state);
			new_state["fetching"] = true;

			return new_state;

		case active_types.GET_ACTIVED_DATE_SUCCESS:
			var date = action.res.data;
			return Object.assign({},state,{
				fetching: true,
				date: date
			});

		case active_types.GET_ACTIVED_DATE_FAILURE:
			return state;

		default:
			return state;
	}
}

module.exports = active_reducer;