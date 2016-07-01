import {CALL_API} from "../middleware/webApiUtilities";

export const logger = store => next => action => {
	if (action[CALL_API]) {
		console.group(action[CALL_API].types);
		console.info("dispatching", action);
		let result = next(action);
		console.groupEnd(action[CALL_API].types);

		return result;	
	} else {
		console.group(action.type);
		console.info("dispatching", action);
		let result = next(action);
		console.groupEnd(action.type);
		
		return result;
	}
}

export const crash_reporter = store => next => action => {
	try {
		return next(action);
	} catch (err) {
		console.error("Caught an exception", err);
		throw err;
	}
}