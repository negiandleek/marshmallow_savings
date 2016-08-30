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
			var data = action.res;
			return Object.assign({}, state, {
				goal: data.goal,
				todos: data.todos
			});

		case doing_types.GET_DOING_FAILURE:
			return;

		case todo_types.ADD_TODO_REQUEST:
			var value = action.payload.value;
			var data = [{value: value, id: 0, achieve: 0, fetching: true}];
			var new_state = data.concat(state.todos);
			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.ADD_TODO_SUCCESS:
			var data = action.res;
			return Object.assign({}, state, {
				todos: data.todos
			});
	
		case todo_types.ADD_TODO_FAILURE:
			return state;

		case todo_types.UPDATE_TODO_REQUEST:
			var value = action.payload.value;
			var id = action.payload.todo_id;
			var index = action.payload.index;

			var data = {value: value, id: id, achieve: 0, fetching: true};
			
			var new_state = state.todos.concat();	
			new_state[index] = data;

			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.UPDATE_TODO_SUCCESS:
			var data = {value: value, id: id, achieve: 0, fetching: false};
			
			var new_state = state.todos.concat();	
			new_state[index] = data;

			return Object.assign({}, state, {
				todos: new_state
			});
		
		case todo_types.UPDATE_TODO_FAILURE:
			return state;

		default:
			return state;
	}
}

module.exports =  doing_reducer;