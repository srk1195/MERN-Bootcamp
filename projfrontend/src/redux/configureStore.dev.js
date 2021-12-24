import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutable from 'redux-immutable-state-invariant';
import rootReducer from './reducers/rootReducer';

const configureStore = (initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // adds support for Redux dev Tools.

    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutable())));
};

export default configureStore;
