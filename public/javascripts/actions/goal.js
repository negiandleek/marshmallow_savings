import {CALL_API} from "../middleware/webApiUtilities";

export const ADD_GOAL_REQUEST = "ADD_GOAL_REQUEST";
export const ADD_GOAL_SUCCESS = "ADD_GOAL_SUCCESS";
export const ADD_GOAL_FAILURE = "ADD_GOAL_FAILURE";

function add_goal_request (payload) {
	return {
		type: ADD_GOAL_REQUEST,
		payload
	}
}

function add_goal_api (endpoint, method, payload) {
	return {
		[CALL_API]: {
			types: [ADD_GOAL_REQUEST, ADD_GOAL_SUCCESS, ADD_GOAL_FAILURE],
			endpoint,
			method,
			payload
		}
	}
}

export function add_goal (value) {
	let payload = {
		value
	};

	return (dispatch, getState) => {
		dispatch(add_goal_request(payload))
		dispatch(add_goal_api("goal","post", payload))
	}
}

export const DELETE_GOAL_REQUEST = "DELETE_GOAL_REQUEST";
export const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
export const DELETE_GOAL_FAILURE = "DELETE_GOAL_FAILURE";

function delete_goal_request () {
	return {
		type: DELETE_GOAL_REQUEST,
	}
}

function delete_goal_api (endpoint, method, payload) {
	return {
		[CALL_API]: {
			types: [DELETE_GOAL_REQUEST, DELETE_GOAL_SUCCESS, DELETE_GOAL_FAILURE],
			endpoint,
			method,
			payload
		}
	}
}

export function delete_goal (goal_id) {
	let payload = {
		goal_id
	};

	return (dispatch, getState) => {
		dispatch(delete_goal_request())
		dispatch(delete_goal_api("goal","delete", payload))
	}
}

export const CHANGE_GOAL = "CHANGE_GOAL";

export function change_goal (value) {
	return (dispatch, getState) => {
		dispatch({
			type: CHANGE_GOAL,
			payload: {
				value: value
			}
		})
	}
}

export const UPDATE_GOAL_REQUEST = "UPDATE_GOAL_REQUEST";
export const UPDATE_GOAL_SUCCESS = "UPDATE_GOAL_SUCCESS";
export const UPDATE_GOAL_FAILURE = "UPDATE_GOAL_FAILURE";

function update_goal_request () {
	return {
		type: UPDATE_GOAL_REQUEST,
	}
}

function update_goal_api (endpoint, method, payload) {
	return {
		[CALL_API]: {
			types: [UPDATE_GOAL_REQUEST, UPDATE_GOAL_SUCCESS, UPDATE_GOAL_FAILURE],
			endpoint,
			method,
			payload
		}
	}
}

export function update_goal (goal_id, value) {
	let payload = {
		goal_id,
		value
	};

	return (dispatch, getState) => {
		dispatch(update_goal_request())
		dispatch(update_goal_api("goal","put", payload))
	}
}

export const INCREMENT_MARSHMALLOWS_REQUEST = "INCREMENT_MARSHMALLOWS_REQUEST";
export const INCREMENT_MARSHMALLOWS_SUCCESS = "INCREMENT_MARSHMALLOWS_SUCCESS";
export const INCREMENT_MARSHMALLOWS_FAILURE = "INCREMENT_MARSHMALLOWS_FAILURE";

function increment_marshmallows_request () {
	return {
		type: INCREMENT_MARSHMALLOWS_REQUEST,
	}
}

function incremnet_marshmallows_api (endpoint, method, payload) {
	return {
		[CALL_API]: {
			types: [INCREMENT_MARSHMALLOWS_REQUEST, INCREMENT_MARSHMALLOWS_SUCCESS, INCREMENT_MARSHMALLOWS_FAILURE],
			endpoint,
			method,
			payload
		}
	}
}

export function increment_marshmallows (goal_id) {
	let payload = {
		goal_id
	};

	return (dispatch, getState) => {
		dispatch(increment_marshmallows_request())
		dispatch(incremnet_marshmallows_api("increment_marshmallows","put", payload))
	}
}