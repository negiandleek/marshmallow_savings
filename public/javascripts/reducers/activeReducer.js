import * as doing_types from "../actions/doing";
import * as todo_types from "../actions/todo";
import * as goal_types from "../actions/goal";

const initial_state = {
	actived_date: {
		fetching: false,
		date: ""
	}
}

function active_reducer(state = initial_state, action){
	switch (action) {
		case doing_types.GET_DOING_REQUEST:
			var new_state = Object.assign({},state);
			new_state["fetching"] = true;

			return new_state;

		case doing_types.GET_DOING_SUCCESS:
			var data = action.res;

			var new_state = Object.assign({},state);
			new_state["date"] = true;

			return new_state;

		case doing_types.GET_DOING_FAILURE:
			return state;

		default:
			return state;
	}
}

module.exports =  active_reducer;