import axios from "axios";

const API_ROOT = "http://192.168.11.3:4321/";

function call_api_func (_method, endpoint, _payload) {
	return new Promise ((resolve, reject) => {
		const reg_url = new RegExp(API_ROOT);
		const full_url = (reg_url.test(endpoint)) 
			? endpoint
			: API_ROOT + endpoint

		const method = _method ? _method.toLowerCase() : "get";

		let payload = _payload ? _payload: null;

		if (method === "get") {
			axios
				.get(full_url, { 
					params:{
						payload: payload
					}
				})
				.then( (res) => {
					resolve(res);
				})
				.catch( (err) => {
					reject(err);
				})
		}else if (method === "post"){
			axios
				.post(full_url, {payload})
				.then( (res) => {

				})
				.catch( (err) => {

				})
		}

		if(typeof endpoint !== "string"){
			throw new Error("urlは文字列に特定してください");
		}

		if (method !== "get" && method !== "post") {
			throw new Error("そのようなhttpメソッドは使われていません");
		}
	})
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
	const call_api = action[CALL_API];

	if(typeof call_api === "undefined"){
		return next(action);
	}

	let {endpoint,payload} = call_api;
	const {method, types} = call_api;
	const [request_type, success_type, failure_type] = types;

	function action_with (date) {
		const remake_action_date = Object.assign({}, action, date);
		delete remake_action_date[CALL_API];
		return remake_action_date;
	}

	return call_api_func(method,endpoint,payload)
		.then(function(res){
			next(action_with({
				res: res.data,
				type: success_type
			}))
		})
}