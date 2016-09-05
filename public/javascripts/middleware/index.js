import {CALL_API} from "../middleware/webApiUtilities";

export const logger = store => next => action => {
	console.group(action.type);
		console.info("dispatching", action);
		let result = next(action);
		console.log("state",store.getState());
	console.groupEnd(action.type);

	return result;
}

export const crash_reporter = store => next => action => {
	try {
		return next(action);
	} catch (err) {
		console.error(err);
		throw err;
	}
}