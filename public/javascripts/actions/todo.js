import {CALL_API} from "../middleware/webApiUtilities";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

function add_todo_request (payload) {
	return {
		type: ADD_TODO_REQUEST,
		payload: payload
	}
}

function add_todo_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [ADD_TODO_SUCCESS, ADD_TODO_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function add_todo (goal_id, value){
	let payload = {
		goal_id: goal_id,
		value: value,
		jwt: localStorage.getItem("marshmallow_jwt")
	};

	return (dispatch, getState) => {
		dispatch(add_todo_request(payload));
		dispatch(add_todo_api("todo","post", payload))
	}
}