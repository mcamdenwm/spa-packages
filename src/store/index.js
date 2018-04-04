import reduxThunk from 'redux-thunk';
import {
	createStore,
	applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import { genericReducer } from '@workmarket/ui-generation';
import initialState from './initialState';

const store = createStore(
	genericReducer(initialState),
	applyMiddleware(reduxThunk, createLogger()),
);

if (module.hot) {
	// @todo something for this
}

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
	window._store = store;
}

export default store;
