import {CALL_API} from "../middleware/webApiUtilities";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

function add_todo_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [ADD_TODO_REQUEST,ADD_TODO_SUCCESS, ADD_TODO_FAILURE],
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
		dispatch(add_todo_api("todo","post", payload))
	}
}

export const CHANGE_TODO = "CHANGE_TODO";

export function change_todo (value, index) {
	return (dispatch, getState) => {
		dispatch({
			type: CHANGE_TODO,
			payload: {
				value,
				index
			}
		});
	}
}

export const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAILURE = "UPDATE_TODO_FAILURE";

function update_todo_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [UPDATE_TODO_REQUEST,UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function update_todo (todo_id, value, index){
	console.log(value);
	let payload = {
		todo_id: todo_id,
		value: value,
		index: index
	};

	return (dispatch, getState) => {
		dispatch(update_todo_api("todo","put", payload))
	}
}

export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";

function delete_todo_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [DELETE_TODO_REQUEST,DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function delete_todo (todo_id, index){
	let payload = {
		todo_id: todo_id,
		index: index
	};

	return (dispatch, getState) => {
		dispatch(delete_todo_api("todo","delete", payload))
	}
}

export const ACHIEVE_TODO_REQUEST = "ACHIEVE_TODO_REQUEST";
export const ACHIEVE_TODO_SUCCESS = "ACHIEVE_TODO_SUCCESS";
export const ACHIEVE_TODO_FAILURE = "ACHIEVE_TODO_FAILURE";

function achieve_todo_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [ACHIEVE_TODO_REQUEST,ACHIEVE_TODO_SUCCESS, ACHIEVE_TODO_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: payload
		}
	}
}

export function achieve_todo (todo_id, index){
	let payload = {
		todo_id,
		index
	};

	return (dispatch, getState) => {
		dispatch(achieve_todo_api("achieve_todo","post", payload))
	}
}

export const TOGGLE_TODO_STATE = "TOGGLE_TODO_STATE";

export function toggle_todo_state (boolean,index) {
	return (dispatch, getState) => {
		dispatch({
			type: TOGGLE_TODO_STATE,
			payload: {
				boolean,
				index
			}
		});
	}
}