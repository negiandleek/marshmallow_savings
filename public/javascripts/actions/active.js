import {CALL_API} from "../middleware/webApiUtilities";

export const GET_ACTIVED_DATE_REQUEST = "GET_ACTIVED_DATE_REQUEST";
export const GET_ACTIVED_DATE_SUCCESS = "GET_ACTIVED_DATE_SUCCESS";
export const GET_ACTIVED_DATE_FAILURE = "GET_ACTIVED_DATE_FAILURE";

function get_actived_date_api (endpoint, method, payload){
	return{
		[CALL_API]: {
			types: [GET_ACTIVED_DATE_REQUEST, GET_ACTIVED_DATE_SUCCESS, GET_ACTIVED_DATE_FAILURE],
			endpoint,
			method,
			payload
		}
	}
}

export function get_actived_date (goal_id) {
	let payload = {
		goal_id
	};
	return (dispatch, getState) => {
		dispatch(get_actived_date_api("read_actived_date", "post", payload))
	}
}