import * as doing_types from "../actions/doing";
import * as todo_types from "../actions/todo";

const initial_state = {
	goal: "",
	todos: ""
}

function doing_reducer(state = initial_state, action){
	switch (action.type) {
		case doing_types.GET_DOING_REQUEST:
			return Object.assign({},state, {
				goal: "fetching",
				todos: "fetching"
			});

		case doing_types.GET_DOING_SUCCESS:
			let data = action.res;
			return Object.assign({}, state, {
				goal: data.goal,
				todos: data.todos
			});

		case doing_types.GET_DOING_FAILURE:
			return;

		case todo_types.ADD_TODO_REQUEST:
			// console.log(action.payload);
			return Object.assign({}, state, {
				data: action.payload
			});

		case todo_types.ADD_TODO_SUCCESS:
			return state;
	
		case todo_types.ADD_TODO_FAILURE:
			return state;
		default:
			return state;
	}
}

module.exports =  doing_reducer;