import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import * as app from "./allReducers";

const rootReducer = combineReducers({ ...app , routing:routerReducer});
const middleware = routerMiddleware(browserHistory);

export const configureStore = () => {
	return createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk, logger, middleware),
		)
	);
}

