import * as types from "../actions/doing";

const initial_state = {
	goal: "",
	todos: ""
}

function doing_reducer(state = initial_state, action){
	switch (action.type) {
		case types.GET_DOING_REQUEST:
			return Object.assign({},state, {
				goal: "fetching",
				todos: "fetching"
			});

		case types.GET_DOING_SUCCESS:
			let data = action.res;
			return Object.assign({}, state, {
				goal: data.goal,
				todos: data.todos
			});

		case types.GET_DOING_FAILURE:
			return;

		default:
			return state;
	}
}

module.exports =  doing_reducer;