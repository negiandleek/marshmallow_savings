import {CALL_API} from "../middleware/webApiUtilities";

export const GET_DOING_REQUEST = "GET_DOING_REQUEST";
export const GET_DOING_SUCCESS = "GET_DOING_SUCCESS";
export const GET_DOING_FAILURE = "GET_DOING_FAILURE";

function get_doing_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [GET_DOING_REQUEST, GET_DOING_SUCCESS, GET_DOING_FAILURE],
			endpoint: endpoint,
			method: method,
			payload: {jwt:payload}
		}
	}
}

export function get_doing (jwt) {
	return (dispatch, getState) => {
		dispatch(get_doing_api("get_doing", "post", jwt))
	}
}