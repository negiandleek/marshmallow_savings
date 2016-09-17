"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createStore,applyMiddleware} from "redux";
import App from "./containers/App.react";
import rootReducer from './reducers';
import {logger,crash_reporter as crashReporter} from "./middleware/index";
import webApiUtilities from "./middleware/webApiUtilities";

let store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		webApiUtilities,
		logger
	)
)

document.addEventListener("DOMContentLoaded", () => {
	try{
		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById("root")
		)
	}catch(err){
		console.log(err);
	}
})