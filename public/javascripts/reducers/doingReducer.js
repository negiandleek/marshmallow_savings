import * as doing_types from "../actions/doing";
import * as todo_types from "../actions/todo";
import * as goal_types from "../actions/goal";

const initial_state = {
	goal: "",
	todos: ""
}

function doing_reducer(state = initial_state, action){
	switch (action.type) {
		case doing_types.GET_DOING_REQUEST:
			return state;

		case doing_types.GET_DOING_SUCCESS:
			var data = action.res;
			
			var i = 0;
			console.log(data.todos.length);
			while(data.todos.length > i){
				data["todos"][i]["state"] = 0;
				i += 1;
			}

			return Object.assign({}, state, {
				goal: data.goal,
				todos: data.todos
			});

		case doing_types.GET_DOING_FAILURE:
			return state;

		case todo_types.ADD_TODO_REQUEST:
			var value = action.payload.value;
			var data = [{value: value, id: 0, achieve: 0, fetching: true, state: 0}];
			var new_state = data.concat(state.todos);

			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.ADD_TODO_SUCCESS:
			var data = action.res;

			var i = 0;
			while(data.todos.length > i){
				data["todos"][i]["state"] = 0;
				i += 1;
			}

			return Object.assign({}, state, {
				todos: data.todos
			});
	
		case todo_types.ADD_TODO_FAILURE:
			return state;

		case todo_types.CHANGE_TODO:
			var value = action.payload.value;
			var index = action.payload.index;
			
			var new_state = state.todos.concat();
			new_state[index]["value"] = value;

			return Object.assign({}, state, {
				todos: new_state
			}); 

		case todo_types.UPDATE_TODO_REQUEST:
			console.log(action.payload);
			var value = action.payload.value;
			var id = action.payload.todo_id;
			var index = action.payload.index;

			var data = {value: value, id: id, achieve: 0, fetching: true, state: 0};
			
			var new_state = state.todos.concat();	
			new_state[index] = data;

			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.UPDATE_TODO_SUCCESS:
			var value = action.payload.value;
			var id = action.payload.todo_id;
			var index = action.payload.index;

			var data = {value: value, id: id, achieve: 0, fetching: false, state: 0};

			var new_state = state.todos.concat();

			new_state[index] = data;

			return Object.assign({}, state, {
				todos: new_state
			});
		
		case todo_types.UPDATE_TODO_FAILURE:
			return state;

		case todo_types.DELETE_TODO_REQUEST:
			var new_state = state.todos.concat();
			var index = action.payload.index;

			new_state[index]["fetching"] = "true";
			
			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.DELETE_TODO_SUCCESS:
			var new_state = state.todos.concat();
			var index = action.payload.index;

			new_state.splice(index, 1);
			
			return Object.assign({}, state, {
				todos: new_state
			});

		case todo_types.DELETE_TODO_FAILURE:
			return state;

		case todo_types.ACHIEVE_TODO_REQUEST:
			var index = action.payload.index;

			var new_state = Object.assign({}, state);
			new_state["todos"][index]["achieve"] = !new_state["todos"][index]["achieve"];

			return new_state;

		case todo_types.ACHIEVE_TODO_SUCCESS:
			return state;

		case todo_types.ACHIEVE_TODO_FAILURE:
			return state;

		case todo_types.TOGGLE_TODO_STATE:
			console.log(action.payload);
			var index = action.payload.index;
			var boolean = action.payload.boolean;

			var new_state = Object.assign({},state);

			var i = 0;
			while(new_state["todos"].length > i){
				new_state["todos"][i]["state"] = 0;
				i+=1;
			}

			if(index !== -1){
				new_state["todos"][index]["state"] = boolean;
			}

			return new_state;

		case goal_types.CHANGE_GOAL:
			var value = action.payload.value;
			var new_state = Object.assign({}, state);
			
			new_state.goal.value = value;

			return new_state;

		case goal_types.UPDATE_GOAL_REQUEST:
			var new_state = Object.assign({}, state);

			new_state["goal"]["fetching"] = 1;

			return new_state;
		
		case goal_types.UPDATE_GOAL_SUCCESS:
			var new_state = Object.assign({}, state);

			new_state["goal"]["fetching"] = false;

			return new_state;

		case goal_types.UPDATE_GOAL_FAILURE:
			return state;

		case goal_types.ADD_GOAL_REQUEST:
			var value = action.payload.value;

			return Object.assign({}, state, {
				goal: {
					id: "",
					value,
					fetching: true,
				}
			});

		case goal_types.ADD_GOAL_SUCCESS:
			var data = action.res.goal;

			return Object.assign({}, state, {
				goal: data
			});

		case goal_types.ADD_GOAL_FAILURE:
			return state;
			
		case goal_types.DELETE_GOAL_REQUEST:
			var new_state = Object.assign({}, state);
			new_state["goal"]["fetching"] = true;

			return new_state;

		case goal_types.DELETE_GOAL_SUCCESS:
			return Object.assign({}, state, {
				goal: "",
				todos: ""
			});

		case goal_types.DELETE_GOAL_FAILURE:
			return state;

		case goal_types.INCREMENT_MARSHMALLOWS_REQUEST:
			var new_state = Object.assign({}, state);
			new_state.goal.marshmallows_num = state.goal.marshmallows_num + 1;
			return new_state;

		case goal_types.INCREMENT_MARSHMALLOWS_SUCCESS:
			return state;

		case goal_types.INCREMENT_MARSHMALLOWS_FAILURE:
			var new_state = Object.assign({}, state);
			new_state.goal.marshmallows_num = state.goal.marshmallows_num - 1;
			return new_state;

		default:
			return state;
	}
}

module.exports =  doing_reducer;